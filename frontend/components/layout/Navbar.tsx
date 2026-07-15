"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";

const ACCENT = "#c8973a";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const enHome = pathname === "/";
  const solido = scrolled || !enHome;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-300"
      style={{
        background: solido ? "rgba(14,16,20,.93)" : "transparent",
        borderBottom: solido ? "1px solid rgba(255,255,255,.07)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="XDrop" width={170} height={55} className="h-11 w-auto" priority />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-rajdhani text-xs font-semibold tracking-[.2em] uppercase pb-0.5 transition-colors relative"
                style={{ color: isActive(link.href) ? ACCENT : "rgba(240,239,233,.6)" }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px" style={{ background: ACCENT }} />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Link href="/carrito" className="relative p-2.5 rounded-lg hover:bg-white/8 transition-colors">
              <ShoppingCart size={18} style={{ color: "#f0efe9" }} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full font-orbitron text-[10px] font-black flex items-center justify-center"
                    style={{ background: ACCENT, color: "#111111" }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-white/8 transition-colors"
              style={{ color: "#f0efe9" }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(14,16,20,.98)", borderTop: "1px solid rgba(255,255,255,.07)" }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-rajdhani font-bold text-base tracking-[.18em] uppercase text-left"
                  style={{ color: isActive(link.href) ? ACCENT : "rgba(240,239,233,.6)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}