// ============================================================================
// Los rubros.
//
// Techos va primero: es lo que se está vendiendo hoy en Florida y el rubro del
// caso del hero. Filas y no tarjetas, para que se lea rápido cuál te toca — y
// se dice la verdad de cuáles tienen página propia y cuáles todavía no.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { subeSuave } from '@/components/vc/skin';

const RUBROS = [
  { nameKey: 'home.vert3Name', descKey: 'home.vert3Desc', href: '/restauracion', live: true },
  { nameKey: 'home.vert1Name', descKey: 'home.vert1Desc', href: '/restauracion', live: true },
  { nameKey: 'home.vert2Name', descKey: 'home.vert2Desc', href: '/restauracion', live: true },
  { nameKey: 'home.vert4Name', descKey: 'home.vert4Desc', href: '/restauracion', live: false },
];

export default function VerticalsList() {
  const { t } = useTranslation();

  return (
    <div className="mt-7 flex flex-col">
      {RUBROS.map((r, i) => {
        const contenido = (
          <>
            <h3 className="font-display text-2xl font-black uppercase leading-none text-vc-tinta md:text-3xl">
              {t(r.nameKey)}
            </h3>
            <p className="text-[17px] leading-[1.55] text-vc-marron3">{t(r.descKey)}</p>
            <span
              className={`flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-extrabold uppercase tracking-[0.14em] md:justify-end ${
                r.live ? 'text-vc-quemado' : 'text-vc-marron3/60'
              }`}
            >
              {r.live ? t('home.vertCta') : t('home.vertSoon')}
              {r.live && (
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              )}
            </span>
          </>
        );

        const clases = `group grid items-center gap-x-6 gap-y-2 border-t-2 border-vc-marron3/40 py-5 md:grid-cols-[15rem_minmax(0,1fr)_10rem] ${
          i === RUBROS.length - 1 ? 'border-b-2' : ''
        }`;

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
                className={`${clases} transition-colors hover:bg-vc-amarillo/25 focus-visible:bg-vc-amarillo/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vc-amarillo`}
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
