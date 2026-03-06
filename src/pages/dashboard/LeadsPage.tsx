import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LeadsPage() {
  const { tenantId } = useAuth();
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    if (!tenantId) return;
    supabase
      .from("leads")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false })
      .then(({ data }) => setLeads(data || []));
  }, [tenantId]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-4">Leads</h1>
      {leads.length === 0 ? (
        <p className="text-muted-foreground">No tienes leads todavía.</p>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <Card key={lead.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">{lead.nombre}</div>
                <div className="text-sm text-muted-foreground">{lead.empresa} · {lead.correo}</div>
              </div>
              <Badge variant="secondary">{lead.estado}</Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
