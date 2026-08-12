// ============================================================================
// El hero.
//
// El titular no describe el producto: nombra la pérdida. "El trabajo de $15,000
// se lo llevó el que contestó primero" es lo que le pasó al techista el mes
// pasado, y por eso engancha donde el titular anterior —que explicaba una
// plataforma— no enganchaba.
//
// A la derecha, el mismo lead atendido por Marco, con el cronómetro rojo
// contando lo que uno lleva sin contestar. El contraste es el argumento.
// ============================================================================
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Etiqueta, BotonCartel, subeSuave } from '@/components/vc/skin';
import TelefonoMarco from '@/components/vc/telefono-marco';

interface Props {
  onDemo: () => void;
  pricingHref: string;
}

export default function HeroCuadrilla({ onDemo, pricingHref }: Props) {
  const { t } = useTranslation();
  const reducido = useReducedMotion();
  // El titular se revela por partes solo si el visitante acepta movimiento.
  // Sin opacidad: el titular es lo primero que tiene que leerse, así que nunca
  // puede depender de que una animación llegue a correr. Se mueve y escala, y
  // si algo falla queda simplemente en su sitio.
  const pieza = (delay: number, pop = false) =>
    reducido
      ? {}
      : {
          initial: { y: 18, ...(pop ? { scale: 0.82 } : {}) },
          animate: { y: 0, ...(pop ? { scale: 1 } : {}) },
          transition: { duration: pop ? 0.55 : 0.5, delay, ease: pop ? [0.2, 1.25, 0.35, 1] : [0.16, 1, 0.3, 1] },
        };

  return (
    <section className="bg-vc-crema">
      {/* En móvil el orden es titular → botones → teléfono, y el conjunto se
          aprieta para que el CTA entre en la primera pantalla: con el titular
          a 52px caía siempre por debajo del pliegue. */}
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-[5vw] py-9 sm:gap-10 sm:py-14 md:py-16 lg:grid-cols-[minmax(320px,1.15fr)_minmax(300px,1fr)] lg:gap-12">
        <motion.div {...(reducido ? {} : { initial: 'hidden', animate: 'visible', variants: subeSuave })} className="flex flex-col gap-4 sm:gap-5">
          <div>
            <Etiqueta>{t('cuadrilla.heroTag')}</Etiqueta>
          </div>

          {/* El titular se revela por partes al cargar, en el orden en que se
              lee, y la cifra cierra con un pop: es el dato que tiene que
              quedar. Las tres piezas son las que ya existían — no se parte ni
              se reescribe el texto, solo se anima cada una. */}
          <h1 className="font-display text-[2.55rem] font-black uppercase leading-[0.94] tracking-[0.01em] text-vc-tinta min-[400px]:text-[3rem] sm:text-[4.5rem] lg:text-[5.75rem]">
            <motion.span
              {...pieza(0)}
              className="inline-block"
            >
              {t('cuadrilla.heroTitleA')}
            </motion.span>{' '}
            <motion.span
              {...pieza(0.18, true)}
              className="inline-block text-vc-oxido"
            >
              {t('cuadrilla.heroAmount')}
            </motion.span>{' '}
            <motion.span
              {...pieza(0.34)}
              className="inline-block"
            >
              {t('cuadrilla.heroTitleB')}
            </motion.span>
          </h1>

          <p className="max-w-[56ch] text-[17px] leading-[1.5] text-vc-marron3 sm:text-xl">
            {t('cuadrilla.heroSub')}
          </p>

          <div className="flex flex-wrap gap-3.5">
            <BotonCartel onClick={onDemo} data-cta="demo-hero">
              {t('home.heroDemo')}
            </BotonCartel>
            <Link to={pricingHref}>
              <BotonCartel variante="secundario">{t('home.heroPricing')}</BotonCartel>
            </Link>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] font-semibold text-[#6B4A2E]">
            {[t('home.heroMicro1'), t('home.heroMicro2'), t('home.heroMicro3')].map((m) => (
              <li key={m}>✓ {m}</li>
            ))}
          </ul>
        </motion.div>

        <TelefonoMarco />
      </div>
    </section>
  );
}
