import HeroBanner from "@/components/home/HeroBanner";
import MarqueeBar from "@/components/layout/MarqueeBar";
import Colecciones from "@/components/home/Colecciones";
import ExploraCatalogo from "@/components/home/ExploraCatalogo";
import TrustStrip from "@/components/home/TrustStrip";
import Galeria from "@/components/home/Galeria";
import TikTokFeed from "@/components/home/TikTokFeed";
import Testimonios from "@/components/home/Testimonios";
import Comunidad from "@/components/home/Comunidad";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <MarqueeBar />
      <Colecciones />
      <ExploraCatalogo />
      <TrustStrip />
      <Galeria />
      <TikTokFeed />
      <Testimonios />
      <Comunidad />
    </div>
  );
}