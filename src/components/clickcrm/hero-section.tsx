import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Play, MessageCircle, Zap } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27m%20interested%20in%20ViralClicker', '_blank');
  };

  const scrollToPricing = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

        {/* Video Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
            <div className="p-4 bg-gray-800/50 border-b border-gray-700">
              <h3 className="text-white font-semibold text-center">
                <Play className="w-5 h-5 inline-block mr-2 text-viralOrange" />
                {t('hero.videoTitle')}
              </h3>
            </div>
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              <div className="text-center p-8">
                <div 
                  onClick={scrollToContact}
                  className="w-20 h-20 mx-auto mb-4 bg-viralOrange/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-viralOrange/30 transition-colors"
                >
                  <Play className="w-10 h-10 text-viralOrange" />
                </div>
                <p className="text-white/60 text-sm mb-4">{t('hero.videoComingSoon')}</p>
                <div className="bg-gray-800 rounded-lg p-4 text-left max-w-md mx-auto">
                  <p className="text-viralOrange font-semibold mb-2">📝 {t('hero.videoScript')}</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>{t('hero.videoStep1')}</li>
                    <li>{t('hero.videoStep2')}</li>
                    <li>{t('hero.videoStep3')}</li>
                    <li>{t('hero.videoStep4')}</li>
                    <li>{t('hero.videoStep5')}</li>
                  </ul>
                </div>
                <Button 
                  onClick={scrollToContact}
                  className="mt-4 bg-viralOrange hover:bg-viralOrange/90 text-white"
                >
                  {t('hero.requestDemo')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
