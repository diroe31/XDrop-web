import HeroBanner from "@/components/home/HeroBanner";
import MarqueeBar from "@/components/layout/MarqueeBar";
import Colecciones from "@/components/home/Colecciones";
import ExploraCatalogo from "@/components/home/ExploraCatalogo";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <MarqueeBar />
      <Colecciones />
      <ExploraCatalogo />
    </div>
  );
}