import { Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";

const schedule = [
  { day: "Segunda a Quinta", hours: "12:00 - 22:30" },
  { day: "Sexta e Sábado", hours: "12:00 - 23:30" },
  { day: "Domingo", hours: "12:00 - 22:00" },
];

export const LocationSection = () => {
  return (
    <section className="bg-cream-dark py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
          📍 Onde estamos
        </h2>

        <div className="mb-8 space-y-4">
          {/* Location */}
          <div className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Morada</h3>
              <p className="text-muted-foreground">Almeirim, Portugal</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm">
            <Phone className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Telefone (para ligar)</h3>
              <p className="text-muted-foreground">+351 XXX XXX XXX</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm">
            <Clock className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div className="flex-1">
              <h3 className="mb-2 font-semibold text-foreground">Horário</h3>
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
        </div>

        {/* CTA */}
        <div className="text-center">
          <WhatsAppButton text="Falar connosco agora" size="lg" />
        </div>
      </div>
    </section>
  );
};
