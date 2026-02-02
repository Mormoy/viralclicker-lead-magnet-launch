export type CotizacionEstado = 
  | 'nuevo'
  | 'contactado'
  | 'cotizacion_enviada'
  | 'en_decision'
  | 'visita_agendada'
  | 'visita_realizada'
  | 'propuesta_final_enviada'
  | 'anticipo_pagado'
  | 'en_fabricacion'
  | 'listo_instalar'
  | 'instalado_entregado'
  | 'cerrado_ganado'
  | 'perdido';

export type CotizacionFuente = 'ads' | 'web' | 'organico' | 'referido' | 'manual';
export type CotizacionPrioridad = 'alta' | 'media' | 'baja';
export type MotivoPerdida = 'precio' | 'sin_medidas' | 'comparando' | 'no_respondio' | 'fuera_zona' | 'plazo_disponibilidad' | 'otro';

export interface Cotizacion {
  id: string;
  created_at: string;
  updated_at: string;
  tenant_id: string | null;
  
  // Contact info
  nombre: string;
  empresa: string | null;
  whatsapp: string;
  correo: string | null;
  ciudad: string | null;
  direccion: string | null;
  
  // Pipeline state
  estado: CotizacionEstado;
  estado_anterior: CotizacionEstado | null;
  fecha_cambio_estado: string | null;
  
  // Source & tracking
  fuente: CotizacionFuente;
  campana: string | null;
  adset: string | null;
  tags: string[];
  
  // Priority & values
  prioridad: CotizacionPrioridad;
  valor_estimado: number;
  valor_final: number;
  
  // Key dates
  fecha_primer_contacto: string | null;
  fecha_envio_cotizacion: string | null;
  proximo_seguimiento: string | null;
  ultima_interaccion: string | null;
  
  // Visit info
  fecha_visita: string | null;
  direccion_visita: string | null;
  resultado_visita: string | null;
  ajuste_necesario: boolean | null;
  
  // Payment info
  metodo_pago: string | null;
  monto_anticipo: number | null;
  comprobante_pago: string | null;
  
  // Fabrication info
  fecha_inicio_fabricacion: string | null;
  fecha_estimada_entrega: string | null;
  
  // Installation info
  fecha_instalacion: string | null;
  fotos_entrega: string[] | null;
  satisfaccion: number | null;
  
  // Loss reason
  motivo_perdida: MotivoPerdida | null;
  motivo_perdida_texto: string | null;
  
  // Notes
  notas_internas: string | null;
  accion_recomendada: string | null;
  
  // Link to original lead
  lead_id: string | null;
}

export interface PlantillaWhatsApp {
  id: string;
  created_at: string;
  updated_at: string;
  tenant_id: string | null;
  nombre: string;
  estado_aplicable: CotizacionEstado;
  contenido: string;
  variables: string[];
  activa: boolean;
}

export interface CotizacionActividad {
  id: string;
  created_at: string;
  cotizacion_id: string;
  tipo: string;
  descripcion: string;
  estado_anterior: CotizacionEstado | null;
  estado_nuevo: CotizacionEstado | null;
  usuario: string | null;
}

// Pipeline configuration
export const PIPELINE_ESTADOS: { 
  value: CotizacionEstado; 
  label: string; 
  color: string;
  bgColor: string;
  description: string;
}[] = [
  { value: 'nuevo', label: 'Nuevo', color: 'text-blue-400', bgColor: 'bg-blue-500/20', description: 'Entró por web/ads o creado manual' },
  { value: 'contactado', label: 'Contactado', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', description: 'Ya hubo primer contacto real' },
  { value: 'cotizacion_enviada', label: 'Cotización Enviada', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', description: 'PDF o link enviado' },
  { value: 'en_decision', label: 'En Decisión', color: 'text-orange-400', bgColor: 'bg-orange-500/20', description: 'Cliente comparando opciones' },
  { value: 'visita_agendada', label: 'Visita Agendada', color: 'text-purple-400', bgColor: 'bg-purple-500/20', description: 'Cita confirmada en Calendly' },
  { value: 'visita_realizada', label: 'Visita Realizada', color: 'text-indigo-400', bgColor: 'bg-indigo-500/20', description: 'Medidas tomadas' },
  { value: 'propuesta_final_enviada', label: 'Propuesta Final', color: 'text-pink-400', bgColor: 'bg-pink-500/20', description: 'Cotización ajustada post visita' },
  { value: 'anticipo_pagado', label: 'Anticipo Pagado', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20', description: 'Cliente pagó 50%' },
  { value: 'en_fabricacion', label: 'En Fabricación', color: 'text-amber-400', bgColor: 'bg-amber-500/20', description: 'Pedido en proceso' },
  { value: 'listo_instalar', label: 'Listo Instalar', color: 'text-teal-400', bgColor: 'bg-teal-500/20', description: 'Esperando instalación' },
  { value: 'instalado_entregado', label: 'Instalado', color: 'text-lime-400', bgColor: 'bg-lime-500/20', description: 'Trabajo finalizado' },
  { value: 'cerrado_ganado', label: 'Cerrado Ganado', color: 'text-green-400', bgColor: 'bg-green-500/20', description: 'Venta confirmada' },
  { value: 'perdido', label: 'Perdido', color: 'text-red-400', bgColor: 'bg-red-500/20', description: 'No se cerró' },
];

export const FUENTES: { value: CotizacionFuente; label: string }[] = [
  { value: 'ads', label: 'Ads (Facebook/Google)' },
  { value: 'web', label: 'Formulario Web' },
  { value: 'organico', label: 'Orgánico' },
  { value: 'referido', label: 'Referido' },
  { value: 'manual', label: 'Creado Manual' },
];

export const PRIORIDADES: { value: CotizacionPrioridad; label: string; color: string }[] = [
  { value: 'alta', label: 'Alta', color: 'bg-red-500' },
  { value: 'media', label: 'Media', color: 'bg-yellow-500' },
  { value: 'baja', label: 'Baja', color: 'bg-gray-500' },
];

export const MOTIVOS_PERDIDA: { value: MotivoPerdida; label: string }[] = [
  { value: 'precio', label: 'Precio' },
  { value: 'sin_medidas', label: 'No tenía medidas / no quiso visita' },
  { value: 'comparando', label: 'Está comparando / se enfrió' },
  { value: 'no_respondio', label: 'No respondió' },
  { value: 'fuera_zona', label: 'Fuera de zona' },
  { value: 'plazo_disponibilidad', label: 'Plazo / disponibilidad' },
  { value: 'otro', label: 'Otro' },
];

export const TAGS_PRODUCTO = [
  'Screen', 'Blackout', 'Duo', 'Vertical', 'Enrollable', 'Panel Japonés'
];

export const TAGS_AMBIENTE = [
  'Dormitorio', 'Living', 'Cocina', 'Oficina', 'Comedor', 'Baño'
];
