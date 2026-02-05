import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export type BillingPeriod = 'monthly' | 'annual';
export type AnnualDiscount = '30' | '40';

interface PricingToggleProps {
  billingPeriod: BillingPeriod;
  onBillingChange: (period: BillingPeriod) => void;
  annualDiscount: AnnualDiscount;
  onAnnualDiscountChange: (discount: AnnualDiscount) => void;
  promoLaunch: boolean;
}

const PricingToggle = ({
  billingPeriod,
  onBillingChange,
  annualDiscount,
  onAnnualDiscountChange,
  promoLaunch,
}: PricingToggleProps) => {
  const isAnnual = billingPeriod === 'annual';

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      {/* Main Toggle: Monthly / Annual */}
      <div className="flex items-center gap-4 bg-gray-800/60 rounded-full px-6 py-3 border border-gray-700">
        <span 
          className={cn(
            "text-sm font-medium transition-colors cursor-pointer",
            !isAnnual ? "text-white" : "text-white/50"
          )}
          onClick={() => onBillingChange('monthly')}
        >
          Mensual
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={(checked) => onBillingChange(checked ? 'annual' : 'monthly')}
          className="data-[state=checked]:bg-viralOrange"
        />
        <span 
          className={cn(
            "text-sm font-medium transition-colors cursor-pointer",
            isAnnual ? "text-white" : "text-white/50"
          )}
          onClick={() => onBillingChange('annual')}
        >
          Anual{' '}
          <span className="text-viralOrange font-bold">(Ahorra 30%)</span>
        </span>
      </div>

      {/* Launch Promo Badge - Only shows when promoLaunch = true */}
      {promoLaunch && (
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-viralOrange to-yellow-500 text-white px-4 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-glow">
            🚀 Launch Anual (Ahorra 40%) – Hasta Feb 28
          </span>
        </div>
      )}

      {/* Discount Selector - Only visible when Annual is selected AND promoLaunch = true */}
      {isAnnual && promoLaunch && (
        <div className="flex items-center gap-2 bg-gray-900/80 rounded-full p-1 border border-gray-700">
          <button
            onClick={() => onAnnualDiscountChange('30')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              annualDiscount === '30'
                ? "bg-gray-700 text-white"
                : "text-white/60 hover:text-white"
            )}
          >
            Anual -30%
          </button>
          <button
            onClick={() => onAnnualDiscountChange('40')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              annualDiscount === '40'
                ? "bg-gradient-to-r from-viralOrange to-yellow-500 text-white shadow-md"
                : "text-white/60 hover:text-white"
            )}
          >
            🔥 Launch -40%
          </button>
        </div>
      )}
    </div>
  );
};

export default PricingToggle;
