import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import CountdownTimer from '@/components/countdown-timer';
import LeadForm from '@/components/lead-form';
import AutoTimer from '@/components/auto-timer';
import VideoPlayer from '@/components/video-player';
import TestimonialSection from '@/components/testimonial-section';
import MetricsSection from '@/components/metrics-section';
import TrustedBrands from '@/components/trusted-brands';
import FaqSection from '@/components/faq-section';
import ExclusiveAccess from '@/components/exclusive-access';
import WhatIsAIAgent from '@/components/what-is-ai-agent';
import WhyChooseAIAgent from '@/components/why-choose-ai-agent';

const AIAgent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showFormAfterVideo, setShowFormAfterVideo] = useState(false);
  const [showAutoTimer, setShowAutoTimer] = useState(true);
  const [showCtaButton, setShowCtaButton] = useState(false);
  

  const openForm = () => {
    setIsFormOpen(true);
  };

  const handleAutoTimerComplete = () => {
    setShowAutoTimer(false);
    setShowCtaButton(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  useEffect(() => {
    const handleShowBooking = () => {
      console.log("showBookingSection event received - showing CTA button");
      setShowCtaButton(true);
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
              <span className="text-white">Transforme su negocio con </span>
              <span className="text-viralOrange">Agentes IA</span>
              <span className="text-white"> inteligentes</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-10 text-center hidden md:block">
              Automatice sus procesos, atienda a sus clientes 24/7 y aumente su eficiencia 
              con agentes IA personalizados para su negocio.
            </p>
            
            <div className="mb-16">
              <VideoPlayer onVideoEnd={() => {}} onContactRequest={openForm} />
            </div>
          </div>
        </div>
        
        {/* What is AI Agent Section */}
        <WhatIsAIAgent />
        
        {/* Why Choose AI Agent Section */}
        <WhyChooseAIAgent />
        
        {/* Testimonials Section */}
        <TestimonialSection />
        
        {/* Metrics Section */}
        <MetricsSection />
        
        {/* Trusted Brands Section */}
        <TrustedBrands />
        
        {/* FAQ Section */}
        <FaqSection />
        
        {/* Exclusive Access Section */}
        <ExclusiveAccess onFormSubmit={openForm} />
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-white/60">
          <p>&copy; 2024 Viral Clicker. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Auto Timer */}
      {showAutoTimer && (
        <AutoTimer 
          onComplete={handleAutoTimerComplete}
          duration={60}
        />
      )}

      {/* Lead Form */}
      <LeadForm isOpen={isFormOpen} onClose={handleFormClose} />
    </div>
  );
};

export default AIAgent;
