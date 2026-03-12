import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Info, Activity, Shield, DollarSign, CheckCircle2, AlertTriangle, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { differenceInDays } from "date-fns";
import { WORK_ORDER_STATUSES } from "@/config/automation-templates";

interface WorkOrder {
  id: string; tenant_id: string; deal_id: string | null; quote_id: string | null;
  order_number: string; status: string; customer_name: string | null;
  customer_email: string | null; customer_phone: string | null;
  estimated_days: number; start_date: string | null;
  estimated_delivery_date: string | null; actual_delivery_date: string | null;
  supplier_cost: number; production_notes: string | null; internal_notes: string | null;
  priority: string; initial_payment_confirmed: boolean; initial_payment_amount: number;
  final_payment_confirmed: boolean; final_payment_amount: number;
  created_at: string; updated_at: string | null;
}

interface Props {
  order: WorkOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export default function OTDetailSheet({ order, open, onOpenChange, onUpdate }: Props) {
  if (!order) return null;

  const statusIdx = WORK_ORDER_STATUSES.findIndex(s => s.key === order.status);
  const startDate = new Date(order.start_date || order.created_at);
  const daysElapsed = differenceInDays(new Date(), startDate);
  const isOverdue = daysElapsed > order.estimated_days;
  const statusCfg = WORK_ORDER_STATUSES.find(s => s.key === order.status);

  const saveField = async (updates: Record<string, unknown>) => {
    const { error } = await supabase.from("work_orders" as any).update(updates).eq("id", order.id);
    if (error) { toast.error("Error al guardar"); return; }
    onUpdate();
    toast.success("Guardado");
  };

  const handleChangeStatus = async (newStatus: string) => {
    await saveField({
      status: newStatus,
      updated_at: new Date().toISOString(),
      ...(newStatus === 'delivered' ? { actual_delivery_date: new Date().toISOString() } : {}),
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto p-0">
        <SheetHeader className="p-4 pb-2 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg">{order.order_number}</SheetTitle>
            <Badge className={`text-[10px] ${statusCfg?.color || ''} text-white`}>{statusCfg?.icon} {statusCfg?.label}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{order.customer_name || 'Sin cliente'}</p>
        </SheetHeader>

        <Tabs defaultValue="info" className="p-4">
          <TabsList className="w-full grid grid-cols-4 h-9">
            <TabsTrigger value="info" className="text-xs gap-1"><Info className="h-3 w-3" />Info</TabsTrigger>
            <TabsTrigger value="status" className="text-xs gap-1"><Activity className="h-3 w-3" />Estado</TabsTrigger>
            <TabsTrigger value="qc" className="text-xs gap-1"><Shield className="h-3 w-3" />QC</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs gap-1"><DollarSign className="h-3 w-3" />Pagos</TabsTrigger>
          </TabsList>

          {/* INFO TAB */}
          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs text-muted-foreground">N° OT</Label><p className="text-sm font-medium">{order.order_number}</p></div>
              <div><Label className="text-xs text-muted-foreground">Prioridad</Label><p className="text-sm capitalize">{order.priority}</p></div>
              <div><Label className="text-xs text-muted-foreground">Cliente</Label><p className="text-sm">{order.customer_name || 'N/A'}</p></div>
              <div><Label className="text-xs text-muted-foreground">Teléfono</Label>
                <div className="flex items-center gap-1">
                  <p className="text-sm">{order.customer_phone || 'N/A'}</p>
                  {order.customer_phone && <Phone className="h-3 w-3 text-green-500 cursor-pointer" onClick={() => window.open(`https://wa.me/${order.customer_phone!.replace(/\D/g, '')}`, '_blank')} />}
                </div>
              </div>
              <div><Label className="text-xs text-muted-foreground">Email</Label><p className="text-sm">{order.customer_email || 'N/A'}</p></div>
              <div><Label className="text-xs text-muted-foreground">Costo Proveedor</Label><p className="text-sm font-medium">${(order.supplier_cost || 0).toLocaleString()}</p></div>
            </div>

            {/* Time Progress */}
            <div className="space-y-2 p-3 rounded-lg border">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progreso del tiempo</span>
                <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                  {daysElapsed} de {order.estimated_days} días
                  ({isOverdue ? `+${daysElapsed - order.estimated_days}d retraso` : `${order.estimated_days - daysElapsed}d restantes`})
                </span>
              </div>
              <Progress
                value={Math.min((daysElapsed / (order.estimated_days || 1)) * 100, 100)}
                className={`h-2 ${isOverdue ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Notas de Producción</Label>
              <Textarea
                defaultValue={order.production_notes || ''}
                className="text-xs min-h-[60px]"
                onBlur={e => {
                  if (e.target.value !== (order.production_notes || '')) saveField({ production_notes: e.target.value });
                }}
              />
            </div>
          </TabsContent>

          {/* STATUS TAB with stepper */}
          <TabsContent value="status" className="space-y-4 mt-4">
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {WORK_ORDER_STATUSES.filter(s => s.key !== 'cancelled').map((step, idx) => {
                const isPassed = idx <= statusIdx;
                const isCurrent = idx === statusIdx;
                return (
                  <div key={step.key} className="flex items-center">
                    <div className="flex flex-col items-center min-w-[60px]">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        isPassed
                          ? isCurrent ? 'bg-primary text-primary-foreground' : 'bg-green-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {isPassed && !isCurrent ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                      </div>
                      <span className={`text-[8px] mt-0.5 text-center leading-tight max-w-[60px] ${isCurrent ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                        {step.label}
                      </span>
                    </div>
                    {idx < WORK_ORDER_STATUSES.length - 2 && (
                      <div className={`w-3 h-0.5 flex-shrink-0 ${idx < statusIdx ? 'bg-green-500' : 'bg-muted'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-lg border space-y-2">
              <Label className="text-xs font-medium">Cambiar Estado</Label>
              <div className="flex flex-wrap gap-1.5">
                {WORK_ORDER_STATUSES.filter(s => s.key !== order.status).map(s => (
                  <Button key={s.key} size="sm" variant="outline" className={`text-[10px] h-7 gap-1`}
                    onClick={() => handleChangeStatus(s.key)}>
                    {s.icon} {s.label}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* QC TAB */}
          <TabsContent value="qc" className="space-y-4 mt-4">
            {statusIdx < 2 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                <Shield className="h-8 w-8 mx-auto mb-2 opacity-30" />
                Disponible cuando la OT llegue a Control de Calidad
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">Checklist de calidad para esta orden:</p>
                {['Especificaciones correctas', 'Calidad del material', 'Acabados OK', 'Empaque correcto'].map(item => (
                  <div key={item} className="flex items-center gap-2 p-2 border rounded-md">
                    <input type="checkbox" className="rounded" />
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 text-xs" onClick={() => handleChangeStatus('ready')}>
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Aprobar QC
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs text-red-600" onClick={() => handleChangeStatus('in_progress')}>
                    <AlertTriangle className="h-3 w-3 mr-1" /> Devolver
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* PAYMENTS TAB */}
          <TabsContent value="payments" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="text-[10px] text-muted-foreground">Pago Inicial</p>
                <p className="text-lg font-bold">${(order.initial_payment_amount || 0).toLocaleString()}</p>
                <Badge className={`text-[10px] mt-1 ${order.initial_payment_confirmed ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                  {order.initial_payment_confirmed ? '✅ Confirmado' : '⏳ Pendiente'}
                </Badge>
                {!order.initial_payment_confirmed && (
                  <Button size="sm" variant="outline" className="w-full mt-2 text-[10px] h-7"
                    onClick={() => saveField({ initial_payment_confirmed: true, initial_payment_amount: order.supplier_cost * 0.5 })}>
                    Confirmar pago
                  </Button>
                )}
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-[10px] text-muted-foreground">Pago Final</p>
                <p className="text-lg font-bold">${(order.final_payment_amount || 0).toLocaleString()}</p>
                <Badge className={`text-[10px] mt-1 ${order.final_payment_confirmed ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                  {order.final_payment_confirmed ? '✅ Confirmado' : '⏳ Pendiente'}
                </Badge>
                {!order.final_payment_confirmed && (
                  <Button size="sm" variant="outline" className="w-full mt-2 text-[10px] h-7"
                    onClick={() => saveField({ final_payment_confirmed: true, final_payment_amount: order.supplier_cost * 0.5 })}>
                    Confirmar pago
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
