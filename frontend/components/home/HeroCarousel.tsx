"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export interface Slide {
  img: string;
  label: string;
  titleLines: string[];
  textoBoton: string;
  urlBoton: string;
}

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const cur = slides[slide];
  if (!cur) return null;

  const esExterno = cur.urlBoton.startsWith("http");

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "92vh", minHeight: 560, background: "#0e1014", marginTop: "-4rem" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {cur.img && (
        <AnimatePresence mode="sync">
          <motion.img
            key={cur.img}
            src={cur.img}
            alt="Banner"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg,rgba(10,10,12,.88) 0%,rgba(10,10,12,.45) 55%,rgba(10,10,12,.08) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top,rgba(10,10,12,1) 0%,transparent 48%)" }}
      />

      <div className="absolute inset-0 flex flex-col justify-end pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {cur.label && (
              <p
                className="font-space-mono text-xs tracking-[.35em] uppercase mb-4"
                style={{ color: "#c8973a" }}
              >
                {cur.label}
              </p>
            )}
            <h1
              className="font-orbitron font-black leading-none mb-7"
              style={{ fontSize: "clamp(3rem,8vw,6.5rem)", color: "#ffffff" }}
            >
              {cur.titleLines.map((line, li) => (
                <span
                  key={li}
                  className="block"
                  style={li === 1 ? { color: "rgba(255,255,255,.3)" } : {}}
                >
                  {line}
                </span>
              ))}
            </h1>
            <a
              href={cur.urlBoton}
              target={esExterno ? "_blank" : undefined}
              rel={esExterno ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-rajdhani font-bold text-sm tracking-wider hover:opacity-85 transition-opacity"
              style={{ background: "#c8973a", color: "#fff" }}
            >
              {cur.textoBoton} <ArrowRight size={16} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
          style={{ zIndex: 10 }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? 28 : 8,
                height: 8,
                borderRadius: 4,
                padding: 0,
                border: "none",
                cursor: "pointer",
                background: i === slide ? "#c8973a" : "rgba(255,255,255,.3)",
                transition: "all .3s ease",
              }}
            />
          ))}
        </div>
      )}

      {slides.length > 1 && (
        <>
          <button
            onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/15 transition-all"
            style={{
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,.15)",
              zIndex: 10,
            }}
          >
            <ChevronDown size={18} color="#fff" style={{ transform: "rotate(90deg)" }} />
          </button>
          <button
            onClick={() => setSlide((s) => (s + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/15 transition-all"
            style={{
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,.15)",
              zIndex: 10,
            }}
          >
            <ChevronDown size={18} color="#fff" style={{ transform: "rotate(-90deg)" }} />
          </button>
        </>
      )}
    </div>
  );
}