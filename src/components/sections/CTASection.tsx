import { WhatsAppButton } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";

export const CTASection = () => {
  return (
    <section className="bg-cream py-16 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <div className="mb-4 flex justify-center gap-2 text-5xl">
            <span>🍕</span>
            <span>🍔</span>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            Já sabes o que vais comer hoje?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <WhatsAppButton
            text="Encomendar agora pelo WhatsApp"
            size="xl"
          />
        </ScrollReveal>
      </div>
    </section>
  );
};
