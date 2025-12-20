import { useState } from "react";
import { Camera, X } from "lucide-react";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="bg-background py-16 px-4">
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
                <button
                  onClick={() => setSelectedImage(image.src)}
                  className="group relative aspect-square w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20" />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-card p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Imagem ampliada"
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
