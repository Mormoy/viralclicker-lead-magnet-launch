import { Check, X, Minus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FeatureValue = boolean | 'partial' | string;

interface Feature {
  name: string;
  starter: FeatureValue;
  pro: FeatureValue;
  elite: FeatureValue;
}

const features: Feature[] = [
  { name: "Landings incluidas en setup", starter: "1", pro: "Hasta 3", elite: "Hasta 5" },
  { name: "Landing personalizada", starter: true, pro: true, elite: true },
  { name: "Formulario de captación", starter: true, pro: true, elite: true },
  { name: "CRM con estados y pipeline", starter: true, pro: true, elite: true },
  { name: "Cotizador con link vivo", starter: false, pro: true, elite: true },
  { name: "Cupones sobre cotizaciones", starter: false, pro: true, elite: true },
  { name: "Campañas internas WhatsApp", starter: false, pro: true, elite: true },
  { name: "Automatizaciones n8n", starter: false, pro: "Básicas", elite: "Avanzadas" },
  { name: "Integración Calendly", starter: false, pro: false, elite: true },
  { name: "Tracking post-venta", starter: false, pro: false, elite: true },
  { name: "Multiusuario", starter: false, pro: false, elite: true },
  { name: "Reportes de conversión", starter: false, pro: true, elite: true },
  { name: "Soporte mensual", starter: "1x30min", pro: "2x30min", elite: "Prioritario" },
  { name: "Cambios menores/mes", starter: "1", pro: "2", elite: "3" },
];

const plans = [
  { id: 'starter', name: 'Starter', price: '$99/mes' },
  { id: 'pro', name: 'Pro', price: '$249/mes' },
  { id: 'elite', name: 'Elite', price: '$449/mes' },
];

const FeatureIcon = ({ value }: { value: FeatureValue }) => {
  if (value === true) {
    return <Check className="w-5 h-5 text-green-500" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-white/20" />;
  }
  if (value === 'partial') {
    return <Minus className="w-5 h-5 text-yellow-500" />;
  }
  return <span className="text-viralOrange text-sm font-medium">{value}</span>;
};

const ComparisonTable = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12">
      <h3 className="text-xl font-bold text-white text-center mb-6">
        Comparativa detallada de planes
      </h3>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-white/70 py-4 px-4 font-medium">Funcionalidad</th>
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
              <tr 
                key={index} 
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
              >
                <td className="text-white/80 py-3 px-4 text-sm">{feature.name}</td>
                <td className="text-center py-3 px-4">
                  <div className="flex justify-center">
                    <FeatureIcon value={feature.starter} />
                  </div>
                </td>
                <td className="text-center py-3 px-4 bg-viralOrange/5">
                  <div className="flex justify-center">
                    <FeatureIcon value={feature.pro} />
                  </div>
                </td>
                <td className="text-center py-3 px-4">
                  <div className="flex justify-center">
                    <FeatureIcon value={feature.elite} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="space-y-3">
          {plans.map((plan) => (
            <AccordionItem 
              key={plan.id} 
              value={plan.id}
              className="bg-gray-800/50 rounded-xl border border-gray-700 px-4"
            >
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
