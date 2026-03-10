import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Calendar, ArrowRight, MessageCircle, FileText, Zap, Users,
  CheckCircle, ChevronRight, BarChart3, Bot, Wrench, Shield,
  Home, Sun, Globe, Clock, AlertTriangle, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ─── Minimal Top Bar ─── */
const TopBar = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === 'es' ? 'ES' : 'EN';
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-primary font-bold text-xl">Viral</span>
          <span className="text-foreground font-bold text-xl">Clicker</span>
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 h-8">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{currentLang}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem onClick={() => changeLanguage('es')} className={`cursor-pointer text-sm ${i18n.language === 'es' ? 'text-primary' : 'text-foreground'}`}>
              🇪🇸 Español
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('en')} className={`cursor-pointer text-sm ${i18n.language === 'en' ? 'text-primary' : 'text-foreground'}`}>
              🇺🇸 English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

/* ─── SECTION 1: HERO ─── */
const HeroSection = ({ calendlyUrl }: { calendlyUrl: string }) => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-16 pb-12 overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <motion.div className="relative z-10 max-w-2xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-medium">{t('startLanding.badge')}</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
          {t('startLanding.heroTitle1')}{' '}
          <span className="text-primary">{t('startLanding.heroTitle2')}</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          {t('startLanding.heroSubtitle')}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base md:text-lg rounded-xl font-semibold shadow-[0_0_30px_hsl(25_100%_50%/0.3)]">
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" data-cta="book-demo-hero">
              <Calendar className="w-5 h-5 mr-2" />
              {t('startLanding.bookDemo')}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-6 text-base md:text-lg rounded-xl font-semibold">
            <a href="#video-demo" data-cta="see-how">
              <Play className="w-5 h-5 mr-2" />
              {t('startLanding.seeHow')}
            </a>
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-4">
          {[t('startLanding.trustSetup'), t('startLanding.trustBuilt'), t('startLanding.trustNoCRM')].map((txt) => (
            <span key={txt} className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
              {txt}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 2: VIDEO ─── */
const VideoSection = ({ calendlyUrl }: { calendlyUrl: string }) => {
  const { t } = useTranslation();
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://fast.wistia.net/player.js';
    script.async = true;
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <section id="video-demo" className="py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t('startLanding.videoTitle1')} <span className="text-primary">{t('startLanding.videoTitle2')}</span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="relative mt-4 rounded-2xl overflow-hidden border border-border bg-card aspect-video"
            ref={videoContainerRef}
            dangerouslySetInnerHTML={{
              __html: '<wistia-player media-id="sb3tom78nu" player-color="#f97316" style="width:100%;height:100%;display:block"></wistia-player>'
            }}
          />
          <motion.p variants={fadeUp} className="text-muted-foreground text-sm mt-4 max-w-md mx-auto">
            {t('startLanding.videoDesc')}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-5 text-base rounded-xl font-semibold shadow-[0_0_25px_hsl(25_100%_50%/0.3)]">
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" data-cta="book-demo-video">
                <Calendar className="w-5 h-5 mr-2" />
                {t('startLanding.bookDemo')}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SECTION 3: LIMITED OFFER + COUNTDOWN ─── */
const OfferSection = () => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const items = [
    t('startLanding.offerItem1'),
    t('startLanding.offerItem2'),
    t('startLanding.offerItem3'),
    t('startLanding.offerItem4'),
    t('startLanding.offerItem5'),
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-2xl mx-auto text-center">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-4 py-1.5 mb-5">
          <Clock className="w-4 h-4 text-destructive" />
          <span className="text-destructive text-sm font-semibold">{t('startLanding.offerBadge')}</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-foreground mb-3">
          {t('startLanding.offerTitle')}
        </motion.h2>

        <motion.p variants={fadeUp} className="text-muted-foreground text-base mb-6">
          {t('startLanding.offerDesc')} <span className="text-primary font-bold">{t('startLanding.offerDays')}</span>
        </motion.p>

        {/* Countdown */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-8">
          {[
            { val: pad(timeLeft.hours), label: 'HRS' },
            { val: pad(timeLeft.minutes), label: 'MIN' },
            { val: pad(timeLeft.seconds), label: 'SEC' },
          ].map((unit, i) => (
            <React.Fragment key={unit.label}>
              {i > 0 && <span className="text-primary font-bold text-2xl md:text-3xl">:</span>}
              <div className="bg-secondary border border-border rounded-xl px-4 py-3 min-w-[64px]">
                <span className="text-foreground font-extrabold text-2xl md:text-3xl block">{unit.val}</span>
                <span className="text-muted-foreground text-[10px] font-medium tracking-wider">{unit.label}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* What's included */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left max-w-md mx-auto mb-6">
          {items.map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              {item}
            </span>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} className="text-destructive/80 text-sm font-medium">
          ⚡ {t('startLanding.offerUrgency')}
        </motion.p>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 4: THE PROBLEM ─── */
const ProblemSection = () => {
  const { t } = useTranslation();
  const problems = [
    { icon: AlertTriangle, titleKey: 'startLanding.problem1Title', descKey: 'startLanding.problem1Desc' },
    { icon: XCircle, titleKey: 'startLanding.problem2Title', descKey: 'startLanding.problem2Desc' },
    { icon: MessageCircle, titleKey: 'startLanding.problem3Title', descKey: 'startLanding.problem3Desc' },
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-foreground text-center mb-3">
          {t('startLanding.problemTitle1')} <span className="text-destructive">{t('startLanding.problemTitle2')}</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {problems.map((p) => (
            <motion.div key={p.titleKey} variants={fadeUp} className="bg-card border border-destructive/20 rounded-2xl p-6 text-center hover:border-destructive/40 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                <p.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-foreground font-semibold text-lg mb-2">{t(p.titleKey)}</h3>
              <p className="text-muted-foreground text-sm">{t(p.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 5: THE SOLUTION ─── */
const SolutionSection = () => {
  const { t } = useTranslation();
  const steps = [
    { icon: Users, key: 'startLanding.step1', step: '01' },
    { icon: FileText, key: 'startLanding.step2', step: '02' },
    { icon: BarChart3, key: 'startLanding.step3', step: '03' },
    { icon: Bot, key: 'startLanding.step4', step: '04' },
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-foreground mb-10">
          {t('startLanding.solutionTitle1')} <span className="text-primary">{t('startLanding.solutionTitle2')}</span>
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={fadeUp} className="relative">
              <div className="bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/40 transition-colors h-full">
                <span className="text-primary/15 text-4xl font-black absolute top-3 right-3">{s.step}</span>
                <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium text-xs md:text-sm">{t(s.key)}</p>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-primary/30 w-5 h-5 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 6: WHO IT'S FOR ─── */
const ForWhoSection = () => {
  const { t } = useTranslation();
  const industries = [
    { icon: Wrench, key: 'startLanding.ind1' },
    { icon: Users, key: 'startLanding.ind2' },
    { icon: Shield, key: 'startLanding.ind3' },
    { icon: Home, key: 'startLanding.ind4' },
    { icon: Home, key: 'startLanding.ind5' },
    { icon: Wrench, key: 'startLanding.ind6' },
    { icon: Sun, key: 'startLanding.ind7' },
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-foreground mb-8">
          {t('startLanding.forWhoTitle1')} <span className="text-primary">{t('startLanding.forWhoTitle2')}</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-6">
          {industries.map((ind) => (
            <span key={ind.key} className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2.5 text-sm text-foreground hover:border-primary/40 transition-colors">
              <ind.icon className="w-4 h-4 text-primary" />
              {t(ind.key)}
            </span>
          ))}
        </motion.div>
        <motion.p variants={fadeUp} className="text-muted-foreground text-sm md:text-base">
          {t('startLanding.forWhoDesc1')} <span className="text-primary font-semibold">{t('startLanding.forWhoDesc2')}</span>
        </motion.p>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 7: FINAL CTA ─── */
const FinalCTA = ({ calendlyUrl }: { calendlyUrl: string }) => {
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-foreground mb-3">
          {t('startLanding.finalTitle1')} <span className="text-primary">{t('startLanding.finalTitle2')}</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
          {t('startLanding.finalDesc')}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base md:text-lg rounded-xl font-semibold shadow-[0_0_30px_hsl(25_100%_50%/0.3)]">
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" data-cta="book-demo-final">
              <Calendar className="w-5 h-5 mr-2" />
              {t('startLanding.bookDemo')}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border text-muted-foreground hover:text-foreground hover:bg-card px-8 py-6 text-base md:text-lg rounded-xl font-semibold">
            <a href="/" data-cta="visit-site">
              {t('startLanding.visitSite')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── FLOATING CTA (mobile) ─── */
const FloatingCta = ({ calendlyUrl }: { calendlyUrl: string }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-gradient-to-t from-background via-background to-transparent md:hidden">
      <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 text-base font-semibold rounded-xl shadow-[0_0_30px_hsl(25_100%_50%/0.4)]">
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <HeroSection calendlyUrl={calendlyUrl} />
      <VideoSection calendlyUrl={calendlyUrl} />
      <OfferSection />
      <ProblemSection />
      <SolutionSection />
      <ForWhoSection />
      <FinalCTA calendlyUrl={calendlyUrl} />
      <FloatingCta calendlyUrl={calendlyUrl} />
      <footer className="py-6 text-center border-t border-border pb-20 md:pb-6">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} <span className="text-foreground font-medium">ViralClicker</span> · {' '}
          <span className="text-muted-foreground">{t('startLanding.footer', 'Powered by')} Mormoy LLC</span>
        </p>
      </footer>
    </div>
  );
};

export default StartLanding;
