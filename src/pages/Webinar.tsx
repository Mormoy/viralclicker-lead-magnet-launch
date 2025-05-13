
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/logo';
import VideoPlayer from '@/components/video-player';
import TestimonialSection from '@/components/testimonial-section';
import MetricsSection from '@/components/metrics-section';
import TrustedBrands from '@/components/trusted-brands';
import { ArrowRight, Calendar } from 'lucide-react';

const Webinar = () => {
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);
  const [leadData, setLeadData] = useState<any>(null);
  const calendlyUrl = "https://calendly.com/viral-clicker/llamada-estrategica";

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
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  const handleVideoEnd = () => {
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
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCalendly = () => {
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
    
    window.open(calendlyUrl, '_blank');
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

            {videoEnded && (
              <div id="booking" className="max-w-2xl mx-auto text-center">
                <div className="bg-viralDark/50 border border-viralOrange/30 rounded-lg p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    ¿Desea profundizar en cómo podemos ayudarle?
                  </h2>
                  
                  <p className="text-white/80 mb-6">
                    Reserve una videollamada con uno de nuestros especialistas para recibir una estrategia personalizada para su negocio.
                  </p>
                  
                  <button
                    onClick={openCalendly}
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

        {/* Testimonials Section */}
        <TestimonialSection />
        
        {/* Metrics Section */}
        <MetricsSection />
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-4">
        <div className="container mx-auto text-white/60 text-center text-sm">
          © 2025 ViralClicker. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Webinar;
