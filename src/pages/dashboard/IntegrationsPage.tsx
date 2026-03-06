import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

export default function IntegrationsPage() {
  const { tenantId } = useAuth();
  const [settings, setSettings] = useState({
    webhook_n8n_url: "",
    calendly_url: "",
    contract_url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tenantId) return;
    supabase
      .from("integrations_settings")
      .select("*")
      .eq("id", tenantId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setSettings({
            webhook_n8n_url: data.webhook_n8n_url || "",
            calendly_url: data.calendly_url || "",
            contract_url: data.contract_url || "",
          });
        }
      });
  }, [tenantId]);

  const handleSave = async () => {
    if (!tenantId) return;
    setLoading(true);
    const { error } = await supabase
      .from("integrations_settings")
      .upsert({ id: tenantId, ...settings });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Guardado", description: "Integraciones actualizadas." });
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-4">Integraciones</h1>
      <Card className="p-6 space-y-4 max-w-lg">
        <div className="space-y-2">
          <Label>Webhook n8n URL</Label>
          <Input
            value={settings.webhook_n8n_url}
            onChange={(e) => setSettings((s) => ({ ...s, webhook_n8n_url: e.target.value }))}
            placeholder="https://n8n.example.com/webhook/..."
          />
        </div>
        <div className="space-y-2">
          <Label>Calendly URL</Label>
          <Input
            value={settings.calendly_url}
            onChange={(e) => setSettings((s) => ({ ...s, calendly_url: e.target.value }))}
            placeholder="https://calendly.com/..."
          />
        </div>
        <div className="space-y-2">
          <Label>Contract URL</Label>
          <Input
            value={settings.contract_url}
            onChange={(e) => setSettings((s) => ({ ...s, contract_url: e.target.value }))}
            placeholder="https://..."
          />
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Guardar
        </Button>
      </Card>
    </div>
  );
}
