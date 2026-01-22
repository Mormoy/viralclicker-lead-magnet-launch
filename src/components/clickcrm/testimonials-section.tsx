import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    nombre: "Carolina Méndez",
    cargo: "Dueña",
    rubro: "Cortinas y decoración",
    ciudad: "Copiapó, Atacama",
    iniciales: "CM",
    antes: "Perdía cotizaciones porque no alcanzaba a responder. Los clientes preguntaban por WhatsApp y cuando les contestaba ya habían comprado en otro lado.",
    despues: "Ahora respondo en menos de 1 minuto con el cotizador automático. El cliente recibe su presupuesto al instante y yo solo cierro la venta.",
    metrica: "-80% tiempo de respuesta"
  },
  {
    nombre: "Rodrigo Fuentes",
    cargo: "Gerente Comercial",
    rubro: "Eventos y banquetería",
    ciudad: "Santiago, RM",
    iniciales: "RF",
    antes: "Tenía leads en Excel, WhatsApp, correo... un desorden total. Se me olvidaba hacer seguimiento y perdía ventas por no insistir a tiempo.",
    despues: "Con el CRM tengo todo centralizado. Veo quién cotizó, quién no ha respondido y les mando recordatorio automático. Cierro más sin trabajar más.",
    metrica: "+35% tasa de cierre"
  },
  {
    nombre: "Marcelo Aravena",
    cargo: "Jefe de Ventas",
    rubro: "Materiales de construcción",
    ciudad: "Antofagasta",
    iniciales: "MA",
    antes: "Los vendedores respondían cuando querían. No había control de tiempos ni de qué se le decía a cada cliente. Perdíamos oportunidades todos los días.",
    despues: "Ahora cada lead entra al sistema, se asigna automáticamente y tengo métricas de respuesta. El equipo responde en minutos, no en horas.",
    metrica: "+50% leads atendidos"
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
            Resultados reales de PyMEs como la tuya
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Negocios que ya automatizaron su proceso de ventas con ClickCRM
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
                  <span className="bg-viralOrange/20 text-viralOrange text-sm font-bold px-4 py-2 rounded-full">
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
