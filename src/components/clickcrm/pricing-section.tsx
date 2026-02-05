import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Star, CreditCard, MessageSquare, Settings, Wrench, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ComparisonTable from './comparison-table';
import { cn } from '@/lib/utils';
import PricingToggle, { BillingPeriod, AnnualDiscount } from './pricing-toggle';

type SetupType = 'simple' | 'standard' | 'complex' | null;
type PlanType = 'starter' | 'pro' | 'elite' | null;

// Configuration: Set to true to enable the 40% Launch promo
const PROMO_LAUNCH = true;

// Base monthly prices
const BASE_PRICES = {
  starter: 99,
  pro: 249,
  elite: 449,
};

// Helper functions for price calculations
const calculatePricing = (monthlyPrice: number, billingPeriod: BillingPeriod, annualDiscount: AnnualDiscount) => {
  const anualFull = monthlyPrice * 12;
  
  if (billingPeriod === 'monthly') {
    return {
      displayPrice: monthlyPrice,
      period: '/mes',
      originalMonthly: null,
      effectiveMonthly: null,
      annualTotal: null,
      savings: null,
    };
  }
  
  // Annual pricing
  const discountMultiplier = annualDiscount === '40' ? 0.60 : 0.70;
  const annualPrice = Math.round(anualFull * discountMultiplier);
  const effectiveMonthly = Math.round(annualPrice / 12);
  const savings = anualFull - annualPrice;
  
  return {
    displayPrice: annualPrice,
    period: '/año',
    originalMonthly: monthlyPrice,
    effectiveMonthly,
    annualTotal: annualPrice,
    savings,
  };
};

const PricingSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Billing state
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [annualDiscount, setAnnualDiscount] = useState<AnnualDiscount>('30');
  
  // Read recommendation from URL params (set by hero selector)
  const recommendedSetup = searchParams.get('setup') as SetupType;
  const recommendedPlan = searchParams.get('plan') as PlanType;

  const plans = [
    {
      id: 'starter' as const,
      name: t('pricing.starterName'),
      basePrice: BASE_PRICES.starter,
      description: t('pricing.starterDesc'),
      popular: false,
      features: [
        t('pricing.starterFeature1'),
        t('pricing.starterFeature2'),
        t('pricing.starterFeature3'),
        t('pricing.starterFeature4'),
        t('pricing.starterFeature5'),
        t('pricing.starterFeature6'),
        t('pricing.starterFeature7')
      ]
    },
    {
      id: 'pro' as const,
      name: t('pricing.proName'),
      basePrice: BASE_PRICES.pro,
      description: t('pricing.proDesc'),
      popular: true,
      features: [
        t('pricing.proFeature1'),
        t('pricing.proFeature2'),
        t('pricing.proFeature3'),
        t('pricing.proFeature4'),
        t('pricing.proFeature5'),
        t('pricing.proFeature6'),
        t('pricing.proFeature7'),
        t('pricing.proFeature8'),
        t('pricing.proFeature9')
      ]
    },
    {
      id: 'elite' as const,
      name: t('pricing.eliteName'),
      basePrice: BASE_PRICES.elite,
      description: t('pricing.eliteDesc'),
      popular: false,
      features: [
        t('pricing.eliteFeature1'),
        t('pricing.eliteFeature2'),
        t('pricing.eliteFeature3'),
        t('pricing.eliteFeature4'),
        t('pricing.eliteFeature5'),
        t('pricing.eliteFeature6'),
        t('pricing.eliteFeature7'),
        t('pricing.eliteFeature8'),
        t('pricing.eliteFeature9')
      ]
    }
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
            {t('pricing.title')}
          </h2>
          <p className="text-white/70 text-lg mb-6">
            {t('pricing.subtitle')}
          </p>
          
          {/* Pricing Toggle */}
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
                      ✓ Recomendado
                    </span>
                  </div>
                )}
                {!isRecommended && plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-viralOrange text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" /> {t('pricing.popular')}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                  
                  {/* Savings badge for annual plans */}
                  {isAnnual && pricing.savings && (
                    <div className="mb-3">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-sm font-bold border",
                        annualDiscount === '40' 
                          ? "bg-gradient-to-r from-viralOrange/20 to-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-green-500/20 text-green-400 border-green-500/30"
                      )}>
                        🎉 Ahorra ${pricing.savings}
                      </span>
                    </div>
                  )}
                  
                  {/* Price display */}
                  <div className="flex flex-col items-center gap-1">
                    {isAnnual && pricing.originalMonthly && (
                      <span className="text-lg text-white/40 line-through">
                        ${pricing.originalMonthly}/mes
                      </span>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-viralOrange">
                        ${pricing.displayPrice}
                      </span>
                      <span className="text-white/60">{pricing.period}</span>
                    </div>
                    {isAnnual && pricing.effectiveMonthly && (
                      <span className="text-sm text-white/50">
                        Equiv. ${pricing.effectiveMonthly}/mes
                      </span>
                    )}
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
                  className={cn(
                    "w-full",
                    isRecommended 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : plan.popular 
                        ? 'bg-viralOrange hover:bg-viralOrange/90' 
                        : 'bg-gray-700 hover:bg-gray-600'
                  )}
                >
                  {isAnnual ? 'Pagar anual y ahorrar' : t('pricing.getStarted')}
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
                <h4 className="text-white font-bold text-xl">{t('pricing.setupTitle')}</h4>
              </div>
              <p className="text-white/60 text-sm">
                {t('pricing.setupSubtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Simple Setup */}
              <div className={cn(
                "rounded-xl p-5 border transition-all duration-300",
                recommendedSetup === 'simple' 
                  ? "bg-green-500/10 border-green-500 ring-2 ring-green-500/50" 
                  : "bg-gray-900/60 border-gray-700"
              )}>
                {recommendedSetup === 'simple' && (
                  <div className="text-center mb-2">
                    <span className="bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                      ✓ Recomendado
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <span className="text-viralOrange font-bold text-2xl">$500</span>
                  <h5 className="text-white font-semibold mt-1">{t('pricing.setupSimple')}</h5>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupSimple1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupSimple2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupSimple3')}</span>
                  </li>
                </ul>
              </div>

              {/* Standard Setup */}
              <div className={cn(
                "rounded-xl p-5 border relative transition-all duration-300",
                recommendedSetup === 'standard' 
                  ? "bg-green-500/10 border-green-500 ring-2 ring-green-500/50" 
                  : "bg-gray-900/60 border-viralOrange/50"
              )}>
                {recommendedSetup === 'standard' ? (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold animate-pulse">
                      ✓ Recomendado
                    </span>
                  </div>
                ) : (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-viralOrange text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                      {t('pricing.setupMostCommon')}
                    </span>
                  </div>
                )}
                <div className="text-center mb-4 pt-2">
                  <span className="text-viralOrange font-bold text-2xl">$1,000</span>
                  <h5 className="text-white font-semibold mt-1">{t('pricing.setupStandard')}</h5>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupStandard1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupStandard2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupStandard3')}</span>
                  </li>
                  {/* Landing Pack Pro - highlighted */}
                  <li className="flex items-start gap-2 bg-viralOrange/10 -mx-2 px-2 py-1.5 rounded-lg border border-viralOrange/30">
                    <Star className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span className="text-viralOrange font-medium">{t('pricing.landingPackPro')}</span>
                  </li>
                </ul>
                {/* Landing Pack explanation */}
                <p className="text-white/50 text-xs mt-3 leading-relaxed">
                  {t('pricing.landingPackDesc')}
                </p>
              </div>

              {/* Complex Setup */}
              <div className={cn(
                "rounded-xl p-5 border relative transition-all duration-300",
                recommendedSetup === 'complex' 
                  ? "bg-green-500/10 border-green-500 ring-2 ring-green-500/50" 
                  : "bg-gray-900/60 border-gray-700"
              )}>
                {recommendedSetup === 'complex' ? (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold animate-pulse">
                      ✓ Recomendado
                    </span>
                  </div>
                ) : (
                  <div className="absolute -top-2 right-3">
                    <span className="bg-purple-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                      {t('pricing.setupEnterprise')}
                    </span>
                  </div>
                )}
                <div className="text-center mb-4 pt-1">
                  <span className="text-viralOrange font-bold text-2xl">$1,600</span>
                  <h5 className="text-white font-semibold mt-1">{t('pricing.setupComplex')}</h5>
                </div>
                <ul className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupComplex1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupComplex2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupComplex3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupComplex4')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-viralOrange flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.setupComplex5')}</span>
                  </li>
                  {/* Landing Pack Elite - highlighted */}
                  <li className="flex items-start gap-2 bg-purple-600/10 -mx-2 px-2 py-1.5 rounded-lg border border-purple-500/30">
                    <Star className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-300 font-medium">{t('pricing.landingPackElite')}</span>
                  </li>
                </ul>
                {/* Why complex is worth it */}
                <p className="text-white/50 text-xs mt-3 leading-relaxed">
                  {t('pricing.setupComplexDesc')}
                </p>
              </div>
            </div>

            <p className="text-white/50 text-xs text-center mt-4 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" />
              {t('pricing.setupNote')}
            </p>
            
            {/* Landing Pack disclaimer */}
            <p className="text-white/40 text-[10px] text-center mt-3 max-w-2xl mx-auto leading-relaxed">
              {t('pricing.landingPackDisclaimer')}
            </p>
            
            {/* Logo disclaimer */}
            <p className="text-yellow-400/80 text-[11px] text-center mt-2 max-w-2xl mx-auto leading-relaxed font-medium">
              {t('pricing.landingLogoDisclaimer')}
            </p>
          </div>
        </div>

        {/* Important notes */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h4 className="text-white font-semibold mb-4 text-center text-lg">{t('pricing.infoTitle')}</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">{t('pricing.twilioTitle')}</span>
                </div>
                <p className="text-white/60 text-sm">{t('pricing.twilioDesc')}</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">{t('pricing.stripeTitle')}</span>
                </div>
                <p className="text-white/60 text-sm">{t('pricing.stripeDesc')}</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">{t('pricing.setupInfoTitle')}</span>
                </div>
                <p className="text-white/60 text-sm">{t('pricing.setupInfoDesc')}</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">{t('pricing.monthlyTitle')}</span>
                </div>
                <p className="text-white/60 text-sm">{t('pricing.monthlyDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
