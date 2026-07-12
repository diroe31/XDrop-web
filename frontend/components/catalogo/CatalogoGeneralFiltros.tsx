"use client";

import { useState, useEffect } from "react";
import { fetchProductos, Coleccion, Producto } from "@/lib/api";
import ProductoCard from "@/components/producto/ProductoCard";

export default function CatalogoGeneralFiltros({ colecciones }: { colecciones: Coleccion[] }) {
  const [coleccionActiva, setColeccionActiva] = useState<number | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);

  useEffect(() => {
    setCargando(true);
    setPagina(1);
    fetchProductos({ coleccionId: coleccionActiva || undefined, page: 1 })
      .then((data) => {
        setProductos(data.results);
        setTotal(data.count);
        setHayMas(Boolean(data.next));
      })
      .finally(() => setCargando(false));
  }, [coleccionActiva]);

  const cargarMas = () => {
    const siguiente = pagina + 1;
    setCargandoMas(true);
    fetchProductos({ coleccionId: coleccionActiva || undefined, page: siguiente })
      .then((data) => {
        setProductos((prev) => [...prev, ...data.results]);
        setHayMas(Boolean(data.next));
        setPagina(siguiente);
      })
      .finally(() => setCargandoMas(false));
  };

  return (
    <div>
      <div
        className="sticky top-14 z-30 py-4"
        style={{ background: "#f5f4f0", borderBottom: "1px solid rgba(0,0,0,.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setColeccionActiva(null)}
            className="flex-shrink-0 px-4 py-2 rounded-full font-rajdhani font-bold text-sm tracking-wide transition-all"
            style={{
              background: coleccionActiva === null ? "#111111" : "#ffffff",
              color: coleccionActiva === null ? "#fff" : "#111111",
              border: "1px solid rgba(0,0,0,.1)",
            }}
          >
            Todas
          </button>
          {colecciones.map((c) => (
            <button
              key={c.id}
              onClick={() => setColeccionActiva(c.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full font-rajdhani font-bold text-sm tracking-wide transition-all"
              style={{
                background: coleccionActiva === c.id ? "#111111" : "#ffffff",
                color: coleccionActiva === c.id ? "#fff" : "#111111",
                border: "1px solid rgba(0,0,0,.1)",
              }}
            >
              {c.nombre}
            </button>
          ))}
        </div>
      </div>

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
              Prueba con otra colección o vuelve pronto.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {productos.map((p) => (
                <ProductoCard key={p.id} producto={p} />
              ))}
            </div>

            {hayMas && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={cargarMas}
                  disabled={cargandoMas}
                  className="px-8 py-3 rounded-xl font-rajdhani font-bold text-sm tracking-wider"
                  style={{ background: "#111111", color: "#fff", opacity: cargandoMas ? 0.6 : 1 }}
                >
                  {cargandoMas ? "Cargando..." : "Cargar más"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}