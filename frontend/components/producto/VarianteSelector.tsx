"use client";

import Image from "next/image";
import { VarianteProducto } from "@/lib/api";

const ACCENT = "#c8973a";

export default function VarianteSelector({
  variantes,
  seleccionada,
  onSeleccionar,
}: {
  variantes: VarianteProducto[];
  seleccionada: VarianteProducto | null;
  onSeleccionar: (v: VarianteProducto | null) => void;
}) {
  if (!variantes || variantes.length === 0) return null;

  return (
    <div className="mb-6">
      <p className="font-rajdhani font-bold text-sm mb-2.5" style={{ color: "#111111" }}>
        Elige tu figura{seleccionada ? ": " + seleccionada.nombre : ""}
      </p>
      <div className="flex gap-3 flex-wrap">
        {variantes.map((v) => {
          const activa = seleccionada?.id === v.id;
          const sinStock = v.stock === 0;
          return (
            <button
              key={v.id}
              onClick={() => onSeleccionar(activa ? null : v)}
              disabled={sinStock}
              className="flex flex-col items-center gap-1.5"
              style={{ opacity: sinStock ? 0.35 : 1, cursor: sinStock ? "not-allowed" : "pointer" }}
            >
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  width: 64,
                  height: 64,
                  border: activa ? "2px solid " + ACCENT : "1px solid rgba(0,0,0,.15)",
                  background: "#f0efe9",
                }}
              >
                {v.imagen && (
                  <Image src={v.imagen} alt={v.nombre} fill sizes="64px" className="object-cover" />
                )}
              </div>
              <span
                className="font-rajdhani text-[10px] text-center leading-tight"
                style={{ color: activa ? ACCENT : "#666", maxWidth: 70, fontWeight: activa ? 700 : 500 }}
              >
                {v.nombre}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}