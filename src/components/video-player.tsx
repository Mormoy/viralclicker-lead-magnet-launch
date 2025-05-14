
import { useState, useRef, useEffect } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // High resolution video from a reliable source (Pexels)
  const videoUrl = "https://www.youtube.com/watch?v=eKHL93PYDO4";
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      if (onVideoEnd) onVideoEnd();
      console.log("Video ended");
    };

    const handleTimeUpdate = () => {
      // Show contact button after 10 seconds of video playback
      if (video.currentTime > 10 && !showContactButton) {
        setShowContactButton(true);
        console.log("Contact button shown at:", video.currentTime);
        // Track that webinar started
        localStorage.setItem("viralclicker_webinar_started", "true");
      }
    };

    const handleCanPlay = () => {
      console.log("Video can play now");
      // Try to autoplay when video can play
      video.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Autoplay successful");
        })
        .catch(error => {
          console.error("Autoplay prevented:", error);
          setIsPlaying(false);
          toast({
            title: "Autoplay bloqueado",
            description: "Por favor haga clic para reproducir el video",
            variant: "destructive",
          });
        });
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setHasError(true);
      toast({
        title: "Error de video",
        description: "No se pudo cargar el video. Por favor intente de nuevo más tarde.",
        variant: "destructive",
      });
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [onVideoEnd, showContactButton]);

  const togglePlay = () => {
    console.log("Toggle play clicked");
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Video playing successfully");
          })
          .catch(error => {
            // Auto-play was prevented
            setIsPlaying(false);
            console.error("Play prevented:", error);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
      console.log("Video paused");
    }
  };

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
      <div className="w-full aspect-video rounded-lg shadow-lg overflow-hidden bg-black">
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-viralDark text-white">
            <p>No se pudo cargar el video. Por favor intente de nuevo más tarde.</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={videoUrl}
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            preload="auto"
            muted
          />
        )}
      </div>
      
      {!isPlaying && !hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer rounded-lg"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 bg-viralOrange rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
          </div>
        </div>
      )}
      
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
