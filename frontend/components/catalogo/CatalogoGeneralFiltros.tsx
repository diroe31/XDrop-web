"use client";

import { useState, useEffect, useRef } from "react";
import { fetchProductos, Coleccion, Producto } from "@/lib/api";
import ProductoCard from "@/components/producto/ProductoCard";

interface Props {
  colecciones: Coleccion[];
  productosIniciales: Producto[];
  totalInicial: number;
  hayMasInicial: boolean;
}

// Icono por nombre de colección — si no coincide con ninguno, usa el genérico
function iconoDe(nombre: string) {
  const n = nombre.toLowerCase();
  if (n.includes("counter") || n.includes("strike")) return "🔫";
  if (n.includes("minecraft")) return "⛏️";
  if (n.includes("resident") || n.includes("evil")) return "🧟";
  if (n.includes("god of war")) return "⚔️";
  if (n.includes("backrooms")) return "🌀";
  return "🎮";
}

export default function CatalogoGeneralFiltros({
  colecciones,
  productosIniciales,
  totalInicial,
  hayMasInicial,
}: Props) {
  const [coleccionActiva, setColeccionActiva] = useState<number | null>(null);
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [total, setTotal] = useState(totalInicial);
  const [cargando, setCargando] = useState(false);
  const esPrimerRender = useRef(true);

  useEffect(() => {
    if (esPrimerRender.current) {
      esPrimerRender.current = false;
      if (hayMasInicial) seguirCargando(1, productosIniciales, coleccionActiva);
      return;
    }

    let cancelado = false;

    async function cargarDesdeElInicio() {
      setCargando(true);
      const primera = await fetchProductos({ coleccionId: coleccionActiva || undefined, page: 1 });
      if (cancelado) return;
      setProductos(primera.results);
      setTotal(primera.count);
      setCargando(false);
      if (primera.next) seguirCargando(1, primera.results, coleccionActiva);
    }

    async function seguirCargando(pagina: number, acumulado: Producto[], coleccion: number | null) {
      let pag = pagina;
      let actual = acumulado;
      let sigue = true;
      while (sigue && !cancelado) {
        pag += 1;
        const data = await fetchProductos({ coleccionId: coleccion || undefined, page: pag });
        if (cancelado) return;
        actual = [...actual, ...data.results];
        setProductos(actual);
        sigue = Boolean(data.next);
      }
    }

    cargarDesdeElInicio();
    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coleccionActiva]);

  return (
    <div>
      <div
        className="sticky top-14 z-30 py-4"
        style={{ background: "rgba(245,244,240,.92)", borderBottom: "1px solid rgba(0,0,0,.06)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setColeccionActiva(null)}
            className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full font-rajdhani font-bold text-sm tracking-wide transition-all hover:-translate-y-0.5"
            style={{
              background: coleccionActiva === null ? "#111111" : "#ffffff",
              color: coleccionActiva === null ? "#fff" : "#111111",
              border: coleccionActiva === null ? "1px solid #111111" : "1px solid rgba(0,0,0,.1)",
              boxShadow: coleccionActiva === null ? "0 4px 12px rgba(0,0,0,.18)" : "0 1px 3px rgba(0,0,0,.06)",
            }}
          >
            <span>🎯</span> Todas
          </button>
          {colecciones.map((c) => (
            <button
              key={c.id}
              onClick={() => setColeccionActiva(c.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full font-rajdhani font-bold text-sm tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                background: coleccionActiva === c.id ? "#111111" : "#ffffff",
                color: coleccionActiva === c.id ? "#fff" : "#111111",
                border: coleccionActiva === c.id ? "1px solid #111111" : "1px solid rgba(0,0,0,.1)",
                boxShadow: coleccionActiva === c.id ? "0 4px 12px rgba(0,0,0,.18)" : "0 1px 3px rgba(0,0,0,.06)",
              }}
            >
              <span>{iconoDe(c.nombre)}</span> {c.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {total > 0 && (
          <p
            className="font-space-mono text-[11px] font-bold uppercase tracking-[.25em] mb-7"
            style={{ color: "#b0aea4" }}
          >
            Mostrando {total} producto{total !== 1 ? "s" : ""}
          </p>
        )}

        {productos.length === 0 && !cargando ? (
          <div className="text-center py-20">
            <p className="font-orbitron font-bold text-lg mb-2" style={{ color: "#111111" }}>
              Aún no hay productos aquí
            </p>
            <p className="font-inter text-sm" style={{ color: "#888" }}>
              Prueba con otra colección o vuelve pronto.
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