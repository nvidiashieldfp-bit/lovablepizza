import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { WhatsAppButton, PhoneButton, PHONE_DISPLAY_1 } from "../WhatsAppButton";
import logo from "@/assets/logo.png";
import burgerHero from "@/assets/burger-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={burgerHero}
          alt="Hambúrguer delicioso"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Pizza Burguer Logo"
          className="mb-6 h-28 w-auto animate-fade-in md:h-36"
        />

        {/* Title */}
        <h1 className="mb-4 text-3xl font-extrabold text-primary animate-fade-in md:text-5xl" style={{ animationDelay: "0.1s" }}>
          Pizza Burguer Almeirim
        </h1>

        {/* Subtitle */}
        <p className="mb-2 text-xl font-semibold text-cream animate-fade-in md:text-2xl" style={{ animationDelay: "0.2s" }}>
          Sabor autêntico. Pedido rápido pelo WhatsApp.
        </p>

        <p className="mb-8 max-w-md text-base text-cream/90 animate-fade-in md:text-lg" style={{ animationDelay: "0.3s" }}>
          Pizzas artesanais e hambúrgueres feitos na hora.
          <br />
          Take-away e delivery todos os dias.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3 w-full max-w-xs animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <WhatsAppButton size="lg" className="w-full" />
          <PhoneButton 
            text={`Ligar ${PHONE_DISPLAY_1}`}
            size="lg" 
            className="w-full" 
          />
          <Button
            variant="menu"
            size="lg"
            className="w-full"
            asChild
          >
            <a href="#menu">📋 Ver Menu</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <a
          href="#quem-somos"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70 transition-colors hover:text-cream animate-bounce-soft"
          aria-label="Scroll para baixo"
        >
          <ChevronDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
};
