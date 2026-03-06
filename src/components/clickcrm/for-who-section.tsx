import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ForWhoSection = () => {
  const { t } = useTranslation();

  const idealFor = [
    t('audience.ideal1'),
    t('audience.ideal2'),
    t('audience.ideal3'),
    t('audience.ideal4'),
    t('audience.ideal5'),
  ];

  const notFor = [
    t('audience.not1'),
    t('audience.not2'),
    t('audience.not3'),
    t('audience.not4'),
  ];

  return (
    <section className="py-14 md:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          {t('audience.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Ideal for */}
          <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t('audience.idealTitle')}
            </h3>
            <ul className="space-y-3">
              {idealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not for */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              {t('audience.notTitle')}
            </h3>
            <ul className="space-y-3">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400/70 flex-shrink-0 mt-0.5" />
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-white/50 text-sm mt-6">
          {t('audience.notSure')}{' '}
          <a
            href="https://wa.me/13051234567?text=Hi,%20I%27m%20not%20sure%20if%20ViralClicker%20is%20right%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="text-viralOrange hover:underline"
          >
            {t('audience.contactUs')}
          </a>{' '}
          {t('audience.notSureHelp')}
        </p>
      </div>
    </section>
  );
};

export default ForWhoSection;
