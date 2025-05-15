import { useState, useEffect, useRef } from "react";
import ContactModal from "./contact-modal";
import { toast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

interface VideoPlayerProps {
  onVideoEnd?: () => void;
}

const VideoPlayer = ({ onVideoEnd }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);
  const [showCalendlyButton, setShowCalendlyButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // New Wistia video URL and configuration
  const videoIframeUrl = "https://fast.wistia.net/embed/iframe/oit93w5w4h?web_component=true&seo=true&videoFoam=false";
  const calendlyUrl = "https://calendly.com/moromoyllc";

  // Add script to the document
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://fast.wistia.net/player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Create timer to show the contact button after 10 seconds
    const contactButtonTimer = setTimeout(() => {
      setShowContactButton(true);
      console.log("Contact button shown after timeout");
      localStorage.setItem("viralclicker_webinar_started", "true");
    }, 10000);
    
    // Create a timer to simulate the end of the video (after 3 minutes for demo)
    const videoEndTimer = setTimeout(() => {
      setIsPlaying(false);
      setShowCalendlyButton(true);
      if (onVideoEnd) {
        onVideoEnd();
        console.log("Video ended");
      }
    }, 180000); // 3 minutes for demo purposes
    
    // Start playback immediately
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
  
  // Function to handle errors in the iframe loading
  const handleIframeError = () => {
    console.error("Video iframe error occurred");
    setHasError(true);
    toast({
      title: "Error de video",
      description: "No se pudo cargar el video. Por favor intente de nuevo más tarde.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="w-full aspect-video rounded-lg shadow-lg overflow-hidden bg-black" ref={videoContainerRef}>
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-viralDark text-white">
            <p>No se pudo cargar el video. Por favor intente de nuevo más tarde.</p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <iframe
              src={videoIframeUrl}
              className="wistia_embed"
              title="NAIROK_GEN_VIRALCLICKER Video"
              frameBorder="0"
              width="1920px"
              height="1280px"
              allow="autoplay; fullscreen"
              allowFullScreen
              scrolling="no"
              name="wistia_embed"
              allowTransparency="true"
              style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
              onError={handleIframeError}
            ></iframe>
          </div>
        )}
      </div>
      
      {/* Contact button that appears after 10 seconds */}
      {showContactButton && isPlaying && (
        <div className="absolute bottom-6 right-6 z-20">
          <Button
            onClick={handleContactRequest}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            Quiero que me contacten
          </Button>
        </div>
      )}
      
      {/* Schedule video call button that appears after video ends */}
      {showCalendlyButton && (
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
          <Button
            onClick={openCalendlyModal}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 shadow-lg transition-all transform hover:scale-105"
          >
            <Calendar className="h-5 w-5" />
            <span>Quiero agendar una videollamada</span>
          </Button>
        </div>
      )}
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default VideoPlayer;
