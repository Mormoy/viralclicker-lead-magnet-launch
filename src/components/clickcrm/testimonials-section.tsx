import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    nombre: "Carolina M.",
    cargo: "Owner",
    rubro: "Blinds & Window Treatments",
    ciudad: "Miami, FL",
    iniciales: "CM",
    antes: "Respondíamos tarde y se perdían cotizaciones. Los clientes preguntaban por WhatsApp y cuando contestábamos ya habían comprado en otro lado.",
    despues: "Con ViralClicker el cliente cotiza, recibe PDF y link vivo, y cerramos por WhatsApp. Menos seguimiento manual, más cierres.",
    metrica: "Menos tiempo respondiendo, más cierres"
  },
  {
    nombre: "Roberto F.",
    cargo: "Sales Manager",
    rubro: "Events & Party Rentals",
    ciudad: "Orlando, FL",
    iniciales: "RF",
    antes: "Muchos mensajes, pocas reservas. Teníamos leads en Excel, WhatsApp, correo... un desorden total. Se olvidaban seguimientos.",
    despues: "Cotización instantánea + seguimiento automático + ofertas por WhatsApp. Todo centralizado en un solo lugar.",
    metrica: "Seguimiento ordenado, más reservas"
  },
  {
    nombre: "Miguel A.",
    cargo: "Service Manager",
    rubro: "HVAC & Repairs",
    ciudad: "Fort Lauderdale, FL",
    iniciales: "MA",
    antes: "Leads sin orden. Los técnicos respondían cuando podían. No había control de tiempos ni métricas.",
    despues: "CRM simple + pipeline + recordatorios automáticos. Cada lead entra al sistema y se asigna al instante.",
    metrica: "Mejor control, respuestas más rápidas"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-viralDark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-viralOrange font-semibold text-sm uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Resultados reales de Small Businesses como el tuyo
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Negocios que ya automatizaron su proceso de ventas con ViralClicker
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-gray-900/50 border-gray-800 hover:border-viralOrange/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-viralOrange/30 mb-4" />
                
                {/* Before / After */}
                <div className="space-y-4 mb-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <span className="text-red-400 text-xs font-semibold uppercase">Antes</span>
                    <p className="text-white/70 text-sm mt-1">{testimonial.antes}</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <span className="text-green-400 text-xs font-semibold uppercase">Después</span>
                    <p className="text-white/70 text-sm mt-1">{testimonial.despues}</p>
                  </div>
                </div>

                {/* Metric badge */}
                <div className="flex justify-center mb-4">
                  <span className="bg-viralOrange/20 text-viralOrange text-sm font-bold px-4 py-2 rounded-full text-center">
                    {testimonial.metrica}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-viralOrange/20 border-2 border-viralOrange/30 flex items-center justify-center">
                    <span className="text-viralOrange font-bold text-sm">{testimonial.iniciales}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.nombre}</p>
                    <p className="text-white/50 text-xs">{testimonial.cargo} • {testimonial.rubro}</p>
                    <p className="text-white/40 text-xs">{testimonial.ciudad}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-white/40 text-xs text-center mt-8 max-w-2xl mx-auto">
          Los resultados varían según rubro, ticket promedio y velocidad de atención. Los testimonios reflejan experiencias individuales.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
