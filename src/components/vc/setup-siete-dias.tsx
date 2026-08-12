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
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave, useEntrada } from '@/components/vc/skin';

const NODOS = [
  { diaKey: 'setup.d1Dia', textoKey: 'setup.d1Texto' },
  { diaKey: 'setup.d2Dia', textoKey: 'setup.d2Texto' },
  { diaKey: 'setup.d3Dia', textoKey: 'setup.d3Texto' },
  { diaKey: 'setup.d4Dia', textoKey: 'setup.d4Texto' },
];

export default function SetupSieteDias() {
  const { t } = useTranslation();
  const entrada = useEntrada();
  const reducido = useReducedMotion();
  // La línea se dibuja solo si hay movimiento permitido; si no, ya está entera.
  const trazo = (eje: 'X' | 'Y') =>
    reducido ? {} : { initial: { [`scale${eje}`]: 0 }, whileInView: { [`scale${eje}`]: 1 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } };

  return (
    <div className="mt-10">
      <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
        {/* La línea se DIBUJA al entrar en pantalla. Son dos elementos y no uno
            porque el eje cambia con el breakpoint —vertical en móvil,
            horizontal en escritorio— y una sola animación no puede escalar en
            un eje distinto según el ancho. */}
        <motion.span
          aria-hidden
          {...trazo('Y')}
          className="absolute left-[1.4rem] top-3 h-[calc(100%-1.5rem)] w-[3px] origin-top bg-vc-naranja md:hidden"
        />
        <motion.span
          aria-hidden
          {...trazo('X')}
          className="absolute left-0 top-[1.4rem] hidden h-[3px] w-full origin-left bg-vc-naranja md:block"
        />

        {NODOS.map((n, i) => (
          <motion.li
            key={n.diaKey}
            {...entrada}
            transition={{ duration: 0.4, delay: 0.2 + Math.min(i, 3) * 0.13, ease: [0.16, 1, 0.3, 1] }}
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
