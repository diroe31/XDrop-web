import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fetchProductoPorSlug } from "@/lib/api";
import ProductoDetalle from "@/components/producto/ProductoDetalle";

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = await fetchProductoPorSlug(slug);

  return (
    <div className="min-h-screen" style={{ background: "#f5f4f0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-1.5 mb-8 font-space-mono text-[11px] uppercase tracking-wider" style={{ color: "#999" }}>
          <Link href="/catalogo" className="hover:underline">Catálogo</Link>
          <ChevronRight size={11} />
          <span>{producto.coleccion_nombre}</span>
          <ChevronRight size={11} />
          <span style={{ color: "#111111" }}>{producto.categoria_nombre}</span>
        </div>

        <ProductoDetalle producto={producto} />
      </div>
    </div>
  );
}