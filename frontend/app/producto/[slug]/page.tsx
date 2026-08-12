import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { fetchProductoPorSlug, fetchProductos, fetchColecciones } from "@/lib/api";
import ProductoDetalle from "@/components/producto/ProductoDetalle";
import ProductoCard from "@/components/producto/ProductoCard";

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = await fetchProductoPorSlug(slug);

  async function traerRelacionados() {
    type ProductoLista = Awaited<ReturnType<typeof fetchProductos>>["results"][number];
    const excluirActual = (p: ProductoLista) => p.slug !== producto.slug;

    // 1. Primero, misma categoria (mas relevante)
    const deCategoria = await fetchProductos({ categoriaId: producto.categoria });
    let lista = deCategoria.results.filter(excluirActual);

    // 2. Si falta, rellenar con la misma coleccion (otras categorias)
    if (lista.length < 8) {
      const yaIncluidos = new Set(lista.map((p) => p.id));
      const dataColecciones = await fetchColecciones();
      const coleccion = dataColecciones.results.find((c) => c.nombre === producto.coleccion_nombre);
      if (coleccion) {
        const deColeccion = await fetchProductos({ coleccionId: coleccion.id });
        const extra = deColeccion.results.filter(
          (p) => excluirActual(p) && !yaIncluidos.has(p.id)
        );
        lista = lista.concat(extra);
      }
    }

    // 3. Si aun falta, rellenar con cualquier producto del catalogo
    if (lista.length < 8) {
      const yaIncluidos = new Set(lista.map((p) => p.id));
      const deTodos = await fetchProductos({});
      const extra = deTodos.results.filter(
        (p) => excluirActual(p) && !yaIncluidos.has(p.id)
      );
      lista = lista.concat(extra);
    }

    return lista.slice(0, 8);
  }

  const relacionados = await traerRelacionados();

  const imagenesDetalle = producto.imagenes
    .filter((img) => img.tipo === "detalle")
    .sort((a, b) => a.orden - b.orden);

  return (
    <div className="min-h-screen" style={{ background: "#f5f4f0" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-1.5 mb-8 font-space-mono text-[11px] uppercase tracking-wider" style={{ color: "#999" }}>
          <Link href="/catalogo" className="hover:underline">Catálogo</Link>
          <ChevronRight size={11} />
          <span>{producto.coleccion_nombre}</span>
          <ChevronRight size={11} />
          <span style={{ color: "#111111" }}>{producto.categoria_nombre}</span>
        </div>

        <ProductoDetalle producto={producto} />

        {imagenesDetalle.length > 0 && (
          <div className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(0,0,0,.08)" }}>
            <h2 className="font-orbitron font-bold text-lg mb-5" style={{ color: "#111111" }}>
              Detalles del producto
            </h2>
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
              {imagenesDetalle.map((img) => (
                <div
                  key={img.id}
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{ aspectRatio: "1/1", border: "1px solid rgba(0,0,0,.07)" }}
                >
                  <Image
                    src={img.imagen}
                    alt={producto.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {relacionados.length > 0 && (
          <div className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(0,0,0,.08)" }}>
            <h2 className="font-orbitron font-bold text-lg mb-5" style={{ color: "#111111" }}>
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relacionados.map((p) => (
                <ProductoCard key={p.id} producto={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}