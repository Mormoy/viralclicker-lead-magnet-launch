import { Zap, TrendingUp, Clock, BarChart3, MessageCircle, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: "Respuesta inmediata",
    description: "Captura leads 24/7 con landing y formularios inteligentes que notifican al instante."
  },
  {
    icon: TrendingUp,
    title: "Más cierres",
    description: "Seguimiento automatizado que mantiene a tus clientes calientes hasta el cierre."
  },
  {
    icon: Clock,
    title: "Ahorra tiempo",
    description: "Cotizaciones con un clic, plantillas de WhatsApp listas y flujos automatizados."
  },
  {
    icon: BarChart3,
    title: "Control total",
    description: "Dashboard con métricas claras: cuántos leads, cotizaciones y ventas cerradas."
  },
  {
    icon: MessageCircle,
    title: "WhatsApp organizado",
    description: "Cada cliente en su estado correcto: Pendiente, Seguimiento, Cerrada o Archivada."
  },
  {
    icon: Shield,
    title: "Datos seguros",
    description: "Tu información siempre respaldada y accesible desde cualquier dispositivo."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Beneficios que transforman tu negocio
          </h2>
          <p className="text-white/70 text-lg">
            Todo lo que necesitas para vender más y perder menos oportunidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 border border-gray-700 hover:border-viralOrange/50 transition-all hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-viralOrange/20 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-viralOrange" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {benefit.title}
              </h3>
              <p className="text-white/60 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
