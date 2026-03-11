import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, X, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

interface OnboardingProgress {
  id: string;
  step_company: boolean;
  step_quote_page: boolean;
  step_templates: boolean;
  step_first_lead: boolean;
  step_integrations: boolean;
  dismissed: boolean;
}

export function OnboardingChecklist() {
  const { tenantId } = useAuth();
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!tenantId) return;

    // Get or create onboarding progress
    let { data } = await supabase
      .from("onboarding_progress")
      .select("*")
      .eq("tenant_id", tenantId)
      .maybeSingle();

    if (!data) {
      const { data: created } = await supabase
        .from("onboarding_progress")
        .insert({ tenant_id: tenantId })
        .select()
        .single();
      data = created;
    }

    if (data) {
      setProgress(data as OnboardingProgress);
      // Auto-check steps
      await autoCheck(data as OnboardingProgress);
    }
    setLoading(false);
  }, [tenantId]);

  const autoCheck = async (prog: OnboardingProgress) => {
    if (!tenantId) return;
    const updates: Partial<OnboardingProgress> = {};

    // Check company (has logo)
    if (!prog.step_company) {
      const { data: t } = await supabase.from("tenants").select("logo_url").eq("id", tenantId).single();
      if (t?.logo_url) updates.step_company = true;
    }

    // Check quote page
    if (!prog.step_quote_page) {
      const { count } = await supabase.from("quote_pages").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId);
      if ((count || 0) > 0) updates.step_quote_page = true;
    }

    // Check templates
    if (!prog.step_templates) {
      const { count } = await supabase.from("whatsapp_templates").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId);
      if ((count || 0) > 0) updates.step_templates = true;
    }

    // Check leads
    if (!prog.step_first_lead) {
      const { count } = await supabase.from("pipeline_deals").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId);
      if ((count || 0) > 0) updates.step_first_lead = true;
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from("onboarding_progress").update(updates).eq("tenant_id", tenantId);
      setProgress(prev => prev ? { ...prev, ...updates } : prev);
    }
  };

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  const handleDismiss = async () => {
    if (!tenantId) return;
    await supabase.from("onboarding_progress").update({ dismissed: true }).eq("tenant_id", tenantId);
    setHidden(true);
  };

  if (loading || hidden || !progress || progress.dismissed) return null;

  const steps = [
    { key: "step_company" as const, label: "Configura tu empresa (nombre y logo)", href: "/dashboard/settings" },
    { key: "step_quote_page" as const, label: "Crea tu primera página de cotización", href: "/dashboard/quote-builder" },
    { key: "step_templates" as const, label: "Configura plantillas de WhatsApp", href: "/dashboard/settings" },
    { key: "step_first_lead" as const, label: "Agrega tu primer lead", href: "/dashboard/pipeline" },
    { key: "step_integrations" as const, label: "Conecta WhatsApp e integraciones", href: "/dashboard/integrations" },
  ];

  const completed = steps.filter(s => progress[s.key]).length;
  const allDone = completed === steps.length;

  if (allDone) return null;

  return (
    <Card className="bg-card border-primary/30 border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            ¡Bienvenido! Configura tu workspace
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={handleDismiss}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{completed} de {steps.length} pasos completados</p>
        <div className="w-full bg-muted rounded-full h-1.5 mt-2">
          <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${(completed / steps.length) * 100}%` }} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {steps.map(step => {
          const done = progress[step.key];
          return (
            <Link
              key={step.key}
              to={step.href}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                done
                  ? "border-green-500/20 bg-green-500/5 text-green-400"
                  : "border-border hover:bg-muted/50 text-foreground"
              }`}
            >
              {done ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
              <span className={`text-sm ${done ? "line-through" : ""}`}>{step.label}</span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
