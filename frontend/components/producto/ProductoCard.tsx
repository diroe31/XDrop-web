import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Producto } from "@/lib/api";

const ACCENT = "#c8973a";

export default function ProductoCard({ producto }: { producto: Producto }) {
  const img = producto.imagenes[0]?.imagen;
  const sinStock = producto.stock === 0;

  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,.08)",
        boxShadow: "0 1px 2px rgba(0,0,0,.04)",
        opacity: sinStock ? 0.85 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = ACCENT;
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,0,0,.08)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,.04)";
      }}
    >
      <div className="relative aspect-square overflow-hidden" style={{ background: "#f0efe9" }}>
        {img ? (
          <Image
            src={img}
            alt={producto.nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={
              sinStock
                ? { filter: "grayscale(1) blur(2px) brightness(0.75)" }
                : undefined
            }
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <span className="font-orbitron text-xs">Sin imagen</span>
          </div>
        )}

        <div
          className="absolute top-3 left-3 px-3 py-1.5 rounded-lg font-space-mono text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm"
          style={{
            background: "linear-gradient(135deg, rgba(200,151,58,.97) 0%, rgba(10,10,10,.95) 65%)",
            color: "#ffffff",
            boxShadow: "0 2px 10px rgba(0,0,0,.4), inset 0 0 0 1px rgba(255,255,255,.08)",
          }}
        >
          {producto.coleccion_nombre}
        </div>

        {sinStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="px-6 py-2 font-orbitron font-black text-lg tracking-[.15em] uppercase"
              style={{
                color: "#fff",
                border: "2.5px solid #fff",
                transform: "rotate(-8deg)",
                textShadow: "0 2px 6px rgba(0,0,0,.6)",
              }}
            >
              Agotado
            </div>
          </div>
        )}

        {!sinStock && (
          <div
            className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 100%)",
              paddingTop: "2.5rem",
            }}
          >
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="font-rajdhani font-bold text-xs tracking-wider text-white">
                Ver producto
              </span>
              <ArrowUpRight size={16} color="#ffffff" />
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-1.5 flex-1">
        <p
          className="font-space-mono text-[9px] uppercase tracking-widest"
          style={{ color: "#999" }}
        >
          {producto.categoria_nombre}
        </p>
        <p
          className="text-sm leading-snug flex-1"
          style={{ color: "#111111", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600 }}
        >
          {producto.nombre}
        </p>

        <p className="font-orbitron font-bold text-xl mt-1" style={{ color: ACCENT }}>
          S/{producto.precio}
        </p>
      </div>
    </Link>
  );
}