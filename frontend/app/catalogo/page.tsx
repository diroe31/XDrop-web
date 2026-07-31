import { fetchColecciones, fetchProductos } from "@/lib/api";
import CatalogoHero from "@/components/catalogo/CatalogoHero";
import CatalogoGeneralFiltros from "@/components/catalogo/CatalogoGeneralFiltros";

export default async function CatalogoGeneralPage() {
  const dataColecciones = await fetchColecciones();
  const colecciones = dataColecciones.results;

  const productosPorColeccion: Record<number, Awaited<ReturnType<typeof fetchProductos>>["results"]> = {};
  await Promise.all(
    colecciones.map(async (c) => {
      const data = await fetchProductos({ coleccionId: c.id, page: 1 });
      productosPorColeccion[c.id] = data.results;
    })
  );

  return (
    <div className="min-h-screen" style={{ background: "#111111" }}>
      <CatalogoHero colecciones={colecciones} />
      <CatalogoGeneralFiltros colecciones={colecciones} productosPorColeccion={productosPorColeccion} />
    </div>
  );
}