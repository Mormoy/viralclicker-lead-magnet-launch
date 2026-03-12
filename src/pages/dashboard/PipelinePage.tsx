import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useActivityLog } from "@/hooks/useActivityLog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Plus, MoreVertical, Phone, Mail, DollarSign, Clock, GripVertical, Loader2, Trash2, Settings,
  Search, RefreshCw, X, Download, AlertTriangle, ChevronLeft, ChevronRight, Kanban, List, Users, Target, TrendingUp,
  MessageSquare, CalendarIcon, XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { format, formatDistanceToNow, differenceInHours, differenceInDays, isToday } from "date-fns";
import { es } from "date-fns/locale";
import {
  LOSS_REASONS, PRIORITIES, DEAL_SOURCES, NEXT_ACTIONS,
  getSourceBadge, ALERT_COLORS, DATE_FILTER_PRESETS, getDateRange,
  type AlertInfo, type AlertCategory, type DateFilterPreset,
} from "@/config/pipeline-config";
import { DealDetailPanel } from "@/components/dashboard/deal-detail-panel";

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
  assigned_to: string | null;
  loss_reason: string | null;
  loss_reason_detail: string | null;
  tags: string[] | null;
  internal_notes: string | null;
  next_action: string | null;
  next_action_at: string | null;
  first_contact_at: string | null;
  last_interaction_at: string | null;
  visit_scheduled_at: string | null;
  visit_completed_at: string | null;
  visit_address: string | null;
  visit_notes: string | null;
  final_value: number | null;
}

// Alert logic
const getDealAlerts = (deal: Deal, stage: StageConfig | undefined): AlertInfo[] => {
  const alerts: AlertInfo[] = [];
  const now = new Date();
  const changedAt = new Date(deal.updated_at);
  const hoursSinceChange = differenceInHours(now, changedAt);
  const daysSinceChange = differenceInDays(now, changedAt);
  const stageType = stage?.stage_type || 'normal';

  if (stageType === 'won' || stageType === 'lost') return alerts;

  // New deal without contact > 4h
  if (stage?.sort_order === 0 && hoursSinceChange >= 4) {
    alerts.push({ text: `${hoursSinceChange}h sin contactar`, type: 'danger', category: 'sin_contactar' });
  }

  // Web lead without response > 24h
  if (['web', 'ads'].includes(deal.source || '') && stage?.sort_order! <= 1 && hoursSinceChange >= 24) {
    alerts.push({ text: 'Sin respuesta', type: 'warning', category: 'sin_respuesta' });
  }

  // Stale > 3 days
  if (daysSinceChange >= 3 && (stage?.sort_order || 0) >= 1 && (stage?.sort_order || 0) <= 4) {
    alerts.push({ text: `${daysSinceChange}d sin movimiento`, type: 'warning', category: 'sin_movimiento' });
  }

  // Visit today
  if (deal.visit_scheduled_at && isToday(new Date(deal.visit_scheduled_at))) {
    alerts.push({ text: 'Visita hoy', type: 'info', category: 'visita_hoy' });
  }

  return alerts;
};

