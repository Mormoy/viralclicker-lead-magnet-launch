import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Necesito WhatsApp Business API o sirve WhatsApp normal?",
    answer: "Para las automatizaciones y campañas, usamos WhatsApp Business API a través de Twilio. Esto requiere un número verificado, pero te da mensajes masivos, plantillas aprobadas y tracking profesional. WhatsApp normal no soporta estas funcionalidades."
  },
  {
    question: "¿Qué costos paga el cliente (Twilio/Meta) y cuáles están incluidos?",
    answer: "Tu plan de Viral Clicker incluye: hosting de la landing, mantenimiento del sistema, soporte y mejoras menores. Los costos de mensajería de Twilio/WhatsApp Business API los pagas tú directamente a Twilio. Esto te da control total sobre tus gastos de mensajería."
  },
  {
    question: "¿Cuánto demora la implementación?",
    answer: "7 días hábiles desde tu onboarding. En ese tiempo configuramos tu landing, cotizador, CRM y automatizaciones. Planes Elite con funcionalidades adicionales pueden tomar 1-2 semanas más."
  },
  {
    question: "¿Puedo usar mi propio dominio?",
    answer: "Sí. Puedes conectar tu dominio existente (ej: cotizaciones.tuempresa.com) o te ayudamos a configurar uno nuevo. El costo del dominio corre por tu cuenta, pero la configuración está incluida."
  },
  {
    question: "¿Puedo partir sin automatizaciones y escalar después?",
    answer: "¡Sí! Puedes empezar con el plan Starter (sin automatizaciones) y cuando estés listo, escalar a Pro o Elite. La migración es fluida y tus datos se mantienen intactos."
  },
  {
    question: "¿Qué pasa si ya tengo web o CRM?",
    answer: "Viral Clicker funciona de forma independiente. Si tienes web, puedes agregar un botón/link a tu cotizador. Si tienes CRM, evaluamos si conviene integrar o usar Viral Clicker en paralelo para el proceso de cotización."
  },
  {
    question: "¿Dónde quedan mis datos?",
    answer: "Tus datos quedan en servidores seguros con encriptación. Tienes acceso completo a exportar tus leads, clientes y cotizaciones en cualquier momento. Si decides cancelar, te entregamos un respaldo completo."
  },
  {
    question: "¿Cómo funciona el pago?",
    answer: "Pagas tu plan mensual con tarjeta (crédito/débito) a través de Stripe. Recibes recibo automático en tu correo. El pago se renueva cada mes. Puedes cancelar cuando quieras."
  },
  {
    question: "¿Qué incluye el setup inicial y cuánto cuesta?",
    answer: "El setup es un pago único que varía según la complejidad de tu negocio: Simple ($500) para catálogos pequeños con precios fijos; Estándar ($750) para catálogos medianos con variables como medidas o materiales; Complejo ($1,000+) para catálogos extensos con lógica de precios sofisticada. Todos incluyen: diseño de landing, configuración del cotizador y CRM, integración con WhatsApp Business API, y onboarding personalizado 1:1."
  },
  {
    question: "¿Qué son 'cambios menores'?",
    answer: "Ajustes en textos de la landing, campos del formulario, plantillas de WhatsApp, configuración de estados del CRM. No incluye desarrollo de nuevas funcionalidades ni rediseños completos."
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
