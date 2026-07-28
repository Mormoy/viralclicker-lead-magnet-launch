import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Compact pricing block for the landing. Full plans live on /pricing (single source of truth).
const PricingCta = () => {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';
  const href = isEs ? '/precios' : '/pricing';

  const title = isEs ? 'Precios simples. Resultados serios.' : 'Simple pricing. Serious results.';
  const subtitle = isEs
    ? 'Starter, Pro, Growth y setup — implementación en 7 días, agentes en español e inglés y soporte incluido. Sin contratos.'
    : 'Starter, Pro, Growth and setup — live in 7 days, agents in English & Spanish, support included. No contracts.';
  const cta = isEs ? 'Ver precios' : 'See pricing';

  return (
    <section id="planes" className="py-16 px-4 landscape-padding">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">{subtitle}</p>
          <Link to={href}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2"
            >
              {cta} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingCta;
