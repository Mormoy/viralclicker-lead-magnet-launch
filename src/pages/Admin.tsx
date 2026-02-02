import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LogOut, 
  Download, 
  Filter, 
  RefreshCw,
  Users,
  Calendar,
  Building2,
  Phone,
  Mail,
  Settings,
  CalendarCheck,
  FileText,
  CreditCard,
  Link as LinkIcon,
  Kanban,
  ShoppingCart
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';
import { InstallPWAButton } from '@/components/admin/install-pwa-button';
import { ClientKanbanBoard } from '@/components/admin/client-kanban-board';
import { AbandonedCartsPanel } from '@/components/admin/abandoned-carts-panel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Client {
  id: string;
  nombre: string;
  empresa: string;
  whatsapp: string;
  correo: string;
  ciudad: string | null;
  plan: string;
  monto: number;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  estado: string;
  contrato_aceptado: boolean;
  contrato_timestamp: string | null;
  calendly_event_url: string | null;
  calendly_event_date: string | null;
  notas: string | null;
  created_at: string;
  updated_at: string;
}

interface IntegrationSettings {
  id: string;
  webhook_n8n_url: string | null;
  calendly_url: string;
  contract_url: string | null;
}

const estados = [
  { value: 'pagado', label: 'Pagó', color: 'bg-blue-500' },
  { value: 'contrato_enviado', label: 'Contrato enviado', color: 'bg-yellow-500' },
  { value: 'contrato_firmado', label: 'Contrato firmado', color: 'bg-purple-500' },
  { value: 'onboarding_pendiente', label: 'Onboarding pendiente', color: 'bg-orange-500' },
  { value: 'onboarding_agendado', label: 'Onboarding agendado', color: 'bg-cyan-500' },
  { value: 'onboarded', label: 'Onboarded', color: 'bg-green-500' },
];

