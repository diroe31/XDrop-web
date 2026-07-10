import { fetchProductoPorSlug } from "@/lib/api";

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = await fetchProductoPorSlug(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* TODO: reemplazar por el diseño real de detalle de producto (Figma) */}
      <h1 className="font-orbitron text-2xl">{producto.nombre}</h1>
      <p className="text-sm opacity-60">{producto.coleccion_nombre} - {producto.categoria_nombre}</p>
      <p className="mt-4">S/ {producto.precio}</p>
    </div>
  );
}
