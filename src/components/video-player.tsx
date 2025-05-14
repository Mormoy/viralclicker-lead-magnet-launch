
import { useState, useRef, useEffect } from "react";
import ContactModal from "./contact-modal";

interface VideoPlayerProps {
  onVideoEnd?: () => void;
}

const VideoPlayer = ({ onVideoEnd }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // For demo purposes, using a placeholder video. In production, replace with your actual webinar video
  const videoSrc = "https://drive.google.com/file/d/1LZUX2f7FWw7Ks0dAZcw65Zb-g6QTUB04/view?usp=sharing";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      if (onVideoEnd) onVideoEnd();
    };

    const handleTimeUpdate = () => {
      // Show contact button after 5 seconds of video playback
      if (video.currentTime > 5 && !showContactButton) {
        setShowContactButton(true);
        // Track that webinar started
        localStorage.setItem("viralclicker_webinar_started", "true");
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    // Auto-play functionality
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          // Auto-play was prevented, show play button
          setIsPlaying(false);
          console.log("Autoplay prevented:", error);
        });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onVideoEnd, showContactButton]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleContactRequest = () => {
    setIsModalOpen(true);
    // Track contact request
    localStorage.setItem("viralclicker_contact_requested", "true");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <video
        ref={videoRef}
        className="w-full rounded-lg shadow-lg"
        src={videoSrc}
        controls={false}
        playsInline
      />
      
      {!isPlaying && (
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
