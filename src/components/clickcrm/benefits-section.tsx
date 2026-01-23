import { useTranslation } from 'react-i18next';
import { Link, TrendingUp, Clock, Percent, MessageCircle, BarChart3 } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

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
      icon: BarChart3,
      title: t('benefits.benefit4Title'),
      description: t('benefits.benefit4Desc')
    },
    {
      icon: TrendingUp,
      title: t('benefits.benefit5Title'),
      description: t('benefits.benefit5Desc')
    },
    {
      icon: Clock,
      title: t('benefits.benefit6Title'),
      description: t('benefits.benefit6Desc')
    }
  ];

  const BenefitCard = ({ benefit }: { benefit: typeof benefits[0] }) => (
    <div 
      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 border border-gray-700 hover:border-viralOrange/50 transition-all hover:transform hover:scale-105 h-full"
    >
      <div className="w-12 h-12 bg-viralOrange/20 rounded-lg flex items-center justify-center mb-4">
        <benefit.icon className="w-6 h-6 text-viralOrange" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">
        {benefit.title}
      </h3>
      <p className="text-white/60 text-sm">
        {benefit.description}
      </p>
    </div>
  );

  return (
    <section className="py-16 px-4 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-white/70 text-lg">
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel className="max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </MobileCarousel>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto landscape-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
