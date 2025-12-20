import { Camera } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";
import pizzaHero from "@/assets/pizza-hero.jpg";
import burgerHero from "@/assets/burger-hero.jpg";
import kebabHero from "@/assets/kebab-hero.jpg";
import galleryTable from "@/assets/gallery-table.jpg";
import galleryFries from "@/assets/gallery-fries.jpg";
import galleryPasta from "@/assets/gallery-pasta.jpg";
import galleryDessert from "@/assets/gallery-dessert.jpg";

const galleryImages = [
  { src: galleryTable, alt: "Mesa com pizzas italianas" },
  { src: pizzaHero, alt: "Pizza Margherita" },
  { src: burgerHero, alt: "Hambúrguer gourmet" },
  { src: kebabHero, alt: "Kebab" },
  { src: galleryFries, alt: "Batatas fritas" },
  { src: galleryPasta, alt: "Esparguete Carbonara" },
  { src: galleryDessert, alt: "Brownie com gelado" },
];

export const GallerySection = () => {
  return (
    <section className="bg-cream-dark py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-6 flex items-center justify-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Galeria
            </h2>
          </div>
          <p className="mb-8 text-center text-muted-foreground">
            Veja os nossos pratos e o nosso espaço
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <ScrollReveal key={index} delay={index * 75}>
              <div className="group relative aspect-square overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
