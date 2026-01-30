import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';

const FaqSection = () => {
  const { t } = useTranslation();

  const faqs = [
    { key: 'item-0', question: t('faq.q1'), answer: t('faq.a1') },
    { key: 'item-1', question: t('faq.q2'), answer: t('faq.a2') },
    { key: 'item-2', question: t('faq.q3'), answer: t('faq.a3') },
    { key: 'item-3', question: t('faq.q4'), answer: t('faq.a4') },
    { key: 'item-4', question: t('faq.q5'), answer: t('faq.a5') },
    { key: 'item-5', question: t('faq.q6'), answer: t('faq.a6') },
    { key: 'item-6', question: t('faq.q7'), answer: t('faq.a7') },
    { key: 'item-7', question: t('faq.q8'), answer: t('faq.a8') },
    { key: 'item-8', question: t('faq.q9'), answer: t('faq.a9') },
    { key: 'item-9', question: t('faq.q10'), answer: t('faq.a10') }
  ];

  // Preguntas expandidas por defecto: costos (item-1) y WhatsApp API (item-0)
  const defaultExpanded = ['item-0', 'item-1'];

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%20have%20a%20question%20about%20ViralClicker', '_blank');
  };

  const handleBookDemo = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-900/50 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {t('faq.title')}
            </h2>
            <p className="text-white/60">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* Instruction line - diferente para mobile y desktop */}
          <p className="text-white/50 text-sm text-center mb-6 flex items-center justify-center gap-2">
            <span className="hidden md:inline">{t('faq.instructionDesktop')}</span>
            <span className="md:hidden">{t('faq.instructionMobile')}</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </p>

          {/* Accordion con múltiples items expandidos */}
          <Accordion 
            type="multiple" 
            defaultValue={defaultExpanded} 
            className="space-y-3"
          >
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.key} 
                value={faq.key}
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-5 data-[state=open]:border-viralOrange/50 transition-colors"
              >
                <AccordionTrigger className="text-white hover:text-viralOrange text-left py-5 text-base font-medium [&[data-state=open]>svg]:rotate-180 gap-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-5 pt-0 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA Block mejorado */}
          <div className="mt-12 p-8 bg-gray-800/30 border border-gray-700 rounded-xl text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
              {t('faq.ctaTitle')}
            </h3>
            <p className="text-white/60 mb-6 text-sm">
              {t('faq.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-5 text-base"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('cta.chatWhatsApp')}
              </Button>
              <Button 
                onClick={handleBookDemo}
                variant="outline"
                className="border-viralOrange/50 text-viralOrange hover:bg-viralOrange/10 px-6 py-5 text-base"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {t('cta.bookDemo')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
