import { ArrowRight } from "lucide-react";

const ACCENT = "#c8973a";
const WHATSAPP_NUMERO = "51931127906"; // mismo numero que en pedidos y footer
const TIKTOK_USUARIO = "xdrop_"; // mismo usuario que en el footer

function TikTokIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

export default function Comunidad() {
  return (
    <section style={{ background: "#111111", padding: "5rem 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="font-space-mono text-xs tracking-[.3em] uppercase mb-2"
            style={{ color: ACCENT }}
          >
            No te pierdas nada
          </p>
          <h2 className="font-orbitron font-black text-white text-2xl md:text-3xl mb-3">
            ÚNETE A LA COMUNIDAD
          </h2>
          <p className="font-inter text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,.4)" }}>
            Entérate de los próximos drops, ofertas exclusivas y novedades antes que nadie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl flex flex-col gap-4 cursor-pointer group transition-all"
            style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(37,211,102,.15)" }}
            >
              <span style={{ fontSize: 20 }}>💬</span>
            </div>
            <div className="flex-1">
              <p className="font-rajdhani font-bold text-base text-white mb-0.5">Atención por WhatsApp</p>
              <p className="font-inter text-xs mb-2" style={{ color: "rgba(255,255,255,.4)" }}>
                Asesoría personalizada para tu compra. Respondemos rápido.
              </p>
            </div>
            <span
              className="flex items-center gap-2 font-rajdhani font-bold text-sm"
              style={{ color: "#25d366" }}
            >
              Chatear ahora <ArrowRight size={14} />
            </span>
          </a>

          <a
            href={`https://tiktok.com/@${TIKTOK_USUARIO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl flex flex-col gap-4 cursor-pointer group transition-all"
            style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(200,151,58,.15)" }}
            >
              <TikTokIcon size={20} color={ACCENT} />
            </div>
            <div className="flex-1">
              <p className="font-rajdhani font-bold text-base text-white mb-0.5">TikTok</p>
              <p className="font-inter text-xs" style={{ color: "rgba(255,255,255,.4)" }}>
                Contenido exclusivo, unboxings y drops sorpresa antes que nadie.
              </p>
            </div>
            <span
              className="flex items-center gap-2 font-rajdhani font-bold text-sm"
              style={{ color: ACCENT }}
            >
              Seguir en TikTok <ArrowRight size={14} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}