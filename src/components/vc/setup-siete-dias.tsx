// ============================================================================
// Setup e implementación — la línea de 7 días.
//
// Era otra tabla de filas, la tercera seguida. La promesa del negocio es
// "funcionando en 7 días", así que el módulo la MUESTRA en vez de contarla: los
// días son nodos sobre una línea naranja y se lee como un calendario.
//
// En escritorio la línea es horizontal; en móvil se vuelve vertical con la
// conectora a la izquierda, que es la única forma en que cuatro nodos caben sin
// apretarse.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave } from '@/components/vc/skin';

const NODOS = [
  { diaKey: 'setup.d1Dia', textoKey: 'setup.d1Texto' },
  { diaKey: 'setup.d2Dia', textoKey: 'setup.d2Texto' },
  { diaKey: 'setup.d3Dia', textoKey: 'setup.d3Texto' },
  { diaKey: 'setup.d4Dia', textoKey: 'setup.d4Texto' },
];

export default function SetupSieteDias() {
  const { t } = useTranslation();

  return (
    <div className="mt-10">
      <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
        {/* La línea. Vertical en móvil, horizontal desde `md`. */}
        <span
          aria-hidden
          className="absolute left-[1.4rem] top-3 h-[calc(100%-1.5rem)] w-[3px] bg-vc-naranja
                     md:left-0 md:top-[1.4rem] md:h-[3px] md:w-full"
        />

        {NODOS.map((n, i) => (
          <motion.li
            key={n.diaKey}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={subeSuave}
            transition={{ delay: Math.min(i, 3) * 0.08 }}
            className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-x-4 md:block"
          >
            {/* El nodo. El último va relleno: es el día en que ya funciona. */}
            <span
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-vc-naranja font-display text-sm font-black md:h-12 md:w-12 ${
                i === NODOS.length - 1
                  ? 'bg-vc-naranja text-vc-marron'
                  : 'bg-vc-crema text-vc-oxido'
              }`}
            >
              {i + 1}
            </span>

            <div className="md:mt-4">
              <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] text-vc-oxido">
                {t(n.diaKey)}
              </p>
              <p className="mt-1.5 text-[17px] font-semibold leading-[1.4] text-vc-tinta">
                {t(n.textoKey)}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
