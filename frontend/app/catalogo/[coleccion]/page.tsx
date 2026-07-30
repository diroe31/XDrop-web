import Image from "next/image";
import { fetchColeccionPorSlug } from "@/lib/api";
import CatalogoFiltros from "@/components/catalogo/CatalogoFiltros";

export default async function CatalogoColeccionPage({
  params,
}: {
  params: Promise<{ coleccion: string }>;
}) {
  const { coleccion } = await params;
  const data = await fetchColeccionPorSlug(coleccion);

  return (
    <div className="min-h-screen" style={{ background: "#f5f4f0" }}>
      {/* Banner de la coleccion */}
      <div className="relative w-full overflow-hidden" style={{ height: 290, background: "#111" }}>
        {data.imagen_portada && (
          <Image
            src={data.imagen_portada}
            alt={data.nombre}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.5 }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.45) 55%,rgba(0,0,0,.15) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(14,16,20,1) 0%, transparent 35%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-9 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-0.5 rounded-full" style={{ background: "#c8973a" }} />
            <span
              className="font-space-mono text-[10px] tracking-[.3em] uppercase"
              style={{ color: "#c8973a" }}
            >
              Colección
            </span>
          </div>
          <h1
            className="font-orbitron font-black text-white leading-none mb-2"
            style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)" }}
          >
            {data.nombre.toUpperCase()}
          </h1>
          <p
            className="font-inter text-xs"
            style={{ color: "rgba(255,255,255,.4)" }}
          >
            {data.categorias.length} categoría{data.categorias.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <CatalogoFiltros coleccionId={data.id} categorias={data.categorias} />
    </div>
  );
}