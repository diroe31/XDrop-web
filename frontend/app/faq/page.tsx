import { fetchPreguntas } from "@/lib/api";

export default async function FaqPage() {
  const preguntas = await fetchPreguntas();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* TODO: reemplazar por el diseno real de FAQ (acordeon) */}
      <h1 className="font-orbitron text-2xl mb-6">Preguntas Frecuentes</h1>
      {preguntas.map((p) => (
        <div key={p.id} className="mb-4">
          <p className="font-bold">{p.pregunta}</p>
          <p className="text-sm opacity-70">{p.respuesta}</p>
        </div>
      ))}
    </div>
  );
}
