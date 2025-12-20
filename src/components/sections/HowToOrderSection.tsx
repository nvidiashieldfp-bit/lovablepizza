import { ClipboardList, MessageCircle, Truck } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";

const steps = [
  {
    number: "1",
    icon: ClipboardList,
    title: "Escolhe o que vais comer",
  },
  {
    number: "2",
    icon: MessageCircle,
    title: "Envia o pedido no WhatsApp",
  },
  {
    number: "3",
    icon: Truck,
    title: "Levanta no restaurante ou recebe em casa",
  },
];

export const HowToOrderSection = () => {
  return (
    <section className="bg-cream-dark py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground md:text-3xl">
            📲 Simples e rápido
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Como encomendar
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 150}>
              <div className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                <div className="flex items-center gap-3">
                  <step.icon className="h-6 w-6 text-primary" />
                  <span className="text-lg font-medium text-foreground">
                    {step.title}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
