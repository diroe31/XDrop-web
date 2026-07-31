"use client";

import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { Producto } from "@/lib/api";
import { useCarrito } from "@/components/carrito/CarritoContext";

export default function BotonAgregarCarrito({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const sinStock = producto.stock === 0;

  const handleAgregar = () => {
    agregar(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1800);
  };

  if (sinStock) {
    return (
      <button
        disabled
        className="w-full py-4 rounded-xl font-rajdhani font-bold text-base tracking-wider"
        style={{ background: "#ccc", color: "#fff", cursor: "not-allowed" }}
      >
        Agotado
      </button>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="font-rajdhani font-bold text-sm" style={{ color: "#111111" }}>
          Cantidad
        </span>
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,.15)" }}
        >
          <button
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="w-9 h-9 flex items-center justify-center hover:bg-black/5"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-rajdhani font-bold">{cantidad}</span>
          <button
            onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
            className="w-9 h-9 flex items-center justify-center hover:bg-black/5"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <button
        onClick={handleAgregar}
        className="w-full py-4 rounded-xl font-rajdhani font-bold text-base tracking-wider transition-all flex items-center justify-center gap-2"
        style={{
          background: agregado ? "#16a34a" : "#111111",
          color: "#fff",
        }}
      >
        {agregado ? (
          <>
            <Check size={18} /> Añadido al carrito
          </>
        ) : (
          "Añadir al carrito"
        )}
      </button>
    </div>
  );
}