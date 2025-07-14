import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExclusiveAccessProps {
  onFormSubmit?: (data: { name: string; email: string; whatsapp: string }) => void;
}

const ExclusiveAccess = ({ onFormSubmit }: ExclusiveAccessProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit?.(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-8"
    >
      <div className="bg-gradient-to-b from-viralDark/90 to-viralDark border border-viralOrange/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-viralOrange/20 rounded-full p-4">
              <Star className="w-8 h-8 text-viralOrange" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🟢 ¡Acceso exclusivo disponible ahora!
          </h2>
          
          <p className="text-white/80 text-lg mb-6">
            Complete sus datos para recibir estrategias personalizadas y acceso a nuestro sistema de automatización.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-viralOrange">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Estrategias personalizadas</span>
            </div>
            <div className="flex items-center gap-2 text-viralOrange">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Acceso inmediato</span>
            </div>
            <div className="flex items-center gap-2 text-viralOrange">
              <Users className="w-5 h-5" />
              <span className="text-sm">Soporte experto</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-white font-medium mb-2 block">
              Nombre completo *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Ingrese su nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-viralDark/50 border-viralOrange/30 text-white placeholder-white/60 focus:border-viralOrange focus:ring-viralOrange/20 h-12"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-white font-medium mb-2 block">
              Email corporativo *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@empresa.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-viralDark/50 border-viralOrange/30 text-white placeholder-white/60 focus:border-viralOrange focus:ring-viralOrange/20 h-12"
            />
          </div>
          
          <div>
            <Label htmlFor="whatsapp" className="text-white font-medium mb-2 block">
              WhatsApp *
            </Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className="bg-viralDark/50 border-viralOrange/30 text-white placeholder-white/60 focus:border-viralOrange focus:ring-viralOrange/20 h-12"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 h-14 text-lg"
          >
            🚀 ¡Quiero acceso inmediato!
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            🔒 Tus datos están protegidos. No compartimos información personal.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExclusiveAccess;