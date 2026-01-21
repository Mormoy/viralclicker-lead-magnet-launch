import { Check, Star, CreditCard, MessageSquare, Settings, Wrench } from 'lucide-react';
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
    period: "/mes",
    description: "Ideal para empezar a organizar tu proceso comercial",
    popular: false,
    features: [
      "Landing + formulario de contacto",
      "CRM básico con estados",
      "3 plantillas WhatsApp",
      "Export CSV",
      "Soporte básico por email",
      "1 sesión de 30 min/mes",
      "1 cambio menor/mes"
    ]
  },
  {
    id: 'pro',
    name: "Pro",
    price: "$249",
    originalPrice: "$499",
    discount: "50%",
    period: "/mes",
    description: "Para negocios que quieren automatizar y escalar",
    popular: true,
    features: [
      "Todo de Starter +",
      "Cotizador personalizado con link vivo",
      "Cupones sobre cotizaciones",
      "Automatizaciones base (n8n)",
      "Campañas internas WhatsApp",
      "Reportes de conversión",
      "30 min quincenal de soporte",
      "2 cambios menores/mes"
    ]
  },
  {
    id: 'elite',
    name: "Elite",
    price: "$449",
    originalPrice: "$1099",
    discount: "59%",
    period: "/mes",
    description: "Solución completa con soporte prioritario",
    popular: false,
    features: [
      "Todo de Pro +",
      "Tracking post-venta completo",
      "Automatización avanzada",
      "Integración Calendly",
      "Multiusuario (si aplica)",
      "Soporte prioritario",
      "Onboarding: 30 min/semana x4",
      "3 cambios menores/mes"
    ]
  }
];

const PricingSection = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    navigate(`/checkout?plan=${planId}`);
  };

  return (
    <section id="planes" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Planes y precios
          </h2>
          <p className="text-white/70 text-lg">
            Elige el plan que mejor se adapte a tu negocio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
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
                    <Star className="w-4 h-4" /> Más popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                
                {/* Discount badge */}
                {plan.discount && (
                  <div className="mb-2">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                      {plan.discount} OFF
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
                Empezar ahora
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Setup note */}
        <div className="max-w-3xl mx-auto mt-12 mb-6">
          <div className="bg-viralOrange/10 border border-viralOrange/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-viralOrange/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Settings className="w-5 h-5 text-viralOrange" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h4 className="text-white font-bold">
                    💼 Setup inicial: <span className="text-white/40 line-through">$999</span> <span className="text-viralOrange">$499</span>
                  </h4>
                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-bold border border-green-500/30">
                    50% OFF
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  El costo varía según la complejidad de tu negocio y catálogo.
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li>• Diseño de landing personalizada con tu marca</li>
                  <li>• Configuración del cotizador con tus productos/servicios</li>
                  <li>• Setup del CRM con estados personalizados</li>
                  <li>• Integración con WhatsApp Business API (Twilio)</li>
                  <li>• Onboarding personalizado 1:1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important notes - Enhanced */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h4 className="text-white font-semibold mb-4 text-center text-lg">📋 Información importante</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Twilio / WhatsApp</span>
                </div>
                <p className="text-white/60 text-sm">
                  Los costos de mensajería de Twilio/WhatsApp Business API los pagas <strong className="text-white/80">directamente a Twilio</strong>. Viral Clicker implementa, configura e integra todo el sistema.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Pago con Stripe</span>
                </div>
                <p className="text-white/60 text-sm">
                  Pago seguro con tarjeta. Recibes <strong className="text-white/80">factura/recibo automático</strong> por email después de cada pago. Renovación mensual automática.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Setup inicial</span>
                </div>
                <p className="text-white/60 text-sm">
                  Pago único desde <strong className="text-white/80">$500</strong> según complejidad. Incluye diseño, configuración completa del sistema y onboarding personalizado.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5 text-viralOrange" />
                  <span className="text-white font-medium">Tu mensualidad incluye</span>
                </div>
                <p className="text-white/60 text-sm">
                  <strong className="text-white/80">Hosting</strong> de la landing, <strong className="text-white/80">mantenimiento</strong> del sistema, <strong className="text-white/80">soporte</strong> y <strong className="text-white/80">mejoras menores</strong> según tu plan.
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
