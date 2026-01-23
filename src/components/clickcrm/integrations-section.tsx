import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, CreditCard, Workflow, Calendar } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

const integrations = [
  {
    icon: MessageSquare,
    name: "WhatsApp Business API",
    provider: "vía Twilio",
    description: "Mensajes masivos, plantillas aprobadas y tracking profesional para ventas por WhatsApp.",
    color: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  {
    icon: CreditCard,
    name: "Stripe",
    provider: "pagos seguros",
    description: "Cobra online con tarjeta, recibe facturas automáticas y gestiona suscripciones.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Workflow,
    name: "n8n",
    provider: "automatización",
    description: "Conecta tu CRM con cientos de apps: email, Slack, Google Sheets, y más.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: Calendar,
    name: "Calendly",
    provider: "agendamiento",
    description: "Tus clientes agendan citas automáticamente después de cotizar o pagar.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  }
];

const IntegrationCard = ({ integration }: { integration: typeof integrations[0] }) => (
  <Card 
    className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 h-full"
  >
    <CardContent className="p-5">
      <div className={`w-12 h-12 ${integration.bgColor} rounded-xl flex items-center justify-center mb-4`}>
        <integration.icon className={`w-6 h-6 ${integration.color}`} />
      </div>
      <h3 className="text-white font-semibold mb-1">{integration.name}</h3>
      <span className="text-white/40 text-xs uppercase tracking-wide">{integration.provider}</span>
      <p className="text-white/60 text-sm mt-2 leading-relaxed">
        {integration.description}
      </p>
    </CardContent>
  </Card>
);

const IntegrationsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-viralOrange font-semibold text-sm uppercase tracking-wider">
            Ecosistema
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Integraciones y confianza
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Herramientas probadas que potencian tu sistema de ventas
          </p>
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel className="max-w-5xl mx-auto">
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} integration={integration} />
          ))}
        </MobileCarousel>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} integration={integration} />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg px-4 py-3 text-center">
            <p className="text-white/50 text-sm">
              <span className="text-white/70">💡 Nota:</span> Los costos de mensajería de WhatsApp/Twilio los paga el cliente directamente a Twilio. ViralClicker implementa, configura e integra todo el sistema.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
