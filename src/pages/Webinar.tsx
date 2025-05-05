
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/logo';
import VideoPlayer from '@/components/video-player';
import { ArrowRight, Video, Calendar, Phone } from 'lucide-react';

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
  }, [navigate]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Auto scroll to booking section
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCalendly = () => {
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

        <section className="py-12 bg-viralDark/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Lo que nuestros clientes dicen
            </h2>
            
            <div className="max-w-3xl mx-auto bg-viralDark/80 border border-gray-800 rounded-lg p-6">
              <p className="text-white/90 italic text-lg mb-4 text-center">
                "Gracias a ViralClicker hemos aumentado nuestras conversiones en un 150% en solo 3 meses."
              </p>
              <p className="text-viralOrange text-center font-semibold">
                - María González, CEO de MarketingPro
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                ¿Por qué elegir ViralClicker?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-viralDark/50 border border-gray-800 rounded-lg p-5">
                  <div className="flex gap-3 mb-3">
                    <div className="bg-viralOrange/20 p-2 rounded">
                      <Phone className="text-viralOrange h-5 w-5" />
                    </div>
                    <h3 className="text-white font-bold">Más contactos</h3>
                  </div>
                  <p className="text-white/70">
                    Aumente significativamente la cantidad de leads cualificados para su negocio.
                  </p>
                </div>
                
                <div className="bg-viralDark/50 border border-gray-800 rounded-lg p-5">
                  <div className="flex gap-3 mb-3">
                    <div className="bg-viralOrange/20 p-2 rounded">
                      <Video className="text-viralOrange h-5 w-5" />
                    </div>
                    <h3 className="text-white font-bold">Videollamadas</h3>
                  </div>
                  <p className="text-white/70">
                    Atención personalizada para cada cliente potencial, aumentando las tasas de conversión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
