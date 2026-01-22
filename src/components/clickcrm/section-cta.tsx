import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle } from 'lucide-react';

interface SectionCTAProps {
  variant?: 'default' | 'subtle';
}

const SectionCTA = ({ variant = 'default' }: SectionCTAProps) => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27m%20interested%20in%20ClickCRM', '_blank');
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (variant === 'subtle') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
        <button 
          onClick={scrollToContact}
          className="text-viralOrange hover:underline text-sm font-medium flex items-center justify-center gap-1"
        >
          <Calendar className="w-4 h-4" />
          Book a demo
        </button>
        <span className="hidden sm:block text-white/30">|</span>
        <button 
          onClick={handleWhatsApp}
          className="text-green-500 hover:underline text-sm font-medium flex items-center justify-center gap-1"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center py-8">
      <Button 
        onClick={scrollToContact}
        size="lg"
        className="bg-viralOrange hover:bg-viralOrange/90 text-white font-semibold"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Book a demo
      </Button>
      <Button 
        onClick={handleWhatsApp}
        size="lg"
        variant="outline"
        className="border-green-600 text-green-500 hover:bg-green-600/10"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Chat on WhatsApp
      </Button>
    </div>
  );
};

export default SectionCTA;
