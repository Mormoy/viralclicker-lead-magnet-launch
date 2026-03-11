import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, FileText, TrendingUp, DollarSign, BarChart3, Target, Zap, Trophy, XCircle, AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, FunnelChart, Funnel, LabelList } from "recharts";
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import { RecentActivity } from "@/components/dashboard/recent-activity";

interface DealRow {
  id: string;
  name: string;
  company: string | null;
  value: number | null;
  stage: string;
  stage_id: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}

interface StageRow {
  id: string;
  name: string;
  stage_type: string;
  sort_order: number;
  color: string;
}

export default function DashboardHome() {
  const { tenantId, profile } = useAuth();
  const [stats, setStats] = useState({
    leads: 0, clients: 0, quotes: 0, deals: 0,
    totalValue: 0, wonValue: 0, avgQuote: 0, conversionRate: 0,
    wonDeals: 0, lostDeals: 0, winRate: 0,
  });
  const [sourceData, setSourceData] = useState<{ name: string; value: number }[]>([]);
  const [funnelData, setFunnelData] = useState<{ name: string; value: number; fill: string }[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; leads: number; value: number }[]>([]);
  const [allDeals, setAllDeals] = useState<DealRow[]>([]);
  const [allStages, setAllStages] = useState<StageRow[]>([]);
  const [staleDays, setStaleDays] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenantId) return;

    const fetchAll = async () => {
      const [leadsRes, clientsRes, quotesRes, dealsRes, stagesRes] = await Promise.all([
        supabase.from("leads").select("id, created_at", { count: "exact" }).eq("tenant_id", tenantId),
        supabase.from("clients").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId),
        supabase.from("quotes").select("id, total", { count: "exact" }).eq("tenant_id", tenantId),
        supabase.from("pipeline_deals").select("id, name, company, value, stage, stage_id, source, created_at, updated_at").eq("tenant_id", tenantId),
        supabase.from("pipeline_stages").select("id, name, stage_type, sort_order, color").eq("tenant_id", tenantId),
      ]);

      const leadsCount = leadsRes.count || 0;
      const clientsCount = clientsRes.count || 0;
      const quotesCount = quotesRes.count || 0;
      const deals = (dealsRes.data || []) as DealRow[];
      const quotesData = quotesRes.data || [];
      const stages = (stagesRes.data || []) as StageRow[];

      // Build stage type lookup
      const stageTypeMap: Record<string, string> = {};
      stages.forEach(s => { stageTypeMap[s.id] = s.stage_type || "normal"; });

      const totalValue = deals.reduce((a, d) => a + (d.value || 0), 0);
      
      // Use stage_type to determine won/lost
      const wonDeals = deals.filter(d => d.stage_id && stageTypeMap[d.stage_id] === "won");
      const lostDeals = deals.filter(d => d.stage_id && stageTypeMap[d.stage_id] === "lost");
      const wonValue = wonDeals.reduce((a, d) => a + (d.value || 0), 0);
      
      const avgQuote = quotesData.length > 0
        ? quotesData.reduce((a: number, q: any) => a + (Number(q.total) || 0), 0) / quotesData.length
        : 0;
      
      const decidedDeals = wonDeals.length + lostDeals.length;
      const winRate = decidedDeals > 0 ? Math.round((wonDeals.length / decidedDeals) * 100) : 0;
      const conversionRate = leadsCount > 0 ? Math.round((clientsCount / leadsCount) * 100) : 0;

      setStats({
        leads: leadsCount, clients: clientsCount, quotes: quotesCount,
        deals: deals.length, totalValue, wonValue, avgQuote, conversionRate,
        wonDeals: wonDeals.length, lostDeals: lostDeals.length, winRate,
      });

      // Source breakdown
      const srcMap: Record<string, number> = {};
      deals.forEach(d => {
        const src = d.source || "manual";
        srcMap[src] = (srcMap[src] || 0) + 1;
      });
      setSourceData(Object.entries(srcMap).map(([name, value]) => ({ name, value })));

      // Monthly leads (last 6 months)
      const months: Record<string, { leads: number; value: number }> = {};
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toLocaleDateString("es", { month: "short" });
        months[key] = { leads: 0, value: 0 };
      }
      (leadsRes.data || []).forEach((l: any) => {
        const d = new Date(l.created_at);
        const key = d.toLocaleDateString("es", { month: "short" });
        if (months[key]) months[key].leads++;
      });
      deals.forEach(d => {
        const dt = new Date(d.created_at);
        const key = dt.toLocaleDateString("es", { month: "short" });
        if (months[key]) months[key].value += (d.value || 0);
      });
      setMonthlyData(Object.entries(months).map(([month, data]) => ({ month, ...data })));

      // Funnel data: count deals per stage, ordered by sort_order
      const stagesData = (stagesRes.data || []) as StageRow[];
      setAllDeals(deals);
      setAllStages(stagesData);
      const allStages = stagesData;
      const stageCountMap: Record<string, number> = {};
      deals.forEach(d => {
        if (d.stage_id) stageCountMap[d.stage_id] = (stageCountMap[d.stage_id] || 0) + 1;
      });
      const FUNNEL_COLORS = ["hsl(25,100%,50%)", "hsl(30,90%,55%)", "hsl(35,85%,50%)", "hsl(200,80%,50%)", "hsl(150,70%,45%)", "hsl(280,60%,55%)", "hsl(45,90%,50%)", "hsl(0,70%,55%)"];
      const sortedStages = [...allStages].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      setFunnelData(
        sortedStages.map((s, i) => ({
          name: s.name,
          value: stageCountMap[s.id] || 0,
          fill: s.color || FUNNEL_COLORS[i % FUNNEL_COLORS.length],
        }))
      );

      setLoading(false);
    };

    fetchAll();
  }, [tenantId]);

  // Stale deals computation
  const stageNameMap = useMemo(() => {
    const m: Record<string, string> = {};
    allStages.forEach(s => { m[s.id] = s.name; });
    return m;
  }, [allStages]);

  const staleDeals = useMemo(() => {
    const now = new Date();
    const threshold = staleDays * 24 * 60 * 60 * 1000;
    // Exclude won/lost stages
    const terminalIds = new Set(allStages.filter(s => s.stage_type === "won" || s.stage_type === "lost").map(s => s.id));
    return allDeals
      .filter(d => {
        if (d.stage_id && terminalIds.has(d.stage_id)) return false;
        const elapsed = now.getTime() - new Date(d.updated_at).getTime();
        return elapsed > threshold;
      })
      .sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
  }, [allDeals, allStages, staleDays]);

  const PIE_COLORS = ["hsl(25, 100%, 50%)", "hsl(200, 80%, 50%)", "hsl(150, 70%, 45%)", "hsl(280, 60%, 55%)", "hsl(45, 90%, 50%)"];

  const metricCards = [
    { label: "Leads", value: stats.leads, icon: Users },
    { label: "Clientes", value: stats.clients, icon: UserCheck },
    { label: "Cotizaciones", value: stats.quotes, icon: FileText },
    { label: "Deals", value: stats.deals, icon: Target },
    { label: "Valor Total", value: `$${stats.totalValue.toLocaleString()}`, icon: DollarSign },
    { label: "Ventas Cerradas", value: `$${stats.wonValue.toLocaleString()}`, icon: TrendingUp },
    { label: "Win Rate", value: `${stats.winRate}%`, icon: Trophy, highlight: "green" },
    { label: "Ganados / Perdidos", value: `${stats.wonDeals} / ${stats.lostDeals}`, icon: Zap },
  ];

  return (
    <div className="space-y-6">
      {/* Onboarding Checklist */}
      <OnboardingChecklist />

      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido, {profile?.full_name}
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metricCards.map((card) => (
          <Card key={card.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">{card.label}</span>
                <card.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-xl font-bold text-foreground">{loading ? "—" : card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Leads & Revenue over time */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads y Valor por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25, 100%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(25, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: "hsl(0, 0%, 64%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(0, 0%, 64%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(0, 0%, 12%)", border: "1px solid hsl(0, 0%, 20%)", borderRadius: 8, color: "hsl(0, 0%, 96%)" }}
                  />
                  <Area type="monotone" dataKey="leads" stroke="hsl(25, 100%, 50%)" fill="url(#colorLeads)" strokeWidth={2} name="Leads" />
                  <Bar dataKey="value" fill="hsl(25, 100%, 50%)" opacity={0.4} radius={[4, 4, 0, 0]} name="Valor ($)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Leads by source */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads por Fuente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              {sourceData.length === 0 ? (
                <p className="text-muted-foreground text-sm">Sin datos aún</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceData.map((_, idx) => (
                        <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(0, 0%, 12%)", border: "1px solid hsl(0, 0%, 20%)", borderRadius: 8, color: "hsl(0, 0%, 96%)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Embudo de Ventas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {funnelData.length === 0 || funnelData.every(d => d.value === 0) ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">Sin deals en el pipeline aún</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(0, 0%, 12%)", border: "1px solid hsl(0, 0%, 20%)", borderRadius: 8, color: "hsl(0, 0%, 96%)" }}
                    formatter={(value: number, name: string) => [`${value} deals`, name]}
                  />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive
                  >
                    <LabelList position="right" fill="hsl(0, 0%, 80%)" stroke="none" dataKey="name" fontSize={12} />
                    <LabelList position="center" fill="hsl(0, 0%, 100%)" stroke="none" dataKey="value" fontSize={14} fontWeight="bold" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stale Deals Alerts */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Alertas de Inactividad
              {staleDeals.length > 0 && (
                <Badge variant="destructive" className="text-xs">{staleDeals.length}</Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Sin actividad por más de</span>
              <Select value={String(staleDays)} onValueChange={(v) => setStaleDays(Number(v))}>
                <SelectTrigger className="w-20 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 día</SelectItem>
                  <SelectItem value="2">2 días</SelectItem>
                  <SelectItem value="3">3 días</SelectItem>
                  <SelectItem value="5">5 días</SelectItem>
                  <SelectItem value="7">7 días</SelectItem>
                  <SelectItem value="14">14 días</SelectItem>
                  <SelectItem value="30">30 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {staleDeals.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm">🎉 No hay deals inactivos. ¡Todo al día!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {staleDeals.map((deal) => {
                const daysAgo = Math.floor((Date.now() - new Date(deal.updated_at).getTime()) / (1000 * 60 * 60 * 24));
                const stageName = deal.stage_id ? stageNameMap[deal.stage_id] : deal.stage;
                const severity = daysAgo >= 7 ? "destructive" : daysAgo >= 3 ? "secondary" : "outline";
                return (
                  <Link
                    key={deal.id}
                    to="/dashboard/pipeline"
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Clock className={`h-4 w-4 flex-shrink-0 ${daysAgo >= 7 ? "text-destructive" : daysAgo >= 3 ? "text-orange-400" : "text-yellow-400"}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{deal.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {deal.company ? `${deal.company} · ` : ""}{stageName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {deal.value ? (
                        <span className="text-xs text-muted-foreground">${Number(deal.value).toLocaleString()}</span>
                      ) : null}
                      <Badge variant={severity} className="text-xs whitespace-nowrap">
                        {daysAgo}d sin actividad
                      </Badge>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
