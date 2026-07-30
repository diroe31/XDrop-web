"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductoImagen } from "@/lib/api";

export default function ProductoGaleria({
  imagenes,
  nombre,
}: {
  imagenes: ProductoImagen[];
  nombre: string;
}) {
  const [activa, setActiva] = useState(0);
  const actual = imagenes[activa];

  return (
    <div>
      <div
        className="relative rounded-2xl overflow-hidden mb-3"
        style={{ aspectRatio: "1/1", background: "#f0efe9", border: "1px solid rgba(0,0,0,.07)" }}
      >
        {actual ? (
          <Image
            src={actual.imagen}
            alt={nombre}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <span className="font-orbitron text-sm">Sin imagen</span>
          </div>
        )}
      </div>

      {imagenes.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {imagenes.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiva(i)}
              className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all"
              style={{
                width: 72,
                height: 72,
                border: i === activa ? "2px solid #c8973a" : "1px solid rgba(0,0,0,.1)",
                opacity: i === activa ? 1 : 0.6,
              }}
            >
              <Image src={img.imagen} alt={`${nombre} ${i + 1}`} fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}