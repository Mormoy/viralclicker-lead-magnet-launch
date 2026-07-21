import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/logo';

// =====================================================
// TERMS OF SERVICE (EN) — draft base, no legal advice.
// Source: KIT_LANZAMIENTO/LEGALES_VIRALCLICKER_TOS_PRIVACY.md
// =====================================================
const meta = {
  lastUpdated: 'July 20, 2026',
  company: 'Mormoy LLC',
  address: '4405 Jager Dr NE, Ste C4 PMB 1063, Rio Rancho, NM',
  email: 'moromoyllc@gmail.com',
};

const sections: { n: string; title: string; body: string }[] = [
  {
    n: '1',
    title: 'The Service.',
    body: 'ViralClicker is a software platform that provides lead capture pages, quoting tools, CRM pipeline management, automated WhatsApp follow-up, and AI-powered voice calling ("Marco") for small businesses.',
  },
  {
    n: '2',
    title: 'Accounts.',
    body: 'You must provide accurate information and keep your credentials secure. You are responsible for all activity under your account. One account per business unless otherwise agreed.',
  },
  {
    n: '3',
    title: 'Subscriptions & Billing.',
    body: 'Plans are billed monthly in USD via our payment processor (Stripe). Setup fees are one-time and non-refundable once implementation has started. Subscriptions renew automatically each month until canceled. You may cancel anytime from your account or by written notice; cancellation takes effect at the end of the current billing period. Usage beyond included AI minutes is billed at the published per-minute rate.',
  },
  {
    n: '4',
    title: 'Your Data & Your Customers.',
    body: "You retain ownership of your business data and your customers' contact information. You grant us a limited license to process this data solely to operate the Service. You are responsible for having the right to contact the leads you load into or capture with the Service.",
  },
  {
    n: '5',
    title: 'Compliance (important).',
    body: 'You agree to use the Service in compliance with applicable communication laws, including the TCPA (automated calls/texts require appropriate consent), CAN-SPAM, and WhatsApp Business policies. ViralClicker provides tools; you are responsible for lawful use, including obtaining consent from your leads where required and honoring do-not-call requests. We may suspend accounts engaged in spam or unlawful outreach.',
  },
  {
    n: '6',
    title: 'AI Disclosure.',
    body: 'The Service uses artificial intelligence to conduct calls and send messages. AI output may contain errors. You are responsible for reviewing quotes and commitments made through the Service before relying on them. Where required by law, calls may include disclosure that an AI assistant is calling.',
  },
  {
    n: '7',
    title: 'Availability.',
    body: 'We target high availability but do not guarantee uninterrupted service. Scheduled maintenance and third-party outages (telephony, WhatsApp, hosting) may affect the Service.',
  },
  {
    n: '8',
    title: 'Intellectual Property.',
    body: 'The Service, including software, design, and branding, belongs to Mormoy LLC. You may not copy, resell, or reverse-engineer it.',
  },
  {
    n: '9',
    title: 'Limitation of Liability.',
    body: "To the maximum extent permitted by law, Mormoy LLC's total liability under these Terms is limited to the amounts you paid in the three (3) months preceding the claim. We are not liable for indirect damages, lost profits, or lost business opportunities.",
  },
  {
    n: '10',
    title: 'Termination.',
    body: 'We may suspend or terminate accounts that violate these Terms. Upon termination you may request an export of your data within 30 days.',
  },
  {
    n: '11',
    title: 'Governing Law.',
    body: 'These Terms are governed by the laws of the State of New Mexico, USA. Disputes will be resolved in the courts of New Mexico.',
  },
  {
    n: '12',
    title: 'Changes.',
    body: 'We may update these Terms; material changes will be notified by email or in-app at least 15 days in advance.',
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-viralDark text-white">
      <header className="sticky top-0 z-50 bg-viralDark/90 backdrop-blur border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <Logo className="ml-2" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Terms of Service — ViralClicker</h1>
        <p className="text-white/50 text-sm mb-8">Last updated: {meta.lastUpdated}</p>

        <p className="text-white/70 mb-8">
          These Terms of Service ("Terms") govern your use of ViralClicker (the "Service"), operated by{' '}
          <strong className="text-white">{meta.company}</strong>, a New Mexico limited liability company ("Mormoy,"
          "we," "us").
        </p>

        <div className="space-y-6">
          {sections.map((s) => (
            <section key={s.n}>
              <h2 className="font-semibold text-viralOrange mb-1">
                {s.n}. {s.title}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-sm text-white/60">
          <p>
            <strong className="text-white">Contact:</strong> {meta.company} — {meta.address} ·{' '}
            <a href={`mailto:${meta.email}`} className="text-viralOrange hover:underline">
              {meta.email}
            </a>
          </p>
        </div>

        <div className="mt-8 flex gap-6 text-sm">
          <Link to="/privacy" className="text-white/60 hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/pricing" className="text-white/60 hover:text-white">
            Pricing
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Terms;
