import { useState } from "react";
import { WhatsAppButton } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";
import pizzaHero from "@/assets/pizza-hero.jpg";
import burgerHero from "@/assets/burger-hero.jpg";
import kebabHero from "@/assets/kebab-hero.jpg";

type MenuCategory = "pizzas" | "hamburgueres" | "kebab" | "massas" | "sobremesas";

interface MenuItem {
  name: string;
  description?: string;
  prices?: { size: string; price: string }[];
  price?: string;
  badge?: string;
}

const menuData: Record<MenuCategory, { title: string; emoji: string; items: MenuItem[] }> = {
  pizzas: {
    title: "Pizzas",
    emoji: "🍕",
    items: [
      { name: "Margherita", description: "Molho de tomate, mozzarella, manjericão", prices: [{ size: "P", price: "6,50€" }, { size: "M", price: "8,50€" }, { size: "F", price: "11,00€" }], badge: "Clássica" },
      { name: "Pepperoni", description: "Molho de tomate, mozzarella, pepperoni", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,50€" }, { size: "F", price: "14,00€" }], badge: "Popular" },
      { name: "4 Queijos", description: "Mozzarella, gorgonzola, parmesão, cheddar", prices: [{ size: "P", price: "8,00€" }, { size: "M", price: "11,00€" }, { size: "F", price: "15,00€" }] },
      { name: "Especial da Casa", description: "Fiambre, cogumelos, bacon, ovo", prices: [{ size: "P", price: "8,50€" }, { size: "M", price: "12,00€" }, { size: "F", price: "16,00€" }], badge: "Especial" },
      { name: "Atum", description: "Molho de tomate, atum, cebola, azeitonas", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,50€" }, { size: "F", price: "14,50€" }] },
      { name: "Vegetariana", description: "Pimentos, cogumelos, cebola, tomate, azeitonas", prices: [{ size: "P", price: "7,00€" }, { size: "M", price: "10,00€" }, { size: "F", price: "14,00€" }], badge: "Vegan" },
      { name: "Frango BBQ", description: "Frango, bacon, cebola, molho BBQ", prices: [{ size: "P", price: "8,50€" }, { size: "M", price: "12,00€" }, { size: "F", price: "16,00€" }] },
      { name: "Carbonara", description: "Natas, bacon, ovo, queijo parmesão", prices: [{ size: "P", price: "8,00€" }, { size: "M", price: "11,50€" }, { size: "F", price: "15,50€" }] },
    ],
  },
  hamburgueres: {
    title: "Hambúrgueres",
    emoji: "🍔",
    items: [
      { name: "Hambúrguer Clássico", description: "Carne de vaca, queijo, alface, tomate, cebola", price: "6,50€" },
      { name: "Hambúrguer Duplo", description: "Duas carnes, queijo duplo, bacon, molhos", price: "9,00€", badge: "Popular" },
      { name: "Hambúrguer Especial", description: "Carne, bacon, ovo, queijo cheddar, molho especial", price: "8,50€", badge: "Especial" },
      { name: "Hambúrguer Frango", description: "Peito de frango grelhado, alface, maionese", price: "7,00€" },
      { name: "Hambúrguer BBQ", description: "Carne, cebola caramelizada, bacon, molho BBQ", price: "8,00€" },
      { name: "Menu Hambúrguer", description: "Hambúrguer + batatas + bebida", price: "9,50€" },
      { name: "Menu Duplo", description: "Hambúrguer duplo + batatas + bebida", price: "12,00€" },
    ],
  },
  kebab: {
    title: "Kebab & Fast Food",
    emoji: "🌯",
    items: [
      { name: "Kebab Pão", description: "Carne de kebab, salada, molhos", price: "5,50€" },
      { name: "Kebab Wrap", description: "Carne de kebab em tortilha, salada, molhos", price: "6,00€" },
      { name: "Kebab Prato", description: "Carne de kebab, arroz, salada, batatas", price: "8,50€" },
      { name: "Menu Kebab", description: "Kebab pão + batatas + bebida", price: "8,00€", badge: "Popular" },
      { name: "Cachorro Quente", description: "Salsicha, molhos, cebola crispy", price: "4,00€" },
      { name: "Francesinha", description: "Pão, carnes, queijo, ovo, molho especial", price: "10,50€" },
      { name: "Prego no Pão", description: "Bife de vaca, alho, mostarda", price: "5,50€" },
    ],
  },
  massas: {
    title: "Massas & Saladas",
    emoji: "🍝",
    items: [
      { name: "Esparguete Bolonhesa", description: "Massa com molho de carne", price: "7,50€" },
      { name: "Esparguete Carbonara", description: "Massa, natas, bacon, ovo", price: "8,00€" },
      { name: "Lasanha", description: "Massa, carne, béchamel, queijo", price: "8,50€", badge: "Popular" },
      { name: "Salada Mista", description: "Alface, tomate, cebola, milho, cenoura", price: "4,50€" },
      { name: "Salada César", description: "Alface, frango, croutons, parmesão, molho césar", price: "7,50€" },
    ],
  },
  sobremesas: {
    title: "Sobremesas",
    emoji: "🍰",
    items: [
      { name: "Gelado (2 bolas)", description: "Vários sabores disponíveis", price: "2,50€" },
      { name: "Brownie com Gelado", description: "Brownie de chocolate quente com gelado", price: "4,50€" },
      { name: "Cheesecake", description: "Fatia de cheesecake com frutos vermelhos", price: "4,00€" },
      { name: "Mousse de Chocolate", description: "Mousse caseira de chocolate", price: "3,50€" },
    ],
  },
};

const categoryImages: Record<MenuCategory, string> = {
  pizzas: pizzaHero,
  hamburgueres: burgerHero,
  kebab: kebabHero,
  massas: pizzaHero,
  sobremesas: burgerHero,
};

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("pizzas");
  const categories = Object.keys(menuData) as MenuCategory[];

  return (
    <section id="menu" className="bg-cream-dark py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground md:text-3xl">
            O nosso menu
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Toca numa categoria para ver os produtos
          </p>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={100}>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-foreground hover:bg-primary/10"
                }`}
              >
                {menuData[category].emoji} {menuData[category].title}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Category Image */}
        <ScrollReveal delay={150}>
          <div className="mb-6 overflow-hidden rounded-xl">
            <img
              src={categoryImages[activeCategory]}
              alt={menuData[activeCategory].title}
              className="h-40 w-full object-cover md:h-48 transition-all duration-300"
            />
          </div>
        </ScrollReveal>

        {/* Menu Items */}
        <div className="space-y-3">
          {/* Size Legend for Pizzas */}
          {activeCategory === "pizzas" && (
            <ScrollReveal>
              <div className="mb-4 flex justify-end gap-4 text-xs text-muted-foreground">
                <span>P = Pequena</span>
                <span>M = Média</span>
                <span>F = Familiar</span>
              </div>
            </ScrollReveal>
          )}

          {menuData[activeCategory].items.map((item, index) => (
            <ScrollReveal key={`${activeCategory}-${index}`} delay={index * 50}>
              <div className="flex items-center justify-between rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{item.name}</span>
                    {item.badge && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
                <div className="ml-4 text-right">
                  {item.prices ? (
                    <div className="flex gap-2">
                      {item.prices.map((p) => (
                        <div key={p.size} className="text-center">
                          <div className="text-xs text-muted-foreground">{p.size}</div>
                          <div className="font-bold text-primary">{p.price}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="font-bold text-primary">{item.price}</span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={300}>
          <div className="mt-8 text-center">
            <WhatsAppButton text="Pedir pelo WhatsApp" size="lg" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
