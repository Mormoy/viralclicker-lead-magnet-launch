import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LogOut, 
  Plus,
  RefreshCw,
  LayoutGrid,
  BarChart3,
  MessageSquare,
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';
import { KanbanBoard } from '@/components/crm/kanban-board';
import { CotizacionModal } from '@/components/crm/cotizacion-modal';
import { DashboardMetrics } from '@/components/crm/dashboard-metrics';
import { PlantillasWhatsApp } from '@/components/crm/plantillas-whatsapp';
import { AlertasPanel } from '@/components/crm/alertas-panel';
import type { Cotizacion, PlantillaWhatsApp } from '@/components/crm/types';

const AdminCotizaciones = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [plantillas, setPlantillas] = useState<PlantillaWhatsApp[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null);
  const { toast } = useToast();

  const ADMIN_PASSWORD = 'viralclicker102030+*+';

  useEffect(() => {
    if (isAuthenticated) {
      fetchCotizaciones();
      fetchPlantillas();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      toast({
        title: "Acceso autorizado",
        description: "Bienvenido al CRM de Cotizaciones",
      });
    } else {
      toast({
        title: "Acceso denegado",
        description: "Contraseña incorrecta",
        variant: "destructive",
      });
    }
  };

  const fetchCotizaciones = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cotizaciones')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCotizaciones((data as unknown as Cotizacion[]) || []);
    } catch (error) {
      console.error('Error fetching cotizaciones:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las cotizaciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPlantillas = async () => {
    try {
      const { data, error } = await supabase
        .from('plantillas_whatsapp')
        .select('*')
        .eq('activa', true)
        .order('estado_aplicable');

      if (error) throw error;
      setPlantillas((data as unknown as PlantillaWhatsApp[]) || []);
    } catch (error) {
      console.error('Error fetching plantillas:', error);
    }
  };

  const updateCotizacionEstado = async (id: string, nuevoEstado: string, datosExtra?: Partial<Cotizacion>) => {
    try {
      const cotizacionActual = cotizaciones.find(c => c.id === id);
      
      const updateData: Record<string, unknown> = {
        estado: nuevoEstado,
        estado_anterior: cotizacionActual?.estado,
        fecha_cambio_estado: new Date().toISOString(),
        ultima_interaccion: new Date().toISOString(),
        ...datosExtra
      };

      const { error } = await supabase
        .from('cotizaciones')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // Log activity
      await supabase.from('cotizaciones_actividad').insert([{
        cotizacion_id: id,
        tipo: 'cambio_estado',
        descripcion: `Estado cambiado a ${nuevoEstado}`,
        estado_anterior: (cotizacionActual?.estado || null) as "anticipo_pagado" | "cerrado_ganado" | "contactado" | "cotizacion_enviada" | "en_decision" | "en_fabricacion" | "instalado_entregado" | "listo_instalar" | "nuevo" | "perdido" | "propuesta_final_enviada" | "visita_agendada" | "visita_realizada" | null,
        estado_nuevo: nuevoEstado as "anticipo_pagado" | "cerrado_ganado" | "contactado" | "cotizacion_enviada" | "en_decision" | "en_fabricacion" | "instalado_entregado" | "listo_instalar" | "nuevo" | "perdido" | "propuesta_final_enviada" | "visita_agendada" | "visita_realizada"
      }]);

      setCotizaciones(prev => 
        prev.map(c => c.id === id ? { ...c, ...updateData, estado: nuevoEstado as Cotizacion['estado'] } : c)
      );

      toast({
        title: "Estado actualizado",
        description: `Cotización movida a "${nuevoEstado.replace(/_/g, ' ')}"`,
      });
    } catch (error) {
      console.error('Error updating cotizacion:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive",
      });
    }
  };

  const createCotizacion = async (data: Partial<Cotizacion>) => {
    try {
      const insertData = {
        nombre: data.nombre || '',
        whatsapp: data.whatsapp || '',
        empresa: data.empresa || null,
        correo: data.correo || null,
        ciudad: data.ciudad || null,
        direccion: data.direccion || null,
        estado: data.estado || 'nuevo',
        fuente: data.fuente || 'manual',
        prioridad: data.prioridad || 'media',
        valor_estimado: data.valor_estimado || 0,
        valor_final: data.valor_final || 0,
        tags: data.tags || [],
        campana: data.campana || null,
        adset: data.adset || null,
        notas_internas: data.notas_internas || null,
        accion_recomendada: data.accion_recomendada || null,
        proximo_seguimiento: data.proximo_seguimiento || null,
        fecha_visita: data.fecha_visita || null,
        direccion_visita: data.direccion_visita || null,
      };

      const { data: newCotizacion, error } = await supabase
        .from('cotizaciones')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;

      setCotizaciones(prev => [newCotizacion as unknown as Cotizacion, ...prev]);
      setShowNewModal(false);

      toast({
        title: "Cotización creada",
        description: "Nueva cotización agregada al pipeline",
      });
    } catch (error) {
      console.error('Error creating cotizacion:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la cotización",
        variant: "destructive",
      });
    }
  };

  const updateCotizacion = async (id: string, data: Partial<Cotizacion>) => {
    try {
      const { error } = await supabase
        .from('cotizaciones')
        .update({ ...data, ultima_interaccion: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setCotizaciones(prev => 
        prev.map(c => c.id === id ? { ...c, ...data } : c)
      );

      setSelectedCotizacion(null);

      toast({
        title: "Cotización actualizada",
        description: "Los cambios han sido guardados",
      });
    } catch (error) {
      console.error('Error updating cotizacion:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la cotización",
        variant: "destructive",
      });
    }
  };

  const filteredCotizaciones = useMemo(() => {
    if (!searchTerm) return cotizaciones;
    const term = searchTerm.toLowerCase();
    return cotizaciones.filter(c => 
      c.nombre.toLowerCase().includes(term) ||
      c.empresa?.toLowerCase().includes(term) ||
      c.whatsapp.includes(term) ||
      c.correo?.toLowerCase().includes(term)
    );
  }, [cotizaciones, searchTerm]);

  // Calculate alerts
  const alertas = useMemo(() => {
    const now = new Date();
    const thirtyMinAgo = new Date(now.getTime() - 30 * 60 * 1000);
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return {
      nuevosUrgentes: cotizaciones.filter(c => 
        c.estado === 'nuevo' && 
        new Date(c.created_at) < thirtyMinAgo
      ),
      nuevosCriticos: cotizaciones.filter(c => 
        c.estado === 'nuevo' && 
        new Date(c.created_at) < twentyFourHoursAgo
      ),
      sinSeguimiento: cotizaciones.filter(c => 
        ['cotizacion_enviada', 'en_decision'].includes(c.estado) && 
        !c.proximo_seguimiento
      ),
      seguimientosVencidos: cotizaciones.filter(c => 
        c.proximo_seguimiento && 
        new Date(c.proximo_seguimiento) < now
      ),
      visitasHoy: cotizaciones.filter(c => {
        if (c.estado !== 'visita_agendada' || !c.fecha_visita) return false;
        const visitDate = new Date(c.fecha_visita);
        return visitDate.toDateString() === now.toDateString();
      })
    };
  }, [cotizaciones]);

  const totalAlertas = alertas.nuevosUrgentes.length + 
    alertas.sinSeguimiento.length + 
    alertas.seguimientosVencidos.length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-viralDark flex flex-col">
        <header className="p-4 bg-viralDark border-b border-gray-800">
          <div className="container mx-auto flex justify-center items-center">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-viralOrange font-bold text-xl">CRM Cotizaciones</span>
            </div>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                CRM de Cotizaciones
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
            <span className="text-viralOrange font-bold text-xl hidden sm:block">CRM Cotizaciones</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              onClick={() => setShowNewModal(true)}
              className="bg-viralOrange hover:bg-viralOrange/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva
            </Button>
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
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, empresa, teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-72 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={fetchCotizaciones} 
              disabled={loading}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800 border-gray-700 mb-6">
            <TabsTrigger value="kanban" className="data-[state=active]:bg-viralOrange">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="alertas" className="data-[state=active]:bg-viralOrange relative">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alertas
              {totalAlertas > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalAlertas}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-viralOrange">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="plantillas" className="data-[state=active]:bg-viralOrange">
              <MessageSquare className="w-4 h-4 mr-2" />
              Plantillas WA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="mt-0">
            <KanbanBoard 
              cotizaciones={filteredCotizaciones}
              onUpdateEstado={updateCotizacionEstado}
              onSelectCotizacion={setSelectedCotizacion}
              plantillas={plantillas}
            />
          </TabsContent>

          <TabsContent value="alertas" className="mt-0">
            <AlertasPanel 
              alertas={alertas}
              onSelectCotizacion={setSelectedCotizacion}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="mt-0">
            <DashboardMetrics cotizaciones={cotizaciones} />
          </TabsContent>

          <TabsContent value="plantillas" className="mt-0">
            <PlantillasWhatsApp 
              plantillas={plantillas}
              onRefresh={fetchPlantillas}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* New Cotizacion Modal */}
      {showNewModal && (
        <CotizacionModal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          onSave={createCotizacion}
          plantillas={plantillas}
        />
      )}

      {/* Edit Cotizacion Modal */}
      {selectedCotizacion && (
        <CotizacionModal
          isOpen={!!selectedCotizacion}
          onClose={() => setSelectedCotizacion(null)}
          onSave={(data) => updateCotizacion(selectedCotizacion.id, data)}
          cotizacion={selectedCotizacion}
          plantillas={plantillas}
        />
      )}
    </div>
  );
};

export default AdminCotizaciones;
