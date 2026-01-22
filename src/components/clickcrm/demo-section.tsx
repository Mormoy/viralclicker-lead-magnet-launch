import { Button } from '@/components/ui/button';
import { MessageCircle, Play, LayoutDashboard, FileText, BarChart3 } from 'lucide-react';

const screenshots = [
  {
    icon: FileText,
    title: "Cotización viva con link",
    description: "Tu cliente recibe un link único con precios actualizados en tiempo real. Puede aceptar, comentar o solicitar ajustes."
  },
  {
    icon: LayoutDashboard,
    title: "Pipeline CRM por etapas",
    description: "Visualiza cada oportunidad en su etapa: nuevo, cotizado, negociando, cerrado. Nunca pierdas el seguimiento."
  },
  {
    icon: BarChart3,
    title: "Panel de métricas",
    description: "Reportes claros: cotizaciones enviadas, tasa de cierre, tiempo promedio de respuesta, ticket promedio."
  }
];

const DemoSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hola,%20quiero%20ver%20una%20demo%20de%20Viral%20Clicker', '_blank');
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="demo" className="py-16 px-4 bg-viralDark">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-block bg-viralOrange/20 text-viralOrange px-4 py-1 rounded-full text-sm font-medium mb-4">
            Conoce el sistema
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Así se ve Viral Clicker por dentro
          </h2>
          <p className="text-white/70 text-lg">
            Un sistema pensado para que tú vendas y el sistema haga el seguimiento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {screenshots.map((item, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-viralOrange/50 transition-all duration-300"
            >
              {/* Placeholder for screenshot */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <item.icon className="w-16 h-16 text-viralOrange/30 group-hover:text-viralOrange/50 transition-colors" />
                <div className="absolute bottom-2 right-2 bg-viralOrange/20 text-viralOrange text-xs px-2 py-1 rounded">
                  Preview
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-viralOrange" />
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Ver demo personalizada
          </Button>
          <Button 
            onClick={handleWhatsApp}
            size="lg"
            variant="outline"
            className="border-green-600 text-green-500 hover:bg-green-600/10"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Hablar por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
