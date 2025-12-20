import { MapPin, Clock, Phone } from "lucide-react";
import { WhatsAppButton, PhoneButton, PHONE_DISPLAY_1, PHONE_DISPLAY_2 } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";

const scheduleData = [
  { day: "Segunda-feira", hours: "18:00 - 23:00" },
  { day: "Terça-feira", hours: "18:00 - 23:00" },
  { day: "Quarta-feira", hours: "18:00 - 23:00" },
  { day: "Quinta-feira", hours: "18:00 - 23:00" },
  { day: "Sexta-feira", hours: "18:00 - 00:00" },
  { day: "Sábado", hours: "18:00 - 00:00" },
  { day: "Domingo", hours: "18:00 - 23:00" },
];

export const LocationSection = () => {
  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl flex items-center justify-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Onde estamos
          </h2>
        </ScrollReveal>

        <div className="mb-6 space-y-4">
          {/* Address */}
          <ScrollReveal delay={100}>
            <div className="flex items-start gap-4 rounded-xl bg-card p-5 border border-border">
              <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Morada</h3>
                <p className="text-muted-foreground text-sm">
                  Avenida Dom João I LT 48, 2080-014 Almeirim
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Phone */}
          <ScrollReveal delay={200}>
            <div className="flex items-start gap-4 rounded-xl bg-card p-5 border border-border">
              <Phone className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Telefone (toca para ligar)</h3>
                <p className="text-muted-foreground text-sm">
                  <a href="tel:+351243046828" className="hover:text-primary transition-colors">{PHONE_DISPLAY_1}</a>
                  {" | "}
                  <a href="tel:+351914962991" className="hover:text-primary transition-colors">{PHONE_DISPLAY_2}</a>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Hours */}
          <ScrollReveal delay={300}>
            <div className="flex items-start gap-4 rounded-xl bg-card p-5 border border-border">
              <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-3">Horário</h3>
                <div className="space-y-1.5">
                  {scheduleData.map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="text-foreground font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Google Maps Embed */}
        <ScrollReveal delay={400}>
          <div className="mb-6 rounded-xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.5!2d-8.6283!3d39.1947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd18e5d5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sAv.%20Dom%20Jo%C3%A3o%20I%2C%20Almeirim!5e0!3m2!1spt-PT!2spt!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Pizza Burger"
              className="w-full"
            />
          </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={500}>
          <div className="space-y-3">
            <WhatsAppButton text="Falar connosco agora" size="lg" className="w-full" />
            <PhoneButton text="Ligar agora" size="lg" className="w-full" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
