
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
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Facebook video URL - using the existing one from the component
  const facebookVideoUrl = "https://www.facebook.com/share/v/161ALrK1s6/";

  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      // Check if SDK is already loaded
      if (document.getElementById('facebook-jssdk')) {
        setSdkLoaded(true);
        return;
      }
      
      // Create script element
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      
      // Add onload event
      script.onload = () => {
        console.log('Facebook SDK loaded');
        setSdkLoaded(true);
        
        // Parse XFBML after SDK is loaded
        if (window.FB) {
          window.FB.XFBML.parse(videoContainerRef.current);
        }
      };
      
      // Add error event
      script.onerror = () => {
        console.error('Failed to load Facebook SDK');
        setHasError(true);
        toast({
          title: "Error de video",
          description: "No se pudo cargar el SDK de Facebook. Por favor intente de nuevo más tarde.",
          variant: "destructive",
        });
      };
      
      // Insert script before first script tag
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
      
      // Add div#fb-root if it doesn't exist
      if (!document.getElementById('fb-root')) {
        const fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';
        document.body.appendChild(fbRoot);
      }
    };
    
    loadFacebookSDK();
    
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
  
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="w-full aspect-video rounded-lg shadow-lg overflow-hidden bg-black" ref={videoContainerRef}>
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-viralDark text-white">
            <p>No se pudo cargar el video. Por favor intente de nuevo más tarde.</p>
          </div>
        ) : (
          <div className="fb-video" 
            data-href={facebookVideoUrl}
            data-width="100%" 
            data-height="auto"
            data-autoplay="true"
            data-allowfullscreen="false"
            data-show-text="false"
            data-show-captions="false">
            <div className="fb-xfbml-parse-ignore">
              <blockquote cite={facebookVideoUrl}>
                <a href={facebookVideoUrl}>Video de ViralClicker</a>
              </blockquote>
            </div>
          </div>
        )}
      </div>
      
      {/* Contact button that appears after 10 seconds - positioned outside the video container */}
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

// Add the FB namespace for TypeScript
declare global {
  interface Window {
    FB: {
      XFBML: {
        parse: (element?: HTMLElement | null) => void;
      };
    };
  }
}

export default VideoPlayer;
