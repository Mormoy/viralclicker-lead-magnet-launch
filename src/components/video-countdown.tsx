import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Logo from './logo';
import { Users, Zap, Target, Shield } from 'lucide-react';

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
        <div className="flex flex-col items-center justify-center mt-6 bg-gradient-to-br from-viralDark via-viralDark/95 to-viralDark/90 backdrop-blur-sm border-2 border-viralOrange/40 rounded-xl p-8 max-w-md mx-auto shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-white text-xl font-bold mb-2">¡Momento perfecto!</h3>
            <p className="text-white/80 text-sm">Descubre cómo ViralClicker puede transformar tu negocio</p>
          </div>
          
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-viralOrange to-orange-600 hover:from-viralOrange/90 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-orange-400/50"
          >
            <Users className="w-5 h-5 mr-2" />
            Quiero que me contacten
          </Button>
        </div>

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-viralDark via-viralDark/95 to-viralDark/90 border-2 border-viralOrange/40 shadow-2xl">
            <DialogHeader className="text-center space-y-4">
              <div className="flex justify-center mb-2">
                <Logo className="h-12" />
              </div>
              <DialogTitle className="text-white text-2xl font-bold">
                ¡Transforma tu negocio con ViralClicker!
              </DialogTitle>
              <DialogDescription className="text-white/80 text-base">
                Únete a miles de emprendedores que ya están multiplicando sus ventas con nuestro sistema automatizado de generación de leads
              </DialogDescription>
            </DialogHeader>
            
            {/* Benefits section */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="flex items-center space-x-3 bg-viralDark/30 p-3 rounded-lg border border-viralOrange/20">
                <Shield className="w-5 h-5 text-viralOrange" />
                <span className="text-white text-sm">Sistema probado</span>
              </div>
              <div className="flex items-center space-x-3 bg-viralDark/30 p-3 rounded-lg border border-viralOrange/20">
                <Zap className="w-5 h-5 text-viralOrange" />
                <span className="text-white text-sm">100% automatizado</span>
              </div>
              <div className="flex items-center space-x-3 bg-viralDark/30 p-3 rounded-lg border border-viralOrange/20">
                <Target className="w-5 h-5 text-viralOrange" />
                <span className="text-white text-sm">Leads de calidad</span>
              </div>
              <div className="flex items-center space-x-3 bg-viralDark/30 p-3 rounded-lg border border-viralOrange/20">
                <Users className="w-5 h-5 text-viralOrange" />
                <span className="text-white text-sm">Soporte 24/7</span>
              </div>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu nombre completo"
                  required
                  className="bg-viralDark/50 border-viralOrange/40 text-white placeholder:text-white/60 focus:border-viralOrange transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Correo electrónico *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  required
                  className="bg-viralDark/50 border-viralOrange/40 text-white placeholder:text-white/60 focus:border-viralOrange transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-white font-medium">
                  WhatsApp *
                </Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                  required
                  className="bg-viralDark/50 border-viralOrange/40 text-white placeholder:text-white/60 focus:border-viralOrange transition-colors"
                />
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-viralOrange to-orange-600 hover:from-viralOrange/90 hover:to-orange-700 text-white font-bold py-4 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  {isSubmitting ? 'Enviando...' : '🚀 Obtener acceso exclusivo'}
                </Button>
              </div>
              
              <p className="text-white/60 text-xs text-center mt-4">
                Al enviar tus datos, aceptas ser contactado por nuestro equipo de ViralClicker para ofrecerte una demostración personalizada.
              </p>
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