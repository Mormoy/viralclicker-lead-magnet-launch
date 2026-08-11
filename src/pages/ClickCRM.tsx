// ============================================================================
// viralclicker.com — la home.
//
// Rediseño (10-ago). Lo que había era el patrón por defecto: fondo casi negro,
// un único acento naranja repartido por todos lados, ocho secciones idénticas
// de título centrado + grilla de tarjetas con iconito, y ni una sola imagen.
//
// Las tres decisiones de este rediseño:
//
//  1· El hero no promete que se responde en 2 minutos: los hace pasar. Una
//     emergencia real de las 2:47 AM resolviéndose sola, con el cronómetro
//     corriendo. Es el único momento con movimiento del sitio y es el producto.
//
//  2· Papel sobre tinta. Los artefactos del oficio —la orden que entra, la
//     transcripción, el hilo de WhatsApp, el informe de cifras— son de papel.
//     Ese contraste es lo que le da imagen a una página que no tiene fotos, y
//     no depende de conseguir fotografías que hoy no existen.
//
//  3· El naranja se reserva para el reloj y el botón principal. Antes era el
//     color de todo, y cuando todo grita no se escucha nada.
// ============================================================================
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, ArrowRight } from 'lucide-react';

import Logo from '@/components/logo';
import PricingCta from '@/components/clickcrm/pricing-cta';
import WhatsAppButton from '@/components/clickcrm/whatsapp-button';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/config/site';

import IncidentHero from '@/components/vc/incident-hero';
import { Seccion, EncabezadoSeccion, subeSuave } from '@/components/vc/section';
import CycleLedger from '@/components/vc/cycle-ledger';
import AgentsSplit from '@/components/vc/agents-split';
import StepRail from '@/components/vc/step-rail';
import VerticalsList from '@/components/vc/verticals-list';
import ExampleReport from '@/components/vc/example-report';
import FaqList from '@/components/vc/faq-list';

const abrirDemo = () => window.open(CONTACT.demoUrl, '_blank', 'noopener');

const PASOS_COMO = [
  { titleKey: 'home.howStep1Title', descKey: 'home.howStep1Desc' },
  { titleKey: 'home.howStep2Title', descKey: 'home.howStep2Desc' },
  { titleKey: 'home.howStep3Title', descKey: 'home.howStep3Desc' },
  { titleKey: 'home.howStep4Title', descKey: 'home.howStep4Desc' },
];

const PASOS_SETUP = [
  { titleKey: 'home.implStep1Title', descKey: 'home.implStep1Desc' },
  { titleKey: 'home.implStep2Title', descKey: 'home.implStep2Desc' },
  { titleKey: 'home.implStep3Title', descKey: 'home.implStep3Desc' },
  { titleKey: 'home.implStep4Title', descKey: 'home.implStep4Desc' },
];

