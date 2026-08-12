import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight, MessageCircle, ArrowLeft, Plus } from 'lucide-react';
import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import {
  Seccion, Titular, Etiqueta, FranjaPeligro, BotonCartel,
} from '@/components/vc/skin';

import { CONTACT, PRICING, waLink } from '@/config/site';

type Lang = 'es' | 'en';

interface Plan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  popular?: boolean;
  waMsg: string;
}

const content = (lang: Lang) => {
  const isEs = lang === 'es';
  const perMo = isEs ? '/mes' : '/mo';

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: `$${PRICING.starter}`,
      cadence: perMo,
      blurb: isEs
        ? 'Para equipos que contestan sus llamadas pero pierden leads por falta de seguimiento.'
        : 'For teams that answer their own calls but lose leads to slow follow-up.',
      features: isEs
        ? [
            'Landing + formulario de cotización instantánea',
            'Tablero de ventas (arrastrar y soltar, desde el celular)',
            'Seguimiento automático por WhatsApp',
            'Sabes qué anuncio trae cada cliente',
            '2 usuarios',
          ]
        : [
            'Landing page + instant quote form',
            'Sales board (drag & drop, mobile-ready)',
            'Automatic WhatsApp follow-up sequences',
            'Lead source tracking (know which ad pays)',
            '2 users',
          ],
      cta: isEs ? 'Empezar con Starter' : 'Start with Starter',
      waMsg: isEs
        ? 'Hola, quiero empezar con el plan Starter de ViralClicker.'
        : "Hi, I'd like to start with the ViralClicker Starter plan.",
    },
    {
      id: 'pro',
      name: 'Pro',
      price: `$${PRICING.pro}`,
      cadence: perMo,
      popular: true,
      blurb: isEs
        ? 'Para equipos que quieren que CADA lead reciba una llamada en minutos — incluso a las 9 PM.'
        : 'For teams that want every lead called in minutes — even at 9 PM.',
      features: isEs
        ? [
            'Todo lo de Starter',
            'Tu agente de voz con IA — llama a cada cliente nuevo en minutos, lo califica y agenda la visita (español e inglés)',
            'Tu agente de WhatsApp — responde, cotiza y agenda 24/7',
            `${PRICING.includedAiMinutes} minutos de llamadas IA al mes`,
            'Usuarios ilimitados',
            'Reportes y tablero de conversión',
          ]
        : [
            'Everything in Starter',
            'Your AI voice agent — calls every new customer in minutes, qualifies, and books the visit (English & Spanish)',
            'Your WhatsApp agent — answers, quotes and books 24/7',
            `${PRICING.includedAiMinutes} AI call minutes/month included`,
            'Unlimited users',
            'Reports & conversion dashboard',
          ],
      cta: isEs ? 'Empezar con Pro' : 'Start with Pro',
      waMsg: isEs
        ? 'Hola, quiero empezar con el plan Pro de ViralClicker.'
        : "Hi, I'd like to start with the ViralClicker Pro plan.",
    },
    {
      id: 'growth',
      name: 'Growth',
      price: `$${PRICING.growth}`,
      cadence: perMo,
      blurb: isEs
        ? 'Para los que además quieren que alguien maneje sus campañas y les traiga los clientes.'
        : 'For those who also want someone running their campaigns and bringing the customers in.',
      features: isEs
        ? [
            'Todo lo del Pro',
            'Gestión completa de tus campañas en Meta (creativos, segmentación y optimización)',
            'Reporte mensual de qué anuncio trajo cada venta',
            `La inversión publicitaria la pagas tú directo a Meta con tu tarjeta (desde $${PRICING.adSpendFrom}/mes)`,
          ]
        : [
            'Everything in Pro',
            'Full management of your Meta campaigns (creative, targeting and optimization)',
            'Monthly report of which ad brought each sale',
            `You pay the ad spend directly to Meta with your own card (from $${PRICING.adSpendFrom}/mo)`,
          ],
      cta: isEs ? 'Empezar con Growth' : 'Start with Growth',
      waMsg: isEs
        ? 'Hola, quiero empezar con el plan Growth de ViralClicker (con campañas gestionadas).'
        : "Hi, I'd like to start with the ViralClicker Growth plan (managed campaigns).",
    },
  ];

  return {
    back: isEs ? 'Volver' : 'Back',
    heroTitle: isEs ? 'Precios simples. Resultados serios.' : 'Simple pricing. Serious results.',
    heroSub: isEs
      ? 'Todos los planes incluyen implementación en 7 días, seguimiento por WhatsApp y soporte en español e inglés. Sin contratos — cancela cuando quieras.'
      : 'Every plan includes setup in 7 days, WhatsApp follow-up, and support in English & Spanish. No contracts — cancel anytime.',
    mostPopular: isEs ? 'El más elegido' : 'Most popular',
    plans,
    setupTitle: isEs ? `Setup — $${PRICING.setup} por única vez` : `Setup — $${PRICING.setup} one-time`,
    setupBody: isEs
      ? 'Marca, número, agente entrenado con TU negocio, tablero configurado. Funcionando en 7 días.'
      : 'Branding, phone number, AI agent trained on YOUR business, dashboard configured. Live in 7 days.',
    setupOffer: isEs
      ? '🏷️ Precio de lanzamiento: el setup sube en octubre. Los que entran ahora quedan con este valor.'
      : '🏷️ Launch price: setup goes up in October. Sign up now and you keep this price.',
    ownershipNote: isEs
      ? 'Los servicios de consumo (número, minutos de voz, WhatsApp, publicidad) se configuran a TU nombre y con TU tarjeta — tus cuentas son tuyas.'
      : 'Usage-based services (phone number, voice minutes, WhatsApp, ad spend) are set up in YOUR name and on YOUR card — your accounts are yours.',
    compareTitle: isEs ? 'Por qué somos distintos' : 'Why we’re different',
    compare: isEs
      ? 'Un software de gestión cuesta $225–$550/mes y no llama a nadie: es una base de datos que alguien tiene que llenar. Las agencias cobran $300–$600/mes por un "empleado IA" que no está conectado a tus ventas. ViralClicker es las dos cosas, por menos.'
      : "Management software costs $225–$550/mo and never calls anyone: it's a database somebody has to fill in. Agencies charge $300–$600/mo for an \"AI employee\" that isn't connected to your sales. ViralClicker is both, for less.",
    faqTitle: 'FAQ',
    faqs: isEs
      ? [
          {
            q: `¿Y si uso más de ${PRICING.includedAiMinutes} minutos de IA?`,
            a: `$${PRICING.overagePerMin.toString().replace('.', ',')}/min adicional. La mayoría usa menos.`,
          },
          { q: '¿Necesito saber de tecnología?', a: 'No. Te lo entregamos funcionando.' },
          { q: '¿De verdad habla español E inglés?', a: 'Sí — el agente detecta el idioma del cliente y responde en el suyo.' },
          { q: '¿Puedo ponerle nombre y voz a mi agente?', a: 'Sí. Tú eliges cómo se llama, cómo suena y cómo habla.' },
          { q: '¿Las cuentas quedan a mi nombre?', a: 'Sí. Tu número, tu WhatsApp y tus campañas son tuyos. Si algún día decides irte, te llevas todo.' },
          { q: '¿Contrato?', a: 'Mes a mes. Cancelas cuando quieras.' },
        ]
      : [
          {
            q: `What if I use more than ${PRICING.includedAiMinutes} AI minutes?`,
            a: `$${PRICING.overagePerMin.toFixed(2)}/min after that. Most clients use less.`,
          },
          { q: 'Do I need to be technical?', a: 'No. We set everything up and hand you a working system.' },
          { q: 'Does it really speak Spanish AND English?', a: "Yes — the agent detects the customer's language and answers in it." },
          { q: 'Can I give my agent a name and a voice?', a: 'Yes. You choose what it is called, how it sounds and how it speaks.' },
          { q: 'Are the accounts in my name?', a: 'Yes. Your number, your WhatsApp and your campaigns are yours. If you ever leave, you take everything with you.' },
          { q: 'Contract?', a: 'Month to month. Cancel anytime.' },
        ],
    finalTitle: isEs ? 'Escúchalo llamando a tu propio celular.' : 'Hear it calling your own phone.',
    finalCtaDemo: isEs ? 'Agenda una demo de 15 min' : 'Book a 15-min demo',
    finalCtaWa: isEs ? `O escríbenos al WhatsApp: ${CONTACT.whatsappDisplay}` : `Or WhatsApp us: ${CONTACT.whatsappDisplay}`,
    finalWaMsg: isEs
      ? 'Hola, quiero ver una demo de ViralClicker (el agente llamando a un cliente).'
      : "Hi, I'd like to see a ViralClicker demo (the agent calling a customer).",
    footerTerms: isEs ? 'Términos' : 'Terms',
    footerPrivacy: isEs ? 'Privacidad' : 'Privacy',
  };
};

