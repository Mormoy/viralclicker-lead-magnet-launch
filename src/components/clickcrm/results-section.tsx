import { TrendingUp, Clock, CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const metrics = [
  {
    icon: TrendingUp,
    value: "Respuesta más rápida",
    label: "Tiempo de respuesta",
    description: "Los leads reciben cotización en minutos, no en horas. Menos oportunidades perdidas."
  },
  {
    icon: CheckCircle,
    value: "Más cierres",
    label: "Tasa de conversión",
    description: "Seguimiento sistemático que convierte más cotizaciones en ventas cerradas."
  },
  {
    icon: Clock,
    value: "Menos tiempo manual",
    label: "Eficiencia operativa",
    description: "Automatiza el seguimiento para que tu equipo se enfoque en vender."
  }
];

const ResultsSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hola,%20quiero%20ver%20un%20ejemplo%20de%20Viral%20Clicker%20para%20mi%20rubro', '_blank');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-900/50 to-viralDark">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-viralOrange/10 to-viralOrange/5 rounded-2xl p-8 md:p-12 border border-viralOrange/20">
            <div className="text-center mb-10">
              <span className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-1 rounded-full text-sm font-medium mb-4">
                Resultados reales
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Resultados en un negocio real
              </h2>
              <p className="text-white/70">
                Implementado en empresas de servicios que emiten cotizaciones y cierran por WhatsApp
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-700/50"
                >
                  <metric.icon className="w-10 h-10 text-viralOrange mx-auto mb-4" />
                  <div className="text-xl font-bold text-viralOrange mb-1">
                    {metric.value}
                  </div>
                  <div className="text-white font-semibold mb-2 text-sm">
                    {metric.label}
                  </div>
                  <p className="text-white/50 text-sm">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 space-y-4">
              <Button 
                onClick={handleWhatsApp}
                size="lg"
                variant="outline"
                className="border-viralOrange text-viralOrange hover:bg-viralOrange/10"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Quiero ver un ejemplo con mi rubro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-white/40 text-xs italic">
                * Los resultados varían según el rubro, volumen de cotizaciones y la implementación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
