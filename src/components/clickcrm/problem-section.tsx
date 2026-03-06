import { HelpCircle, MessageSquareX, FileX, Clock } from 'lucide-react';

const problems = [
  {
    icon: HelpCircle,
    text: "Los clientes preguntan pero no cotizan",
  },
  {
    icon: FileX,
    text: "Las cotizaciones se pierden en WhatsApp",
  },
  {
    icon: Clock,
    text: "Nadie hace seguimiento",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-gray-900/30">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          ¿Te suena familiar?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/50"
            >
              <problem.icon className="w-6 h-6 text-red-400 flex-shrink-0" />
              <span className="text-white/80 text-sm text-left">{problem.text}</span>
            </div>
          ))}
        </div>

        <p className="text-viralOrange font-medium text-base">
          ViralClicker resuelve esto en un solo lugar 👇
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
