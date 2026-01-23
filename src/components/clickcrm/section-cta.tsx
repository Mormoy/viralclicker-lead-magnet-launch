import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SectionCTAProps {
  variant?: 'default' | 'subtle';
}

const SectionCTA = ({ variant = 'default' }: SectionCTAProps) => {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27m%20interested%20in%20ViralClicker', '_blank');
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (variant === 'subtle') {
    return (
      <div className="py-8 px-4 bg-gray-900/30">
        <div className="container mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={scrollToContact}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white px-6 py-5"
          >
            {t('cta.bookDemo')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            onClick={handleWhatsApp}
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/20 px-6 py-5"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('cta.chatWhatsApp')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-viralOrange/20 to-viralOrange/5">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          ¿Listo para automatizar tus ventas?
        </h3>
        <p className="text-white/70 mb-6 max-w-xl mx-auto">
          Agenda una demo y te mostramos cómo ViralClicker puede ayudar a tu negocio
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-viralOrange hover:bg-viralOrange/90 text-white px-8 py-6 text-lg"
          >
            {t('cta.bookDemo')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            onClick={handleWhatsApp}
            size="lg"
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/20 px-8 py-6 text-lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {t('cta.chatWhatsApp')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SectionCTA;
