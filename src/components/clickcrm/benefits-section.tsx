import { useTranslation } from 'react-i18next';
import { Link, Percent, MessageCircle, Clock } from 'lucide-react';

const BenefitsSection = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Link,
      title: t('benefits.benefit1Title'),
      description: t('benefits.benefit1Desc')
    },
    {
      icon: Percent,
      title: t('benefits.benefit2Title'),
      description: t('benefits.benefit2Desc')
    },
    {
      icon: MessageCircle,
      title: t('benefits.benefit3Title'),
      description: t('benefits.benefit3Desc')
    },
    {
      icon: Clock,
      title: t('benefits.benefit6Title'),
      description: t('benefits.benefit6Desc')
    }
  ];

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t('benefits.title')}
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 md:p-5 rounded-xl bg-gray-800/30 border border-gray-700/50"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-viralOrange/15 rounded-lg flex items-center justify-center">
                <benefit.icon className="w-5 h-5 text-viralOrange" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-medium text-sm md:text-base mb-1">
                  {benefit.title}
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
