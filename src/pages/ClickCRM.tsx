import Logo from '@/components/logo';
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
        <SectionCTA variant="subtle" />
        
        {/* Benefits Section */}
        <BenefitsSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        <SectionCTA variant="subtle" />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Integrations Section */}
        <IntegrationsSection />
        
        {/* Demo / Screenshots Section */}
        <DemoSection />
        
        {/* Target Audience Section */}
        <TargetAudienceSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Case Study Section */}
        <CaseStudySection />
        
        {/* Results Section - Above Pricing */}
        <ResultsSection />
        
        {/* Pricing Section with Comparison Table */}
        <PricingSection />
        <SectionCTA variant="subtle" />
        
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
            <div className="flex items-center gap-4">
              <a 
                href="/terminos" 
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Términos del servicio
              </a>
              <span className="text-white/20">|</span>
              <span className="text-white/40 text-sm">
                Hecho con ❤️ por MORMOY
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <WhatsAppButton />
      <FloatingDemoButton />
    </div>
  );
};

export default ViralClicker;
