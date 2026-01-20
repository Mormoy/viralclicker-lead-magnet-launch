import { CheckCircle, XCircle, Building2, ShoppingCart, MessageSquare, FileText, Users, Clock } from 'lucide-react';

const idealFor = [
  {
    icon: FileText,
    text: "Empresas que emiten cotizaciones o presupuestos"
  },
  {
    icon: MessageSquare,
    text: "Negocios que cierran ventas por WhatsApp"
  },
  {
    icon: Building2,
    text: "PyMEs de servicios: instalaciones, reparaciones, construcción"
  },
  {
    icon: Users,
    text: "Equipos comerciales que necesitan seguimiento ordenado"
  },
  {
    icon: Clock,
    text: "Empresas que pierden ventas por falta de seguimiento"
  }
];

const notFor = [
  {
    icon: ShoppingCart,
    text: "Tiendas e-commerce con carrito de compras"
  },
  {
    icon: XCircle,
    text: "Negocios sin proceso de cotización"
  },
  {
    icon: XCircle,
    text: "Empresas que no usan WhatsApp para ventas"
  },
  {
    icon: XCircle,
    text: "Negocios que ya tienen CRM y ERP integrados"
  }
];

const TargetAudienceSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-900/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-1 rounded-full text-sm font-medium mb-4">
            ¿Es para ti?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Para quién es Viral Clicker
          </h2>
          <p className="text-white/70 text-lg">
            Somos honestos: no es para todos. Revisa si calzas con nuestro perfil ideal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ideal For */}
          <div className="bg-gradient-to-br from-green-900/20 to-gray-900 rounded-2xl p-6 border border-green-700/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Ideal para ti si...</h3>
            </div>
            <ul className="space-y-4">
              {idealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For */}
          <div className="bg-gradient-to-br from-red-900/10 to-gray-900 rounded-2xl p-6 border border-red-700/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">No es para ti si...</h3>
            </div>
            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-red-400/70 flex-shrink-0 mt-0.5" />
                  <span className="text-white/60">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            ¿No estás seguro? <a href="#contacto" className="text-viralOrange hover:underline">Escríbenos</a> y te ayudamos a evaluar si es tu solución.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
