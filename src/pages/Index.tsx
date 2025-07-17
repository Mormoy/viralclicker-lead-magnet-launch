
import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import CountdownTimer from '@/components/countdown-timer';
import LeadForm from '@/components/lead-form';
import InlineLeadForm from '@/components/inline-lead-form';
import AutoTimer from '@/components/auto-timer';
import VideoPlayer from '@/components/video-player';
import TestimonialSection from '@/components/testimonial-section';
import MetricsSection from '@/components/metrics-section';
import WhyChooseViralClicker from '@/components/why-choose-viralclicker';
import TrustedBrands from '@/components/trusted-brands';
import FaqSection from '@/components/faq-section';
import WhatIsViralClicker from '@/components/what-is-viralclicker';
import ExclusiveAccess from '@/components/exclusive-access';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showFormAfterVideo, setShowFormAfterVideo] = useState(false);
  const [showAutoTimer, setShowAutoTimer] = useState(true);
  const [showInlineForm, setShowInlineForm] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const handleAutoTimerComplete = () => {
    setShowAutoTimer(false);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setShowInlineForm(true); // Show inline form after closing popup
  };

  // Listen for the custom event to show form after 1 minute
  useEffect(() => {
    const handleShowBooking = () => {
      console.log("showBookingSection event received - showing form");
      setShowFormAfterVideo(true);
      // Remove auto-open to make it less invasive
    };

    const handleOpenContactForm = () => {
      console.log("openContactForm event received - opening form");
      setIsFormOpen(true);
    };
    
    window.addEventListener('showBookingSection', handleShowBooking);
    window.addEventListener('openContactForm', handleOpenContactForm);
    
    return () => {
      window.removeEventListener('showBookingSection', handleShowBooking);
      window.removeEventListener('openContactForm', handleOpenContactForm);
    };
  }, []);

  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      {/* Header */}
      <header className="p-4 bg-viralDark border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
        </div>
      </header>

      {/* Special Offer Banner */}
      <div className="bg-viralOrange py-3">
        <div className="container mx-auto flex justify-center items-center flex-col sm:flex-row gap-2 sm:gap-4 px-4">
          <p className="text-white font-bold">¡OFERTA ESPECIAL! Esta promoción termina en:</p>
          <CountdownTimer />
        </div>
      </div>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              <span className="text-white">Capte más </span>
              <span className="text-viralOrange">leads calificados</span>
              <span className="text-white"> y aumente sus ventas</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-10 text-center hidden md:block">
              Optimizamos su presencia digital para conectar con clientes potenciales y 
              convertir visitas en ventas.
            </p>
            
            <div className="mb-16">
              <VideoPlayer onVideoEnd={() => {}} onContactRequest={openForm} />
            </div>

          </div>
        </div>
        
        {/* Inline Lead Form Section - Only show after popup is closed */}
        {showInlineForm && <InlineLeadForm />}
        
        {/* What is ViralClicker Section */}
        <WhatIsViralClicker />
        
        {/* Why Choose Viral Clicker Section */}
        <WhyChooseViralClicker />
        
        {/* Testimonials Section */}
        <TestimonialSection />
        
        {/* Metrics Section */}
        <MetricsSection />
        
        {/* Trusted Brands Section */}
        <TrustedBrands />
        
        {/* FAQ Section */}
        <FaqSection />
        
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-4">
        <div className="container mx-auto text-white/60 text-center text-sm">
          © 2025 ViralClicker. Todos los derechos reservados • Hecho con ❤️ por el equipo de MORMOY
        </div>
      </footer>

      {/* Auto Timer */}
      {showAutoTimer && <AutoTimer onComplete={handleAutoTimerComplete} />}
      
      {/* Lead Form Modal */}
      <LeadForm isOpen={isFormOpen} onClose={handleFormClose} />
    </div>
  );
};

export default Index;
