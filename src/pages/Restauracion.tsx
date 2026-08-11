import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ArrowRight, CalendarCheck, Check, ChevronDown, Globe, MessageCircle,
  Phone, Play, ShieldCheck,
} from 'lucide-react';
import RegistroForm from '@/components/restauracion/registro-form';
import { copy, type Lang } from '@/components/restauracion/copy';
import { CONTACT, waLink } from '@/config/site';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const reveal = { initial: 'hidden', whileInView: 'visible', viewport: { once: true }, variants: fadeUp } as const;

const META = {
  es: {
    title: 'ViralClicker — Restauración de daños y reclamaciones: quién contesta a las 9 PM',
    description:
      'Un agente con IA llama a cada cliente en menos de 2 minutos, evalúa el daño y agenda la inspección. Para empresas de restauración y reclamaciones de seguros en Florida.',
  },
  en: {
    title: 'ViralClicker — Restoration & claims: who answers at 9 PM',
    description:
      'An AI agent calls every customer in under 2 minutes, assesses the damage and books the inspection. For restoration and insurance-claims companies in Florida.',
  },
} as const;

/* ── Barra superior ── */
const TopBar = ({ lang, onToggleLang }: { lang: Lang; onToggleLang: () => void }) => {
  const c = copy(lang);
  return (
    <header className="sticky top-0 z-50 border-b border-vc-marron3/30 bg-vc-marron backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-black uppercase tracking-tight text-vc-crema">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-vc-naranja">
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </span>
          Viral<span className="text-vc-naranja">Clicker</span>
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="#registro"
            className="hidden rounded-lg bg-vc-naranja px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-vc-quemado sm:inline-block"
            data-cta="nav-demo"
          >
            {c.nav.demo}
          </a>
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 border-2 border-vc-marron4 px-3 py-1.5 font-mono text-xs font-bold text-vc-arena transition hover:border-vc-amarillo hover:text-vc-amarillo"
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            <Globe className="h-3.5 w-3.5" /> {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>
      {/* La franja de peligro también acá: es lo que hace que las tres páginas
          se lean como el mismo sitio. */}
      <div aria-hidden className="h-3.5 w-full bg-franja-peligro" />
    </header>
  );
};

/* ── Tarjeta de llamada del hero ── */
const CallCard = ({ lang }: { lang: Lang }) => {
  const isEs = lang === 'es';
  const bubbles = isEs
    ? [
        { from: 'ai', text: 'Hola, le hablo de Restauración Bay Area. Vi que reportó daños por agua. ¿Hay agua acumulada ahora?' },
        { from: 'user', text: 'Sí, en la cocina y el pasillo. Empezó anoche.' },
        { from: 'ai', text: '¿Ya abrió el reclamo con su aseguradora? Puedo agendarle una inspección hoy a las 6 PM.' },
        { from: 'user', text: 'A las 6 me acomoda, sí.' },
      ]
    : [
        { from: 'ai', text: "Hi, this is Bay Area Restoration. I saw you reported water damage. Is there standing water right now?" },
        { from: 'user', text: 'Yes, in the kitchen and hallway. It started last night.' },
        { from: 'ai', text: 'Have you opened a claim with your insurer yet? I can book an inspection today at 6 PM.' },
        { from: 'user', text: '6 PM works for me, yes.' },
      ];

  return (
    <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-3xl border border-vc-marron3/30 bg-white text-left shadow-[0_12px_28px_rgba(16,24,40,.08)]">
      <div className="flex items-center gap-3 border-b border-vc-marron3/20 bg-white px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-vc-naranja to-vc-amarillo text-sm font-extrabold text-white">
          IA
        </div>
        <div>
          <div className="text-sm font-bold text-vc-tinta">
            {isEs ? 'Agente de voz · Restauración Bay Area' : 'Voice agent · Bay Area Restoration'}
          </div>
          <div className="text-xs text-vc-polvo">
            {isEs ? 'Llamando a un caso nuevo · Tampa, FL · 00:47' : 'Calling a new case · Tampa, FL · 00:47'}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          {isEs ? 'EN VIVO' : 'LIVE'}
        </div>
      </div>
      <div className="space-y-2 p-5">
        {bubbles.map((b) => (
          <div
            key={b.text}
            className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm ${
              b.from === 'ai'
                ? 'rounded-bl-sm bg-vc-amarillo/25 text-vc-marron'
                : 'ml-auto rounded-br-sm bg-vc-amarillo/25 text-vc-marron3'
            }`}
          >
            {b.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 border-t border-vc-marron3/20 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-700">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
        {isEs
          ? 'Inspección agendada · caso creado · confirmación por WhatsApp enviada'
          : 'Inspection booked · case created · WhatsApp confirmation sent'}
      </div>
    </div>
  );
};

const SectionHead = ({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) => (
  <motion.div {...reveal} className="mx-auto mb-12 max-w-2xl text-center">
    {kicker && (
      <div className="mb-3 text-xs font-bold uppercase tracking-[1.2px] text-vc-quemado">{kicker}</div>
    )}
    <h2 className="font-display font-black uppercase leading-none text-4xl leading-tight tracking-tight text-vc-tinta md:text-[38px]">{title}</h2>
    {subtitle && <p className="mt-3 text-lg text-vc-marron3">{subtitle}</p>}
  </motion.div>
);

/* ── Página ── */
const Restauracion = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Lang>(i18n.language === 'en' ? 'en' : 'es');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const c = copy(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', META[lang].description);
  }, [lang]);

  const toggleLang = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
    i18n.changeLanguage(next);
  };

  return (
    <div className="min-h-screen bg-vc-crema font-body text-vc-tinta antialiased">
      <TopBar lang={lang} onToggleLang={toggleLang} />

      {/* 1 — HERO */}
      <header className="px-5 pb-10 pt-16 text-center md:pt-20">
        <div className="mx-auto max-w-4xl">
          <motion.span
            {...reveal}
            className="mb-6 inline-block rounded-full border border-vc-marron3/30 bg-white px-4 py-1.5 text-[13px] font-semibold text-vc-marron3"
          >
            {c.hero.badge}
          </motion.span>
          <motion.h1 {...reveal} className="mx-auto max-w-4xl font-display text-[2.75rem] font-black uppercase leading-[0.98] tracking-[0.01em] md:text-[4.25rem]">
            {c.hero.title1}
            <br />
            <span className="text-vc-naranja">{c.hero.title2}</span>
          </motion.h1>
          <motion.p {...reveal} className="mx-auto mt-6 max-w-2xl text-lg text-vc-marron3">
            {c.hero.lead}
          </motion.p>
          <motion.div {...reveal} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="demo-hero"
              className="inline-flex items-center gap-2 rounded-xl bg-vc-naranja px-6 py-3.5 font-semibold text-white transition hover:bg-vc-quemado"
            >
              <Phone className="h-4 w-4" /> {c.hero.ctaPrimary}
            </a>
            <a
              href="#registro"
              className="inline-flex items-center gap-2 rounded-xl border border-vc-marron3/30 bg-white px-6 py-3.5 font-semibold text-vc-tinta transition hover:border-vc-marron"
            >
              {c.hero.ctaSecondary} <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
          <motion.div {...reveal} className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm text-vc-polvo">
            {c.hero.micro.map((m, i) => (
              <span key={m} className="flex items-center gap-3">
                {i > 0 && <span className="text-vc-arena">·</span>}
                {m}
              </span>
            ))}
          </motion.div>

          <motion.div {...reveal}>
            <CallCard lang={lang} />
          </motion.div>
        </div>
      </header>

      {/* 2 — EL PROBLEMA */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHead kicker={c.problem.kicker} title={c.problem.title} />
          <motion.div {...reveal} className="space-y-4 text-left text-lg text-vc-marron3 md:text-center">
            <p>{c.problem.p1}</p>
            <p>{c.problem.p2}</p>
          </motion.div>
        </div>
      </section>

      {/* 3 — LA CUENTA QUE DUELE */}
      <section className="border-y border-vc-marron bg-vc-amarillo/25 px-5 py-16">
        <motion.div {...reveal} className="mx-auto max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[1.2px] text-vc-quemado">{c.math.kicker}</div>
          <h2 className="mt-3 font-display font-black uppercase leading-none text-4xl tracking-tight text-vc-tinta md:text-[34px]">{c.math.title}</h2>
          <p className="mt-4 text-lg text-vc-marron3">{c.math.p1}</p>
          <p className="mt-4 text-xl font-bold text-vc-tinta">{c.math.punch}</p>
        </motion.div>
      </section>

      {/* 4 — LA SOLUCIÓN */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead kicker={c.solution.kicker} title={c.solution.title} />
          <div className="grid gap-5 md:grid-cols-2">
            {c.solution.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
                className="rounded-2xl border border-vc-marron3/30 bg-white/60 p-7"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-vc-amarillo/25 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-extrabold text-vc-tinta">{item.title}</h3>
                <p className="mt-2 text-vc-marron3">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — FORMULARIO #1 */}
      <section id="registro" className="border-y border-vc-marron3/30 bg-white px-5 py-16 scroll-mt-20">
        <motion.div {...reveal} className="mx-auto max-w-lg">
          <RegistroForm lang={lang} />
        </motion.div>
      </section>

      {/* 6 — ESPECÍFICO DEL RUBRO */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead kicker={c.niche.kicker} title={c.niche.title} />
          <motion.div {...reveal} className="mx-auto max-w-3xl space-y-4 text-lg text-vc-marron3">
            <p>{c.niche.p1}</p>
            <p>{c.niche.p2}</p>
          </motion.div>
          <motion.div {...reveal} className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {c.niche.questions.map((q) => (
              <span key={q} className="rounded-full border border-vc-marron bg-vc-amarillo/25 px-4 py-2 text-sm font-semibold text-vc-marron">
                {q}
              </span>
            ))}
          </motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {c.niche.audiences.map((a, i) => (
              <motion.div
                key={a.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
                className="rounded-2xl border border-vc-marron3/30 bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,.06)]"
              >
                <h3 className="text-lg font-extrabold text-vc-tinta">{a.title}</h3>
                <p className="mt-2 text-vc-marron3">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — VIDEO DEMO (placeholder hasta que Javier entregue el video) */}
      <section className="px-5 pb-4 pt-6">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHead kicker={c.video.kicker} title={c.video.title} />
          <motion.div
            {...reveal}
            className="relative mx-auto flex aspect-video max-w-3xl items-center justify-center overflow-hidden rounded-3xl border border-vc-marron3/30 bg-gradient-to-br from-vc-marron to-vc-marron3 shadow-[0_12px_28px_rgba(16,24,40,.08)]"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-vc-naranja/95 shadow-lg">
              <Play className="ml-1 h-8 w-8 text-white" fill="white" />
            </div>
            <span className="absolute bottom-5 left-5 rounded-full bg-black/55 px-4 py-1.5 text-xs font-bold text-white backdrop-blur">
              {c.video.placeholder}
            </span>
          </motion.div>
          <p className="mt-4 text-sm text-vc-marron3">{c.video.caption}</p>
        </div>
      </section>

      {/* 8 — CÓMO FUNCIONA */}
      <section className="mt-16 border-y border-vc-marron3/30 bg-white px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead kicker={c.steps.kicker} title={c.steps.title} />
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {c.steps.items.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
              >
                <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg bg-vc-naranja text-[15px] font-extrabold text-white">
                  {i + 1}
                </div>
                <h4 className="text-base font-extrabold text-vc-tinta">{step.title}</h4>
                <p className="mt-1.5 text-sm text-vc-marron3">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — CASO REAL */}
      <section className="px-5 py-20">
        <motion.div {...reveal} className="mx-auto grid max-w-5xl gap-10 rounded-3xl border border-vc-marron3/30 bg-white p-8 md:grid-cols-[1.1fr_.9fr] md:p-11">
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[1.2px] text-vc-quemado">{c.caseStudy.kicker}</div>
            <p className="text-xl font-extrabold leading-snug tracking-tight text-vc-tinta md:text-[22px]">
              {c.caseStudy.quote}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-vc-marron3">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-700">
                {c.caseStudy.badge}
              </span>
              {c.caseStudy.who}
            </div>
            <p className="mt-4 text-vc-marron3">{c.caseStudy.note}</p>
            <p className="mt-3 text-xs text-vc-polvo">{c.caseStudy.disclaimer}</p>
          </div>
          <div className="rounded-2xl border border-vc-marron3/30 bg-white p-6">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[1px] text-vc-polvo">
              {c.caseStudy.timelineTitle}
            </div>
            {c.caseStudy.timeline.map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-vc-marron3/20 py-3 text-[15px] last:border-0">
                <span className="text-vc-marron3">{row.label}</span>
                <b className={row.highlight ? 'text-emerald-600' : 'text-vc-naranja'}>{row.value}</b>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 10 — PRECIOS RESUMIDOS */}
      <section className="border-y border-vc-marron3/30 bg-white px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHead kicker={c.pricing.kicker} title={c.pricing.title} />
          <div className="grid gap-5 md:grid-cols-3">
            {c.pricing.plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
                className={`rounded-2xl border bg-white p-7 text-center ${
                  plan.popular ? 'border-vc-naranja shadow-[0_12px_28px_rgba(249,115,22,.15)]' : 'border-vc-marron3/30'
                }`}
              >
                <div className="text-sm font-extrabold text-vc-tinta">{plan.name}</div>
                <div className="mt-2 text-4xl font-extrabold tracking-tight text-vc-tinta">
                  {plan.price}
                  <span className="text-sm font-semibold text-vc-polvo">{c.pricing.perMonth}</span>
                </div>
                <p className="mt-2 text-sm text-vc-marron3">{plan.blurb}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...reveal} className="mx-auto mt-6 max-w-3xl rounded-2xl border border-vc-marron3/30 bg-white p-5 text-center text-sm text-vc-marron3">
            {c.pricing.setup}
          </motion.div>
          <motion.div {...reveal} className="mt-6 text-center">
            <Link
              to={lang === 'en' ? '/pricing' : '/precios'}
              className="inline-flex items-center gap-2 rounded-xl border border-vc-marron3/30 bg-white px-6 py-3.5 font-semibold text-vc-tinta transition hover:border-vc-marron"
            >
              {c.pricing.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHead kicker={c.faq.kicker} title={c.faq.title} />
          <div className="space-y-3">
            {c.faq.items.map((item, i) => (
              <div key={item.q} className="overflow-hidden rounded-xl border border-vc-marron3/30 bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-vc-tinta">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-vc-polvo transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="px-5 pb-5 text-sm text-vc-marron3">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — FORMULARIO #2 + CTA FINAL */}
      <section id="registro-final" className="px-5 pb-20 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 rounded-3xl bg-vc-marron p-8 md:grid-cols-2 md:p-12">
            <div className="text-center md:text-left">
              <h2 className="font-display font-black uppercase leading-none text-4xl tracking-tight text-white md:text-[38px]">{c.finalCta.title}</h2>
              <p className="mt-4 text-lg text-vc-polvo">{c.finalCta.desc}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href={CONTACT.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="demo-final"
                  className="inline-flex items-center gap-2 rounded-xl bg-vc-naranja px-6 py-3.5 font-semibold text-white transition hover:bg-vc-quemado"
                >
                  <CalendarCheck className="h-4 w-4" /> {c.finalCta.demo}
                </a>
                <a
                  href={waLink(c.finalCta.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp-final"
                  className="inline-flex items-center gap-2 rounded-xl border border-vc-marron4 px-6 py-3.5 font-semibold text-white transition hover:bg-white/5"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" /> {c.finalCta.whatsapp}
                </a>
              </div>
              <p className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-400 md:justify-start">
                <ShieldCheck className="h-4 w-4" /> {c.finalCta.secure}
              </p>
            </div>
            <RegistroForm lang={lang} variant="compact" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-vc-marron3/30 px-5 py-10 text-center text-sm text-vc-polvo">
        <div className="font-extrabold text-vc-tinta">
          Viral<span className="text-vc-naranja">Clicker</span>
        </div>
        <div className="mt-2">{c.footer.company} · {CONTACT.email}</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
          <Link to="/terms" className="font-medium text-vc-marron3 hover:text-vc-quemado">{c.footer.terms}</Link>
          <Link to="/privacy" className="font-medium text-vc-marron3 hover:text-vc-quemado">{c.footer.privacy}</Link>
        </div>
        <div className="mt-3 text-xs">© {new Date().getFullYear()} ViralClicker · {c.footer.rights}</div>
      </footer>
    </div>
  );
};

export default Restauracion;
