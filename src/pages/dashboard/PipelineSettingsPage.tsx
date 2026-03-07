import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, GripVertical, Pencil, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type StageType = "normal" | "won" | "lost";

interface PipelineStage {
  id: string;
  tenant_id: string;
  name: string;
  slug: string;
  color: string;
  sort_order: number;
  is_default: boolean;
  stage_type: StageType;
}

const PRESET_COLORS = [
  "#3b82f6", "#06b6d4", "#eab308", "#f97316", "#ef4444",
  "#a855f7", "#ec4899", "#10b981", "#22c55e", "#6366f1",
  "#8b5cf6", "#14b8a6", "#f59e0b", "#dc2626", "#0ea5e9",
];

export default function PipelineSettingsPage() {
  const { tenantId } = useAuth();
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editStage, setEditStage] = useState<PipelineStage | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const fetchStages = useCallback(async () => {
    if (!tenantId) return;
    const { data, error } = await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("sort_order");
    if (!error && data) setStages(data as PipelineStage[]);
    setLoading(false);
  }, [tenantId]);

  useEffect(() => { fetchStages(); }, [fetchStages]);

  // Seed defaults if no stages exist
  useEffect(() => {
    if (!loading && stages.length === 0 && tenantId) {
      supabase.rpc("seed_default_pipeline_stages", { _tenant_id: tenantId })
        .then(() => fetchStages());
    }
  }, [loading, stages.length, tenantId, fetchStages]);

  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => { e.preventDefault(); setOverIdx(idx); };
  const handleDragEnd = () => { setDragIdx(null); setOverIdx(null); };

  const handleDrop = async (targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) { handleDragEnd(); return; }
    const reordered = [...stages];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(targetIdx, 0, moved);
    const updated = reordered.map((s, i) => ({ ...s, sort_order: i }));
    setStages(updated);
    handleDragEnd();

    // Persist reorder
    for (const s of updated) {
      await supabase.from("pipeline_stages").update({ sort_order: s.sort_order }).eq("id", s.id);
    }
    toast.success("Orden actualizado");
  };

  const handleDelete = async (stage: PipelineStage) => {
    if (stage.is_default) {
      toast.error("No puedes eliminar la etapa predeterminada");
      return;
    }
    const { error } = await supabase.from("pipeline_stages").delete().eq("id", stage.id);
    if (error) toast.error("Error al eliminar");
    else { toast.success("Etapa eliminada"); fetchStages(); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link to="/dashboard/pipeline">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurar Pipeline</h1>
          <p className="text-sm text-muted-foreground">Personaliza las etapas de tu proceso de ventas</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Etapas del Pipeline</CardTitle>
            <CardDescription>Arrastra para reordenar. La primera etapa se usa para nuevos leads.</CardDescription>
          </div>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-1" />Agregar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Nueva Etapa</DialogTitle></DialogHeader>
              <StageForm
                tenantId={tenantId!}
                nextOrder={stages.length}
                onSaved={() => { setShowAdd(false); fetchStages(); }}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-1">
          {stages.map((stage, idx) => (
            <div
              key={stage.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragLeave={() => setOverIdx(null)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                overIdx === idx ? "border-primary bg-accent/30" : "border-border bg-card"
              } ${dragIdx === idx ? "opacity-50" : ""}`}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 border border-border"
                style={{ backgroundColor: stage.color }}
              />
              <span className="flex-1 font-medium text-sm text-foreground">{stage.name}</span>
              {stage.is_default && (
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Inicial</span>
              )}
              {stage.stage_type === "won" && (
                <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">🏆 Ganado</span>
              )}
              {stage.stage_type === "lost" && (
                <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">✗ Perdido</span>
              )}
              <Button
                variant="ghost" size="icon" className="h-7 w-7"
                onClick={() => setEditStage(stage)}
              >
                <Pencil className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => handleDelete(stage)}
                disabled={stage.is_default}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Edit dialog */}
      <Dialog open={!!editStage} onOpenChange={(open) => !open && setEditStage(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar Etapa</DialogTitle></DialogHeader>
          {editStage && (
            <StageForm
              tenantId={tenantId!}
              stage={editStage}
              onSaved={() => { setEditStage(null); fetchStages(); }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StageForm({
  tenantId,
  stage,
  nextOrder,
  onSaved,
}: {
  tenantId: string;
  stage?: PipelineStage;
  nextOrder?: number;
  onSaved: () => void;
}) {
  const [name, setName] = useState(stage?.name || "");
  const [color, setColor] = useState(stage?.color || PRESET_COLORS[0]);
  const [isDefault, setIsDefault] = useState(stage?.is_default || false);
  const [stageType, setStageType] = useState<StageType>(stage?.stage_type || "normal");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("El nombre es requerido"); return; }
    setSaving(true);

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

    if (stage) {
      // If setting as default, unset others first
      if (isDefault && !stage.is_default) {
        await supabase.from("pipeline_stages").update({ is_default: false }).eq("tenant_id", tenantId);
      }
      const { error } = await supabase
        .from("pipeline_stages")
        .update({ name, slug, color, is_default: isDefault, stage_type: stageType } as any)
        .eq("id", stage.id);
      if (error) toast.error("Error al actualizar");
      else { toast.success("Etapa actualizada"); onSaved(); }
    } else {
      if (isDefault) {
        await supabase.from("pipeline_stages").update({ is_default: false }).eq("tenant_id", tenantId);
      }
      const { error } = await supabase.from("pipeline_stages").insert({
        tenant_id: tenantId,
        name,
        slug,
        color,
        sort_order: nextOrder ?? 0,
        is_default: isDefault,
        stage_type: stageType,
      } as any);
      if (error) toast.error("Error al crear");
      else { toast.success("Etapa creada"); onSaved(); }
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Nombre de la etapa</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Cotización enviada" />
      </div>
      <div>
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                color === c ? "border-foreground scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-2 w-20 h-8 p-0 border-none cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_default"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="rounded"
        />
        <Label htmlFor="is_default" className="text-sm">Etapa inicial (para nuevos leads)</Label>
      </div>
      <div>
        <Label>Tipo de etapa</Label>
        <div className="flex gap-2 mt-2">
          {([
            { value: "normal" as StageType, label: "Normal", emoji: "📋" },
            { value: "won" as StageType, label: "Ganado", emoji: "🏆" },
            { value: "lost" as StageType, label: "Perdido", emoji: "✗" },
          ]).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStageType(opt.value)}
              className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                stageType === opt.value
                  ? opt.value === "won"
                    ? "border-green-500 bg-green-500/10 text-green-500"
                    : opt.value === "lost"
                    ? "border-red-500 bg-red-500/10 text-red-500"
                    : "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {opt.emoji} {opt.label}
            </button>
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={saving}>
        {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {stage ? "Guardar cambios" : "Crear etapa"}
      </Button>
    </form>
  );
}
