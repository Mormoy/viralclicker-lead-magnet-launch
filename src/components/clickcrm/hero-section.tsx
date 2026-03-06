import { Button } from '@/components/ui/button';
import { MessageCircle, CheckCircle, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WISTIA_VIDEO_ID = 'sb3tom78nu';

const HeroSection = () => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27m%20interested%20in%20ViralClicker', '_blank');
  };

  const scrollToPlans = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">{t('hero.title1')} </span>
          <span className="text-viralOrange">{t('hero.title2')}</span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 shadow-glow"
            data-cta="whatsapp"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {t('cta.chatWhatsApp')}
          </Button>
          <Button
            onClick={scrollToPlans}
            size="lg"
            variant="outline"
            className="border-viralOrange/60 text-viralOrange hover:bg-viralOrange/10 font-medium text-base px-6 py-5"
          >
            <ArrowDown className="w-5 h-5 mr-2" />
            {t('hero.ctaPrimary')}
          </Button>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-white/60 text-sm mb-10">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <CheckCircle className="w-4 h-4 text-viralOrange flex-shrink-0" />
            {t('hero.badge')}
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <CheckCircle className="w-4 h-4 text-viralOrange flex-shrink-0" />
            {t('hero.badgeNoCRM', { defaultValue: 'No complicated CRM' })}
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <CheckCircle className="w-4 h-4 text-viralOrange flex-shrink-0" />
            {t('hero.badgeBuiltFor', { defaultValue: 'Built for small service businesses' })}
          </span>
        </div>

        {/* Wistia Video */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl aspect-video bg-gray-900">
            <iframe
              src={`https://fast.wistia.net/embed/iframe/${WISTIA_VIDEO_ID}?autoPlay=true&muted=true&controlsVisibleOnLoad=false`}
              title={t('hero.videoTitle')}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="text-white/40 text-sm mt-3">{t('hero.videoTitle')}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
