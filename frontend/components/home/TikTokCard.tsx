"use client";

import { useRef } from "react";
import { Heart, Play } from "lucide-react";

function TikTokIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

export interface TikTokVideo {
  id: number;
  titulo: string;
  imagen: string | null;
  video_preview: string | null;
  url_video: string;
  likes: string;
  reproducciones: string;
}

export default function TikTokCard({ video, usuario, perfilUrl }: { video: TikTokVideo; usuario: string; perfilUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <a
      href={video.url_video || perfilUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        width: 200,
        aspectRatio: "9/16",
        background: "#1a1a1a",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      {/* Poster (imagen) - siempre visible de fondo */}
      {video.imagen && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={video.imagen}
          alt={video.titulo || "Video TikTok"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video preview - se reproduce solo al pasar el mouse */}
      {video.video_preview && (
        <video
          ref={videoRef}
          src={video.video_preview}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.1) 50%, transparent 100%)" }}
      />

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <TikTokIcon size={18} color="#ffffff" />
        {video.reproducciones && (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ff2d55" }} />
            <span className="font-space-mono text-[9px] text-white opacity-70">{video.reproducciones}</span>
          </div>
        )}
      </div>

      {video.likes && (
        <div className="absolute right-2.5 bottom-24 flex flex-col items-center gap-0.5 pointer-events-none">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)" }}
          >
            <Heart size={16} fill="white" color="white" />
          </div>
          <span className="font-space-mono text-[9px] text-white">{video.likes}</span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
        <p className="font-rajdhani font-bold text-xs text-white mb-1">@{usuario}</p>
        {video.titulo && (
          <p
            className="font-inter text-[10px] leading-snug"
            style={{
              color: "rgba(255,255,255,.7)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {video.titulo}
          </p>
        )}
      </div>

      {!video.video_preview && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,.2)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.3)" }}
          >
            <Play size={22} fill="white" color="white" style={{ marginLeft: 2 }} />
          </div>
        </div>
      )}
    </a>
  );
}