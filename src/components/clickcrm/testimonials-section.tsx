import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

// =====================================================
// TESTIMONIOS - EDITA AQUÍ DIRECTAMENTE
// =====================================================

const testimonials = [
  {
    nombre: "[Nombre del Cliente]",
    rubro: "[Tu rubro aquí]",
    ciudad: "[Ciudad]",
    antes: "[Describe brevemente cómo era antes - ej: Perdía clientes por no responder a tiempo]",
    despues: "[Describe el resultado - ej: Ahora respondo en segundos y cierro más ventas]",
    imagen: "/testimonial-1.jpg" // Cambia por la foto real
  },
  {
    nombre: "[Nombre del Cliente]",
    rubro: "[Tu rubro aquí]",
    ciudad: "[Ciudad]",
    antes: "[Describe brevemente cómo era antes - ej: Pasaba horas respondiendo mensajes repetitivos]",
    despues: "[Describe el resultado - ej: Automaticé el 80% de mis respuestas]",
    imagen: "/testimonial-2.jpg" // Cambia por la foto real
  },
  {
    nombre: "[Nombre del Cliente]",
    rubro: "[Tu rubro aquí]",
    ciudad: "[Ciudad]",
    antes: "[Describe brevemente cómo era antes - ej: No tenía control de mis leads]",
    despues: "[Describe el resultado - ej: Ahora tengo todo organizado y no pierdo ninguna oportunidad]",
    imagen: "/testimonial-3.jpg" // Cambia por la foto real
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
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Negocios reales que transformaron su atención al cliente con Viral Clicker
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
                <div className="space-y-4 mb-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <span className="text-red-400 text-xs font-semibold uppercase">Antes</span>
                    <p className="text-white/70 text-sm mt-1">{testimonial.antes}</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <span className="text-green-400 text-xs font-semibold uppercase">Después</span>
                    <p className="text-white/70 text-sm mt-1">{testimonial.despues}</p>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                  <img 
                    src={testimonial.imagen} 
                    alt={testimonial.nombre}
                    className="w-12 h-12 rounded-full object-cover border-2 border-viralOrange/30"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.nombre}</p>
                    <p className="text-white/50 text-xs">{testimonial.rubro} • {testimonial.ciudad}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note for editing */}
        <p className="text-center text-white/30 text-xs mt-8">
          💡 Estos testimonios son placeholders. Edita el archivo testimonials-section.tsx para agregar testimonios reales.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
