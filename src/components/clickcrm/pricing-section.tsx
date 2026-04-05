import { Check, X, Star, Crown, Zap, Rocket, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  setup: string;
  popular: boolean;
  icon: React.ElementType;
  features: PlanFeature[];
  support: string;
  limits?: string;
  accentClass: string;
  borderClass: string;
  bgClass: string;
  btnClass: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Try it free',
    description: 'For the small business that wants to try with no risk',
    price: 0,
    setup: 'Free',
    popular: false,
    icon: Zap,
    features: [
      { text: 'Basic CRM with no time limit', included: true },
      { text: 'Standard quote builder (predefined)', included: true },
      { text: 'Manual sales pipeline', included: true },
      { text: 'Self-service video tutorials', included: true },
      { text: 'No support meetings', included: false },
      { text: 'No automations', included: false },
      { text: 'No custom quote builder', included: false },
    ],
    support: 'WhatsApp response within 48h',
    limits: 'Up to 50 quotes · 1 user · ViralClicker watermark',
    accentClass: 'text-gray-400',
    borderClass: 'border-gray-700',
    bgClass: 'bg-gray-800/40',
    btnClass: 'bg-gray-700 hover:bg-gray-600',
  },
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Starter',
    description: 'For the business that already tried it and wants the full system',
    price: 29,
    setup: 'Free',
    popular: false,
    icon: Rocket,
    features: [
      { text: 'CRM with unlimited quotes', included: true },
      { text: 'Standard quote builder (fixed products and prices)', included: true },
      { text: 'Manual sales pipeline', included: true },
      { text: 'Full client history', included: true },
      { text: 'No automated WhatsApp', included: false },
      { text: 'No automations', included: false },
    ],
    support: 'WhatsApp response within 24h',
    accentClass: 'text-blue-400',
    borderClass: 'border-blue-500/30',
    bgClass: 'bg-blue-500/5',
    btnClass: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Most popular',
    description: 'For the active business that wants to automate follow-up',
    price: 99,
    setup: '$199 one-time setup',
    popular: true,
    icon: Star,
    features: [
      { text: 'Custom quote builder (products + prices + taxes)', included: true },
      { text: 'Pipeline configured with your real business stages', included: true },
      { text: 'WhatsApp Business connected to CRM', included: true },
      { text: 'Automated Follow-up Agent (monitors pipeline 24/7)', included: true },
      { text: 'Automatic alerts to sales rep for stalled quotes', included: true },
      { text: 'Quote builder embedded as iframe on your website', included: true },
      { text: 'Automatic messages to client on every status change', included: true },
    ],
    support: 'WhatsApp within 12h (Mon–Fri) · 2 Zoom calls/mo',
    accentClass: 'text-viralOrange',
    borderClass: 'border-viralOrange',
    bgClass: 'bg-gradient-to-b from-viralOrange/15 to-gray-900',
    btnClass: 'bg-viralOrange hover:bg-viralOrange/90',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'With AI Agents',
    description: 'For the established business that wants to automate everything',
    price: 149,
    setup: '$349 one-time setup',
    popular: false,
    icon: Crown,
    features: [
      { text: 'Everything in Growth included', included: true },
      { text: 'Auto-Quote Agent (calculates price + generates PDF + sends via WhatsApp)', included: true },
      { text: 'Cold Lead Revival Agent (recovers lost sales automatically)', included: true },
      { text: 'Post-Sale & Referral Agent (requests review + referral automatically)', included: true },
      { text: 'Approved WhatsApp templates via Meta Business', included: true },
      { text: 'Cal.com integrated: appointments book themselves', included: true },
      { text: 'Sales team onboarding & training included', included: true },
    ],
    support: 'WhatsApp within 4h (Mon–Sat) · 4 Zoom calls/mo',
    accentClass: 'text-purple-400',
    borderClass: 'border-purple-500/40',
    bgClass: 'bg-purple-500/5',
    btnClass: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'All inclusive',
    description: 'For the full operation that wants everything automated',
    price: 199,
    setup: '$499 one-time setup',
    popular: false,
    icon: Building2,
    features: [
      { text: 'Everything in Pro included', included: true },
      { text: 'Weekly Reports Agent (automated summary every Monday 8am)', included: true },
      { text: 'Collections Agent (reminds and escalates until payment is received)', included: true },
      { text: '24/7 WhatsApp Agent (handles, quotes and books without human input)', included: true },
      { text: 'Lead Classifier Agent (automatically prioritizes with AI)', included: true },
      { text: 'Deal Prediction Agent (tells sales rep which leads to focus on)', included: true },
      { text: 'Custom reporting dashboard with business metrics', included: true },
      { text: 'Dedicated Mormoy analyst during the first month', included: true },
    ],
    support: 'Priority WhatsApp within 1h (7 days) · Unlimited Zoom',
    accentClass: 'text-amber-400',
    borderClass: 'border-amber-500/40',
    bgClass: 'bg-gradient-to-b from-amber-500/10 to-gray-900',
    btnClass: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      navigate('/auth');
    } else {
      navigate(`/checkout?plan=${planId}`);
    }
  };

  return (
    <section id="planes" className="py-16 px-4 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Plans & Pricing
          </h2>
          <p className="text-white/60 text-lg">
            All prices in USD. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Plans Grid - 5 columns on desktop, scroll on mobile */}
        <div className="max-w-7xl mx-auto mb-12">
          {/* Desktop: 5 columns */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
            ))}
          </div>

          {/* Tablet: 3+2 grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:hidden gap-4 mb-4">
            {plans.slice(0, 3).map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4 max-w-2xl mx-auto">
            {plans.slice(3).map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
            ))}
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden space-y-4">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            WhatsApp messaging costs (Twilio) are paid separately by the client at ~$0.03–$0.05 USD/msg.
            <br />
            Setup is a one-time fee that includes full configuration, onboarding and training.
          </p>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ plan, onSelect }: { plan: Plan; onSelect: (id: string) => void }) => {
  const Icon = plan.icon;

  return (
    <div className={cn(
      "relative rounded-2xl p-5 border transition-all duration-300 flex flex-col",
      plan.bgClass,
      plan.borderClass,
      plan.popular && 'ring-2 ring-viralOrange/50 scale-[1.02] z-10'
    )}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-viralOrange text-white border-0 px-3 py-1 text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3" /> Most popular
          </Badge>
        </div>
      )}

      <div className="text-center mb-4 pt-2">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3", plan.popular ? 'bg-viralOrange/20' : 'bg-white/5')}>
          <Icon className={cn("w-5 h-5", plan.accentClass)} />
        </div>
        <h3 className="text-white font-bold text-lg">{plan.name}</h3>
        <p className={cn("text-xs font-medium", plan.accentClass)}>{plan.tagline}</p>
      </div>

      <div className="text-center mb-4">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl font-bold text-white">${plan.price}</span>
          <span className="text-white/50 text-sm">/mo</span>
        </div>
        <p className="text-white/40 text-xs mt-1">{plan.setup}</p>
      </div>

      <p className="text-white/50 text-xs text-center mb-4 leading-relaxed">{plan.description}</p>

      <ul className="space-y-2 mb-4 flex-1">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            {feature.included ? (
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" />
            )}
            <span className={cn(
              "text-xs leading-relaxed",
              feature.included ? 'text-white/80' : 'text-white/30 line-through'
            )}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Support */}
      <div className="border-t border-white/10 pt-3 mb-4">
        <p className="text-white/40 text-[10px] leading-relaxed">
          <span className="text-white/60 font-medium">Support:</span> {plan.support}
        </p>
        {plan.limits && (
          <p className="text-white/30 text-[10px] mt-1">{plan.limits}</p>
        )}
      </div>

      <Button
        onClick={() => onSelect(plan.id)}
        className={cn("w-full text-white text-sm", plan.btnClass)}
        data-cta="pricing-plan"
        data-plan={plan.id}
      >
        {plan.price === 0 ? 'Start Free' : 'Get Started'}
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default PricingSection;
