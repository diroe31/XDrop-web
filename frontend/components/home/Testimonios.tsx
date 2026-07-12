import { Star } from "lucide-react";
import { fetchContenidoHome } from "@/lib/api";

const ACCENT = "#c8973a";

export default async function Testimonios() {
  const comentarios = await fetchContenidoHome("comentario");

  if (comentarios.length === 0) {
    return (
      <section
        style={{
          background: "#eae8e2",
          padding: "5rem 0",
          borderTop: "1px solid rgba(0,0,0,.06)",
          borderBottom: "1px solid rgba(0,0,0,.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-inter text-sm opacity-50 text-center">
            Agrega comentarios de tipo &quot;Comentario / Resena&quot; desde el admin para verlos aqui.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#eae8e2",
        padding: "5rem 0",
        borderTop: "1px solid rgba(0,0,0,.06)",
        borderBottom: "1px solid rgba(0,0,0,.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p
            className="font-space-mono text-xs tracking-[.3em] uppercase mb-1.5"
            style={{ color: ACCENT }}
          >
            Lo que dicen
          </p>
          <h2 className="font-orbitron font-black text-2xl" style={{ color: "#111111" }}>
            COLECCIONISTAS REALES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comentarios.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,.07)",
                boxShadow: "0 2px 12px rgba(0,0,0,.05)",
              }}
            >
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(c.calificacion || 5)].map((_, j) => (
                  <Star key={j} size={13} fill={ACCENT} color={ACCENT} />
                ))}
              </div>
              <p
                className="font-inter text-sm leading-relaxed mb-4"
                style={{ color: "#111111", fontStyle: "italic" }}
              >
                &quot;{c.texto}&quot;
              </p>
              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}
              >
                <div>
                  <p className="font-rajdhani font-bold text-sm" style={{ color: "#111111" }}>
                    {c.autor_nombre}
                  </p>
                  {c.autor_ubicacion && (
                    <p className="font-space-mono text-[10px] tracking-wider" style={{ color: "#888" }}>
                      {c.autor_ubicacion}
                    </p>
                  )}
                </div>
                {c.etiqueta_producto && (
                  <span
                    className="font-space-mono text-[10px] px-2.5 py-1 rounded-lg"
                    style={{ background: "#f5f4f0", color: "#888", border: "1px solid rgba(0,0,0,.07)" }}
                  >
                    {c.etiqueta_producto}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}