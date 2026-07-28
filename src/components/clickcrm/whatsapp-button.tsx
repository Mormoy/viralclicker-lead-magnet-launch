import { MessageCircle } from 'lucide-react';
import { waLink } from '@/config/site';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open(waLink('Hola, quiero saber más de ViralClicker.'), '_blank', 'noopener');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
      aria-label="Talk on WhatsApp"
      data-cta="whatsapp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
