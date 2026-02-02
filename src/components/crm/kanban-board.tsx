import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { KanbanCard } from './kanban-card';
import type { Cotizacion, PlantillaWhatsApp, CotizacionEstado } from './types';
import { PIPELINE_ESTADOS } from './types';

interface KanbanBoardProps {
  cotizaciones: Cotizacion[];
  onUpdateEstado: (id: string, nuevoEstado: string, datosExtra?: Partial<Cotizacion>) => void;
  onSelectCotizacion: (cotizacion: Cotizacion) => void;
  plantillas: PlantillaWhatsApp[];
}

export const KanbanBoard = ({ 
  cotizaciones, 
  onUpdateEstado, 
  onSelectCotizacion,
  plantillas 
}: KanbanBoardProps) => {
  // Group cotizaciones by estado
  const cotizacionesByEstado = useMemo(() => {
    const grouped: Record<CotizacionEstado, Cotizacion[]> = {} as Record<CotizacionEstado, Cotizacion[]>;
    
    PIPELINE_ESTADOS.forEach(estado => {
      grouped[estado.value] = [];
    });
    
    cotizaciones.forEach(cot => {
      if (grouped[cot.estado]) {
        grouped[cot.estado].push(cot);
      }
    });
    
    return grouped;
  }, [cotizaciones]);

  // Calculate totals per column
  const getTotalValue = (items: Cotizacion[]) => {
    return items.reduce((acc, c) => acc + (c.valor_estimado || 0), 0);
  };

  const handleDragStart = (e: React.DragEvent, cotizacion: Cotizacion) => {
    e.dataTransfer.setData('cotizacionId', cotizacion.id);
    e.dataTransfer.setData('currentEstado', cotizacion.estado);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetEstado: CotizacionEstado) => {
    e.preventDefault();
    const cotizacionId = e.dataTransfer.getData('cotizacionId');
    const currentEstado = e.dataTransfer.getData('currentEstado');
    
    if (currentEstado !== targetEstado) {
      onUpdateEstado(cotizacionId, targetEstado);
    }
  };

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-4 min-w-max">
        {PIPELINE_ESTADOS.map((estado) => {
          const items = cotizacionesByEstado[estado.value] || [];
          const totalValue = getTotalValue(items);
          
          return (
            <div
              key={estado.value}
              className="w-72 flex-shrink-0"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, estado.value)}
            >
              <Card className={`bg-gray-900/50 border-gray-800 ${estado.bgColor} border-t-2`}>
                <CardHeader className="pb-2 pt-3 px-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-sm font-medium ${estado.color}`}>
                      {estado.label}
                    </CardTitle>
                    <Badge variant="outline" className="text-white/70 border-white/20">
                      {items.length}
                    </Badge>
                  </div>
                  {totalValue > 0 && (
                    <p className="text-xs text-white/50">
                      ${totalValue.toLocaleString()}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="px-2 pb-2">
                  <ScrollArea className="h-[calc(100vh-320px)]">
                    <div className="space-y-2 pr-2">
                      {items.length === 0 ? (
                        <div className="text-center py-8 text-white/30 text-sm">
                          Sin cotizaciones
                        </div>
                      ) : (
                        items.map((cotizacion) => (
                          <KanbanCard
                            key={cotizacion.id}
                            cotizacion={cotizacion}
                            onSelect={() => onSelectCotizacion(cotizacion)}
                            onDragStart={(e) => handleDragStart(e, cotizacion)}
                            onUpdateEstado={onUpdateEstado}
                            plantillas={plantillas.filter(p => p.estado_aplicable === cotizacion.estado)}
                          />
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
