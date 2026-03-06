import { MessageCircleWarning, FileQuestion, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProblemSection = () => {
  const { t } = useTranslation();

  const problems = [
    {
      icon: Clock,
      title: t('problems.problem1Title'),
      text: t('problems.problem1Desc'),
      emoji: '⏳',
    },
    {
      icon: FileQuestion,
      title: t('problems.problem2Title'),
      text: t('problems.problem2Desc'),
      emoji: '📋',
    },
    {
      icon: MessageCircleWarning,
      title: t('problems.problem3Title'),
      text: t('problems.problem3Desc'),
      emoji: '💬',
    },
  ];

  return (
    <section className="py-14 md:py-20 px-4 bg-gray-900/40">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {t('problems.title')}
        </h2>
        <p className="text-white/50 text-sm mb-10 max-w-lg mx-auto">
          {t('problems.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-gradient-to-b from-gray-800/60 to-gray-900/80 border border-red-500/10 hover:border-red-500/30 p-6 text-center transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-3xl mb-3">{problem.emoji}</div>
              <h3 className="text-white font-semibold text-base mb-2">
                {problem.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {problem.text}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/40 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <p className="text-viralOrange font-medium text-sm mt-8">
          {t('problems.solution')}
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
