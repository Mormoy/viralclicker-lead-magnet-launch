import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface VideoCountdownProps {
  onComplete?: () => void;
  isActive: boolean;
}

const VideoCountdown = ({ onComplete, isActive }: VideoCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center mt-4 bg-viralDark/80 backdrop-blur-sm border border-viralOrange/30 rounded-lg p-4">
      <div className="flex items-center gap-2 text-white">
        <Clock className="w-5 h-5 text-viralOrange" />
        <span className="text-lg font-semibold">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default VideoCountdown;