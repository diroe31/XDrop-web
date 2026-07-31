"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCarrito } from "@/components/carrito/CarritoContext";
import { crearPedido } from "@/lib/api";

const ACCENT = "#c8973a";

const PUNTOS_RECOJO = [
  { value: "plaza_puruchuco", label: "Real Plaza Puruchuco" },
  { value: "mall_santa_anita", label: "Mall Aventura Santa Anita" },
  { value: "plaza_norte", label: "Plaza Norte" },
  { value: "megaplaza", label: "Megaplaza" },
];

export default function CarritoPage() {
  const { items, actualizarCantidad, quitar, vaciar, totalPrecio } = useCarrito();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState<"shalom" | "contraentrega">("shalom");
  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [puntoRecojo, setPuntoRecojo] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmar = async () => {
    setError("");

    if (!nombre.trim() || !telefono.trim()) {
      setError("Completa tu nombre y teléfono.");
      return;
    }
    if (tipoEntrega === "contraentrega" && !puntoRecojo) {
      setError("Elige un punto de recojo.");
      return;
    }
    if (items.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await crearPedido({
        nombre,
        telefono,
        departamento: tipoEntrega === "shalom" ? departamento : undefined,
        provincia: tipoEntrega === "shalom" ? provincia : undefined,
        distrito: tipoEntrega === "shalom" ? distrito : undefined,
        tipo_entrega: tipoEntrega,
        punto_recojo: tipoEntrega === "contraentrega" ? puntoRecojo : undefined,
        items: items.map((i) => ({ producto_id: i.productoId, cantidad: i.cantidad })),
      });

      vaciar();
      window.location.href = respuesta.link_whatsapp;
    } catch {
      setError("Algo salió mal al crear tu pedido. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#f5f4f0" }}>
        <p className="font-orbitron font-black text-2xl mb-3" style={{ color: "#111111" }}>
          Tu carrito está vacío
        </p>
        <p className="font-inter text-sm mb-8" style={{ color: "#888" }}>
          Explora el catálogo y encuentra tu próxima pieza.
        </p>
        <Link
          href="/catalogo"
          className="px-8 py-3.5 rounded-xl font-rajdhani font-bold text-sm tracking-wider"
          style={{ background: "#111111", color: "#fff" }}
        >
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ background: "#f5f4f0" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="font-orbitron font-black mb-8"
          style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#111111" }}
        >
          TU CARRITO
        </h1>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          {/* Lista de productos */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.productoId}
                className="flex gap-4 p-4 rounded-2xl"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,.07)" }}
              >
                <div className="relative flex-shrink-0 rounded-xl overflow-hidden" style={{ width: 80, height: 80, background: "#f0efe9" }}>
                  {item.imagen && (
                    <Image src={item.imagen} alt={item.nombre} fill sizes="80px" className="object-cover" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-rajdhani font-bold text-sm mb-1" style={{ color: "#111111" }}>
                    {item.nombre}
                  </p>
                  <p className="font-orbitron font-bold text-base mb-2" style={{ color: ACCENT }}>
                    S/{item.precio}
                  </p>

                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center rounded-lg overflow-hidden"
                      style={{ border: "1px solid rgba(0,0,0,.15)" }}
                    >
                      <button
                        onClick={() => actualizarCantidad(item.productoId, item.cantidad - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-black/5"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-rajdhani font-bold text-sm">{item.cantidad}</span>
                      <button
                        onClick={() => actualizarCantidad(item.productoId, item.cantidad + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-black/5"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => quitar(item.productoId)}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} style={{ color: "#ef4444" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulario + resumen */}
          <div className="p-6 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(0,0,0,.07)" }}>
            <div className="flex items-center justify-between mb-5 pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,.08)" }}>
              <span className="font-rajdhani font-bold text-sm" style={{ color: "#666" }}>Subtotal</span>
              <span className="font-orbitron font-black text-xl" style={{ color: "#111111" }}>
                S/{totalPrecio.toFixed(2)}
              </span>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ border: "1px solid rgba(0,0,0,.15)" }}
              />
              <input
                type="tel"
                placeholder="Teléfono (WhatsApp)"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ border: "1px solid rgba(0,0,0,.15)" }}
              />

              <div>
                <p className="font-rajdhani font-bold text-sm mb-2" style={{ color: "#111111" }}>
                  Tipo de entrega
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTipoEntrega("shalom")}
                    className="py-2.5 rounded-xl font-rajdhani font-bold text-sm transition-all"
                    style={{
                      background: tipoEntrega === "shalom" ? "#111111" : "#f5f4f0",
                      color: tipoEntrega === "shalom" ? "#fff" : "#111111",
                    }}
                  >
                    Envío Shalom
                  </button>
                  <button
                    onClick={() => setTipoEntrega("contraentrega")}
                    className="py-2.5 rounded-xl font-rajdhani font-bold text-sm transition-all"
                    style={{
                      background: tipoEntrega === "contraentrega" ? "#111111" : "#f5f4f0",
                      color: tipoEntrega === "contraentrega" ? "#fff" : "#111111",
                    }}
                  >
                    Contraentrega (+S/2.50)
                  </button>
                </div>
              </div>

              {tipoEntrega === "shalom" ? (
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Depto."
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    className="px-3 py-2.5 rounded-xl text-xs"
                    style={{ border: "1px solid rgba(0,0,0,.15)" }}
                  />
                  <input
                    type="text"
                    placeholder="Provincia"
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="px-3 py-2.5 rounded-xl text-xs"
                    style={{ border: "1px solid rgba(0,0,0,.15)" }}
                  />
                  <input
                    type="text"
                    placeholder="Distrito"
                    value={distrito}
                    onChange={(e) => setDistrito(e.target.value)}
                    className="px-3 py-2.5 rounded-xl text-xs"
                    style={{ border: "1px solid rgba(0,0,0,.15)" }}
                  />
                </div>
              ) : (
                <select
                  value={puntoRecojo}
                  onChange={(e) => setPuntoRecojo(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{ border: "1px solid rgba(0,0,0,.15)" }}
                >
                  <option value="">Elige un punto de recojo</option>
                  {PUNTOS_RECOJO.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              )}

              {error && (
                <p className="font-inter text-xs" style={{ color: "#ef4444" }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleConfirmar}
                disabled={enviando}
                className="w-full py-4 rounded-xl font-rajdhani font-bold text-base tracking-wider flex items-center justify-center gap-2 transition-opacity"
                style={{ background: ACCENT, color: "#fff", opacity: enviando ? 0.6 : 1 }}
              >
                {enviando ? "Enviando..." : "Confirmar por WhatsApp"} <ArrowRight size={16} />
              </button>

              <p className="font-inter text-[11px] text-center" style={{ color: "#999" }}>
                Te llevaremos a WhatsApp para terminar tu compra con nosotros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}