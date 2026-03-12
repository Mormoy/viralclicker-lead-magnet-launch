// Automation follow-up templates (generic CRM)

export const FOLLOW_UP_TEMPLATES = {
  abandono_paso_1: {
    key: 'abandono_paso_1',
    label: 'Paso 1 – Recordatorio suave',
    delayHours: 24,
    triggerEvent: 'follow_up_abandoned_1',
    icon: '💬',
    template: `¡Hola {nombre}! 👋

Vi que quedó pendiente tu cotización. ¿Tienes alguna duda que pueda resolver?

¡Quedo atento/a! 🤝`,
  },
  abandono_paso_2: {
    key: 'abandono_paso_2',
    label: 'Paso 2 – Propuesta de valor',
    delayHours: 72,
    triggerEvent: 'follow_up_abandoned_2',
    icon: '🎯',
    template: `¡Hola {nombre}! 👋

Solo quería recordarte que tu cotización sigue vigente.

¿Te agendo una llamada sin compromiso? 📞`,
  },
  abandono_paso_3: {
    key: 'abandono_paso_3',
    label: 'Paso 3 – Urgencia moderada',
    delayHours: 120,
    triggerEvent: 'follow_up_abandoned_3',
    icon: '⏰',
    template: `¡Hola {nombre}! 

Tu cotización tiene vigencia limitada. Los precios pueden variar.

¿Quieres que te la actualice?

📋 Ver cotización: {link_cotizacion}`,
  },
  abandono_paso_4: {
    key: 'abandono_paso_4',
    label: 'Paso 4 – Último contacto',
    delayHours: 168,
    triggerEvent: 'follow_up_abandoned_4',
    icon: '👋',
    template: `¡Hola {nombre}!

Este es mi último mensaje sobre tu cotización. Si en algún momento necesitas nuestros servicios, no dudes en contactarnos.

¡Te deseamos lo mejor! 🙏`,
  },
} as const;

export type FollowUpTemplateKey = keyof typeof FOLLOW_UP_TEMPLATES;

export const QUEUE_STATUS_CONFIG = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: '⏳' },
  ready: { label: 'Listo para enviar', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: '📤' },
  sent: { label: 'Enviado', color: 'bg-green-100 text-green-800 border-green-300', icon: '✅' },
  failed: { label: 'Falló', color: 'bg-red-100 text-red-800 border-red-300', icon: '❌' },
  cancelled: { label: 'Cancelado', color: 'bg-gray-100 text-gray-800 border-gray-300', icon: '🚫' },
} as const;

export type QueueStatusKey = keyof typeof QUEUE_STATUS_CONFIG;

export const interpolateTemplate = (
  template: string,
  variables: Record<string, string>
): string => {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value || '');
  }
  return result;
};

export const WORK_ORDER_STATUSES = [
  { key: 'pending', label: 'Pendiente', color: 'bg-yellow-500', icon: '⏳' },
  { key: 'in_progress', label: 'En Producción', color: 'bg-blue-500', icon: '🔧' },
  { key: 'quality_check', label: 'Control Calidad', color: 'bg-purple-500', icon: '🔍' },
  { key: 'ready', label: 'Listo', color: 'bg-green-500', icon: '✅' },
  { key: 'delivered', label: 'Entregado', color: 'bg-emerald-600', icon: '📦' },
  { key: 'closed', label: 'Cerrado', color: 'bg-gray-500', icon: '🏁' },
  { key: 'cancelled', label: 'Cancelado', color: 'bg-red-500', icon: '❌' },
] as const;
