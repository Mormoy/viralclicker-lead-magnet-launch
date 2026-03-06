import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MessageCircle, Plus, Minus, Trash2, ShoppingCart, ArrowRight, Check, Zap } from "lucide-react";

interface QuotePage { id: string; tenant_id: string; title: string; slug: string; description: string | null; thank_you_message: string | null; whatsapp_cta_text: string | null; }
interface Category { id: string; name: string; }
interface Service { id: string; category_id: string | null; name: string; description: string | null; pricing_model: string; base_price: number; price_formula: string | null; }
interface Variable { id: string; service_id: string; name: string; label: string; type: string; options: any[]; is_required: boolean; affects_price: boolean; }
interface Extra { id: string; service_id: string; name: string; description: string | null; price: number; is_percentage: boolean; }

interface CartItem {
  service: Service;
  quantity: number;
  selectedVariables: Record<string, any>;
  selectedExtras: string[];
  unitPrice: number;
  extrasTotal: number;
  lineTotal: number;
}

export default function SmartQuotePage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<QuotePage | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // State
  const [step, setStep] = useState<"select" | "configure" | "contact" | "result">("select");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeVars, setActiveVars] = useState<Record<string, any>>({});
  const [activeExtras, setActiveExtras] = useState<string[]>([]);
  const [activeQty, setActiveQty] = useState(1);

  // Contact
  const [contact, setContact] = useState({ name: "", company: "", phone: "", email: "", city: "", notes: "" });

  // Result
  const [quoteResult, setQuoteResult] = useState<{ short_code: string; total: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Tenant phone for WhatsApp
  const [tenantPhone, setTenantPhone] = useState("");

  useEffect(() => {
    if (slug) loadPage();
  }, [slug]);

  const loadPage = async () => {
    const { data: pageData } = await supabase.from("quote_pages").select("*").eq("slug", slug!).eq("is_active", true).maybeSingle();
    if (!pageData) { setNotFound(true); setLoading(false); return; }
    setPage(pageData as any);

    // Load related data
    const tenantId = (pageData as any).tenant_id;
    const [catsRes, svcsRes] = await Promise.all([
      supabase.from("quote_service_categories").select("*").eq("tenant_id", tenantId).eq("is_active", true).order("sort_order"),
      supabase.from("quote_services").select("*").eq("tenant_id", tenantId).eq("is_active", true).order("sort_order"),
    ]);
    setCategories((catsRes.data as any[]) || []);
    setServices((svcsRes.data as any[]) || []);

    const svcIds = (svcsRes.data as any[])?.map((s: any) => s.id) || [];
    if (svcIds.length > 0) {
      const [varsRes, extrasRes] = await Promise.all([
        supabase.from("quote_service_variables").select("*").in("service_id", svcIds).order("sort_order"),
        supabase.from("quote_service_extras").select("*").in("service_id", svcIds).eq("is_active", true).order("sort_order"),
      ]);
      setVariables((varsRes.data as any[]) || []);
      setExtras((extrasRes.data as any[]) || []);
    }
    setLoading(false);
  };

  const calculatePrice = (service: Service, vars: Record<string, any>, selectedExtras: string[], qty: number) => {
    let unitPrice = service.base_price;

    // Add price modifiers from variables
    const svcVars = variables.filter((v) => v.service_id === service.id);
    for (const v of svcVars) {
      if (v.affects_price && v.type === "select" && vars[v.name]) {
        const opt = v.options?.find((o: any) => o.value === vars[v.name]);
        if (opt?.price_modifier) unitPrice += Number(opt.price_modifier);
      }
      if (v.affects_price && v.type === "number" && vars[v.name]) {
        // For formula-based pricing
        if (service.pricing_model === "formula" && service.price_formula) {
          // Will be handled below
        }
      }
    }

    // Formula pricing
    if (service.pricing_model === "formula" && service.price_formula) {
      try {
        let formula = service.price_formula;
        for (const [key, val] of Object.entries(vars)) {
          formula = formula.replace(new RegExp(key, "g"), String(Number(val) || 0));
        }
        unitPrice = Function(`"use strict"; return (${formula})`)();
      } catch { /* keep base price */ }
    }

    // Per quantity
    if (service.pricing_model === "per_quantity") {
      unitPrice = service.base_price;
    }

    // Calculate extras
    let extrasTotal = 0;
    const svcExtras = extras.filter((e) => e.service_id === service.id);
    for (const eid of selectedExtras) {
      const extra = svcExtras.find((e) => e.id === eid);
      if (extra) {
        extrasTotal += extra.is_percentage ? (unitPrice * extra.price / 100) : extra.price;
      }
    }

    const lineTotal = (unitPrice + extrasTotal) * qty;
    return { unitPrice, extrasTotal, lineTotal };
  };

  const addToCart = () => {
    if (!activeService) return;
    const { unitPrice, extrasTotal, lineTotal } = calculatePrice(activeService, activeVars, activeExtras, activeQty);
    setCart([...cart, {
      service: activeService,
      quantity: activeQty,
      selectedVariables: { ...activeVars },
      selectedExtras: [...activeExtras],
      unitPrice,
      extrasTotal,
      lineTotal,
    }]);
    setActiveService(null);
    setActiveVars({});
    setActiveExtras([]);
    setActiveQty(1);
    setStep("select");
    toast.success("Agregado a la cotización");
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.lineTotal, 0), [cart]);

  const submitQuote = async () => {
    if (!page || cart.length === 0) return;
    setSubmitting(true);

    // Generate short code
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let shortCode = "";
    for (let i = 0; i < 8; i++) shortCode += chars[Math.floor(Math.random() * chars.length)];

    const subtotal = cart.reduce((s, item) => s + item.unitPrice * item.quantity, 0);
    const extrasTotal = cart.reduce((s, item) => s + item.extrasTotal * item.quantity, 0);

    // Insert quote
    const { data: quoteData, error: quoteError } = await supabase.from("quotes").insert({
      tenant_id: page.tenant_id,
      quote_page_id: page.id,
      short_code: shortCode,
      status: "sent" as any,
      customer_name: contact.name,
      customer_company: contact.company || null,
      customer_phone: contact.phone,
      customer_email: contact.email || null,
      customer_city: contact.city || null,
      customer_notes: contact.notes || null,
      subtotal,
      extras_total: extrasTotal,
      discount_amount: 0,
      delivery_fee: 0,
      total: cartTotal,
    }).select("id, short_code").single();

    if (quoteError) { toast.error(quoteError.message); setSubmitting(false); return; }

    // Insert line items
    const lineItems = cart.map((item, i) => ({
      quote_id: (quoteData as any).id,
      service_id: item.service.id,
      service_name: item.service.name,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      variables: item.selectedVariables,
      extras: item.selectedExtras.map((eid) => {
        const e = extras.find((ex) => ex.id === eid);
        return e ? { id: e.id, name: e.name, price: e.price } : null;
      }).filter(Boolean),
      extras_total: item.extrasTotal,
      line_total: item.lineTotal,
      sort_order: i,
    }));

    await supabase.from("quote_line_items").insert(lineItems);

    // Insert activity
    await supabase.from("quote_activity").insert({
      quote_id: (quoteData as any).id,
      type: "created",
      description: `Cotización creada desde ${page.title}`,
      new_status: "sent" as any,
    });

    setQuoteResult({ short_code: (quoteData as any).short_code, total: cartTotal });
    setStep("result");
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Cargando cotizador...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Página no encontrada</h1>
          <p className="text-muted-foreground">Esta página de cotización no existe o no está activa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-5 w-5" />
            <span className="text-sm font-medium opacity-80">ViralClicker</span>
          </div>
          <h1 className="text-2xl font-bold">{page?.title}</h1>
          {page?.description && <p className="text-sm opacity-80 mt-1">{page.description}</p>}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Cart summary floating */}
        {cart.length > 0 && step !== "result" && (
          <div className="mb-4 bg-accent/50 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{cart.length} item(s)</span>
              <span className="text-sm font-bold text-foreground">${cartTotal.toLocaleString()}</span>
            </div>
            {step === "select" && (
              <Button size="sm" onClick={() => setStep("contact")}>
                Continuar <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        )}

        {/* ===== STEP: SELECT SERVICE ===== */}
        {step === "select" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Selecciona un servicio</h2>

            {/* Cart items */}
            {cart.length > 0 && (
              <div className="space-y-2 mb-4">
                {cart.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
                    <div>
                      <span className="text-sm font-medium">{item.service.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">x{item.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">${item.lineTotal.toLocaleString()}</span>
                      <button onClick={() => removeFromCart(i)} className="text-destructive"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Services by category */}
            {categories.length > 0 ? (
              categories.map((cat) => {
                const catServices = services.filter((s) => s.category_id === cat.id);
                if (catServices.length === 0) return null;
                return (
                  <div key={cat.id}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">{cat.name}</h3>
                    <div className="grid gap-2">
                      {catServices.map((svc) => (
                        <Card key={svc.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setActiveService(svc); setStep("configure"); }}>
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">{svc.name}</p>
                              {svc.description && <p className="text-sm text-muted-foreground">{svc.description}</p>}
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-foreground">${svc.base_price.toLocaleString()}</p>
                              {svc.pricing_model !== "fixed" && <p className="text-xs text-muted-foreground">desde</p>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="grid gap-2">
                {services.map((svc) => (
                  <Card key={svc.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setActiveService(svc); setStep("configure"); }}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{svc.name}</p>
                        {svc.description && <p className="text-sm text-muted-foreground">{svc.description}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">${svc.base_price.toLocaleString()}</p>
                        {svc.pricing_model !== "fixed" && <p className="text-xs text-muted-foreground">desde</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== STEP: CONFIGURE ===== */}
        {step === "configure" && activeService && (
          <div className="space-y-5">
            <button onClick={() => setStep("select")} className="text-sm text-primary hover:underline">← Volver a servicios</button>
            <Card>
              <CardHeader>
                <CardTitle>{activeService.name}</CardTitle>
                {activeService.description && <p className="text-sm text-muted-foreground">{activeService.description}</p>}
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Variables */}
                {variables.filter((v) => v.service_id === activeService.id).map((v) => (
                  <div key={v.id}>
                    <Label>{v.label} {v.is_required && <span className="text-destructive">*</span>}</Label>
                    {v.type === "select" ? (
                      <Select value={activeVars[v.name] || ""} onValueChange={(val) => setActiveVars({ ...activeVars, [v.name]: val })}>
                        <SelectTrigger><SelectValue placeholder={`Seleccionar ${v.label.toLowerCase()}`} /></SelectTrigger>
                        <SelectContent>
                          {v.options?.map((opt: any) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label} {opt.price_modifier ? `(+$${opt.price_modifier})` : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : v.type === "number" ? (
                      <Input type="number" value={activeVars[v.name] || ""} onChange={(e) => setActiveVars({ ...activeVars, [v.name]: e.target.value })} placeholder={v.label} />
                    ) : (
                      <Input value={activeVars[v.name] || ""} onChange={(e) => setActiveVars({ ...activeVars, [v.name]: e.target.value })} placeholder={v.label} />
                    )}
                  </div>
                ))}

                {/* Quantity */}
                <div>
                  <Label>Cantidad</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Button size="sm" variant="outline" onClick={() => setActiveQty(Math.max(1, activeQty - 1))}><Minus className="h-4 w-4" /></Button>
                    <span className="text-lg font-bold w-8 text-center">{activeQty}</span>
                    <Button size="sm" variant="outline" onClick={() => setActiveQty(activeQty + 1)}><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>

                {/* Extras */}
                {extras.filter((e) => e.service_id === activeService.id).length > 0 && (
                  <div>
                    <Label>Extras opcionales</Label>
                    <div className="space-y-2 mt-2">
                      {extras.filter((e) => e.service_id === activeService.id).map((extra) => (
                        <label key={extra.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                          <Checkbox
                            checked={activeExtras.includes(extra.id)}
                            onCheckedChange={(checked) => {
                              if (checked) setActiveExtras([...activeExtras, extra.id]);
                              else setActiveExtras(activeExtras.filter((id) => id !== extra.id));
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{extra.name}</p>
                            {extra.description && <p className="text-xs text-muted-foreground">{extra.description}</p>}
                          </div>
                          <span className="text-sm font-medium text-primary">+${extra.price}{extra.is_percentage ? "%" : ""}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live price */}
                {(() => {
                  const { unitPrice, extrasTotal, lineTotal } = calculatePrice(activeService, activeVars, activeExtras, activeQty);
                  return (
                    <div className="bg-primary/5 rounded-lg p-4 space-y-1">
                      <div className="flex justify-between text-sm"><span>Precio unitario</span><span>${unitPrice.toLocaleString()}</span></div>
                      {extrasTotal > 0 && <div className="flex justify-between text-sm"><span>Extras</span><span>+${extrasTotal.toLocaleString()}</span></div>}
                      {activeQty > 1 && <div className="flex justify-between text-sm"><span>Cantidad</span><span>x{activeQty}</span></div>}
                      <div className="flex justify-between font-bold text-lg border-t border-border pt-2 mt-2"><span>Total</span><span>${lineTotal.toLocaleString()}</span></div>
                    </div>
                  );
                })()}

                <Button className="w-full" size="lg" onClick={addToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" /> Agregar a cotización
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== STEP: CONTACT ===== */}
        {step === "contact" && (
          <div className="space-y-5">
            <button onClick={() => setStep("select")} className="text-sm text-primary hover:underline">← Volver</button>

            {/* Quote summary */}
            <Card>
              <CardHeader><CardTitle className="text-base">Resumen de cotización</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.service.name} x{item.quantity}</span>
                    <span className="font-medium">${item.lineTotal.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg border-t border-border pt-2 mt-2">
                  <span>Total</span><span>${cartTotal.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact form */}
            <Card>
              <CardHeader><CardTitle className="text-base">Tus datos de contacto</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Nombre *</Label><Input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Tu nombre completo" /></div>
                <div><Label>Empresa</Label><Input value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} placeholder="Nombre de tu empresa (opcional)" /></div>
                <div><Label>WhatsApp / Teléfono *</Label><Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+52 55 1234 5678" /></div>
                <div><Label>Email</Label><Input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="tu@email.com" /></div>
                <div><Label>Ciudad</Label><Input value={contact.city} onChange={(e) => setContact({ ...contact, city: e.target.value })} placeholder="Tu ciudad" /></div>
                <div><Label>Notas</Label><Textarea value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} placeholder="Detalles adicionales..." /></div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!contact.name || !contact.phone || submitting}
                  onClick={submitQuote}
                >
                  {submitting ? "Generando cotización..." : "Obtener mi cotización"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== STEP: RESULT ===== */}
        {step === "result" && quoteResult && (
          <div className="space-y-5">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">¡Cotización lista!</h2>
              <p className="text-muted-foreground mt-2">{page?.thank_you_message}</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Código de cotización</p>
                  <p className="text-2xl font-mono font-bold text-primary">#{quoteResult.short_code}</p>
                </div>

                <div className="space-y-2">
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.service.name} x{item.quantity}</span>
                      <span className="font-medium">${item.lineTotal.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-xl border-t border-border pt-3 mt-3">
                    <span>Total</span>
                    <span className="text-primary">${quoteResult.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    onClick={() => {
                      const msg = encodeURIComponent(`Hola, acabo de completar una cotización (#${quoteResult.short_code}) por $${quoteResult.total.toLocaleString()} y quiero confirmar los detalles.`);
                      window.open(`https://wa.me/?text=${msg}`, "_blank");
                    }}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {page?.whatsapp_cta_text || "Continuar por WhatsApp"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/q/view/${quoteResult.short_code}`);
                      toast.success("Link copiado");
                    }}
                  >
                    Copiar link de cotización
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => window.open(`/q/view/${quoteResult.short_code}`, "_blank")}
                  >
                    Ver cotización completa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
