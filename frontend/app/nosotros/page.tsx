import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Truck,
  Package,
  Zap,
  Search,
  CheckCircle,
  Gift,
} from "lucide-react";
import { fetchNosotros, fetchContenidoHome } from "@/lib/api";

const ACCENT = "#c8973a";

const TARJETAS = [
  { icon: Shield, label: "Selección auténtica", desc: "Elegimos cada pieza con cuidado" },
  { icon: Truck, label: "Envíos seguros", desc: "Empaque especializado para coleccionables" },
  { icon: Package, label: "Piezas especiales", desc: "Stock limitado y ediciones únicas" },
  { icon: Zap, label: "Atención cercana", desc: "Te acompañamos antes y después de tu compra" },
];

const PASOS = [
  {
    icon: Search,
    numero: "1",
    titulo: "Buscar",
    desc: "Exploramos cada rincón para encontrar piezas únicas y tendencias que te encantarán.",
  },
  {
    icon: CheckCircle,
    numero: "2",
    titulo: "Seleccionar",
    desc: "Evaluamos calidad y detalle para que solo recibas lo mejor.",
  },
  {
    icon: Gift,
    numero: "3",
    titulo: "Entregar",
    desc: "Preparamos tu pedido con cuidado y lo enviamos hasta tu puerta.",
  },
];

export default async function NosotrosPage() {
  const [data, galeria] = await Promise.all([
    fetchNosotros(),
    fetchContenidoHome("galeria"),
  ]);

  const info = data[0];
  const titulo = (info?.titulo || "MÁS QUE UNA TIENDA|UNA COMUNIDAD").split("|").map((l) => l.trim());
  const parrafos = (info?.contenido || "Aun no se ha cargado el texto de Quienes Somos desde el admin.")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const imagenBanner = info?.imagen;
  const imagenesGaleria = galeria.slice(0, 3);

  return (
    <div className="min-h-screen py-16" style={{ background: "#f0efe9" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner superior */}
        <div
          className="relative w-full rounded-3xl overflow-hidden mb-20"
          style={{ height: 460, background: "#111" }}
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
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20">
            <p
              className="font-space-mono text-sm tracking-[.3em] uppercase mb-4"
              style={{ color: ACCENT }}
            >
              Nuestra historia
            </p>
            <h1
              className="font-orbitron font-black text-white leading-none mb-5"
              style={{ fontSize: "clamp(2.8rem,6.5vw,5.5rem)" }}
            >
              {titulo.map((linea, i) => (
                <span key={i} className="block">
                  {linea}
                </span>
              ))}
            </h1>
            <p className="font-inter text-lg max-w-lg" style={{ color: "rgba(255,255,255,.65)" }}>
              Conectamos coleccionistas con piezas únicas que cuentan historias y crean momentos.
            </p>
          </div>
        </div>

        {/* La pasión detrás de XDrop */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <div style={{ borderLeft: "4px solid " + ACCENT, paddingLeft: "1.4rem" }} className="mb-8">
              <h2 className="font-orbitron font-black text-3xl" style={{ color: "#111111" }}>
                La pasión detrás de XDrop
              </h2>
            </div>
            {parrafos.map((p, i) => (
              <p
                key={i}
                className="font-inter leading-relaxed mb-6"
                style={{ color: "#555", fontSize: i === 0 ? "1.1rem" : "1rem" }}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="space-y-4">
            {imagenesGaleria.length > 0 && (
              <>
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ aspectRatio: "16/10", border: "1px solid rgba(0,0,0,.07)" }}
                >
                  {imagenesGaleria[0]?.imagen && (
                    <Image
                      src={imagenesGaleria[0].imagen}
                      alt="XDrop"
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  )}
                </div>
                {imagenesGaleria.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {imagenesGaleria.slice(1, 3).map((img) => (
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
              </>
            )}
          </div>
        </div>

        {/* Datos reales, sin inventar cifras */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20 p-10 rounded-2xl"
          style={{ background: "#111111" }}
        >
          {[
            { v: "2026", l: "Recién empezando" },
            { v: "100%", l: "Piezas elegidas a mano" },
            { v: "Perú", l: "Envíos a todo el país" },
            { v: "24/7", l: "Atención por WhatsApp" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-orbitron font-black text-4xl md:text-5xl" style={{ color: ACCENT }}>
                {s.v}
              </p>
              <p
                className="font-space-mono text-xs uppercase tracking-widest mt-2"
                style={{ color: "rgba(255,255,255,.55)" }}
              >
                {s.l}
              </p>
            </div>
          ))}
        </div>

        {/* Lo que nos mueve */}
        <div className="mb-20">
          <h2
            className="font-orbitron font-black text-3xl text-center mb-10"
            style={{ color: "#111111" }}
          >
            Lo que nos mueve
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {TARJETAS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="p-7 rounded-2xl text-center"
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.07)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(200,151,58,.12)" }}
                >
                  <Icon size={24} style={{ color: ACCENT }} />
                </div>
                <p className="font-rajdhani font-bold text-base mb-1.5" style={{ color: "#111111" }}>
                  {label}
                </p>
                <p className="font-inter text-sm" style={{ color: "#888" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* De coleccionistas para coleccionistas */}
        <div className="mb-20">
          <h2
            className="font-orbitron font-black text-3xl text-center mb-12"
            style={{ color: "#111111" }}
          >
            De coleccionistas para coleccionistas
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {PASOS.map(({ icon: Icon, numero, titulo, desc }) => (
              <div key={numero} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 font-orbitron font-black text-xl"
                  style={{ background: ACCENT, color: "#fff" }}
                >
                  {numero}
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Icon size={20} style={{ color: ACCENT }} />
                  <p className="font-rajdhani font-bold text-xl" style={{ color: "#111111" }}>
                    {titulo}
                  </p>
                </div>
                <p className="font-inter text-sm max-w-xs mx-auto" style={{ color: "#888" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div
          className="rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background: "#111111" }}
        >
          <div>
            <h3 className="font-orbitron font-black text-3xl text-white mb-2">
              ¿Listo para coleccionar?
            </h3>
            <p className="font-inter text-base" style={{ color: "rgba(255,255,255,.5)" }}>
              Explora nuestro catálogo completo.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="flex items-center gap-2 px-10 py-4 rounded-xl font-rajdhani font-bold text-base tracking-wider flex-shrink-0"
            style={{ background: ACCENT, color: "#fff" }}
          >
            Ver Catálogo <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}