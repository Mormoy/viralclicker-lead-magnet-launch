import React, { useState, useEffect } from 'react';

interface AutoTimerProps {
  onComplete: () => void;
  duration?: number; // Duration in seconds, default 60
}

const AutoTimer: React.FC<AutoTimerProps> = ({ onComplete, duration = 60 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (timeLeft === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-40 bg-viralDark/90 backdrop-blur-sm border border-viralOrange/20 rounded-lg px-4 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-viralOrange rounded-full animate-pulse"></div>
        <span className="text-white text-sm font-medium">
          Oferta especial termina en: {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
};

export default AutoTimer;