const Pricing = ({ forceLang }: { forceLang?: Lang }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (forceLang && i18n.language !== forceLang) {
      i18n.changeLanguage(forceLang);
      document.documentElement.lang = forceLang;
    }
  }, [forceLang, i18n]);

  const lang: Lang = (forceLang ?? (i18n.language === 'en' ? 'en' : 'es')) as Lang;
  const c = content(lang);

  return (
    <div className="min-h-screen bg-vc-crema font-body text-vc-tinta antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="bg-vc-marron">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-[5vw] py-3.5">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-1 font-mono text-[12px] uppercase tracking-wider text-vc-arena transition-colors hover:text-vc-amarillo"
              >
                <ArrowLeft className="h-4 w-4" /> {c.back}
              </Link>
              <Logo className="ml-2" />
            </div>
            <LanguageSwitcher />
          </div>
        </div>
        <FranjaPeligro />
      </header>

      {/* Hero */}
      <Seccion ancho="ancho" className="!pb-0">
        <Etiqueta>{c.mostPopular}</Etiqueta>
        <Titular className="mt-4">{c.heroTitle}</Titular>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-vc-marron3">{c.heroSub}</p>
      </Seccion>

      {/* Planes */}
      <Seccion ancho="ancho">
        <div className="grid gap-6 md:grid-cols-3">
          {c.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col border-2 border-vc-marron p-7 ${
                plan.popular ? 'border-vc-oxido bg-white' : 'bg-white'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1 border-2 border-vc-marron bg-vc-naranja px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-vc-crema">
                  <Star className="h-3 w-3 fill-vc-crema" /> {c.mostPopular}
                </span>
              )}
              <h3 className="font-display text-3xl font-black uppercase leading-none">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                {/* Sobre la tarjeta amarilla el naranja no contrasta: ahí el
                    precio va en marrón (10,9:1). Sobre blanco, óxido (4,7:1). */}
                <span
                  className={`font-display text-[3.5rem] font-black leading-none ${
                    'text-vc-oxido'
                  }`}
                >
                  {plan.price}
                </span>
                <span className="font-mono text-sm text-vc-marron3">{plan.cadence}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-vc-marron3">{plan.blurb}</p>
              <ul className="mb-7 mt-6 flex-1 space-y-2.5">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-vc-quemado" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={waLink(plan.waMsg)} target="_blank" rel="noopener noreferrer">
                <BotonCartel
                  variante={plan.popular ? 'principal' : 'oscuro'}
                  className="w-full !shadow-none"
                >
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </BotonCartel>
              </a>
            </div>
          ))}
        </div>

        {/* Setup */}
        <div className="mt-6 border-2 border-vc-marron bg-white p-7">
          <h3 className="font-display text-2xl font-black uppercase leading-none">{c.setupTitle}</h3>
          <p className="mt-3 leading-relaxed text-vc-marron3">{c.setupBody}</p>
          <p className="mt-2 font-semibold text-vc-quemado">{c.setupOffer}</p>
        </div>

        {/* Las cuentas de consumo son del cliente */}
        <div className="mt-4 border-2 border-dashed border-vc-marron3/50 p-5">
          <p className="font-mono text-[13px] leading-relaxed text-vc-marron3">{c.ownershipNote}</p>
        </div>
      </Seccion>

      {/* Comparación */}
      <Seccion>
        <Titular>{c.compareTitle}</Titular>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-vc-marron3">{c.compare}</p>
      </Seccion>

      {/* FAQ */}
      <Seccion>
        <Titular>{c.faqTitle}</Titular>
        <div className="mt-7 flex flex-col">
          {c.faqs.map((f, i) => (
            <details
              key={i}
              className="group border-t-2 border-vc-marron3/40 last:border-b-2"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vc-amarillo">
                <span className="font-display text-xl font-black uppercase leading-tight">{f.q}</span>
                <Plus
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-vc-oxido transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-3xl pb-6 text-[17px] leading-relaxed text-vc-marron3">{f.a}</p>
            </details>
          ))}
        </div>
      </Seccion>

      {/* Cierre */}
      <Seccion>
        <div className="flex flex-wrap items-center justify-between gap-6 border-2 border-vc-marron bg-vc-naranja p-8">
          <h2 className="max-w-2xl font-display text-[1.7rem] font-black uppercase leading-none text-vc-marron sm:text-4xl">
            {c.finalTitle}
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <a href={CONTACT.demoUrl} target="_blank" rel="noopener noreferrer">
              <BotonCartel variante="oscuro">
                {c.finalCtaDemo} <ArrowRight className="h-4 w-4" />
              </BotonCartel>
            </a>
            <a
              href={waLink(c.finalWaMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-vc-marron underline decoration-2 underline-offset-4"
            >
              <MessageCircle className="h-5 w-5" /> {c.finalCtaWa}
            </a>
          </div>
        </div>
      </Seccion>

      {/* Footer */}
      <footer className="bg-vc-marron">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-4 px-[5vw] py-9 font-mono text-[11px] uppercase tracking-wider md:flex-row md:items-center">
          <span className="text-vc-arena">© {new Date().getFullYear()} ViralClicker by Mormoy LLC</span>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="text-vc-arena transition-colors hover:text-vc-amarillo">
              {c.footerTerms}
            </Link>
            <Link to="/privacy" className="text-vc-arena transition-colors hover:text-vc-amarillo">
              {c.footerPrivacy}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
