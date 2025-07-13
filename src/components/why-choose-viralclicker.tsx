import { Bot, Target, TrendingUp, BarChart3 } from "lucide-react";

const WhyChooseViralClicker = () => {
  const features = [
    {
      icon: Bot,
      title: "1. Automatización que funciona de verdad",
      description: "Implementamos sistemas que califican, filtran y conectan con tus prospectos automáticamente, sin depender de tu tiempo ni esfuerzo diario."
    },
    {
      icon: Target,
      title: "2. Leads calificados, no curiosos", 
      description: "Cada persona que te escribe ya vio tu video, entendió tu propuesta y se identificó con tu solución. Hablamos solo con quienes tienen intención real."
    },
    {
      icon: TrendingUp,
      title: "3. Crecimiento sostenible y escalable",
      description: "Escala tu negocio sin complicaciones. Nuestro sistema te permite aumentar tu alcance, mantener el control y liberar tu agenda de tareas improductivas."
    },
    {
      icon: BarChart3,
      title: "4. Estrategia basada en datos reales",
      description: "Nairok, nuestro avatar, analiza patrones, optimiza procesos y te guía con claridad. Aquí no improvisamos: tomamos decisiones con datos, no con suposiciones."
    }
  ];

  return (
    <section className="py-20 bg-viralDark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Por qué elegir </span>
            <span className="text-viralOrange">Viral Clicker</span>
          </h2>
          
          <p className="text-white/80 text-xl md:text-2xl mb-16 max-w-4xl mx-auto">
            Porque no se trata de perseguir clientes, sino de atraerlos con un sistema que trabaja todos los días, incluso mientras duermes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-viralDark border border-viralOrange/20 rounded-xl p-8 text-center hover:border-viralOrange/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-viralOrange/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-viralOrange" />
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseViralClicker;