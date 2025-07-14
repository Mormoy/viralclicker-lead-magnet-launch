import { useState, useEffect, useRef } from "react";
import { toast } from "../hooks/use-toast";
import VideoCountdown from "./video-countdown";

interface VideoPlayerProps {
  onVideoEnd?: () => void;
  onContactRequest?: () => void;
}

const VideoPlayer = ({ onVideoEnd, onContactRequest }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // New Wistia video URL and configuration with autoplay
  const videoIframeUrl = "https://fast.wistia.net/embed/iframe/g6rbgslxog?web_component=true&seo=true&videoFoam=false&autoPlay=true&volume=1";

  // Add script to the document
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://fast.wistia.net/player.js';
    script.async = true;
    document.body.appendChild(script);

    // Start video automatically since autoplay is enabled
    startVideo();

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Function to start video playback
  const startVideo = () => {
    setIsPlaying(true);
    setShowCountdown(true);
    
    localStorage.setItem("viralclicker_webinar_started", "true");
    
    // Create a timer to simulate the end of the video (after 3 minutes for demo)
    setTimeout(() => {
      setIsPlaying(false);
      if (onVideoEnd) {
        onVideoEnd();
        console.log("Video ended");
      }
    }, 126000); // 3 minutes for demo purposes
  };
  
  // Handle countdown completion
  const handleCountdownComplete = () => {
    console.log("Countdown completed - dispatching showBookingSection event");
    window.dispatchEvent(new CustomEvent('showBookingSection'));
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
      
      {/* Countdown Timer */}
      <VideoCountdown 
        isActive={showCountdown} 
        onComplete={handleCountdownComplete}
      />
    </div>
  );
};

export default VideoPlayer;