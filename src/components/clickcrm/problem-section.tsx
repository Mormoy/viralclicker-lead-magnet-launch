import { AlertTriangle, Clock, MessageSquareX, FileX } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: "Leads going cold",
    description: "Customers ask for quotes, but if you don't respond fast, they go to your competitor."
  },
  {
    icon: FileX,
    title: "Lost quotes",
    description: "You send quotes via WhatsApp and don't know which ones are pending or closed."
  },
  {
    icon: MessageSquareX,
    title: "Messy WhatsApp",
    description: "Thousands of chats with no organization. You don't know who needs follow-up or when."
  },
  {
    icon: AlertTriangle,
    title: "No control or metrics",
    description: "No visibility on how many leads come in, how many quote, and how many close."
  }
];

const ProblemSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-900/50 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sound familiar?
          </h2>
          <p className="text-white/70 text-lg">
            These are the most common problems for small businesses that sell via quotes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto landscape-grid">
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
            ClickCRM solves all of this in one place 👇
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
