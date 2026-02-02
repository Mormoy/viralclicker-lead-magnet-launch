import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Building2, Calendar, CreditCard } from 'lucide-react';

interface Client {
  id: string;
  nombre: string;
  empresa: string;
  whatsapp: string;
  correo: string;
  ciudad: string | null;
  plan: string;
  monto: number;
  estado: string;
  contrato_aceptado: boolean;
  calendly_event_url: string | null;
  calendly_event_date: string | null;
  created_at: string;
}

interface ClientKanbanBoardProps {
  clients: Client[];
  onUpdateStatus: (id: string, newStatus: string) => void;
}

type EstadoValue = 'pagado' | 'contrato_enviado' | 'contrato_firmado' | 'onboarding_pendiente' | 'onboarding_agendado' | 'onboarded';

const PIPELINE_ESTADOS: { value: EstadoValue; label: string; color: string; bgColor: string }[] = [
  { value: 'pagado', label: 'Pagó', color: 'text-blue-400', bgColor: 'border-t-blue-500' },
  { value: 'contrato_enviado', label: 'Contrato enviado', color: 'text-yellow-400', bgColor: 'border-t-yellow-500' },
  { value: 'contrato_firmado', label: 'Contrato firmado', color: 'text-purple-400', bgColor: 'border-t-purple-500' },
  { value: 'onboarding_pendiente', label: 'Onboarding pendiente', color: 'text-orange-400', bgColor: 'border-t-orange-500' },
  { value: 'onboarding_agendado', label: 'Onboarding agendado', color: 'text-cyan-400', bgColor: 'border-t-cyan-500' },
  { value: 'onboarded', label: 'Onboarded', color: 'text-green-400', bgColor: 'border-t-green-500' },
];

const planes: Record<string, { label: string; color: string }> = {
  starter: { label: 'Starter', color: 'bg-gray-500' },
  pro: { label: 'Pro', color: 'bg-viralOrange' },
  elite: { label: 'Elite', color: 'bg-purple-600' },
};

export const ClientKanbanBoard = ({ clients, onUpdateStatus }: ClientKanbanBoardProps) => {
  // Group clients by estado
  const clientsByEstado = useMemo(() => {
    const grouped: Record<EstadoValue, Client[]> = {} as Record<EstadoValue, Client[]>;
    
    PIPELINE_ESTADOS.forEach(estado => {
      grouped[estado.value] = [];
    });
    
    clients.forEach(client => {
      if (grouped[client.estado as EstadoValue]) {
        grouped[client.estado as EstadoValue].push(client);
      }
    });
    
    return grouped;
  }, [clients]);

  // Calculate totals per column
  const getTotalValue = (items: Client[]) => {
    return items.reduce((acc, c) => acc + (c.monto || 0), 0);
  };

  const handleDragStart = (e: React.DragEvent, client: Client) => {
    e.dataTransfer.setData('clientId', client.id);
    e.dataTransfer.setData('currentEstado', client.estado);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetEstado: EstadoValue) => {
    e.preventDefault();
    const clientId = e.dataTransfer.getData('clientId');
    const currentEstado = e.dataTransfer.getData('currentEstado');
    
    if (currentEstado !== targetEstado) {
      onUpdateStatus(clientId, targetEstado);
    }
  };

  const getPlanInfo = (plan: string) => {
    return planes[plan] || { label: plan, color: 'bg-gray-500' };
  };

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-4 min-w-max">
        {PIPELINE_ESTADOS.map((estado) => {
          const items = clientsByEstado[estado.value] || [];
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
                    <p className="text-xs text-white/50 flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      ${totalValue.toLocaleString()}/mes
                    </p>
                  )}
                </CardHeader>
                <CardContent className="px-2 pb-2">
                  <ScrollArea className="h-[calc(100vh-320px)]">
                    <div className="space-y-2 pr-2">
                      {items.length === 0 ? (
                        <div className="text-center py-8 text-white/30 text-sm">
                          Sin clientes
                        </div>
                      ) : (
                        items.map((client) => (
                          <KanbanClientCard
                            key={client.id}
                            client={client}
                            onDragStart={(e) => handleDragStart(e, client)}
                            getPlanInfo={getPlanInfo}
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

interface KanbanClientCardProps {
  client: Client;
  onDragStart: (e: React.DragEvent) => void;
  getPlanInfo: (plan: string) => { label: string; color: string };
}

const KanbanClientCard = ({ client, onDragStart, getPlanInfo }: KanbanClientCardProps) => {
  const planInfo = getPlanInfo(client.plan);

  return (
    <Card
      className="bg-gray-800/80 border-gray-700 cursor-grab active:cursor-grabbing hover:border-gray-600 transition-colors"
      draggable
      onDragStart={onDragStart}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm truncate">{client.nombre}</h4>
            <p className="text-viralOrange text-xs truncate">{client.empresa}</p>
          </div>
          <Badge className={`${planInfo.color} text-white text-[10px] px-1.5`}>
            {planInfo.label}
          </Badge>
        </div>

        <p className="text-white/70 text-xs mb-2">${client.monto}/mes</p>

        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-white/60">
            <Phone className="w-3 h-3 text-green-400" />
            <span className="truncate">{client.whatsapp}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/60">
            <Mail className="w-3 h-3 text-blue-400" />
            <span className="truncate">{client.correo}</span>
          </div>
          {client.ciudad && (
            <div className="flex items-center gap-1.5 text-white/60">
              <Building2 className="w-3 h-3 text-purple-400" />
              <span className="truncate">{client.ciudad}</span>
            </div>
          )}
          {client.calendly_event_date && (
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Calendar className="w-3 h-3" />
              <span className="truncate">
                {new Date(client.calendly_event_date).toLocaleDateString('es-CL', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="mt-3 flex gap-1">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-7 text-xs border-green-600 text-green-400 hover:bg-green-600/20 px-2"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`, '_blank');
            }}
          >
            <Phone className="w-3 h-3 mr-1" />
            WhatsApp
          </Button>
        </div>

        <p className="text-white/30 text-[10px] mt-2">
          {new Date(client.created_at).toLocaleDateString('es-CL', {
            day: 'numeric',
            month: 'short'
          })}
        </p>
      </CardContent>
    </Card>
  );
};
