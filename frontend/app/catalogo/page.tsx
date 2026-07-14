import { fetchColecciones, fetchProductos } from "@/lib/api";
import CatalogoGeneralFiltros from "@/components/catalogo/CatalogoGeneralFiltros";

export default async function CatalogoGeneralPage() {
  const [dataColecciones, dataProductos] = await Promise.all([
    fetchColecciones(),
    fetchProductos({ page: 1 }),
  ]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200,151,58,.08), transparent), #f5f4f0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <p
          className="font-space-mono text-xs font-bold tracking-[.35em] uppercase mb-3"
          style={{ color: "#c8973a" }}
        >
          ✦ Tienda completa
        </p>
        <h1
          className="font-orbitron font-black leading-none"
          style={{ fontSize: "clamp(2.2rem,6vw,4rem)", color: "#111111", letterSpacing: "-0.01em" }}
        >
          CATÁLOGO
        </h1>
        <p className="font-inter text-sm mt-3 max-w-md" style={{ color: "#8a8880" }}>
          Coleccionables gaming, elegidos con cariño para tu colección.
        </p>
      </div>

      <CatalogoGeneralFiltros
        colecciones={dataColecciones.results}
        productosIniciales={dataProductos.results}
        totalInicial={dataProductos.count}
        hayMasInicial={Boolean(dataProductos.next)}
      />
    </div>
  );
}