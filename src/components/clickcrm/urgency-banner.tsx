import { useState, useEffect } from 'react';
import { Clock, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UrgencyBannerProps {
  variant?: 'full' | 'compact' | 'floating';
  showButton?: boolean;
}

const UrgencyBanner = ({ variant = 'full', showButton = true }: UrgencyBannerProps) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Get stored end time or create new one
    const storedEndTime = localStorage.getItem('viralclicker_offer_end');
    let endTime: number;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime);
    } else {
      // Set 24 hours from now
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('viralclicker_offer_end', endTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        // Reset timer for demo purposes
        const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('viralclicker_offer_end', newEndTime.toString());
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
      
      // Calculate progress (starts at 100%, decreases to 0% over 24 hours)
      const totalDuration = 24 * 60 * 60 * 1000;
      const elapsed = totalDuration - diff;
      const progressPercent = Math.max(0, 100 - (elapsed / totalDuration) * 100);
      setProgress(progressPercent);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 z-40 animate-bounce-slow">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-4 shadow-2xl border border-red-400/50">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="text-white font-bold text-sm">¡ÚLTIMAS HORAS!</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              <div className="bg-black/30 rounded px-2 py-1">
                <span className="text-white font-mono font-bold text-lg">{formatNumber(timeLeft.hours)}</span>
              </div>
              <span className="text-white font-bold">:</span>
              <div className="bg-black/30 rounded px-2 py-1">
                <span className="text-white font-mono font-bold text-lg">{formatNumber(timeLeft.minutes)}</span>
              </div>
              <span className="text-white font-bold">:</span>
              <div className="bg-black/30 rounded px-2 py-1">
                <span className="text-white font-mono font-bold text-lg">{formatNumber(timeLeft.seconds)}</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleCTA}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold"
          >
            <Zap className="w-4 h-4 mr-1" />
            ¡COMPRAR AHORA!
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-red-600/90 to-orange-500/90 py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="text-white font-semibold text-sm">
              Oferta termina en:
            </span>
            <div className="flex gap-1 items-center">
              <span className="bg-black/30 text-white font-mono font-bold px-2 py-0.5 rounded">
                {formatNumber(timeLeft.hours)}h
              </span>
              <span className="bg-black/30 text-white font-mono font-bold px-2 py-0.5 rounded">
                {formatNumber(timeLeft.minutes)}m
              </span>
              <span className="bg-black/30 text-white font-mono font-bold px-2 py-0.5 rounded">
                {formatNumber(timeLeft.seconds)}s
              </span>
            </div>
          </div>
          {showButton && (
            <Button 
              onClick={handleCTA}
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold"
            >
              <Zap className="w-4 h-4 mr-1" />
              Aprovechar ahora
            </Button>
          )}
        </div>
        {/* Progress bar */}
        <div className="container mx-auto mt-2">
          <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all duration-1000 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-yellow-200 text-xs text-center mt-1">
            ⚡ Solo quedan {Math.round(progress)}% de los cupos disponibles
          </p>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-500 py-4 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.3),_transparent_50%)] animate-pulse" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 rounded-full p-2 animate-bounce">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-yellow-300 text-xs font-semibold uppercase tracking-wider">
                🔥 Oferta por tiempo limitado 🔥
              </p>
              <p className="text-white font-bold text-lg md:text-xl">
                Setup GRATIS + 30% OFF primer mes
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm hidden md:block">Termina en:</span>
            <div className="flex gap-1">
              <div className="bg-black/40 rounded-lg px-3 py-2 text-center min-w-[50px]">
                <span className="text-white font-mono font-bold text-2xl block">{formatNumber(timeLeft.hours)}</span>
                <span className="text-white/60 text-xs">hrs</span>
              </div>
              <span className="text-white font-bold text-2xl self-center">:</span>
              <div className="bg-black/40 rounded-lg px-3 py-2 text-center min-w-[50px]">
                <span className="text-white font-mono font-bold text-2xl block">{formatNumber(timeLeft.minutes)}</span>
                <span className="text-white/60 text-xs">min</span>
              </div>
              <span className="text-white font-bold text-2xl self-center">:</span>
              <div className="bg-black/40 rounded-lg px-3 py-2 text-center min-w-[50px]">
                <span className="text-white font-mono font-bold text-2xl block">{formatNumber(timeLeft.seconds)}</span>
                <span className="text-white/60 text-xs">seg</span>
              </div>
            </div>
          </div>

          {showButton && (
            <Button 
              onClick={handleCTA}
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg hover:shadow-yellow-400/50 transition-all animate-pulse"
            >
              <Zap className="w-5 h-5 mr-2" />
              ¡QUIERO MI DESCUENTO!
            </Button>
          )}
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-4">
          <div className="flex items-center justify-between text-xs text-white/80 mb-1">
            <span>⚡ Cupos limitados</span>
            <span>{Math.round(progress)}% disponible</span>
          </div>
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 transition-all duration-1000 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;