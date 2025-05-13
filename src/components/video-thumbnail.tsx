
import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type VideoThumbnailProps = {
  onPlay: () => void;
  className?: string;
};

const VideoThumbnail = ({ onPlay, className }: VideoThumbnailProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className={cn("relative cursor-pointer group rounded-lg overflow-hidden shadow-xl", className)}
      onClick={onPlay}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AspectRatio ratio={16/9}>
        <div className="bg-viralDark/50 w-full h-full absolute z-10"></div>
        <img 
          src="/components/Captura de pantalla 2025-05-13 173458.png" 
          alt="Video webinar de ViralClicker" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </AspectRatio>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className={`bg-viralOrange text-white rounded-full p-4 transition-all duration-300 ${isHovering ? 'scale-110 shadow-glow' : 'scale-100'}`}>
          <Play className="h-12 w-12 md:h-16 md:w-16" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full bg-viralDark/80 text-white p-4 z-20">
        <h3 className="text-lg md:text-xl font-bold">Descubra cómo ViralClicker puede impulsar sus ventas</h3>
        <p className="text-white/80 text-sm md:text-base">Webinar exclusivo - 3 minutos</p>
      </div>
    </div>
  );
};

export default VideoThumbnail;
