import { Bot, Target, TrendingUp, Users, BarChart3 } from "lucide-react";

const WhyChooseViralClicker = () => {
  const features = [
    {
      icon: Bot,
      title: "🤖 Automatización Inteligente",
      description: "Sistemas que funcionan 24/7 sin que muevas un dedo. Mientras duermes, tu negocio filtra, educa y califica a los prospectos ideales."
    },
    {
      icon: Target,
      title: "🎯 Leads Listos Para Escuchar", 
      description: "No más conversaciones con curiosos o indecisos. Cada persona que te contacta ya vio tu video, entendió tu propuesta y quiere saber más."
    },
    {
      icon: TrendingUp,
      title: "📈 Escala sin Agobio",
      description: "Diseñamos un sistema que no solo crece contigo, sino que te libera tiempo. Ya no dependes de referidos, posteos diarios o campañas eternas."
    },
    {
      icon: Users,
      title: "🤝 Acompañamiento Real",
      description: "No estás solo. Te guiamos paso a paso para implementar un sistema probado que ha generado miles de leads y multiplicado por 10 el ROI de negocios como el tuyo."
    },
    {
      icon: BarChart3,
      title: "💡 Estrategia Basada en Datos",
      description: "Nuestro avatar Nairok no adivina: analiza, mide y optimiza cada interacción para que tomes decisiones con claridad, no con intuición."
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
            Porque no necesitas perseguir clientes... necesitas un sistema que los atraiga mientras tú duermes.
            Con tecnología de inteligencia artificial, automatización real y estrategia personalizada, convertimos tu negocio en una máquina de conversión continua.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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