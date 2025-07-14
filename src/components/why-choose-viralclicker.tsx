import { Bot, Target, TrendingUp, BarChart3 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WhyChooseViralClicker = () => {
  const features = [
    {
      icon: Bot,
      title: "Automatización que funciona de verdad",
      description: "Implementamos sistemas que califican, filtran y conectan con tus prospectos automáticamente, sin depender de tu tiempo ni esfuerzo diario."
    },
    {
      icon: Target,
      title: "Leads calificados, no curiosos", 
      description: "Cada persona que te escribe ya vio tu video, entendió tu propuesta y se identificó con tu solución. Hablamos solo con quienes tienen intención real."
    },
    {
      icon: TrendingUp,
      title: "Crecimiento sostenible y escalable",
      description: "Escala tu negocio sin complicaciones. Nuestro sistema te permite aumentar tu alcance, mantener el control y liberar tu agenda de tareas improductivas."
    },
    {
      icon: BarChart3,
      title: "Estrategia basada en datos reales",
      description: "Nairok, nuestro avatar, analiza patrones, optimiza procesos y te guía con claridad. Aquí no improvisamos: tomamos decisiones con datos, no con suposiciones."
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-viralDark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Por qué elegir </span>
            <span className="text-viralOrange">Viral Clicker</span>
          </h2>
          
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            Porque no se trata de perseguir clientes, sino de atraerlos con un sistema que trabaja todos los días, incluso mientras duermes.
          </p>
          
          {/* Vista de escritorio: Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-viralDark border border-viralOrange/20 rounded-xl p-6 text-left hover:border-viralOrange/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-viralOrange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-viralOrange" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vista móvil: Accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-viralOrange/20 rounded-lg bg-viralDark/50 backdrop-blur-sm"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-viralOrange px-4 py-3 text-base font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-viralOrange/20 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-viralOrange" />
                        </div>
                        <span>{feature.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70 px-4 pb-3 text-sm leading-relaxed">
                      <div className="ml-11">
                        {feature.description}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseViralClicker;