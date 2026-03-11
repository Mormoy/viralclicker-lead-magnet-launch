import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, Upload, Key, CreditCard, Calendar, Shield, Loader2, Check, Camera } from "lucide-react";
import { toast } from "sonner";
import { WhatsAppTemplatesSettings } from "@/components/dashboard/whatsapp-templates-settings";
import { WhatsAppAutomationsSettings } from "@/components/dashboard/whatsapp-automations-settings";

interface TenantInfo {
  id: string;
  name: string;
  plan: string;
  status: string;
  logo_url: string | null;
  created_at: string;
  slug: string | null;
}

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  starter: { label: "Starter — $99/mes", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  pro: { label: "Pro — $249/mes", color: "bg-primary/20 text-primary border-primary/30" },
  elite: { label: "Elite — $449/mes", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

const PLAN_OPTIONS = [
  { value: "starter", label: "Starter", price: "$99/mes", features: ["1 Smart Quote Page", "Hasta 10 servicios", "CRM básico"] },
  { value: "pro", label: "Pro", price: "$249/mes", features: ["Hasta 3 Smart Quote Pages", "Variables de cotización", "Stripe integrado"] },
  { value: "elite", label: "Elite", price: "$449/mes", features: ["Hasta 5 Smart Quote Pages", "Reglas avanzadas de precios", "Integraciones ERP"] },
];

export default function SettingsPage() {
  const { user, tenantId, profile, refreshProfile } = useAuth();
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  // Password change
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [changingPassword, setChangingPassword] = useState(false);

  // Logo upload
  const [uploading, setUploading] = useState(false);

  // Plan change
  const [changingPlan, setChangingPlan] = useState(false);

  useEffect(() => {
    if (!tenantId) return;
    supabase
      .from("tenants")
      .select("id, name, plan, status, logo_url, created_at, slug")
      .eq("id", tenantId)
      .single()
      .then(({ data }) => {
        if (data) setTenant(data as TenantInfo);
        setLoading(false);
      });
  }, [tenantId]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !tenantId) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten imágenes");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Máximo 2MB");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${tenantId}/logo.${ext}`;

    const { error: uploadError } = await supabase.storage.from("logos").upload(path, file, { upsert: true });
    if (uploadError) {
      toast.error("Error al subir logo");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("logos").getPublicUrl(path);
    const logoUrl = urlData.publicUrl + "?t=" + Date.now();

    const { error: updateError } = await supabase.from("tenants").update({ logo_url: logoUrl }).eq("id", tenantId);
    if (updateError) {
      toast.error("Error al guardar logo");
    } else {
      setTenant(prev => prev ? { ...prev, logo_url: logoUrl } : null);
      toast.success("Logo actualizado");
    }
    setUploading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: passwords.newPassword });
    setChangingPassword(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Contraseña actualizada");
      setPasswords({ newPassword: "", confirmPassword: "" });
    }
  };

  const handlePlanChange = async (newPlan: string) => {
    if (!tenantId || !tenant || tenant.plan === newPlan) return;
    setChangingPlan(true);
    const { error } = await supabase.from("tenants").update({ plan: newPlan }).eq("id", tenantId);
    setChangingPlan(false);
    if (error) toast.error("Error al cambiar plan");
    else {
      setTenant(prev => prev ? { ...prev, plan: newPlan } : null);
      toast.success(`Plan cambiado a ${newPlan.charAt(0).toUpperCase() + newPlan.slice(1)}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const planInfo = PLAN_LABELS[tenant?.plan || "starter"] || PLAN_LABELS.starter;
  const memberSince = tenant?.created_at
    ? new Date(tenant.created_at).toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground">Gestiona tu empresa, plan y seguridad</p>
      </div>

      {/* Company & Logo */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div
                className="w-20 h-20 rounded-xl border-2 border-border bg-secondary flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                {tenant?.logo_url ? (
                  <img src={tenant.logo_url} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  {uploading ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Camera className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
                disabled={uploading}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <Label className="text-xs text-muted-foreground">Nombre de empresa</Label>
                <p className="text-foreground font-medium">{tenant?.name || "—"}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Slug</Label>
                <p className="text-muted-foreground text-sm">{tenant?.slug || "—"}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Haz clic en el logo para cambiarlo (max 2MB, formatos: JPG, PNG, SVG)</p>
        </CardContent>
      </Card>

      {/* Plan Info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Plan y Facturación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-xs text-muted-foreground">Plan actual</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${planInfo.color} border`}>
                  {planInfo.label}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {tenant?.status === "active" ? "Activo" : tenant?.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Label className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                <Calendar className="w-3 h-3" /> Miembro desde
              </Label>
              <p className="text-sm text-foreground">{memberSince}</p>
            </div>
          </div>

          <Separator className="bg-border" />

          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Cambiar plan</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PLAN_OPTIONS.map((plan) => {
                const isCurrent = tenant?.plan === plan.value;
                return (
                  <div
                    key={plan.value}
                    className={`rounded-lg border p-4 transition-all ${
                      isCurrent
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground text-sm">{plan.label}</span>
                      {isCurrent && <Check className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-primary font-bold text-lg mb-2">{plan.price}</p>
                    <ul className="space-y-1 mb-3">
                      {plan.features.map((f) => (
                        <li key={f} className="text-xs text-muted-foreground">• {f}</li>
                      ))}
                    </ul>
                    {!isCurrent && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                        disabled={changingPlan}
                        onClick={() => handlePlanChange(plan.value)}
                      >
                        {changingPlan ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                        Cambiar a {plan.label}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Seguridad
          </CardTitle>
          <CardDescription>Cambiar contraseña de acceso</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
            <div>
              <Label className="text-xs text-muted-foreground">Email de acceso</Label>
              <p className="text-sm text-foreground">{user?.email}</p>
            </div>
            <div>
              <Label>Nueva contraseña</Label>
              <Input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords(p => ({ ...p, newPassword: e.target.value }))}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <Label>Confirmar contraseña</Label>
              <Input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Repetir contraseña"
              />
            </div>
            <Button type="submit" disabled={changingPassword || !passwords.newPassword}>
              {changingPassword ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Key className="w-4 h-4 mr-2" />}
              Cambiar contraseña
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* WhatsApp Templates */}
      <WhatsAppTemplatesSettings />

      {/* WhatsApp Automations */}
      <WhatsAppAutomationsSettings />
    </div>
  );
}
