import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, TrendingUp, Target } from "lucide-react";
import type { Deal, StageConfig } from "./types";

interface PipelineSummaryProps {
  deals: Deal[];
  stages: StageConfig[];
  dealsByStage: Record<string, Deal[]>;
  getStageForDeal: (deal: Deal) => StageConfig | undefined;
}

export function PipelineSummary({ deals, stages, dealsByStage, getStageForDeal }: PipelineSummaryProps) {
  const activeDeals = deals.filter(d => {
    const st = getStageForDeal(d);
    return st?.stage_type === 'normal';
  });
  const wonDeals = deals.filter(d => getStageForDeal(d)?.stage_type === 'won');
  const lostDeals = deals.filter(d => getStageForDeal(d)?.stage_type === 'lost');
  const totalValue = activeDeals.reduce((sum, d) => sum + (d.value || 0), 0);
  const wonValue = wonDeals.reduce((sum, d) => sum + (d.final_value || d.value || 0), 0);
  const totalFinalized = wonDeals.length + lostDeals.length;
  const conversionRate = totalFinalized > 0 ? Math.round((wonDeals.length / totalFinalized) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* KPI cards */}
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
              <div className="p-2 rounded-lg" style={{ background: 'hsl(152 69% 40% / 0.1)' }}>
                <DollarSign className="h-4 w-4" style={{ color: 'hsl(152 69% 40%)' }} />
              </div>
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
              <div className="p-2 rounded-lg" style={{ background: 'hsl(152 76% 40% / 0.1)' }}>
                <TrendingUp className="h-4 w-4" style={{ color: 'hsl(152 76% 40%)' }} />
              </div>
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
              <div className="p-2 rounded-lg" style={{ background: 'hsl(217 91% 60% / 0.1)' }}>
                <Target className="h-4 w-4" style={{ color: 'hsl(217 91% 60%)' }} />
              </div>
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
              <div key={s.id} className="flex items-center gap-2 border rounded-xl px-3 py-2 min-w-[90px] transition-all hover:shadow-sm bg-card">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ background: `${s.color}20` }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-bold leading-tight">{count}</div>
                  <div className="text-[9px] text-muted-foreground leading-tight truncate">{s.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
