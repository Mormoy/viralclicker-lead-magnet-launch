// ============================================================================
// El antes y el después.
//
// Va en papel y con forma de informe, no de tarjeta de métricas con degradado:
// son cifras de referencia y tienen que leerse como lo que son. La aclaración
// de que NO es el testimonio de un cliente va arriba y visible, no en letra
// chica al pie — es una decisión tomada antes y se respeta.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave } from '@/components/vc/section';

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
      className="mx-auto max-w-4xl rounded-sm bg-vc-paper p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] md:p-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-vc-paperDim pb-5">
        <h2 className="font-display text-2xl font-bold text-vc-ink md:text-3xl">
          {t('home.caseTitle')}
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-vc-ink/50">
          {t('home.caseBadge')}
        </span>
      </div>

      <p className="mt-5 max-w-2xl leading-relaxed text-vc-ink/70">{t('home.caseDesc')}</p>

      <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
        {METRICAS.map((m) => (
          <div key={m.labelKey} className="border-t border-vc-ink/15 pt-4">
            <dd className="font-display text-4xl font-extrabold tracking-[-0.02em] text-vc-ink">
              {t(m.metricKey)}
            </dd>
            <dt className="mt-1.5 font-medium text-vc-ink">{t(m.labelKey)}</dt>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-vc-ink/45">
              {t('home.caseBefore')} {t(m.beforeKey)}
            </p>
          </div>
        ))}
      </dl>

      <p className="mt-8 border-t border-vc-paperDim pt-5 text-sm leading-relaxed text-vc-ink/60">
        {t('home.caseQuote')}
      </p>
    </motion.div>
  );
}
