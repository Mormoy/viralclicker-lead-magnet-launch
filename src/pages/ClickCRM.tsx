import { useTranslation } from 'react-i18next';
import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import HeroSection from '@/components/clickcrm/hero-section';
import ProblemSection from '@/components/clickcrm/problem-section';
import BenefitsSection from '@/components/clickcrm/benefits-section';
import HowItWorksSection from '@/components/clickcrm/how-it-works-section';
import FeaturesSection from '@/components/clickcrm/features-section';
import IntegrationsSection from '@/components/clickcrm/integrations-section';
import ResultsSection from '@/components/clickcrm/results-section';
import DemoSection from '@/components/clickcrm/demo-section';
import TargetAudienceSection from '@/components/clickcrm/target-audience-section';
import PricingSection from '@/components/clickcrm/pricing-section';
import FaqSection from '@/components/clickcrm/faq-section';
import ContactFormSection from '@/components/clickcrm/contact-form-section';
import WhatsAppButton from '@/components/clickcrm/whatsapp-button';
import FloatingDemoButton from '@/components/clickcrm/floating-demo-button';
import SectionCTA from '@/components/clickcrm/section-cta';
import TestimonialsSection from '@/components/clickcrm/testimonials-section';
import CaseStudySection from '@/components/clickcrm/case-study-section';

const ViralClicker = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      {/* Header */}
      <header className="p-4 bg-viralDark border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#como-funciona" className="text-white/80 hover:text-white transition-colors">{t('nav.howItWorks')}</a>
            <a href="#funcionalidades" className="text-white/80 hover:text-white transition-colors">{t('nav.features')}</a>
            <a href="#planes" className="text-white/80 hover:text-white transition-colors">{t('nav.pricing')}</a>
            <a href="#contacto" className="bg-viralOrange hover:bg-viralOrange/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors">{t('nav.getStarted')}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />
        <ProblemSection />
        <SectionCTA variant="subtle" />
        <BenefitsSection />
        <HowItWorksSection />
        <SectionCTA variant="subtle" />
        <FeaturesSection />
        <IntegrationsSection />
        <DemoSection />
        <TargetAudienceSection />
        <TestimonialsSection />
        <CaseStudySection />
        <ResultsSection />
        <PricingSection />
        <SectionCTA variant="subtle" />
        <FaqSection />
        <ContactFormSection />
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-center md:text-left text-sm">
              {t('footer.rights')}
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/terminos" 
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                {t('footer.terms')}
              </a>
              <span className="text-white/20">|</span>
              <span className="text-white/40 text-sm">
                {t('footer.madeBy')}
              </span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <FloatingDemoButton />
    </div>
  );
};

export default ViralClicker;
