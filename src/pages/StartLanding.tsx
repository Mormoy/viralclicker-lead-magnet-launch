import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Calendar, ArrowRight, MessageCircle, FileText, Zap, Users,
  CheckCircle, ChevronRight, Globe, BarChart3, Bot, Wrench, Shield,
  Home, Sun, HelpCircle, Settings, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import PricingSection from '@/components/clickcrm/pricing-section';

const BASE_CALENDLY_URL = 'https://calendly.com/atacamacortinas/onbording-viralclicker';

const useUtmParams = () => {
  const [searchParams] = useSearchParams();
  return useMemo(() => {
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const params = new URLSearchParams();
    utmKeys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) params.set(key, val);
    });
    return params.toString();
  }, [searchParams]);
};

const useCalendlyUrl = () => {
  const utmString = useUtmParams();
  return utmString ? `${BASE_CALENDLY_URL}?${utmString}` : BASE_CALENDLY_URL;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Top Bar ─── */
const TopBar = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === 'es' ? 'ES' : 'EN';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-primary font-bold text-2xl">Viral</span>
          <span className="text-foreground font-bold text-2xl">Clicker</span>
        </a>
        <div className="flex items-center gap-3">
          <a href="#pricing" className="hidden md:inline-block text-muted-foreground hover:text-foreground text-sm transition-colors">
            {t('saas.navPricing')}
          </a>
          <a href="#faq" className="hidden md:inline-block text-muted-foreground hover:text-foreground text-sm transition-colors">
            {t('saas.navFaq')}
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLang}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem onClick={() => changeLanguage('es')} className={`cursor-pointer ${i18n.language === 'es' ? 'text-primary' : 'text-foreground'}`}>
                🇪🇸 Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className={`cursor-pointer ${i18n.language === 'en' ? 'text-primary' : 'text-foreground'}`}>
                🇺🇸 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

