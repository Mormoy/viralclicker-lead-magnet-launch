import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Phone, 
  Mail, 
  Building2, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Lead {
  id: string;
  nombre: string;
  empresa: string;
  rubro: string;
  whatsapp: string;
  correo: string;
  ciudad: string;
  mensaje: string | null;
  estado: string;
  created_at: string;
  updated_at: string;
}

const estadosLead = [
  { value: 'nuevo', label: 'Nuevo', color: 'bg-blue-500', icon: ShoppingCart },
  { value: 'contactado', label: 'Contactado', color: 'bg-yellow-500', icon: Phone },
  { value: 'interesado', label: 'Interesado', color: 'bg-cyan-500', icon: Clock },
  { value: 'convertido', label: 'Convertido', color: 'bg-green-500', icon: CheckCircle2 },
  { value: 'perdido', label: 'Perdido', color: 'bg-red-500', icon: XCircle },
];

export const AbandonedCartsPanel = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('all');
  const { toast } = useToast();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateLeadStatus = async (id: string, newEstado: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ estado: newEstado })
        .eq('id', id);

      if (error) throw error;

      setLeads(prev => 
        prev.map(l => l.id === id ? { ...l, estado: newEstado } : l)
      );

      toast({
        title: "Estado actualizado",
        description: `Lead marcado como "${estadosLead.find(e => e.value === newEstado)?.label}"`,
      });
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive",
      });
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchSearch = searchTerm === '' || 
        lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.correo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchEstado = filterEstado === 'all' || lead.estado === filterEstado;
      return matchSearch && matchEstado;
    });
  }, [leads, searchTerm, filterEstado]);

  // Calculate time since creation
  const getTimeSince = (dateStr: string) => {
    const now = new Date();
    const created = new Date(dateStr);
    const diffMs = now.getTime() - created.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d`;
    if (diffHours > 0) return `${diffHours}h`;
    return 'Ahora';
  };

  // Leads that need urgent attention (new leads > 1 hour old)
  const urgentLeads = leads.filter(l => {
    if (l.estado !== 'nuevo') return false;
    const hoursOld = (Date.now() - new Date(l.created_at).getTime()) / (1000 * 60 * 60);
    return hoursOld > 1;
  });

  const stats = useMemo(() => ({
    total: leads.length,
    nuevos: leads.filter(l => l.estado === 'nuevo').length,
    contactados: leads.filter(l => l.estado === 'contactado').length,
    interesados: leads.filter(l => l.estado === 'interesado').length,
    convertidos: leads.filter(l => l.estado === 'convertido').length,
    perdidos: leads.filter(l => l.estado === 'perdido').length,
  }), [leads]);

  const getEstadoInfo = (estado: string) => {
    return estadosLead.find(e => e.value === estado) || { label: estado, color: 'bg-gray-500', icon: ShoppingCart };
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-3 pb-3 px-4">
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-white/60 text-xs">Total leads</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/20 border-blue-500/50">
          <CardContent className="pt-3 pb-3 px-4">
            <p className="text-2xl font-bold text-blue-400">{stats.nuevos}</p>
            <p className="text-white/60 text-xs">Nuevos</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/20 border-yellow-500/50">
          <CardContent className="pt-3 pb-3 px-4">
            <p className="text-2xl font-bold text-yellow-400">{stats.contactados}</p>
            <p className="text-white/60 text-xs">Contactados</p>
          </CardContent>
        </Card>
        <Card className="bg-cyan-500/20 border-cyan-500/50">
          <CardContent className="pt-3 pb-3 px-4">
            <p className="text-2xl font-bold text-cyan-400">{stats.interesados}</p>
            <p className="text-white/60 text-xs">Interesados</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/20 border-green-500/50">
          <CardContent className="pt-3 pb-3 px-4">
            <p className="text-2xl font-bold text-green-400">{stats.convertidos}</p>
            <p className="text-white/60 text-xs">Convertidos</p>
          </CardContent>
        </Card>
        <Card className="bg-red-500/20 border-red-500/50">
          <CardContent className="pt-3 pb-3 px-4">
            <p className="text-2xl font-bold text-red-400">{stats.perdidos}</p>
            <p className="text-white/60 text-xs">Perdidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent alert */}
      {urgentLeads.length > 0 && (
        <Card className="bg-orange-500/20 border-orange-500/50">
          <CardContent className="py-3 px-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-orange-400 font-medium">
                  {urgentLeads.length} lead{urgentLeads.length > 1 ? 's' : ''} sin contactar por más de 1 hora
                </p>
                <p className="text-white/60 text-sm">
                  Contacta rápido para no perder la oportunidad
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Buscar por nombre, empresa o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Select value={filterEstado} onValueChange={setFilterEstado}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-white">Todos</SelectItem>
            {estadosLead.map(e => (
              <SelectItem key={e.value} value={e.value} className="text-white">{e.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          onClick={fetchLeads} 
          disabled={loading}
          variant="outline"
          size="sm"
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>

      {/* Leads List */}
      <ScrollArea className="h-[calc(100vh-500px)]">
        <div className="grid gap-3">
          {filteredLeads.map((lead) => {
            const estadoInfo = getEstadoInfo(lead.estado);
            const timeSince = getTimeSince(lead.created_at);
            const isUrgent = lead.estado === 'nuevo' && 
              (Date.now() - new Date(lead.created_at).getTime()) > (1000 * 60 * 60);

            return (
              <Card 
                key={lead.id} 
                className={`bg-gray-900 border-gray-800 ${isUrgent ? 'border-l-4 border-l-orange-500' : ''}`}
              >
                <CardContent className="py-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-white font-semibold">{lead.nombre}</h3>
                        <Badge className={`${estadoInfo.color} text-white text-xs`}>
                          {estadoInfo.label}
                        </Badge>
                        <span className="text-white/40 text-xs">hace {timeSince}</span>
                        {isUrgent && (
                          <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                            ⚠️ Urgente
                          </Badge>
                        )}
                      </div>
                      <p className="text-viralOrange text-sm">{lead.empresa}</p>
                      <p className="text-white/50 text-xs">{lead.rubro}</p>

                      <div className="flex flex-wrap gap-3 mt-2 text-sm">
                        <div className="flex items-center gap-1.5 text-white/70">
                          <Phone className="w-3.5 h-3.5 text-green-400" />
                          <a 
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-400 transition-colors"
                          >
                            {lead.whatsapp}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/70">
                          <Mail className="w-3.5 h-3.5 text-blue-400" />
                          <span>{lead.correo}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/70">
                          <Building2 className="w-3.5 h-3.5 text-purple-400" />
                          <span>{lead.ciudad}</span>
                        </div>
                      </div>

                      {lead.mensaje && (
                        <p className="text-white/50 text-sm mt-2 italic">"{lead.mensaje}"</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 min-w-[160px]">
                      <Select 
                        value={lead.estado} 
                        onValueChange={(value) => updateLeadStatus(lead.id, value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {estadosLead.map(e => (
                            <SelectItem key={e.value} value={e.value} className="text-white">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${e.color}`} />
                                {e.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-400 hover:bg-green-600/20"
                        onClick={() => window.open(`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.nombre)},%20te%20escribo%20de%20Viral%20Clicker.%20Vi%20que%20te%20interesó%20nuestro%20servicio.%20¿Tienes%20unos%20minutos%20para%20conversar?`, '_blank')}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredLeads.length === 0 && !loading && (
            <Card className="bg-gray-900 border-gray-800 text-center p-8">
              <CardContent>
                <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  No hay leads para mostrar
                </p>
                <p className="text-gray-500 text-sm">
                  Los leads aparecerán aquí cuando alguien complete el formulario de contacto
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
