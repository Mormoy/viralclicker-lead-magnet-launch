import { Check, X } from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

type FeatureValue = boolean | string;

interface Feature {
  name: string;
  free: FeatureValue;
  basic: FeatureValue;
  growth: FeatureValue;
  pro: FeatureValue;
  enterprise: FeatureValue;
}

const features: Feature[] = [
  { name: "CRM & Pipeline", free: "Basic", basic: "Manual", growth: "Custom stages", pro: "Custom stages", enterprise: "Custom stages" },
  { name: "Quote Builder", free: "Predefined", basic: "Fixed prices", growth: "Custom + taxes", pro: "Custom + taxes", enterprise: "Custom + taxes" },
  { name: "Unlimited quotes", free: false, basic: true, growth: true, pro: true, enterprise: true },
  { name: "Client history", free: false, basic: true, growth: true, pro: true, enterprise: true },
  { name: "WhatsApp connected", free: false, basic: false, growth: true, pro: true, enterprise: true },
  { name: "Automated Follow-up Agent", free: false, basic: false, growth: true, pro: true, enterprise: true },
  { name: "Auto alerts for stalled quotes", free: false, basic: false, growth: true, pro: true, enterprise: true },
  { name: "Iframe embed on website", free: false, basic: false, growth: true, pro: true, enterprise: true },
  { name: "Auto-Quote Agent (PDF + WhatsApp)", free: false, basic: false, growth: false, pro: true, enterprise: true },
  { name: "Cold Lead Revival Agent", free: false, basic: false, growth: false, pro: true, enterprise: true },
  { name: "Post-Sale & Referral Agent", free: false, basic: false, growth: false, pro: true, enterprise: true },
  { name: "Meta-approved templates", free: false, basic: false, growth: false, pro: true, enterprise: true },
  { name: "Cal.com integration", free: false, basic: false, growth: false, pro: true, enterprise: true },
  { name: "Team onboarding", free: false, basic: false, growth: false, pro: true, enterprise: true },
  { name: "Weekly Reports Agent", free: false, basic: false, growth: false, pro: false, enterprise: true },
  { name: "Collections Agent", free: false, basic: false, growth: false, pro: false, enterprise: true },
  { name: "24/7 WhatsApp Agent", free: false, basic: false, growth: false, pro: false, enterprise: true },
  { name: "Lead Classifier AI", free: false, basic: false, growth: false, pro: false, enterprise: true },
  { name: "Deal Prediction AI", free: false, basic: false, growth: false, pro: false, enterprise: true },
  { name: "Custom dashboard", free: false, basic: false, growth: false, pro: false, enterprise: true },
  { name: "Dedicated analyst", free: false, basic: false, growth: false, pro: false, enterprise: true },
  { name: "Zoom calls/month", free: "0", basic: "0", growth: "2", pro: "4", enterprise: "Unlimited" },
  { name: "WhatsApp response time", free: "48h", basic: "24h", growth: "12h", pro: "4h", enterprise: "1h" },
];

const plans = [
  { id: 'free', name: 'Free', price: '$0/mo' },
  { id: 'basic', name: 'Basic', price: '$29/mo' },
  { id: 'growth', name: 'Growth', price: '$99/mo' },
  { id: 'pro', name: 'Pro', price: '$149/mo' },
  { id: 'enterprise', name: 'Enterprise', price: '$199/mo' },
];

const FeatureIcon = ({ value }: { value: FeatureValue }) => {
  if (value === true) return <Check className="w-4 h-4 text-green-500" />;
  if (value === false) return <X className="w-4 h-4 text-white/15" />;
  return <span className="text-viralOrange text-xs font-medium">{value}</span>;
};

const ComparisonTable = () => {
  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h3 className="text-xl font-bold text-white text-center mb-6">Detailed plan comparison</h3>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-white/70 py-3 px-3 font-medium w-[220px]">Feature</th>
              {plans.map((plan) => (
                <th key={plan.id} className="text-center py-3 px-2">
                  <div className="text-white font-bold text-sm">{plan.name}</div>
                  <div className="text-viralOrange text-xs">{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                <td className="text-white/70 py-2.5 px-3 text-xs">{feature.name}</td>
                {plans.map((plan) => (
                  <td key={plan.id} className={`text-center py-2.5 px-2 ${plan.id === 'growth' ? 'bg-viralOrange/5' : ''}`}>
                    <div className="flex justify-center">
                      <FeatureIcon value={feature[plan.id as keyof Feature] as FeatureValue} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        <Accordion type="single" collapsible className="space-y-3">
          {plans.map((plan) => (
            <AccordionItem key={plan.id} value={plan.id} className="bg-gray-800/50 rounded-xl border border-gray-700 px-4">
              <AccordionTrigger className="text-white hover:text-viralOrange py-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold">{plan.name}</span>
                  <span className="text-viralOrange text-sm">{plan.price}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ul className="space-y-2">
                  {features.map((feature, index) => {
                    const value = feature[plan.id as keyof Feature] as FeatureValue;
                    return (
                      <li key={index} className="flex items-center justify-between py-1">
                        <span className="text-white/70 text-sm">{feature.name}</span>
                        <FeatureIcon value={value} />
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ComparisonTable;
