import { Calendar } from 'lucide-react';

const FloatingDemoButton = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToContact}
      className="fixed bottom-24 right-6 z-40 bg-viralOrange hover:bg-viralOrange/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
      aria-label="Agendar demo"
    >
      <Calendar className="w-5 h-5" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-medium">
        Agendar demo
      </span>
    </button>
  );
};

export default FloatingDemoButton;
