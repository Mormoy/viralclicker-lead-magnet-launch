import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight, MessageCircle, ArrowLeft } from 'lucide-react';
import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-viralDark text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-viralDark/90 backdrop-blur border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
              <ArrowLeft className="w-4 h-4" /> {c.back}
            </Link>
            <Logo className="ml-2" />
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{c.heroTitle}</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">{c.heroSub}</p>
      </section>

      {/* Plan cards */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {c.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.popular
                  ? 'border-viralOrange bg-viralOrange/5 shadow-2xl shadow-viralOrange/10'
                  : 'border-gray-800 bg-viralGray/40'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-viralOrange text-black text-xs font-bold px-3 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-black" /> {c.mostPopular}
                </span>
              )}
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-extrabold text-viralOrange">{plan.price}</span>
                <span className="text-white/50">{plan.cadence}</span>
              </div>
              <p className="text-white/60 text-sm mb-6">{plan.blurb}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-viralOrange mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={waLink(plan.waMsg)} target="_blank" rel="noopener noreferrer">
                <Button
                  className={`w-full h-12 font-semibold ${
                    plan.popular
                      ? 'bg-viralOrange hover:bg-viralOrange/90 text-black'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Setup */}
        <div className="max-w-6xl mx-auto mt-8 rounded-2xl border border-gray-800 bg-viralGray/40 p-8">
          <h3 className="text-xl font-bold mb-2">{c.setupTitle}</h3>
          <p className="text-white/70 mb-3">{c.setupBody}</p>
          <p className="text-viralOrange font-semibold">{c.setupOffer}</p>
        </div>

        {/* Las cuentas de consumo son del cliente */}
        <div className="max-w-6xl mx-auto mt-4 rounded-2xl border border-gray-800 bg-viralGray/20 p-6">
          <p className="text-white/60 text-sm">{c.ownershipNote}</p>
        </div>
      </section>

      {/* Comparison */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">{c.compareTitle}</h2>
          <p className="text-white/70">{c.compare}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-gray-800 bg-viralGray/30 p-5">
                <p className="font-semibold mb-1">{f.q}</p>
                <p className="text-white/60 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-viralOrange/30 bg-viralOrange/5 p-10">
          <h2 className="text-3xl font-bold mb-6">{c.finalTitle}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={CONTACT.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button className="h-12 px-6 bg-viralOrange hover:bg-viralOrange/90 text-black font-semibold">
                {c.finalCtaDemo} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a
              href={waLink(c.finalWaMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <MessageCircle className="w-5 h-5 text-green-400" /> {c.finalCtaWa}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <span>© {new Date().getFullYear()} ViralClicker by Mormoy LLC</span>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-white">{c.footerTerms}</Link>
            <Link to="/privacy" className="hover:text-white">{c.footerPrivacy}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
