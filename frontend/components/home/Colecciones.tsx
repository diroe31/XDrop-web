import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { fetchColecciones, Coleccion } from "@/lib/api";

const ACCENT = "#c8973a";
const BADGES = ["Signature", "New", "Limited", "Bundle"];

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function Badge({ texto }: { texto: string }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-md font-space-mono text-[9px] font-bold uppercase tracking-widest"
      style={{ background: "rgba(255,255,255,.95)", color: "#111111" }}
    >
      {texto}
    </span>
  );
}

function TarjetaGrande({ c, gridRow, badge }: { c: Coleccion; gridRow: string; badge: string }) {
  return (
    <Link
      href={`/catalogo/${c.slug}`}
      className="relative rounded-2xl overflow-hidden group"
      style={{ gridRow, border: "1px solid rgba(0,0,0,.07)" }}
    >
      {c.imagen_portada ? (
        <Image
          src={c.imagen_portada}
          alt={c.nombre}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: "#1a1a1a" }} />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.15) 55%,transparent 100%)" }}
      />
      <div className="absolute top-4 left-4">
        <Badge texto={badge} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="font-orbitron font-bold text-2xl text-white mb-2">{c.nombre}</p>
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

function TarjetaChica({ c, badge }: { c: Coleccion; badge: string }) {
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
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: "#1a1a1a" }} />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,.88) 0%,transparent 55%)" }}
      />
      <div className="absolute top-3 left-3">
        <Badge texto={badge} />
      </div>
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

function GrupoBento({ grupo, offset }: { grupo: Coleccion[]; offset: number }) {
  const badgeDe = (i: number) => BADGES[(offset + i) % BADGES.length];

  if (grupo.length === 4) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr 1.6fr",
          gridTemplateRows: "300px 260px",
          gap: "12px",
        }}
        className="mb-4"
      >
        <TarjetaGrande c={grupo[0]} gridRow="1 / 3" badge={badgeDe(0)} />
        <TarjetaChica c={grupo[1]} badge={badgeDe(1)} />
        <TarjetaChica c={grupo[2]} badge={badgeDe(2)} />
        <TarjetaGrande c={grupo[3]} gridRow="1 / 3" badge={badgeDe(3)} />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {grupo.map((c, i) => (
        <div key={c.id} className="aspect-[3/4] relative">
          <TarjetaChica c={c} badge={badgeDe(i)} />
        </div>
      ))}
    </div>
  );
}

export default async function Colecciones() {
  const data = await fetchColecciones();
  const colecciones = data.results;

  if (colecciones.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="font-inter text-sm opacity-50 text-center">
          Crea tus colecciones desde el admin para verlas aqui.
        </p>
      </section>
    );
  }

  const grupos = chunk(colecciones, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
        <div>
          <p
            className="font-space-mono text-xs font-bold tracking-[.35em] uppercase mb-1.5"
            style={{ color: ACCENT }}
          >
            ✦ Universos
          </p>
          <h2
            className="font-orbitron font-black leading-none"
            style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: "#111111" }}
          >
            COLECCIONES
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

      {grupos.map((grupo, i) => (
        <GrupoBento key={i} grupo={grupo} offset={i * 4} />
      ))}
    </section>
  );
}