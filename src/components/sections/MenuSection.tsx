import { useState } from "react";
import { WhatsAppButton } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";
import pizzaHero from "@/assets/pizza-hero.jpg";
import burgerHero from "@/assets/burger-hero.jpg";
import kebabHero from "@/assets/kebab-hero.jpg";

type MenuCategory = "pizzas" | "hamburgueres" | "kebab" | "menus" | "entradas" | "massas" | "saladas" | "extras" | "sobremesas";

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
      { name: "Clássica", description: "Molho de tomate, mozzarella", prices: [{ size: "P", price: "6,90€" }, { size: "M", price: "8,90€" }, { size: "F", price: "11,90€" }] },
      { name: "Bacon", description: "Molho de tomate, mozzarella, bacon", prices: [{ size: "P", price: "6,90€" }, { size: "M", price: "8,90€" }, { size: "F", price: "11,90€" }] },
      { name: "Margherita", description: "Molho de tomate, mozzarella, manjericão", prices: [{ size: "P", price: "6,90€" }, { size: "M", price: "8,90€" }, { size: "F", price: "11,90€" }] },
      { name: "Pepperoni", description: "Molho de tomate, mozzarella, pepperoni", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,90€" }, { size: "F", price: "13,50€" }], badge: "Popular" },
      { name: "Duas Carnes", description: "Molho de tomate, mozzarella, fiambre, chouriço", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,90€" }, { size: "F", price: "13,50€" }] },
      { name: "Hawaiana", description: "Molho de tomate, mozzarella, fiambre, ananás", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "11,50€" }, { size: "F", price: "13,90€" }] },
      { name: "Vegetariana", description: "Molho de tomate, mozzarella, pimentos, cogumelos, cebola, azeitonas, tomate", prices: [{ size: "P", price: "7,00€" }, { size: "M", price: "10,00€" }, { size: "F", price: "14,00€" }] },
      { name: "Especial Bacon", description: "Molho de tomate, mozzarella, bacon, ovo, fiambre", prices: [{ size: "P", price: "7,90€" }, { size: "M", price: "12,90€" }, { size: "F", price: "15,90€" }], badge: "Popular" },
      { name: "Casa", description: "Molho de tomate, mozzarella, fiambre, cogumelos, bacon, ovo, azeitonas", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,50€" }, { size: "F", price: "17,50€" }] },
      { name: "3 Carnes", description: "Molho de tomate, mozzarella, fiambre, chouriço, bacon", prices: [{ size: "P", price: "9,50€" }, { size: "M", price: "14,50€" }, { size: "F", price: "18,90€" }] },
      { name: "Kebab Barbecue", description: "Molho de tomate, mozzarella, carne kebab, molho barbecue", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,90€" }, { size: "F", price: "18,90€" }] },
      { name: "Palermo", description: "Molho de tomate, mozzarella, fiambre, cogumelos, natas", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,90€" }, { size: "F", price: "18,50€" }] },
      { name: "Mexicana", description: "Molho de tomate, mozzarella, carne picada, cebola, pimentos, molho picante", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,80€" }, { size: "F", price: "18,90€" }] },
      { name: "Atum", description: "Molho de tomate, mozzarella, atum, cebola", prices: [{ size: "P", price: "8,50€" }, { size: "M", price: "13,50€" }, { size: "F", price: "18,90€" }] },
      { name: "Domar (Marisco)", description: "Molho de tomate, mozzarella, marisco variado", prices: [{ size: "P", price: "8,80€" }, { size: "M", price: "13,90€" }, { size: "F", price: "19,50€" }] },
      { name: "Delícia", description: "Molho de tomate, mozzarella, fiambre, ananás, bacon", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,80€" }, { size: "F", price: "18,90€" }] },
      { name: "Especial Pepperoni", description: "Molho de tomate, mozzarella, pepperoni extra", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,50€" }, { size: "F", price: "17,50€" }] },
      { name: "Strogonoff", description: "Molho de tomate, mozzarella, frango, natas, cogumelos", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "11,50€" }, { size: "F", price: "15,90€" }] },
      { name: "Tutti-Frutti", description: "Chocolate, banana, ananás", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "11,90€" }, { size: "F", price: "15,90€" }] },
    ],
  },
  hamburgueres: {
    title: "Hambúrgueres",
    emoji: "🍔",
    items: [
      { name: "Apache", description: "Hambúrguer bovino, bacon, queijo, ovo, molho especial", price: "10,30€", badge: "Popular", image: burgerHero },
      { name: "Clássica", description: "Hambúrguer bovino, alface, tomate, cebola", price: "8,50€" },
      { name: "Texana Double", description: "Duplo hambúrguer bovino, bacon, queijo cheddar", price: "12,30€", badge: "Popular" },
      { name: "Hawaiana", description: "Hambúrguer bovino, fiambre, ananás, queijo", price: "9,90€" },
      { name: "Sonora Grilled", description: "Hambúrguer bovino grelhado, queijo, cebola caramelizada", price: "9,60€" },
      { name: "Colorado Grilled", description: "Hambúrguer bovino, bacon, queijo, molho especial", price: "9,80€" },
      { name: "Barbecue", description: "Hambúrguer bovino, bacon, queijo, molho BBQ", price: "8,90€" },
    ],
  },
  kebab: {
    title: "Kebab & Tostas",
    emoji: "🌯",
    items: [
      { name: "Kebab em Pão Pita", description: "Carne kebab, salada, molho", price: "7,20€", image: kebabHero },
      { name: "Prato Kebab", description: "Carne kebab, arroz, batata frita, salada", price: "7,90€", badge: "Popular" },
      { name: "Salada Kebab", description: "Carne kebab, salada variada", price: "7,90€" },
      { name: "Massa Kebab", description: "Massa, carne kebab, molho", price: "8,50€" },
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
  entradas: {
    title: "Entradas & Diversos",
    emoji: "🥣",
    items: [
      { name: "Pão de Alho Simples", description: "Pão torrado com alho e manteiga", price: "3,90€" },
      { name: "Pão de Alho com Queijo", description: "Pão torrado com alho e queijo", price: "4,90€", badge: "Popular" },
      { name: "Pão de Alho com Bacon", description: "Pão torrado com alho, queijo e bacon", price: "5,50€", badge: "Popular" },
      { name: "Pão de Alho com Kebab", description: "Pão torrado com alho, queijo e carne kebab", price: "6,50€" },
      { name: "Guacamole", description: "Abacate, tomate, cebola e limão", price: "5,50€" },
      { name: "Asas de Frango", description: "Asas de frango temperadas e fritas", price: "4,20€" },
      { name: "Sopa do Dia", description: "Sopa caseira do dia", price: "2,50€" },
      { name: "Francesinha", description: "Sanduíche com carnes, queijo e molho especial", price: "11,90€", badge: "Especial" },
      { name: "6 Nuggets", description: "Nuggets de frango (6 unidades)", price: "2,90€" },
      { name: "12 Nuggets", description: "Nuggets de frango (12 unidades)", price: "4,90€" },
      { name: "Dose de Batatas Fritas", description: "Batatas fritas crocantes", price: "3,50€" },
      { name: "Molho Extra", description: "Molho adicional à escolha", price: "0,30€" },
    ],
  },
  massas: {
    title: "Massas",
    emoji: "🍝",
    items: [
      { name: "Pomodoro", description: "Massa com molho de tomate", price: "7,90€" },
      { name: "Carbonara", description: "Massa com natas, bacon e ovo", price: "8,90€", badge: "Popular" },
      { name: "Bolonhesa", description: "Massa com molho de carne picada", price: "9,50€" },
      { name: "Camponesa", description: "Bróculos, bacon, alho francês, cogumelos, molho de natas", price: "9,90€" },
      { name: "Mascarpone", description: "Massa com frango e queijo mascarpone", price: "9,90€" },
      { name: "Vegetariana", description: "Massa com legumes variados", price: "9,90€" },
      { name: "Gambareti", description: "Massa com camarão", price: "9,90€" },
      { name: "Parmegiana", description: "Massa com frango panado, queijo e molho de tomate", price: "9,90€" },
      { name: "Marana", description: "Massa com carne e molho especial", price: "10,50€" },
      { name: "Capoeira", description: "Massa com frango, bacon e natas", price: "10,50€" },
      { name: "Pizza Burguer", description: "Massa com carne, bacon e queijo", price: "10,50€" },
      { name: "Lasanha de Carne", description: "Lasanha em camadas com carne e molho bechamel", price: "10,50€", badge: "Especial" },
      { name: "Mar", description: "Massa com marisco", price: "10,90€" },
      { name: "Massa Personalizada (4 ingredientes)", description: "Massa com 4 ingredientes à escolha", price: "10,50€" },
      { name: "Ingredientes Extra", description: "Excepto Camarão", price: "1,50€" },
      { name: "Ingredientes Extra Camarão", description: "8 Peças", price: "2,50€" },
    ],
  },
  saladas: {
    title: "Saladas",
    emoji: "🥗",
    items: [
      { name: "Tropical", description: "Alface, frango e ananás", price: "7,50€" },
      { name: "Casa", description: "Alface, tomate, atum e ovo", price: "8,50€" },
      { name: "Mar", description: "Alface e marisco", price: "9,30€" },
      { name: "Pasta", description: "Massa fria com frango e legumes", price: "9,50€" },
      { name: "Personalizada (4 ingredientes)", description: "Salada com 4 ingredientes à escolha", price: "9,50€" },
    ],
  },
  extras: {
    title: "Bebidas",
    emoji: "🥤",
    items: [
      { name: "Água 0,5L", price: "1,00€" },
      { name: "Refrigerante 0,33cl", price: "1,50€" },
      { name: "Refrigerante 1,5L", price: "2,50€" },
      { name: "Sumo Natural", price: "2,50€" },
      { name: "Cerveja", price: "1,50€" },
      { name: "Vinho (copo)", price: "1,50€" },
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
  entradas: pizzaHero,
  massas: pizzaHero,
  saladas: pizzaHero,
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
