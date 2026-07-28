import { PRICING } from '@/config/site';

export type Lang = 'es' | 'en';

// Copy de la landing del nicho (restauración de daños + reclamaciones de seguros).
// Fuente: AUDITORIA_WEBS_Y_COPY_NUEVO.html — pestaña "Copy: la landing del nicho".
export const copy = (lang: Lang) => {
  const isEs = lang === 'es';

  return {
    nav: {
      demo: isEs ? 'Agenda tu demo' : 'Book your demo',
      pricing: isEs ? 'Precios' : 'Pricing',
      how: isEs ? 'Cómo funciona' : 'How it works',
    },

    hero: {
      badge: isEs
        ? 'Para empresas de restauración y reclamaciones en Florida'
        : 'For restoration & claims companies in Florida',
      title1: isEs ? 'Cuando entra una emergencia a las 9 PM,' : 'When an emergency comes in at 9 PM,',
      title2: isEs ? '¿quién contesta por ti?' : 'who answers for you?',
      lead: isEs
        ? 'Un agente con inteligencia artificial llama a cada cliente en menos de 2 minutos, evalúa el daño, agenda la inspección y hace el seguimiento. En español e inglés, las 24 horas.'
        : 'An AI agent calls every customer in under 2 minutes, assesses the damage, books the inspection and follows up. In English and Spanish, 24/7.',
      ctaPrimary: isEs ? 'Mira el agente llamando — demo de 15 min' : 'Watch the agent call — 15-min demo',
      ctaSecondary: isEs ? 'Déjame tus datos' : 'Leave me your details',
      micro: isEs
        ? ['Funcionando en 7 días', 'Sin contratos', 'Hecho para restauración y reclamaciones en Florida']
        : ['Live in 7 days', 'No contracts', 'Built for restoration & claims in Florida'],
    },

    problem: {
      kicker: isEs ? 'El problema' : 'The problem',
      title: isEs
        ? 'En tu negocio, el que responde primero se queda con el trabajo.'
        : 'In your business, whoever responds first wins the job.',
      p1: isEs
        ? 'Una filtración, un incendio, un techo dañado por la tormenta. El propietario está asustado y llama a tres empresas. Contrata a la que le contesta.'
        : 'A leak, a fire, a roof damaged by the storm. The owner is scared and calls three companies. They hire the one that picks up.',
      p2: isEs
        ? 'Y tú, justo en ese momento, estás secando una casa, midiendo humedad o documentando un siniestro. No es que no quieras contestar: es que estás trabajando.'
        : "And you, right at that moment, are drying out a house, taking moisture readings or documenting a claim. It's not that you don't want to answer: you're working.",
    },

    math: {
      kicker: isEs ? 'La cuenta que duele' : 'The math that hurts',
      title: isEs ? 'Haz el cálculo de lo que se te escapa' : 'Do the math on what slips away',
      p1: isEs
        ? 'Un trabajo de restauración promedio son varios miles de dólares. Si te entran 10 consultas al mes y pierdes 3 por no responder a tiempo, eso es lo que se lleva tu competencia cada mes. Y probablemente ya pagaste por esos contactos — en anuncios, en referidos, en tu página.'
        : "An average restoration job is several thousand dollars. If 10 enquiries come in each month and you lose 3 because you didn't answer in time, that's what your competition takes home every month. And you probably already paid for those contacts — in ads, in referrals, on your website.",
      punch: isEs
        ? 'El problema nunca fue conseguir clientes. Es alcanzar a atenderlos a todos.'
        : 'Getting customers was never the problem. Getting to all of them is.',
    },

    solution: {
      kicker: isEs ? 'La solución' : 'The solution',
      title: isEs ? 'Un equipo con IA que nunca se va a dormir' : 'An AI team that never goes to sleep',
      items: isEs
        ? [
            { icon: '📞', title: 'Llama en 2 minutos.', desc: 'Entra la consulta y tu agente marca. Pregunta qué pasó, si hay agua, si hay seguro de por medio, y ofrece horarios de inspección.' },
            { icon: '💬', title: 'Conversa por WhatsApp.', desc: 'Responde dudas, pide fotos del daño y agenda. En el idioma que hable el cliente.' },
            { icon: '🔄', title: 'No suelta a nadie.', desc: 'Al que no contestó, al que pidió presupuesto, al que dijo "lo voy a pensar": seguimiento automático por semanas.' },
            { icon: '📊', title: 'Y te muestra los números.', desc: 'Qué anuncio trajo cada trabajo y cuánta plata tienes en juego.' },
          ]
        : [
            { icon: '📞', title: 'Calls in 2 minutes.', desc: 'The enquiry lands and your agent dials. Asks what happened, whether there is standing water, whether insurance is involved, and offers inspection times.' },
            { icon: '💬', title: 'Chats on WhatsApp.', desc: 'Answers questions, asks for photos of the damage and books. In whatever language the customer speaks.' },
            { icon: '🔄', title: 'Never lets go.', desc: 'The one who did not pick up, the one who asked for an estimate, the one who said "let me think about it": automatic follow-up for weeks.' },
            { icon: '📊', title: 'And it shows you the numbers.', desc: 'Which ad brought each job and how much money you have in play.' },
          ],
    },

    niche: {
      kicker: isEs ? 'Específico de tu rubro' : 'Specific to your trade',
      title: isEs ? 'Entrenado para tu negocio, no genérico' : 'Trained for your business, not generic',
      p1: isEs
        ? 'Tu agente sabe preguntar lo que importa en tu rubro: ¿hay agua acumulada? ¿cuántas habitaciones afectadas? ¿ya abrió reclamo con su aseguradora? ¿hace cuánto ocurrió? — y prioriza los casos urgentes.'
        : 'Your agent knows what to ask in your trade: is there standing water? how many rooms are affected? have they already opened a claim with their insurer? how long ago did it happen? — and prioritizes the urgent cases.',
      p2: isEs
        ? 'Si detecta que hay un reclamo de seguro de por medio, lo marca para que tú lo trates como corresponde. Esos son los trabajos que no se pueden perder.'
        : 'If it detects an insurance claim is involved, it flags it so you can handle it accordingly. Those are the jobs you cannot afford to lose.',
      questions: isEs
        ? ['¿Hay agua acumulada?', '¿Cuántas habitaciones afectadas?', '¿Ya abrió reclamo con su aseguradora?', '¿Hace cuánto ocurrió?']
        : ['Is there standing water?', 'How many rooms are affected?', 'Have you opened a claim yet?', 'How long ago did it happen?'],
      audiences: isEs
        ? [
            { title: 'Empresas de restauración de daños', desc: 'La urgencia es máxima — una inundación no espera. El cliente llama a 3 empresas y contrata a la que responde primero.' },
            { title: 'Reclamaciones de seguros (public adjusters)', desc: 'Viven de captar al damnificado antes que la competencia y de documentar rápido. Cada día que pasa, el caso se enfría.' },
          ]
        : [
            { title: 'Damage restoration companies', desc: 'Urgency is everything — a flood does not wait. The customer calls 3 companies and hires whoever responds first.' },
            { title: 'Insurance claims (public adjusters)', desc: 'You live on reaching the homeowner before the competition and documenting fast. Every day that passes, the case cools down.' },
          ],
    },

    video: {
      kicker: isEs ? 'Míralo funcionando' : 'See it in action',
      title: isEs ? '90 segundos: de emergencia a inspección agendada' : '90 seconds: from emergency to booked inspection',
      // TODO: reemplazar por el embed cuando Javier entregue el video demo maestro.
      placeholder: isEs ? 'Video demo — próximamente' : 'Demo video — coming soon',
      caption: isEs
        ? 'Sin actores, sin guion: un caso de prueba entra al sistema y el agente lo llama en vivo.'
        : 'No actors, no script: a test case enters the system and the agent calls it live.',
    },

    steps: {
      kicker: isEs ? 'Cómo funciona' : 'How it works',
      title: isEs ? 'De la emergencia a la inspección, sin que toques el teléfono' : 'From emergency to inspection, without touching the phone',
      items: isEs
        ? [
            { title: 'Entra la emergencia', desc: 'Desde tu anuncio, tu página o tu WhatsApp — cae en el sistema al instante.' },
            { title: 'El agente llama en 2 minutos', desc: 'Pregunta qué pasó, evalúa el daño y califica el caso.' },
            { title: 'Agenda la inspección', desc: 'En tu calendario, y le confirma por WhatsApp.' },
            { title: 'Tú solo llegas a cerrar', desc: 'Con el cliente esperándote y todo el contexto en tu teléfono.' },
          ]
        : [
            { title: 'The emergency comes in', desc: 'From your ad, your site or your WhatsApp — it lands in the system instantly.' },
            { title: 'The agent calls in 2 minutes', desc: 'Asks what happened, assesses the damage and qualifies the case.' },
            { title: 'It books the inspection', desc: 'In your calendar, and confirms on WhatsApp.' },
            { title: 'You just show up to close', desc: 'With the customer waiting and the full context on your phone.' },
          ],
    },

    caseStudy: {
      kicker: isEs ? 'Caso real' : 'Real case',
      badge: isEs ? 'Cliente real' : 'Real client',
      quote: isEs
        ? '"Cada lead recibe una llamada en menos de 15 minutos — mientras mi equipo está en terreno."'
        : '"Every lead gets a call in under 15 minutes — while my team is out in the field."',
      who: isEs ? 'Empresa de reclamos y techos · Tampa, FL' : 'Roofing & insurance-claims company · Tampa, FL',
      note: isEs
        ? 'Y lo construimos primero para nuestra propia empresa de instalaciones, que factura con este sistema todos los días. No vendemos teoría — vendemos lo que usamos.'
        : "And we built it first for our own installation company, which invoices with this system every day. We don't sell theory — we sell what we use.",
      timelineTitle: isEs ? 'Línea de tiempo de un caso real' : 'Timeline of a real case',
      timeline: isEs
        ? [
            { label: 'Entra la consulta', value: '8:04 PM' },
            { label: 'El agente llama', value: '8:06 PM' },
            { label: 'Inspección agendada', value: '< 15 min' },
            { label: 'Toque humano requerido', value: '0', highlight: true },
          ]
        : [
            { label: 'Enquiry comes in', value: '8:04 PM' },
            { label: 'The agent calls', value: '8:06 PM' },
            { label: 'Inspection booked', value: '< 15 min' },
            { label: 'Human touch required', value: '0', highlight: true },
          ],
      disclaimer: isEs
        ? 'Datos difuminados a pedido del cliente.'
        : 'Figures blurred at the client’s request.',
    },

    pricing: {
      kicker: isEs ? 'Precios' : 'Pricing',
      title: isEs ? 'Simple. Sin contratos. Cancela cuando quieras.' : 'Simple. No contracts. Cancel anytime.',
      plans: isEs
        ? [
            { name: 'Starter', price: `$${PRICING.starter}`, blurb: 'Para no perder ninguna consulta.' },
            { name: 'Pro', price: `$${PRICING.pro}`, blurb: 'El agente de voz que llama y agenda.', popular: true },
            { name: 'Growth', price: `$${PRICING.growth}`, blurb: 'Todo lo del Pro + tus campañas gestionadas.' },
          ]
        : [
            { name: 'Starter', price: `$${PRICING.starter}`, blurb: 'So you stop losing enquiries.' },
            { name: 'Pro', price: `$${PRICING.pro}`, blurb: 'The voice agent that calls and books.', popular: true },
            { name: 'Growth', price: `$${PRICING.growth}`, blurb: 'Everything in Pro + your campaigns managed.' },
          ],
      perMonth: isEs ? '/mes' : '/mo',
      setup: isEs
        ? `Setup $${PRICING.setup} por única vez (precio de lanzamiento). Tu marca, tu número, tu agente entrenado y tu tablero — funcionando en 7 días.`
        : `Setup $${PRICING.setup} one-time (launch price). Your brand, your number, your trained agent and your dashboard — live in 7 days.`,
      cta: isEs ? 'Ver los planes en detalle' : 'See the plans in detail',
    },

    faq: {
      kicker: 'FAQ',
      title: isEs ? 'Lo que más nos preguntan' : 'What we get asked most',
      items: isEs
        ? [
            { q: '¿Necesito saber de tecnología?', a: 'No. Configuramos todo contigo en una sola reunión y te lo entregamos funcionando.' },
            { q: '¿Cuánto demora la implementación?', a: '7 días desde que empezamos.' },
            { q: '¿De verdad habla español e inglés?', a: 'Sí — el agente detecta el idioma del cliente y responde en el suyo.' },
            { q: '¿Puedo ponerle nombre y voz a mi agente?', a: 'Sí. Tú eliges cómo se llama, cómo suena y cómo habla. Es tu empleado, con tu marca.' },
            { q: '¿Las cuentas quedan a mi nombre?', a: 'Sí. Tu número, tu WhatsApp y tus campañas son tuyos. Si algún día decides irte, te llevas todo.' },
            { q: '¿Hay contrato de permanencia?', a: 'No. Mes a mes, cancelas cuando quieras.' },
          ]
        : [
            { q: 'Do I need to be technical?', a: 'No. We set everything up with you in a single call and hand it to you working.' },
            { q: 'How long does implementation take?', a: '7 days from the moment we start.' },
            { q: 'Does it really speak English and Spanish?', a: "Yes — the agent detects the customer's language and answers in it." },
            { q: 'Can I give my agent a name and a voice?', a: "Yes. You choose what it's called, how it sounds and how it speaks. It's your employee, with your brand." },
            { q: 'Are the accounts in my name?', a: 'Yes. Your number, your WhatsApp and your campaigns are yours. If you ever decide to leave, you take everything with you.' },
            { q: 'Is there a lock-in contract?', a: 'No. Month to month, cancel whenever you want.' },
          ],
    },

    finalCta: {
      title: isEs ? 'Escúchalo llamando a tu propio celular' : 'Hear it calling your own phone',
      desc: isEs
        ? 'En 15 minutos te mostramos el agente llamando a tu teléfono, hablando de tu negocio y agendando una inspección. Con eso decides.'
        : 'In 15 minutes we show you the agent calling your phone, talking about your business and booking an inspection. Then you decide.',
      demo: isEs ? 'Agenda tu demo de 15 minutos' : 'Book your 15-min demo',
      whatsapp: isEs ? 'O escríbenos por WhatsApp' : 'Or message us on WhatsApp',
      waMsg: isEs
        ? 'Hola, tengo una empresa de restauración/reclamos y quiero ver la demo del agente.'
        : 'Hi, I run a restoration/claims company and I want to see the agent demo.',
      secure: isEs
        ? 'Tus datos protegidos · sin contratos · cancelas cuando quieras'
        : 'Your data protected · no contracts · cancel anytime',
    },

    form: {
      title: isEs ? 'Escucha al agente llamando a tu celular' : 'Hear the agent call your phone',
      subtitle: isEs
        ? 'Déjanos tus datos y te llamamos con una demo real, hablando de tu negocio.'
        : 'Leave your details and we will call you with a real demo, talking about your business.',
      name: isEs ? 'Nombre' : 'Name',
      namePlaceholder: isEs ? 'Tu nombre' : 'Your name',
      phone: isEs ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp',
      phonePlaceholder: '+1 305 123 4567',
      business: isEs ? 'Tipo de negocio' : 'Type of business',
      businessPlaceholder: isEs ? 'Selecciona una opción' : 'Select an option',
      businessOptions: isEs
        ? ['Restauración de daños', 'Reclamaciones de seguros', 'Techos', 'Remodelación', 'Otro']
        : ['Damage restoration', 'Insurance claims', 'Roofing', 'Remodeling', 'Other'],
      submit: isEs ? 'Quiero la demo' : 'I want the demo',
      submitting: isEs ? 'Enviando…' : 'Sending…',
      privacy: isEs
        ? 'Sin spam. Te contactamos solo para coordinar la demo.'
        : 'No spam. We only contact you to schedule the demo.',
      successTitle: isEs ? '¡Listo! Te vamos a contactar.' : "You're in! We'll contact you.",
      successBody: isEs
        ? 'Te escribimos por WhatsApp para coordinar la demo. Si es urgente, escríbenos tú directo.'
        : "We'll message you on WhatsApp to schedule the demo. If it's urgent, message us directly.",
      errors: {
        name: isEs ? 'Escribe tu nombre' : 'Enter your name',
        phone: isEs ? 'Escribe un teléfono válido' : 'Enter a valid phone number',
        business: isEs ? 'Elige tu tipo de negocio' : 'Choose your type of business',
        submit: isEs
          ? 'No pudimos guardar tus datos. Inténtalo de nuevo o escríbenos por WhatsApp.'
          : 'We could not save your details. Try again or message us on WhatsApp.',
      },
    },

    footer: {
      company: 'Una empresa de Mormoy LLC · Rio Rancho, NM',
      terms: isEs ? 'Términos' : 'Terms',
      privacy: isEs ? 'Privacidad' : 'Privacy',
      rights: isEs ? 'Todos los derechos reservados' : 'All rights reserved',
    },
  };
};
