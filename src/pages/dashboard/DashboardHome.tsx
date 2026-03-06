import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Users, UserCheck, FileText, TrendingUp } from "lucide-react";

export default function DashboardHome() {
  const { tenantId, profile } = useAuth();
  const [stats, setStats] = useState({ leads: 0, clients: 0, quotes: 0 });

  useEffect(() => {
    if (!tenantId) return;

    const fetchStats = async () => {
      const [leadsRes, clientsRes, quotesRes] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId),
        supabase.from("clients").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId),
        supabase.from("cotizaciones").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId),
      ]);

      setStats({
        leads: leadsRes.count || 0,
        clients: clientsRes.count || 0,
        quotes: quotesRes.count || 0,
      });
    };

    fetchStats();
  }, [tenantId]);

  const cards = [
    { label: "Leads", value: stats.leads, icon: Users, color: "text-blue-500" },
    { label: "Clientes", value: stats.clients, icon: UserCheck, color: "text-green-500" },
    { label: "Cotizaciones", value: stats.quotes, icon: FileText, color: "text-amber-500" },
    { label: "MRR", value: "$0", icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Bienvenido, {profile?.full_name}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
