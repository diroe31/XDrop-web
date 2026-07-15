"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MENSAJES = [
  "🚚 Envío gratis en pedidos mayores a S/150",
  "🔥 Nuevo stock de miniaturas CS2 disponible",
  "📦 Entrega en 15-25 días hábiles, producto importado",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);

  return (
    <div
      className="flex items-center justify-center gap-4 py-2 px-4 relative"
      style={{ background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,.06)" }}
    >
      <button
        onClick={() => setI((v) => (v - 1 + MENSAJES.length) % MENSAJES.length)}
        className="absolute left-4 opacity-50 hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={14} color="#fff" />
      </button>
      <p className="font-rajdhani font-semibold text-xs tracking-wide text-white text-center">
        {MENSAJES[i]}
      </p>
      <button
        onClick={() => setI((v) => (v + 1) % MENSAJES.length)}
        className="absolute right-4 opacity-50 hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={14} color="#fff" />
      </button>
    </div>
  );
}