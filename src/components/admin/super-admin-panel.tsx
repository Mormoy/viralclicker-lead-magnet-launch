import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Building2,
  CreditCard,
  TrendingUp,
  Users,
  Clock,
  Ban,
  CheckCircle2,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Tenant {
  id: string;
  name: string;
  slug: string | null;
  owner_email: string;
  plan: string;
  setup_type: string;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

const planColors: Record<string, string> = {
  starter: 'bg-gray-500',
  pro: 'bg-orange-500',
  elite: 'bg-purple-600',
};

const planPrices: Record<string, number> = {
  starter: 99,
  pro: 249,
  elite: 449,
};

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  pending: 'bg-yellow-500',
  suspended: 'bg-red-500',
};

export const SuperAdminPanel = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setTenants((data as Tenant[]) || []);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTenantStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('tenants')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      setTenants(prev => prev.map(t => t.id === id ? { ...t, status } : t));
      toast({ title: 'Estado actualizado', description: `Empresa marcada como "${status}"` });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'No se pudo actualizar', variant: 'destructive' });
    }
  };

  const updateTenantPlan = async (id: string, plan: string) => {
    try {
      const { error } = await supabase
        .from('tenants')
        .update({ plan })
        .eq('id', id);
      if (error) throw error;
      setTenants(prev => prev.map(t => t.id === id ? { ...t, plan } : t));
      toast({ title: 'Plan actualizado', description: `Plan cambiado a "${plan}"` });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'No se pudo actualizar el plan', variant: 'destructive' });
    }
  };

  const filtered = useMemo(() => {
    if (!search) return tenants;
    const term = search.toLowerCase();
    return tenants.filter(t =>
      t.name.toLowerCase().includes(term) ||
      t.owner_email.toLowerCase().includes(term) ||
      t.slug?.toLowerCase().includes(term)
    );
  }, [tenants, search]);

  const activeTenants = tenants.filter(t => t.status === 'active');
  const totalMRR = activeTenants.reduce((sum, t) => sum + (planPrices[t.plan] || 0), 0);
  const recentSignups = tenants.filter(t => {
    const d = new Date(t.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo;
  });

  return (
    <div className="space-y-6">
      {/* Global Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{tenants.length}</p>
                <p className="text-white/60 text-sm">Empresas totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">${totalMRR.toLocaleString()}</p>
                <p className="text-white/60 text-sm">MRR Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold text-white">{activeTenants.length}</p>
                <p className="text-white/60 text-sm">Suscripciones activas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{recentSignups.length}</p>
                <p className="text-white/60 text-sm">Registros (7d)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['starter', 'pro', 'elite'].map(plan => {
          const count = activeTenants.filter(t => t.plan === plan).length;
          const revenue = count * (planPrices[plan] || 0);
          return (
            <Card key={plan} className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Badge className={`${planColors[plan]} text-white mb-2`}>
                      {plan.toUpperCase()}
                    </Badge>
                    <p className="text-white text-lg font-semibold">{count} empresas</p>
                    <p className="text-white/60 text-sm">${revenue}/mo</p>
                  </div>
                  <Users className="w-6 h-6 text-white/30" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tenant Management */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-white">Gestión de Empresas</CardTitle>
              <CardDescription className="text-gray-400">
                Administra todas las empresas registradas en la plataforma
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar empresa..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10 w-56 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button
                onClick={fetchTenants}
                disabled={loading}
                variant="outline"
                size="icon"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.length === 0 && (
              <p className="text-gray-400 text-center py-8">No hay empresas registradas</p>
            )}
            {filtered.map(tenant => (
              <div
                key={tenant.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium truncate">{tenant.name}</h3>
                    <Badge className={`${statusColors[tenant.status] || 'bg-gray-500'} text-white text-xs`}>
                      {tenant.status}
                    </Badge>
                    <Badge className={`${planColors[tenant.plan] || 'bg-gray-500'} text-white text-xs`}>
                      {tenant.plan.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm truncate">{tenant.owner_email}</p>
                  <p className="text-gray-500 text-xs">
                    Registrado: {new Date(tenant.created_at).toLocaleDateString('es-CL')}
                    {tenant.stripe_subscription_id && ' • Stripe ✓'}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Select
                    value={tenant.plan}
                    onValueChange={val => updateTenantPlan(tenant.id, val)}
                  >
                    <SelectTrigger className="w-28 bg-gray-800 border-gray-600 text-white text-xs h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="starter" className="text-white">Starter</SelectItem>
                      <SelectItem value="pro" className="text-white">Pro</SelectItem>
                      <SelectItem value="elite" className="text-white">Elite</SelectItem>
                    </SelectContent>
                  </Select>

                  {tenant.status === 'active' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-700 text-red-400 hover:bg-red-900/30 h-8 text-xs"
                      onClick={() => updateTenantStatus(tenant.id, 'suspended')}
                    >
                      <Ban className="w-3 h-3 mr-1" />
                      Suspender
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-700 text-green-400 hover:bg-green-900/30 h-8 text-xs"
                      onClick={() => updateTenantStatus(tenant.id, 'active')}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Activar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
