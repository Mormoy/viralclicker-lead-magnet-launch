
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
  
  // Vimeo video ID extracted from the provided link
  const vimeoVideoId = "1084617174/33fa81d0b8";
  
  useEffect(() => {
    // Create timer to show the contact button after 10 seconds
    const contactButtonTimer = setTimeout(() => {
      setShowContactButton(true);
      console.log("Contact button shown after timeout");
      localStorage.setItem("viralclicker_webinar_started", "true");
    }, 10000);
    
    // Create a timer to simulate the end of the video (after 3 minutes)
    const videoEndTimer = setTimeout(() => {
      setIsPlaying(false);
      if (onVideoEnd) {
        onVideoEnd();
        console.log("Video ended");
      }
    }, 80000); // 1:20 minutes for demo purposes
    
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

  // Function to handle errors in the iframe loading
  const handleIframeError = () => {
    console.error("Vimeo iframe error occurred");
    setHasError(true);
    toast({
      title: "Error de video",
      description: "No se pudo cargar el video. Por favor intente de nuevo más tarde.",
      variant: "destructive",
    });
  };
  
  // Create the Vimeo embed URL with parameters
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1&muted=0&controls=0&playsinline=1&background=0&loop=0&transparent=0&app_id=122963&player_id=ViralClickerPlayer&dnt=1`;

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
              src={vimeoEmbedUrl}
              title="Vimeo video player"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onError={handleIframeError}
            ></iframe>
          </div>
        )}
      </div>
      
      {/* Contact button that appears after 10 seconds - positioned outside the video container */}
      {showContactButton && isPlaying && (
        <div className="absolute bottom-6 right-6 z-20">
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
