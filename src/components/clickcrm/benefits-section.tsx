import { Link, TrendingUp, Clock, Percent, MessageCircle, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: Link,
    title: "Cotización viva con link",
    description: "Cada cotización tiene un link único que el cliente puede ver, modificar y aprobar. Sin PDF estáticos."
  },
  {
    icon: Percent,
    title: "Cupones sobre cotizaciones",
    description: "Crea códigos de descuento y aplícalos directamente sobre cotizaciones activas. Ideal para cerrar ventas."
  },
  {
    icon: MessageCircle,
    title: "Campañas internas por WhatsApp",
    description: "Envía promociones y seguimientos masivos a tu base de leads directo desde el CRM."
  },
  {
    icon: BarChart3,
    title: "Tracking post-venta",
    description: "Monitorea el estado de cada cliente después de la venta: instalación, pago, satisfacción."
  },
  {
    icon: TrendingUp,
    title: "Más cierres, menos fugas",
    description: "Seguimiento automatizado que mantiene a tus clientes calientes hasta que cierren."
  },
  {
    icon: Clock,
    title: "Implementación en 7 días",
    description: "Tu sistema listo y funcionando en una semana. Sin esperas eternas ni proyectos interminables."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Por qué Viral Clicker?
          </h2>
          <p className="text-white/70 text-lg">
            Las herramientas que necesitas para vender más por WhatsApp
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
