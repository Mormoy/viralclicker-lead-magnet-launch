import { Button } from '@/components/ui/button';
import { MessageCircle, CheckCircle, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27m%20interested%20in%20ViralClicker', '_blank');
  };

  const scrollToPlans = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">Quote, organize and close deals </span>
          <span className="text-viralOrange">through WhatsApp</span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          ViralClicker combines a Smart Quote Builder with a simple CRM to help small businesses capture leads, send quotes and close deals faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 shadow-glow"
            data-cta="whatsapp"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Talk on WhatsApp
          </Button>
          <Button
            onClick={scrollToPlans}
            size="lg"
            variant="outline"
            className="border-viralOrange/60 text-viralOrange hover:bg-viralOrange/10 font-medium text-base px-6 py-5"
          >
            <ArrowDown className="w-5 h-5 mr-2" />
            View Plans
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center text-white/60 text-sm">
          <span className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-viralOrange" />
            Setup in 7 days
          </span>
          <span className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-viralOrange" />
            No complicated CRM
          </span>
          <span className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-viralOrange" />
            Built for small service businesses
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