const planes = [
  { value: 'starter', label: 'Starter', color: 'bg-gray-500' },
  { value: 'pro', label: 'Pro', color: 'bg-viralOrange' },
  { value: 'elite', label: 'Elite', color: 'bg-purple-600' },
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [settings, setSettings] = useState<IntegrationSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterEstado, setFilterEstado] = useState<string>('all');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('pipeline');
  const { toast } = useToast();

  const ADMIN_PASSWORD = 'viralclicker102030+*+';

  useEffect(() => {
    if (isAuthenticated) {
      fetchClients();
      fetchSettings();
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

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients((data as Client[]) || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los clientes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('integrations_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setSettings(data as IntegrationSettings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateClientStatus = async (id: string, newEstado: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ estado: newEstado })
        .eq('id', id);

      if (error) throw error;

      setClients(prev => 
        prev.map(c => c.id === id ? { ...c, estado: newEstado } : c)
      );

      toast({
        title: "Estado actualizado",
        description: `Cliente marcado como "${estados.find(e => e.value === newEstado)?.label}"`,
      });
    } catch (error) {
      console.error('Error updating client:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive",
      });
    }
  };

  const updateClientCalendlyUrl = async (id: string, url: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ calendly_event_url: url })
        .eq('id', id);

      if (error) throw error;

      setClients(prev => 
        prev.map(c => c.id === id ? { ...c, calendly_event_url: url } : c)
      );

      toast({
        title: "Link guardado",
        description: "Link de Calendly actualizado",
      });
    } catch (error) {
      console.error('Error updating calendly url:', error);
    }
  };

  const updateSettings = async (field: keyof IntegrationSettings, value: string) => {
    try {
      if (settings?.id) {
        const { error } = await supabase
          .from('integrations_settings')
          .update({ [field]: value })
          .eq('id', settings.id);

        if (error) throw error;
        setSettings(prev => prev ? { ...prev, [field]: value } : null);
      } else {
        const { data, error } = await supabase
          .from('integrations_settings')
          .insert({ [field]: value })
          .select()
          .single();

        if (error) throw error;
        setSettings(data as IntegrationSettings);
      }

      toast({
        title: "Configuración guardada",
        description: "Los cambios han sido guardados",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    const headers = ['Fecha', 'Nombre', 'Empresa', 'Plan', 'Monto', 'WhatsApp', 'Correo', 'Ciudad', 'Estado', 'Contrato', 'Calendly'];
    const rows = filteredClients.map(client => [
      new Date(client.created_at).toLocaleDateString('es-CL'),
      client.nombre,
      client.empresa,
      client.plan.toUpperCase(),
      `$${client.monto}`,
      client.whatsapp,
      client.correo,
      client.ciudad || '',
      estados.find(e => e.value === client.estado)?.label || client.estado,
      client.contrato_aceptado ? 'Sí' : 'No',
      client.calendly_event_url || ''
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clientes_viralclicker_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exportado",
      description: `${filteredClients.length} clientes exportados a CSV`,
    });
  };

  const filteredClients = clients.filter(client => {
    const matchEstado = filterEstado === 'all' || client.estado === filterEstado;
    const matchPlan = filterPlan === 'all' || client.plan === filterPlan;
    return matchEstado && matchPlan;
  });

  // Get onboardings this week
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  
  const onboardingsThisWeek = clients.filter(c => {
    if (c.estado === 'onboarding_agendado' && c.calendly_event_date) {
      const eventDate = new Date(c.calendly_event_date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }
    return false;
  });

  const getEstadoInfo = (estado: string) => {
    return estados.find(e => e.value === estado) || { label: estado, color: 'bg-gray-500' };
  };

  const getPlanInfo = (plan: string) => {
    return planes.find(p => p.value === plan) || { label: plan, color: 'bg-gray-500' };
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-viralDark flex flex-col">
        <header className="p-4 bg-viralDark border-b border-gray-800">
          <div className="container mx-auto flex justify-center items-center">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-viralOrange font-bold text-xl">Viral Clicker Admin</span>
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
            <span className="text-viralOrange font-bold text-xl hidden sm:block">Viral Clicker Admin</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <InstallPWAButton />
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800 border-gray-700 mb-6 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-viralOrange">
              <Kanban className="w-4 h-4 mr-2" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-viralOrange">
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="abandoned" className="data-[state=active]:bg-viralOrange">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="onboardings" className="data-[state=active]:bg-viralOrange">
              <CalendarCheck className="w-4 h-4 mr-2" />
              Onboardings
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-viralOrange">
              <Settings className="w-4 h-4 mr-2" />
              Integraciones
            </TabsTrigger>
          </TabsList>

          {/* Pipeline Tab - Kanban View */}
          <TabsContent value="pipeline">
            <Card className="bg-gray-900 border-gray-800 mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Kanban className="w-5 h-5 text-viralOrange" />
                  Pipeline de Clientes
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Arrastra las tarjetas para cambiar el estado de cada cliente
                </CardDescription>
              </CardHeader>
            </Card>
            <ClientKanbanBoard 
              clients={clients} 
              onUpdateStatus={updateClientStatus} 
            />
          </TabsContent>

          {/* Abandoned Carts / Leads Tab */}
          <TabsContent value="abandoned">
            <Card className="bg-gray-900 border-gray-800 mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-viralOrange" />
                  Leads / Carritos Abandonados
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Seguimiento de leads que aún no han comprado
                </CardDescription>
              </CardHeader>
            </Card>
            <AbandonedCartsPanel />
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{clients.length}</p>
                      <p className="text-white/60 text-sm">Total clientes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        ${clients.reduce((acc, c) => acc + Number(c.monto), 0).toLocaleString()}
                      </p>
                      <p className="text-white/60 text-sm">MRR</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-cyan-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {clients.filter(c => c.estado === 'onboarding_agendado').length}
                      </p>
                      <p className="text-white/60 text-sm">Onboardings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {clients.filter(c => c.contrato_aceptado).length}
                      </p>
                      <p className="text-white/60 text-sm">Contratos</p>
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
                    <SelectTrigger className="w-44 bg-gray-800 border-gray-700 text-white">
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
                <Select value={filterPlan} onValueChange={setFilterPlan}>
                  <SelectTrigger className="w-36 bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white">Todos los planes</SelectItem>
                    {planes.map(p => (
                      <SelectItem key={p.value} value={p.value} className="text-white">{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={fetchClients} 
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

            {/* Clients Table */}
            <div className="grid gap-4">
              {filteredClients.map((client) => {
                const estadoInfo = getEstadoInfo(client.estado);
                const planInfo = getPlanInfo(client.plan);
                return (
                  <Card key={client.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="pt-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-white font-semibold text-lg">{client.nombre}</h3>
                                <Badge className={`${planInfo.color} text-white text-xs`}>
                                  {planInfo.label}
                                </Badge>
                                <Badge className={`${estadoInfo.color} text-white text-xs`}>
                                  {estadoInfo.label}
                                </Badge>
                                {client.contrato_aceptado && (
                                  <Badge className="bg-green-600 text-white text-xs">
                                    Contrato ✓
                                  </Badge>
                                )}
                              </div>
                              <p className="text-viralOrange font-medium">{client.empresa}</p>
                              <p className="text-white/60 text-sm">${client.monto}/mes</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-white/70">
                              <Phone className="w-4 h-4 text-green-400" />
                              <a 
                                href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-400 transition-colors"
                              >
                                {client.whatsapp}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-white/70">
                              <Mail className="w-4 h-4 text-blue-400" />
                              <a 
                                href={`mailto:${client.correo}`}
                                className="hover:text-blue-400 transition-colors truncate"
                              >
                                {client.correo}
                              </a>
                            </div>
                            {client.ciudad && (
                              <div className="flex items-center gap-2 text-white/70">
                                <Building2 className="w-4 h-4 text-purple-400" />
                                <span>{client.ciudad}</span>
                              </div>
                            )}
                          </div>

                          {/* Calendly URL input */}
                          <div className="mt-3 flex items-center gap-2">
                            <LinkIcon className="w-4 h-4 text-white/40" />
                            <Input
                              placeholder="Link evento Calendly"
                              value={client.calendly_event_url || ''}
                              onChange={(e) => updateClientCalendlyUrl(client.id, e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white text-sm h-8"
                            />
                          </div>

                          <p className="text-white/40 text-xs mt-3">
                            {new Date(client.created_at).toLocaleDateString('es-CL', {
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
                            value={client.estado} 
                            onValueChange={(value) => updateClientStatus(client.id, value)}
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
                            onClick={() => window.open(`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`, '_blank')}
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

            {filteredClients.length === 0 && !loading && (
              <Card className="bg-gray-900 border-gray-800 text-center p-8">
                <CardContent>
                  <p className="text-gray-400 text-lg">
                    No hay clientes para mostrar
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Onboardings Tab */}
          <TabsContent value="onboardings">
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-viralOrange" />
                  Onboardings de la semana
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Clientes con onboarding agendado para esta semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                {onboardingsThisWeek.length > 0 ? (
                  <div className="space-y-4">
                    {onboardingsThisWeek.map(client => (
                      <div key={client.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{client.nombre}</p>
                          <p className="text-viralOrange text-sm">{client.empresa}</p>
                          {client.calendly_event_date && (
                            <p className="text-white/60 text-sm">
                              {new Date(client.calendly_event_date).toLocaleDateString('es-CL', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {client.calendly_event_url && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-viralOrange text-viralOrange hover:bg-viralOrange/20"
                              onClick={() => window.open(client.calendly_event_url!, '_blank')}
                            >
                              Ver evento
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="bg-viralOrange hover:bg-viralOrange/90"
                            onClick={() => updateClientStatus(client.id, 'onboarded')}
                          >
                            Marcar completado
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    No hay onboardings agendados para esta semana
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Pending onboardings */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Onboardings pendientes</CardTitle>
                <CardDescription className="text-gray-400">
                  Clientes que pagaron pero aún no agendaron
                </CardDescription>
              </CardHeader>
              <CardContent>
                {clients.filter(c => c.estado === 'onboarding_pendiente' || c.estado === 'contrato_firmado').length > 0 ? (
                  <div className="space-y-3">
                    {clients.filter(c => c.estado === 'onboarding_pendiente' || c.estado === 'contrato_firmado').map(client => (
                      <div key={client.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{client.nombre} - {client.empresa}</p>
                          <p className="text-white/60 text-sm">{client.correo}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-600 text-green-400 hover:bg-green-600/20"
                          onClick={() => window.open(`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(client.nombre)},%20te%20escribimos%20de%20Viral%20Clicker.%20Queremos%20confirmar%20tu%20onboarding.`, '_blank')}
                        >
                          Recordar
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    Todos los clientes tienen onboarding agendado
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="grid gap-6 max-w-2xl">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-viralOrange" />
                    Webhook n8n
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    URL del webhook para enviar eventos de checkout a n8n
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="https://tu-instancia-n8n.com/webhook/xxx"
                    value={settings?.webhook_n8n_url || ''}
                    onChange={(e) => updateSettings('webhook_n8n_url', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-white/50 text-xs">
                    Al completar un checkout, se enviará un POST con: email, nombre, empresa, whatsapp, ciudad, plan, monto, fecha
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-viralOrange" />
                    URL de Calendly
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Link de tu calendario para agendar onboardings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="https://calendly.com/tu-empresa/onboarding"
                    value={settings?.calendly_url || ''}
                    onChange={(e) => updateSettings('calendly_url', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-viralOrange" />
                    URL del Contrato
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Link externo para firma de contrato (ej: DocuSign, PandaDoc)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="https://docusign.com/tu-contrato"
                    value={settings?.contract_url || ''}
                    onChange={(e) => updateSettings('contract_url', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gray-800/30 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white/80 text-sm">💡 Guía para Stripe Webhooks</CardTitle>
                </CardHeader>
                <CardContent className="text-white/60 text-sm space-y-2">
                  <p>Cuando configures Stripe, crea un webhook en el dashboard de Stripe que apunte a tu n8n:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Ve a Stripe Dashboard → Developers → Webhooks</li>
                    <li>Añade endpoint: pega tu URL de n8n</li>
                    <li>Selecciona eventos: checkout.session.completed, invoice.paid</li>
                    <li>En n8n, recibe y procesa los datos</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;