
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/logo';
import PricingSection from '@/components/clickcrm/pricing-section';
import WhatsAppButton from '@/components/clickcrm/whatsapp-button';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import {
  FileText, GitBranch, MessageCircle, Play, ArrowRight,
  CheckCircle2, Wrench, Shield, Building2, Sun, Hammer, Plug,
  HelpCircle, ChevronDown, BarChart3, CalendarCheck, Settings, Rocket
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ViralClicker = () => {
  const { t } = useTranslation();

  const productCards = [
    { icon: FileText, titleKey: 'home.productQuoteTitle', descKey: 'home.productQuoteDesc', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: GitBranch, titleKey: 'home.productCrmTitle', descKey: 'home.productCrmDesc', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: MessageCircle, titleKey: 'home.productWhatsappTitle', descKey: 'home.productWhatsappDesc', color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  const howSteps = [
    { step: '1', titleKey: 'home.howStep1', icon: FileText },
    { step: '2', titleKey: 'home.howStep2', icon: Rocket },
    { step: '3', titleKey: 'home.howStep3', icon: GitBranch },
    { step: '4', titleKey: 'home.howStep4', icon: MessageCircle },
  ];

  const useCases = [
    { icon: Wrench, labelKey: 'home.useCase1' },
    { icon: Hammer, labelKey: 'home.useCase2' },
    { icon: Shield, labelKey: 'home.useCase3' },
    { icon: Building2, labelKey: 'home.useCase4' },
    { icon: Settings, labelKey: 'home.useCase5' },
    { icon: Sun, labelKey: 'home.useCase6' },
    { icon: Plug, labelKey: 'home.useCase7' },
    { icon: BarChart3, labelKey: 'home.useCase8' },
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
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              size="sm"
            >
              {t('home.navGetStarted')}
            </Button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
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
                <span className="text-primary">{t('home.heroTitle2')}</span> {t('home.heroTitle3')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                {t('home.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2"
                  onClick={() => window.open('https://wa.me/13051234567?text=Hi,%20I%27d%20like%20a%20demo%20of%20ViralClicker', '_blank')}
                >
                  <Play className="w-4 h-4" /> {t('home.heroDemo')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary font-semibold px-8 gap-2"
                  onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('home.heroPricing')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — PRODUCT OVERVIEW */}
        <section id="product" className="py-20 px-4 bg-card/50">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.productTitle')}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('home.productSubtitle')}</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {productCards.map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}
                  className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors"
                >
                  <div className={`${item.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.howTitle')}</h2>
              <p className="text-muted-foreground text-lg">{t('home.howSubtitle')}</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {howSteps.map((item, i) => (
                <motion.div
                  key={i}
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
                  <h3 className="font-semibold text-sm md:text-base">{t(item.titleKey)}</h3>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t border-dashed border-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — USE CASES */}
        <section className="py-20 px-4 bg-card/50">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.useCasesTitle')}</h2>
              <p className="text-muted-foreground text-lg">{t('home.useCasesSubtitle')}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {useCases.map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-center">{t(item.labelKey)}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 5 — CASE STUDY */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <span className="inline-block bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1 text-sm font-medium mb-4">
                  {t('home.caseBadge')}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('home.caseTitle')}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  {t('home.caseDesc')}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {caseMetrics.map((item, i) => (
                  <div key={i} className="bg-secondary/50 border border-border rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{t(item.metricKey)}</div>
                    <div className="text-sm font-medium mb-2">{t(item.labelKey)}</div>
                    <div className="text-xs text-muted-foreground">{t('home.caseBefore')} {t(item.beforeKey)}</div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-muted-foreground italic text-sm">
                  "{t('home.caseQuote')}"
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6 — PRICING (existing component) */}
        <PricingSection />

        {/* SECTION 7 — IMPLEMENTATION */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.implTitle')}</h2>
              <p className="text-muted-foreground text-lg">{t('home.implSubtitle')}</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {implSteps.map((item, i) => (
                <motion.div
                  key={i}
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

        {/* SECTION 8 — FAQ */}
        <FAQSection />

        {/* SECTION 9 — FINAL CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.ctaTitle')}</h2>
              <p className="text-muted-foreground text-lg mb-8">{t('home.ctaSubtitle')}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2"
                  onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('home.ctaPricing')} <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary font-semibold px-8 gap-2"
                  onClick={() => window.open('https://wa.me/13051234567?text=Hi,%20I%27d%20like%20to%20book%20a%20demo', '_blank')}
                >
                  <CalendarCheck className="w-4 h-4" /> {t('home.ctaDemo')}
                </Button>
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
            <div className="flex items-center gap-4">
              <a href="/terminos" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t('home.footerTerms')}</a>
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

  const faqs = [
    { qKey: 'home.faq1Q', aKey: 'home.faq1A' },
    { qKey: 'home.faq2Q', aKey: 'home.faq2A' },
    { qKey: 'home.faq3Q', aKey: 'home.faq3A' },
    { qKey: 'home.faq4Q', aKey: 'home.faq4A' },
    { qKey: 'home.faq5Q', aKey: 'home.faq5A' },
    { qKey: 'home.faq6Q', aKey: 'home.faq6A' },
  ];

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
              key={i}
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
