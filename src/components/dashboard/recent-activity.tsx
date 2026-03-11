import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, UserPlus, Eye, ArrowRightLeft, FileText } from "lucide-react";

interface ActivityEvent {
  id: string;
  type: string;
  description: string;
  time: string;
}

export function RecentActivity() {
  const { tenantId } = useAuth();
  const [events, setEvents] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    if (!tenantId) return;

    const fetchEvents = async () => {
      const results: ActivityEvent[] = [];

      // Recent deals (new leads)
      const { data: deals } = await supabase
        .from("pipeline_deals")
        .select("id, name, created_at")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: false })
        .limit(5);
      
      (deals || []).forEach((d: any) => {
        results.push({
          id: `deal-${d.id}`,
          type: "new_lead",
          description: `Nuevo lead: ${d.name}`,
          time: d.created_at,
        });
      });

      // Recent quote views
      const { data: quotes } = await supabase
        .from("quotes")
        .select("id, customer_name, viewed_at, status")
        .eq("tenant_id", tenantId)
        .not("viewed_at", "is", null)
        .order("viewed_at", { ascending: false })
        .limit(5);
      
      (quotes || []).forEach((q: any) => {
        results.push({
          id: `quote-${q.id}`,
          type: "quote_viewed",
          description: `Cotización vista por ${q.customer_name}`,
          time: q.viewed_at,
        });
      });

      // Recent deal activity (stage changes)
      const { data: activity } = await supabase
        .from("deal_activity")
        .select("id, description, created_at, type")
        .eq("tenant_id", tenantId)
        .eq("type", "stage_change")
        .order("created_at", { ascending: false })
        .limit(5);
      
      (activity || []).forEach((a: any) => {
        results.push({
          id: `act-${a.id}`,
          type: "stage_change",
          description: a.description,
          time: a.created_at,
        });
      });

      // Sort by time and take top 5
      results.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setEvents(results.slice(0, 5));
    };

    fetchEvents();
  }, [tenantId]);

  if (events.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "new_lead": return <UserPlus className="w-4 h-4 text-green-500" />;
      case "quote_viewed": return <Eye className="w-4 h-4 text-blue-400" />;
      case "stage_change": return <ArrowRightLeft className="w-4 h-4 text-primary" />;
      default: return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map(e => (
            <div key={e.id} className="flex items-center gap-3">
              {getIcon(e.type)}
              <span className="text-sm text-foreground flex-1 truncate">{e.description}</span>
              <span className="text-xs text-muted-foreground flex-shrink-0">{timeAgo(e.time)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
