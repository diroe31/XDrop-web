"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Coleccion, Producto } from "@/lib/api";
import ProductoCard from "@/components/producto/ProductoCard";

const ACCENT = "#c8973a";

const ICONOS: Record<string, string> = {
  "resident evil": "🧟",
  "counter strike": "🔫",
  "minecraft": "⛏️",
  "god of war": "⚔️",
  "backrooms": "🌀",
};

function iconoDe(nombre: string) {
  return ICONOS[nombre.toLowerCase()] || "✦";
}

export default function CatalogoGeneralFiltros({
  colecciones,
  productosPorColeccion,
}: {
  colecciones: Coleccion[];
  productosPorColeccion: Record<number, Producto[]>;
}) {
  const [filtro, setFiltro] = useState<number | null>(null);

  const coleccionesAMostrar = filtro
    ? colecciones.filter((c) => c.id === filtro)
    : colecciones;

  return (
    <div>
      <div
        className="sticky top-14 z-30 py-4"
        style={{ background: "#f5f4f0", borderBottom: "1px solid rgba(0,0,0,.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFiltro(null)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-rajdhani font-bold text-sm tracking-wide transition-all"
            style={{
              background: filtro === null ? "#111111" : "#ffffff",
              color: filtro === null ? "#fff" : "#111111",
              border: "1px solid rgba(0,0,0,.1)",
            }}
          >
            <span>✦</span> Todas
          </button>
          {colecciones.map((c) => (
            <button
              key={c.id}
              onClick={() => setFiltro(c.id)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-rajdhani font-bold text-sm tracking-wide transition-all"
              style={{
                background: filtro === c.id ? "#111111" : "#ffffff",
                color: filtro === c.id ? "#fff" : "#111111",
                border: "1px solid rgba(0,0,0,.1)",
              }}
            >
              <span>{iconoDe(c.nombre)}</span> {c.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="py-10 space-y-14">
        {coleccionesAMostrar.map((c) => {
          const todosDeEstaColeccion = productosPorColeccion[c.id] || [];
          const productos = todosDeEstaColeccion.slice(0, 3);
          const restantes = todosDeEstaColeccion.length - productos.length;

          if (productos.length === 0) return null;

          return (
            <div key={c.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-2xl overflow-hidden mb-5" style={{ height: 96 }}>
                {c.imagen_portada && (
                  <Image
                    src={c.imagen_portada}
                    alt={c.nombre}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ opacity: 0.35 }}
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, rgba(17,17,17,.95), rgba(17,17,17,.55))" }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 24 }}>{iconoDe(c.nombre)}</span>
                    <h2 className="font-orbitron font-black text-white text-lg md:text-xl">
                      {c.nombre.toUpperCase()}
                    </h2>
                  </div>
                  <Link
                    href={`/catalogo/${c.slug}`}
                    className="flex items-center gap-1.5 font-rajdhani font-bold text-xs tracking-wider flex-shrink-0"
                    style={{ color: ACCENT }}
                  >
                    VER TODO <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {productos.map((p) => (
                  <ProductoCard key={p.id} producto={p} />
                ))}

                {restantes > 0 && (
                  <Link
                    href={`/catalogo/${c.slug}`}
                    className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ minHeight: 200 }}
                  >
                    {todosDeEstaColeccion[3] && todosDeEstaColeccion[3].imagenes[0] && todosDeEstaColeccion[3].imagenes[0].imagen ? (
                      <Image
                        src={todosDeEstaColeccion[3].imagenes[0].imagen}
                        alt=""
                        fill
                        sizes="20vw"
                        className="object-cover"
                        style={{ filter: "blur(6px) brightness(0.55)" }}
                      />
                    ) : (
                      <div className="absolute inset-0" style={{ background: "#111111" }} />
                    )}

                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,.9)" }}
                      >
                        <ArrowRight size={18} color={ACCENT} />
                      </div>
                      <p className="font-rajdhani font-bold text-sm text-white">Ver más</p>
                      <p className="font-space-mono text-[10px] text-white opacity-70">
                        +{restantes} producto{restantes !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}