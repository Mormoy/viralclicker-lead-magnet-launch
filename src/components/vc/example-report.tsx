// ============================================================================
// El antes y el después.
//
// Va sobre amarillo de obra y con forma de cartel, no de tarjeta de métricas
// con degradado: son cifras de referencia y tienen que leerse como lo que son.
// La aclaración de que NO es el testimonio de un cliente va arriba y visible,
// no en letra chica al pie — es una decisión tomada antes y se respeta.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave, Etiqueta } from '@/components/vc/skin';

const METRICAS = [
  { metricKey: 'home.caseMetric1', labelKey: 'home.caseLabel1', beforeKey: 'home.caseBefore1' },
  { metricKey: 'home.caseMetric2', labelKey: 'home.caseLabel2', beforeKey: 'home.caseBefore2' },
  { metricKey: 'home.caseMetric3', labelKey: 'home.caseLabel3', beforeKey: 'home.caseBefore3' },
];

export default function ExampleReport() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={subeSuave}
      className="border-2 border-vc-marron bg-white p-7 md:p-10"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-b-2 border-vc-marron3/30 pb-5">
        <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-none text-vc-marron md:text-[2.75rem]">
          {t('home.caseTitle')}
        </h2>
        <Etiqueta>{t('home.caseBadge')}</Etiqueta>
      </div>

      <p className="mt-5 max-w-2xl leading-relaxed text-vc-marron">{t('home.caseDesc')}</p>

      <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
        {METRICAS.map((m) => (
          <div key={m.labelKey} className="border-t-[3px] border-vc-oxido pt-4">
            <dd className="font-display text-5xl font-black leading-none text-vc-marron">
              {t(m.metricKey)}
            </dd>
            <dt className="mt-2 font-semibold text-vc-marron">{t(m.labelKey)}</dt>
            <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-vc-marron3">
              {t('home.caseBefore')} {t(m.beforeKey)}
            </p>
          </div>
        ))}
      </dl>

      <p className="mt-8 border-t-2 border-vc-marron3/30 pt-5 text-sm leading-relaxed text-vc-marron3">
        {t('home.caseQuote')}
      </p>
    </motion.div>
  );
}
