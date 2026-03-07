import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, FileText, TrendingUp, DollarSign, BarChart3, Target, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

interface DealRow {
  value: number | null;
  stage: string;
  source: string | null;
  created_at: string;
}

export default function DashboardHome() {
  const { tenantId, profile } = useAuth();
  const [stats, setStats] = useState({
    leads: 0, clients: 0, quotes: 0, deals: 0,
    totalValue: 0, wonValue: 0, avgQuote: 0, conversionRate: 0,
  });
  const [sourceData, setSourceData] = useState<{ name: string; value: number }[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; leads: number; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenantId) return;

    const fetchAll = async () => {
      const [leadsRes, clientsRes, quotesRes, dealsRes] = await Promise.all([
        supabase.from("leads").select("id, created_at", { count: "exact" }).eq("tenant_id", tenantId),
        supabase.from("clients").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId),
        supabase.from("quotes").select("id, total", { count: "exact" }).eq("tenant_id", tenantId),
        supabase.from("pipeline_deals").select("value, stage, source, created_at").eq("tenant_id", tenantId),
      ]);

      const leadsCount = leadsRes.count || 0;
      const clientsCount = clientsRes.count || 0;
      const quotesCount = quotesRes.count || 0;
      const deals = (dealsRes.data || []) as DealRow[];
      const quotesData = quotesRes.data || [];

      const totalValue = deals.reduce((a, d) => a + (d.value || 0), 0);
      const wonDeals = deals.filter(d => d.stage === "payment_received" || d.stage === "active_customer");
      const wonValue = wonDeals.reduce((a, d) => a + (d.value || 0), 0);
      const avgQuote = quotesData.length > 0
        ? quotesData.reduce((a: number, q: any) => a + (Number(q.total) || 0), 0) / quotesData.length
        : 0;
      const conversionRate = leadsCount > 0 ? Math.round((clientsCount / leadsCount) * 100) : 0;

      setStats({
        leads: leadsCount, clients: clientsCount, quotes: quotesCount,
        deals: deals.length, totalValue, wonValue, avgQuote, conversionRate,
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

      setLoading(false);
    };

    fetchAll();
  }, [tenantId]);

  const PIE_COLORS = ["hsl(25, 100%, 50%)", "hsl(200, 80%, 50%)", "hsl(150, 70%, 45%)", "hsl(280, 60%, 55%)", "hsl(45, 90%, 50%)"];

  const metricCards = [
    { label: "Leads", value: stats.leads, icon: Users, trend: null },
    { label: "Clientes", value: stats.clients, icon: UserCheck, trend: null },
    { label: "Cotizaciones", value: stats.quotes, icon: FileText, trend: null },
    { label: "Deals", value: stats.deals, icon: Target, trend: null },
    { label: "Valor Total", value: `$${stats.totalValue.toLocaleString()}`, icon: DollarSign, trend: null },
    { label: "Ventas Cerradas", value: `$${stats.wonValue.toLocaleString()}`, icon: TrendingUp, trend: null },
    { label: "Promedio Cotización", value: `$${Math.round(stats.avgQuote).toLocaleString()}`, icon: BarChart3, trend: null },
    { label: "Tasa Conversión", value: `${stats.conversionRate}%`, icon: Zap, trend: null },
  ];

  return (
    <div className="space-y-6">
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
    </div>
  );
}
