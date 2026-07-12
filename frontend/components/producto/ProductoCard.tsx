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
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)" }}
    >
      <div className="relative aspect-square overflow-hidden" style={{ background: "#f0efe9" }}>
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
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,.25)" }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "#fff" }}
          >
            <ArrowUpRight size={18} color="#111111" />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        <p
          className="font-space-mono text-[9px] uppercase tracking-widest"
          style={{ color: "#999" }}
        >
          {producto.categoria_nombre}
        </p>
        <p
          className="font-rajdhani font-bold text-sm leading-snug flex-1"
          style={{ color: "#111111" }}
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