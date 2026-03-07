import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Phone, Mail, DollarSign, Clock, GripVertical, Loader2, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface StageConfig {
  id: string;
  tenant_id: string;
  name: string;
  slug: string;
  color: string;
  sort_order: number;
  is_default: boolean;
  stage_type: string;
}

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

export default function PipelinePage() {
  const { tenantId } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stages, setStages] = useState<StageConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);

  const fetchStages = useCallback(async () => {
    if (!tenantId) return;
    const { data } = await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("sort_order");
    if (data && data.length > 0) {
      setStages(data as StageConfig[]);
    } else if (tenantId) {
      // Seed defaults
      await supabase.rpc("seed_default_pipeline_stages", { _tenant_id: tenantId });
      const { data: seeded } = await supabase
        .from("pipeline_stages")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("sort_order");
      if (seeded) setStages(seeded as StageConfig[]);
    }
  }, [tenantId]);

  const fetchDeals = useCallback(async () => {
    if (!tenantId) return;
    const { data, error } = await supabase
      .from("pipeline_deals")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false });
    if (!error && data) setDeals(data as Deal[]);
    setLoading(false);
  }, [tenantId]);

  useEffect(() => {
    Promise.all([fetchStages(), fetchDeals()]).then(() => setLoading(false));
  }, [fetchStages, fetchDeals]);

  // Map deals to stages: use stage_id if set, otherwise match by slug to old enum stage
  const dealsByStage = useMemo(() => {
    const grouped: Record<string, Deal[]> = {};
    stages.forEach(s => { grouped[s.id] = []; });
    deals.forEach(d => {
      if (d.stage_id && grouped[d.stage_id]) {
        grouped[d.stage_id].push(d);
      } else {
        // Fallback: match old enum stage to slug
        const matched = stages.find(s => s.slug === d.stage);
        if (matched) grouped[matched.id]?.push(d);
        else if (stages[0]) grouped[stages[0].id]?.push(d);
      }
    });
    return grouped;
  }, [deals, stages]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("dealId", id);
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOverStageId(stageId);
  };

  const handleDragLeave = () => setDragOverStageId(null);

  const handleDrop = async (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    setDragOverStageId(null);
    setDraggedId(null);
    const dealId = e.dataTransfer.getData("dealId");
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const currentStageId = deal.stage_id || stages.find(s => s.slug === deal.stage)?.id;
    if (currentStageId === targetStageId) return;

    const targetStage = stages.find(s => s.id === targetStageId);
    if (!targetStage) return;

    // Optimistic update
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage_id: targetStageId, stage: targetStage.slug as any } : d));

    const { error } = await supabase
      .from("pipeline_deals")
      .update({ stage_id: targetStageId, stage: targetStage.slug as any, updated_at: new Date().toISOString() })
      .eq("id", dealId);

    if (error) {
      toast.error("Error al mover deal");
      fetchDeals();
    } else {
      toast.success(`Movido a ${targetStage.name}`);
    }
  };

  const handleDelete = async (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
    const { error } = await supabase.from("pipeline_deals").delete().eq("id", id);
    if (error) { toast.error("Error al eliminar"); fetchDeals(); }
    else toast.success("Deal eliminado");
  };

  const stageTotal = (items: Deal[]) => items.reduce((a, d) => a + (d.value || 0), 0);

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000);
    if (d > 0) return `${d}d`;
    if (h > 0) return `${h}h`;
    return `${Math.floor(diff / 60000)}m`;
  };

  const defaultStage = stages.find(s => s.is_default) || stages[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pipeline CRM</h1>
          <p className="text-sm text-muted-foreground">
            {deals.length} deals · ${stageTotal(deals).toLocaleString()} valor total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/dashboard/pipeline/settings">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-1" />Configurar
            </Button>
          </Link>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Nuevo Deal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Nuevo Deal</DialogTitle></DialogHeader>
              <AddDealForm
                tenantId={tenantId!}
                defaultStageId={defaultStage?.id}
                defaultStageSlug={defaultStage?.slug || "lead"}
                onCreated={() => { setShowAdd(false); fetchDeals(); }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-4 min-w-max">
          {stages.map(stage => {
            const items = dealsByStage[stage.id] || [];
            const total = stageTotal(items);
            const isOver = dragOverStageId === stage.id;
            return (
              <div
                key={stage.id}
                className="w-72 flex-shrink-0"
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <Card className={`border-t-2 transition-all ${isOver ? "ring-2 ring-primary/50 bg-accent/30" : "bg-card"}`}
                  style={{ borderTopColor: stage.color }}
                >
                  <CardHeader className="pb-2 pt-3 px-3">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CardTitle className="text-sm font-medium" style={{ color: stage.color }}>
                        {stage.name}
                      </CardTitle>
                      {stage.stage_type === "won" && <span className="text-[10px]">🏆</span>}
                      {stage.stage_type === "lost" && <span className="text-[10px]">✗</span>}
                    </div>
                      <Badge variant="outline" className="text-muted-foreground">{items.length}</Badge>
                    </div>
                    {total > 0 && <p className="text-xs text-muted-foreground">${total.toLocaleString()}</p>}
                  </CardHeader>
                  <CardContent className="px-2 pb-2">
                    <ScrollArea className="h-[calc(100vh-280px)]">
                      <div className="space-y-2 pr-2">
                        {items.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground/50 text-sm">
                            {isOver ? "Soltar aquí" : "Sin deals"}
                          </div>
                        ) : (
                          items.map(deal => (
                            <Card
                              key={deal.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, deal.id)}
                              className={`cursor-grab active:cursor-grabbing bg-background border hover:border-primary/40 transition-all ${draggedId === deal.id ? "opacity-50" : ""}`}
                            >
                              <CardContent className="p-3 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                    <GripVertical className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                                    <div className="min-w-0">
                                      <p className="font-medium text-foreground text-sm truncate">{deal.name}</p>
                                      {deal.company && <p className="text-xs text-muted-foreground truncate">{deal.company}</p>}
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <MoreVertical className="w-3 h-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {deal.phone && (
                                        <DropdownMenuItem onClick={() => window.open(`https://wa.me/${deal.phone!.replace(/\D/g, "")}`, "_blank")}>
                                          <Phone className="w-4 h-4 mr-2 text-green-500" /> WhatsApp
                                        </DropdownMenuItem>
                                      )}
                                      {deal.email && (
                                        <DropdownMenuItem onClick={() => window.open(`mailto:${deal.email}`)}>
                                          <Mail className="w-4 h-4 mr-2 text-blue-500" /> Email
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(deal.id)}>
                                        <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                {deal.value > 0 && (
                                  <div className="flex items-center gap-1 text-sm">
                                    <DollarSign className="w-3 h-3 text-green-500" />
                                    <span className="text-green-500 font-medium text-xs">${deal.value.toLocaleString()}</span>
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-1 border-t">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    <span>{getTimeAgo(deal.updated_at)}</span>
                                  </div>
                                  <Badge variant="outline" className="text-[10px] px-1 py-0">
                                    {deal.source || "manual"}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

function AddDealForm({ tenantId, defaultStageId, defaultStageSlug, onCreated }: {
  tenantId: string;
  defaultStageId?: string;
  defaultStageSlug: string;
  onCreated: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", city: "", source: "manual", value: "", notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("El nombre es requerido"); return; }
    setSaving(true);
    const { error } = await supabase.from("pipeline_deals").insert({
      tenant_id: tenantId,
      name: form.name,
      company: form.company || null,
      email: form.email || null,
      phone: form.phone || null,
      city: form.city || null,
      source: form.source,
      value: parseFloat(form.value) || 0,
      notes: form.notes || null,
      stage: defaultStageSlug as any,
      stage_id: defaultStageId || null,
    });
    setSaving(false);
    if (error) toast.error("Error al crear deal");
    else { toast.success("Deal creado"); onCreated(); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Label>Nombre *</Label>
          <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nombre del contacto" />
        </div>
        <div>
          <Label>Empresa</Label>
          <Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        </div>
        <div>
          <Label>Ciudad</Label>
          <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
        </div>
        <div>
          <Label>Valor estimado</Label>
          <Input type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="0" />
        </div>
        <div>
          <Label>Fuente</Label>
          <Select value={form.source} onValueChange={v => setForm(f => ({ ...f, source: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="ads">Ads</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="referido">Referido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Notas</Label>
        <Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} />
      </div>
      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
        Crear Deal
      </Button>
    </form>
  );
}
