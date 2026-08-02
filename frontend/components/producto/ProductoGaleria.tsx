"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProductoImagen } from "@/lib/api";

const ACCENT = "#c8973a";

export default function ProductoGaleria({
  imagenes,
  nombre,
  imagenVariante,
}: {
  imagenes: ProductoImagen[];
  nombre: string;
  imagenVariante?: string | null;
}) {
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    if (imagenVariante) setActiva(-1);
    else setActiva(0);
  }, [imagenVariante]);

  const imagenPrincipal = imagenVariante || imagenes[activa]?.imagen;

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2 flex-shrink-0" style={{ width: 64 }}>
        {imagenes.map((img, i) => {
          const activaEsta = activa === i && !imagenVariante;
          return (
            <button
              key={img.id}
              onClick={() => setActiva(i)}
              className="relative rounded-lg overflow-hidden transition-all"
              style={{
                width: 64,
                height: 64,
                border: activaEsta ? "2px solid " + ACCENT : "1px solid rgba(0,0,0,.12)",
                opacity: activaEsta ? 1 : 0.65,
              }}
            >
              <Image src={img.imagen} alt={nombre + " " + (i + 1)} fill sizes="64px" className="object-cover" />
            </button>
          );
        })}
      </div>

      <div style={{ flex: "1 1 0%", minWidth: 0 }}>
        <div style={{ position: "relative", width: "100%", paddingTop: "100%" }}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#f0efe9",
              border: "1px solid rgba(0,0,0,.07)",
            }}
          >
            {imagenPrincipal ? (
              <Image
                src={imagenPrincipal}
                alt={nombre}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <span className="font-orbitron text-sm">Sin imagen</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}