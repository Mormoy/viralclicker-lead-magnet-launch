import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Star, CreditCard, MessageSquare, Settings, Wrench, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ComparisonTable from './comparison-table';
import PricingSelector from './pricing-selector';
import { cn } from '@/lib/utils';

type SetupType = 'simple' | 'standard' | 'complex' | null;
type PlanType = 'starter' | 'pro' | 'elite' | null;

const PricingSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [recommendedSetup, setRecommendedSetup] = useState<SetupType>(null);
  const [recommendedPlan, setRecommendedPlan] = useState<PlanType>(null);

  const handleRecommendation = (setup: SetupType, plan: PlanType) => {
    setRecommendedSetup(setup);
    setRecommendedPlan(plan);
  };

  const plans = [
    {
      id: 'starter',
      name: t('pricing.starterName'),
      price: "$99",
      originalPrice: "$200",
      discount: "50%",
      period: t('pricing.perMonth'),
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
      id: 'pro',
      name: t('pricing.proName'),
      price: "$249",
      originalPrice: "$499",
      discount: "50%",
      period: t('pricing.perMonth'),
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
      id: 'elite',
      name: t('pricing.eliteName'),
      price: "$449",
      originalPrice: "$1099",
      discount: "59%",
      period: t('pricing.perMonth'),
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
    navigate(`/checkout?plan=${planId}`);
  };

  return (
    <section id="planes" className="py-16 px-4 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-white/70 text-lg">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Selector Guiado */}
        <PricingSelector onRecommendation={handleRecommendation} />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8 landscape-grid">
          {plans.map((plan, index) => {
            const isRecommended = recommendedPlan === plan.id;
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
                  
                  {plan.discount && (
                    <div className="mb-2">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                        {plan.discount} {t('pricing.launchOffer')}
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
                  className={cn(
                    "w-full",
                    isRecommended 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : plan.popular 
                        ? 'bg-viralOrange hover:bg-viralOrange/90' 
                        : 'bg-gray-700 hover:bg-gray-600'
                  )}
                >
                  {t('pricing.getStarted')}
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
