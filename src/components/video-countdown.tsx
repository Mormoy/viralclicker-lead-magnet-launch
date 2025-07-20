import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface VideoCountdownProps {
  onComplete?: () => void;
  isActive: boolean;
}

const VideoCountdown = ({ onComplete, isActive }: VideoCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [progress, setProgress] = useState(100);
  const [showContactButton, setShowContactButton] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowContactButton(true);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
      
      setProgress((prev) => {
        const newProgress = (timeLeft - 1) / 60 * 100;
        return Math.max(0, newProgress);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onComplete, timeLeft]);


  if (!isActive) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (showContactButton) {
    // Trigger the existing lead form popup
    const handleOpenForm = () => {
      const event = new CustomEvent('openContactForm');
      window.dispatchEvent(event);
    };

    return (
      <div className="flex flex-col items-center justify-center mt-6 bg-gradient-to-br from-viralDark via-viralDark/95 to-viralDark/90 backdrop-blur-sm border-2 border-viralOrange/40 rounded-xl p-8 max-w-md mx-auto shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-white text-xl font-bold mb-2">¡Momento perfecto!</h3>
          <p className="text-white/80 text-sm">Descubre cómo ViralClicker puede transformar tu negocio</p>
        </div>
        
        <Button 
          onClick={handleOpenForm}
          className="bg-gradient-to-r from-viralOrange to-orange-600 hover:from-viralOrange/90 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-orange-400/50"
        >
          <Users className="w-5 h-5 mr-2" />
          Quiero que me contacten
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6 bg-viralDark/90 backdrop-blur-sm border border-viralOrange/30 rounded-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-4">
        <p className="text-white text-sm mb-2">
          🔥 ¡Acceso exclusivo disponible en:
        </p>
        <div className="text-viralOrange font-bold text-lg">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      
      <div className="w-full mb-4">
        <Progress 
          value={progress} 
          className="h-3 bg-viralDark/50 [&>div]:bg-gradient-to-r [&>div]:from-viralOrange [&>div]:to-orange-600 [&>div]:transition-all [&>div]:duration-1000"
        />
      </div>
      
      <p className="text-white/70 text-xs text-center">
        Complete el video para acceder a estrategias exclusivas
      </p>
    </div>
  );
};

export default VideoCountdown;