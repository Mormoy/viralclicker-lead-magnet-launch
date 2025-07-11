
import { useState, useEffect, useRef } from "react";
import { toast } from "../hooks/use-toast";
import { Button } from "./ui/button";

interface VideoPlayerProps {
  onVideoEnd?: () => void;
  onContactRequest?: () => void;
}

const VideoPlayer = ({ onVideoEnd, onContactRequest }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // New Wistia video URL and configuration
  const videoIframeUrl = "https://fast.wistia.net/embed/iframe/oit93w5w4h?web_component=true&seo=true&videoFoam=false";

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
    }, 1000);
    
    // Create a timer to simulate the end of the video (after 3 minutes for demo)
    const videoEndTimer = setTimeout(() => {
      setIsPlaying(false);
      if (onVideoEnd) {
        onVideoEnd();
        console.log("Video ended");
      }
    }, 126000); // 3 minutes for demo purposes
    
    // Create timer to show booking section after 1 minute
    const bookingTimer = setTimeout(() => {
      // Dispatch custom event to show booking section
      window.dispatchEvent(new CustomEvent('showBookingSection'));
    }, 60000); // 1 minute
    
    // Start playback immediately
    setIsPlaying(true);
    
    return () => {
      clearTimeout(contactButtonTimer);
      clearTimeout(videoEndTimer);
      clearTimeout(bookingTimer);
    };
  }, [onVideoEnd]);
  
  const handleContactRequest = () => {
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
    
    // Call the parent's onContactRequest function
    if (onContactRequest) {
      onContactRequest();
    }
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
              allowFullScreen={true}
              scrolling="no"
              name="wistia_embed"
              style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
              onError={handleIframeError}
            />
          </div>
        )}
      </div>
      
      {/* Contact button that appears after 10 seconds */}
      {showContactButton && isPlaying && (
        <div className="absolute bottom-4 right-4 z-15">
          <Button
            onClick={handleContactRequest}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            Quiero que me contacten
          </Button>
        </div>
      )}
      
      
    </div>
  );
};

export default VideoPlayer;
