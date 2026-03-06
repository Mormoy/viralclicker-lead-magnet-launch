import { useTranslation } from 'react-i18next';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    { number: 1, title: t('howItWorks.step1Title', { defaultValue: 'Customer uses the Smart Quote Builder' }), description: t('howItWorks.step1Desc', { defaultValue: 'Your customer visits a page and selects exactly what they need.' }) },
    { number: 2, title: t('howItWorks.step2Title', { defaultValue: 'A quote is generated instantly' }), description: t('howItWorks.step2Desc', { defaultValue: 'They receive a personalized quote in seconds.' }) },
    { number: 3, title: t('howItWorks.step3Title', { defaultValue: 'The lead enters your CRM pipeline' }), description: t('howItWorks.step3Desc', { defaultValue: 'Every quote is automatically tracked with all the details.' }) },
    { number: 4, title: t('howItWorks.step4Title', { defaultValue: 'You close the deal through WhatsApp' }), description: t('howItWorks.step4Desc', { defaultValue: 'Send follow-ups, reminders and close directly from the CRM.' }) },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-16 px-4 bg-gray-900/30">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          {t('nav.howItWorks')}
        </h2>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/40 border border-gray-700/50">
              <div className="w-10 h-10 bg-viralOrange rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {step.number}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
