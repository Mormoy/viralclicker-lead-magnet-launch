import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface VideoCountdownProps {
  onComplete?: () => void;
  isActive: boolean;
}

const VideoCountdown = ({ onComplete, isActive }: VideoCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [progress, setProgress] = useState(100);
  const [showContactButton, setShowContactButton] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "¡Datos enviados correctamente!",
        description: "Gracias por tu interés. Te contactaremos pronto.",
      });
      
      setIsSubmitting(false);
      setShowForm(false);
      setFormData({ name: '', email: '', whatsapp: '' });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isActive) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (showContactButton) {
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-6 bg-viralDark/90 backdrop-blur-sm border border-viralOrange/30 rounded-lg p-6 max-w-md mx-auto">
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Que me contacten
          </Button>
        </div>

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-[425px] bg-viralDark border-viralOrange/30">
            <DialogHeader>
              <DialogTitle className="text-white text-center">
                ¿Listo para potenciar tu negocio?
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo"
                  required
                  className="bg-viralDark/50 border-viralOrange/30 text-white placeholder:text-white/60"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  required
                  className="bg-viralDark/50 border-viralOrange/30 text-white placeholder:text-white/60"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-white">
                  WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                  required
                  className="bg-viralDark/50 border-viralOrange/30 text-white placeholder:text-white/60"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-3 transition-all duration-300"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar datos'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
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