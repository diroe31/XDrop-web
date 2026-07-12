import { fetchColecciones } from "@/lib/api";
import CatalogoGeneralFiltros from "@/components/catalogo/CatalogoGeneralFiltros";

export default async function CatalogoGeneralPage() {
  const data = await fetchColecciones();

  return (
    <div className="min-h-screen" style={{ background: "#f5f4f0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <p
          className="font-space-mono text-xs tracking-[.3em] uppercase mb-2"
          style={{ color: "#c8973a" }}
        >
          Tienda completa
        </p>
        <h1
          className="font-orbitron font-black"
          style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#111111" }}
        >
          CATÁLOGO
        </h1>
      </div>

      <CatalogoGeneralFiltros colecciones={data.results} />
    </div>
  );
}