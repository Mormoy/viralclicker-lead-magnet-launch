import { Check, Star, CreditCard, MessageSquare, Settings, Wrench, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ComparisonTable from './comparison-table';

const plans = [
  {
    id: 'starter',
    name: "Starter",
    price: "$99",
    originalPrice: "$200",
    discount: "50%",
    period: "/month",
    description: "Perfect for getting your sales process organized",
    popular: false,
    features: [
      "Landing page + contact form",
      "Basic CRM with stages",
      "3 WhatsApp templates",
      "CSV export",
      "Email support",
      "1 x 30-min session/month",
      "1 minor change/month"
    ]
  },
  {
    id: 'pro',
    name: "Pro",
    price: "$249",
    originalPrice: "$499",
    discount: "50%",
    period: "/month",
    description: "For businesses ready to automate and scale",
    popular: true,
    features: [
      "Everything in Starter +",
      "Custom quote builder with live link",
      "Coupons on quotes",
      "Base automations (n8n)",
      "Internal WhatsApp campaigns",
      "Conversion reports",
      "30 min support bi-weekly",
      "2 minor changes/month"
    ]
  },
  {
    id: 'elite',
    name: "Elite",
    price: "$449",
    originalPrice: "$1099",
    discount: "59%",
    period: "/month",
    description: "Complete solution with priority support",
    popular: false,
    features: [
      "Everything in Pro +",
      "Full post-sale tracking",
      "Advanced automation",
      "Calendly integration",
      "Multi-user (if applicable)",
      "Priority support",
      "Onboarding: 30 min/week x4",
      "3 minor changes/month"
    ]
  }
];

const PricingSection = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    navigate(`/checkout?plan=${planId}`);
  };

  return (
    <section id="planes" className="py-16 px-4 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Plans & Pricing
          </h2>
          <p className="text-white/70 text-lg">
            Choose the plan that fits your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8 landscape-grid">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-6 border ${
                plan.popular 
                  ? 'bg-gradient-to-b from-viralOrange/20 to-gray-900 border-viralOrange' 
                  : 'bg-gray-800/50 border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-viralOrange text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" /> Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                
                {/* Discount badge */}
                {plan.discount && (
                  <div className="mb-2">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                      {plan.discount} OFF – Launch offer
                    </span>
                  </div>
                )}
                
                <div className="flex items-baseline justify-center gap-2">
                  {plan.originalPrice && (
                    <span className="text-xl text-white/40 line-through">{plan.originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold text-viralOrange">{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                </div>
                <p className="text-white/50 text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-viralOrange hover:bg-viralOrange/90' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Get started
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Setup Inicial - 3 Rangos */}
        <div className="max-w-4xl mx-auto mt-12 mb-6">
          <div className="bg-viralOrange/10 border border-viralOrange/30 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Settings className="w-6 h-6 text-viralOrange" />
                <h4 className="text-white font-bold text-xl">One-Time Setup Fee</h4>
              </div>
              <p className="text-white/60 text-sm">
                One-time payment based on your business complexity and catalog size
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Simple */}
              <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700">
                <div className="text-center mb-4">
                  <span className="text-viralOrange font-bold text-2xl">$500</span>
                  <h5 className="text-white font-semibold mt-1">Simple</h5>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>Small catalog (up to 10 products/services)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>Quote builder with fixed prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>Ideal for simple services or standard products</span>
                  </li>
                </ul>
              </div>

              {/* Standard */}
              <div className="bg-gray-900/60 rounded-xl p-5 border border-viralOrange/50 relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-viralOrange text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                    Most Common
                  </span>
                </div>
                <div className="text-center mb-4 pt-2">
                  <span className="text-viralOrange font-bold text-2xl">$750</span>
                  <h5 className="text-white font-semibold mt-1">Standard</h5>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>Medium catalog (11-30 products/services)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>Quote builder with variables (sizes, materials, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>For businesses with customizable options</span>
                  </li>
                </ul>
              </div>

              {/* Complex */}
              <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700">
                <div className="text-center mb-4">
                  <span className="text-viralOrange font-bold text-2xl">$1,000+</span>
                  <h5 className="text-white font-semibold mt-1">Complex</h5>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>Large catalog (30+ products/services)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>Pricing logic with multiple variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>Businesses with sophisticated quoting processes</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-white/50 text-xs text-center mt-4 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" />
              Confirmed after the demo based on complexity. All setups include: landing design, CRM config, WhatsApp API integration, and 1-on-1 onboarding.
            </p>
          </div>
        </div>

        {/* Important notes - Enhanced */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h4 className="text-white font-semibold mb-4 text-center text-lg">📋 Important Information</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Twilio / WhatsApp</span>
                </div>
                <p className="text-white/60 text-sm">
                  Twilio/WhatsApp Business API messaging costs are paid <strong className="text-white/80">directly to Twilio</strong>. ClickCRM implements, configures, and integrates the entire system.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Stripe Payments</span>
                </div>
                <p className="text-white/60 text-sm">
                  Secure card payment. You receive an <strong className="text-white/80">automatic invoice/receipt</strong> via email after each payment. Monthly auto-renewal.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">One-time setup</span>
                </div>
                <p className="text-white/60 text-sm">
                  One-time payment from <strong className="text-white/80">$500 to $1,000+</strong> depending on complexity (catalog size and quote variables).
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Your monthly includes</span>
                </div>
                <p className="text-white/60 text-sm">
                  Landing page <strong className="text-white/80">hosting</strong>, system <strong className="text-white/80">maintenance</strong>, <strong className="text-white/80">support</strong>, and <strong className="text-white/80">minor updates</strong> per your plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
