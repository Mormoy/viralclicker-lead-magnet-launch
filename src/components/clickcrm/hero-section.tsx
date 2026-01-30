import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { MessageCircle, Zap } from 'lucide-react';
import PricingSelector from './pricing-selector';

const HeroSection = () => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27m%20interested%20in%20ViralClicker', '_blank');
  };

  const scrollToPricing = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-20 px-4 hero-landscape">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {t('hero.badge')}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{t('hero.title1')} </span>
            <span className="text-viralOrange">{t('hero.title2')}</span>
          </h1>
          
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={scrollToPricing}
              size="lg"
              className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold text-lg px-8 py-6 shadow-glow"
            >
              <Zap className="w-5 h-5 mr-2" />
              {t('hero.ctaPrimary')}
            </Button>
            <Button 
              onClick={handleWhatsApp}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </div>

        {/* Video Demo */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source 
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                type="video/mp4" 
              />
              Tu navegador no soporta videos HTML5.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Pricing Selector */}
        <PricingSelector />
      </div>
    </section>
  );
};

export default HeroSection;
