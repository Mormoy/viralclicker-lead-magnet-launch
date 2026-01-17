import { TrendingUp, Clock, CheckCircle } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    value: "+45%",
    label: "Tasa de respuesta",
    description: "Los leads reciben respuesta en minutos, no en horas"
  },
  {
    icon: CheckCircle,
    value: "+30%",
    label: "Más cierres",
    description: "Seguimiento sistemático que convierte más cotizaciones"
  },
  {
    icon: Clock,
    value: "-5h",
    label: "Ahorro semanal",
    description: "Menos tiempo en seguimiento manual, más tiempo vendiendo"
  }
];

const ResultsSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-900/50 to-viralDark">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-viralOrange/10 to-viralOrange/5 rounded-2xl p-8 md:p-12 border border-viralOrange/20">
            <div className="text-center mb-10">
              <span className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-1 rounded-full text-sm font-medium mb-4">
                Caso real
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Implementado en un negocio real
              </h2>
              <p className="text-white/70">
                Resultados obtenidos por una empresa de instalaciones en sus primeros 3 meses
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-700/50"
                >
                  <metric.icon className="w-8 h-8 text-viralOrange mx-auto mb-3" />
                  <div className="text-4xl font-bold text-viralOrange mb-1">
                    {metric.value}
                  </div>
                  <div className="text-white font-semibold mb-2">
                    {metric.label}
                  </div>
                  <p className="text-white/50 text-sm">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-white/60 text-sm italic">
                * Los resultados pueden variar según el rubro y la implementación
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
