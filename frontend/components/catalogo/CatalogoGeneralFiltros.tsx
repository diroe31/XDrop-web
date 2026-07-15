"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchProductos, Coleccion, Producto } from "@/lib/api";
import ProductoCard from "@/components/producto/ProductoCard";

const ACCENT = "#c8973a";

function iconoDe(nombre: string) {
  const n = nombre.toLowerCase();
  if (n.includes("counter") || n.includes("strike")) return "🔫";
  if (n.includes("minecraft")) return "⛏️";
  if (n.includes("resident") || n.includes("evil")) return "🧟";
  if (n.includes("god of war")) return "⚔️";
  if (n.includes("backrooms")) return "🌀";
  return "🎮";
}

interface Props {
  colecciones: Coleccion[];
  productosIniciales: Producto[];
  totalInicial: number;
  hayMasInicial: boolean;
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

  // Mapa nombre de colección -> slug, para armar el link de "Ver más"
  const slugPorNombre = new Map(colecciones.map((c) => [c.nombre, c.slug]));

  // Agrupa productos por colección, respetando el orden en que vienen las colecciones
  function agruparPorColeccion(lista: Producto[]) {
    const grupos = new Map<string, Producto[]>();
    for (const c of colecciones) grupos.set(c.nombre, []);
    for (const p of lista) {
      if (!grupos.has(p.coleccion_nombre)) grupos.set(p.coleccion_nombre, []);
      grupos.get(p.coleccion_nombre)!.push(p);
    }
    return Array.from(grupos.entries()).filter(([, items]) => items.length > 0);
  }

  const mostrandoTodas = coleccionActiva === null;
  const grupos = mostrandoTodas ? agruparPorColeccion(productos) : [];

  return (
    <div>
      <div
        className="sticky top-16 z-30 py-4"
        style={{ background: "rgba(245,244,240,.92)", borderBottom: "1px solid rgba(0,0,0,.06)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
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

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {total > 0 && !mostrandoTodas && (
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
        ) : mostrandoTodas ? (
          // VISTA AGRUPADA POR COLECCIÓN
          <div className="flex flex-col gap-14">
            {grupos.map(([nombreColeccion, items]) => {
              const slug = slugPorNombre.get(nombreColeccion);
              const primeros3 = items.slice(0, 3);
              const tieneMas = items.length > 3;

              return (
                <div key={nombreColeccion}>
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="font-orbitron font-bold text-lg flex items-center gap-2"
                      style={{ color: "#111111" }}
                    >
                      <span>{iconoDe(nombreColeccion)}</span> {nombreColeccion}
                    </h3>
                    {slug && (
                      <Link
                        href={`/catalogo/${slug}`}
                        className="font-rajdhani font-bold text-xs tracking-widest uppercase flex items-center gap-1"
                        style={{ color: ACCENT }}
                      >
                        Ver todo <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {primeros3.map((p) => (
                      <ProductoCard key={p.id} producto={p} />
                    ))}

                    {tieneMas && slug && (
                      <Link
                        href={`/catalogo/${slug}`}
                        className="rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-3 aspect-square transition-all hover:-translate-y-1.5"
                        style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)" }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(200,151,58,.12)" }}
                        >
                          <ArrowRight size={18} color={ACCENT} />
                        </div>
                        <div className="text-center">
                          <p className="font-orbitron font-bold text-sm" style={{ color: "#111111" }}>
                            Ver más
                          </p>
                          <p className="font-space-mono text-[10px] mt-1" style={{ color: "#999" }}>
                            +{items.length - 3} productos
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // VISTA NORMAL: una sola colección filtrada, grilla completa
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