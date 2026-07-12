"use client";

import { useState, useEffect } from "react";
import { fetchProductos, Categoria, Producto } from "@/lib/api";
import ProductoCard from "@/components/producto/ProductoCard";

const ACCENT = "#c8973a";

export default function CatalogoFiltros({
  coleccionId,
  categorias,
}: {
  coleccionId: number;
  categorias: Categoria[];
}) {
  const [categoriaActiva, setCategoriaActiva] = useState<number | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    fetchProductos({
      coleccionId,
      categoriaId: categoriaActiva || undefined,
    })
      .then((data) => {
        setProductos(data.results);
        setTotal(data.count);
      })
      .finally(() => setCargando(false));
  }, [coleccionId, categoriaActiva]);

  return (
    <div>
      {/* Barra de filtros (chips), pegajosa al hacer scroll */}
      <div
        className="sticky top-14 z-30 py-4"
        style={{ background: "#f5f4f0", borderBottom: "1px solid rgba(0,0,0,.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setCategoriaActiva(null)}
            className="flex-shrink-0 px-4 py-2 rounded-full font-rajdhani font-bold text-sm tracking-wide transition-all"
            style={{
              background: categoriaActiva === null ? "#111111" : "#ffffff",
              color: categoriaActiva === null ? "#fff" : "#111111",
              border: "1px solid rgba(0,0,0,.1)",
            }}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full font-rajdhani font-bold text-sm tracking-wide transition-all"
              style={{
                background: categoriaActiva === cat.id ? "#111111" : "#ffffff",
                color: categoriaActiva === cat.id ? "#fff" : "#111111",
                border: "1px solid rgba(0,0,0,.1)",
              }}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!cargando && (
          <p className="font-space-mono text-xs uppercase tracking-widest mb-6" style={{ color: "#999" }}>
            {total} producto{total !== 1 ? "s" : ""}
          </p>
        )}

        {cargando ? (
          <p className="font-inter text-sm opacity-50 text-center py-16">Cargando...</p>
        ) : productos.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-orbitron font-bold text-lg mb-2" style={{ color: "#111111" }}>
              Aún no hay productos aquí
            </p>
            <p className="font-inter text-sm" style={{ color: "#888" }}>
              Prueba con otra categoría o vuelve pronto.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}