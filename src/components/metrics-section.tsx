
import { Card } from "@/components/ui/card";
import { TrendingUp, Award, Users, Star } from "lucide-react";

const metrics = [
  {
    icon: <Users className="h-8 w-8 text-viralOrange" />,
    value: "+5.000",
    label: "leads generados"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-viralOrange" />,
    value: "200%",
    label: "aumento en conversiones"
  },
  {
    icon: <Award className="h-8 w-8 text-viralOrange" />,
    value: "95%",
    label: "retención de clientes"
  },
  {
    icon: <Star className="h-8 w-8 text-viralOrange" />,
    value: "3 años",
    label: "ayudando a marcas a crecer"
  }
];

const MetricsSection = () => {
  return (
    <section className="py-16 bg-viralDark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Resultados que generamos
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-viralDark/50 border border-viralOrange/30 text-white p-6 flex flex-col items-center justify-center text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="mb-3">{metric.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-viralOrange mb-1">{metric.value}</div>
              <div className="text-white/80">{metric.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
