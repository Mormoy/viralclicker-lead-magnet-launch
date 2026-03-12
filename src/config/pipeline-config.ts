// Pipeline config - adapted for multi-tenant ViralClicker
// Statuses are loaded from DB (pipeline_stages), this config provides
// default display settings, alert logic, and filter presets.

export const LOSS_REASONS = [
  { key: 'precio_alto', label: 'Precio muy alto', icon: '💰' },
  { key: 'eligio_otra_empresa', label: 'Eligió otra empresa', icon: '🏪' },
  { key: 'no_contesto', label: 'No contestó más', icon: '📵' },
  { key: 'proyecto_cancelado', label: 'Proyecto cancelado', icon: '⏰' },
  { key: 'otro', label: 'Otro', icon: '❓' },
] as const;

export type LossReasonKey = typeof LOSS_REASONS[number]['key'];

export const NEXT_ACTIONS = [
  { key: 'whatsapp_1', label: 'WhatsApp 1', icon: '💬' },
  { key: 'whatsapp_2', label: 'WhatsApp 2', icon: '💬' },
  { key: 'llamar', label: 'Llamar', icon: '📞' },
  { key: 'pedir_info', label: 'Pedir info', icon: '📋' },
  { key: 'agendar_visita', label: 'Agendar visita', icon: '🏠' },
  { key: 'enviar_cotizacion', label: 'Enviar cotización', icon: '📄' },
  { key: 'cobrar', label: 'Cobrar', icon: '💳' },
  { key: 'cerrar_perdida', label: 'Cerrar pérdida', icon: '❌' },
  { key: 'recontactar', label: 'Recontactar', icon: '🔄' },
] as const;

export const PRIORITIES = [
  { key: 'alta', label: 'Alta', color: 'bg-red-500', textColor: 'text-red-500' },
  { key: 'media', label: 'Media', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  { key: 'baja', label: 'Baja', color: 'bg-gray-400', textColor: 'text-gray-500' },
] as const;

export type PriorityKey = typeof PRIORITIES[number]['key'];

export const DEAL_SOURCES = [
  { key: 'web', label: 'Web', icon: '🌐', badge: 'Web', badgeColor: 'bg-blue-500' },
  { key: 'whatsapp', label: 'WhatsApp Directo', icon: '💬', badge: 'WhatsApp', badgeColor: 'bg-emerald-600' },
  { key: 'referido', label: 'Referido', icon: '👥', badge: 'Referido', badgeColor: 'bg-purple-500' },
  { key: 'manual', label: 'Manual', icon: '✍️', badge: 'Manual', badgeColor: 'bg-gray-500' },
  { key: 'ads', label: 'Ads', icon: '📢', badge: 'Ads', badgeColor: 'bg-blue-500' },
  { key: 'organico', label: 'Orgánico', icon: '🌱', badge: 'Orgánico', badgeColor: 'bg-green-500' },
] as const;

export type DealSourceKey = typeof DEAL_SOURCES[number]['key'];

export const getSourceBadge = (source: string) => {
  const found = DEAL_SOURCES.find(s => s.key === source);
  return found || { badge: source, badgeColor: 'bg-gray-400' };
};

// Alert system
export type AlertCategory = 'sin_contactar' | 'sin_respuesta' | 'sin_movimiento' | 'visita_hoy' | 'seguimiento_estancado';

export interface AlertInfo {
  text: string;
  type: 'danger' | 'warning' | 'info' | 'purple';
  category: AlertCategory;
}

export const ALERT_COLORS: Record<AlertInfo['type'], string> = {
  danger: 'bg-destructive/10 text-destructive',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

// Date filter presets
export const DATE_FILTER_PRESETS = [
  { key: 'hoy', label: 'Hoy' },
  { key: 'ayer', label: 'Ayer' },
  { key: 'esta_semana', label: 'Esta semana' },
  { key: 'este_mes', label: 'Este mes' },
  { key: 'custom', label: 'Personalizado' },
] as const;

export type DateFilterPreset = typeof DATE_FILTER_PRESETS[number]['key'];

export const getDateRange = (preset: DateFilterPreset): { from: Date; to: Date } | null => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (preset) {
    case 'hoy':
      return { from: today, to: new Date(today.getTime() + 86400000 - 1) };
    case 'ayer': {
      const yesterday = new Date(today.getTime() - 86400000);
      return { from: yesterday, to: new Date(today.getTime() - 1) };
    }
    case 'esta_semana': {
      const day = today.getDay();
      const monday = new Date(today.getTime() - ((day === 0 ? 6 : day - 1) * 86400000));
      return { from: monday, to: new Date(today.getTime() + 86400000 - 1) };
    }
    case 'este_mes': {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from: firstDay, to: new Date(today.getTime() + 86400000 - 1) };
    }
    default:
      return null;
  }
};

// SLA
export const CONTACT_SLA_HOURS = 4;
export const STALE_DAYS = 3;
