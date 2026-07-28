// =====================================================
// SITE CONFIG — única fuente para contacto y precios.
// Edita aquí: se usa en la home, /restauracion y /precios.
// =====================================================

export const CONTACT = {
  // ⚠️ Confirmar número USA final con JC antes de publicar
  whatsapp: '15052074989',
  whatsappDisplay: '+1 (505) 207-4989',
  // Cal.com de JC/Javier para la demo en vivo (confirmar slug)
  demoUrl: 'https://cal.com/mormoy',
  email: 'moromoyllc@gmail.com',
} as const;

export const PRICING = {
  starter: 247,
  pro: 397,
  growth: 597,
  setup: 497,
  overagePerMin: 0.3,
  includedAiMinutes: 300,
  // Inversión publicitaria mínima sugerida — la paga el cliente directo a Meta
  adSpendFrom: 300,
} as const;

export const waLink = (msg: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
