import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CustomersPage() {
  const { tenantId } = useAuth();
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    if (!tenantId) return;
    supabase
      .from("clients")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false })
      .then(({ data }) => setClients(data || []));
  }, [tenantId]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-4">Clientes</h1>
      {clients.length === 0 ? (
        <p className="text-muted-foreground">No tienes clientes todavía.</p>
      ) : (
        <div className="space-y-3">
          {clients.map((c) => (
            <Card key={c.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">{c.nombre}</div>
                <div className="text-sm text-muted-foreground">{c.empresa} · {c.plan}</div>
              </div>
              <Badge variant="secondary">{c.estado}</Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
