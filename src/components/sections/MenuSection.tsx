import { useState } from "react";
import { WhatsAppButton } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";
import pizzaHero from "@/assets/pizza-hero.jpg";
import burgerHero from "@/assets/burger-hero.jpg";
import kebabHero from "@/assets/kebab-hero.jpg";

type MenuCategory = "pizzas" | "hamburgueres" | "kebab" | "menus" | "massas" | "extras" | "sobremesas";

interface MenuItem {
  name: string;
  description?: string;
  prices?: { size: string; price: string }[];
  price?: string;
  badge?: string;
  image?: string;
}

const menuData: Record<MenuCategory, { title: string; emoji: string; items: MenuItem[] }> = {
  pizzas: {
    title: "Pizzas",
    emoji: "🍕",
    items: [
      { name: "Margherita", description: "Molho de tomate, mozzarella, manjericão", prices: [{ size: "P", price: "6,50€" }, { size: "M", price: "9,50€" }, { size: "F", price: "13,50€" }] },
      { name: "Pepperoni", description: "Molho de tomate, mozzarella, pepperoni", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,50€" }, { size: "F", price: "14,50€" }] },
      { name: "4 Queijos", description: "Mozzarella, gorgonzola, parmesão, cheddar", prices: [{ size: "P", price: "8,00€" }, { size: "M", price: "11,00€" }, { size: "F", price: "15,00€" }] },
      { name: "Especial da Casa", description: "Fiambre, cogumelos, bacon, ovo, azeitonas", prices: [{ size: "P", price: "8,50€" }, { size: "M", price: "12,00€" }, { size: "F", price: "16,00€" }] },
      { name: "Atum", description: "Molho de tomate, mozzarella, atum, cebola", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,50€" }, { size: "F", price: "14,50€" }] },
      { name: "Vegetariana", description: "Pimentos, cogumelos, cebola, azeitonas, tomate", prices: [{ size: "P", price: "7,00€" }, { size: "M", price: "10,00€" }, { size: "F", price: "14,00€" }] },
      { name: "Frango BBQ", description: "Frango, bacon, cebola caramelizada, molho BBQ", prices: [{ size: "P", price: "8,50€" }, { size: "M", price: "12,00€" }, { size: "F", price: "16,00€" }] },
      { name: "Carbonara", description: "Natas, bacon, cogumelos, cebola", prices: [{ size: "P", price: "8,00€" }, { size: "M", price: "11,50€" }, { size: "F", price: "15,50€" }] },
    ],
  },
  hamburgueres: {
    title: "Hambúrgueres",
    emoji: "🍔",
    items: [
      { name: "Clássico", description: "Hambúrguer 150g, alface, tomate, cebola, pickles", price: "6,50€", image: burgerHero },
      { name: "Cheese Burguer", description: "Hambúrguer 150g, queijo cheddar, alface, tomate", price: "7,00€", badge: "Popular" },
      { name: "Bacon Burguer", description: "Hambúrguer 150g, bacon crocante, queijo, cebola caramelizada", price: "8,00€", badge: "Popular" },
      { name: "Duplo Cheese", description: "2x Hambúrguer 150g, queijo cheddar duplo, molho especial", price: "10,50€", badge: "Popular" },
      { name: "Duplo Bacon", description: "2x Hambúrguer 150g, bacon duplo, queijo, cebola frita", price: "11,50€" },
      { name: "Especial da Casa", description: "Hambúrguer 200g, ovo, bacon, queijo, cogumelos", price: "12,00€", badge: "Novo" },
      { name: "BBQ Burguer", description: "Hambúrguer 150g, cebola roxa, queijo, molho BBQ", price: "8,50€" },
      { name: "Frango Grelhado", description: "Peito de frango grelhado, alface, tomate, maionese", price: "7,50€" },
    ],
  },
  kebab: {
    title: "Kebab & Wraps",
    emoji: "🌯",
    items: [
      { name: "Kebab no Pão", description: "Carne de vitela, salada, molho", price: "5,50€", image: kebabHero },
      { name: "Kebab no Prato", description: "Carne de vitela, arroz, batata frita, salada", price: "8,50€", badge: "Popular" },
      { name: "Durum Kebab", description: "Wrap com carne, salada, molho picante", price: "6,50€" },
      { name: "Kebab Menu", description: "Kebab + batata frita + bebida", price: "8,00€", badge: "Promo" },
      { name: "Falafel Wrap", description: "Falafel, húmus, salada, molho tahini", price: "6,00€", badge: "Novo" },
      { name: "Mix Kebab", description: "Carne de vitela e frango, salada especial", price: "7,50€" },
    ],
  },
  menus: {
    title: "Menus Completos",
    emoji: "🍟",
    items: [
      { name: "Menu Hambúrguer", description: "Hambúrguer à escolha + batata frita + bebida", price: "9,50€", badge: "Promo" },
      { name: "Menu Duplo", description: "Hambúrguer duplo + batata frita grande + bebida", price: "12,50€", badge: "Popular" },
      { name: "Menu Infantil", description: "Mini hambúrguer + batata + sumo + surpresa", price: "6,50€" },
      { name: "Menu Frango", description: "Tiras de frango + batata frita + bebida", price: "8,50€" },
      { name: "Menu Kebab", description: "Kebab + batata frita + bebida", price: "8,00€" },
    ],
  },
  massas: {
    title: "Massas & Saladas",
    emoji: "🍝",
    items: [
      { name: "Esparguete Bolonhesa", description: "Massa com molho de carne", price: "7,50€" },
      { name: "Esparguete Carbonara", description: "Massa com natas, bacon e ovo", price: "8,00€", badge: "Popular" },
      { name: "Lasanha da Casa", description: "Lasanha tradicional com bechamel", price: "8,50€" },
      { name: "Salada Caesar", description: "Alface, frango grelhado, croutons, parmesão", price: "7,00€" },
      { name: "Salada Mista", description: "Alface, tomate, cebola, milho, cenoura", price: "4,50€" },
    ],
  },
  extras: {
    title: "Extras & Bebidas",
    emoji: "🥤",
    items: [
      { name: "Batata Frita Pequena", price: "2,00€" },
      { name: "Batata Frita Grande", price: "3,00€" },
      { name: "Nuggets (6 unid.)", price: "3,50€" },
      { name: "Aros de Cebola", price: "3,00€" },
      { name: "Refrigerante", price: "1,50€" },
      { name: "Água", price: "1,00€" },
      { name: "Sumo Natural", price: "2,50€" },
    ],
  },
  sobremesas: {
    title: "Sobremesas",
    emoji: "🍰",
    items: [
      { name: "Gelado (2 bolas)", price: "2,50€" },
      { name: "Brownie com Gelado", price: "4,00€", badge: "Popular" },
      { name: "Cheesecake", price: "3,50€" },
      { name: "Mousse de Chocolate", price: "3,00€" },
      { name: "Tiramisu", price: "4,00€", badge: "Novo" },
    ],
  },
};

const categoryImages: Record<MenuCategory, string> = {
  pizzas: pizzaHero,
  hamburgueres: burgerHero,
  kebab: kebabHero,
  menus: burgerHero,
  massas: pizzaHero,
  extras: burgerHero,
  sobremesas: pizzaHero,
};

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("pizzas");
  const categories = Object.keys(menuData) as MenuCategory[];

  return (
    <section id="menu" className="bg-cream-dark py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground md:text-3xl">
            📋 O nosso menu
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Toca numa categoria para ver os produtos
          </p>
        </ScrollReveal>

        {/* Category Tabs - Scrollable */}
        <ScrollReveal delay={100}>
          <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-foreground hover:bg-primary/10"
                  }`}
                >
                  {menuData[category].emoji} {menuData[category].title}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Size Legend for Pizzas */}
        {activeCategory === "pizzas" && (
          <ScrollReveal>
            <div className="mb-4 rounded-lg bg-card p-3 text-center text-sm text-muted-foreground">
              <span className="font-medium">P</span> = Pequena &nbsp;|&nbsp; 
              <span className="font-medium">M</span> = Média &nbsp;|&nbsp; 
              <span className="font-medium">F</span> = Familiar
            </div>
          </ScrollReveal>
        )}

        {/* Menu Items */}
        <div className="space-y-3">
          {menuData[activeCategory].items.map((item, index) => (
            <ScrollReveal key={`${activeCategory}-${index}`} delay={index * 40}>
              <div className="flex items-center gap-4 rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
                {/* Item Image (optional) */}
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover shrink-0"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">{item.name}</span>
                    {item.badge && (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.badge === "Popular" ? "bg-primary/15 text-primary" :
                        item.badge === "Novo" ? "bg-accent/15 text-accent" :
                        item.badge === "Promo" ? "bg-whatsapp/15 text-whatsapp" :
                        "bg-primary/15 text-primary"
                      }`}>
                        🔥 {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground truncate">{item.description}</p>
                  )}
                </div>
                <div className="ml-2 text-right shrink-0">
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
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={300}>
          <div className="mt-8 text-center">
            <WhatsAppButton text="Fazer pedido pelo WhatsApp" size="lg" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
