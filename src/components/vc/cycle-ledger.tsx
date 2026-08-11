// ============================================================================
// CAPTA · ATIENDE · PERSIGUE · CONTROLA.
//
// El verbo va enorme, condensado y en naranja; la explicación al lado. Las
// reglas gruesas entre filas hacen el trabajo que hacía el borde de la tarjeta,
// con la contundencia de un cartel y sin el ruido de cuatro cajas iguales.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave } from '@/components/vc/skin';

const FILAS = [
  { nameKey: 'home.cycle1Name', descKey: 'home.cycle1Desc' },
  { nameKey: 'home.cycle2Name', descKey: 'home.cycle2Desc' },
  { nameKey: 'home.cycle3Name', descKey: 'home.cycle3Desc' },
  { nameKey: 'home.cycle4Name', descKey: 'home.cycle4Desc' },
];

export default function CycleLedger({ sobreOscuro = false }: { sobreOscuro?: boolean }) {
  const { t } = useTranslation();

  const borde = sobreOscuro ? 'border-vc-marron4' : 'border-vc-marron';
  const palabra = sobreOscuro ? 'text-vc-amarillo' : 'text-vc-oxido';
  const cuerpo = sobreOscuro ? 'text-vc-arena' : 'text-vc-marron3';

  return (
    <div className="mt-7 flex flex-col">
      {FILAS.map((fila, i) => (
        <motion.div
          key={fila.nameKey}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          transition={{ delay: i * 0.06 }}
          className={`grid items-center gap-x-6 gap-y-1.5 border-t-[3px] ${borde} py-6 md:grid-cols-[minmax(140px,240px)_minmax(0,1fr)] ${
            i === FILAS.length - 1 ? 'border-b-[3px]' : ''
          }`}
        >
          <span className={`font-display text-[2.15rem] font-black uppercase leading-none sm:text-5xl ${palabra}`}>
            {t(fila.nameKey)}
          </span>
          <p className={`text-[17px] leading-[1.55] ${cuerpo}`}>{t(fila.descKey)}</p>
        </motion.div>
      ))}
    </div>
  );
}
