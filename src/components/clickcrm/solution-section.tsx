import { FileText, Kanban, MessageCircle } from 'lucide-react';

const solutions = [
  {
    icon: FileText,
    title: "Smart Quote Builder",
    description: "Allow customers to generate quotes in seconds.",
  },
  {
    icon: Kanban,
    title: "CRM for Quotes",
    description: "Organize all leads and quotes in a clear pipeline.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Follow-Ups",
    description: "Send quotes and reminders directly through WhatsApp.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          A simple system to sell more
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
