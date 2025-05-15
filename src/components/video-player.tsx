
import { useState, useEffect } from "react";
import ContactModal from "./contact-modal";
import { toast } from "../hooks/use-toast";

interface VideoPlayerProps {
  onVideoEnd?: () => void;
}

const VideoPlayer = ({ onVideoEnd }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // YouTube video ID para un video de ejemplo
  const youtubeVideoId = "eKHL93PYDO4";
  
  useEffect(() => {
    // Crear un temporizador para mostrar el botón de contacto después de 10 segundos
    const contactButtonTimer = setTimeout(() => {
      setShowContactButton(true);
      console.log("Contact button shown after timeout");
      localStorage.setItem("viralclicker_webinar_started", "true");
    }, 10000);
    
    // Crear un temporizador para simular el fin del video (después de 3 minutos)
    const videoEndTimer = setTimeout(() => {
      setIsPlaying(false);
      if (onVideoEnd) {
        onVideoEnd();
        console.log("Video ended");
      }
    }, 180000); // 3 minutos
    
    // Iniciar la reproducción inmediatamente
    setIsPlaying(true);
    
    return () => {
      clearTimeout(contactButtonTimer);
      clearTimeout(videoEndTimer);
    };
  }, [onVideoEnd]);
  
  const handleContactRequest = () => {
    setIsModalOpen(true);
    console.log("Contact request button clicked");
    // Track contact request
    localStorage.setItem("viralclicker_contact_requested", "true");
    
    // Update lead data with contact request info
    const savedLead = localStorage.getItem("viralclicker_lead");
    if (savedLead) {
      const leadData = JSON.parse(savedLead);
      const metrics = leadData.metrics || {};
      localStorage.setItem("viralclicker_lead", JSON.stringify({
        ...leadData,
        metrics: {
          ...metrics,
          contactRequested: true,
          contactRequestTime: new Date().toISOString()
        }
      }));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar errores en la carga del iframe
  const handleIframeError = () => {
    console.error("YouTube iframe error occurred");
    setHasError(true);
    toast({
      title: "Error de video",
      description: "No se pudo cargar el video. Por favor intente de nuevo más tarde.",
      variant: "destructive",
    });
  };

  // Crear la URL del embed de YouTube con autoplay, sin controles y con volumen activado
  // Parámetros adicionales para bloquear completamente interacciones:
  // - disablekb=1: Desactiva los controles del teclado
  // - iv_load_policy=3: Oculta las anotaciones
  // - fs=0: Desactiva el botón de pantalla completa
  // - playsinline=1: Reproduce en línea (no en pantalla completa en móviles)
  // - rel=0: No muestra videos relacionados al final
  // - modestbranding=1: Oculta el logo de YouTube
  // - disablekb=1: Deshabilita los controles de teclado
  // - mute=0: Asegura audio activo
  // - showinfo=0: Oculta la información del video
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&iv_load_policy=3&fs=0&playsinline=1&mute=0&origin=${encodeURIComponent(window.location.origin)}`;

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="w-full aspect-video rounded-lg shadow-lg overflow-hidden bg-black">
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-viralDark text-white">
            <p>No se pudo cargar el video. Por favor intente de nuevo más tarde.</p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <iframe
              className="w-full h-full"
              src={youtubeEmbedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={handleIframeError}
            ></iframe>
            {/* Overlay transparente para bloquear completamente la interacción con el iframe */}
            <div className="absolute inset-0 z-10" style={{ pointerEvents: 'auto' }}></div>
          </div>
        )}
      </div>
      
      {showContactButton && isPlaying && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleContactRequest}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            Quiero que me contacten
          </button>
        </div>
      )}
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default VideoPlayer;
