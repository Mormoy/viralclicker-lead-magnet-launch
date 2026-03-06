import { FileText, Kanban, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SolutionSection = () => {
  const { t } = useTranslation();

  const solutions = [
    { icon: FileText, title: t('benefits.benefit1Title'), description: t('benefits.benefit1Desc') },
    { icon: Kanban, title: t('demo.card2Title'), description: t('demo.card2Desc') },
    { icon: MessageCircle, title: t('benefits.benefit5Title'), description: t('benefits.benefit5Desc') },
  ];

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          {t('benefits.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-gray-800/40 border border-gray-700/50">
              <div className="w-12 h-12 bg-viralOrange/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-viralOrange" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
