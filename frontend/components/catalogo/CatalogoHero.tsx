import Image from "next/image";
import { Coleccion } from "@/lib/api";

export default function CatalogoHero({ colecciones }: { colecciones: Coleccion[] }) {
  const imgs = colecciones.slice(0, 3).map((c) => c.imagen_portada).filter(Boolean) as string[];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 280, background: "#0e1014" }}>
      <div className="absolute inset-0 flex">
        {imgs.length > 0 ? (
          imgs.map((img, i) => (
            <div key={i} className="relative flex-1 h-full">
              <Image src={img} alt="" fill sizes="34vw" className="object-cover" style={{ opacity: 0.5 }} />
            </div>
          ))
        ) : (
          <div className="flex-1" />
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(14,16,20,.95) 0%, rgba(14,16,20,.6) 50%, rgba(14,16,20,.95) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(14,16,20,1) 0%, transparent 60%)" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-0.5 rounded-full" style={{ background: "#c8973a" }} />
          <span
            className="font-space-mono text-[10px] tracking-[.35em] uppercase"
            style={{ color: "#c8973a" }}
          >
            Tienda completa
          </span>
          <div className="w-6 h-0.5 rounded-full" style={{ background: "#c8973a" }} />
        </div>
        <h1
          className="font-orbitron font-black text-white leading-none mb-3"
          style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}
        >
          CATÁLOGO
        </h1>
        <p className="font-inter text-sm max-w-md" style={{ color: "rgba(255,255,255,.5)" }}>
          Coleccionables gaming, elegidos con cariño para tu colección.
        </p>
      </div>
    </div>
  );
}