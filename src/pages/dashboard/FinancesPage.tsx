import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  TrendingUp, DollarSign, CreditCard, Package, BarChart3, Wallet, Plus, Loader2,
} from "lucide-react";

export default function FinancesPage() {
  const { tenantId } = useAuth();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("summary");
  const [showAddPayment, setShowAddPayment] = useState(false);

  // Fetch deals for summary
  const { data: deals = [] } = useQuery({
    queryKey: ["finance-deals", tenantId],
    queryFn: async () => {
      if (!tenantId) return [];
      const { data } = await supabase.from("pipeline_deals").select("*").eq("tenant_id", tenantId);
      return data || [];
    },
    enabled: !!tenantId,
  });

  // Fetch payments
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["customer-payments", tenantId],
    queryFn: async () => {
      if (!tenantId) return [];
      const { data, error } = await supabase
        .from("customer_payments" as any)
        .select("*")
        .eq("tenant_id", tenantId)
        .order("payment_date", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!tenantId,
  });

  // Fetch work orders
  const { data: workOrders = [] } = useQuery({
    queryKey: ["finance-work-orders", tenantId],
    queryFn: async () => {
      if (!tenantId) return [];
      const { data } = await supabase.from("work_orders" as any).select("*").eq("tenant_id", tenantId);
      return data || [];
    },
    enabled: !!tenantId,
  });

  // Summary calculations
  const totalRevenue = payments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
  const totalCosts = workOrders.reduce((sum: number, w: any) => sum + (w.supplier_cost || 0), 0);
  const profit = totalRevenue - totalCosts;
  const pipelineValue = deals.reduce((sum: number, d: any) => sum + (d.value || 0), 0);

  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);
  const monthRevenue = payments
    .filter((p: any) => new Date(p.payment_date) >= thisMonth)
    .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />Finanzas
        </h1>
        <p className="text-sm text-muted-foreground">Control de ingresos, costos y proyecciones</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex w-max md:grid md:w-full md:grid-cols-4 gap-1 h-auto p-1">
            <TabsTrigger value="summary" className="text-xs py-1.5 px-3 flex items-center gap-1 h-auto">
              <TrendingUp className="h-3 w-3" /><span>Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs py-1.5 px-3 flex items-center gap-1 h-auto">
              <CreditCard className="h-3 w-3" /><span>Cobros</span>
            </TabsTrigger>
            <TabsTrigger value="costs" className="text-xs py-1.5 px-3 flex items-center gap-1 h-auto">
              <Wallet className="h-3 w-3" /><span>Costos</span>
            </TabsTrigger>
            <TabsTrigger value="forecast" className="text-xs py-1.5 px-3 flex items-center gap-1 h-auto">
              <BarChart3 className="h-3 w-3" /><span>Forecast</span>
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="md:hidden" />
        </ScrollArea>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card><CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Ingresos Totales</p>
              <p className="text-2xl font-bold text-green-500">${totalRevenue.toLocaleString()}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Costos</p>
              <p className="text-2xl font-bold text-red-500">${totalCosts.toLocaleString()}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Ganancia</p>
              <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${profit.toLocaleString()}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Pipeline</p>
              <p className="text-2xl font-bold text-primary">${pipelineValue.toLocaleString()}</p>
            </CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-sm">Ingreso este mes</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">${monthRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">{payments.filter((p: any) => new Date(p.payment_date) >= thisMonth).length} pagos recibidos</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Pagos recibidos</h3>
            <Button size="sm" onClick={() => setShowAddPayment(true)}>
              <Plus className="h-3 w-3 mr-1" />Registrar pago
            </Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Fecha</TableHead>
                  <TableHead className="text-xs">Monto</TableHead>
                  <TableHead className="text-xs">Método</TableHead>
                  <TableHead className="text-xs">Recibo</TableHead>
                  <TableHead className="text-xs">Notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentsLoading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></TableCell></TableRow>
                ) : payments.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Sin pagos registrados</TableCell></TableRow>
                ) : payments.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell className="text-xs">{format(new Date(p.payment_date), 'dd/MM/yy')}</TableCell>
                    <TableCell className="text-xs font-medium text-green-500">${(p.amount || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{p.payment_method}</TableCell>
                    <TableCell className="text-xs">{p.receipt_number || '—'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.notes || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Costos de OTs</CardTitle></CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">OT</TableHead>
                  <TableHead className="text-xs">Cliente</TableHead>
                  <TableHead className="text-xs">Costo</TableHead>
                  <TableHead className="text-xs">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workOrders.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Sin OTs</TableCell></TableRow>
                ) : workOrders.map((w: any) => (
                  <TableRow key={w.id}>
                    <TableCell className="text-xs font-mono">{w.order_number?.slice(0, 12)}</TableCell>
                    <TableCell className="text-xs">{w.customer_name || '—'}</TableCell>
                    <TableCell className="text-xs text-red-500">${(w.supplier_cost || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{w.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold">Proyección de ingresos</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Pipeline activo: <span className="text-primary font-bold">${pipelineValue.toLocaleString()}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Basado en {deals.length} deals activos
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Payment Dialog */}
      <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
        <DialogContent>
          <DialogHeader><DialogTitle>Registrar Pago</DialogTitle></DialogHeader>
          <AddPaymentForm tenantId={tenantId!} onCreated={() => {
            setShowAddPayment(false);
            queryClient.invalidateQueries({ queryKey: ["customer-payments"] });
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddPaymentForm({ tenantId, onCreated }: { tenantId: string; onCreated: () => void }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    amount: "", payment_method: "transferencia", receipt_number: "", notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount) { toast.error("Monto requerido"); return; }
    setSaving(true);
    const { error } = await supabase.from("customer_payments" as any).insert({
      tenant_id: tenantId,
      amount: parseFloat(form.amount),
      payment_method: form.payment_method,
      receipt_number: form.receipt_number || null,
      notes: form.notes || null,
    });
    setSaving(false);
    if (error) toast.error("Error al registrar");
    else { toast.success("Pago registrado"); onCreated(); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Monto *</Label><Input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0" /></div>
        <div><Label>Método</Label>
          <Select value={form.payment_method} onValueChange={v => setForm(f => ({ ...f, payment_method: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="transferencia">Transferencia</SelectItem>
              <SelectItem value="efectivo">Efectivo</SelectItem>
              <SelectItem value="tarjeta">Tarjeta</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>N° Recibo</Label><Input value={form.receipt_number} onChange={e => setForm(f => ({ ...f, receipt_number: e.target.value }))} /></div>
      </div>
      <div><Label>Notas</Label><Input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} /></div>
      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}Registrar
      </Button>
    </form>
  );
}
