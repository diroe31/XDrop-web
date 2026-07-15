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
      <div className="relative w-full overflow-hidden" style={{ height: 160, background: "#111" }}>
        {data.imagen_portada && (
          <Image
            src={data.imagen_portada}
            alt={data.nombre}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.4 }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.5) 55%,rgba(0,0,0,.2) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-6 h-0.5 rounded-full" style={{ background: "#c8973a" }} />
            <span
              className="font-space-mono text-[10px] tracking-[.3em] uppercase"
              style={{ color: "#c8973a" }}
            >
              Colección
            </span>
          </div>
          <h1
            className="font-orbitron font-black text-white leading-none"
            style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)" }}
          >
            {data.nombre.toUpperCase()}
          </h1>
        </div>
      </div>

      <CatalogoFiltros coleccionId={data.id} categorias={data.categorias} />
    </div>
  );
}