
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset to 24hrs when done
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <div className="bg-white/20 rounded p-1 px-2 min-w-[40px] text-center">
        <span className="text-white font-bold text-sm md:text-base">{formatTime(timeLeft.hours)}</span>
      </div>
      <span className="text-white font-bold text-sm md:text-base">:</span>
      <div className="bg-white/20 rounded p-1 px-2 min-w-[40px] text-center">
        <span className="text-white font-bold text-sm md:text-base">{formatTime(timeLeft.minutes)}</span>
      </div>
      <span className="text-white font-bold text-sm md:text-base">:</span>
      <div className="bg-white/20 rounded p-1 px-2 min-w-[40px] text-center">
        <span className="text-white font-bold text-sm md:text-base">{formatTime(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
