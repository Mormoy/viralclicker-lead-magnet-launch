import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hola,%20me%20interesa%20ViralClicker', '_blank');
  };

  const scrollToDemo = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">Cotiza, organiza y cierra ventas </span>
          <span className="text-viralOrange">por WhatsApp</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Sistema con Cotizador Inteligente + CRM simple diseñado para pequeñas empresas que venden por cotización.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={scrollToDemo}
            size="lg"
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold text-lg px-8 py-6 shadow-glow"
            data-cta="book-demo"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agendar demo (15 min)
          </Button>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/10 font-medium text-base px-6 py-5"
            data-cta="whatsapp"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Hablar por WhatsApp
          </Button>
        </div>

        {/* Bullets */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-white/60 text-sm">
          <span className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-viralOrange" />
            Implementación en 7 días
          </span>
          <span className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-viralOrange" />
            Sin CRM complicado
          </span>
          <span className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-viralOrange" />
            Diseñado para pequeñas empresas
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
