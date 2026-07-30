import { fetchColecciones, fetchProductos } from "@/lib/api";
import CatalogoHero from "@/components/catalogo/CatalogoHero";
import CatalogoGeneralFiltros from "@/components/catalogo/CatalogoGeneralFiltros";

export default async function CatalogoGeneralPage() {
  const dataColecciones = await fetchColecciones();
  const colecciones = dataColecciones.results;

  // Pedimos los productos de cada coleccion por separado, para que ninguna
  // se quede sin mostrar productos solo por el orden en que vinieron.
  const productosPorColeccion: Record<number, Awaited<ReturnType<typeof fetchProductos>>["results"]> = {};
  await Promise.all(
    colecciones.map(async (c) => {
      const data = await fetchProductos({ coleccionId: c.id, page: 1 });
      productosPorColeccion[c.id] = data.results;
    })
  );

  return (
    <div className="min-h-screen" style={{ background: "#f5f4f0" }}>
      <CatalogoHero colecciones={colecciones} />
      <CatalogoGeneralFiltros colecciones={colecciones} productosPorColeccion={productosPorColeccion} />
    </div>
  );
}