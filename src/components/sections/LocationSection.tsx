import { MapPin, Clock, Phone } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";

export const LocationSection = () => {
  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
            📍 Onde estamos
          </h2>
        </ScrollReveal>

        <div className="mb-8 space-y-3">
          {/* Location */}
          <ScrollReveal delay={100}>
            <div className="flex items-center gap-4 rounded-xl bg-card p-4 border border-border">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-foreground">Almeirim, Portugal</span>
            </div>
          </ScrollReveal>

          {/* Hours */}
          <ScrollReveal delay={200}>
            <div className="flex items-center gap-4 rounded-xl bg-card p-4 border border-border">
              <Clock className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-foreground">Aberto todos os dias</span>
            </div>
          </ScrollReveal>

          {/* WhatsApp */}
          <ScrollReveal delay={300}>
            <div className="flex items-center gap-4 rounded-xl bg-card p-4 border border-border">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-foreground">Atendimento e pedidos via WhatsApp</span>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal delay={400}>
          <div className="text-center">
            <WhatsAppButton text="Falar connosco agora" size="lg" className="w-full sm:w-auto" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
