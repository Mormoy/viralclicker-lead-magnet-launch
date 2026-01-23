import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Target, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const casoReal = {
  titulo: "Caso real: Miami Blinds & Shades",
  subtitulo: "Cómo un negocio de cortinas en Miami mejoró su capacidad de atención sin contratar personal",
  
  problema: {
    titulo: "El problema inicial",
    bullets: [
      "Más de 40 consultas diarias por WhatsApp pidiendo cotizaciones",
      "3 a 4 horas al día respondiendo las mismas preguntas: telas, medidas, precios",
      "Clientes cotizando con la competencia por tiempos de respuesta lentos"
    ]
  },
  
  implementacion: {
    titulo: "La implementación con ViralClicker",
    pasos: [
      "Cotizador automático: el cliente ingresa medidas y tipo de cortina, recibe precio al instante por WhatsApp",
      "CRM centralizado: cada lead queda registrado con cotización, estado y fecha de último contacto",
      "Recordatorios automáticos: si no hay respuesta en 48 horas, se envía seguimiento con cupón de descuento"
    ]
  },
  
  resultados: {
    titulo: "Los resultados",
    bullets: [
      "Tiempo de respuesta reducido significativamente (antes tardaban horas)",
      "Mayor porcentaje de cotizaciones atendidas vs perdidas",
      "Horas recuperadas semanalmente para instalaciones y familia"
    ]
  }
};

const CaseStudySection = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%20saw%20the%20Miami%20Blinds%20case%20and%20want%20to%20know%20how%20to%20apply%20it%20to%20my%20business', '_blank');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-viralDark to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-viralOrange font-semibold text-sm uppercase tracking-wider">
            Caso de Éxito Real
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
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {casoReal.problema.titulo}
                  </h3>
                  <ul className="space-y-2">
                    {casoReal.problema.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
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
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {casoReal.resultados.titulo}
                  </h3>
                  <ul className="space-y-2">
                    {casoReal.resultados.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <p className="text-white/40 text-xs text-center mt-6 max-w-2xl mx-auto">
          Los resultados varían según rubro, ticket promedio y velocidad de atención.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button 
            onClick={scrollToContact}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white px-6 py-6 text-base font-semibold"
          >
            Book a demo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            onClick={openWhatsApp}
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/20 px-6 py-6 text-base font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
