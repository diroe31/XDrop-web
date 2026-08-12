import Link from "next/link";
import Image from "next/image";
import { Producto } from "@/lib/api";

const ACCENT = "#c8973a";

export default function ProductoCard({
  producto,
  oscuro = false,
}: {
  producto: Producto;
  oscuro?: boolean;
}) {
  const imagenesGaleria = producto.imagenes
    .filter((i) => i.tipo === "galeria")
    .sort((a, b) => a.orden - b.orden);
  const img = imagenesGaleria[0]?.imagen;
  const sinStock = producto.stock === 0;

  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: oscuro ? "#1a1a1a" : "#ffffff",
        border: oscuro ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(0,0,0,.08)",
      }}
    >
      <div className="relative aspect-square overflow-hidden" style={{ background: oscuro ? "#111111" : "#f0efe9" }}>
        {img ? (
          <Image
            src={img}
            alt={producto.nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <span className="font-orbitron text-xs">Sin imagen</span>
          </div>
        )}

        {sinStock && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-lg font-space-mono text-[9px] uppercase tracking-widest"
            style={{ background: "#111111", color: "#fff" }}
          >
            Agotado
          </div>
        )}

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
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: ACCENT }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        <p
          className="font-space-mono text-[9px] uppercase tracking-widest"
          style={{ color: oscuro ? "rgba(255,255,255,.35)" : "#999" }}
        >
          {producto.categoria_nombre}
        </p>
        <p
          className="font-rajdhani font-bold text-sm leading-snug flex-1"
          style={{ color: oscuro ? "#ffffff" : "#111111" }}
        >
          {producto.nombre}
        </p>
        <p className="font-orbitron font-bold text-lg mt-1" style={{ color: ACCENT }}>
          S/{producto.precio}
        </p>
      </div>
    </Link>
  );
}