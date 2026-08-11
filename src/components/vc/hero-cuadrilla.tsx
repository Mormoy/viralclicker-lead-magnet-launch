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
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Etiqueta, BotonCartel, subeSuave } from '@/components/vc/skin';
import TelefonoMarco from '@/components/vc/telefono-marco';

interface Props {
  onDemo: () => void;
  pricingHref: string;
}

export default function HeroCuadrilla({ onDemo, pricingHref }: Props) {
  const { t } = useTranslation();

  return (
    <section className="bg-vc-crema">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-[5vw] py-14 md:py-16 lg:grid-cols-[minmax(320px,1.15fr)_minmax(300px,1fr)] lg:gap-12">
        <motion.div initial="hidden" animate="visible" variants={subeSuave} className="flex flex-col gap-5">
          <div>
            <Etiqueta>{t('cuadrilla.heroTag')}</Etiqueta>
          </div>

          <h1 className="font-display text-[3.25rem] font-black uppercase leading-[0.94] tracking-[0.01em] text-vc-tinta sm:text-[4.5rem] lg:text-[5.75rem]">
            {t('cuadrilla.heroTitleA')}{' '}
            <span className="text-vc-oxido">{t('cuadrilla.heroAmount')}</span>{' '}
            {t('cuadrilla.heroTitleB')}
          </h1>

          <p className="max-w-[56ch] text-xl leading-[1.5] text-vc-marron3">
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
