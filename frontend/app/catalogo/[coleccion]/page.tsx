import { fetchColeccionPorSlug, fetchProductos } from "@/lib/api";

export default async function CatalogoColeccionPage({
  params,
}: {
  params: Promise<{ coleccion: string }>;
}) {
  const { coleccion } = await params;
  const data = await fetchColeccionPorSlug(coleccion);
  const productos = await fetchProductos({ coleccionId: data.id });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* TODO: reemplazar por el diseño real del catalogo (Figma) */}
      <h1 className="font-orbitron text-2xl">{data.nombre}</h1>
      <p className="text-sm opacity-60">{productos.count} productos</p>
    </div>
  );
}
