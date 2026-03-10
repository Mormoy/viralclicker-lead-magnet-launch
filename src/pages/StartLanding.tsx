import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, ArrowRight, Clock, MessageCircle, FileText, Zap, Users, CheckCircle, AlertTriangle, Search, Bot, Wrench, Shield, Home, Sun, ChevronRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const BASE_CALENDLY_URL = 'https://calendly.com/atacamacortinas/onbording-viralclicker';
const MAIN_SITE_URL = '/';

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
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── Countdown Timer ─── */
const CountdownBlock = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-2">
      {[
        { label: 'HRS', value: pad(timeLeft.hours) },
        { label: 'MIN', value: pad(timeLeft.minutes) },
        { label: 'SEC', value: pad(timeLeft.seconds) },
      ].map((unit, i) => (
        <React.Fragment key={unit.label}>
          {i > 0 && <span className="text-primary text-3xl font-bold">:</span>}
          <div className="bg-card border border-border rounded-xl px-4 py-3 min-w-[72px] text-center">
            <span className="text-primary text-3xl md:text-4xl font-bold font-mono">{unit.value}</span>
            <p className="text-muted-foreground text-[10px] uppercase tracking-widest mt-1">{unit.label}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

/* ─── Calendly URL Context ─── */
const CalendlyContext = React.createContext(BASE_CALENDLY_URL);

/* ─── CTA Button ─── */
const CtaButton = ({ children, secondary = false, className = '' }: { children: React.ReactNode; secondary?: boolean; className?: string }) => {
  const calendlyUrl = React.useContext(CalendlyContext);
  return (
    <Button
      asChild
      size="lg"
      variant={secondary ? 'outline' : 'default'}
      className={`text-base md:text-lg px-8 py-6 rounded-xl font-semibold ${
        secondary
          ? 'border-primary/40 text-primary hover:bg-primary/10'
          : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_hsl(25_100%_50%/0.35)]'
      } ${className}`}
    >
      <a
        href={secondary ? '#video-demo' : calendlyUrl}
        target={secondary ? '_self' : '_blank'}
        rel="noopener noreferrer"
        data-cta={secondary ? 'see-how-it-works' : 'book-demo'}
      >
        {children}
      </a>
    </Button>
  );
};

/* ─── Top Bar with Logo + Language Switcher ─── */
const TopBar = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === 'es' ? 'ES' : 'EN';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-primary font-bold text-2xl">Viral</span>
          <span className="text-foreground font-bold text-2xl">Clicker</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{currentLang}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem
              onClick={() => changeLanguage('es')}
              className={`cursor-pointer ${i18n.language === 'es' ? 'text-primary' : 'text-foreground'}`}
            >
              🇪🇸 Español
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage('en')}
              className={`cursor-pointer ${i18n.language === 'en' ? 'text-primary' : 'text-foreground'}`}
            >
              🇺🇸 English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

/* ─── HERO ─── */
const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <motion.div className="relative z-10 max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-medium">{t('startLanding.badge')}</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
          {t('startLanding.heroTitle1')}{' '}
          <span className="text-primary">{t('startLanding.heroTitle2')}</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          {t('startLanding.heroSubtitle')}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
          {[t('startLanding.trustSetup'), t('startLanding.trustBuilt'), t('startLanding.trustNoCRM')].map((txt) => (
            <span key={txt} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              {txt}
            </span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CtaButton>
            <Calendar className="w-5 h-5 mr-2" />
            {t('startLanding.bookDemo')}
          </CtaButton>
          <CtaButton secondary>
            <Play className="w-5 h-5 mr-2" />
            {t('startLanding.seeHow')}
          </CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── VIDEO DEMO ─── */
const VideoSection = () => {
  const { t } = useTranslation();
  return (
    <section id="video-demo" className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('startLanding.videoTitle1')} <span className="text-primary">{t('startLanding.videoTitle2')}</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="relative mt-8 rounded-2xl overflow-hidden border border-border bg-card aspect-video flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <p className="text-muted-foreground text-sm">{t('startLanding.videoPlay')}</p>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-muted-foreground max-w-lg mx-auto">
            {t('startLanding.videoDesc')}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <CtaButton>
              <Calendar className="w-5 h-5 mr-2" />
              {t('startLanding.bookDemo')}
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── OFFER ─── */
const OfferSection = () => {
  const { t } = useTranslation();
  const items = [
    t('startLanding.offerItem1'),
    t('startLanding.offerItem2'),
    t('startLanding.offerItem3'),
    t('startLanding.offerItem4'),
    t('startLanding.offerItem5'),
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/5 to-card p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
              {t('startLanding.offerBadge')}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('startLanding.offerTitle')}
            </h2>

            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              {t('startLanding.offerDesc')} <span className="text-primary font-semibold">{t('startLanding.offerDays')}</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-10 text-left">
              {items.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            <CountdownBlock />

            <p className="mt-6 text-sm text-primary/80 font-medium flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              {t('startLanding.offerUrgency')}
            </p>

            <div className="mt-8">
              <CtaButton>
                <Calendar className="w-5 h-5 mr-2" />
                {t('startLanding.bookDemo')}
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── PROBLEM ─── */
const ProblemSection = () => {
  const { t } = useTranslation();
  const problems = [
    { icon: AlertTriangle, title: t('startLanding.problem1Title'), desc: t('startLanding.problem1Desc') },
    { icon: Search, title: t('startLanding.problem2Title'), desc: t('startLanding.problem2Desc') },
    { icon: MessageCircle, title: t('startLanding.problem3Title'), desc: t('startLanding.problem3Desc') },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-5xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('startLanding.problemTitle1')} <span className="text-primary">{t('startLanding.problemTitle2')}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <motion.div key={p.title} variants={fadeUp} className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/40 transition-colors">
              <div className="w-14 h-14 mx-auto rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                <p.icon className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-foreground font-semibold text-xl mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── SOLUTION ─── */
const SolutionSection = () => {
  const { t } = useTranslation();
  const steps = [
    { icon: Users, title: t('startLanding.step1'), step: '01' },
    { icon: FileText, title: t('startLanding.step2'), step: '02' },
    { icon: Zap, title: t('startLanding.step3'), step: '03' },
    { icon: Bot, title: t('startLanding.step4'), step: '04' },
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-5xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t('startLanding.solutionTitle1')} <span className="text-primary">{t('startLanding.solutionTitle2')}</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={fadeUp} className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors h-full">
                <span className="text-primary/30 text-5xl font-black absolute top-4 right-4">{s.step}</span>
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

/* ─── WHO IT'S FOR ─── */
const ForWhoSection = () => {
  const { t } = useTranslation();
  const industries = [
    { icon: Wrench, label: t('startLanding.ind1') },
    { icon: Home, label: t('startLanding.ind2') },
    { icon: Shield, label: t('startLanding.ind3') },
    { icon: Home, label: t('startLanding.ind4') },
    { icon: Home, label: t('startLanding.ind5') },
    { icon: Wrench, label: t('startLanding.ind6') },
    { icon: Sun, label: t('startLanding.ind7') },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-10">
          {t('startLanding.forWhoTitle1')} <span className="text-primary">{t('startLanding.forWhoTitle2')}</span>
        </motion.h2>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-10">
          {industries.map((ind) => (
            <span key={ind.label} className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 text-sm text-foreground">
              <ind.icon className="w-4 h-4 text-primary" />
              {ind.label}
            </span>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
          {t('startLanding.forWhoDesc1')}{' '}
          <span className="text-primary font-semibold">{t('startLanding.forWhoDesc2')}</span>
        </motion.p>
      </motion.div>
    </section>
  );
};

/* ─── FINAL CTA ─── */
const FinalCta = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          {t('startLanding.finalTitle1')} <span className="text-primary">{t('startLanding.finalTitle2')}</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
          {t('startLanding.finalDesc')}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CtaButton>
            <Calendar className="w-5 h-5 mr-2" />
            {t('startLanding.bookDemo')}
          </CtaButton>
          <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground text-base px-8 py-6">
            <a href={MAIN_SITE_URL}>
              {t('startLanding.visitSite')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── Floating CTA (mobile) ─── */
const FloatingCta = () => {
  const calendlyUrl = React.useContext(CalendlyContext);
  const { t } = useTranslation();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent md:hidden">
      <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold rounded-xl shadow-[0_0_30px_hsl(25_100%_50%/0.4)]">
        <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" data-cta="book-demo-floating">
          <Calendar className="w-5 h-5 mr-2" />
          {t('startLanding.bookDemo')}
        </a>
      </Button>
    </div>
  );
};

/* ─── PAGE ─── */
const StartLanding = () => {
  const calendlyUrl = useCalendlyUrl();
  const { t } = useTranslation();
  return (
    <CalendlyContext.Provider value={calendlyUrl}>
      <div className="min-h-screen bg-background text-foreground">
        <TopBar />
        <HeroSection />
        <VideoSection />
        <OfferSection />
        <ProblemSection />
        <SolutionSection />
        <ForWhoSection />
        <FinalCta />
        <FloatingCta />
        <footer className="py-8 text-center border-t border-border">
          <p className="text-muted-foreground text-xs">
            {t('startLanding.footer')} <span className="text-foreground font-medium">Mormoy LLC</span> · ViralClicker
          </p>
        </footer>
      </div>
    </CalendlyContext.Provider>
  );
};

export default StartLanding;
