"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Producto } from "@/lib/api";

export interface ItemCarrito {
  productoId: number;
  nombre: string;
  slug: string;
  precio: string;
  imagen: string | null;
  cantidad: number;
  stock: number;
}

interface CarritoContextType {
  items: ItemCarrito[];
  agregar: (producto: Producto, cantidad?: number) => void;
  quitar: (productoId: number) => void;
  actualizarCantidad: (productoId: number, cantidad: number) => void;
  vaciar: () => void;
  totalItems: number;
  totalPrecio: number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

const STORAGE_KEY = "xdrop_carrito";

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [cargado, setCargado] = useState(false);

  // Cargar el carrito guardado, al iniciar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // si algo sale mal leyendo, empezamos con carrito vacio
    }
    setCargado(true);
  }, []);

  // Guardar cada vez que cambia (despues de la carga inicial)
  useEffect(() => {
    if (!cargado) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, cargado]);

  const agregar = (producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.productoId === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.productoId === producto.id
            ? { ...i, cantidad: Math.min(i.cantidad + cantidad, producto.stock) }
            : i
        );
      }
      return [
        ...prev,
        {
          productoId: producto.id,
          nombre: producto.nombre,
          slug: producto.slug,
          precio: producto.precio,
          imagen: producto.imagenes[0]?.imagen || null,
          cantidad: Math.min(cantidad, producto.stock),
          stock: producto.stock,
        },
      ];
    });
  };

  const quitar = (productoId: number) => {
    setItems((prev) => prev.filter((i) => i.productoId !== productoId));
  };

  const actualizarCantidad = (productoId: number, cantidad: number) => {
    if (cantidad <= 0) {
      quitar(productoId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productoId === productoId ? { ...i, cantidad: Math.min(cantidad, i.stock) } : i
      )
    );
  };

  const vaciar = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.cantidad, 0);
  const totalPrecio = items.reduce((sum, i) => sum + parseFloat(i.precio) * i.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ items, agregar, quitar, actualizarCantidad, vaciar, totalItems, totalPrecio }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
}