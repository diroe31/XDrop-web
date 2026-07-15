import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { fetchColecciones, Coleccion } from "@/lib/api";

const ACCENT = "#c8973a";

function TarjetaGrande({ c }: { c: Coleccion }) {
  return (
    <Link
      href={`/catalogo/${c.slug}`}
      className="relative rounded-2xl overflow-hidden group block h-full"
      style={{ border: "1px solid rgba(0,0,0,.07)" }}
    >
      {c.imagen_portada ? (
        <Image
          src={c.imagen_portada}
          alt={c.nombre}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: "#1a1a1a" }} />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.1) 55%,transparent 100%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p className="font-orbitron font-bold text-3xl text-white mb-2">{c.nombre}</p>
        <div className="flex items-center gap-1.5">
          <span
            className="font-rajdhani font-bold text-xs tracking-widest uppercase"
            style={{ color: ACCENT }}
          >
            Ver colección
          </span>
          <ArrowRight size={13} color={ACCENT} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function TarjetaChica({ c }: { c: Coleccion }) {
  return (
    <Link
      href={`/catalogo/${c.slug}`}
      className="relative rounded-2xl overflow-hidden group block w-full h-full"
      style={{ border: "1px solid rgba(0,0,0,.07)" }}
    >
      {c.imagen_portada ? (
        <Image
          src={c.imagen_portada}
          alt={c.nombre}
          fill
          sizes="(max-width: 768px) 50vw, 22vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: "#1a1a1a" }} />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,.88) 0%,transparent 55%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-orbitron font-bold text-lg text-white mb-1">{c.nombre}</p>
        <div className="flex items-center gap-1">
          <span
            className="font-rajdhani font-bold text-[10px] tracking-widest uppercase"
            style={{ color: ACCENT }}
          >
            Ver más
          </span>
          <ArrowRight size={11} color={ACCENT} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default async function Colecciones() {
  const data = await fetchColecciones();
  const colecciones = data.results;

  if (colecciones.length === 0) {
    return (
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="font-inter text-sm opacity-50 text-center">
          Crea tus colecciones desde el admin para verlas aqui.
        </p>
      </section>
    );
  }

  const [principal, ...resto] = colecciones;

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
        <div>
          <p
            className="font-space-mono text-xs font-bold tracking-[.35em] uppercase mb-1.5"
            style={{ color: ACCENT }}
          >
            ✦ Universos
          </p>
          <h2
            className="font-rajdhani font-extrabold uppercase leading-none"
            style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", color: "#111111", letterSpacing: "0.01em" }}
          >
            Colecciones
          </h2>
        </div>
        <Link
          href="/catalogo"
          className="font-rajdhani font-bold text-sm tracking-wide flex items-center gap-1.5"
          style={{ color: ACCENT }}
        >
          Ver todas <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-3.5" style={{ height: 620 }}>
        <div className="w-full md:w-[55%] h-full">
          <TarjetaGrande c={principal} />
        </div>

        {resto.length > 0 && (
          <div
            className="w-full md:w-[45%] h-full grid grid-cols-2 gap-3.5"
            style={{ gridAutoRows: "1fr" }}
          >
            {resto.map((c) => (
              <TarjetaChica key={c.id} c={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}