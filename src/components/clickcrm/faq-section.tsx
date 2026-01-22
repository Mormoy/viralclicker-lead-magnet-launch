import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Necesito WhatsApp Business API o sirve WhatsApp normal?",
    answer: "Necesitas WhatsApp Business API (vía Twilio). Es la única forma de enviar mensajes masivos, usar plantillas aprobadas y tener métricas de entrega. WhatsApp normal no permite automatizaciones ni campañas."
  },
  {
    question: "¿Qué costos paga el cliente y cuáles incluye Viral Clicker?",
    answer: "Tu plan incluye: hosting, mantenimiento, soporte y mejoras menores. Tú pagas directo a Twilio los costos de mensajería (aprox. $0.05–0.08 USD por mensaje en Latam). Así tienes control total de tu gasto en WhatsApp."
  },
  {
    question: "¿Cuánto demora la implementación y qué necesito entregarte?",
    answer: "Entre 5 y 10 días hábiles. Solo necesitamos: tu logo, colores de marca, listado de productos/servicios con precios, y acceso a tu número de WhatsApp. Nosotros hacemos todo lo demás."
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer: "Sí, sin penalidad. Tu plan se renueva cada mes y puedes cancelar en cualquier momento. Te entregamos un respaldo completo de tus datos (leads, clientes, cotizaciones)."
  },
  {
    question: "¿Qué es un 'cambio menor' en los planes?",
    answer: "Ajustes pequeños: editar textos de la landing, modificar campos del formulario, actualizar plantillas de WhatsApp o cambiar estados del CRM. No incluye funcionalidades nuevas ni rediseños completos."
  },
  {
    question: "¿Qué incluye el setup inicial?",
    answer: "Diseño de tu landing, configuración del cotizador con tus productos, setup del CRM, integración con WhatsApp API y onboarding 1:1. El precio varía: $500 (simple), $750 (estándar) o $1,000+ (complejo)."
  },
  {
    question: "¿Puedo empezar básico y escalar después?",
    answer: "Sí. Puedes arrancar con Starter y subir a Pro o Elite cuando quieras. Tus datos se mantienen intactos y la migración es inmediata."
  },
  {
    question: "¿Puedo usar mi propio dominio?",
    answer: "Sí. Conectamos tu dominio existente (ej: cotiza.tuempresa.com) sin costo adicional de configuración. Solo pagas el dominio si no lo tienes."
  }
];

const FaqSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/56912345678?text=Hola,%20tengo%20una%20pregunta%20sobre%20Viral%20Clicker', '_blank');
  };

  return (
    <section className="py-16 px-4 bg-gray-900/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-white/70 text-lg">
            Resolvemos tus dudas antes de empezar
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-800/50 rounded-xl border border-gray-700 px-6"
              >
                <AccordionTrigger className="text-white hover:text-viralOrange text-left py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/50 text-sm mb-3">
            ¿Tienes otra pregunta?
          </p>
          <button 
            onClick={handleWhatsApp}
            className="text-viralOrange hover:underline text-sm font-medium"
          >
            Escríbenos por WhatsApp →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
