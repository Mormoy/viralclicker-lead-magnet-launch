import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { Plus, Search, AlertTriangle, Edit, Trash2, Package, Clock, DollarSign, Loader2, Factory } from "lucide-react";
import { WORK_ORDER_STATUSES } from "@/config/automation-templates";

interface WorkOrder {
  id: string;
  tenant_id: string;
  deal_id: string | null;
  quote_id: string | null;
  order_number: string;
  status: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  estimated_days: number;
  start_date: string | null;
  estimated_delivery_date: string | null;
  actual_delivery_date: string | null;
  supplier_cost: number;
  production_notes: string | null;
  internal_notes: string | null;
  priority: string;
  initial_payment_confirmed: boolean;
  initial_payment_amount: number;
  final_payment_confirmed: boolean;
  final_payment_amount: number;
  created_at: string;
  updated_at: string;
}

export default function OperationsPage() {
  const { tenantId } = useAuth();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editingOrder, setEditingOrder] = useState<WorkOrder | null>(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["work-orders", tenantId],
    queryFn: async () => {
      if (!tenantId) return [];
      const { data, error } = await supabase
        .from("work_orders" as any)
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as WorkOrder[];
    },
    enabled: !!tenantId,
  });

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!(o.customer_name || '').toLowerCase().includes(q) && !o.order_number.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const active = orders.filter(o => !['closed', 'cancelled', 'delivered'].includes(o.status));
    return {
      total: active.length,
      overdue: active.filter(o => {
        if (!o.start_date) return false;
        return differenceInDays(new Date(), new Date(o.start_date)) > o.estimated_days;
      }).length,
      pendingPayment: active.filter(o => !o.initial_payment_confirmed && o.status === 'pending').length,
    };
  }, [orders]);

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("work_orders" as any).update({
        status,
        updated_at: new Date().toISOString(),
        ...(status === 'delivered' ? { actual_delivery_date: new Date().toISOString() } : {}),
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      toast.success("Estado actualizado");
    },
  });

  const deleteOrder = async (id: string) => {
    if (!confirm("¿Eliminar esta orden?")) return;
    await supabase.from("work_orders" as any).delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["work-orders"] });
    toast.success("Orden eliminada");
  };

  const getStatusBadge = (status: string) => {
    const cfg = WORK_ORDER_STATUSES.find(s => s.key === status);
    return cfg ? (
      <Badge variant="outline" className={`text-[10px] ${cfg.color} text-white`}>{cfg.icon} {cfg.label}</Badge>
    ) : <Badge variant="outline">{status}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Factory className="h-6 w-6 text-primary" />Operaciones
          </h2>
          <p className="text-sm text-muted-foreground">Órdenes de trabajo y seguimiento de producción</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />Nueva OT
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10"><Package className="h-4 w-4 text-primary" /></div>
          <div><p className="text-[10px] text-muted-foreground">OTs Activas</p><p className="text-xl font-bold">{stats.total}</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10"><AlertTriangle className="h-4 w-4 text-red-500" /></div>
          <div><p className="text-[10px] text-muted-foreground">Atrasadas</p><p className="text-xl font-bold">{stats.overdue}</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10"><DollarSign className="h-4 w-4 text-amber-600" /></div>
          <div><p className="text-[10px] text-muted-foreground">Sin Pago</p><p className="text-xl font-bold">{stats.pendingPayment}</p></div>
        </CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Buscar OT o cliente..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8 h-9 text-xs" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {WORK_ORDER_STATUSES.map(s => (<SelectItem key={s.key} value={s.key}>{s.icon} {s.label}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">OT</TableHead>
              <TableHead className="text-xs">Cliente</TableHead>
              <TableHead className="text-xs">Estado</TableHead>
              <TableHead className="text-xs">Días Est.</TableHead>
              <TableHead className="text-xs">Costo</TableHead>
              <TableHead className="text-xs">Pago Inicial</TableHead>
              <TableHead className="text-xs text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></TableCell></TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Sin órdenes de trabajo</TableCell></TableRow>
            ) : filteredOrders.map(o => (
              <TableRow key={o.id}>
                <TableCell className="text-xs font-mono">{o.order_number.slice(0, 12)}</TableCell>
                <TableCell className="text-xs">{o.customer_name || '—'}</TableCell>
                <TableCell>{getStatusBadge(o.status)}</TableCell>
                <TableCell className="text-xs">{o.estimated_days}d</TableCell>
                <TableCell className="text-xs">${(o.supplier_cost || 0).toLocaleString()}</TableCell>
                <TableCell className="text-xs">{o.initial_payment_confirmed ? '✅' : '⏳'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Select value={o.status} onValueChange={status => updateStatus.mutate({ id: o.id, status })}>
                      <SelectTrigger className="h-7 w-[120px] text-[10px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {WORK_ORDER_STATUSES.map(s => (<SelectItem key={s.key} value={s.key}>{s.icon} {s.label}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-red-500" onClick={() => deleteOrder(o.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Create Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nueva Orden de Trabajo</DialogTitle></DialogHeader>
          <CreateWorkOrderForm tenantId={tenantId!} onCreated={() => {
            setShowCreate(false);
            queryClient.invalidateQueries({ queryKey: ["work-orders"] });
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CreateWorkOrderForm({ tenantId, onCreated }: { tenantId: string; onCreated: () => void }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    customer_name: "", customer_email: "", customer_phone: "",
    estimated_days: "7", supplier_cost: "0", production_notes: "", priority: "media",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("work_orders" as any).insert({
      tenant_id: tenantId,
      customer_name: form.customer_name || null,
      customer_email: form.customer_email || null,
      customer_phone: form.customer_phone || null,
      estimated_days: parseInt(form.estimated_days) || 7,
      supplier_cost: parseFloat(form.supplier_cost) || 0,
      production_notes: form.production_notes || null,
      priority: form.priority,
      start_date: new Date().toISOString(),
    });
    setSaving(false);
    if (error) toast.error("Error al crear OT");
    else { toast.success("Orden creada"); onCreated(); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2"><Label>Cliente</Label><Input value={form.customer_name} onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))} /></div>
        <div><Label>Email</Label><Input value={form.customer_email} onChange={e => setForm(f => ({ ...f, customer_email: e.target.value }))} /></div>
        <div><Label>Teléfono</Label><Input value={form.customer_phone} onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))} /></div>
        <div><Label>Días estimados</Label><Input type="number" value={form.estimated_days} onChange={e => setForm(f => ({ ...f, estimated_days: e.target.value }))} /></div>
        <div><Label>Costo proveedor</Label><Input type="number" value={form.supplier_cost} onChange={e => setForm(f => ({ ...f, supplier_cost: e.target.value }))} /></div>
      </div>
      <div><Label>Notas de producción</Label><Textarea value={form.production_notes} onChange={e => setForm(f => ({ ...f, production_notes: e.target.value }))} rows={2} /></div>
      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}Crear OT
      </Button>
    </form>
  );
}
