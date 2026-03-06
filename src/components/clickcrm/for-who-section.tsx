import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ForWhoSection = () => {
  const { t } = useTranslation();

  const industries = [
    t('audience.ideal1'),
    t('audience.ideal2'),
    t('audience.ideal3'),
    t('audience.ideal4'),
    t('audience.ideal5'),
  ];

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {t('audience.title')}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((industry, index) => (
            <span key={index} className="flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 text-white/80 text-sm px-4 py-2.5 rounded-full">
              <CheckCircle className="w-4 h-4 text-viralOrange" />
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
