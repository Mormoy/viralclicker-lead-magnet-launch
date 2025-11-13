import { Shield, TrendingUp, Clock, MessageSquare, BarChart, Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WhyChooseAIAgent = () => {
  const features = [
    {
      icon: Clock,
      title: "Disponibilidad 24/7",
      description: "Su agente IA trabaja sin descanso, atendiendo a sus clientes en cualquier momento del día o la noche, incluso en fines de semana y festivos."
    },
    {
      icon: TrendingUp,
      title: "Aumente sus Ventas",
      description: "Capture más leads, califíquelos automáticamente y conviértalos en clientes con respuestas instantáneas y personalizadas a sus necesidades."
    },
    {
      icon: MessageSquare,
      title: "Atención al Cliente Superior",
      description: "Resuelva consultas al instante, reduzca tiempos de espera y mejore la satisfacción del cliente con respuestas precisas y contextuales."
    },
    {
      icon: BarChart,
      title: "Analítica Avanzada",
      description: "Obtenga insights valiosos sobre sus clientes, identifique patrones y tome decisiones basadas en datos reales de interacciones."
    },
    {
      icon: Shield,
      title: "Seguridad Garantizada",
      description: "Implementamos las más altas medidas de seguridad para proteger la información de su negocio y la de sus clientes."
    },
    {
      icon: Sparkles,
      title: "Integración Perfecta",
      description: "Conecte su agente IA con sus herramientas existentes: CRM, WhatsApp, email, y más. Todo en un solo ecosistema."
    }
  ];

  return (
    <section className="py-16 bg-viralDark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          ¿Por qué elegir un <span className="text-viralOrange">Agente IA</span>?
        </h2>
        <p className="text-white/80 text-lg text-center mb-12 max-w-3xl mx-auto">
          Descubra cómo un agente IA puede transformar su negocio y llevarlo al siguiente nivel
        </p>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-viralDark/50 border border-viralOrange/20 rounded-xl p-6 hover:border-viralOrange/40 transition-all hover:transform hover:scale-105"
            >
              <div className="bg-viralOrange/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-viralOrange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {features.map((feature, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-viralOrange/20 mb-2"
              >
                <AccordionTrigger className="text-white hover:text-viralOrange hover:no-underline px-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-viralOrange/10 w-10 h-10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-viralOrange" />
                    </div>
                    <span className="font-bold">{feature.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/70 px-4 pb-4">
                  {feature.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAIAgent;
