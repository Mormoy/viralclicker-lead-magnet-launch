import { FileText, Kanban, MessageCircle } from 'lucide-react';

const solutions = [
  {
    icon: FileText,
    title: "Cotizador Inteligente",
    description: "Permite que tus clientes coticen servicios en segundos.",
  },
  {
    icon: Kanban,
    title: "CRM de Cotizaciones",
    description: "Organiza todos tus leads en un pipeline simple.",
  },
  {
    icon: MessageCircle,
    title: "Seguimiento por WhatsApp",
    description: "Envía cotizaciones y recordatorios directamente a tus clientes.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Un sistema simple para vender más
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-800/40 border border-gray-700/50"
            >
              <div className="w-12 h-12 bg-viralOrange/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-viralOrange" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
