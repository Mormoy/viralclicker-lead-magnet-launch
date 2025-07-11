import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "¿Cómo funciona ViralClicker?",
    answer: "ViralClicker te permite crear campañas virales como sorteos, concursos o programas de referidos para aumentar tu alcance, captar más clientes y generar ventas de forma automática."
  },
  {
    question: "¿Necesito saber de códigos o ser experto en tecnología?",
    answer: "No. ViralClicker es muy fácil de usar, con plantillas listas y un editor simple sin necesidad de programar."
  },
  {
    question: "¿Qué tipos de campañas puedo crear?",
    answer: "Puedes lanzar sorteos, concursos, referidos, campañas \"coming soon\" o cualquier estrategia viral para captar leads y ventas."
  },
  {
    question: "¿Puedo ver los resultados de mis campañas en tiempo real?",
    answer: "Sí. ViralClicker te muestra métricas en tiempo real: número de participantes, referidos, clics y conversiones."
  },
  {
    question: "¿Puedo integrarlo con mi página web o redes sociales?",
    answer: "Sí. Solo debes copiar y pegar un código en tu sitio o compartirlo en tus redes sociales. No necesitas conocimientos técnicos."
  },
  {
    question: "¿Qué beneficios reales puedo obtener?",
    answer: "Aumentarás tu visibilidad, generarás más interacción y podrás duplicar o triplicar tu base de clientes potenciales de forma orgánica."
  },
  {
    question: "¿Cuánto cuesta usar ViralClicker?",
    answer: "Tenemos planes flexibles según el tamaño de tu negocio, además puedes comenzar con una prueba gratuita."
  }
];

const FaqSection = () => {
  return (
    <section className="py-16 px-4 bg-viralDark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          📝 Preguntas Frecuentes (FAQ) – ViralClicker
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