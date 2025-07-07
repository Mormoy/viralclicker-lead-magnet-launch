
import { useState } from 'react';
import Logo from '@/components/logo';
import CountdownTimer from '@/components/countdown-timer';
import LeadForm from '@/components/lead-form';
import VideoThumbnail from '@/components/video-thumbnail';
import TrustedBrands from '@/components/trusted-brands';
import MetricsSection from '@/components/metrics-section';
import WhyChooseSection from '@/components/why-choose-section';
import TransformBusinessSection from '@/components/transform-business-section';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

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
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              <span className="text-white">Capte más </span>
              <span className="text-viralOrange">leads calificados</span>
              <span className="text-white"> y aumente sus ventas</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-10 text-center">
              Optimizamos su presencia digital para conectar con clientes potenciales y 
              convertir visitas en ventas.
            </p>
            
            <div className="mb-10">
              <VideoThumbnail onPlay={openForm} />
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={openForm}
                className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 animate-pulse"
              >
                ¡Quiero aumentar mis ventas!
              </button>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <TrustedBrands />
        
        {/* Why Choose Section */}
        <WhyChooseSection />
        
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

      {/* Lead Form Modal */}
      <LeadForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Index;
