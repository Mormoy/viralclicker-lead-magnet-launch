import { Clock, FileX, MessageSquareX, AlertTriangle } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: "Leads que se enfrían",
    description: "Tardan en responder y el cliente se va con la competencia."
  },
  {
    icon: FileX,
    title: "Cotizaciones sin control",
    description: "No sabes cuáles están pendientes, cuáles cerraron."
  },
  {
    icon: MessageSquareX,
    title: "WhatsApp caótico",
    description: "Cientos de chats sin orden ni seguimiento."
  }
];

const ProblemSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 landscape-padding">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            ¿Te suena familiar?
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Los 3 problemas más comunes al vender por cotización
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 md:p-5 rounded-xl bg-gray-800/30 border border-gray-700/50"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-red-500/15 rounded-lg flex items-center justify-center">
                <problem.icon className="w-5 h-5 text-red-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-medium text-sm md:text-base mb-1">
                  {problem.title}
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cost of inaction */}
        <div className="mt-6 bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-white/70 text-sm">
            Si respondes tarde o no haces seguimiento, ese lead se enfría y la venta se pierde.
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="text-viralOrange font-medium text-base md:text-lg">
            ViralClicker resuelve esto en un solo lugar 👇
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
