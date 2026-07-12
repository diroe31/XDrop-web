import { Shield, Truck, Package, Zap } from "lucide-react";

const ITEMS = [
  { icon: Shield, label: "100% Auténtico", desc: "Certificado por fabricante oficial" },
  { icon: Truck, label: "Envío Gratis +S/150", desc: "Empaque especializado para coleccionables" },
  { icon: Package, label: "Stock Exclusivo", desc: "Piezas raras y de edición limitada" },
  { icon: Zap, label: "Soporte 24/7", desc: "Atención personalizada para coleccionistas" },
];

export default function TrustStrip() {
  return (
    <div className="py-16" style={{ borderTop: "2px solid rgba(0,0,0,.07)", background: "#f5f4f0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {ITEMS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#111111" }}
              >
                <Icon size={24} style={{ color: "#c8973a" }} />
              </div>
              <div>
                <p className="font-rajdhani font-bold text-base" style={{ color: "#111111" }}>
                  {label}
                </p>
                <p className="font-inter text-sm mt-0.5" style={{ color: "#777" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}