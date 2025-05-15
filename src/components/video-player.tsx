
import { useState, useEffect, useRef } from "react";
import ContactModal from "./contact-modal";
import { toast } from "../hooks/use-toast";
import { Button } from "./ui/button";

interface VideoPlayerProps {
  onVideoEnd?: () => void;
}

const VideoPlayer = ({ onVideoEnd }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Facebook video iframe URL from the provided source
  const facebookVideoIframe = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D1838689550042782%26rdid%3DhtBVgSOrCIE9ficL&width=1920&show_text=false&appId=1326995771901998&height=489";

  useEffect(() => {
    // Create timer to show the contact button after 10 seconds
    const contactButtonTimer = setTimeout(() => {
      setShowContactButton(true);
      console.log("Contact button shown after timeout");
      localStorage.setItem("viralclicker_webinar_started", "true");
    }, 10000);
    
    // Create a timer to simulate the end of the video (after 1:20 minutes for demo)
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
    console.error("Facebook iframe error occurred");
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
              src={facebookVideoIframe}
              className="w-full h-full"
              title="Facebook video player"
              frameBorder="0"
              allowFullScreen={true}
              scrolling="no"
              style={{ border: 'none', overflow: 'hidden' }}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              onError={handleIframeError}
            ></iframe>
          </div>
        )}
      </div>
      
      {/* Contact button that appears after 10 seconds - positioned outside the video container for better visibility */}
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
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default VideoPlayer;
