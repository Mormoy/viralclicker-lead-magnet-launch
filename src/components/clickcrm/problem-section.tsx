import { useTranslation } from 'react-i18next';
import { AlertTriangle, Clock, MessageSquareX, FileX } from 'lucide-react';

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
    },
    {
      icon: AlertTriangle,
      title: t('problems.problem4Title'),
      description: t('problems.problem4Desc')
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-900/50 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('problems.title')}
          </h2>
          <p className="text-white/70 text-lg">
            {t('problems.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto landscape-grid">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-colors"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {problem.title}
              </h3>
              <p className="text-white/60 text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-viralOrange font-semibold text-xl">
            {t('problems.solution')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
