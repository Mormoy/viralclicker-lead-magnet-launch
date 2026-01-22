import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { MessageCircle, Play, LayoutDashboard, FileText, BarChart3, Kanban, TrendingUp } from 'lucide-react';

const DemoSection = () => {
  const { t } = useTranslation();

  const screenshots = [
    {
      icon: FileText,
      badge: t('demo.card1Badge'),
      title: t('demo.card1Title'),
      description: t('demo.card1Desc'),
      features: [t('demo.card1Feature1'), t('demo.card1Feature2'), t('demo.card1Feature3')]
    },
    {
      icon: Kanban,
      badge: t('demo.card2Badge'),
      title: t('demo.card2Title'),
      description: t('demo.card2Desc'),
      features: [t('demo.card2Feature1'), t('demo.card2Feature2'), t('demo.card2Feature3')]
    },
    {
      icon: TrendingUp,
      badge: t('demo.card3Badge'),
      title: t('demo.card3Title'),
      description: t('demo.card3Desc'),
      features: [t('demo.card3Feature1'), t('demo.card3Feature2'), t('demo.card3Feature3')]
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%27d%20like%20to%20see%20a%20demo%20of%20ClickCRM', '_blank');
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="demo" className="py-16 px-4 bg-viralDark landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-1 rounded-full text-sm font-medium mb-4">
            {t('demo.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('demo.title')}
          </h2>
          <p className="text-white/70 text-lg">
            {t('demo.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 landscape-grid">
          {screenshots.map((item, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-viralOrange/50 transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <item.icon className="w-16 h-16 text-viralOrange/30 group-hover:text-viralOrange/50 transition-colors" />
                <div className="absolute top-2 left-2 bg-viralOrange text-white text-xs px-2 py-1 rounded font-medium">
                  {item.badge}
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {item.features.map((feature, idx) => (
                    <span key={idx} className="bg-gray-900/80 text-white/70 text-[10px] px-2 py-0.5 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-viralOrange" />
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            {t('demo.ctaPrimary')}
          </Button>
          <Button 
            onClick={handleWhatsApp}
            size="lg"
            variant="outline"
            className="border-green-600 text-green-500 hover:bg-green-600/10"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {t('demo.ctaSecondary')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
