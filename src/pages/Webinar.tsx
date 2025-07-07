
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/logo';
import VideoPlayer from '@/components/video-player';
import TestimonialSection from '@/components/testimonial-section';
import MetricsSection from '@/components/metrics-section';
import TrustedBrands from '@/components/trusted-brands';
import WhyChooseSection from '@/components/why-choose-section';
import TransformBusinessSection from '@/components/transform-business-section';
import BookingSection from '@/components/booking-section';
import { ArrowRight, Calendar } from 'lucide-react';

const Webinar = () => {
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);
  const [showBookingSection, setShowBookingSection] = useState(false);
  const [leadData, setLeadData] = useState<any>(null);
  const calendlyUrl = "https://calendly.com/moromoyllc";

  useEffect(() => {
    // Check if user came from the lead form
    const savedLead = localStorage.getItem("viralclicker_lead");
    
    if (!savedLead) {
      // If no lead data found, redirect to home page
      navigate('/');
    } else {
      setLeadData(JSON.parse(savedLead));
    }
    
    // Track webinar page visit
    const metrics = JSON.parse(savedLead || '{}')?.metrics || {};
    const updatedMetrics = {
      ...metrics,
      webinarPageVisit: true,
      webinarPageVisitTime: new Date().toISOString()
    };
    
    // Update metrics in localStorage
    if (savedLead) {
      const leadData = JSON.parse(savedLead);
      localStorage.setItem("viralclicker_lead", JSON.stringify({
        ...leadData,
        metrics: updatedMetrics
      }));
    }
    
    // Track when user leaves webinar
    const handleBeforeUnload = () => {
      const savedData = localStorage.getItem("viralclicker_lead");
      if (savedData) {
        const data = JSON.parse(savedData);
        const metrics = data.metrics || {};
        localStorage.setItem("viralclicker_lead", JSON.stringify({
          ...data,
          metrics: {
            ...metrics,
            webinarExitTime: new Date().toISOString()
          }
        }));
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Listen for custom event to show booking section
    const handleShowBooking = () => {
      setShowBookingSection(true);
    };
    
    window.addEventListener('showBookingSection', handleShowBooking);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('showBookingSection', handleShowBooking);
    };
  }, [navigate]);

  const handleVideoEnd = () => {
    console.log("Video end handler triggered");
    setVideoEnded(true);
    
    // Track webinar completion
    const savedLead = localStorage.getItem("viralclicker_lead");
    if (savedLead) {
      const leadData = JSON.parse(savedLead);
      const metrics = leadData.metrics || {};
      localStorage.setItem("viralclicker_lead", JSON.stringify({
        ...leadData,
        metrics: {
          ...metrics,
          webinarCompleted: true,
          webinarCompletedTime: new Date().toISOString()
        }
      }));
    }
    
    // Auto scroll to booking section
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  // Function to open Calendly in a modal
  const openCalendlyModal = () => {
    // Track calendly click
    const savedLead = localStorage.getItem("viralclicker_lead");
    if (savedLead) {
      const leadData = JSON.parse(savedLead);
      const metrics = leadData.metrics || {};
      localStorage.setItem("viralclicker_lead", JSON.stringify({
        ...leadData,
        metrics: {
          ...metrics,
          calendlyClicked: true,
          calendlyClickTime: new Date().toISOString()
        }
      }));
    }
    
    // Create modal for Calendly
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-viralDark border border-viralOrange/30 rounded-lg w-full max-w-4xl h-[80vh] p-4 relative">
        <button class="absolute top-2 right-2 text-white/60 hover:text-white text-xl">&times;</button>
        <iframe src="${calendlyUrl}" width="100%" height="100%" frameborder="0"></iframe>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add close functionality
    const closeButton = modal.querySelector('button');
    closeButton?.addEventListener('click', () => {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    });
  };

  if (!leadData) {
    return <div className="min-h-screen bg-viralDark flex items-center justify-center">
      <div className="animate-pulse text-viralOrange">Cargando...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      {/* Header */}
      <header className="p-4 bg-viralDark border-b border-gray-800">
        <div className="container mx-auto">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-white">Descubra cómo </span>
              <span className="text-viralOrange">ViralClicker </span>
              <span className="text-white">puede transformar su negocio</span>
            </h1>
            
            <div className="mb-16">
              <VideoPlayer onVideoEnd={handleVideoEnd} />
            </div>

            {/* Booking Section - Shows after 1 minute */}
            <BookingSection isVisible={showBookingSection} onBookingClick={openCalendlyModal} />

            {/* Final booking section - Shows after video ends */}
            {videoEnded && !showBookingSection && (
              <div id="booking" className="max-w-2xl mx-auto text-center">
                <div className="bg-viralDark/50 border border-viralOrange/30 rounded-lg p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    ¿Desea profundizar en cómo podemos ayudarle?
                  </h2>
                  
                  <p className="text-white/80 mb-6">
                    Reserve una videollamada con uno de nuestros especialistas para recibir una estrategia personalizada para su negocio.
                  </p>
                  
                  <button
                    onClick={openCalendlyModal}
                    className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center mx-auto gap-2 transition-all transform hover:scale-105"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Reservar una videollamada</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Trusted Brands Section */}
        <TrustedBrands />

        {/* Why Choose Section */}
        <WhyChooseSection />

        {/* Testimonials Section */}
        <TestimonialSection />
        
        {/* Metrics Section */}
        <MetricsSection />
        
        {/* Transform Business Section */}
        <TransformBusinessSection />
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-4">
        <div className="container mx-auto text-white/60 text-center text-sm">
          © 2025 ViralClicker. Todos los derechos reservados • Hecho con ❤️ por el equipo de MORMOY
        </div>
      </footer>
    </div>
  );
};

export default Webinar;
