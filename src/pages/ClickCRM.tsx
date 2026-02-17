import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import HeroSection from '@/components/clickcrm/hero-section';
import EarlyProofSection from '@/components/clickcrm/early-proof-section';
import ProblemSection from '@/components/clickcrm/problem-section';
import BenefitsSection from '@/components/clickcrm/benefits-section';
import HowItWorksSection from '@/components/clickcrm/how-it-works-section';
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
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const ViralClicker = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      {/* Sticky Header */}
      <header className="p-4 bg-viralDark/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#como-funciona" className="text-white/80 hover:text-white transition-colors">Cómo funciona</a>
            <a href="#funcionalidades" className="text-white/80 hover:text-white transition-colors">Funcionalidades</a>
            <a href="#planes" className="text-white/80 hover:text-white transition-colors">Planes</a>
            <a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a>
            <Button
              onClick={scrollToContact}
              className="bg-viralOrange hover:bg-viralOrange/90 text-white px-4 py-2 font-semibold"
              data-cta="book-demo"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendar demo
            </Button>
          </nav>
          <div className="flex items-center gap-2">
            {/* Mobile CTA */}
            <Button
              onClick={scrollToContact}
              size="sm"
              className="md:hidden bg-viralOrange hover:bg-viralOrange/90 text-white text-xs px-3 py-1"
              data-cta="book-demo"
            >
              <Calendar className="w-3 h-3 mr-1" />
              Demo
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-grow space-y-0">
        <HeroSection />
        
        {/* Early Proof - right after hero */}
        <EarlyProofSection />
        
        <div className="py-4" />
        <ProblemSection />
        
        <div className="py-2" />
        <BenefitsSection />
        
        <SectionCTA variant="subtle" />
        
        <HowItWorksSection />
        <DemoSection />
        
        <div className="py-4" />
        <TargetAudienceSection />
        <TestimonialsSection />
        <CaseStudySection />
        
        <div className="py-4" />
        <PricingSection />
        <FaqSection />
        
        <SectionCTA variant="subtle" />
        <ContactFormSection />
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-center md:text-left text-sm">
              © 2025 ViralClicker. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="/terminos" className="text-white/40 hover:text-white/60 text-sm transition-colors">
                Términos del Servicio
              </a>
              <span className="text-white/20">|</span>
              <span className="text-white/40 text-sm">Powered by Mormoy LLC</span>
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
