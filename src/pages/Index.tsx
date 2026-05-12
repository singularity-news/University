import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Introduction } from "@/components/site/Introduction";
import { Juridical } from "@/components/site/Juridical";
import { Technocracy } from "@/components/site/Technocracy";
import { Research } from "@/components/site/Research";
import { News } from "@/components/site/News";
import { CTA } from "@/components/site/CTA";
import { Embeds } from "@/components/site/Embeds";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Introduction />
      <Juridical />
      <Technocracy />
      <Research />
      <News />
      <CTA />
      <Embeds />
      <Footer />
    </main>
  );
};

export default Index;
