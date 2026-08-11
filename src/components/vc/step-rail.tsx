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
import { subeSuave } from '@/components/vc/skin';

export interface Paso {
  titleKey: string;
  descKey: string;
}

export default function StepRail({ pasos }: { pasos: Paso[] }) {
  const { t } = useTranslation();

  return (
    <ol className="mt-7 flex flex-col">
      {pasos.map((p, i) => (
        <motion.li
          key={p.titleKey}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          transition={{ delay: i * 0.06 }}
          className={`grid gap-x-6 gap-y-1.5 border-t-2 border-vc-marron3/40 py-5 md:grid-cols-[3.5rem_17rem_minmax(0,1fr)] ${
            i === pasos.length - 1 ? 'border-b-2' : ''
          }`}
        >
          <span className="font-mono text-lg font-extrabold tabular-nums text-vc-oxido">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-2xl font-black uppercase leading-none text-vc-tinta">
            {t(p.titleKey)}
          </h3>
          <p className="text-[17px] leading-[1.55] text-vc-marron3">{t(p.descKey)}</p>
        </motion.li>
      ))}
    </ol>
  );
}
