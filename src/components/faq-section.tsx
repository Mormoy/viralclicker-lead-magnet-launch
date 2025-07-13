import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "¿Cómo funciona exactamente el sistema automatizado que menciona Nairok?",
    answer: "En Viral Clicker desarrollamos un sistema inteligente basado en inteligencia artificial, automatización y análisis de datos. Atraemos leads calificados sin perseguirlos, mediante embudos que educan, filtran e identifican a personas realmente interesadas antes de que te contacten. Todo el proceso está diseñado para funcionar mientras tú te enfocas en lo importante: vender y escalar tu negocio."
  },
  {
    question: "¿Este sistema realmente puede aplicarse a mi industria o tipo de negocio?",
    answer: "Sí. Está pensado especialmente para emprendedores, profesionales y negocios que venden servicios, formación o soluciones de alto valor. Si ofreces consultorías, cursos, mentorías, servicios técnicos o incluso soluciones B2B, este sistema puede ayudarte a escalar sin depender de referidos o esfuerzo manual."
  },
  {
    question: "¿Qué hace diferente a este sistema respecto a otras agencias de marketing?",
    answer: "No vendemos humo. Vendemos claridad, datos y estrategia. A diferencia de agencias que prometen \"visibilidad\" o likes, nosotros diseñamos un sistema que automatiza el proceso de atracción, educación y conversión de clientes reales. Además, te entregamos un sistema que puedes usar sin depender de nosotros, y lo adaptamos específicamente a tu negocio y estilo."
  },
  {
    question: "¿Qué necesito tener listo para implementar el sistema de ViralClicker?",
    answer: "Solo necesitas: ✅ Conocer bien tu oferta ✅ Tener un canal de contacto activo (WhatsApp, Instagram, etc.) ✅ Disposición para grabar o usar nuestro avatar ✅ Y estar listo para dejar de perseguir clientes. Nosotros nos encargamos de todo lo demás: configuración, diseño, automatización y seguimiento."
  },
  {
    question: "¿Cuánto tiempo toma empezar a ver resultados con este sistema?",
    answer: "Nuestros clientes suelen ver resultados en menos de 7 días después de lanzar su sistema. Si ya tienes cierta visibilidad o comunidad, el impacto es más rápido. Si estás empezando, te guiamos paso a paso para que en menos de 15 días tengas un sistema funcionando las 24 horas, incluso mientras duermes."
  },
  {
    question: "¿Qué tipo de resultados concretos han obtenido otros negocios?",
    answer: "Más de 7.000 leads generados en un año, agendas llenas de llamadas con personas que ya saben quién eres y qué haces, y retornos de inversión multiplicados por 5, 10 o más. Te mostramos casos reales en la llamada: con cifras, pantallazos y resultados específicos, en negocios como el tuyo."
  },
  {
    question: "¿Qué pasa después de llenar el formulario? ¿Hay compromiso o presión para comprar?",
    answer: "Ninguna presión. Al llenar el formulario, agendarás una conversación con nuestro equipo. Te escucharemos, analizaremos tu situación y te diremos con total honestidad si este sistema es para ti. Si no lo es, igual te irás con claridad. Y si lo es… empezarás a construir un negocio que no dependa de perseguir gente todos los días."
  }
];

const FaqSection = () => {
  return (
    <section className="py-16 px-4 bg-viralDark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          ❓ Preguntas Frecuentes
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-viralOrange/20 rounded-lg bg-viralDark/50 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-left text-white hover:text-viralOrange px-6 py-4 text-lg font-medium">
                <span className="flex items-start gap-3">
                  <span className="text-viralOrange">❓</span>
                  <span>{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-6 pb-4 text-base leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="text-viralOrange">👉</span>
                  <span>{faq.answer}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;