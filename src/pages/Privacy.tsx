import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/logo';

// =====================================================
// PRIVACY POLICY (EN) — draft base, no legal advice.
// Source: KIT_LANZAMIENTO/LEGALES_VIRALCLICKER_TOS_PRIVACY.md
// =====================================================
const meta = {
  lastUpdated: 'July 20, 2026',
  company: 'Mormoy LLC',
  email: 'moromoyllc@gmail.com',
};

const sections: { n: string; title: string; body: React.ReactNode }[] = [
  {
    n: '1',
    title: 'Who we are.',
    body: 'ViralClicker is operated by Mormoy LLC (contact below). This policy explains how we handle personal information.',
  },
  {
    n: '2',
    title: 'Information we collect.',
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <em>From our clients (businesses):</em> name, email, phone, company details, billing information (processed by
          Stripe — we do not store card numbers).
        </li>
        <li>
          <em>From our clients' customers (leads):</em> contact details and service-related information submitted through
          quote forms, calls, or messages, processed on behalf of our clients.
        </li>
        <li>
          <em>Automatically:</em> usage data, device/browser information, and cookies for analytics and advertising
          measurement (e.g., Meta Pixel).
        </li>
      </ul>
    ),
  },
  {
    n: '3',
    title: 'How we use it.',
    body: 'To provide and improve the Service; to process payments; to send service communications; to run AI voice and messaging features on behalf of our clients; and for marketing with your consent where required.',
  },
  {
    n: '4',
    title: 'Calls and recordings.',
    body: "Calls handled by our AI agent may be recorded and transcribed for quality and training of the client's own configuration. Clients are responsible for complying with call-recording consent laws applicable to their region.",
  },
  {
    n: '5',
    title: 'Sharing.',
    body: 'We share data only with service providers needed to operate (hosting, telephony, messaging, payments, analytics), under contractual safeguards. We do not sell personal information.',
  },
  {
    n: '6',
    title: 'Retention.',
    body: "Client account data is kept while the account is active and up to 12 months after closure. Lead data belongs to the client and is deleted or exported at the client's request.",
  },
  {
    n: '7',
    title: 'Your rights.',
    body: (
      <>
        Depending on your location, you may request access, correction, deletion, or a copy of your personal information
        by emailing{' '}
        <a href={`mailto:${meta.email}`} className="text-viralOrange hover:underline">
          {meta.email}
        </a>
        . If you are a lead of one of our clients, we may redirect your request to that business as the data controller.
      </>
    ),
  },
  {
    n: '8',
    title: 'Security.',
    body: 'Data is encrypted in transit, access is role-restricted, and we maintain audit logs. No system is 100% secure; we notify affected parties of breaches as required by law.',
  },
  {
    n: '9',
    title: 'Children.',
    body: 'The Service is not directed to individuals under 18.',
  },
  {
    n: '10',
    title: 'Changes.',
    body: 'We will post updates on this page with a new "Last updated" date.',
  },
];

const Privacy = () => {
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
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Privacy Policy — ViralClicker</h1>
        <p className="text-white/50 text-sm mb-8">Last updated: {meta.lastUpdated}</p>

        <div className="space-y-6">
          {sections.map((s) => (
            <section key={s.n}>
              <h2 className="font-semibold text-viralOrange mb-1">
                {s.n}. {s.title}
              </h2>
              <div className="text-white/70 text-sm leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-sm text-white/60">
          <p>
            <strong className="text-white">Contact:</strong> {meta.company} ·{' '}
            <a href={`mailto:${meta.email}`} className="text-viralOrange hover:underline">
              {meta.email}
            </a>
          </p>
        </div>

        <div className="mt-8 flex gap-6 text-sm">
          <Link to="/terms" className="text-white/60 hover:text-white">
            Terms of Service
          </Link>
          <Link to="/pricing" className="text-white/60 hover:text-white">
            Pricing
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
