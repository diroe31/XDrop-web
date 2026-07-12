"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fetchPreguntas, Pregunta } from "@/lib/api";

const WHATSAPP_NUMERO = "51931127906";

export default function FaqPage() {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [abierta, setAbierta] = useState<number | null>(null);

  useEffect(() => {
    fetchPreguntas()
      .then(setPreguntas)
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="min-h-screen py-16" style={{ background: "#f0efe9" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p
            className="font-space-mono text-xs tracking-[.3em] uppercase mb-2"
            style={{ color: "#888" }}
          >
            Ayuda
          </p>
          <h1
            className="font-orbitron font-black mb-3"
            style={{ fontSize: "clamp(2.2rem,5vw,4rem)", color: "#111111" }}
          >
            PREGUNTAS
            <br />
            FRECUENTES
          </h1>
          <p className="font-inter" style={{ color: "#777" }}>
            Todo lo que necesitas saber antes de tu compra.
          </p>
        </div>

        {cargando ? (
          <p className="font-inter text-sm opacity-50 mb-12">Cargando...</p>
        ) : preguntas.length === 0 ? (
          <p className="font-inter text-sm opacity-50 mb-12">
            Agrega preguntas desde el admin para verlas aqui.
          </p>
        ) : (
          <div className="space-y-2 mb-12">
            {preguntas.map((faq, i) => {
              const abiertaAhora = abierta === i;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    background: abiertaAhora ? "#ffffff" : "#eae9e3",
                    border: "1px solid rgba(0,0,0,.07)",
                    boxShadow: abiertaAhora ? "0 4px 20px rgba(0,0,0,.08)" : "none",
                  }}
                >
                  <button
                    onClick={() => setAbierta(abiertaAhora ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                  >
                    <span className="font-rajdhani font-bold text-sm" style={{ color: "#111111" }}>
                      {faq.pregunta}
                    </span>
                    <motion.div
                      animate={{ rotate: abiertaAhora ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={16} style={{ color: "#888" }} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {abiertaAhora && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5" style={{ borderTop: "1px solid rgba(0,0,0,.07)" }}>
                          <p
                            className="font-inter text-sm leading-relaxed pt-4"
                            style={{ color: "#777" }}
                          >
                            {faq.respuesta}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-7 rounded-2xl text-center"
          style={{ background: "#111111" }}
        >
          <p className="font-orbitron font-bold text-base text-white mb-1">
            ¿No encontraste tu respuesta?
          </p>
          <p className="font-inter text-xs mb-5" style={{ color: "rgba(255,255,255,.5)" }}>
            Nuestro equipo responde en menos de 24 horas
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 rounded-xl font-rajdhani font-bold text-sm tracking-wider"
            style={{ background: "#ffffff", color: "#111111" }}
          >
            Contactar Soporte
          </a>
        </motion.div>
      </div>
    </div>
  );
}