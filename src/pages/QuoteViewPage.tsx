import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageCircle, Check, Clock, Eye, Send, FileText, Zap } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: "Borrador", color: "bg-muted text-muted-foreground", icon: FileText },
  sent: { label: "Enviada", color: "bg-blue-500/10 text-blue-600", icon: Send },
  viewed: { label: "Vista", color: "bg-yellow-500/10 text-yellow-600", icon: Eye },
  accepted: { label: "Aceptada", color: "bg-green-500/10 text-green-600", icon: Check },
  expired: { label: "Expirada", color: "bg-muted text-muted-foreground", icon: Clock },
  converted: { label: "Convertida", color: "bg-primary/10 text-primary", icon: Check },
  rejected: { label: "Rechazada", color: "bg-destructive/10 text-destructive", icon: Clock },
};

export default function QuoteViewPage() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [quote, setQuote] = useState<any>(null);
  const [lineItems, setLineItems] = useState<any[]>([]);
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (shortCode) loadQuote();
  }, [shortCode]);

  const loadQuote = async () => {
    const { data: quoteData } = await supabase
      .from("quotes")
      .select("*")
      .eq("short_code", shortCode!)
      .maybeSingle();

    if (!quoteData) { setNotFound(true); setLoading(false); return; }
    setQuote(quoteData);

    // Mark as viewed
    if ((quoteData as any).status === "sent") {
      await supabase.from("quotes").update({ status: "viewed" as any, viewed_at: new Date().toISOString() }).eq("id", (quoteData as any).id);
      await supabase.from("quote_activity").insert({
        quote_id: (quoteData as any).id,
        type: "viewed",
        description: "Cotización vista por el cliente",
        old_status: "sent" as any,
        new_status: "viewed" as any,
      });
    }

    // Load line items and tenant
    const [itemsRes, tenantRes] = await Promise.all([
      supabase.from("quote_line_items").select("*").eq("quote_id", (quoteData as any).id).order("sort_order"),
      supabase.from("tenants").select("name").eq("id", (quoteData as any).tenant_id).maybeSingle(),
    ]);
    setLineItems((itemsRes.data as any[]) || []);
    setTenant(tenantRes.data);
    setLoading(false);
  };

  const acceptQuote = async () => {
    if (!quote) return;
    await supabase.from("quotes").update({ status: "accepted" as any, accepted_at: new Date().toISOString() }).eq("id", quote.id);
    await supabase.from("quote_activity").insert({
      quote_id: quote.id,
      type: "accepted",
      description: "Cotización aceptada por el cliente",
      old_status: quote.status as any,
      new_status: "accepted" as any,
    });
    setQuote({ ...quote, status: "accepted" });
    toast.success("¡Cotización aceptada!");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-pulse text-muted-foreground">Cargando cotización...</div></div>;
  if (notFound) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">Cotización no encontrada</h1><p className="text-muted-foreground">El código de cotización no es válido.</p></div></div>;

  const sc = statusConfig[quote.status] || statusConfig.draft;
  const StatusIcon = sc.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-1"><Zap className="h-5 w-5" /><span className="text-sm font-medium opacity-80">{tenant?.name || "ViralClicker"}</span></div>
          <h1 className="text-2xl font-bold">Cotización #{quote.short_code}</h1>
          <p className="text-sm opacity-80 mt-1">Para: {quote.customer_name}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Status */}
        <div className="flex items-center justify-between">
          <Badge className={`${sc.color} gap-1 text-sm px-3 py-1`}><StatusIcon className="h-4 w-4" />{sc.label}</Badge>
          <span className="text-sm text-muted-foreground">{new Date(quote.created_at).toLocaleDateString()}</span>
        </div>

        {/* Contact info */}
        <Card>
          <CardContent className="p-4 grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-muted-foreground">Nombre</span><p className="font-medium">{quote.customer_name}</p></div>
            {quote.customer_company && <div><span className="text-muted-foreground">Empresa</span><p className="font-medium">{quote.customer_company}</p></div>}
            <div><span className="text-muted-foreground">Teléfono</span><p className="font-medium">{quote.customer_phone}</p></div>
            {quote.customer_email && <div><span className="text-muted-foreground">Email</span><p className="font-medium">{quote.customer_email}</p></div>}
            {quote.customer_city && <div><span className="text-muted-foreground">Ciudad</span><p className="font-medium">{quote.customer_city}</p></div>}
          </CardContent>
        </Card>

        {/* Line items */}
        <Card>
          <CardHeader><CardTitle className="text-base">Detalle de cotización</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {lineItems.map((item) => (
              <div key={item.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.service_name}</p>
                    {Object.keys(item.variables || {}).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Object.entries(item.variables).map(([k, v]) => (
                          <Badge key={k} variant="outline" className="text-xs">{k}: {String(v)}</Badge>
                        ))}
                      </div>
                    )}
                    {(item.extras as any[])?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(item.extras as any[]).map((e: any, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs">+ {e.name}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">${item.line_total.toLocaleString()}</p>
                    {item.quantity > 1 && <p className="text-xs text-muted-foreground">${item.unit_price.toLocaleString()} x{item.quantity}</p>}
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-1 pt-3 border-t border-border">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>${quote.subtotal.toLocaleString()}</span></div>
              {quote.extras_total > 0 && <div className="flex justify-between text-sm"><span>Extras</span><span>+${quote.extras_total.toLocaleString()}</span></div>}
              {quote.discount_amount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Descuento{quote.discount_label && ` (${quote.discount_label})`}</span><span>-${quote.discount_amount.toLocaleString()}</span></div>}
              {quote.delivery_fee > 0 && <div className="flex justify-between text-sm"><span>Envío/Instalación</span><span>+${quote.delivery_fee.toLocaleString()}</span></div>}
              <div className="flex justify-between font-bold text-xl pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">${quote.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          {quote.status !== "accepted" && quote.status !== "converted" && (
            <Button className="w-full" size="lg" onClick={acceptQuote}>
              <Check className="h-5 w-5 mr-2" /> Aceptar cotización
            </Button>
          )}
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
            onClick={() => {
              const msg = encodeURIComponent(`Hola, tengo la cotización #${quote.short_code} por $${quote.total.toLocaleString()} y quiero confirmar los detalles.`);
              window.open(`https://wa.me/${quote.customer_phone?.replace(/\D/g, "")}?text=${msg}`, "_blank");
            }}
          >
            <MessageCircle className="h-5 w-5 mr-2" /> Contactar por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
