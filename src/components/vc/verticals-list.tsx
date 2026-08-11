// ============================================================================
// Los rubros.
//
// Filas, no tarjetas: son una lista de destinos y así se lee más rápido cuál te
// toca. Y se dice la verdad de cuáles tienen página propia y cuáles todavía no
// —una tarjeta idéntica para las cuatro prometía cuatro landings que no existen.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { subeSuave } from '@/components/vc/section';

const RUBROS = [
  { nameKey: 'home.vert1Name', descKey: 'home.vert1Desc', href: '/restauracion', live: true },
  { nameKey: 'home.vert2Name', descKey: 'home.vert2Desc', href: '/restauracion', live: true },
  { nameKey: 'home.vert3Name', descKey: 'home.vert3Desc', href: '/restauracion', live: false },
  { nameKey: 'home.vert4Name', descKey: 'home.vert4Desc', href: '/restauracion', live: false },
];

export default function VerticalsList() {
  const { t } = useTranslation();

  return (
    <div className="mt-12 border-t border-vc-ink3">
      {RUBROS.map((r, i) => {
        const contenido = (
          <>
            <h3 className="font-display text-xl font-bold text-vc-paper md:text-2xl">
              {t(r.nameKey)}
            </h3>
            <p className="max-w-xl leading-relaxed text-vc-steel">{t(r.descKey)}</p>
            <span
              className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider md:justify-end ${
                r.live ? 'text-vc-signal' : 'text-vc-steel/50'
              }`}
            >
              {r.live ? t('home.vertCta') : t('home.vertSoon')}
              {r.live && (
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              )}
            </span>
          </>
        );

        const clases =
          'group grid items-center gap-x-8 gap-y-2 border-b border-vc-ink3 py-6 md:grid-cols-[14rem_minmax(0,1fr)_11rem]';

        return (
          <motion.div
            key={r.nameKey}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={subeSuave}
            transition={{ delay: i * 0.06 }}
          >
            {r.live ? (
              <Link
                to={r.href}
                className={`${clases} transition-colors hover:bg-vc-ink2/60 focus-visible:bg-vc-ink2/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vc-signal`}
              >
                {contenido}
              </Link>
            ) : (
              <div className={clases}>{contenido}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
