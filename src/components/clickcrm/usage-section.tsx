import { motion } from 'framer-motion';
import { MessageCircle, Phone, Cpu, AlertTriangle, Bot } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const usageRows = [
  { plan: 'Free', wa: '50', voice: '0', tokens: '1,000' },
  { plan: 'Basic', wa: '300', voice: '0', tokens: '5,000' },
  { plan: 'Growth', wa: '1,500', voice: '30 min', tokens: '25,000', highlight: true },
  { plan: 'Pro', wa: '5,000', voice: '120 min', tokens: '100,000' },
  { plan: 'Enterprise', wa: '20,000', voice: '500 min', tokens: '500,000' },
];

const addons = [
  { name: 'Auto-Quote Agent', price: 43 },
  { name: 'Cold Lead Revival Agent', price: 32 },
  { name: 'Post-Sale & Referral Agent', price: 32 },
  { name: 'Lead Classifier Agent', price: 32 },
  { name: 'Weekly Reports Agent', price: 21 },
  { name: 'Collections Agent', price: 32 },
  { name: '24/7 WhatsApp AI Agent', price: 88 },
  { name: 'Deal Prediction Agent', price: 43 },
];

const UsageSection = () => {
  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        {/* Usage included */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Usage included per plan</h2>
          <p className="text-muted-foreground text-lg">
            Every plan comes with a generous monthly allowance. No hidden gotchas.
          </p>
        </motion.div>

        <div className="overflow-x-auto mb-12">
          <table className="w-full min-w-[640px] border border-border rounded-xl overflow-hidden">
            <thead className="bg-card">
              <tr className="text-left text-sm">
                <th className="p-4 font-semibold">Plan</th>
                <th className="p-4 font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-400" /> WhatsApp / mo
                  </span>
                </th>
                <th className="p-4 font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" /> Voice AI / mo
                  </span>
                </th>
                <th className="p-4 font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" /> AI Tokens / mo
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {usageRows.map((row) => (
                <tr
                  key={row.plan}
                  className={`border-t border-border text-sm ${row.highlight ? 'bg-primary/5' : ''}`}
                >
                  <td className="p-4 font-semibold">
                    {row.plan}
                    {row.highlight && (
                      <span className="ml-2 text-[10px] uppercase tracking-wide bg-primary/15 text-primary px-2 py-0.5 rounded-full">
                        Most popular
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">{row.wa}</td>
                  <td className="p-4 text-muted-foreground">{row.voice}</td>
                  <td className="p-4 text-muted-foreground">{row.tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Overage */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-16"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-amber-500/10 border border-amber-500/30 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">If you exceed included usage</h3>
              <p className="text-muted-foreground text-sm">
                When you exceed your monthly usage, billed automatically at month-end:
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary/40 border border-border rounded-xl p-5">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Additional WhatsApp</div>
              <div className="text-2xl font-bold">$0.05 <span className="text-sm font-normal text-muted-foreground">USD / message</span></div>
            </div>
            <div className="bg-secondary/40 border border-border rounded-xl p-5">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Additional Voice AI</div>
              <div className="text-2xl font-bold">$0.30 <span className="text-sm font-normal text-muted-foreground">USD / minute</span></div>
            </div>
            <div className="bg-secondary/40 border border-border rounded-xl p-5">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Additional AI tokens</div>
              <div className="text-2xl font-bold">$5 <span className="text-sm font-normal text-muted-foreground">USD / 100k tokens</span></div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            You'll receive alerts at <span className="text-foreground font-semibold">80% usage</span>. No surprises.
          </p>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">AI Agents Add-ons</h2>
          <p className="text-muted-foreground text-lg">
            Add specialized AI agents to any plan. Activate only what you need.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addons.map((addon) => (
            <div
              key={addon.name}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors flex flex-col"
            >
              <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-2 flex-1">{addon.name}</h3>
              <div className="text-lg font-bold">
                ${addon.price}<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsageSection;
