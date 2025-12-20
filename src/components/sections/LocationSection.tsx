import { Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppButton, PhoneButton, PHONE_DISPLAY_1, PHONE_DISPLAY_2 } from "../WhatsAppButton";
import { ScrollReveal } from "../ScrollReveal";

const schedule = [
  { day: "Segunda-feira", hours: "18:00 - 23:00" },
  { day: "Terça-feira", hours: "18:00 - 23:00" },
  { day: "Quarta-feira", hours: "18:00 - 23:00" },
  { day: "Quinta-feira", hours: "18:00 - 23:00" },
  { day: "Sexta-feira", hours: "18:00 - 00:00" },
  { day: "Sábado", hours: "18:00 - 00:00" },
  { day: "Domingo", hours: "18:00 - 23:00" },
];

// Coordenadas de Almeirim - Pizza Burguer
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12428.354461234567!2d-8.6287!3d39.2094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd18e95d6c6e7a13%3A0x500ebbde490b5c0!2sAlmeirim!5e0!3m2!1spt-PT!2spt!4v1703001234567!5m2!1spt-PT!2spt";

export const LocationSection = () => {
  return (
    <section className="bg-cream-dark py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
            📍 Onde estamos
          </h2>
        </ScrollReveal>

        <div className="mb-8 space-y-4">
          {/* Location */}
          <ScrollReveal delay={100}>
            <div className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Morada</h3>
                <p className="text-muted-foreground">Almeirim, Portugal</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Phone */}
          <ScrollReveal delay={200}>
            <div className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Telefone (toca para ligar)</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+351243046828" className="hover:text-primary transition-colors">
                    {PHONE_DISPLAY_1}
                  </a>
                  {" | "}
                  <a href="tel:+351914962991" className="hover:text-primary transition-colors">
                    {PHONE_DISPLAY_2}
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Schedule */}
          <ScrollReveal delay={300}>
            <div className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div className="flex-1">
                <h3 className="mb-3 font-semibold text-foreground">Horário</h3>
                <div className="space-y-1">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium text-foreground">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Google Maps Embed */}
        <ScrollReveal delay={400}>
          <div className="mb-8 overflow-hidden rounded-xl shadow-lg">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Pizza Burguer em Almeirim"
              className="w-full"
            />
          </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={500}>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <WhatsAppButton text="Falar connosco agora" size="lg" className="w-full sm:w-auto" />
            <PhoneButton text="Ligar agora" size="lg" className="w-full sm:w-auto" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
