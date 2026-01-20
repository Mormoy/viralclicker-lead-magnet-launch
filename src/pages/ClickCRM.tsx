
import Logo from '@/components/logo';
import HeroSection from '@/components/clickcrm/hero-section';
import ProblemSection from '@/components/clickcrm/problem-section';
import BenefitsSection from '@/components/clickcrm/benefits-section';
import HowItWorksSection from '@/components/clickcrm/how-it-works-section';
import FeaturesSection from '@/components/clickcrm/features-section';
import ResultsSection from '@/components/clickcrm/results-section';
import PricingSection from '@/components/clickcrm/pricing-section';
import FaqSection from '@/components/clickcrm/faq-section';
import ContactFormSection from '@/components/clickcrm/contact-form-section';
import WhatsAppButton from '@/components/clickcrm/whatsapp-button';

const ViralClicker = () => {
  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      {/* Header */}
      <header className="p-4 bg-viralDark border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#como-funciona" className="text-white/80 hover:text-white transition-colors">Cómo funciona</a>
            <a href="#funcionalidades" className="text-white/80 hover:text-white transition-colors">Funcionalidades</a>
            <a href="#planes" className="text-white/80 hover:text-white transition-colors">Planes</a>
            <a href="#contacto" className="bg-viralOrange hover:bg-viralOrange/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors">Empezar ahora</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section with Video */}
        <HeroSection />
        
        {/* Problem Section */}
        <ProblemSection />
        
        {/* Benefits Section */}
        <BenefitsSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Results Section */}
        <ResultsSection />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* FAQ Section */}
        <FaqSection />
        
        {/* Contact Form Section */}
        <ContactFormSection />
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-center md:text-left text-sm">
              © 2025 Viral Clicker. Todos los derechos reservados.
            </div>
            <div className="text-white/40 text-sm">
              Hecho con ❤️ por el equipo de MORMOY
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
};

export default ViralClicker;
