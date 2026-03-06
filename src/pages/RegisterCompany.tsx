import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, Building2, Zap, Check } from "lucide-react";

const plans = [
  { id: "starter", name: "Starter", price: "$99/mes", features: ["CRM Pipeline", "Leads", "Smart Quotes"] },
  { id: "pro", name: "Pro", price: "$249/mes", features: ["Todo en Starter", "WhatsApp Integration", "Stripe Payments"] },
  { id: "elite", name: "Elite", price: "$449/mes", features: ["Todo en Pro", "Custom Automations", "Priority Support"] },
];

export default function RegisterCompany() {
  const { user, refreshProfile } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.rpc("register_company", {
        _company_name: companyName,
        _plan: selectedPlan,
      });

      if (error) throw error;

      await refreshProfile();
      toast({ title: "¡Empresa registrada!", description: "Tu workspace está listo." });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">ViralClicker</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Registra tu empresa</h1>
          <p className="text-muted-foreground mt-1">Configura tu workspace empresarial</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre de la empresa</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Mi Empresa S.A."
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Selecciona tu plan</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="font-semibold text-foreground">{plan.name}</div>
                  <div className="text-primary font-bold mt-1">{plan.price}</div>
                  <ul className="mt-3 space-y-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Check className="h-3 w-3 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Crear workspace
          </Button>
        </form>
      </div>
    </div>
  );
}
