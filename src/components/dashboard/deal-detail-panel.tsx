import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Mail, Building2, MapPin, DollarSign, MessageSquare, FileText, Clock, Send, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Deal {
  id: string;
  tenant_id: string;
  stage: string;
  stage_id: string | null;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  source: string | null;
  value: number;
  priority: string;
  notes: string | null;
  next_followup: string | null;
  created_at: string;
  updated_at: string;
}

interface StageConfig {
  id: string;
  name: string;
  slug: string;
  color: string;
  sort_order: number;
  stage_type: string;
}

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  created_at: string;
}

interface AssociatedQuote {
  id: string;
  short_code: string;
  customer_name: string;
  total: number;
  status: string;
}

interface DealDetailPanelProps {
  deal: Deal | null;
  stages: StageConfig[];
  open: boolean;
  onClose: () => void;
  onDealUpdated: () => void;
}

export function DealDetailPanel({ deal, stages, open, onClose, onDealUpdated }: DealDetailPanelProps) {
  const { tenantId, user } = useAuth();
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [quotes, setQuotes] = useState<AssociatedQuote[]>([]);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [changingStage, setChangingStage] = useState(false);
  const [loadingActivity, setLoadingActivity] = useState(false);

  const currentStageId = deal?.stage_id || stages.find(s => s.slug === deal?.stage)?.id || "";

  const fetchActivity = useCallback(async () => {
    if (!deal) return;
    setLoadingActivity(true);
    const { data } = await supabase
      .from("deal_activity")
      .select("id, type, description, created_at")
      .eq("deal_id", deal.id)
      .order("created_at", { ascending: false })
      .limit(50);
    setActivity((data as ActivityItem[]) || []);
    setLoadingActivity(false);
  }, [deal]);

  const fetchQuotes = useCallback(async () => {
    if (!deal) return;
    const { data } = await supabase
      .from("quotes")
      .select("id, short_code, customer_name, total, status")
      .eq("pipeline_deal_id", deal.id)
      .limit(5);
    setQuotes((data as AssociatedQuote[]) || []);
  }, [deal]);

  useEffect(() => {
    if (open && deal) {
      fetchActivity();
      fetchQuotes();
      setNote("");
    }
  }, [open, deal, fetchActivity, fetchQuotes]);

  const handleStageChange = async (newStageId: string) => {
    if (!deal || !tenantId) return;
    setChangingStage(true);
    const targetStage = stages.find(s => s.id === newStageId);
    const oldStage = stages.find(s => s.id === currentStageId);
    if (!targetStage) return;

    const { error } = await supabase
      .from("pipeline_deals")
      .update({ stage_id: newStageId, stage: targetStage.slug as any, updated_at: new Date().toISOString() })
      .eq("id", deal.id);

    if (!error) {
      // Log activity
      await supabase.from("deal_activity").insert({
        deal_id: deal.id,
        tenant_id: tenantId,
        type: "stage_change",
        description: `Etapa cambiada de "${oldStage?.name || deal.stage}" a "${targetStage.name}"`,
        old_stage_id: currentStageId || null,
        new_stage_id: newStageId,
        created_by: user?.id || null,
      });
      // Queue automations for stage change
      await queueAutomations(deal.id, "cambio_etapa");
      toast.success(`Movido a ${targetStage.name}`);
      fetchActivity();
      onDealUpdated();
    } else {
      toast.error("Error al cambiar etapa");
    }
    setChangingStage(false);
  };

  const handleSaveNote = async () => {
    if (!deal || !tenantId || !note.trim()) return;
    setSaving(true);

    // Save note to deal
    const { error: updateError } = await supabase
      .from("pipeline_deals")
      .update({ notes: note.trim(), updated_at: new Date().toISOString() })
      .eq("id", deal.id);

    if (!updateError) {
      // Log activity
      await supabase.from("deal_activity").insert({
        deal_id: deal.id,
        tenant_id: tenantId,
        type: "note",
        description: `Nota agregada: ${note.trim().substring(0, 100)}${note.trim().length > 100 ? "..." : ""}`,
        created_by: user?.id || null,
      });
      toast.success("Nota guardada");
      setNote("");
      fetchActivity();
      onDealUpdated();
    } else {
      toast.error("Error al guardar nota");
    }
    setSaving(false);
  };

  const queueAutomations = async (dealId: string, triggerEvent: string) => {
    if (!tenantId) return;
    const { data: automations } = await supabase
      .from("whatsapp_automations")
      .select("id, delay_hours")
      .eq("tenant_id", tenantId)
      .eq("trigger_event", triggerEvent)
      .eq("is_active", true);

    if (automations && automations.length > 0) {
      const inserts = automations.map((a: any) => ({
        tenant_id: tenantId,
        deal_id: dealId,
        automation_id: a.id,
        scheduled_at: new Date(Date.now() + a.delay_hours * 3600000).toISOString(),
        status: "pending",
      }));
      await supabase.from("automation_queue").insert(inserts);
    }
  };

  const handleWhatsApp = () => {
    if (!deal?.phone) return;
    const cleanPhone = deal.phone.replace(/\D/g, "");
    const message = encodeURIComponent(`Hola ${deal.name}, te contacto de parte de nuestra empresa respecto a tu cotización.`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");

    // Log activity
    if (tenantId) {
      supabase.from("deal_activity").insert({
        deal_id: deal.id,
        tenant_id: tenantId,
        type: "whatsapp",
        description: "Mensaje de WhatsApp enviado manualmente",
        created_by: user?.id || null,
      });
      setTimeout(fetchActivity, 500);
    }
  };

  if (!deal) return null;

  const currentStage = stages.find(s => s.id === currentStageId);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-border p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="text-xl text-foreground">{deal.name}</SheetTitle>
          {deal.company && (
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> {deal.company}
            </p>
          )}
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Contact Info */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contacto</h3>
              <div className="grid grid-cols-1 gap-2">
                {deal.phone && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Phone className="w-4 h-4 text-green-500" /> {deal.phone}
                  </div>
                )}
                {deal.email && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Mail className="w-4 h-4 text-blue-400" /> {deal.email}
                  </div>
                )}
                {deal.city && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" /> {deal.city}
                  </div>
                )}
                {deal.value > 0 && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <DollarSign className="w-4 h-4 text-primary" /> ${deal.value.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Stage selector */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Etapa</h3>
              <Select value={currentStageId} onValueChange={handleStageChange} disabled={changingStage}>
                <SelectTrigger>
                  <SelectValue>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentStage?.color }} />
                      {currentStage?.name || "—"}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {stages.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                        {s.name}
                        {s.stage_type === "won" && " 🏆"}
                        {s.stage_type === "lost" && " ✗"}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-border" />

            {/* Associated Quotes */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cotizaciones</h3>
              {quotes.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sin cotizaciones asociadas</p>
              ) : (
                <div className="space-y-2">
                  {quotes.map(q => (
                    <div key={q.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                      <div>
                        <p className="text-sm font-medium text-foreground">{q.customer_name}</p>
                        <p className="text-xs text-muted-foreground">${Number(q.total).toLocaleString()} · <Badge variant="outline" className="text-[10px]">{q.status}</Badge></p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/q/view/${q.short_code}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-border" />

            {/* Actions */}
            <div className="flex gap-2">
              {deal.phone && (
                <Button onClick={handleWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              )}
              {deal.email && (
                <Button variant="outline" className="flex-1" onClick={() => window.open(`mailto:${deal.email}`)}>
                  <Mail className="w-4 h-4 mr-2" /> Email
                </Button>
              )}
            </div>

            <Separator className="bg-border" />

            {/* Notes */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notas</h3>
              {deal.notes && (
                <div className="p-3 rounded-lg bg-muted/30 border border-border text-sm text-foreground mb-2">
                  {deal.notes}
                </div>
              )}
              <Textarea
                placeholder="Agregar nota interna..."
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={3}
                className="bg-background"
              />
              <Button size="sm" onClick={handleSaveNote} disabled={saving || !note.trim()}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Send className="w-4 h-4 mr-1" />}
                Guardar nota
              </Button>
            </div>

            <Separator className="bg-border" />

            {/* Activity */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Historial de Actividad</h3>
              {loadingActivity ? (
                <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
              ) : activity.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sin actividad registrada</p>
              ) : (
                <div className="space-y-3">
                  {activity.map(a => (
                    <div key={a.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          a.type === "stage_change" ? "bg-primary" :
                          a.type === "whatsapp" ? "bg-green-500" :
                          a.type === "note" ? "bg-blue-400" : "bg-muted-foreground"
                        }`} />
                        <div className="w-px flex-1 bg-border" />
                      </div>
                      <div className="pb-4">
                        <p className="text-sm text-foreground">{a.description}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(a.created_at).toLocaleDateString("es", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
