import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { WhatsAppButton, PhoneButton, PHONE_DISPLAY_1 } from "../WhatsAppButton";
import logo from "@/assets/logo.png";
import burgerHero from "@/assets/burger-hero.jpg";
import pizzaHero from "@/assets/pizza-hero.jpg";
import kebabHero from "@/assets/kebab-hero.jpg";

const heroImages = [
  { src: pizzaHero, alt: "Pizza artesanal deliciosa" },
  { src: burgerHero, alt: "Hambúrguer suculento" },
  { src: kebabHero, alt: "Kebab saboroso" },
];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-28">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5 ${
              index === currentIndex
                ? "bg-primary scale-125 w-6 sm:w-8"
                : "bg-cream/50 hover:bg-cream/70"
            }`}
            aria-label={`Ver imagem ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Pizza Burguer Logo"
          className="mb-4 h-20 w-auto animate-fade-in sm:mb-6 sm:h-28 md:h-36"
        />

        {/* Title */}
        <h1 
          className="mb-3 text-2xl font-extrabold text-primary animate-fade-in sm:mb-4 sm:text-3xl md:text-5xl" 
          style={{ animationDelay: "0.1s" }}
        >
          Pizza Burguer Almeirim
        </h1>

        {/* Subtitle */}
        <p 
          className="mb-2 text-lg font-semibold text-cream animate-fade-in sm:text-xl md:text-2xl" 
          style={{ animationDelay: "0.2s" }}
        >
          Sabor autêntico. Pedido rápido pelo WhatsApp.
        </p>

        <p 
          className="mb-6 max-w-xs text-sm text-cream/90 animate-fade-in sm:mb-8 sm:max-w-md sm:text-base md:text-lg" 
          style={{ animationDelay: "0.3s" }}
        >
          Pizzas artesanais e hambúrgueres feitos na hora.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Take-away e delivery todos os dias.
        </p>

        {/* CTAs */}
        <div 
          className="flex flex-col gap-2 w-full max-w-[280px] animate-fade-in sm:gap-3 sm:max-w-xs" 
          style={{ animationDelay: "0.4s" }}
        >
          <WhatsAppButton size="lg" className="w-full text-sm sm:text-base" />
          <PhoneButton 
            text={`Ligar ${PHONE_DISPLAY_1}`}
            size="lg" 
            className="w-full text-sm sm:text-base" 
          />
          <Button
            variant="menu"
            size="lg"
            className="w-full text-sm sm:text-base"
            asChild
          >
            <a href="#menu">📋 Ver Menu</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <a
          href="#quem-somos"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/70 transition-colors hover:text-cream animate-bounce-soft sm:bottom-8"
          aria-label="Scroll para baixo"
        >
          <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8" />
        </a>
      </div>
    </section>
  );
};
