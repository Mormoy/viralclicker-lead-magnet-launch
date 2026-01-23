import { 
  Globe, 
  Calculator, 
  FileText, 
  Kanban, 
  Tag, 
  Workflow, 
  BarChart3, 
  Download 
} from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

const features = [
  {
    icon: Globe,
    title: "Landing + Formularios inteligentes",
    description: "Páginas profesionales que capturan leads con validación automática y notificación instantánea."
  },
  {
    icon: Calculator,
    title: "Cotizador por rubro",
    description: "Personalizado para tu negocio: fecha, cantidad, medidas, extras. Adaptable a cortinas, eventos, instalaciones y más."
  },
  {
    icon: FileText,
    title: "Cotización con código correlativo",
    description: "Cada cotización tiene número único, exportable a PDF y con botón para compartir directo por WhatsApp."
  },
  {
    icon: Kanban,
    title: "CRM con estados y notas",
    description: "Organiza leads en Pendiente, Seguimiento, Cerrada o Archivada. Agrega notas y no pierdas contexto."
  },
  {
    icon: Tag,
    title: "Cupones y campañas",
    description: "Crea códigos de descuento para campañas específicas y mide qué promociones funcionan mejor. (Pro/Elite)"
  },
  {
    icon: Workflow,
    title: "Automatizaciones con n8n",
    description: "Flujos automáticos: seguimiento, recordatorios, integración con otras herramientas. (Pro/Elite)"
  },
  {
    icon: BarChart3,
    title: "Reportes de conversión",
    description: "Dashboard con métricas claras: leads, cotizaciones, cierres y tasa de conversión por período."
  },
  {
    icon: Download,
    title: "Export CSV",
    description: "Exporta todos tus datos cuando quieras. Tu información siempre es tuya."
  }
];

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => (
  <div 
    className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-viralOrange/30 transition-all group h-full"
  >
    <div className="w-10 h-10 bg-viralOrange/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-viralOrange/20 transition-colors">
      <feature.icon className="w-5 h-5 text-viralOrange" />
    </div>
    <h3 className="text-white font-semibold mb-2">
      {feature.title}
    </h3>
    <p className="text-white/50 text-sm">
      {feature.description}
    </p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Funcionalidades incluidas
          </h2>
          <p className="text-white/70 text-lg">
            Todo lo que necesitas para gestionar tu proceso comercial
          </p>
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel className="max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </MobileCarousel>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
