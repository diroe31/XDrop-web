import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";
import { fetchContenidoHome, fetchProductos } from "@/lib/api";

const ACCENT = "#c8973a";

export default async function Galeria() {
  const [items, productosData] = await Promise.all([
    fetchContenidoHome("galeria"),
    fetchProductos(),
  ]);

  if (items.length === 0) {
    return (
      <section className="py-20" style={{ background: "#111111" }}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-inter text-sm opacity-50 text-center text-white">
            Sube imagenes de tipo &quot;Galeria&quot; desde el admin para verlas aqui.
          </p>
        </div>
      </section>
    );
  }

  const [a, b, c, d] = items;
  const totalProductos = productosData.count;
  const tira = items.length >= 4 ? [...items, ...items] : items;

  return (
    <section className="py-20 overflow-hidden" style={{ background: "#111111" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p
              className="font-space-mono text-xs tracking-[.3em] uppercase mb-1.5"
              style={{ color: ACCENT }}
            >
              Nuestra colección
            </p>
            <h2 className="font-orbitron font-black text-white text-2xl md:text-3xl">GALERÍA</h2>
          </div>
          <Link
            href="/catalogo"
            className="hidden sm:flex items-center gap-1.5 font-rajdhani font-bold text-sm tracking-wider transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,.35)" }}
          >
            Ver catálogo <ChevronRight size={15} />
          </Link>
        </div>
      </div>

      {items.length >= 4 ? (
        <div
          className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr 1fr",
            gridTemplateRows: "260px 220px",
            gap: "8px",
          }}
        >
          {/* A - alta, izquierda */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ gridRow: "1 / 3" }}>
            {a.imagen && (
              <Image
                src={a.imagen}
                alt={a.titulo || "Galeria"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(to top, ${ACCENT}b3 0%, transparent 60%)` }}
            />
            {a.titulo && (
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-orbitron font-bold text-white text-sm">{a.titulo}</p>
              </div>
            )}
          </div>

          {/* B - paisaje, arriba centro */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            {b.imagen && (
              <Image
                src={b.imagen}
                alt={b.titulo || "Galeria"}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          {/* C - alta, derecha */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ gridRow: "1 / 3" }}>
            {c.imagen && (
              <Image
                src={c.imagen}
                alt={c.titulo || "Galeria"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            {c.titulo && (
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-orbitron font-bold text-white text-sm">{c.titulo}</p>
              </div>
            )}
          </div>

          {/* D - overlay con CTA, abajo centro */}
          <Link href="/catalogo" className="relative rounded-2xl overflow-hidden group cursor-pointer block">
            {d.imagen && (
              <Image
                src={d.imagen}
                alt="Ver más"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,.45)" }}
            >
              <div className="text-center">
                <p className="font-orbitron font-black text-white text-lg mb-2">+{totalProductos}</p>
                <p className="font-space-mono text-[10px] uppercase tracking-widest text-white opacity-70 mb-3">
                  piezas disponibles
                </p>
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-rajdhani font-bold text-xs tracking-wider"
                  style={{ background: ACCENT, color: "#fff" }}
                >
                  Ver todo <ArrowRight size={11} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 gap-2">
          {items.map((item) => (
            <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden">
              {item.imagen && (
                <Image src={item.imagen} alt={item.titulo || "Galeria"} fill sizes="33vw" className="object-cover" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tira deslizante de miniaturas */}
      {tira.length > 0 && (
        <div className="mt-2 overflow-hidden" style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              animation: "marquee-scroll 35s linear infinite",
              width: "max-content",
              paddingLeft: "8px",
            }}
          >
            {tira.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-xl overflow-hidden relative"
                style={{ width: 120, height: 90, border: "1px solid rgba(255,255,255,.07)" }}
              >
                {item.imagen && (
                  <Image
                    src={item.imagen}
                    alt="Galeria"
                    fill
                    sizes="120px"
                    className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}