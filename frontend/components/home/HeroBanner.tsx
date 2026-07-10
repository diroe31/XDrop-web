import { fetchContenidoHome } from "@/lib/api";
import HeroCarousel, { Slide } from "./HeroCarousel";

export default async function HeroBanner() {
  const banners = await fetchContenidoHome("banner");

  const slides: Slide[] = banners.map((b) => ({
    img: b.imagen || "",
    label: b.subtitulo || "",
    titleLines: (b.titulo || "").split("|").map((l) => l.trim()).filter(Boolean),
    textoBoton: b.texto_boton || "Ver Catálogo",
    urlBoton: b.url_boton || "/catalogo",
  }));

  // Mientras no haya banners cargados en el admin, mostramos uno de relleno
  // para que la pagina no se vea vacia mientras trabajan.
  const slidesFinal: Slide[] =
    slides.length > 0
      ? slides
      : [
          {
            img: "",
            label: "Agrega tu primer banner desde el admin",
            titleLines: ["SUBE", "TU", "BANNER"],
            textoBoton: "Ver Catálogo",
            urlBoton: "/catalogo",
          },
        ];

  return <HeroCarousel slides={slidesFinal} />;
}