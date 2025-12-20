import { WhatsAppButton } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";
import logo from "@/assets/logo.png";

export const CTASection = () => {
  return (
    <section className="bg-foreground py-16 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <img
            src={logo}
            alt="Pizza Burguer"
            className="mx-auto mb-6 h-20 w-auto"
          />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <h2 className="mb-6 text-2xl font-bold text-cream md:text-3xl">
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
