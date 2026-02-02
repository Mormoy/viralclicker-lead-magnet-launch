import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Phone,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import type { Cotizacion } from './types';

interface AlertasPanelProps {
  alertas: {
    nuevosUrgentes: Cotizacion[];
    nuevosCriticos: Cotizacion[];
    sinSeguimiento: Cotizacion[];
    seguimientosVencidos: Cotizacion[];
    visitasHoy: Cotizacion[];
  };
  onSelectCotizacion: (cotizacion: Cotizacion) => void;
}

export const AlertasPanel = ({ alertas, onSelectCotizacion }: AlertasPanelProps) => {
  const handleWhatsApp = (cotizacion: Cotizacion) => {
    const phone = cotizacion.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const AlertCard = ({ 
    title, 
    items, 
    icon: Icon, 
    color,
    bgColor 
  }: { 
    title: string; 
    items: Cotizacion[]; 
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
  }) => (
    <Card className={`${bgColor} border-gray-800`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-lg flex items-center gap-2 ${color}`}>
          <Icon className="w-5 h-5" />
          {title}
          <Badge variant="outline" className={`ml-auto ${color} border-current`}>
            {items.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-white/40 text-sm py-4 text-center">Sin pendientes 🎉</p>
        ) : (
          <div className="space-y-3">
            {items.slice(0, 5).map(cot => (
              <div 
                key={cot.id} 
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => onSelectCotizacion(cot)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{cot.nombre}</p>
                  <p className="text-white/50 text-sm truncate">{cot.empresa || cot.whatsapp}</p>
                  {cot.valor_estimado > 0 && (
                    <p className="text-green-400 text-sm">${cot.valor_estimado.toLocaleString()}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-green-400 hover:bg-green-500/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(cot);
                    }}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-500/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${cot.whatsapp}`, '_blank');
                    }}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {items.length > 5 && (
              <p className="text-white/40 text-sm text-center">
                +{items.length - 5} más
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Critical Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <AlertCard
          title="🚨 Contactar AHORA (+30min)"
          items={alertas.nuevosUrgentes}
          icon={AlertTriangle}
          color="text-red-400"
          bgColor="bg-red-900/20 border-red-500/30"
        />
        
        <AlertCard
          title="⚠️ Sin respuesta (+24h)"
          items={alertas.nuevosCriticos}
          icon={Clock}
          color="text-orange-400"
          bgColor="bg-orange-900/20 border-orange-500/30"
        />
      </div>

      {/* Follow-up Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <AlertCard
          title="📅 Seguimientos Vencidos"
          items={alertas.seguimientosVencidos}
          icon={Clock}
          color="text-yellow-400"
          bgColor="bg-yellow-900/20 border-yellow-500/30"
        />
        
        <AlertCard
          title="⚠️ Falta Seguimiento"
          items={alertas.sinSeguimiento}
          icon={AlertTriangle}
          color="text-amber-400"
          bgColor="bg-amber-900/20 border-amber-500/30"
        />
      </div>

      {/* Today's Visits */}
      <AlertCard
        title="📍 Visitas de Hoy"
        items={alertas.visitasHoy}
        icon={Calendar}
        color="text-purple-400"
        bgColor="bg-purple-900/20 border-purple-500/30"
      />

      {/* Summary */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="text-center px-6 py-3 bg-gray-800 rounded-lg">
              <p className="text-3xl font-bold text-red-400">{alertas.nuevosUrgentes.length}</p>
              <p className="text-white/50 text-sm">Urgentes</p>
            </div>
            <div className="text-center px-6 py-3 bg-gray-800 rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">{alertas.seguimientosVencidos.length}</p>
              <p className="text-white/50 text-sm">Vencidos</p>
            </div>
            <div className="text-center px-6 py-3 bg-gray-800 rounded-lg">
              <p className="text-3xl font-bold text-amber-400">{alertas.sinSeguimiento.length}</p>
              <p className="text-white/50 text-sm">Sin seguimiento</p>
            </div>
            <div className="text-center px-6 py-3 bg-gray-800 rounded-lg">
              <p className="text-3xl font-bold text-purple-400">{alertas.visitasHoy.length}</p>
              <p className="text-white/50 text-sm">Visitas hoy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
