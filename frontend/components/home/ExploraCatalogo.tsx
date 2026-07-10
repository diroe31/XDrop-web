import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { fetchProductos } from "@/lib/api";

const ACCENT = "#c8973a";

export default async function ExploraCatalogo() {
  const data = await fetchProductos({ destacado: true });
  const productos = data.results.slice(0, 4);

  if (productos.length === 0) {
    return (
      <section style={{ background: "#111111", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-inter text-sm opacity-50 text-center text-white">
            Marca productos como &quot;Destacado&quot; desde el admin para verlos aqui.
          </p>
        </div>
      </section>
    );
  }

  const [principal, ...resto] = productos;
  const imgPrincipal = principal.imagenes[0]?.imagen;

  return (
    <section style={{ background: "#111111", padding: "5rem 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between">
        <div>
          <p
            className="font-space-mono text-xs tracking-[.3em] uppercase mb-2"
            style={{ color: ACCENT }}
          >
            Descubre
          </p>
          <h2
            className="font-orbitron font-black text-white leading-none"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            EXPLORA
            <br />
            NUESTRO UNIVERSO
          </h2>
        </div>
        <Link
          href="/catalogo"
          className="hidden sm:flex items-center gap-1.5 font-rajdhani font-bold text-sm tracking-wider transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,.3)" }}
        >
          Ver todo <ChevronRight size={15} />
        </Link>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gridTemplateRows: "repeat(3,auto)", gap: "10px" }}
      >
        {/* Producto principal */}
        <Link
          href={`/producto/${principal.slug}`}
          className="relative rounded-2xl overflow-hidden group"
          style={{ gridRow: "1 / 4", minHeight: 540, border: "1px solid rgba(255,255,255,.07)" }}
        >
          {imgPrincipal && (
            <Image
              src={imgPrincipal}
              alt={principal.nombre}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.15) 55%,transparent 100%)" }}
          />
          <div
            className="absolute top-5 left-5 font-orbitron font-black select-none"
            style={{ fontSize: "6rem", color: "rgba(255,255,255,.05)", lineHeight: 1 }}
          >
            01
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <p
              className="font-space-mono text-[10px] uppercase tracking-widest mb-1"
              style={{ color: "rgba(255,255,255,.4)" }}
            >
              {principal.coleccion_nombre} · {principal.categoria_nombre}
            </p>
            <p className="font-orbitron font-bold text-2xl text-white leading-tight mb-3">
              {principal.nombre}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-orbitron font-bold text-2xl" style={{ color: ACCENT }}>
                S/{principal.precio}
              </span>
              <span
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-rajdhani font-bold text-sm tracking-wider"
                style={{ background: ACCENT, color: "#fff" }}
              >
                <ShoppingCart size={14} /> Ver producto
              </span>
            </div>
          </div>
        </Link>

        {/* 3 tarjetas compactas */}
        {resto.map((producto, i) => {
          const img = producto.imagenes[0]?.imagen;
          return (
            <Link
              key={producto.id}
              href={`/producto/${producto.slug}`}
              className="relative rounded-2xl overflow-hidden group flex"
              style={{ border: "1px solid rgba(255,255,255,.07)", minHeight: 172 }}
            >
              <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 172 }}>
                {img && (
                  <Image
                    src={img}
                    alt={producto.nombre}
                    fill
                    sizes="172px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div
                  className="absolute top-1.5 left-2 font-orbitron font-black select-none"
                  style={{ fontSize: "3.5rem", color: "rgba(255,255,255,.07)", lineHeight: 1 }}
                >
                  0{i + 2}
                </div>
              </div>
              <div
                className="flex flex-col justify-between p-4 flex-1"
                style={{ background: "rgba(255,255,255,.03)" }}
              >
                <div>
                  <p
                    className="font-space-mono text-[10px] uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,.3)" }}
                  >
                    {producto.coleccion_nombre}
                  </p>
                  <p className="font-rajdhani font-bold text-base text-white leading-snug mt-1">
                    {producto.nombre}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-orbitron font-bold text-lg" style={{ color: ACCENT }}>
                    S/{producto.precio}
                  </span>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(200,151,58,.2)", border: "1px solid rgba(200,151,58,.4)" }}
                  >
                    <ShoppingCart size={13} style={{ color: ACCENT }} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}