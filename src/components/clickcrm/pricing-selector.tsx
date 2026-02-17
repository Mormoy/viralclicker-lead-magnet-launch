import { useState } from 'react';
import { Sparkles, ChevronRight, Check, MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type CatalogSize = '1-10' | '11-30' | '30+' | null;
type MonthlyNeed = 'organize' | 'quote' | 'advanced' | null;

const PricingSelector = () => {
  const { toast } = useToast();
  const [catalogSize, setCatalogSize] = useState<CatalogSize>(null);
  const [monthlyNeed, setMonthlyNeed] = useState<MonthlyNeed>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadData, setLeadData] = useState({ nombre: '', whatsapp: '', correo: '' });

  const catalogOptions = [
    { value: '1-10' as CatalogSize, label: '1–10' },
    { value: '11-30' as CatalogSize, label: '11–30' },
    { value: '30+' as CatalogSize, label: '30+' },
  ];

  const needOptions = [
    { value: 'organize' as MonthlyNeed, label: 'Organizar leads', desc: '(CRM básico, landing)' },
    { value: 'quote' as MonthlyNeed, label: 'Cotizar con link + cupones', desc: '(automatización base)' },
    { value: 'advanced' as MonthlyNeed, label: 'Automatización avanzada', desc: '(multi-usuario, post-venta)' },
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

  const setupLabels = {
    simple: { name: 'Simple', price: '$500' },
    standard: { name: 'Estándar', price: '$1,000' },
    complex: { name: 'Complejo', price: '$1,600' },
  };

  const planLabels = {
    starter: { name: 'Starter', price: '$99/mes', bullets: ['Landing + formulario', 'CRM con pipeline', 'Plantillas WhatsApp'] },
    pro: { name: 'Pro', price: '$249/mes', bullets: ['Cotizador con link vivo', 'Cupones inteligentes', 'Campañas WhatsApp'] },
    elite: { name: 'Elite', price: '$449/mes', bullets: ['Post-venta completo', 'Multi-usuario', 'Soporte prioritario'] },
  };

  const handleShowRecommendation = () => {
    if (catalogSize && monthlyNeed) {
      const setup = getSetupRecommendation();
      const plan = getPlanRecommendation();
      
      const url = new URL(window.location.href);
      url.searchParams.set('setup', setup);
      url.searchParams.set('plan', plan);
      window.history.replaceState({}, '', url.toString());
      
      setShowRecommendation(true);
      setShowLeadForm(true);
    }
  };

  const recommendation = catalogSize && monthlyNeed ? {
    setup: getSetupRecommendation(),
    plan: getPlanRecommendation(),
  } : null;

  const handleSubmitLead = async () => {
    if (!leadData.nombre.trim() || !leadData.whatsapp.trim()) {
      toast({ title: "Error", description: "Nombre y WhatsApp son obligatorios", variant: "destructive" });
      return;
    }

    const phoneRegex = /^[\d\s+()-]{8,20}$/;
    if (!phoneRegex.test(leadData.whatsapp)) {
      toast({ title: "Error", description: "Ingresa un número de WhatsApp válido (ej: +1 305 123 4567)", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const plan = recommendation ? planLabels[recommendation.plan].name : '';
      const setup = recommendation ? setupLabels[recommendation.setup].name : '';

      await supabase.from('leads').insert([{
        nombre: leadData.nombre,
        whatsapp: leadData.whatsapp,
        correo: leadData.correo || `${Date.now()}@selector.viralclicker.com`,
        empresa: `Selector: ${plan} + ${setup}`,
        rubro: 'Selector rápido',
        ciudad: 'N/A',
      }]);

      // Open WhatsApp with recommendation summary
      const msg = encodeURIComponent(
        `Hola! Acabo de usar el selector de ViralClicker.\n\nMi recomendación:\n• Plan: ${plan} (${planLabels[recommendation!.plan].price})\n• Setup: ${setup} (${setupLabels[recommendation!.setup].price})\n\nMe gustaría agendar una demo.`
      );
      window.open(`https://wa.me/13051234567?text=${msg}`, '_blank');

      toast({ title: "¡Listo!", description: "Te contactaremos pronto con tu recomendación." });
      
      // Scroll to pricing
      setTimeout(() => {
        document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error) {
      console.error('Selector lead error:', error);
      toast({ title: "Error", description: "Hubo un problema. Intenta nuevamente.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-10">
      <div className="bg-gradient-to-br from-viralOrange/10 via-gray-900/80 to-purple-900/20 rounded-2xl p-6 border border-viralOrange/30 shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-viralOrange" />
          <h3 className="text-white font-bold text-lg">🎯 Selector Rápido</h3>
        </div>
        <p className="text-white/60 text-sm text-center mb-6">Responde 2 preguntas y te recomendamos el Setup + Plan ideal para tu negocio</p>

        {/* Question 1 */}
        <div className="mb-6">
          <p className="text-white font-medium mb-3 flex items-center gap-2">
            <span className="bg-viralOrange text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            ¿Cuántos productos/servicios cotizas?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {catalogOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => { setCatalogSize(option.value); setShowRecommendation(false); setShowLeadForm(false); }}
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

        {/* Question 2 */}
        <div className="mb-6">
          <p className="text-white font-medium mb-3 flex items-center gap-2">
            <span className="bg-viralOrange text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            ¿Qué necesitas mes a mes?
          </p>
          <div className="space-y-2">
            {needOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => { setMonthlyNeed(option.value); setShowRecommendation(false); setShowLeadForm(false); }}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border text-left transition-all",
                  monthlyNeed === option.value
                    ? "bg-viralOrange/20 border-viralOrange"
                    : "bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                )}
              >
                <span className={cn("font-medium text-sm", monthlyNeed === option.value ? "text-viralOrange" : "text-white/90")}>
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
            data-cta="selector-submit"
          >
            Ver mi recomendación
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Recommendation Result */}
        {showRecommendation && recommendation && (
          <div className="bg-gradient-to-r from-green-500/10 to-viralOrange/10 rounded-xl p-4 border border-green-500/30 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold text-sm">Recomendación: {planLabels[recommendation.plan].name} + Setup {setupLabels[recommendation.setup].name}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                <p className="text-white/50 text-xs mb-1">Setup Único</p>
                <p className="text-white font-semibold">{setupLabels[recommendation.setup].name}</p>
                <p className="text-viralOrange font-bold">{setupLabels[recommendation.setup].price}</p>
              </div>
              <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700">
                <p className="text-white/50 text-xs mb-1">Plan Mensual</p>
                <p className="text-white font-semibold">{planLabels[recommendation.plan].name}</p>
                <p className="text-viralOrange font-bold">{planLabels[recommendation.plan].price}</p>
              </div>
            </div>
            {/* Included bullets */}
            <div className="bg-gray-900/40 rounded-lg p-3 border border-gray-700/50">
              <p className="text-white/50 text-xs mb-2">Incluye:</p>
              <ul className="space-y-1">
                {planLabels[recommendation.plan].bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/70 text-xs">
                    <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Lead Capture Form */}
        {showLeadForm && recommendation && (
          <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700 space-y-3">
            <p className="text-white font-medium text-sm text-center">Recibe tu recomendación por WhatsApp</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Tu nombre *"
                value={leadData.nombre}
                onChange={(e) => setLeadData(p => ({ ...p, nombre: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white text-sm"
              />
              <Input
                placeholder="WhatsApp * (ej: +1 305...)"
                value={leadData.whatsapp}
                onChange={(e) => setLeadData(p => ({ ...p, whatsapp: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white text-sm"
              />
            </div>
            <Input
              placeholder="Email (opcional)"
              type="email"
              value={leadData.correo}
              onChange={(e) => setLeadData(p => ({ ...p, correo: e.target.value }))}
              className="bg-gray-800 border-gray-700 text-white text-sm"
            />
            <Button
              onClick={handleSubmitLead}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              data-cta="selector-submit"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Enviando...' : 'Enviar recomendación por WhatsApp'}
            </Button>
            <p className="text-white/40 text-[11px] text-center">
              No spam. Te enviamos tu recomendación y pasos para implementarlo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingSelector;
