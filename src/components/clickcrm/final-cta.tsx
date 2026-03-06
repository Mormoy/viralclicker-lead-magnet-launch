import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, ArrowDown } from 'lucide-react';

const FinalCTA = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hola,%20me%20interesa%20ViralClicker', '_blank');
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlans = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-viralOrange/10 to-transparent">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Empieza a ordenar tus cotizaciones hoy
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold px-8 py-6"
            data-cta="book-demo"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agendar demo
          </Button>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/10 px-6 py-5"
            data-cta="whatsapp"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Hablar por WhatsApp
          </Button>
          <Button
            onClick={scrollToPlans}
            size="lg"
            variant="ghost"
            className="text-white/60 hover:text-white px-6 py-5"
          >
            <ArrowDown className="w-4 h-4 mr-2" />
            Ver planes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
