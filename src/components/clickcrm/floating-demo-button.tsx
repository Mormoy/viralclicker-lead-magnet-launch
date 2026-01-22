import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';

const FloatingDemoButton = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToContact}
      className="fixed bottom-24 right-6 z-40 bg-viralOrange hover:bg-viralOrange/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
      aria-label={t('cta.bookDemo')}
    >
      <Calendar className="w-5 h-5" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-medium">
        {t('cta.bookDemo')}
      </span>
    </button>
  );
};

export default FloatingDemoButton;
