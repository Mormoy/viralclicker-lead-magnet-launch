import Logo from '@/components/logo';
import HeroSection from '@/components/clickcrm/hero-section';
import ProblemSection from '@/components/clickcrm/problem-section';
import SolutionSection from '@/components/clickcrm/solution-section';
import HowItWorksSection from '@/components/clickcrm/how-it-works-section';
import ForWhoSection from '@/components/clickcrm/for-who-section';
import PricingSection from '@/components/clickcrm/pricing-section';
import ContactFormSection from '@/components/clickcrm/contact-form-section';
import WhatsAppButton from '@/components/clickcrm/whatsapp-button';
import FinalCTA from '@/components/clickcrm/final-cta';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ViralClicker = () => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27m%20interested%20in%20ViralClicker', '_blank');
  };

  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      {/* Sticky Header */}
      <header className="p-4 bg-viralDark/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-4">
            <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors text-sm">{t('nav.howItWorks')}</a>
            <a href="#planes" className="text-white/80 hover:text-white transition-colors text-sm">{t('nav.pricing')}</a>
            <LanguageSwitcher />
            <Button
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-semibold"
              data-cta="whatsapp"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {t('cta.chatWhatsApp')}
            </Button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              onClick={handleWhatsApp}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
              data-cta="whatsapp"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              WhatsApp
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow space-y-0">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <ForWhoSection />
        <PricingSection />
        <FinalCTA />
        <ContactFormSection />
      </main>

      <footer className="bg-viralDark border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-center md:text-left text-sm">{t('footer.rights')}</div>
            <div className="flex items-center gap-4">
              <a href="/terminos" className="text-white/40 hover:text-white/60 text-sm transition-colors">{t('footer.terms')}</a>
              <span className="text-white/20">|</span>
              <span className="text-white/40 text-sm">{t('footer.madeBy')}</span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default ViralClicker;
