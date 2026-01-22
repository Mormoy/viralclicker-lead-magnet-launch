import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Target, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const casoReal = {
  titulo: "Caso real: Atacama Cortinas",
  subtitulo: "Cómo un negocio de cortinas en Copiapó duplicó su capacidad de atención sin contratar personal",
  
  problema: {
    titulo: "El problema inicial",
    descripcion: "Atacama Cortinas recibía más de 40 consultas diarias por WhatsApp pidiendo cotizaciones. Carolina, la dueña, pasaba entre 3 y 4 horas al día respondiendo las mismas preguntas: tipos de tela, medidas, tiempos de instalación y precios. Cuando no alcanzaba a responder rápido, los clientes cotizaban con la competencia. Estaba perdiendo ventas por no dar abasto."
  },
  
  implementacion: {
    titulo: "La implementación con ClickCRM",
    pasos: [
      "Creamos un cotizador automático donde el cliente ingresa las medidas y tipo de cortina, y recibe el precio al instante por WhatsApp.",
      "Configuramos el CRM para que cada lead quede registrado con su cotización, estado y fecha de último contacto.",
      "Implementamos recordatorios automáticos: si el cliente no responde en 48 horas, recibe un mensaje de seguimiento con un cupón de 10% de descuento."
    ]
  },
  
  resultados: {
    titulo: "Los resultados después de 30 días",
    metricas: [
      {
        label: "Tiempo de respuesta",
        valor: "< 1 minuto",
        detalle: "Antes tardaba hasta 6 horas"
      },
      {
        label: "Cotizaciones atendidas",
        valor: "+85%",
        detalle: "De 40 consultas ahora responde 37"
      },
      {
        label: "Horas recuperadas",
        valor: "18 hrs/semana",
        detalle: "Tiempo para instalaciones y familia"
      }
    ]
  }
};

const CaseStudySection = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/56912345678?text=Hola,%20vi%20el%20caso%20de%20Atacama%20Cortinas%20y%20quiero%20saber%20cómo%20aplicarlo%20a%20mi%20negocio', '_blank');
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
      </div>
    </section>
  );
};

export default CaseStudySection;
