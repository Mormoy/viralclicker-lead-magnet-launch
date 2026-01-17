import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Puedo usarlo si ya atiendo por WhatsApp?",
    answer: "¡Sí! ClickCRM se integra con tu flujo actual de WhatsApp. No reemplaza tu WhatsApp, sino que lo organiza mejor. Tendrás plantillas predefinidas, estados de cada cliente y recordatorios para hacer seguimiento."
  },
  {
    question: "¿Cuánto se demora en implementar?",
    answer: "Depende del plan y la complejidad de tu negocio. El plan Starter puede estar listo en 3-5 días. Los planes Pro y Elite incluyen un onboarding más completo que puede tomar 1-2 semanas para tener todo funcionando perfectamente."
  },
  {
    question: "¿Necesito diseñador o programador?",
    answer: "No. Nosotros nos encargamos de todo: diseño de la landing, configuración del cotizador, CRM y automatizaciones. Solo necesitamos tu logo, colores y la información de tus productos o servicios."
  },
  {
    question: "¿Se puede adaptar a mi rubro?",
    answer: "¡Absolutamente! El cotizador se personaliza según tu negocio: medidas para cortinas, fechas para eventos, tipos de instalación, etc. Trabajamos con empresas de cortinas, eventos, instalaciones, muebles y muchos más rubros."
  },
  {
    question: "¿Twilio/WhatsApp lo pago yo?",
    answer: "Sí. Los costos de mensajería de Twilio/WhatsApp Business API son pagados directamente por ti. Esto te da control total sobre tus gastos y la facturación es directa con Twilio. Nosotros solo configuramos e integramos todo."
  },
  {
    question: "¿Puedo exportar mis datos?",
    answer: "Sí, todos los planes incluyen exportación a CSV. Tu información siempre es tuya y puedes descargarla cuando quieras: leads, cotizaciones, clientes y todas las métricas."
  },
  {
    question: "¿Qué incluye 'cambios menores'?",
    answer: "Los cambios menores son ajustes a módulos ya existentes: textos en la landing, campos del formulario, plantillas de WhatsApp, configuración de estados del CRM, etc. No incluye desarrollo de nuevas funcionalidades o integraciones que no estén en tu plan."
  }
];

const FaqSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-900/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-white/70 text-lg">
            Resolvemos tus dudas más comunes
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
      </div>
    </section>
  );
};

export default FaqSection;
