import { Button } from '@/components/ui/button';
import { MessageCircle, Play, LayoutDashboard, FileText, BarChart3, ExternalLink, Kanban, TrendingUp } from 'lucide-react';

const screenshots = [
  {
    icon: FileText,
    badge: "Live Quote",
    title: "Live quote link",
    description: "Your client gets a unique link with real-time pricing. They can accept, comment, or request changes—all tracked.",
    features: ["PDF export", "Live tracking", "Client comments"]
  },
  {
    icon: Kanban,
    badge: "CRM Pipeline",
    title: "CRM pipeline view",
    description: "See every opportunity by stage: New, Quoted, Negotiating, Closed. Never lose track of follow-ups.",
    features: ["Drag & drop", "Stage filters", "Due dates"]
  },
  {
    icon: TrendingUp,
    badge: "Dashboard",
    title: "Conversion dashboard",
    description: "Clear reports: quotes sent, close rate, avg. response time, average ticket value.",
    features: ["Key metrics", "Weekly trends", "Export data"]
  }
];

const DemoSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27d%20like%20to%20see%20a%20demo%20of%20ClickCRM', '_blank');
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="demo" className="py-16 px-4 bg-viralDark landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-1 rounded-full text-sm font-medium mb-4">
            Product Preview
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See what's inside ClickCRM
          </h2>
          <p className="text-white/70 text-lg">
            A system designed so you sell and the system handles follow-up
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 landscape-grid">
          {screenshots.map((item, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-viralOrange/50 transition-all duration-300"
            >
              {/* Screenshot mockup area */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <item.icon className="w-16 h-16 text-viralOrange/30 group-hover:text-viralOrange/50 transition-colors" />
                <div className="absolute top-2 left-2 bg-viralOrange text-white text-xs px-2 py-1 rounded font-medium">
                  {item.badge}
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {item.features.map((feature, idx) => (
                    <span key={idx} className="bg-gray-900/80 text-white/70 text-[10px] px-2 py-0.5 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-viralOrange" />
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Book a personalized demo
          </Button>
          <Button 
            onClick={handleWhatsApp}
            size="lg"
            variant="outline"
            className="border-green-600 text-green-500 hover:bg-green-600/10"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
