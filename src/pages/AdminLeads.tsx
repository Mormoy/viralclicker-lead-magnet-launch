import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { 
  LogOut, 
  Download, 
  Filter, 
  RefreshCw,
  Users,
  MessageSquare,
  Calendar,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';
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

const estados = [
  { value: 'nuevo', label: 'Nuevo', color: 'bg-blue-500' },
  { value: 'contactado', label: 'Contactado', color: 'bg-yellow-500' },
  { value: 'demo_agendada', label: 'Demo agendada', color: 'bg-purple-500' },
  { value: 'propuesta', label: 'Propuesta enviada', color: 'bg-orange-500' },
  { value: 'cerrado', label: 'Cerrado', color: 'bg-green-500' },
  { value: 'perdido', label: 'Perdido', color: 'bg-red-500' },
];

const AdminLeads = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterEstado, setFilterEstado] = useState<string>('all');
  const [filterRubro, setFilterRubro] = useState<string>('all');
  const { toast } = useToast();

  const ADMIN_PASSWORD = 'viralclicker102030+*+';

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      toast({
        title: "Acceso autorizado",
        description: "Bienvenido al panel de administración",
      });
    } else {
      toast({
        title: "Acceso denegado",
        description: "Contraseña incorrecta",
        variant: "destructive",
      });
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads((data as Lead[]) || []);
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
        description: `Lead marcado como "${estados.find(e => e.value === newEstado)?.label}"`,
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

  const exportToCSV = () => {
    const headers = ['Fecha', 'Nombre', 'Empresa', 'Rubro', 'WhatsApp', 'Correo', 'Ciudad', 'Mensaje', 'Estado'];
    const rows = filteredLeads.map(lead => [
      new Date(lead.created_at).toLocaleDateString('es-CL'),
      lead.nombre,
      lead.empresa,
      lead.rubro,
      lead.whatsapp,
      lead.correo,
      lead.ciudad,
      lead.mensaje || '',
      estados.find(e => e.value === lead.estado)?.label || lead.estado
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads_clickcrm_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exportado",
      description: `${filteredLeads.length} leads exportados a CSV`,
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchEstado = filterEstado === 'all' || lead.estado === filterEstado;
    const matchRubro = filterRubro === 'all' || lead.rubro === filterRubro;
    return matchEstado && matchRubro;
  });

  const uniqueRubros = [...new Set(leads.map(l => l.rubro))];

  const getEstadoInfo = (estado: string) => {
    return estados.find(e => e.value === estado) || { label: estado, color: 'bg-gray-500' };
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-viralDark flex flex-col">
        <header className="p-4 bg-viralDark border-b border-gray-800">
          <div className="container mx-auto flex justify-center items-center">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-viralOrange font-bold text-xl">ClickCRM Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Panel de Administración
              </CardTitle>
              <CardDescription className="text-gray-300">
                Ingresa la contraseña para acceder
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white"
                >
                  Ingresar
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-viralDark">
      <header className="p-4 bg-viralDark border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-viralOrange font-bold text-xl hidden sm:block">ClickCRM Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{leads.length}</p>
                  <p className="text-white/60 text-sm">Total leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {leads.filter(l => l.estado === 'nuevo').length}
                  </p>
                  <p className="text-white/60 text-sm">Nuevos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {leads.filter(l => l.estado === 'demo_agendada').length}
                  </p>
                  <p className="text-white/60 text-sm">Demos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {leads.filter(l => l.estado === 'cerrado').length}
                  </p>
                  <p className="text-white/60 text-sm">Cerrados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/60" />
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white">Todos los estados</SelectItem>
                  {estados.map(e => (
                    <SelectItem key={e.value} value={e.value} className="text-white">{e.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={filterRubro} onValueChange={setFilterRubro}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Rubro" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white">Todos los rubros</SelectItem>
                {uniqueRubros.map(r => (
                  <SelectItem key={r} value={r} className="text-white">{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={fetchLeads} 
              disabled={loading}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button onClick={exportToCSV} className="bg-viralOrange hover:bg-viralOrange/90">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="grid gap-4">
          {filteredLeads.map((lead) => {
            const estadoInfo = getEstadoInfo(lead.estado);
            return (
              <Card key={lead.id} className="bg-gray-900 border-gray-800">
                <CardContent className="pt-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold text-lg">{lead.nombre}</h3>
                            <Badge className={`${estadoInfo.color} text-white text-xs`}>
                              {estadoInfo.label}
                            </Badge>
                          </div>
                          <p className="text-viralOrange font-medium">{lead.empresa}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-white/70">
                          <Building2 className="w-4 h-4 text-viralOrange" />
                          <span className="truncate">{lead.rubro}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Phone className="w-4 h-4 text-green-400" />
                          <a 
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-400 transition-colors"
                          >
                            {lead.whatsapp}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Mail className="w-4 h-4 text-blue-400" />
                          <a 
                            href={`mailto:${lead.correo}`}
                            className="hover:text-blue-400 transition-colors truncate"
                          >
                            {lead.correo}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <MapPin className="w-4 h-4 text-red-400" />
                          <span>{lead.ciudad}</span>
                        </div>
                      </div>

                      {lead.mensaje && (
                        <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-white/40 mt-0.5" />
                            <p className="text-white/60 text-sm">{lead.mensaje}</p>
                          </div>
                        </div>
                      )}

                      <p className="text-white/40 text-xs mt-3">
                        {new Date(lead.created_at).toLocaleDateString('es-CL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[180px]">
                      <Select 
                        value={lead.estado} 
                        onValueChange={(value) => updateLeadStatus(lead.id, value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {estados.map(e => (
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
                        variant="outline"
                        size="sm"
                        className="border-green-600 text-green-400 hover:bg-green-600/20"
                        onClick={() => window.open(`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`, '_blank')}
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
        </div>

        {filteredLeads.length === 0 && !loading && (
          <Card className="bg-gray-900 border-gray-800 text-center p-8">
            <CardContent>
              <p className="text-gray-400 text-lg">
                No hay leads para mostrar
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminLeads;
