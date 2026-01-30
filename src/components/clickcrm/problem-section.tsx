import { useTranslation } from 'react-i18next';
import { Clock, FileX, MessageSquareX } from 'lucide-react';

const ProblemSection = () => {
  const { t } = useTranslation();

  const problems = [
    {
      icon: Clock,
      title: t('problems.problem1Title'),
      description: t('problems.problem1Desc')
    },
    {
      icon: FileX,
      title: t('problems.problem2Title'),
      description: t('problems.problem2Desc')
    },
    {
      icon: MessageSquareX,
      title: t('problems.problem3Title'),
      description: t('problems.problem3Desc')
    }
  ];

  return (
    <section className="py-12 md:py-16 px-4 landscape-padding">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t('problems.title')}
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            {t('problems.subtitle')}
          </p>
        </div>

        {/* Simple 3-column grid - always visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 md:p-5 rounded-xl bg-gray-800/30 border border-gray-700/50"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-red-500/15 rounded-lg flex items-center justify-center">
                <problem.icon className="w-5 h-5 text-red-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-medium text-sm md:text-base mb-1">
                  {problem.title}
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Solution CTA */}
        <div className="text-center mt-8">
          <p className="text-viralOrange font-medium text-base md:text-lg">
            {t('problems.solution')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
