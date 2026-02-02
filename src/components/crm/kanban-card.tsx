import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { 
  Phone, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  MoreVertical,
  Clock,
  AlertTriangle,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import type { Cotizacion, PlantillaWhatsApp } from './types';
import { PIPELINE_ESTADOS, PRIORIDADES, MOTIVOS_PERDIDA } from './types';
import { MotivoPerdidaDialog } from './motivo-perdida-dialog';

interface KanbanCardProps {
  cotizacion: Cotizacion;
  onSelect: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onUpdateEstado: (id: string, nuevoEstado: string, datosExtra?: Partial<Cotizacion>) => void;
  plantillas: PlantillaWhatsApp[];
}

export const KanbanCard = ({ 
  cotizacion, 
  onSelect, 
  onDragStart,
  onUpdateEstado,
  plantillas 
}: KanbanCardProps) => {
  const [showMotivoPerdida, setShowMotivoPerdida] = useState(false);

  const prioridadInfo = PRIORIDADES.find(p => p.value === cotizacion.prioridad);
  
  // Check for alerts
  const now = new Date();
  const createdAt = new Date(cotizacion.created_at);
  const minutesSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60);
  const isUrgent = cotizacion.estado === 'nuevo' && minutesSinceCreation > 30;
  
  const hasOverdueSeguimiento = cotizacion.proximo_seguimiento && 
    new Date(cotizacion.proximo_seguimiento) < now;
  
  const missingSeguimiento = ['cotizacion_enviada', 'en_decision'].includes(cotizacion.estado) && 
    !cotizacion.proximo_seguimiento;

  const getTimeAgo = (date: string) => {
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  const handleWhatsAppClick = (plantilla?: PlantillaWhatsApp) => {
    let message = '';
    if (plantilla) {
      message = plantilla.contenido
        .replace('{{nombre}}', cotizacion.nombre)
        .replace('{{valor_estimado}}', cotizacion.valor_estimado?.toString() || '')
        .replace('{{valor_final}}', cotizacion.valor_final?.toString() || '')
        .replace('{{monto_anticipo}}', (cotizacion.monto_anticipo || cotizacion.valor_estimado * 0.5).toString())
        .replace('{{fecha_visita}}', cotizacion.fecha_visita ? new Date(cotizacion.fecha_visita).toLocaleString('es-CL') : '')
        .replace('{{direccion_visita}}', cotizacion.direccion_visita || '');
    }
    const phone = cotizacion.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleMoverEstado = (nuevoEstado: string) => {
    if (nuevoEstado === 'perdido') {
      setShowMotivoPerdida(true);
    } else {
      onUpdateEstado(cotizacion.id, nuevoEstado);
    }
  };

  const handleConfirmPerdida = (motivo: string, texto?: string) => {
    onUpdateEstado(cotizacion.id, 'perdido', {
      motivo_perdida: motivo as Cotizacion['motivo_perdida'],
      motivo_perdida_texto: texto || null
    });
    setShowMotivoPerdida(false);
  };

  // Get next logical states
  const currentIndex = PIPELINE_ESTADOS.findIndex(e => e.value === cotizacion.estado);
  const nextStates = PIPELINE_ESTADOS.slice(currentIndex + 1, currentIndex + 4);

  return (
    <>
      <Card 
        className={`bg-gray-800/80 border-gray-700 cursor-pointer hover:border-gray-600 transition-all ${
          isUrgent || hasOverdueSeguimiento ? 'border-l-4 border-l-red-500' : ''
        } ${missingSeguimiento ? 'border-l-4 border-l-yellow-500' : ''}`}
        draggable
        onDragStart={onDragStart}
        onClick={onSelect}
      >
        <CardContent className="p-3 space-y-2">
          {/* Header with name and priority */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{cotizacion.nombre}</p>
              {cotizacion.empresa && (
                <p className="text-xs text-white/60 truncate">{cotizacion.empresa}</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              {prioridadInfo && (
                <div className={`w-2 h-2 rounded-full ${prioridadInfo.color}`} title={prioridadInfo.label} />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/60 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="text-white">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Mover a
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="bg-gray-800 border-gray-700">
                      {PIPELINE_ESTADOS.filter(e => e.value !== cotizacion.estado).map(estado => (
                        <DropdownMenuItem 
                          key={estado.value}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoverEstado(estado.value);
                          }}
                          className={`text-white ${estado.color}`}
                        >
                          {estado.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppClick();
                    }}
                    className="text-white"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-green-400" />
                    Enviar WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${cotizacion.whatsapp}`, '_blank');
                    }}
                    className="text-white"
                  >
                    <Phone className="w-4 h-4 mr-2 text-blue-400" />
                    Llamar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Value */}
          {cotizacion.valor_estimado > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <DollarSign className="w-3 h-3 text-green-400" />
              <span className="text-green-400 font-medium">
                ${cotizacion.valor_estimado.toLocaleString()}
              </span>
            </div>
          )}

          {/* Tags */}
          {cotizacion.tags && cotizacion.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {cotizacion.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs text-white/70 border-white/20 px-1 py-0">
                  {tag}
                </Badge>
              ))}
              {cotizacion.tags.length > 3 && (
                <Badge variant="outline" className="text-xs text-white/50 border-white/10 px-1 py-0">
                  +{cotizacion.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Alerts */}
          {(isUrgent || hasOverdueSeguimiento || missingSeguimiento) && (
            <div className="flex items-center gap-1 text-xs">
              <AlertTriangle className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400">
                {isUrgent && 'Contactar ahora'}
                {hasOverdueSeguimiento && 'Seguimiento vencido'}
                {missingSeguimiento && 'Falta seguimiento'}
              </span>
            </div>
          )}

          {/* Footer with time and actions */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-700">
            <div className="flex items-center gap-1 text-xs text-white/40">
              <Clock className="w-3 h-3" />
              <span>{getTimeAgo(cotizacion.updated_at || cotizacion.created_at)}</span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-green-400 hover:text-green-300 hover:bg-green-500/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWhatsAppClick(plantillas[0]);
                }}
                title="Enviar WhatsApp"
              >
                <MessageSquare className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
                onClick={(e) => e.stopPropagation()}
                title="Agendar visita"
              >
                <Calendar className="w-3 h-3" />
              </Button>
              {['propuesta_final_enviada', 'en_decision'].includes(cotizacion.estado) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateEstado(cotizacion.id, 'anticipo_pagado');
                  }}
                  title="Marcar anticipo pagado"
                >
                  <CreditCard className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Quick move buttons */}
          {nextStates.length > 0 && (
            <div className="flex gap-1 pt-1">
              {nextStates.slice(0, 2).map(estado => (
                <Button
                  key={estado.value}
                  variant="outline"
                  size="sm"
                  className={`flex-1 text-xs h-6 border-gray-700 ${estado.color} hover:${estado.bgColor}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoverEstado(estado.value);
                  }}
                >
                  → {estado.label.split(' ')[0]}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showMotivoPerdida && (
        <MotivoPerdidaDialog
          isOpen={showMotivoPerdida}
          onClose={() => setShowMotivoPerdida(false)}
          onConfirm={handleConfirmPerdida}
        />
      )}
    </>
  );
};
