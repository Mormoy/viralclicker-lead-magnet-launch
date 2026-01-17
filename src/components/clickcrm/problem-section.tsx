import { AlertTriangle, Clock, MessageSquareX, FileX } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: "Leads que se enfrían",
    description: "Los clientes preguntan, pero si no respondes rápido, se van con la competencia."
  },
  {
    icon: FileX,
    title: "Cotizaciones perdidas",
    description: "Envías cotizaciones por WhatsApp y no sabes cuáles están pendientes o cerradas."
  },
  {
    icon: MessageSquareX,
    title: "WhatsApp desordenado",
    description: "Miles de chats sin organizar, no sabes quién necesita seguimiento ni cuándo."
  },
  {
    icon: AlertTriangle,
    title: "Sin control ni métricas",
    description: "No tienes visibilidad de cuántos leads llegan, cuántos cotizan y cuántos cierran."
  }
];

const ProblemSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-900/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Te suena familiar?
          </h2>
          <p className="text-white/70 text-lg">
            Estos son los problemas más comunes de las PyMEs que venden por cotización
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-colors"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {problem.title}
              </h3>
              <p className="text-white/60 text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-viralOrange font-semibold text-xl">
            ClickCRM resuelve todo esto en un solo lugar 👇
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
