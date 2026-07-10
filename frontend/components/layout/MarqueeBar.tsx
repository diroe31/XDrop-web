import { CreditCard, Truck, RefreshCw, Shield, Award, Tag, Package, Star } from "lucide-react";

const MARQUEE_ITEMS = [
  { icon: CreditCard, text: "PAGO SEGURO" },
  { icon: Truck, text: "ENVÍO A TODO EL PAÍS" },
  { icon: RefreshCw, text: "DEVOLUCIÓN 30 DÍAS" },
  { icon: Shield, text: "100% ORIGINALES" },
  { icon: Award, text: "EDICIÓN LIMITADA" },
  { icon: Tag, text: "ENVÍO GRATIS +S/150" },
  { icon: Package, text: "EMPAQUE ESPECIALIZADO" },
  { icon: Star, text: "GARANTÍA OFICIAL" },
];

export default function MarqueeBar() {
  const tripled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="overflow-hidden py-3.5" style={{ background: "#111111" }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee-scroll 28s linear infinite",
        }}
      >
        {tripled.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-2.5 px-8" style={{ flexShrink: 0 }}>
              <Icon size={14} style={{ color: "#ffffff", opacity: 0.7 }} />
              <span
                className="font-space-mono text-xs tracking-[.25em] uppercase whitespace-nowrap"
                style={{ color: "#ffffff", opacity: 0.85 }}
              >
                {item.text}
              </span>
              <span style={{ color: "rgba(255,255,255,.25)", fontSize: 10 }}>✦</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}