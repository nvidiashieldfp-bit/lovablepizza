import { useEffect, useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    text: "Comida excelente e atendimento rápido! Recomendo a todos.",
    author: "Maria S.",
    rating: 5,
  },
  {
    text: "As melhores pizzas da zona! Sempre fresquinhas e saborosas.",
    author: "João P.",
    rating: 5,
  },
  {
    text: "Hambúrgueres fantásticos, muito suculentos. Voltarei com certeza!",
    author: "Ana R.",
    rating: 5,
  },
  {
    text: "O Kebab é simplesmente incrível! Melhor que já comi em Portugal.",
    author: "Carlos M.",
    rating: 5,
  },
  {
    text: "Entrega super rápida e comida sempre quentinha. Top!",
    author: "Sofia L.",
    rating: 5,
  },
  {
    text: "Preços justos e qualidade excelente. A pizza 4 queijos é divinal!",
    author: "Pedro F.",
    rating: 5,
  },
  {
    text: "Ambiente familiar e simpático. A francesinha é das melhores!",
    author: "Rita C.",
    rating: 5,
  },
  {
    text: "Descobri há pouco e já sou cliente fiel. Tudo muito bom!",
    author: "Miguel A.",
    rating: 5,
  },
  {
    text: "O menu duplo é perfeito para partilhar. Adoramos!",
    author: "Teresa B.",
    rating: 5,
  },
  {
    text: "Serviço impecável via WhatsApp. Muito prático e eficiente!",
    author: "António G.",
    rating: 5,
  },
];

export const ReviewsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 3,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalSlides = Math.ceil(reviews.length / 3);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(Math.floor(emblaApi.selectedScrollSnap() / 3));
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-background py-12 px-4 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-8 flex items-center justify-center gap-2 sm:mb-10">
            <MessageSquare className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            <h2 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              O que dizem os clientes
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="min-w-full flex-[0_0_100%] px-2 sm:min-w-[50%] sm:flex-[0_0_50%] md:min-w-[33.333%] md:flex-[0_0_33.333%]"
                >
                  <div className="h-full rounded-xl bg-card p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:p-5">
                    {/* Stars */}
                    <div className="mb-2 flex gap-0.5 sm:mb-3 sm:gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-golden text-golden sm:h-5 sm:w-5" 
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="mb-2 text-sm text-foreground italic leading-relaxed sm:mb-3 sm:text-base">
                      "{review.text}"
                    </p>

                    {/* Author */}
                    <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                      — {review.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-2 sm:mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index * 3)}
              className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5 ${
                selectedIndex === index 
                  ? "bg-primary scale-125 w-6 sm:w-8" 
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Ir para grupo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
