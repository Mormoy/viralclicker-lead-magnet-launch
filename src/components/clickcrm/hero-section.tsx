import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, FileText, Kanban, Bot, Shield } from 'lucide-react';
import PricingSelector from './pricing-selector';
import { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://fast.wistia.net/player.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hola,%20me%20interesa%20ViralClicker', '_blank');
  };

  const scrollToDemo = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-20 px-4 hero-landscape">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* Badge */}
          <div className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🚀 Implementación en 7 días
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Cotiza → Sigue → Cierra </span>
            <span className="text-viralOrange">por WhatsApp</span>
          </h1>

          {/* Audience + Outcome subtitle */}
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Para negocios que venden por cotización (servicios e instalaciones). Responde más rápido, ordena tus leads y recupera ventas con seguimiento automático.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
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

          {/* Credibility line */}
          <p className="text-white/50 text-sm mb-8">
            <Shield className="w-4 h-4 inline mr-1 -mt-0.5" />
            Implementación en 7 días hábiles + onboarding 1:1
          </p>

          {/* Micro bullets */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 px-4 py-2 rounded-full">
              <FileText className="w-4 h-4 text-viralOrange" />
              <span className="text-white/80 text-sm">Cotización viva con link</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 px-4 py-2 rounded-full">
              <Kanban className="w-4 h-4 text-viralOrange" />
              <span className="text-white/80 text-sm">CRM con pipeline</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 px-4 py-2 rounded-full">
              <Bot className="w-4 h-4 text-viralOrange" />
              <span className="text-white/80 text-sm">Seguimiento automático por WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Video Demo - Wistia */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <div style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                <iframe
                  src="https://fast.wistia.net/embed/iframe/sb3tom78nu?web_component=true&seo=true"
                  title="ViralClicker Demo Video"
                  allow="autoplay; fullscreen"
                  frameBorder="0"
                  scrolling="no"
                  className="wistia_embed w-full h-full"
                  name="wistia_embed"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Selector */}
        <PricingSelector />
      </div>
    </section>
  );
};

export default HeroSection;
