
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
  
  // Define a proper video URL that will work
 // const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // Standard example video
  const videoUrl = "https://drive.google.com/file/d/1LZUX2f7FWw7Ks0dAZcw65Zb-g6QTUB04/view";
 // const videoUrl = "https://www.youtube.com/watch?v=eKHL93PYDO4";
  
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
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('canplay', handleCanPlay);
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
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoUrl}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          preload="auto"
        />
      </div>
      
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
