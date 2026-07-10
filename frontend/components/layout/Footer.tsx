"use client";

import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "FAQ" },
];

const WHATSAPP_NUMERO = "51931127906";
const TIKTOK_USUARIO = "xdrop_";
const TIKTOK_URL = "https://tiktok.com/@" + TIKTOK_USUARIO;
const WHATSAPP_URL = "https://wa.me/" + WHATSAPP_NUMERO;

function TikTokIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.82 1.17 3.01.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.62 1.4 5.13L2 22l5.11-1.5a9.87 9.87 0 0 0 4.93 1.33c5.46 0 9.9-4.44 9.9-9.91S17.5 2 12.04 2zm0 17.9a8 8 0 0 1-4.08-1.12l-.29-.17-3.03.89.9-2.96-.19-.3a7.93 7.93 0 0 1-1.22-4.24 7.99 7.99 0 1 1 7.9 7.9z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="py-12 border-t"
      style={{ borderColor: "rgba(0,0,0,.08)", background: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          <div>
            <Image
              src="/logo.png"
              alt="XDrop"
              width={170}
              height={55}
              className="h-15 w-auto mb-4"
            />
            <p
              className="font-inter text-xs leading-relaxed max-w-xs mb-5"
              style={{ color: "rgba(240,239,233,.5)" }}
            >
              Coleccionables gaming, elegidos con cariño para tu colección.
            </p>
            <div className="flex gap-2">
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all"
                style={{ border: "1px solid rgba(255,255,255,.12)" }}
              >
                <TikTokIcon size={14} color="rgba(240,239,233,.5)" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all"
                style={{ border: "1px solid rgba(255,255,255,.12)" }}
              >
                <WhatsAppIcon size={14} color="rgba(240,239,233,.5)" />
              </a>
            </div>
          </div>

          <div>
            <h4
              className="font-rajdhani font-bold text-xs tracking-[.2em] uppercase mb-4"
              style={{ color: "#f0efe9" }}
            >
              Navegación
            </h4>
            <div className="flex flex-col gap-2.5">
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-xs text-left transition-colors hover:!text-[#f0efe9]"
                  style={{ color: "rgba(240,239,233,.45)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-rajdhani font-bold text-xs tracking-[.2em] uppercase mb-4"
              style={{ color: "#f0efe9" }}
            >
              Newsletter
            </h4>
            <p
              className="font-inter text-xs mb-3"
              style={{ color: "rgba(240,239,233,.45)" }}
            >
              Recibe novedades y ofertas exclusivas.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-3.5 py-2.5 rounded-lg font-inter text-xs focus:outline-none"
                style={{
                  background: "rgba(255,255,255,.07)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "#f0efe9",
                }}
              />
              <button
                className="px-4 py-2.5 rounded-lg font-orbitron font-bold text-xs"
                style={{ background: "#f0efe9", color: "#111111" }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}
        >
          <p
            className="font-space-mono text-[10px] tracking-widest"
            style={{ color: "rgba(240,239,233,.3)" }}
          >
            © 2026 XDROP — TODOS LOS DERECHOS RESERVADOS
          </p>
          <p
            className="font-space-mono text-[10px] tracking-widest"
            style={{ color: "rgba(240,239,233,.3)" }}
          >
            HECHO PARA GAMERS
          </p>
        </div>
      </div>
    </footer>
  );
}
