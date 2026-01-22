import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Target, Zap, TrendingUp, ArrowRight } from 'lucide-react';

// =====================================================
// CASO REAL - EDITA AQUÍ DIRECTAMENTE
// =====================================================

const casoReal = {
  titulo: "Caso real: Negocio de instalaciones",
  subtitulo: "Cómo un negocio local transformó su atención al cliente",
  
  problema: {
    titulo: "El problema inicial",
    descripcion: "[Describe aquí el problema real - ej: Un negocio de instalación de cortinas recibía +50 mensajes diarios preguntando lo mismo: precios, disponibilidad y horarios. El dueño pasaba 3-4 horas al día respondiendo manualmente, perdiendo oportunidades de venta por demoras en las respuestas.]"
  },
  
  implementacion: {
    titulo: "La implementación",
    pasos: [
      "[Paso 1 - ej: Configuramos un chatbot que responde preguntas frecuentes automáticamente]",
      "[Paso 2 - ej: Creamos un sistema de cotización automática basado en medidas]",
      "[Paso 3 - ej: Implementamos seguimiento automático a leads que no responden]"
    ]
  },
  
  resultados: {
    titulo: "Los resultados",
    metricas: [
      {
        label: "Tiempo de respuesta",
        valor: "-80% a -90%",
        detalle: "[De horas a segundos]"
      },
      {
        label: "Conversiones",
        valor: "+20% a +40%",
        detalle: "[Más leads convertidos en clientes]"
      },
      {
        label: "Horas ahorradas",
        valor: "15-20 hrs/semana",
        detalle: "[Tiempo recuperado para el negocio]"
      }
    ]
  }
};

const CaseStudySection = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/56912345678?text=Hola,%20quiero%20ver%20un%20caso%20de%20éxito%20para%20mi%20rubro', '_blank');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-viralDark to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-viralOrange font-semibold text-sm uppercase tracking-wider">
            Caso de Éxito
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            {casoReal.titulo}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {casoReal.subtitulo}
          </p>
        </div>

        {/* Case Study Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Problem */}
          <Card className="bg-red-500/5 border-red-500/20">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {casoReal.problema.titulo}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {casoReal.problema.descripcion}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation */}
          <Card className="bg-viralOrange/5 border-viralOrange/20">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-viralOrange/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-viralOrange" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {casoReal.implementacion.titulo}
                  </h3>
                  <ul className="space-y-3">
                    {casoReal.implementacion.pasos.map((paso, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-viralOrange/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-viralOrange text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-white/70">{paso}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-green-500/5 border-green-500/20">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {casoReal.resultados.titulo}
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {casoReal.resultados.metricas.map((metrica, index) => (
                  <div 
                    key={index}
                    className="bg-green-500/10 rounded-xl p-4 text-center"
                  >
                    <p className="text-green-400 text-2xl md:text-3xl font-bold mb-1">
                      {metrica.valor}
                    </p>
                    <p className="text-white font-medium text-sm mb-1">
                      {metrica.label}
                    </p>
                    <p className="text-white/50 text-xs">
                      {metrica.detalle}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            onClick={scrollToContact}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white px-6 py-6 text-base font-semibold"
          >
            Quiero un caso para mi rubro
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            onClick={openWhatsApp}
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/20 px-6 py-6 text-base font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Hablar por WhatsApp
          </Button>
        </div>

        {/* Note for editing */}
        <p className="text-center text-white/30 text-xs mt-8">
          💡 Este caso es un placeholder. Edita el archivo case-study-section.tsx para agregar tu caso real.
        </p>
      </div>
    </section>
  );
};

export default CaseStudySection;
