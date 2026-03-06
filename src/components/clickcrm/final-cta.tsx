import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FinalCTA = () => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27m%20interested%20in%20ViralClicker', '_blank');
  };

  const scrollToPlans = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-viralOrange/10 to-transparent">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {t('faq.ctaTitle', { defaultValue: 'Start organizing your quotes today' })}
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Button onClick={handleWhatsApp} size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6" data-cta="whatsapp">
            <MessageCircle className="w-5 h-5 mr-2" />
            {t('cta.chatWhatsApp')}
          </Button>
          <Button onClick={scrollToPlans} size="lg" variant="ghost" className="text-white/60 hover:text-white px-6 py-5">
            <ArrowDown className="w-4 h-4 mr-2" />
            {t('hero.ctaPrimary')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
