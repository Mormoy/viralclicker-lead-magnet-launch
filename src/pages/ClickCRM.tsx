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
            <a href="#como-funciona" className="text-white/80 hover:text-white transition-colors text-sm">Cómo funciona</a>
            <a href="#planes" className="text-white/80 hover:text-white transition-colors text-sm">Planes</a>
            <Button
              onClick={scrollToContact}
              className="bg-viralOrange hover:bg-viralOrange/90 text-white px-4 py-2 font-semibold"
              data-cta="book-demo"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendar demo
            </Button>
          </nav>
          <Button
            onClick={scrollToContact}
            size="sm"
            className="md:hidden bg-viralOrange hover:bg-viralOrange/90 text-white text-xs px-3 py-1"
            data-cta="book-demo"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Demo
          </Button>
        </div>
      </header>

      <main className="flex-grow space-y-0">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Problema */}
        <ProblemSection />

        {/* 3. Solución */}
        <SolutionSection />

        {/* 4. Cómo funciona */}
        <HowItWorksSection />

        {/* 5. Para quién es */}
        <ForWhoSection />

        {/* 6. Planes */}
        <PricingSection />

        {/* 7. CTA Final + Formulario */}
        <FinalCTA />
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
    </div>
  );
};

export default ViralClicker;
