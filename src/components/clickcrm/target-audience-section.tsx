import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Building2, ShoppingCart, MessageSquare, FileText, Users, Clock } from 'lucide-react';

const TargetAudienceSection = () => {
  const { t } = useTranslation();

  const idealFor = [
    { icon: FileText, text: t('audience.ideal1') },
    { icon: MessageSquare, text: t('audience.ideal2') },
    { icon: Building2, text: t('audience.ideal3') },
    { icon: Users, text: t('audience.ideal4') },
    { icon: Clock, text: t('audience.ideal5') }
  ];

  const notFor = [
    { icon: ShoppingCart, text: t('audience.not1') },
    { icon: XCircle, text: t('audience.not2') },
    { icon: XCircle, text: t('audience.not3') },
    { icon: XCircle, text: t('audience.not4') }
  ];

  return (
    <section className="py-16 px-4 bg-gray-900/30 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-1 rounded-full text-sm font-medium mb-4">
            {t('audience.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('audience.title')}
          </h2>
          <p className="text-white/70 text-lg">
            {t('audience.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ideal For */}
          <div className="bg-gradient-to-br from-green-900/20 to-gray-900 rounded-2xl p-6 border border-green-700/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('audience.idealTitle')}</h3>
            </div>
            <ul className="space-y-4">
              {idealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For */}
          <div className="bg-gradient-to-br from-red-900/10 to-gray-900 rounded-2xl p-6 border border-red-700/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('audience.notTitle')}</h3>
            </div>
            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-red-400/70 flex-shrink-0 mt-0.5" />
                  <span className="text-white/60">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            {t('audience.notSure')} <a href="#contacto" className="text-viralOrange hover:underline">{t('audience.contactUs')}</a> {t('audience.notSureHelp')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
