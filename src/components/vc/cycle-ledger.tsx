// ============================================================================
// CAPTA · ATIENDE · PERSIGUE · CONTROLA.
//
// No son cuatro tarjetas iguales: son las cuatro columnas de un parte de turno.
// El verbo manda —grande, en display— y la explicación va al lado, en su ancho
// de lectura. La regla horizontal entre filas hace el trabajo que hacía el
// borde de la tarjeta, con mucho menos ruido.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave } from '@/components/vc/section';

const FILAS = [
  { nameKey: 'home.cycle1Name', descKey: 'home.cycle1Desc' },
  { nameKey: 'home.cycle2Name', descKey: 'home.cycle2Desc' },
  { nameKey: 'home.cycle3Name', descKey: 'home.cycle3Desc' },
  { nameKey: 'home.cycle4Name', descKey: 'home.cycle4Desc' },
];

export default function CycleLedger() {
  const { t } = useTranslation();

  return (
    <div className="mt-12 border-t border-vc-ink3">
      {FILAS.map((fila, i) => (
        <motion.div
          key={fila.nameKey}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          transition={{ delay: i * 0.06 }}
          className="grid items-baseline gap-x-8 gap-y-2 border-b border-vc-ink3 py-6 md:grid-cols-[8rem_minmax(0,1fr)] md:py-8"
        >
          <h3 className="font-display text-2xl font-extrabold tracking-[-0.01em] text-vc-paper md:text-[1.75rem]">
            {t(fila.nameKey)}
          </h3>
          <p className="max-w-2xl leading-relaxed text-vc-steel">{t(fila.descKey)}</p>
        </motion.div>
      ))}
    </div>
  );
}
