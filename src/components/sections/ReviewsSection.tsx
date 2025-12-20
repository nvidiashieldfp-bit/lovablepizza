import { useEffect, useState } from "react";
import { MessageSquare, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mb-6 flex items-center justify-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              O que dizem os clientes
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card p-2 shadow-lg transition-all hover:bg-primary hover:text-primary-foreground md:-left-4"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card p-2 shadow-lg transition-all hover:bg-primary hover:text-primary-foreground md:-right-4"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Carousel */}
            <div className="overflow-hidden px-4" ref={emblaRef}>
              <div className="flex gap-4">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="min-w-[280px] flex-[0_0_280px] md:min-w-[320px] md:flex-[0_0_320px]"
                  >
                    <div className="h-full rounded-xl bg-card p-5 shadow-md">
                      {/* Stars */}
                      <div className="mb-3 flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-golden text-golden" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="mb-3 text-foreground italic leading-relaxed">
                        "{review.text}"
                      </p>

                      {/* Author */}
                      <p className="text-sm font-medium text-muted-foreground">
                        — {review.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index * 3)}
              className="h-2 w-2 rounded-full bg-primary/30 transition-all hover:bg-primary"
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
