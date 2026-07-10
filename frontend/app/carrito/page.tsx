"use client";

export default function CarritoPage() {
  // TODO: leer el carrito desde un Context global (crear en components/carrito/CarritoContext.tsx)
  // TODO: formulario con nombre, telefono, tipo_entrega (shalom/contraentrega), punto_recojo si aplica
  // TODO: al enviar, llamar a crearPedido() de lib/api.ts y redirigir a data.link_whatsapp

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-orbitron text-2xl">Carrito</h1>
      <p className="text-sm opacity-60">TODO: construir segun diseno de Figma</p>
    </div>
  );
}
