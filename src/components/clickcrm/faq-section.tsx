import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto demora la implementación?",
    answer: "7 días hábiles desde que recibes tu onboarding. En ese tiempo configuramos tu landing, cotizador, CRM y automatizaciones básicas. Planes Elite pueden incluir funcionalidades adicionales que toman 1-2 semanas más."
  },
  {
    question: "¿Cómo funciona el pago?",
    answer: "Pagas tu plan mensual con tarjeta de crédito/débito a través de Stripe. Recibes factura/recibo automático en tu correo. El pago se renueva automáticamente cada mes."
  },
  {
    question: "¿Twilio/WhatsApp lo pago yo?",
    answer: "Sí. Los costos de mensajería de Twilio/WhatsApp Business API son pagados directamente por ti. Esto te da control total sobre tus gastos. Nosotros solo configuramos e integramos todo el sistema."
  },
  {
    question: "¿Recibo factura/recibo?",
    answer: "Sí. Stripe envía automáticamente un recibo a tu correo después de cada pago. Si necesitas factura formal, contáctanos por WhatsApp."
  },
  {
    question: "¿Cómo se firma el contrato?",
    answer: "Después de pagar, llegas a una página donde puedes aceptar los términos digitalmente o firmar el contrato vía link externo. Quedará registrado con timestamp."
  },
  {
    question: "¿Qué pasa después de pagar?",
    answer: "1) Recibes tu recibo por correo, 2) Aceptas el contrato de servicio, 3) Agendas tu onboarding en Calendly, 4) Preparas tu logo, colores y catálogo, 5) En 7 días tienes tu sistema funcionando."
  },
  {
    question: "¿Puedo usarlo si ya atiendo por WhatsApp?",
    answer: "¡Sí! Viral Clicker se integra con tu flujo actual de WhatsApp. No reemplaza tu WhatsApp, sino que lo organiza mejor con plantillas, estados y seguimiento."
  },
  {
    question: "¿Qué incluye 'cambios menores'?",
    answer: "Ajustes en textos de la landing, campos del formulario, plantillas de WhatsApp, configuración de estados del CRM. No incluye desarrollo de nuevas funcionalidades."
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
