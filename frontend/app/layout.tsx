import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CarritoProvider } from "@/components/carrito/CarritoContext";

export const metadata: Metadata = {
  title: "XDrop | Tienda de Coleccionables",
  description: "Coleccionables premium de tus videojuegos favoritos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <CarritoProvider>
          <Navbar />
          {children}
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}