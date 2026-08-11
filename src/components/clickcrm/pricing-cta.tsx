import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PRICING } from '@/config/site';
import { Seccion, Titular, Etiqueta, BotonCartel } from '@/components/vc/skin';

// Bloque de precios de la home. Los planes completos viven en /precios, que
// sigue siendo la única fuente de verdad; acá solo se muestra desde cuánto y se
// manda para allá.
const PricingCta = () => {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';
  const href = isEs ? '/precios' : '/pricing';

  const title = isEs ? 'Precios simples. Resultados serios.' : 'Simple pricing. Serious results.';
  const subtitle = isEs
    ? 'Starter, Pro y Growth. Implementación en 7 días, agentes en español e inglés y soporte incluido. Sin contrato de permanencia.'
    : 'Starter, Pro and Growth. Live in 7 days, agents in English and Spanish, support included. No lock-in contract.';
  const cta = isEs ? 'Ver los tres planes' : 'See all three plans';
  const desde = isEs ? 'Desde' : 'From';
  const porMes = isEs ? 'USD al mes' : 'USD per month';
  const etiqueta = isEs ? 'Planes' : 'Pricing';

  return (
    <Seccion id="planes">
      <div className="border-[3px] border-vc-marron bg-vc-crema p-7 shadow-dura-marron md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Etiqueta tono="suelto">{etiqueta}</Etiqueta>
            <Titular className="mt-3 !text-[2rem] sm:!text-[2.5rem]">{title}</Titular>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-vc-marron3">{subtitle}</p>
          </div>

          <div className="border-t-[3px] border-vc-marron pt-5 md:border-l-[3px] md:border-t-0 md:pl-8 md:pt-0">
            <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-vc-oxido">
              {desde}
            </p>
            <p className="mt-1 font-display text-[4.5rem] font-black leading-none text-vc-tinta">
              ${PRICING.starter}
            </p>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-vc-marron3">
              {porMes}
            </p>
            <Link to={href} className="mt-5 block">
              <BotonCartel variante="oscuro" className="w-full">
                {cta}
              </BotonCartel>
            </Link>
          </div>
        </div>
      </div>
    </Seccion>
  );
};

export default PricingCta;
