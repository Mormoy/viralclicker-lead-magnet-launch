import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Calendar, ArrowRight, MessageCircle, FileText, Zap, Users,
  CheckCircle, ChevronRight, Globe, BarChart3, Bot, Wrench, Shield,
  Home, Sun, HelpCircle, Clock, Settings, Send
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
  const { i18n } = useTranslation();
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
            Pricing
          </a>
          <a href="#faq" className="hidden md:inline-block text-muted-foreground hover:text-foreground text-sm transition-colors">
            FAQ
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
const HeroSection = ({ calendlyUrl }: { calendlyUrl: string }) => (
  <section className="relative min-h-[85vh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
    <motion.div className="relative z-10 max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-primary text-sm font-medium">Quote-to-Sale CRM for Service Businesses</span>
      </motion.div>

      <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
        Send quotes, follow up automatically and{' '}
        <span className="text-primary">close more sales on WhatsApp.</span>
      </motion.h1>

      <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        ViralClicker is the CRM built for service businesses that sell through quotes.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base md:text-lg rounded-xl font-semibold shadow-[0_0_30px_hsl(25_100%_50%/0.3)]">
          <a href="#video-demo" data-cta="watch-demo">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-6 text-base md:text-lg rounded-xl font-semibold">
          <a href="#pricing" data-cta="view-pricing">
            View Pricing
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
        {['No technical skills needed', 'Setup in 7 days', 'Cancel anytime'].map((txt) => (
          <span key={txt} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
            {txt}
          </span>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

/* ─── SECTION 2: PRODUCT OVERVIEW ─── */
const ProductOverview = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Quote System',
      desc: 'Generate live quotes with a unique link customers can review and approve.',
    },
    {
      icon: BarChart3,
      title: 'CRM Pipeline',
      desc: 'Track every opportunity from new lead to closed sale.',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Automation',
      desc: 'Follow up automatically and keep leads engaged until they convert.',
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The complete <span className="text-primary">Quote-to-Sale</span> system
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
  const steps = [
    { icon: Users, title: 'Customer requests quote', step: '01' },
    { icon: FileText, title: 'Smart quote generated', step: '02' },
    { icon: BarChart3, title: 'Lead enters CRM pipeline', step: '03' },
    { icon: Bot, title: 'Follow-up closes the deal on WhatsApp', step: '04' },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-5xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          How it <span className="text-primary">works</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-14 max-w-xl mx-auto">
          From quote request to closed deal — fully automated.
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
  const industries = [
    { icon: Wrench, label: 'Installers' },
    { icon: Home, label: 'Contractors' },
    { icon: Shield, label: 'Security companies' },
    { icon: Home, label: 'Construction businesses' },
    { icon: Wrench, label: 'Repair services' },
    { icon: Sun, label: 'Solar installers' },
    { icon: Users, label: 'Service providers' },
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Perfect for businesses that{' '}
          <span className="text-primary">sell through quotes</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          If your sales process starts with a quote, ViralClicker is built for you.
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
const CaseStudy = () => (
  <section className="py-20 md:py-28 px-4 bg-card/50">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
      <motion.div variants={fadeUp} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Real Business <span className="text-primary">Example</span>
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-8 md:p-12">
        <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-10">
          See how a service business organized its quotes and follow-up process using ViralClicker.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { metric: '-80%', label: 'Response time' },
            { metric: '+35%', label: 'Close rate' },
            { metric: '18h', label: 'Saved per week' },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
              <p className="text-3xl md:text-4xl font-extrabold text-primary">{item.metric}</p>
              <p className="text-muted-foreground text-sm mt-2">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground text-sm italic">
            Case study details coming soon. These metrics represent typical results from early adopters.
          </p>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

/* ─── SECTION 6: PRICING — uses existing component ─── */
const PricingWrapper = () => (
  <div id="pricing">
    <PricingSection />
  </div>
);

/* ─── SECTION 7: IMPLEMENTATION ─── */
const Implementation = () => {
  const steps = [
    { icon: CheckCircle, title: 'Choose your plan', desc: 'Pick the plan that fits your business needs.' },
    { icon: Calendar, title: 'Schedule setup session', desc: 'Book a 1-on-1 onboarding call with our team.' },
    { icon: Settings, title: 'We configure your quote funnel', desc: 'We set up your quote page, CRM, and WhatsApp automation.' },
    { icon: Send, title: 'Start receiving and managing quotes', desc: 'Go live and start converting leads into sales.' },
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Setup and <span className="text-primary">onboarding</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            We handle everything. You just pick a plan and show up.
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
  const faqs = [
    {
      q: 'Do I need technical knowledge?',
      a: 'No. We handle the entire setup — quote page design, CRM configuration, and WhatsApp integration. You just use the system.',
    },
    {
      q: 'How long does setup take?',
      a: 'Setup takes 7 business days. We only need your logo, brand colors, product/service list with pricing, and access to your WhatsApp number.',
    },
    {
      q: 'Does it work with WhatsApp Business?',
      a: 'Yes. ViralClicker integrates with WhatsApp Business API via Twilio, enabling automated messages, approved templates, and delivery tracking.',
    },
    {
      q: 'Can I customize the quote system?',
      a: 'Absolutely. You can customize fields, pricing models (fixed, variable, formula-based), add extras, and create multiple quote pages for different services.',
    },
    {
      q: 'Is Stripe used for payments?',
      a: 'Yes. All subscription payments are processed securely through Stripe. You can pay monthly or annually with significant savings.',
    },
    {
      q: 'Can my team use the CRM?',
      a: 'Yes. The Pro and Elite plans support team access with role-based permissions so multiple team members can manage leads and quotes.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 px-4 bg-card/50">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently asked <span className="text-primary">questions</span>
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
const FinalCtaSection = ({ calendlyUrl }: { calendlyUrl: string }) => (
  <section className="py-24 md:py-32 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative z-10 max-w-2xl mx-auto text-center">
      <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4">
        Start organizing your quotes <span className="text-primary">today</span>
      </motion.h2>

      <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
        Join service businesses that close more deals with ViralClicker.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base md:text-lg rounded-xl font-semibold shadow-[0_0_30px_hsl(25_100%_50%/0.3)]">
          <a href="#pricing" data-cta="view-pricing-final">
            View Pricing
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-6 text-base md:text-lg rounded-xl font-semibold">
          <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" data-cta="book-demo-final">
            <Calendar className="w-5 h-5 mr-2" />
            Book Demo
          </a>
        </Button>
      </motion.div>
    </motion.div>
  </section>
);

/* ─── VIDEO DEMO (kept minimal) ─── */
const VideoSection = () => (
  <section id="video-demo" className="py-16 md:py-24 px-4 bg-card/50">
    <div className="max-w-4xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          See it in <span className="text-primary">action</span>
        </motion.h2>

        <motion.div variants={fadeUp} className="relative mt-8 rounded-2xl overflow-hidden border border-border bg-card aspect-video flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-primary ml-1" />
            </div>
            <p className="text-muted-foreground text-sm">Watch a 2-minute demo</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── FLOATING CTA (mobile) ─── */
const FloatingCta = ({ calendlyUrl }: { calendlyUrl: string }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent md:hidden">
    <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold rounded-xl shadow-[0_0_30px_hsl(25_100%_50%/0.4)]">
      <a href="#pricing" data-cta="view-pricing-floating">
        View Pricing
        <ArrowRight className="w-5 h-5 ml-2" />
      </a>
    </Button>
  </div>
);

/* ─── PAGE ─── */
const StartLanding = () => {
  const calendlyUrl = useCalendlyUrl();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <HeroSection calendlyUrl={calendlyUrl} />
      <VideoSection />
      <ProductOverview />
      <HowItWorks />
      <UseCases />
      <CaseStudy />
      <PricingWrapper />
      <Implementation />
      <FaqSection />
      <FinalCtaSection calendlyUrl={calendlyUrl} />
      <FloatingCta calendlyUrl={calendlyUrl} />
      <footer className="py-8 text-center border-t border-border">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} <span className="text-foreground font-medium">Mormoy LLC</span> · ViralClicker
        </p>
      </footer>
    </div>
  );
};

export default StartLanding;
