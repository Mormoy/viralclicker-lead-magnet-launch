import { Link, TrendingUp, Clock, Percent, MessageCircle, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: Link,
    title: "Live quote link",
    description: "Each quote has a unique link that the client can view, modify, and approve. No static PDFs."
  },
  {
    icon: Percent,
    title: "Coupons on quotes",
    description: "Create discount codes and apply them directly to active quotes. Perfect for closing deals."
  },
  {
    icon: MessageCircle,
    title: "Internal WhatsApp campaigns",
    description: "Send promotions and follow-ups to your lead base directly from the CRM."
  },
  {
    icon: BarChart3,
    title: "Post-sale tracking",
    description: "Monitor each client's status after the sale: installation, payment, satisfaction."
  },
  {
    icon: TrendingUp,
    title: "More closes, fewer leaks",
    description: "Automated follow-up that keeps your clients warm until they close."
  },
  {
    icon: Clock,
    title: "Setup in 7 days",
    description: "Your system ready and running in one week. No endless waits or never-ending projects."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 px-4 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why ClickCRM?
          </h2>
          <p className="text-white/70 text-lg">
            The tools you need to sell more via WhatsApp
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto landscape-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 border border-gray-700 hover:border-viralOrange/50 transition-all hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-viralOrange/20 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-viralOrange" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {benefit.title}
              </h3>
              <p className="text-white/60 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