const ViralClicker = () => {
  const { t, i18n } = useTranslation();
  const pricingHref = i18n.language === 'en' ? '/pricing' : '/precios';

  const enlacesNav = [
    { href: '#product', label: t('home.navProduct') },
    { href: '#how-it-works', label: t('home.navHow') },
    { href: '#faq', label: t('home.navFaq') },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-vc-ink font-body text-vc-paper antialiased">
      {/* ── Cabecera ──────────────────────────────────────────────────── */}
      <header className="fixed top-0 z-50 w-full border-b border-vc-ink3 bg-vc-ink/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            {enlacesNav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-vc-steel transition-colors hover:text-vc-paper"
              >
                {l.label}
              </a>
            ))}
            <Link
              to={pricingHref}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-vc-steel transition-colors hover:text-vc-paper"
            >
              {t('home.navPricing')}
            </Link>
            <LanguageSwitcher />
            <Button
              onClick={abrirDemo}
              size="sm"
              className="rounded-sm bg-vc-signal font-semibold text-white hover:bg-vc-signal/90"
            >
              {t('home.navGetStarted')}
            </Button>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <Button
              onClick={abrirDemo}
              size="sm"
              className="rounded-sm bg-vc-signal text-xs font-semibold text-white hover:bg-vc-signal/90"
            >
              {t('home.navGetStarted')}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* 1 · El incidente de las 2:47 AM */}
        <IncidentHero onDemo={abrirDemo} pricingHref={pricingHref} />

        {/* 2 · El ciclo comercial */}
        <Seccion id="product" tono="ink2">
          <EncabezadoSeccion
            indice={t('home.navProduct')}
            titulo={t('home.cycleTitle')}
            bajada={t('home.cycleSubtitle')}
          />
          <CycleLedger />
        </Seccion>

        {/* 3 · Los dos agentes */}
        <Seccion id="agentes">
          <EncabezadoSeccion
            indice={t('home.heroBadge')}
            titulo={t('home.agentsTitle')}
            bajada={t('home.agentsSubtitle')}
          />
          <AgentsSplit />
        </Seccion>

        {/* 4 · Cómo funciona — una secuencia real, por eso va numerada */}
        <Seccion id="how-it-works" tono="ink2">
          <EncabezadoSeccion
            indice={t('home.navHow')}
            titulo={t('home.howTitle')}
            bajada={t('home.howSubtitle')}
          />
          <StepRail pasos={PASOS_COMO} />
        </Seccion>

        {/* 5 · Rubros */}
        <Seccion>
          <EncabezadoSeccion titulo={t('home.vertTitle')} bajada={t('home.vertSubtitle')} />
          <VerticalsList />
        </Seccion>

        {/* 6 · Cifras de referencia. No es un testimonio y lo dice. */}
        <Seccion tono="ink2">
          <ExampleReport />
        </Seccion>

        {/* 7 · Planes */}
        <PricingCta />

        {/* 8 · Setup */}
        <Seccion tono="ink2">
          <EncabezadoSeccion titulo={t('home.implTitle')} bajada={t('home.implSubtitle')} />
          <StepRail pasos={PASOS_SETUP} denso />
        </Seccion>

        {/* 9 · FAQ */}
        <Seccion id="faq">
          <EncabezadoSeccion titulo={t('home.faqTitle')} bajada={t('home.faqSubtitle')} />
          <FaqList />
        </Seccion>

        {/* 10 · Cierre */}
        <Seccion tono="ink2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={subeSuave}
            className="max-w-3xl"
          >
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.015em] text-vc-paper sm:text-[2.75rem]">
              {t('home.ctaTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-vc-steel">{t('home.ctaSubtitle')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={abrirDemo}
                data-cta="demo-final"
                className="h-12 gap-2 rounded-sm bg-vc-signal px-7 font-semibold text-white hover:bg-vc-signal/90"
              >
                <CalendarCheck className="h-4 w-4" /> {t('home.ctaDemo')}
              </Button>
              <Link to={pricingHref}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full gap-2 rounded-sm border-vc-ink3 bg-transparent px-7 font-semibold text-vc-paper hover:bg-vc-ink hover:text-vc-paper sm:w-auto"
                >
                  {t('home.ctaPricing')} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </Seccion>
      </main>

      {/* ── Pie ───────────────────────────────────────────────────────── */}
      <footer className="bg-vc-ink">
        <div className="container mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <p className="font-mono text-[11px] uppercase tracking-wider text-vc-steel">
              {t('home.footerRights', { year: new Date().getFullYear() })}
            </p>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider">
              <Link to={pricingHref} className="text-vc-steel transition-colors hover:text-vc-paper">
                {t('home.footerPricing')}
              </Link>
              <a href="/terms" className="text-vc-steel transition-colors hover:text-vc-paper">
                {t('home.footerTerms')}
              </a>
              <a href="/privacy" className="text-vc-steel transition-colors hover:text-vc-paper">
                {t('home.footerPrivacy')}
              </a>
              <span className="text-vc-steel/50">{t('home.footerTagline')}</span>
            </nav>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default ViralClicker;
