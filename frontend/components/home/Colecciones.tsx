import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { fetchColecciones, Coleccion } from "@/lib/api";

const ACCENT = "#c8973a";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function TarjetaGrande({ c, gridRow }: { c: Coleccion; gridRow: string }) {
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
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: "#1a1a1a" }} />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.1) 55%,transparent 100%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: ACCENT }} />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p
          className="font-space-mono text-[10px] uppercase tracking-widest mb-1"
          style={{ color: ACCENT }}
        >
          {c.categorias.length} categorías
        </p>
        <p className="font-orbitron font-bold text-2xl text-white">{c.nombre}</p>
        <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <span className="font-rajdhani font-bold text-sm text-white">Ver colección</span>
          <ArrowRight size={13} color="#fff" />
        </div>
      </div>
    </Link>
  );
}

function TarjetaChica({ c }: { c: Coleccion }) {
  return (
    <Link
      href={`/catalogo/${c.slug}`}
      className="relative rounded-2xl overflow-hidden group"
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
        style={{ background: "linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 55%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: ACCENT }} />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="font-space-mono text-[10px] uppercase tracking-widest mb-0.5"
          style={{ color: ACCENT }}
        >
          {c.categorias.length} categorías
        </p>
        <p className="font-orbitron font-bold text-lg text-white">{c.nombre}</p>
      </div>
    </Link>
  );
}

function GrupoBento({ grupo }: { grupo: Coleccion[] }) {
  // Patron ideal: 4 colecciones -> [grande, chica-arriba, chica-abajo, grande]
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
        <TarjetaGrande c={grupo[0]} gridRow="1 / 3" />
        <TarjetaChica c={grupo[1]} />
        <TarjetaChica c={grupo[2]} />
        <TarjetaGrande c={grupo[3]} gridRow="1 / 3" />
      </div>
    );
  }

  // Si no son exactamente 4 (tienen mas o menos colecciones), caemos a una
  // cuadricula pareja simple, para que nunca se vea roto.
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {grupo.map((c) => (
        <div key={c.id} className="aspect-[3/4] relative">
          <TarjetaChica c={c} />
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
      <p
        className="font-space-mono text-xs tracking-[.3em] uppercase mb-1.5"
        style={{ color: ACCENT }}
      >
        Universos
      </p>
      <h2
        className="font-orbitron font-black mb-10"
        style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: "#111111" }}
      >
        COLECCIONES
      </h2>

      {grupos.map((grupo, i) => (
        <GrupoBento key={i} grupo={grupo} />
      ))}
    </section>
  );
}