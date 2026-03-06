import { Check, X, Minus } from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

type FeatureValue = boolean | 'partial' | string;

interface Feature {
  name: string;
  starter: FeatureValue;
  pro: FeatureValue;
  elite: FeatureValue;
}

const features: Feature[] = [
  { name: "Smart Quote Pages included in setup", starter: "1", pro: "Up to 3", elite: "Up to 5" },
  { name: "Custom Smart Quote Page", starter: true, pro: true, elite: true },
  { name: "Lead capture form", starter: true, pro: true, elite: true },
  { name: "CRM with stages & pipeline", starter: true, pro: true, elite: true },
  { name: "Live quote link", starter: false, pro: true, elite: true },
  { name: "Discount coupons on quotes", starter: false, pro: true, elite: true },
  { name: "Internal WhatsApp campaigns", starter: false, pro: true, elite: true },
  { name: "Automated follow-ups", starter: false, pro: "Basic", elite: "Advanced" },
  { name: "Calendly integration", starter: false, pro: false, elite: true },
  { name: "Post-sale follow-ups", starter: false, pro: false, elite: true },
  { name: "Multi-user access", starter: false, pro: false, elite: true },
  { name: "Conversion reports", starter: false, pro: true, elite: true },
  { name: "Monthly support", starter: "1x30min", pro: "2x30min", elite: "Priority" },
  { name: "Small changes/month", starter: "1", pro: "2", elite: "3" },
];

const plans = [
  { id: 'starter', name: 'Starter', price: '$99/mo' },
  { id: 'pro', name: 'Pro', price: '$249/mo' },
  { id: 'elite', name: 'Elite', price: '$449/mo' },
];

const FeatureIcon = ({ value }: { value: FeatureValue }) => {
  if (value === true) return <Check className="w-5 h-5 text-green-500" />;
  if (value === false) return <X className="w-5 h-5 text-white/20" />;
  if (value === 'partial') return <Minus className="w-5 h-5 text-yellow-500" />;
  return <span className="text-viralOrange text-sm font-medium">{value}</span>;
};

const ComparisonTable = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12">
      <h3 className="text-xl font-bold text-white text-center mb-6">Detailed plan comparison</h3>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-white/70 py-4 px-4 font-medium">Feature</th>
              {plans.map((plan) => (
                <th key={plan.id} className="text-center py-4 px-4">
                  <div className="text-white font-bold">{plan.name}</div>
                  <div className="text-viralOrange text-sm">{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                <td className="text-white/80 py-3 px-4 text-sm">{feature.name}</td>
                <td className="text-center py-3 px-4"><div className="flex justify-center"><FeatureIcon value={feature.starter} /></div></td>
                <td className="text-center py-3 px-4 bg-viralOrange/5"><div className="flex justify-center"><FeatureIcon value={feature.pro} /></div></td>
                <td className="text-center py-3 px-4"><div className="flex justify-center"><FeatureIcon value={feature.elite} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
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
                    const value = feature[plan.id as keyof typeof feature] as FeatureValue;
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
