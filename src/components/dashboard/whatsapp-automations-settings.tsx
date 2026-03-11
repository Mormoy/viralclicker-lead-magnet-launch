import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Zap, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
}

interface Automation {
  id: string;
  trigger_event: string;
  delay_hours: number;
  template_id: string;
  is_active: boolean;
  template_name?: string;
}

const TRIGGERS = [
  { value: "nuevo_lead", label: "Nuevo Lead" },
  { value: "cotizacion_enviada", label: "Cotización Enviada" },
  { value: "sin_respuesta", label: "Sin Respuesta" },
  { value: "cambio_etapa", label: "Cambio de Etapa" },
];

export function WhatsAppAutomationsSettings() {
  const { tenantId } = useAuth();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ trigger_event: "nuevo_lead", delay_hours: "0", template_id: "" });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!tenantId) return;
    const [autoRes, tmplRes] = await Promise.all([
      supabase.from("whatsapp_automations").select("*").eq("tenant_id", tenantId).order("created_at"),
      supabase.from("whatsapp_templates").select("id, name").eq("tenant_id", tenantId),
    ]);
    const tmpls = (tmplRes.data || []) as Template[];
    setTemplates(tmpls);
    const tmplMap: Record<string, string> = {};
    tmpls.forEach(t => { tmplMap[t.id] = t.name; });
    setAutomations(
      ((autoRes.data || []) as Automation[]).map(a => ({ ...a, template_name: tmplMap[a.template_id] || "—" }))
    );
    setLoading(false);
  }, [tenantId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async () => {
    if (!tenantId || !form.template_id) { toast.error("Selecciona una plantilla"); return; }
    setSaving(true);
    const { error } = await supabase.from("whatsapp_automations").insert({
      tenant_id: tenantId,
      trigger_event: form.trigger_event,
      delay_hours: parseInt(form.delay_hours) || 0,
      template_id: form.template_id,
      is_active: true,
    });
    setSaving(false);
    if (error) toast.error("Error al crear");
    else { toast.success("Automatización creada"); setShowForm(false); fetchData(); }
  };

  const handleToggle = async (id: string, active: boolean) => {
    await supabase.from("whatsapp_automations").update({ is_active: active }).eq("id", id);
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, is_active: active } : a));
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("whatsapp_automations").delete().eq("id", id);
    if (error) toast.error("Error al eliminar");
    else { toast.success("Eliminada"); fetchData(); }
  };

  const triggerLabel = (val: string) => TRIGGERS.find(t => t.value === val)?.label || val;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Automatizaciones
          </CardTitle>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Nueva</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Nueva Automatización</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Disparador</Label>
                  <Select value={form.trigger_event} onValueChange={v => setForm(f => ({ ...f, trigger_event: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TRIGGERS.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Delay (horas)</Label>
                  <Input type="number" min="0" value={form.delay_hours} onChange={e => setForm(f => ({ ...f, delay_hours: e.target.value }))} />
                </div>
                <div>
                  <Label>Plantilla de WhatsApp</Label>
                  <Select value={form.template_id} onValueChange={v => setForm(f => ({ ...f, template_id: v }))}>
                    <SelectTrigger><SelectValue placeholder="Selecciona plantilla" /></SelectTrigger>
                    <SelectContent>
                      {templates.length === 0 ? (
                        <SelectItem value="none" disabled>Crea una plantilla primero</SelectItem>
                      ) : (
                        templates.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreate} disabled={saving} className="w-full">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                  Crear Automatización
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : automations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Sin automatizaciones. Crea plantillas primero, luego configura automatizaciones.</p>
        ) : (
          <div className="space-y-3">
            {automations.map(a => (
              <div key={a.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{triggerLabel(a.trigger_event)}</span>
                    {a.delay_hours > 0 && <span className="text-xs text-muted-foreground">+{a.delay_hours}h</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">Plantilla: {a.template_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={a.is_active} onCheckedChange={v => handleToggle(a.id, v)} />
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(a.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
