import { Star } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";
import pizzaHero from "@/assets/pizza-hero.jpg";
import burgerHero from "@/assets/burger-hero.jpg";
import kebabHero from "@/assets/kebab-hero.jpg";

const favorites = [
  { name: "Pizza Especial", emoji: "🍕", image: pizzaHero },
  { name: "Hambúrguer Clássico", emoji: "🍔", image: burgerHero },
  { name: "Hambúrguer Duplo", emoji: "🍔", image: burgerHero },
  { name: "Kebab Menu", emoji: "🌯", image: kebabHero },
];

export const FavoritesSection = () => {
  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-6 flex items-center justify-center gap-2">
            <Star className="h-6 w-6 fill-golden text-golden" />
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Os favoritos dos clientes
            </h2>
          </div>
        </ScrollReveal>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {favorites.map((item, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="group relative overflow-hidden rounded-xl bg-card shadow-md transition-transform hover:scale-105">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-full object-cover md:h-36"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <span className="text-lg">{item.emoji}</span>
                  <p className="text-sm font-semibold text-cream">{item.name}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center">
            <WhatsAppButton text="Pedir agora" size="lg" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
