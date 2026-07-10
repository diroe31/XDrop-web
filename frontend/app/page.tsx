import HeroBanner from "@/components/home/HeroBanner";
import MarqueeBar from "@/components/layout/MarqueeBar";
import Colecciones from "@/components/home/Colecciones";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <MarqueeBar />
      <Colecciones />
    </div>
  );
}