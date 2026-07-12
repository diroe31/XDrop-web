import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, Package, Zap } from "lucide-react";
import { fetchNosotros, fetchContenidoHome } from "@/lib/api";

const TARJETAS = [
  { icon: Shield, label: "100% Auténtico", desc: "Certificado en cada compra" },
  { icon: Truck, label: "Envío Seguro", desc: "Empaque especializado" },
  { icon: Package, label: "Stock Exclusivo", desc: "Piezas raras y limitadas" },
  { icon: Zap, label: "Soporte 24/7", desc: "Atención personalizada" },
];

export default async function NosotrosPage() {
  const [data, galeria] = await Promise.all([
    fetchNosotros(),
    fetchContenidoHome("galeria"),
  ]);

  const info = data[0];
  const titulo = (info?.titulo || "QUIÉNES|SOMOS").split("|").map((l) => l.trim());
  const parrafos = (info?.contenido || "Aun no se ha cargado el texto de Quienes Somos desde el admin.")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const imagenBanner = info?.imagen;
  const imagenesGaleria = galeria.slice(0, 2);

  return (
    <div className="min-h-screen py-16" style={{ background: "#f0efe9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner superior */}
        <div
          className="relative w-full rounded-3xl overflow-hidden mb-16"
          style={{ height: 380, background: "#111" }}
        >
          {imagenBanner && (
            <Image
              src={imagenBanner}
              alt="Coleccionables"
              fill
              sizes="100vw"
              className="object-cover opacity-60"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,.9) 0%, rgba(0,0,0,.4) 60%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16">
            <p
              className="font-space-mono text-xs tracking-[.3em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,.5)" }}
            >
              Nuestra Historia
            </p>
            <h1
              className="font-orbitron font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
            >
              {titulo.map((linea, i) => (
                <span key={i} className="block">
                  {linea}
                </span>
              ))}
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Columna de texto */}
          <div>
            {parrafos.map((p, i) => (
              <p
                key={i}
                className="font-inter leading-relaxed mb-5"
                style={{ color: "#666", fontSize: i === 0 ? "1rem" : "0.95rem" }}
              >
                {p}
              </p>
            ))}

            <div
              className="grid grid-cols-3 gap-6 pt-8"
              style={{ borderTop: "1px solid rgba(0,0,0,.08)" }}
            >
              {[
                { v: "500+", l: "Productos" },
                { v: "12K+", l: "Clientes" },
                { v: "2019", l: "Fundados" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-orbitron font-black text-3xl" style={{ color: "#111111" }}>
                    {s.v}
                  </p>
                  <p
                    className="font-space-mono text-xs uppercase tracking-widest mt-1"
                    style={{ color: "#888" }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna de imagenes + tarjetas */}
          <div className="space-y-4">
            {imagenesGaleria.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {imagenesGaleria.map((img) => (
                  <div
                    key={img.id}
                    className="relative rounded-2xl overflow-hidden"
                    style={{ aspectRatio: "1/1", border: "1px solid rgba(0,0,0,.07)" }}
                  >
                    {img.imagen && (
                      <Image
                        src={img.imagen}
                        alt={img.titulo || "XDrop"}
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {TARJETAS.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.07)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "#e8e7e1" }}
                  >
                    <Icon size={15} style={{ color: "#111111", opacity: 0.7 }} />
                  </div>
                  <div>
                    <p className="font-rajdhani font-bold text-sm" style={{ color: "#111111" }}>
                      {label}
                    </p>
                    <p className="font-inter text-xs mt-0.5" style={{ color: "#888" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div
          className="mt-16 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "#111111" }}
        >
          <div>
            <h3 className="font-orbitron font-black text-xl text-white mb-1">
              ¿Listo para coleccionar?
            </h3>
            <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,.5)" }}>
              Explora nuestro catálogo completo.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-rajdhani font-bold text-sm tracking-wider flex-shrink-0"
            style={{ background: "#ffffff", color: "#111111" }}
          >
            Ver Catálogo <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}