/* ─── SECTION 1: HERO ─── */
const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <motion.div className="relative z-10 max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-medium">{t('saas.badge')}</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
          {t('saas.heroTitle')}{' '}
          <span className="text-primary">{t('saas.heroTitleHighlight')}</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('saas.heroSubtitle')}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base md:text-lg rounded-xl font-semibold shadow-[0_0_30px_hsl(25_100%_50%/0.3)]">
            <a href="#video-demo" data-cta="watch-demo">
              <Play className="w-5 h-5 mr-2" />
              {t('saas.watchDemo')}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-6 text-base md:text-lg rounded-xl font-semibold">
            <a href="#pricing" data-cta="view-pricing">
              {t('saas.viewPricing')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
          {[t('saas.trustNoTech'), t('saas.trustSetup'), t('saas.trustCancel')].map((txt) => (
            <span key={txt} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              {txt}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── VIDEO DEMO ─── */
const VideoSection = () => {
  const { t } = useTranslation();
  return (
    <section id="video-demo" className="py-16 md:py-24 px-4 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('saas.videoTitle')} <span className="text-primary">{t('saas.videoTitleHighlight')}</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="relative mt-8 rounded-2xl overflow-hidden border border-border bg-card aspect-video flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <p className="text-muted-foreground text-sm">{t('saas.videoPlay')}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 2: PRODUCT OVERVIEW ─── */
const ProductOverview = () => {
  const { t } = useTranslation();
  const features = [
    { icon: FileText, title: t('saas.feat1Title'), desc: t('saas.feat1Desc') },
    { icon: BarChart3, title: t('saas.feat2Title'), desc: t('saas.feat2Desc') },
    { icon: MessageCircle, title: t('saas.feat3Title'), desc: t('saas.feat3Desc') },
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('saas.overviewTitle')} <span className="text-primary">{t('saas.overviewTitleHighlight')}</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/40 transition-colors group">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-foreground font-semibold text-xl mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 3: HOW IT WORKS ─── */
const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    { icon: Users, title: t('saas.howStep1'), step: '01' },
    { icon: FileText, title: t('saas.howStep2'), step: '02' },
    { icon: BarChart3, title: t('saas.howStep3'), step: '03' },
    { icon: Bot, title: t('saas.howStep4'), step: '04' },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-5xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t('saas.howTitle')} <span className="text-primary">{t('saas.howTitleHighlight')}</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-14 max-w-xl mx-auto">
          {t('saas.howSubtitle')}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={fadeUp} className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors h-full">
                <span className="text-primary/20 text-5xl font-black absolute top-4 right-4">{s.step}</span>
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-foreground font-medium text-sm">{s.title}</p>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary/30 w-6 h-6 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 4: USE CASES ─── */
const UseCases = () => {
  const { t } = useTranslation();
  const industries = [
    { icon: Wrench, label: t('saas.useCase1') },
    { icon: Home, label: t('saas.useCase2') },
    { icon: Shield, label: t('saas.useCase3') },
    { icon: Home, label: t('saas.useCase4') },
    { icon: Wrench, label: t('saas.useCase5') },
    { icon: Sun, label: t('saas.useCase6') },
    { icon: Users, label: t('saas.useCase7') },
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t('saas.useCasesTitle')}{' '}
          <span className="text-primary">{t('saas.useCasesTitleHighlight')}</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          {t('saas.useCasesSubtitle')}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
          {industries.map((ind) => (
            <span key={ind.label} className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-3 text-sm text-foreground hover:border-primary/40 transition-colors">
              <ind.icon className="w-4 h-4 text-primary" />
              {ind.label}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 5: CASE STUDY ─── */
const CaseStudy = () => {
  const { t } = useTranslation();
  const metrics = [
    { metric: t('saas.caseMetric1'), label: t('saas.caseLabel1') },
    { metric: t('saas.caseMetric2'), label: t('saas.caseLabel2') },
    { metric: t('saas.caseMetric3'), label: t('saas.caseLabel3') },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('saas.caseStudyTitle')} <span className="text-primary">{t('saas.caseStudyTitleHighlight')}</span>
          </h2>
        </motion.div>
        <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-8 md:p-12">
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-10">
            {t('saas.caseStudyDesc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {metrics.map((item) => (
              <div key={item.label} className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{item.metric}</p>
                <p className="text-muted-foreground text-sm mt-2">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm italic">{t('saas.caseNote')}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 6: PRICING — uses existing component ─── */
const PricingWrapper = () => (
  <div id="pricing">
    <PricingSection />
  </div>
);

/* ─── SECTION 7: IMPLEMENTATION ─── */
const Implementation = () => {
  const { t } = useTranslation();
  const steps = [
    { title: t('saas.implStep1Title'), desc: t('saas.implStep1Desc') },
    { title: t('saas.implStep2Title'), desc: t('saas.implStep2Desc') },
    { title: t('saas.implStep3Title'), desc: t('saas.implStep3Desc') },
    { title: t('saas.implStep4Title'), desc: t('saas.implStep4Desc') },
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('saas.implTitle')} <span className="text-primary">{t('saas.implTitleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            {t('saas.implSubtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="flex gap-4 bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{i + 1}</span>
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-base mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 8: FAQ ─── */
const FaqSection = () => {
  const { t } = useTranslation();
  const faqs = [
    { q: t('saas.faq1Q'), a: t('saas.faq1A') },
    { q: t('saas.faq2Q'), a: t('saas.faq2A') },
    { q: t('saas.faq3Q'), a: t('saas.faq3A') },
    { q: t('saas.faq4Q'), a: t('saas.faq4A') },
    { q: t('saas.faq5Q'), a: t('saas.faq5A') },
    { q: t('saas.faq6Q'), a: t('saas.faq6A') },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('saas.faqTitle')} <span className="text-primary">{t('saas.faqTitleHighlight')}</span>
          </h2>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Accordion type="multiple" defaultValue={['item-0']} className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-foreground hover:text-primary text-left py-5 text-base font-medium gap-4">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pt-0 text-sm leading-relaxed pl-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 9: FINAL CTA ─── */
const FinalCtaSection = ({ calendlyUrl }: { calendlyUrl: string }) => {
  const { t } = useTranslation();
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          {t('saas.finalTitle')} <span className="text-primary">{t('saas.finalTitleHighlight')}</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
          {t('saas.finalSubtitle')}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base md:text-lg rounded-xl font-semibold shadow-[0_0_30px_hsl(25_100%_50%/0.3)]">
            <a href="#pricing" data-cta="view-pricing-final">
              {t('saas.viewPricing')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-6 text-base md:text-lg rounded-xl font-semibold">
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" data-cta="book-demo-final">
              <Calendar className="w-5 h-5 mr-2" />
              {t('saas.bookDemo')}
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── FLOATING CTA (mobile) ─── */
const FloatingCta = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent md:hidden">
      <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold rounded-xl shadow-[0_0_30px_hsl(25_100%_50%/0.4)]">
        <a href="#pricing" data-cta="view-pricing-floating">
          {t('saas.viewPricing')}
          <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </Button>
    </div>
  );
};

/* ─── PAGE ─── */
const StartLanding = () => {
  const calendlyUrl = useCalendlyUrl();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <HeroSection />
      <VideoSection />
      <ProductOverview />
      <HowItWorks />
      <UseCases />
      <CaseStudy />
      <PricingWrapper />
      <Implementation />
      <FaqSection />
      <FinalCtaSection calendlyUrl={calendlyUrl} />
      <FloatingCta />
      <footer className="py-8 text-center border-t border-border">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} <span className="text-foreground font-medium">Mormoy LLC</span> · ViralClicker
        </p>
      </footer>
    </div>
  );
};

export default StartLanding;
