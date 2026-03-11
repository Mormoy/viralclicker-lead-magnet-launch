import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  tenant_id: string;
  name: string;
  message: string;
  variables: string[];
  is_active: boolean;
  created_at: string;
}

const AVAILABLE_VARIABLES = ["{{nombre}}", "{{monto}}", "{{link_cotizacion}}", "{{nombre_empresa}}"];

export function WhatsAppTemplatesSettings() {
  const { tenantId } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Template | null>(null);
  const [form, setForm] = useState({ name: "", message: "" });
  const [saving, setSaving] = useState(false);

  const fetchTemplates = useCallback(async () => {
    if (!tenantId) return;
    const { data } = await supabase
      .from("whatsapp_templates")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false });
    setTemplates((data as Template[]) || []);
    setLoading(false);
  }, [tenantId]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  const extractVariables = (msg: string): string[] => {
    const matches = msg.match(/\{\{[^}]+\}\}/g);
    return matches ? [...new Set(matches)] : [];
  };

  const openEdit = (t: Template) => {
    setEditing(t);
    setForm({ name: t.name, message: t.message });
    setShowForm(true);
  };

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", message: "" });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!tenantId || !form.name.trim() || !form.message.trim()) {
      toast.error("Nombre y mensaje son requeridos");
      return;
    }
    setSaving(true);
    const vars = extractVariables(form.message);

    if (editing) {
      const { error } = await supabase
        .from("whatsapp_templates")
        .update({ name: form.name, message: form.message, variables: vars, updated_at: new Date().toISOString() })
        .eq("id", editing.id);
      if (error) toast.error("Error al actualizar");
      else toast.success("Plantilla actualizada");
    } else {
      const { error } = await supabase
        .from("whatsapp_templates")
        .insert({ tenant_id: tenantId, name: form.name, message: form.message, variables: vars });
      if (error) toast.error("Error al crear");
      else toast.success("Plantilla creada");
    }

    setSaving(false);
    setShowForm(false);
    fetchTemplates();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("whatsapp_templates").delete().eq("id", id);
    if (error) toast.error("Error al eliminar");
    else { toast.success("Plantilla eliminada"); fetchTemplates(); }
  };

  const insertVariable = (v: string) => {
    setForm(f => ({ ...f, message: f.message + v }));
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-500" />
            Plantillas de WhatsApp
          </CardTitle>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Nueva</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? "Editar Plantilla" : "Nueva Plantilla"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nombre</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ej: Seguimiento cotización" />
                </div>
                <div>
                  <Label>Mensaje</Label>
                  <Textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} placeholder="Hola {{nombre}}, tu cotización por {{monto}} está lista..." />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Variables disponibles</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {AVAILABLE_VARIABLES.map(v => (
                      <Badge key={v} variant="outline" className="cursor-pointer hover:bg-primary/10 text-xs" onClick={() => insertVariable(v)}>
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button onClick={handleSave} disabled={saving} className="w-full">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                  {editing ? "Guardar Cambios" : "Crear Plantilla"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : templates.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No tienes plantillas de WhatsApp aún. Crea una para automatizar tus mensajes.</p>
        ) : (
          <div className="space-y-3">
            {templates.map(t => (
              <div key={t.id} className="p-4 rounded-lg border border-border bg-background">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap line-clamp-3">{t.message}</p>
                    {t.variables && t.variables.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {t.variables.map(v => (
                          <Badge key={v} variant="secondary" className="text-[10px]">{v}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(t)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(t.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
