import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Heart } from "lucide-react";
import { fetchProductos } from "@/lib/api";

const ACCENT = "#c8973a";

export default async function ExploraCatalogo() {
  const data = await fetchProductos({ destacado: true });
  const productos = data.results.slice(0, 4);

  if (productos.length === 0) {
    return (
      <section style={{ background: "#111111", padding: "5rem 0" }}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-inter text-sm opacity-50 text-center text-white">
            Marca productos como &quot;Destacado&quot; desde el admin para verlos aqui.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "#111111", padding: "5rem 0" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p
            className="font-space-mono text-xs font-bold tracking-[.35em] uppercase mb-2"
            style={{ color: ACCENT }}
          >
            Descubre
          </p>
          <h2
            className="font-orbitron font-black text-white leading-none"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            EXPLORA NUESTRO UNIVERSO
          </h2>
        </div>
        <Link
          href="/catalogo"
          className="flex items-center gap-1.5 font-rajdhani font-bold text-sm tracking-wider transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,.5)" }}
        >
          Ver todo <ChevronRight size={15} />
        </Link>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
        {productos.map((producto) => {
          const img = producto.imagenes[0]?.imagen;
          const sinStock = producto.stock === 0;

          return (
            <Link
              key={producto.id}
              href={`/producto/${producto.slug}`}
              className="group rounded-2xl overflow-hidden flex flex-col p-3 transition-transform duration-300 hover:-translate-y-1.5"
              style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,.06)" }}
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden" style={{ background: "#f0efe9" }}>
                {img && (
                  <Image
                    src={img}
                    alt={producto.nombre}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <div
                  className="absolute top-3 left-3 px-3 py-1.5 rounded-md font-space-mono text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: ACCENT, color: "#fff" }}
                >
                  {producto.coleccion_nombre}
                </div>

                <div
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,.9)" }}
                >
                  <Heart size={16} color="#111111" />
                </div>

                {sinStock && (
                  <div
                    className="absolute bottom-3 left-3 px-3 py-1.5 rounded-md font-space-mono text-[10px] uppercase tracking-widest"
                    style={{ background: "#111111", color: "#fff" }}
                  >
                    Agotado
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center text-center gap-1.5 pt-4 pb-2">
                <p className="font-rajdhani font-bold text-base leading-snug text-white">
                  {producto.nombre}
                </p>
                <p className="font-orbitron font-bold text-xl" style={{ color: ACCENT }}>
                  S/{producto.precio}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}