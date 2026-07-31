import Link from "next/link";
import { ChevronRight, Shield, Truck, RefreshCw, Award } from "lucide-react";
import { fetchProductoPorSlug } from "@/lib/api";
import ProductoGaleria from "@/components/producto/ProductoGaleria";
import BotonAgregarCarrito from "@/components/producto/BotonAgregarCarrito";

const ACCENT = "#c8973a";

const INFO_ITEMS = [
  { icon: Shield, label: "100% Original", desc: "Certificado por el fabricante" },
  { icon: Truck, label: "Envío Seguro", desc: "Empaque especializado" },
  { icon: RefreshCw, label: "Devolución 30 días", desc: "Si algo no calza, te ayudamos" },
  { icon: Award, label: "Edición Limitada", desc: "Piezas raras, stock reducido" },
];

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = await fetchProductoPorSlug(slug);
  const sinStock = producto.stock === 0;

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

        <div className="grid lg:grid-cols-2 gap-12">
          <ProductoGaleria imagenes={producto.imagenes} nombre={producto.nombre} />

          <div>
            <p
              className="font-space-mono text-xs uppercase tracking-widest mb-2"
              style={{ color: ACCENT }}
            >
              {producto.coleccion_nombre} · {producto.categoria_nombre}
            </p>
            <h1
              className="font-orbitron font-black leading-tight mb-4"
              style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "#111111" }}
            >
              {producto.nombre}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-orbitron font-black text-3xl" style={{ color: ACCENT }}>
                S/{producto.precio}
              </span>
              {sinStock ? (
                <span
                  className="px-3 py-1 rounded-lg font-space-mono text-[10px] uppercase tracking-widest"
                  style={{ background: "#111111", color: "#fff" }}
                >
                  Agotado
                </span>
              ) : (
                <span
                  className="px-3 py-1 rounded-lg font-space-mono text-[10px] uppercase tracking-widest"
                  style={{ background: "rgba(34,197,94,.12)", color: "#16a34a" }}
                >
                  Disponible
                </span>
              )}
            </div>

            {producto.descripcion && (
              <p className="font-inter text-sm leading-relaxed mb-8" style={{ color: "#666" }}>
                {producto.descripcion}
              </p>
            )}

            <BotonAgregarCarrito producto={producto} />

            <div className="grid grid-cols-2 gap-4 mt-10 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,.08)" }}>
              {INFO_ITEMS.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "#eae9e3" }}
                  >
                    <Icon size={14} style={{ color: "#111111", opacity: 0.7 }} />
                  </div>
                  <div>
                    <p className="font-rajdhani font-bold text-xs" style={{ color: "#111111" }}>
                      {label}
                    </p>
                    <p className="font-inter text-[11px] mt-0.5" style={{ color: "#999" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}