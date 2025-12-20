import { ChefHat } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="quem-somos" className="bg-background py-16 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
          <ChefHat className="h-8 w-8 text-primary" />
        </div>
        
        <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
          Mais sabor, menos complicações.
        </h2>
        
        <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
          Na <span className="font-semibold text-primary">Pizza Burguer</span> apostamos em ingredientes de qualidade, receitas simples e atendimento rápido. Queremos que faças o teu pedido em segundos e desfrutes de uma refeição incrível.
        </p>
      </div>
    </section>
  );
};
