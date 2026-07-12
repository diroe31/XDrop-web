import { ChevronRight } from "lucide-react";
import { fetchContenidoHome, fetchTikTokThumbnail } from "@/lib/api";
import TikTokCard from "./TikTokCard";

const ACCENT = "#c8973a";
const TIKTOK_USUARIO = "xdrop_"; // mismo usuario que en el Footer

function TikTokIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

export default async function TikTokFeed() {
  const videos = await fetchContenidoHome("video_tiktok");
  const perfilUrl = `https://tiktok.com/@${TIKTOK_USUARIO}`;

  // Para los videos sin "Imagen" subida a mano, pedimos la miniatura oficial
  // de TikTok automaticamente (no gasta espacio de Supabase).
  const videosConPoster = await Promise.all(
    videos.map(async (v) => ({
      ...v,
      posterFinal: v.imagen || (await fetchTikTokThumbnail(v.url_video)),
    }))
  );

  return (
    <section style={{ background: "#0e0e0e", padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <TikTokIcon size={18} color={ACCENT} />
            <p className="font-space-mono text-xs tracking-[.3em] uppercase" style={{ color: ACCENT }}>
              @{TIKTOK_USUARIO}
            </p>
          </div>
          <h2 className="font-orbitron font-black text-white text-2xl md:text-3xl">EN TIKTOK</h2>
        </div>
        <a
          href={perfilUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 font-rajdhani font-bold text-sm tracking-wider transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,.35)" }}
        >
          Seguir <ChevronRight size={15} />
        </a>
      </div>

      {videosConPoster.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-inter text-sm opacity-50 text-center text-white">
            Sube videos de tipo &quot;Video de TikTok&quot; desde el admin para verlos aqui.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 px-4 sm:px-6 lg:px-8 justify-center">
          {videosConPoster.map((v) => (
            <TikTokCard
              key={v.id}
              video={{ ...v, imagen: v.posterFinal }}
              usuario={TIKTOK_USUARIO}
              perfilUrl={perfilUrl}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex justify-center">
        <a
          href={perfilUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-rajdhani font-bold text-sm tracking-wider hover:opacity-85 transition-opacity"
          style={{ background: "#111111", border: "1px solid rgba(255,255,255,.15)", color: "#ffffff" }}
        >
          <TikTokIcon size={16} color="#ffffff" />
          Seguirnos en TikTok
        </a>
      </div>
    </section>
  );
}