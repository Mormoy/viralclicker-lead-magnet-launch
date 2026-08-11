import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRICING } from '@/config/site';

// Bloque de precios de la home. Los planes completos viven en /precios, que
// sigue siendo la única fuente de verdad; acá solo se muestra desde cuánto y se
// manda para allá.
//
// Va sobre papel, como el informe de cifras: el precio es un dato duro y en
// este sitio los datos duros se leen en papel.
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
  const porMes = isEs ? 'al mes' : 'per month';

  return (
    <section id="planes" className="border-b border-vc-ink3 bg-vc-ink">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl rounded-sm bg-vc-paper p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight text-vc-ink md:text-[2rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-vc-ink/70">{subtitle}</p>
            </div>

            <div className="border-t border-vc-ink/15 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vc-ink/50">
                {desde}
              </p>
              <p className="mt-1 font-display text-5xl font-extrabold tracking-[-0.03em] text-vc-ink">
                ${PRICING.starter}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-vc-ink/50">
                USD {porMes}
              </p>
              <Link to={href} className="mt-5 block">
                <Button
                  size="lg"
                  className="h-12 w-full gap-2 rounded-sm bg-vc-ink px-6 font-semibold text-vc-paper hover:bg-vc-ink/90"
                >
                  {cta} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCta;
