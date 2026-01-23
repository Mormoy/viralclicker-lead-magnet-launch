import { Globe, FileText, Kanban, MessageCircle, BarChart } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Globe,
    title: "Landing captura el lead",
    description: "Tu landing profesional recibe consultas 24/7 y captura los datos del cliente automáticamente."
  },
  {
    number: 2,
    icon: FileText,
    title: "Cotizador genera cotización",
    description: "Crea cotizaciones personalizadas con código correlativo, listas para enviar por WhatsApp o PDF."
  },
  {
    number: 3,
    icon: Kanban,
    title: "CRM organiza el pipeline",
    description: "Visualiza todos tus leads en estados claros: Pendiente, Seguimiento, Cerrada o Archivada."
  },
  {
    number: 4,
    icon: MessageCircle,
    title: "WhatsApp gestiona seguimiento",
    description: "Plantillas predefinidas, recordatorios y automatizaciones según tu plan para no perder ningún lead."
  },
  {
    number: 5,
    icon: BarChart,
    title: "Reportes muestran resultados",
    description: "Métricas de conversión, ventas cerradas y rendimiento para tomar mejores decisiones."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-16 px-4 bg-gray-900/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Cómo funciona ViralClicker?
          </h2>
          <p className="text-white/70 text-lg">
            5 pasos simples para transformar tu proceso de ventas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-viralOrange/30" />
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative flex items-start gap-6 mb-8 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 bg-viralOrange rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-viralOrange/30">
                    {step.number}
                  </div>
                </div>

                {/* Content card */}
                <div className={`flex-1 bg-gray-800/50 rounded-xl p-6 border border-gray-700 ${
                  index % 2 === 0 ? 'md:mr-auto md:max-w-md' : 'md:ml-auto md:max-w-md'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-5 h-5 text-viralOrange" />
                    <h3 className="text-white font-semibold text-lg">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-white/60 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
