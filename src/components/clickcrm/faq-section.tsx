import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, ChevronDown } from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    key: 'item-0',
    question: '¿Necesito WhatsApp Business API o puedo usar WhatsApp normal?',
    answer: 'Necesitas WhatsApp Business API (vía Twilio). Es la única forma de enviar mensajes automatizados, usar plantillas aprobadas y rastrear métricas de entrega. WhatsApp normal no soporta automatización ni campañas.'
  },
  {
    key: 'item-1',
    question: '¿Qué costos pago yo vs. qué incluye mi plan?',
    answer: 'Tu plan incluye: hosting, mantenimiento, soporte y actualizaciones menores. Pagas directamente a Twilio por los costos de mensajería (aprox. $0.03–0.05 USD por mensaje en EE.UU.). Esto te da control total sobre tu gasto en WhatsApp.'
  },
  {
    key: 'item-2',
    question: '¿Qué tan rápido es el setup? ¿Qué necesito entregar?',
    answer: 'El setup toma 7 días hábiles. Solo necesitamos: tu logo, colores de marca, lista de productos/servicios con precios y acceso a tu número de WhatsApp. Nosotros nos encargamos del resto.'
  },
  {
    key: 'item-3',
    question: '¿Puedo usar mi propio dominio?',
    answer: 'Sí. Conectamos tu dominio existente (ej. cotizaciones.tuempresa.com) sin costo adicional de configuración. Solo pagas el dominio si aún no tienes uno.'
  },
  {
    key: 'item-4',
    question: '¿Puedo empezar simple y agregar automatización después?',
    answer: 'Absolutamente. Empieza con Starter y sube a Pro o Elite cuando quieras. Tus datos se mantienen intactos y la migración es instantánea.'
  },
  {
    key: 'item-5',
    question: '¿Qué pasa si ya tengo un sitio web o CRM?',
    answer: 'ViralClicker funciona junto a tus herramientas existentes. Podemos embeber el formulario de cotización en tu sitio actual, o puedes usar nuestra landing page como un funnel de cotización independiente.'
  },
  {
    key: 'item-6',
    question: '¿Dónde se almacenan mis datos? ¿Puedo exportarlos?',
    answer: 'Tus datos se almacenan de forma segura y se transmiten cifrados (en tránsito). Puedes exportar todos tus leads, clientes y cotizaciones como CSV en cualquier momento—tus datos siempre son tuyos.'
  },
  {
    key: 'item-7',
    question: '¿Qué incluye el setup vs. qué cuenta como \'cambios menores\'?',
    answer: 'El setup incluye: diseño de landing, configuración del cotizador, setup del CRM, integración con WhatsApp API y onboarding 1:1. Los cambios menores son ajustes pequeños como editar textos, actualizar campos del formulario o modificar plantillas de WhatsApp—no funcionalidades nuevas ni rediseños.'
  },
  {
    key: 'item-8',
    question: '¿Puedo cancelar en cualquier momento?',
    answer: 'Sí, sin penalidad. Tu plan se renueva mensualmente y puedes cancelar cuando quieras. Te entregamos un respaldo completo de tus datos (leads, clientes, cotizaciones).'
  },
  {
    key: 'item-9',
    question: '¿Cómo funciona el soporte?',
    answer: 'Respondemos por WhatsApp y email en horario laboral (Lunes–Viernes, 9 AM–6 PM EST). Tiempo de respuesta: menos de 4 horas en días hábiles. Los planes Elite tienen soporte prioritario con respuesta en menos de 2 horas.'
  }
];

const FaqSection = () => {
  const defaultExpanded = ['item-0', 'item-1'];

  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hola,%20tengo%20una%20pregunta%20sobre%20ViralClicker', '_blank');
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-16 px-4 bg-gray-900/50 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Preguntas Frecuentes
            </h2>
            <p className="text-white/60">
              Resuelve tus dudas antes de empezar
            </p>
          </div>

          <p className="text-white/50 text-sm text-center mb-6 flex items-center justify-center gap-2">
            <span className="hidden md:inline">Haz clic para desplegar cada respuesta</span>
            <span className="md:hidden">Toca una pregunta para ver la respuesta</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </p>

          <Accordion type="multiple" defaultValue={defaultExpanded} className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.key} 
                value={faq.key}
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-5 data-[state=open]:border-viralOrange/50 transition-colors"
              >
                <AccordionTrigger className="text-white hover:text-viralOrange text-left py-5 text-base font-medium [&[data-state=open]>svg]:rotate-180 gap-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-5 pt-0 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-8 bg-gray-800/30 border border-gray-700 rounded-xl text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
              ¿Te quedó alguna duda?
            </h3>
            <p className="text-white/60 mb-6 text-sm">
              Escríbenos o agenda una demo para resolver cualquier pregunta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToContact}
                className="bg-viralOrange hover:bg-viralOrange/90 text-white px-6 py-5 text-base"
                data-cta="book-demo"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar demo (15 min)
              </Button>
              <Button 
                onClick={handleWhatsApp}
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-600/20 px-6 py-5 text-base"
                data-cta="whatsapp"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Hablar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