export default function PipelinePage() {
  const { tenantId } = useAuth();
  const { logActivity } = useActivityLog();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stages, setStages] = useState<StageConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [activeTab, setActiveTab] = useState<'kanban' | 'lista' | 'alertas' | 'perdidas'>('kanban');

  // Loss modal
  const [showLossModal, setShowLossModal] = useState(false);
  const [pendingLossDealId, setPendingLossDealId] = useState<string | null>(null);
  const [selectedLossReason, setSelectedLossReason] = useState<string | null>(null);
  const [lossReasonDetail, setLossReasonDetail] = useState("");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [datePreset, setDatePreset] = useState<DateFilterPreset | null>(null);

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

  // Filter deals
  const filteredDeals = useMemo(() => {
    return deals.filter(d => {
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        if (!d.name.toLowerCase().includes(s) && !(d.company || '').toLowerCase().includes(s) && !(d.email || '').toLowerCase().includes(s)) return false;
      }
      if (priorityFilter && d.priority !== priorityFilter) return false;
      if (sourceFilter && d.source !== sourceFilter) return false;
      if (datePreset) {
        if (datePreset !== 'custom') {
          const range = getDateRange(datePreset);
          if (range) {
            const created = new Date(d.created_at);
            if (created < range.from || created > range.to) return false;
          }
        }
      }
      return true;
    });
  }, [deals, searchTerm, priorityFilter, sourceFilter, datePreset]);

  const getStageForDeal = (deal: Deal) => {
    if (deal.stage_id) return stages.find(s => s.id === deal.stage_id);
    return stages.find(s => s.slug === deal.stage) || stages[0];
  };

  // KPI calculations
  const normalStages = stages.filter(s => s.stage_type === 'normal');
  const wonStage = stages.find(s => s.stage_type === 'won');
  const lostStage = stages.find(s => s.stage_type === 'lost');
  const activeDeals = filteredDeals.filter(d => {
    const st = getStageForDeal(d);
    return st?.stage_type === 'normal';
  });
  const wonDeals = filteredDeals.filter(d => getStageForDeal(d)?.stage_type === 'won');
  const lostDeals = filteredDeals.filter(d => getStageForDeal(d)?.stage_type === 'lost');
  const totalValue = activeDeals.reduce((sum, d) => sum + (d.value || 0), 0);
  const wonValue = wonDeals.reduce((sum, d) => sum + (d.final_value || d.value || 0), 0);
  const totalFinalized = wonDeals.length + lostDeals.length;
  const conversionRate = totalFinalized > 0 ? Math.round((wonDeals.length / totalFinalized) * 100) : 0;

  // Alerts
  const alertDeals = filteredDeals.filter(d => getDealAlerts(d, getStageForDeal(d)).length > 0);

  // Deal grouping
  const dealsByStage = useMemo(() => {
    const grouped: Record<string, Deal[]> = {};
    stages.forEach(s => { grouped[s.id] = []; });
    filteredDeals.forEach(d => {
      const st = getStageForDeal(d);
      if (st && grouped[st.id]) grouped[st.id].push(d);
      else if (stages[0]) grouped[stages[0].id]?.push(d);
    });
    return grouped;
  }, [filteredDeals, stages]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("dealId", id);
    setDraggedId(id);
  };

  const handleDrop = async (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    setDragOverStageId(null);
    setDraggedId(null);
    const dealId = e.dataTransfer.getData("dealId");
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const currentStage = getStageForDeal(deal);
    if (currentStage?.id === targetStageId) return;

    const targetStage = stages.find(s => s.id === targetStageId);
    if (!targetStage) return;

    // If dropping on lost stage, show loss modal
    if (targetStage.stage_type === 'lost') {
      setPendingLossDealId(dealId);
      setShowLossModal(true);
      return;
    }

    await moveDealToStage(dealId, targetStage, deal, currentStage);
  };

  const moveDealToStage = async (dealId: string, targetStage: StageConfig, deal: Deal, currentStage?: StageConfig) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage_id: targetStage.id, stage: targetStage.slug as any } : d));

    const updateData: Record<string, unknown> = {
      stage_id: targetStage.id,
      stage: targetStage.slug,
      updated_at: new Date().toISOString(),
      last_interaction_at: new Date().toISOString(),
    };

    if (targetStage.stage_type === 'won' && deal) {
      updateData.final_value = deal.final_value || deal.value;
    }

    const { error } = await supabase.from("pipeline_deals").update(updateData).eq("id", dealId);

    if (error) {
      toast.error("Error al mover deal");
      fetchDeals();
    } else {
      toast.success(`Movido a ${targetStage.name}`);
      await logActivity({
        entityType: 'deal',
        entityId: dealId,
        actionType: 'stage_change',
        description: `${currentStage?.name || '?'} → ${targetStage.name}`,
        oldValue: currentStage?.slug,
        newValue: targetStage.slug,
      });
    }
  };

  const confirmLoss = async () => {
    if (!pendingLossDealId || !selectedLossReason) return;
    const targetStage = stages.find(s => s.stage_type === 'lost');
    if (!targetStage) return;
    const deal = deals.find(d => d.id === pendingLossDealId);
    if (!deal) return;

    setDeals(prev => prev.map(d => d.id === pendingLossDealId ? {
      ...d, stage_id: targetStage.id, stage: targetStage.slug as any,
      loss_reason: selectedLossReason, loss_reason_detail: lossReasonDetail
    } : d));

    await supabase.from("pipeline_deals").update({
      stage_id: targetStage.id,
      stage: targetStage.slug,
      loss_reason: selectedLossReason,
      loss_reason_detail: lossReasonDetail || null,
      updated_at: new Date().toISOString(),
    } as any).eq("id", pendingLossDealId);

    await logActivity({
      entityType: 'deal',
      entityId: pendingLossDealId,
      actionType: 'lost',
      description: `Perdido: ${LOSS_REASONS.find(r => r.key === selectedLossReason)?.label || selectedLossReason}`,
      newValue: selectedLossReason,
    });

    toast.success("Deal marcado como perdido");
    setShowLossModal(false);
    setPendingLossDealId(null);
    setSelectedLossReason(null);
    setLossReasonDetail("");
  };

  const handleDelete = async (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
    const { error } = await supabase.from("pipeline_deals").delete().eq("id", id);
    if (error) { toast.error("Error al eliminar"); fetchDeals(); }
    else toast.success("Deal eliminado");
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ['Nombre', 'Empresa', 'Email', 'Teléfono', 'Valor', 'Etapa', 'Fuente', 'Prioridad', 'Creado'];
    const csvContent = [
      headers.join(','),
      ...filteredDeals.map(d => {
        const st = getStageForDeal(d);
        return [
          `"${d.name}"`, `"${d.company || ''}"`, `"${d.email || ''}"`, `"${d.phone || ''}"`,
          `"$${(d.value || 0).toLocaleString()}"`, `"${st?.name || ''}"`, `"${d.source || ''}"`,
          `"${d.priority || ''}"`, `"${format(new Date(d.created_at), 'dd/MM/yy')}"`,
        ].join(',');
      })
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pipeline_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    toast.success("CSV exportado");
  };

  const hasFilters = searchTerm || priorityFilter || sourceFilter || datePreset;
  const clearFilters = () => {
    setSearchTerm("");
    setPriorityFilter(null);
    setSourceFilter(null);
    setDatePreset(null);
  };

  const defaultStage = stages.find(s => s.is_default) || stages[0];
  const kanbanStages = stages.filter(s => s.stage_type !== 'lost');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Kanban className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          <div>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight">Pipeline de Ventas</h2>
            <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
              {filteredDeals.length} deals · ${totalValue.toLocaleString()} valor activo
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {alertDeals.length > 0 && (
            <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 rounded-lg text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>{alertDeals.length} alertas</span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
          <Link to="/dashboard/pipeline/settings">
            <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-1" />Etapas</Button>
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

      {/* KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg"><Users className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground">En Pipeline</p>
                <p className="text-lg md:text-xl font-bold">{activeDeals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-500/10"><DollarSign className="h-4 w-4 text-green-500" /></div>
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground">Valor Activo</p>
                <p className="text-lg md:text-xl font-bold">${(totalValue / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10"><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground">Ganado</p>
                <p className="text-lg md:text-xl font-bold">${(wonValue / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10"><Target className="h-4 w-4 text-blue-500" /></div>
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground">Conversión</p>
                <p className="text-lg md:text-xl font-bold">{conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status pills */}
      <div className="overflow-x-auto -mx-2 px-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-1">
          {stages.map(s => {
            const count = (dealsByStage[s.id] || []).length;
            return (
              <div key={s.id} className="flex items-center gap-2 border rounded-xl px-3 py-2 min-w-[80px] bg-card">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <div className="min-w-0">
                  <div className="text-sm font-bold leading-tight">{count}</div>
                  <div className="text-[9px] text-muted-foreground leading-tight truncate">{s.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar nombre, empresa, email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={datePreset || "all"} onValueChange={v => setDatePreset(v === "all" ? null : v as DateFilterPreset)}>
          <SelectTrigger className="w-full md:w-40 h-9">
            <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <SelectValue placeholder="Fecha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las fechas</SelectItem>
            {DATE_FILTER_PRESETS.filter(p => p.key !== 'custom').map(p => (
              <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priorityFilter || "all"} onValueChange={v => setPriorityFilter(v === "all" ? null : v)}>
          <SelectTrigger className="w-full md:w-32 h-9"><SelectValue placeholder="Prioridad" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {PRIORITIES.map(p => (<SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={sourceFilter || "all"} onValueChange={v => setSourceFilter(v === "all" ? null : v)}>
          <SelectTrigger className="w-full md:w-32 h-9"><SelectValue placeholder="Fuente" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {DEAL_SOURCES.map(s => (<SelectItem key={s.key} value={s.key}>{s.icon} {s.label}</SelectItem>))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9"><X className="h-4 w-4 mr-1" /> Limpiar</Button>
          )}
          <Button variant="outline" size="sm" onClick={() => { fetchDeals(); fetchStages(); }} className="h-9"><RefreshCw className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="kanban" className="gap-1"><Kanban className="h-3.5 w-3.5" /> Kanban</TabsTrigger>
          <TabsTrigger value="lista" className="gap-1"><List className="h-3.5 w-3.5" /> Lista</TabsTrigger>
          {alertDeals.length > 0 && (
            <TabsTrigger value="alertas" className="gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Alertas ({alertDeals.length})</TabsTrigger>
          )}
          {lostDeals.length > 0 && (
            <TabsTrigger value="perdidas" className="gap-1"><XCircle className="h-3.5 w-3.5" /> Perdidas ({lostDeals.length})</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="kanban" className="mt-3">
          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-4 min-w-max">
              {kanbanStages.map(stage => {
                const items = dealsByStage[stage.id] || [];
                const total = items.reduce((a, d) => a + (d.value || 0), 0);
                const isOver = dragOverStageId === stage.id;
                return (
                  <div
                    key={stage.id}
                    className="w-72 flex-shrink-0"
                    onDragOver={e => { e.preventDefault(); setDragOverStageId(stage.id); }}
                    onDragLeave={() => setDragOverStageId(null)}
                    onDrop={e => handleDrop(e, stage.id)}
                  >
                    <Card className={`border-t-2 transition-all ${isOver ? "ring-2 ring-primary/50 bg-accent/30" : "bg-card"}`}
                      style={{ borderTopColor: stage.color }}>
                      <CardHeader className="pb-2 pt-3 px-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <CardTitle className="text-sm font-medium" style={{ color: stage.color }}>{stage.name}</CardTitle>
                            {stage.stage_type === "won" && <span className="text-[10px]">🏆</span>}
                          </div>
                          <Badge variant="outline" className="text-muted-foreground">{items.length}</Badge>
                        </div>
                        {total > 0 && <p className="text-xs text-primary font-semibold mt-0.5">${total.toLocaleString()}</p>}
                      </CardHeader>
                      <CardContent className="px-2 pb-2">
                        <ScrollArea className="h-[calc(100vh-420px)]">
                          <div className="space-y-2 pr-2">
                            {items.length === 0 ? (
                              <div className="text-center py-8 text-muted-foreground/50 text-sm">{isOver ? "Soltar aquí" : "Sin deals"}</div>
                            ) : items.map(deal => {
                              const alerts = getDealAlerts(deal, stage);
                              const amount = deal.final_value || deal.value || 0;
                              const timeAgo = formatDistanceToNow(new Date(deal.created_at), { addSuffix: false, locale: es });
                              const sourceBadge = getSourceBadge(deal.source || 'manual');
                              return (
                                <Card key={deal.id} draggable onDragStart={e => handleDragStart(e, deal.id)}
                                  className={`group cursor-grab active:cursor-grabbing bg-background border hover:border-primary/40 hover:shadow-md transition-all ${draggedId === deal.id ? "opacity-40" : ""}`}
                                  onClick={() => setSelectedDeal(deal)}>
                                  <CardContent className="p-2.5 space-y-1.5">
                                    {alerts.length > 0 && (
                                      <div className="space-y-1">
                                        {alerts.map((alert, i) => (
                                          <div key={i} className={`text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1 ${ALERT_COLORS[alert.type]}`}>
                                            <AlertTriangle className="h-2.5 w-2.5 flex-shrink-0" />{alert.text}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <div className="flex items-start justify-between gap-1">
                                      <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-xs leading-tight truncate">{deal.name}</p>
                                        {deal.company && <p className="text-[10px] text-muted-foreground truncate">{deal.company}</p>}
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                                          <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 group-hover:opacity-100">
                                            <MoreVertical className="h-3 w-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-44" onClick={e => e.stopPropagation()}>
                                          {stages.filter(s => s.id !== stage.id).map(ns => (
                                            <DropdownMenuItem key={ns.id} onClick={() => {
                                              if (ns.stage_type === 'lost') { setPendingLossDealId(deal.id); setShowLossModal(true); }
                                              else moveDealToStage(deal.id, ns, deal, stage);
                                            }} className="text-xs py-1.5">
                                              <div className="w-2 h-2 rounded-full mr-2" style={{ background: ns.color }} />
                                              {ns.name}
                                            </DropdownMenuItem>
                                          ))}
                                          <DropdownMenuSeparator />
                                          {deal.phone && (
                                            <DropdownMenuItem onClick={() => window.open(`https://wa.me/${deal.phone!.replace(/\D/g, "")}`, "_blank")} className="text-xs">
                                              <Phone className="w-3 h-3 mr-2 text-green-500" /> WhatsApp
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuItem className="text-destructive text-xs" onClick={() => handleDelete(deal.id)}>
                                            <Trash2 className="w-3 h-3 mr-2" /> Eliminar
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    {amount > 0 && (
                                      <div className="flex items-center gap-1">
                                        <DollarSign className="w-3 h-3 text-green-500" />
                                        <span className="text-green-500 font-medium text-xs">${amount.toLocaleString()}</span>
                                      </div>
                                    )}
                                    <div className="flex items-center justify-between pt-1 border-t border-border/40">
                                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-2.5 h-2.5" />{timeAgo}
                                      </span>
                                      <Badge variant="outline" className={`text-[9px] px-1 py-0 text-white ${sourceBadge.badgeColor}`}>
                                        {sourceBadge.badge}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
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
        </TabsContent>

        <TabsContent value="lista" className="mt-3">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Nombre</TableHead>
                  <TableHead className="text-xs">Empresa</TableHead>
                  <TableHead className="text-xs">Etapa</TableHead>
                  <TableHead className="text-xs">Valor</TableHead>
                  <TableHead className="text-xs">Fuente</TableHead>
                  <TableHead className="text-xs">Prioridad</TableHead>
                  <TableHead className="text-xs">Creado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.map(d => {
                  const st = getStageForDeal(d);
                  return (
                    <TableRow key={d.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedDeal(d)}>
                      <TableCell className="text-xs font-medium">{d.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{d.company || '—'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" style={{ borderColor: st?.color, color: st?.color }} className="text-[10px]">{st?.name}</Badge>
                      </TableCell>
                      <TableCell className="text-xs">${(d.value || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-xs">{d.source || '—'}</TableCell>
                      <TableCell className="text-xs">{d.priority || '—'}</TableCell>
                      <TableCell className="text-xs">{format(new Date(d.created_at), 'dd/MM/yy')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="alertas" className="mt-3">
          <div className="space-y-2">
            {alertDeals.map(d => {
              const st = getStageForDeal(d);
              const alerts = getDealAlerts(d, st);
              return (
                <Card key={d.id} className="cursor-pointer hover:border-primary/40" onClick={() => setSelectedDeal(d)}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{st?.name} · ${(d.value || 0).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {alerts.map((a, i) => (
                        <Badge key={i} variant="outline" className={`text-[10px] ${ALERT_COLORS[a.type]}`}>{a.text}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="perdidas" className="mt-3">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Nombre</TableHead>
                  <TableHead className="text-xs">Valor</TableHead>
                  <TableHead className="text-xs">Motivo</TableHead>
                  <TableHead className="text-xs">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lostDeals.map(d => (
                  <TableRow key={d.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedDeal(d)}>
                    <TableCell className="text-xs font-medium">{d.name}</TableCell>
                    <TableCell className="text-xs">${(d.value || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{LOSS_REASONS.find(r => r.key === d.loss_reason)?.label || d.loss_reason || '—'}</TableCell>
                    <TableCell className="text-xs">{format(new Date(d.updated_at), 'dd/MM/yy')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Loss Modal */}
      <Dialog open={showLossModal} onOpenChange={setShowLossModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motivo de pérdida</DialogTitle>
            <DialogDescription>Selecciona por qué se perdió este deal</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {LOSS_REASONS.map(r => (
                <Button key={r.key} variant={selectedLossReason === r.key ? "default" : "outline"} size="sm"
                  onClick={() => setSelectedLossReason(r.key)} className="justify-start text-xs">
                  <span className="mr-1">{r.icon}</span>{r.label}
                </Button>
              ))}
            </div>
            <Textarea placeholder="Detalle adicional (opcional)" value={lossReasonDetail} onChange={e => setLossReasonDetail(e.target.value)} rows={2} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLossModal(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={confirmLoss} disabled={!selectedLossReason}>Confirmar pérdida</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deal Detail */}
      <DealDetailPanel
        deal={selectedDeal}
        stages={stages}
        open={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
        onDealUpdated={() => { fetchDeals(); }}
      />
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
    name: "", company: "", email: "", phone: "", city: "", source: "manual", value: "", notes: "", priority: "media",
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
      priority: form.priority,
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
              {DEAL_SOURCES.map(s => (<SelectItem key={s.key} value={s.key}>{s.icon} {s.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Prioridad</Label>
          <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PRIORITIES.map(p => (<SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>))}
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
