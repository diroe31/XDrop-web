import { fetchNosotros } from "@/lib/api";

export default async function NosotrosPage() {
  const data = await fetchNosotros();
  const info = data[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* TODO: reemplazar por el diseno real de Nosotros */}
      <h1 className="font-orbitron text-2xl mb-4">{info?.titulo || "Quienes somos"}</h1>
      <p>{info?.contenido || "TODO: crear el registro desde el admin de Django"}</p>
    </div>
  );
}
