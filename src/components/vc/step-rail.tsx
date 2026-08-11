// ============================================================================
// Un riel de pasos numerados.
//
// Acá los números SÍ significan algo: son un orden real que el lector necesita
// —primero entra el cliente, después lo llaman, después se agenda—. En una
// grilla de beneficios sueltos numerar sería decoración; en una secuencia es
// información.
//
// Lo usan "Cómo funciona" y "Setup", que son las dos secuencias del sitio.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave } from '@/components/vc/section';

export interface Paso {
  titleKey: string;
  descKey: string;
  /** Marca opcional a la izquierda: la hora del ejemplo o el día del setup. */
  marca?: string;
}

export default function StepRail({ pasos, denso = false }: { pasos: Paso[]; denso?: boolean }) {
  const { t } = useTranslation();

  return (
    <ol className="mt-12 border-t border-vc-ink3">
      {pasos.map((p, i) => (
        <motion.li
          key={p.titleKey}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          transition={{ delay: i * 0.06 }}
          // La columna del título necesita ancho de verdad: con 9rem, "El
          // agente lo llama en 2 minutos" caía en tres líneas al lado de una
          // descripción de una sola.
          className={`grid gap-x-8 gap-y-1.5 border-b border-vc-ink3 md:grid-cols-[3rem_16rem_minmax(0,1fr)] ${
            denso ? 'py-5' : 'py-6 md:py-7'
          }`}
        >
          <span className="font-mono text-sm tabular-nums text-vc-signal">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-lg font-bold leading-snug text-vc-paper">
            {t(p.titleKey)}
          </h3>
          <p className="max-w-2xl leading-relaxed text-vc-steel">
            {t(p.descKey)}
            {p.marca && (
              <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-vc-steel/60">
                {p.marca}
              </span>
            )}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
