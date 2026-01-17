import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: "Starter",
    price: "$99",
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
    name: "Pro",
    price: "$249",
    period: "/mes",
    description: "Para negocios que quieren automatizar y escalar",
    popular: true,
    features: [
      "Todo de Starter +",
      "Cotizador personalizado",
      "Automatizaciones base (n8n)",
      "Integración Google Sheets/Airtable",
      "Reportes de conversión",
      "Cupones y campañas",
      "30 min quincenal de soporte",
      "2 cambios menores/mes"
    ]
  },
  {
    name: "Elite",
    price: "$449",
    period: "/mes",
    description: "Solución completa con soporte prioritario",
    popular: false,
    features: [
      "Todo de Pro +",
      "Automatización avanzada",
      "Integración Calendly",
      "Multiusuario (si aplica)",
      "Soporte prioritario",
      "Onboarding: 30 min/semana x4",
      "Luego: 30 min quincenal",
      "3 cambios menores/mes"
    ]
  }
];

const PricingSection = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
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
                <div className="flex items-baseline justify-center gap-1">
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
                onClick={scrollToContact}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-viralOrange hover:bg-viralOrange/90' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Elegir {plan.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Important notes */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-white font-semibold mb-3 text-center">📋 Información importante</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-viralOrange">•</span>
                <span><strong className="text-white/80">Twilio/WhatsApp:</strong> Los costos de mensajería se pagan directo por el cliente. Nosotros solo implementamos e integramos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-viralOrange">•</span>
                <span><strong className="text-white/80">Setup inicial:</strong> El costo de implementación se cotiza según la complejidad de tu negocio (desde $500).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-viralOrange">•</span>
                <span><strong className="text-white/80">Cambios menores:</strong> Ajustes en textos, campos de formularios o configuración de plantillas existentes.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
