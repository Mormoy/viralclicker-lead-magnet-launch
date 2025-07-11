import { Zap, Target, TrendingUp, Users } from "lucide-react";

const WhyChooseViralClicker = () => {
  const features = [
    {
      icon: Zap,
      title: "Automatización Total",
      description: "Sistemas que trabajan 24/7 sin intervención manual"
    },
    {
      icon: Target,
      title: "Leads Cualificados", 
      description: "Generación de leads listos para comprar"
    },
    {
      icon: TrendingUp,
      title: "Escalabilidad",
      description: "Crece sin límites con sistemas que se adaptan"
    },
    {
      icon: Users,
      title: "Acompañamiento",
      description: "Soporte personalizado en cada paso del proceso"
    }
  ];

  return (
    <section className="py-16 bg-viralDark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Por qué elegir </span>
            <span className="text-viralOrange">Viral Clicker</span>
          </h2>
          
          <p className="text-white/80 text-lg mb-12">
            Transformamos tu negocio con tecnología de vanguardia y estrategias probadas
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-viralDark border border-viralOrange/20 rounded-lg p-6 text-center hover:border-viralOrange/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-viralOrange/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-viralOrange" />
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
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