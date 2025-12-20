import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { FavoritesSection } from "@/components/sections/FavoritesSection";
import { HowToOrderSection } from "@/components/sections/HowToOrderSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { CTASection } from "@/components/sections/CTASection";
import { FooterSection } from "@/components/sections/FooterSection";
import { StickyWhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Pizza Burguer em Almeirim | Encomendas via WhatsApp</title>
        <meta
          name="description"
          content="Pizzas e hambúrgueres em Almeirim. Take-away e delivery com pedidos rápidos via WhatsApp."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://pizzaburguer.pt" />
      </Helmet>

      <main className="overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <FavoritesSection />
        <HowToOrderSection />
        <ReviewsSection />
        <LocationSection />
        <CTASection />
        <FooterSection />
      </main>

      <StickyWhatsAppButton />
    </>
  );
};

export default Index;
