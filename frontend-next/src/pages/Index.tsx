import HUD from "../components/portfolio/HUD";
import ParallaxWorld from "../components/portfolio/ParallaxWorld";
import HeroSection from "../components/portfolio/sections/HeroSection";
import LibrarySection from "../components/portfolio/sections/LibrarySection";
import RestoBarSection from "../components/portfolio/sections/RestoBarSection";
import PhoneBoothSection from "../components/portfolio/sections/PhoneBoothSection";

const Index = () => {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <HUD />
      <ParallaxWorld>
        <HeroSection />
        <LibrarySection />
        <RestoBarSection />
        <PhoneBoothSection />
      </ParallaxWorld>
    </div>
  );
};

export default Index;
