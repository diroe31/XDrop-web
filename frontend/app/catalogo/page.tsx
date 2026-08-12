import { fetchColecciones, fetchProductos } from "@/lib/api";
import CatalogoHero from "@/components/catalogo/CatalogoHero";
import CatalogoGeneralFiltros from "@/components/catalogo/CatalogoGeneralFiltros";

async function fetchTodosLosProductosDeColeccion(coleccionId: number) {
  let acumulado: Awaited<ReturnType<typeof fetchProductos>>["results"] = [];
  let pagina = 1;
  let sigue = true;

  while (sigue) {
    const data = await fetchProductos({ coleccionId, page: pagina });
    acumulado = acumulado.concat(data.results);
    sigue = Boolean(data.next);
    pagina += 1;
  }

  return acumulado;
}

export default async function CatalogoGeneralPage() {
  const dataColecciones = await fetchColecciones();
  const colecciones = dataColecciones.results;

  const productosPorColeccion: Record<number, Awaited<ReturnType<typeof fetchProductos>>["results"]> = {};
  await Promise.all(
    colecciones.map(async (c) => {
      productosPorColeccion[c.id] = await fetchTodosLosProductosDeColeccion(c.id);
    })
  );

  return (
    <div className="min-h-screen" style={{ background: "#111111" }}>
      <CatalogoHero colecciones={colecciones} />
      <CatalogoGeneralFiltros colecciones={colecciones} productosPorColeccion={productosPorColeccion} />
    </div>
  );
}