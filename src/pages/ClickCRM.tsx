
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from '@/components/logo';
import PricingCta from '@/components/clickcrm/pricing-cta';
import WhatsAppButton from '@/components/clickcrm/whatsapp-button';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/config/site';
import {
  Megaphone, PhoneCall, Repeat, BarChart3, Play, ArrowRight,
  CheckCircle2, Droplets, FileSearch, Home, Hammer,
  HelpCircle, ChevronDown, MessageCircle, CalendarCheck, Settings, Rocket, Bot
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const openDemo = () => window.open(CONTACT.demoUrl, '_blank', 'noopener');

const ViralClicker = () => {
  const { t, i18n } = useTranslation();
  const pricingHref = i18n.language === 'en' ? '/pricing' : '/precios';

  // CAPTA · ATIENDE · PERSIGUE · CONTROLA
  const cycleBlocks = [
    { icon: Megaphone, nameKey: 'home.cycle1Name', descKey: 'home.cycle1Desc' },
    { icon: PhoneCall, nameKey: 'home.cycle2Name', descKey: 'home.cycle2Desc' },
    { icon: Repeat, nameKey: 'home.cycle3Name', descKey: 'home.cycle3Desc' },
    { icon: BarChart3, nameKey: 'home.cycle4Name', descKey: 'home.cycle4Desc' },
  ];

  const howSteps = [
    { step: '1', titleKey: 'home.howStep1Title', descKey: 'home.howStep1Desc', icon: Megaphone },
    { step: '2', titleKey: 'home.howStep2Title', descKey: 'home.howStep2Desc', icon: PhoneCall },
    { step: '3', titleKey: 'home.howStep3Title', descKey: 'home.howStep3Desc', icon: CalendarCheck },
    { step: '4', titleKey: 'home.howStep4Title', descKey: 'home.howStep4Desc', icon: CheckCircle2 },
  ];

  // Verticales reales. Por ahora la única landing publicada es /restauracion.
  const verticals = [
    { icon: Droplets, nameKey: 'home.vert1Name', descKey: 'home.vert1Desc', href: '/restauracion', live: true },
    { icon: FileSearch, nameKey: 'home.vert2Name', descKey: 'home.vert2Desc', href: '/restauracion', live: true },
    { icon: Home, nameKey: 'home.vert3Name', descKey: 'home.vert3Desc', href: '/restauracion', live: false },
    { icon: Hammer, nameKey: 'home.vert4Name', descKey: 'home.vert4Desc', href: '/restauracion', live: false },
  ];

  const caseMetrics = [
    { metricKey: 'home.caseMetric1', labelKey: 'home.caseLabel1', beforeKey: 'home.caseBefore1' },
    { metricKey: 'home.caseMetric2', labelKey: 'home.caseLabel2', beforeKey: 'home.caseBefore2' },
    { metricKey: 'home.caseMetric3', labelKey: 'home.caseLabel3', beforeKey: 'home.caseBefore3' },
  ];

  const implSteps = [
    { step: '1', titleKey: 'home.implStep1Title', descKey: 'home.implStep1Desc', icon: CheckCircle2 },
    { step: '2', titleKey: 'home.implStep2Title', descKey: 'home.implStep2Desc', icon: CalendarCheck },
    { step: '3', titleKey: 'home.implStep3Title', descKey: 'home.implStep3Desc', icon: Settings },
    { step: '4', titleKey: 'home.implStep4Title', descKey: 'home.implStep4Desc', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#product" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">{t('home.navProduct')}</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">{t('home.navHow')}</a>
            <a href="#planes" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">{t('home.navPricing')}</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">{t('home.navFaq')}</a>
            <LanguageSwitcher />
            <Button
              onClick={openDemo}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              size="sm"
            >
              {t('home.navGetStarted')}
            </Button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              onClick={openDemo}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
            >
              {t('home.navGetStarted')}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* SECTION 1 — HERO */}
        <section className="py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="inline-block bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                {t('home.heroBadge')}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                {t('home.heroTitle1')}{' '}
                <span className="text-primary">{t('home.heroTitle2')}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                {t('home.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2"
                  onClick={openDemo}
                  data-cta="demo-hero"
                >
                  <Play className="w-4 h-4" /> {t('home.heroDemo')}
                </Button>
                <Link to={pricingHref}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary font-semibold px-8 gap-2"
                  >
                    {t('home.heroPricing')} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {[t('home.heroMicro1'), t('home.heroMicro2'), t('home.heroMicro3')].map((txt) => (
                  <span key={txt} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> {txt}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — CAPTA · ATIENDE · PERSIGUE · CONTROLA */}
        <section id="product" className="py-20 px-4 bg-card/50">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.cycleTitle')}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('home.cycleSubtitle')}</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {cycleBlocks.map((item, i) => (
                <motion.div
                  key={item.nameKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.12 } } }}
                  className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold tracking-wide">
                      <span className="text-primary mr-1">{i + 1}.</span>{t(item.nameKey)}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — LOS DOS AGENTES (el diferencial) */}
        <section id="agentes" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
                <Bot className="w-4 h-4" /> {t('home.heroBadge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.agentsTitle')}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('home.agentsSubtitle')}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: PhoneCall, titleKey: 'home.agentCallTitle', descKey: 'home.agentCallDesc' },
                { icon: MessageCircle, titleKey: 'home.agentChatTitle', descKey: 'home.agentChatDesc' },
              ].map((agent, i) => (
                <motion.div
                  key={agent.titleKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}
                  className="bg-card border border-primary/20 rounded-2xl p-8"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                    <agent.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(agent.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(agent.descKey)}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 text-center max-w-2xl mx-auto">
              <p className="font-semibold text-lg">{t('home.agentsHandoff')}</p>
              <p className="text-muted-foreground mt-3">{t('home.agentsObjection')}</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-4 bg-card/50">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.howTitle')}</h2>
              <p className="text-muted-foreground text-lg">{t('home.howSubtitle')}</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {howSteps.map((item, i) => (
                <motion.div
                  key={item.titleKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.12 } } }}
                  className="text-center relative"
                >
                  <div className="bg-primary/10 border border-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(item.descKey)}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t border-dashed border-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — VERTICALES */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.vertTitle')}</h2>
              <p className="text-muted-foreground text-lg">{t('home.vertSubtitle')}</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {verticals.map((v, i) => (
                <motion.div
                  key={v.nameKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
                >
                  <Link
                    to={v.href}
                    className="group block h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                        <v.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{t(v.nameKey)}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{t(v.descKey)}</p>
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                          {v.live ? t('home.vertCta') : t('home.vertSoon')}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — EJEMPLO ILUSTRATIVO (no es un testimonio) */}
        <section className="py-20 px-4 bg-card/50">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <span className="inline-block bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-full px-4 py-1 text-sm font-semibold mb-4">
                  {t('home.caseBadge')}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('home.caseTitle')}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  {t('home.caseDesc')}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {caseMetrics.map((item) => (
                  <div key={item.labelKey} className="bg-secondary/50 border border-border rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{t(item.metricKey)}</div>
                    <div className="text-sm font-medium mb-2">{t(item.labelKey)}</div>
                    <div className="text-xs text-muted-foreground">{t('home.caseBefore')} {t(item.beforeKey)}</div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  {t('home.caseQuote')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7 — PRICING (compact CTA → full plans on /precios) */}
        <PricingCta />

        {/* SECTION 8 — IMPLEMENTATION */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.implTitle')}</h2>
              <p className="text-muted-foreground text-lg">{t('home.implSubtitle')}</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {implSteps.map((item, i) => (
                <motion.div
                  key={item.titleKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(item.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <FAQSection />

        {/* SECTION 10 — FINAL CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.ctaTitle')}</h2>
              <p className="text-muted-foreground text-lg mb-8">{t('home.ctaSubtitle')}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2"
                  onClick={openDemo}
                  data-cta="demo-final"
                >
                  <CalendarCheck className="w-4 h-4" /> {t('home.ctaDemo')}
                </Button>
                <Link to={pricingHref}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary font-semibold px-8 gap-2"
                  >
                    {t('home.ctaPricing')} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-center md:text-left text-sm">{t('home.footerRights', { year: new Date().getFullYear() })}</div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link to={pricingHref} className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t('home.footerPricing')}</Link>
              <span className="text-border">|</span>
              <a href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t('home.footerTerms')}</a>
              <span className="text-border">|</span>
              <a href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t('home.footerPrivacy')}</a>
              <span className="text-border">|</span>
              <span className="text-muted-foreground text-sm">{t('home.footerTagline')}</span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

/* FAQ Accordion */
const FAQSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    qKey: `home.faq${n}Q`,
    aKey: `home.faq${n}A`,
  }));

  return (
    <section id="faq" className="py-20 px-4 bg-card/50">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.faqTitle')}</h2>
          <p className="text-muted-foreground text-lg">{t('home.faqSubtitle')}</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.qKey}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: i * 0.05 } } }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full bg-card border border-border rounded-xl p-5 text-left flex items-center justify-between gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-medium">{t(faq.qKey)}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="bg-card border border-t-0 border-border rounded-b-xl px-5 pb-5 pt-2 -mt-2">
                  <p className="text-muted-foreground text-sm pl-8">{t(faq.aKey)}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViralClicker;
