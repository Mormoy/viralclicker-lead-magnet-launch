import { useState } from 'react';
import { Check, Star, CreditCard, MessageSquare, Settings, Wrench, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ComparisonTable from './comparison-table';
import { cn } from '@/lib/utils';
import PricingToggle, { BillingPeriod, AnnualDiscount } from './pricing-toggle';

type SetupType = 'simple' | 'standard' | 'complex' | null;
type PlanType = 'starter' | 'pro' | 'elite' | null;

const PROMO_LAUNCH = true;

const BASE_PRICES = {
  starter: 99,
  pro: 249,
  elite: 449,
};

const calculatePricing = (monthlyPrice: number, billingPeriod: BillingPeriod, annualDiscount: AnnualDiscount) => {
  const anualFull = monthlyPrice * 12;
  if (billingPeriod === 'monthly') {
    return { displayPrice: monthlyPrice, period: '/mo', originalMonthly: null, effectiveMonthly: null, annualTotal: null, savings: null };
  }
  const discountMultiplier = annualDiscount === '40' ? 0.60 : 0.70;
  const annualPrice = Math.round(anualFull * discountMultiplier);
  const effectiveMonthly = Math.round(annualPrice / 12);
  const savings = anualFull - annualPrice;
  return { displayPrice: annualPrice, period: '/yr', originalMonthly: monthlyPrice, effectiveMonthly, annualTotal: annualPrice, savings };
};

const PricingSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [annualDiscount, setAnnualDiscount] = useState<AnnualDiscount>('30');
  const recommendedSetup = searchParams.get('setup') as SetupType;
  const recommendedPlan = searchParams.get('plan') as PlanType;

  const plans = [
    {
      id: 'starter' as const,
      name: 'Starter',
      basePrice: BASE_PRICES.starter,
      headline: 'Organize your quotes and leads in one place',
      description: 'Perfect for small businesses that want to manage inquiries, quotes and customers without complicated software.',
      idealFor: 'Ideal for organizing leads & pipeline',
      popular: false,
      features: [
        'Smart Quote Page',
        'CRM pipeline with stages',
        'Send quotes through WhatsApp',
        '3 WhatsApp message templates',
        'Export leads to CSV',
        'Email support',
        '1 monthly support session',
        '1 small change per month',
      ],
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      basePrice: BASE_PRICES.pro,
      headline: 'Automate your quoting and follow-ups',
      description: 'For businesses ready to close more deals and automate part of their sales process.',
      idealFor: 'Ideal for quoting + coupons + campaigns',
      popular: true,
      features: [
        'Everything in Starter',
        'Smart Quote Builder with live quote link',
        'Discount coupons on quotes',
        'Automated follow-up reminders',
        'Internal WhatsApp campaigns',
        'Conversion reports',
        'Bi-weekly support session',
        '2 small changes per month',
        'Stripe payment setup',
      ],
    },
    {
      id: 'elite' as const,
      name: 'Elite',
      basePrice: BASE_PRICES.elite,
      headline: 'Full sales automation for growing teams',
      description: 'Advanced automation and priority support for businesses managing higher lead volume.',
      idealFor: 'Ideal for post-sale + multi-user + priority support',
      popular: false,
      features: [
        'Everything in Pro',
        'Advanced automation',
        'Post-sale follow-ups',
        'Calendly integration',
        'Multi-user access',
        'Priority support',
        'Weekly onboarding sessions',
        '3 small changes per month',
        'Stripe payment configuration',
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    const billingParam = billingPeriod === 'annual' ? `&billing=annual&discount=${annualDiscount}` : '';
    navigate(`/checkout?plan=${planId}${billingParam}`);
  };

  return (
    <section id="planes" className="py-16 px-4 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-white/70 text-lg mb-6">
            Choose the plan that fits your business. No hidden fees.
          </p>
          <PricingToggle
            billingPeriod={billingPeriod}
            onBillingChange={setBillingPeriod}
            annualDiscount={annualDiscount}
            onAnnualDiscountChange={setAnnualDiscount}
            promoLaunch={PROMO_LAUNCH}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8 landscape-grid">
          {plans.map((plan, index) => {
            const isRecommended = recommendedPlan === plan.id;
            const pricing = calculatePricing(plan.basePrice, billingPeriod, annualDiscount);
            const isAnnual = billingPeriod === 'annual';

            return (
              <div
                key={index}
                className={cn(
                  "relative rounded-2xl p-6 border transition-all duration-300",
                  isRecommended
                    ? 'bg-gradient-to-b from-green-500/20 to-gray-900 border-green-500 ring-2 ring-green-500/50 scale-[1.02]'
                    : plan.popular
                      ? 'bg-gradient-to-b from-viralOrange/20 to-gray-900 border-viralOrange'
                      : 'bg-gray-800/50 border-gray-700'
                )}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 animate-pulse">
                      ✓ Recommended
                    </span>
                  </div>
                )}
                {!isRecommended && plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-viralOrange text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-white font-semibold text-sm mb-2">{plan.headline}</p>

                  {isAnnual && pricing.savings && (
                    <div className="mb-3">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-sm font-bold border",
                        annualDiscount === '40'
                          ? "bg-gradient-to-r from-viralOrange/20 to-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-green-500/20 text-green-400 border-green-500/30"
                      )}>
                        🎉 Save ${pricing.savings}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-1">
                    {isAnnual && pricing.originalMonthly && (
                      <span className="text-lg text-white/40 line-through">${pricing.originalMonthly}/mo</span>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-viralOrange">${pricing.displayPrice}</span>
                      <span className="text-white/60">{pricing.period}</span>
                    </div>
                    {isAnnual && pricing.effectiveMonthly && (
                      <span className="text-sm text-white/50">Equiv. ${pricing.effectiveMonthly}/mo</span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm mt-2">{plan.description}</p>
                  <p className="text-viralOrange/80 text-xs font-medium mt-1">{plan.idealFor}</p>
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
                  className={cn(
                    "w-full",
                    isRecommended
                      ? 'bg-green-500 hover:bg-green-600'
                      : plan.popular
                        ? 'bg-viralOrange hover:bg-viralOrange/90'
                        : 'bg-gray-700 hover:bg-gray-600'
                  )}
                  data-cta="pricing-plan"
                  data-plan={plan.id}
                >
                  {isAnnual ? 'Pay annually & save' : 'Get Started'}
                </Button>
              </div>
            );
          })}
        </div>

        <ComparisonTable />

        {/* Setup Section */}
        <div className="max-w-4xl mx-auto mt-12 mb-6">
          <div className="bg-viralOrange/10 border border-viralOrange/30 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Settings className="w-6 h-6 text-viralOrange" />
                <h4 className="text-white font-bold text-xl">Setup Starting at $500</h4>
              </div>
              <p className="text-white/70 text-sm font-medium mb-1">
                Includes Smart Quote Builder + CRM + WhatsApp API + 1:1 onboarding
              </p>
              <a
                href="https://wa.me/13051234567?text=Hi,%20I%20need%20an%20exact%20setup%20estimate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-viralOrange hover:underline text-xs mt-2 inline-block"
                data-cta="whatsapp"
              >
                Need an exact estimate? Talk on WhatsApp →
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Simple */}
              <div className={cn(
                "rounded-xl p-5 border transition-all duration-300",
                recommendedSetup === 'simple'
                  ? "bg-green-500/10 border-green-500 ring-2 ring-green-500/50"
                  : "bg-gray-900/60 border-gray-700"
              )}>
                {recommendedSetup === 'simple' && (
                  <div className="text-center mb-2">
                    <span className="bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">✓ Recommended</span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <span className="text-viralOrange font-bold text-2xl">$500</span>
                  <h5 className="text-white font-semibold mt-1">Simple</h5>
                  <p className="text-white/50 text-xs mt-1">Best for small service businesses</p>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Smart Quote Builder setup</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>CRM pipeline configuration</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>WhatsApp integration</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>1 Smart Quote Page</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Up to 10 services/products</span></li>
                </ul>
              </div>

              {/* Standard */}
              <div className={cn(
                "rounded-xl p-5 border relative transition-all duration-300",
                recommendedSetup === 'standard'
                  ? "bg-green-500/10 border-green-500 ring-2 ring-green-500/50"
                  : "bg-gray-900/60 border-viralOrange/50"
              )}>
                {recommendedSetup === 'standard' ? (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold animate-pulse">✓ Recommended</span>
                  </div>
                ) : (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-viralOrange text-white px-3 py-0.5 rounded-full text-xs font-semibold">Most Common</span>
                  </div>
                )}
                <div className="text-center mb-4 pt-2">
                  <span className="text-viralOrange font-bold text-2xl">$1,000</span>
                  <h5 className="text-white font-semibold mt-1">Standard</h5>
                  <p className="text-white/50 text-xs mt-1">Best for businesses with multiple services</p>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Everything in Simple</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Smart quote options (sizes, materials, etc.)</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Up to 3 Smart Quote Pages</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Quote automation setup</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Business onboarding</span></li>
                </ul>
              </div>

              {/* Advanced */}
              <div className={cn(
                "rounded-xl p-5 border relative transition-all duration-300",
                recommendedSetup === 'complex'
                  ? "bg-green-500/10 border-green-500 ring-2 ring-green-500/50"
                  : "bg-gray-900/60 border-gray-700"
              )}>
                {recommendedSetup === 'complex' && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold animate-pulse">✓ Recommended</span>
                  </div>
                )}
                <div className="text-center mb-4 pt-1">
                  <span className="text-viralOrange font-bold text-2xl">$1,600</span>
                  <h5 className="text-white font-semibold mt-1">Advanced</h5>
                  <p className="text-white/50 text-xs mt-1">For complex service catalogs</p>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Everything in Standard</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Advanced pricing rules</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Multi-category quotes</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Up to 5 Smart Quote Pages</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" /><span>Custom workflow setup</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h4 className="text-white font-semibold mb-4 text-center text-lg">Important Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">WhatsApp Messaging</span>
                </div>
                <p className="text-white/60 text-sm">Messages are sent through WhatsApp Business API using Twilio. Messaging costs are paid directly to Twilio.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Secure Payments</span>
                </div>
                <p className="text-white/60 text-sm">All subscriptions are processed securely through Stripe with automatic monthly billing.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">One-Time Setup</span>
                </div>
                <p className="text-white/60 text-sm">Setup is a one-time investment. Includes full configuration and 1:1 onboarding.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Your Monthly Plan Includes</span>
                </div>
                <p className="text-white/60 text-sm">Hosting, system maintenance, updates and support according to your plan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
