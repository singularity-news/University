import { Nav } from "@/components/site/Nav";
import { Welcome } from "@/components/site/Welcome";
import { Hero } from "@/components/site/Hero";
import { Introduction } from "@/components/site/Introduction";
import { Juridical } from "@/components/site/Juridical";
import { Technocracy } from "@/components/site/Technocracy";
import { Research } from "@/components/site/Research";
import { News } from "@/components/site/News";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Welcome />
      <Hero />
      <Introduction />
      <Juridical />
      <Technocracy />
      <Research />
      <News />
      <CTA />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
