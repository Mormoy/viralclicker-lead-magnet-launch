import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingSelectorProps {
  onRecommendation: (setup: 'simple' | 'standard' | 'complex', plan: 'starter' | 'pro' | 'elite') => void;
}

type CatalogSize = '1-10' | '11-30' | '30+' | null;
type MonthlyNeed = 'organize' | 'quote' | 'advanced' | null;

const PricingSelector = ({ onRecommendation }: PricingSelectorProps) => {
  const { t } = useTranslation();
  const [catalogSize, setCatalogSize] = useState<CatalogSize>(null);
  const [monthlyNeed, setMonthlyNeed] = useState<MonthlyNeed>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const catalogOptions: { value: CatalogSize; label: string }[] = [
    { value: '1-10', label: t('selector.catalog1') },
    { value: '11-30', label: t('selector.catalog2') },
    { value: '30+', label: t('selector.catalog3') },
  ];

  const needOptions: { value: MonthlyNeed; label: string; desc: string }[] = [
    { value: 'organize', label: t('selector.need1'), desc: t('selector.need1Desc') },
    { value: 'quote', label: t('selector.need2'), desc: t('selector.need2Desc') },
    { value: 'advanced', label: t('selector.need3'), desc: t('selector.need3Desc') },
  ];

  const getSetupRecommendation = (): 'simple' | 'standard' | 'complex' => {
    if (catalogSize === '1-10') return 'simple';
    if (catalogSize === '11-30') return 'standard';
    return 'complex';
  };

  const getPlanRecommendation = (): 'starter' | 'pro' | 'elite' => {
    if (monthlyNeed === 'organize') return 'starter';
    if (monthlyNeed === 'quote') return 'pro';
    return 'elite';
  };

  const handleShowRecommendation = () => {
    if (catalogSize && monthlyNeed) {
      setShowRecommendation(true);
      onRecommendation(getSetupRecommendation(), getPlanRecommendation());
    }
  };

  const setupLabels = {
    simple: { name: t('pricing.setupSimple'), price: '$500' },
    standard: { name: t('pricing.setupStandard'), price: '$1,000' },
    complex: { name: t('pricing.setupComplex'), price: '$1,600' },
  };

  const planLabels = {
    starter: { name: t('pricing.starterName'), price: '$99/mes' },
    pro: { name: t('pricing.proName'), price: '$249/mes' },
    elite: { name: t('pricing.eliteName'), price: '$449/mes' },
  };

  const recommendation = catalogSize && monthlyNeed ? {
    setup: getSetupRecommendation(),
    plan: getPlanRecommendation(),
  } : null;

  return (
    <div className="max-w-3xl mx-auto mb-10">
      <div className="bg-gradient-to-br from-viralOrange/10 via-gray-900/80 to-purple-900/20 rounded-2xl p-6 border border-viralOrange/30 shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-viralOrange" />
          <h3 className="text-white font-bold text-lg">{t('selector.title')}</h3>
        </div>
        <p className="text-white/60 text-sm text-center mb-6">{t('selector.subtitle')}</p>

        {/* Question 1: Catalog Size */}
        <div className="mb-6">
          <p className="text-white font-medium mb-3 flex items-center gap-2">
            <span className="bg-viralOrange text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            {t('selector.q1')}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {catalogOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setCatalogSize(option.value);
                  setShowRecommendation(false);
                }}
                className={cn(
                  "px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                  catalogSize === option.value
                    ? "bg-viralOrange/20 border-viralOrange text-viralOrange"
                    : "bg-gray-800/50 border-gray-700 text-white/70 hover:border-gray-600 hover:bg-gray-800"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: Monthly Needs */}
        <div className="mb-6">
          <p className="text-white font-medium mb-3 flex items-center gap-2">
            <span className="bg-viralOrange text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            {t('selector.q2')}
          </p>
          <div className="space-y-2">
            {needOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setMonthlyNeed(option.value);
                  setShowRecommendation(false);
                }}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border text-left transition-all",
                  monthlyNeed === option.value
                    ? "bg-viralOrange/20 border-viralOrange"
                    : "bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                )}
              >
                <span className={cn(
                  "font-medium text-sm",
                  monthlyNeed === option.value ? "text-viralOrange" : "text-white/90"
                )}>
                  {option.label}
                </span>
                <span className="text-white/50 text-xs ml-2">{option.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Show Recommendation Button */}
        {catalogSize && monthlyNeed && !showRecommendation && (
          <button
            onClick={handleShowRecommendation}
            className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            {t('selector.showRecommendation')}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Recommendation Result */}
        {showRecommendation && recommendation && (
          <div className="bg-gradient-to-r from-green-500/10 to-viralOrange/10 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold text-sm">{t('selector.recommendationTitle')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                <p className="text-white/50 text-xs mb-1">{t('selector.setupLabel')}</p>
                <p className="text-white font-semibold">{setupLabels[recommendation.setup].name}</p>
                <p className="text-viralOrange font-bold">{setupLabels[recommendation.setup].price}</p>
              </div>
              <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                <p className="text-white/50 text-xs mb-1">{t('selector.planLabel')}</p>
                <p className="text-white font-semibold">{planLabels[recommendation.plan].name}</p>
                <p className="text-viralOrange font-bold">{planLabels[recommendation.plan].price}</p>
              </div>
            </div>
            <p className="text-white/60 text-xs text-center mt-3">
              {t('selector.scrollHint')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingSelector;
