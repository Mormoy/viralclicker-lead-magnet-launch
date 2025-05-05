
import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  onVideoEnd?: () => void;
}

const VideoPlayer = ({ onVideoEnd }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // For demo purposes, using a placeholder video. In production, replace with your actual webinar video
  const videoSrc = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      if (onVideoEnd) onVideoEnd();
    };

    video.addEventListener('ended', handleEnded);
    
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
    };
  }, [onVideoEnd]);

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
    </div>
  );
};

export default VideoPlayer;
