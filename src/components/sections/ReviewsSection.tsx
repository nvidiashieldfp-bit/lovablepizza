import { MessageSquare, Star } from "lucide-react";

const reviews = [
  {
    text: "Comida excelente e atendimento rápido",
    author: "Maria S.",
    rating: 5,
  },
  {
    text: "As melhores pizzas da zona!",
    author: "João P.",
    rating: 5,
  },
  {
    text: "Hambúrgueres fantásticos, muito suculentos. Recomendo!",
    author: "Ana R.",
    rating: 5,
  },
];

export const ReviewsSection = () => {
  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            O que dizem os clientes
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-xl bg-card p-5 shadow-md transition-shadow hover:shadow-lg"
            >
              {/* Stars */}
              <div className="mb-3 flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-golden text-golden" />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-3 text-foreground italic">
                "{review.text}"
              </p>

              {/* Author */}
              <p className="text-sm font-medium text-muted-foreground">
                — {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
