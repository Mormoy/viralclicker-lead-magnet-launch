
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Award, Users, Star } from "lucide-react";

const metrics = [
  {
    icon: <Users className="h-10 w-10 text-viralOrange" />,
    value: "+5.000",
    label: "leads generados",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000"
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-viralOrange" />,
    value: "200%",
    label: "aumento en conversiones",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
  },
  {
    icon: <Award className="h-10 w-10 text-viralOrange" />,
    value: "95%",
    label: "retención de clientes",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1000"
  },
  {
    icon: <Star className="h-10 w-10 text-viralOrange" />,
    value: "3 años",
    label: "ayudando a marcas a crecer",
    image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=1000"
  }
];

const MetricsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-viralDark relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-viralDark via-viralDark/90 to-viralDark/70 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Resultados que <span className="text-viralOrange">transforman negocios</span>
          </h2>
          <p className="text-white/80 text-lg">
            Nuestro enfoque vanguardista combina tecnología y estrategia para generar resultados medibles y significativos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              className={`group bg-black/40 backdrop-blur border border-viralOrange/30 text-white p-6 overflow-hidden relative h-[280px] transform transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                <img 
                  src={metric.image}
                  alt={metric.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x600?text=Metric";
                  }}
                />
              </div>
              
              <div className="relative z-20 flex flex-col h-full justify-end">
                <div className="flex justify-center mb-4">{metric.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-viralOrange mb-2">{metric.value}</div>
                <div className="text-white/90 text-lg">{metric.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
