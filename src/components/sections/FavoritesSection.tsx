import { WhatsAppButton } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";
import pizzaHero from "@/assets/pizza-hero.jpg";
import burgerHero from "@/assets/burger-hero.jpg";
import kebabHero from "@/assets/kebab-hero.jpg";

const favorites = [
  { 
    name: "Pizza Especial", 
    subtitle: "A mais pedida",
    image: pizzaHero,
    badge: "Popular"
  },
  { 
    name: "Duplo Cheese", 
    subtitle: "Irresistível",
    image: burgerHero,
    badge: "Popular"
  },
  { 
    name: "Kebab Menu", 
    subtitle: "Completo e saboroso",
    image: kebabHero,
    badge: "Popular"
  },
];

export const FavoritesSection = () => {
  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-2xl">🔥</span>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Os favoritos dos clientes
            </h2>
          </div>
        </ScrollReveal>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {favorites.map((item, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="group relative overflow-hidden rounded-xl bg-card shadow-md transition-transform hover:scale-105">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover sm:h-48"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                    🔥 {item.badge}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-cream">{item.name}</h3>
                  <p className="text-sm text-cream/80">{item.subtitle}</p>
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
