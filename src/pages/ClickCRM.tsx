
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#product" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Product</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">How it Works</a>
            <a href="#planes" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Pricing</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">FAQ</a>
            <LanguageSwitcher />
            <Button
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              size="sm"
            >
              Get Started
            </Button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
            >
              Get Started
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
                CRM for Service Businesses
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Send quotes, follow up automatically and{' '}
                <span className="text-primary">close more sales</span> on WhatsApp.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                ViralClicker is the CRM built for service businesses that sell through quotes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2"
                  onClick={() => window.open('https://wa.me/13051234567?text=Hi,%20I%27d%20like%20a%20demo%20of%20ViralClicker', '_blank')}
                >
                  <Play className="w-4 h-4" /> Watch Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary font-semibold px-8 gap-2"
                  onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Pricing <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — PRODUCT OVERVIEW */}
        <section id="product" className="py-20 px-4 bg-card/50">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The complete Quote-to-Sale system</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to manage quotes, track leads, and automate follow-ups in one platform.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: 'Smart Quote System',
                  desc: 'Generate live quotes with a unique link customers can review and approve.',
                  color: 'text-primary',
                  bg: 'bg-primary/10',
                },
                {
                  icon: GitBranch,
                  title: 'CRM Pipeline',
                  desc: 'Track every opportunity from new lead to closed sale.',
                  color: 'text-blue-400',
                  bg: 'bg-blue-400/10',
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp Automation',
                  desc: 'Follow up automatically and keep leads engaged until they convert.',
                  color: 'text-green-400',
                  bg: 'bg-green-400/10',
                },
              ].map((item, i) => (
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
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
              <p className="text-muted-foreground text-lg">A simple 4-step process from quote request to closed deal.</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Customer requests quote', icon: FileText },
                { step: '2', title: 'Smart quote generated', icon: Rocket },
                { step: '3', title: 'Lead enters CRM pipeline', icon: GitBranch },
                { step: '4', title: 'Follow-up closes the deal on WhatsApp', icon: MessageCircle },
              ].map((item, i) => (
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
                  <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for businesses that sell through quotes</h2>
              <p className="text-muted-foreground text-lg">If you send quotes and follow up with clients, ViralClicker was built for you.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: Wrench, label: 'Installers' },
                { icon: Hammer, label: 'Contractors' },
                { icon: Shield, label: 'Security Companies' },
                { icon: Building2, label: 'Construction' },
                { icon: Settings, label: 'Repair Services' },
                { icon: Sun, label: 'Solar Installers' },
                { icon: Plug, label: 'Service Providers' },
                { icon: BarChart3, label: 'Agencies' },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-center">{item.label}</span>
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
                  Real Business Example
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Miami Blinds & Shades</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  See how a service business organized its quotes and follow-up process using ViralClicker.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { metric: '<1 min', label: 'Response time', before: '4+ hours' },
                  { metric: '18 hrs', label: 'Saved per week', before: 'Manual tracking' },
                  { metric: '+35%', label: 'Close rate increase', before: 'No follow-up' },
                ].map((item, i) => (
                  <div key={i} className="bg-secondary/50 border border-border rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{item.metric}</div>
                    <div className="text-sm font-medium mb-2">{item.label}</div>
                    <div className="text-xs text-muted-foreground">Before: {item.before}</div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-muted-foreground italic text-sm">
                  "ViralClicker helped us stop losing quotes in WhatsApp chats. Now every lead is tracked and followed up automatically."
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Setup and onboarding</h2>
              <p className="text-muted-foreground text-lg">Get up and running in days, not weeks.</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Choose your plan', desc: 'Pick the plan that fits your business size.', icon: CheckCircle2 },
                { step: '2', title: 'Schedule setup session', desc: 'Book a call with our team to get started.', icon: CalendarCheck },
                { step: '3', title: 'We configure your quote funnel', desc: 'We set up your smart quotes, pipeline and automations.', icon: Settings },
                { step: '4', title: 'Start managing quotes', desc: 'Begin receiving, tracking and closing quotes.', icon: Rocket },
              ].map((item, i) => (
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
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start organizing your quotes today</h2>
              <p className="text-muted-foreground text-lg mb-8">Join service businesses that are closing more deals with ViralClicker.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2"
                  onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Pricing <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary font-semibold px-8 gap-2"
                  onClick={() => window.open('https://wa.me/13051234567?text=Hi,%20I%27d%20like%20to%20book%20a%20demo', '_blank')}
                >
                  <CalendarCheck className="w-4 h-4" /> Book Demo
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
            <div className="text-muted-foreground text-center md:text-left text-sm">© {new Date().getFullYear()} ViralClicker by Mormoy LLC. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="/terminos" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms & Conditions</a>
              <span className="text-border">|</span>
              <span className="text-muted-foreground text-sm">Built for service businesses</span>
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
  const faqs = [
    { q: 'Do I need technical knowledge?', a: 'No. ViralClicker is designed for business owners. Our team handles the full setup and configuration so you can focus on selling.' },
    { q: 'How long does setup take?', a: 'Most businesses are fully set up within 5-7 business days. We configure everything during a guided onboarding session.' },
    { q: 'Does it work with WhatsApp Business?', a: 'Yes. ViralClicker integrates with WhatsApp Business API through Twilio, enabling automated messages and follow-ups.' },
    { q: 'Can I customize the quote system?', a: 'Absolutely. You can configure services, pricing models, extras, variables, and discount rules to match your business.' },
    { q: 'Is Stripe used for payments?', a: 'Yes. All subscription payments are securely processed through Stripe. You can manage your billing from your account.' },
    { q: 'Can my team use the CRM?', a: 'Yes. Depending on your plan, you can add team members with different roles and permissions to manage your pipeline.' },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 bg-card/50">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about ViralClicker.</p>
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
                  <span className="font-medium">{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="bg-card border border-t-0 border-border rounded-b-xl px-5 pb-5 pt-2 -mt-2">
                  <p className="text-muted-foreground text-sm pl-8">{faq.a}</p>
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
