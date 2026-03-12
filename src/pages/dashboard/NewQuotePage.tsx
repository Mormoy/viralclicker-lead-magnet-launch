import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Trash2, Copy, Zap, Save, Send, FileText } from "lucide-react";

interface QuoteService {
  id: string;
  name: string;
  pricing_model: string;
  base_price: number;
  price_formula: string | null;
  description: string | null;
}

interface ServiceVariable {
  id: string;
  service_id: string;
  name: string;
  label: string;
  type: string;
  options: any[];
  is_required: boolean;
  affects_price: boolean;
}

interface ServiceExtra {
  id: string;
  service_id: string;
  name: string;
  price: number;
  is_percentage: boolean;
}

interface ProductLine {
  id: string;
  service_id: string;
  service_name: string;
  variables: Record<string, any>;
  width: number;
  height: number;
  quantity: number;
  unit_price: number;
  installation_price: number;
  include_installation: boolean;
  extras: Record<string, boolean>;
}

const SOURCES = [
  { value: "ads_web", label: "📊 Ads Web" },
  { value: "ads_redes", label: "📱 Ads Redes" },
  { value: "referido", label: "🤝 Referido" },
  { value: "organico", label: "🌱 Orgánico" },
  { value: "whatsapp", label: "💬 WhatsApp" },
  { value: "presencial", label: "🏪 Presencial" },
  { value: "manual", label: "✏️ Manual" },
];

function generateId() {
  return crypto.randomUUID();
}

export default function NewQuotePage() {
  const { tenantId, profile } = useAuth();
  const navigate = useNavigate();

  // Services catalog
  const [services, setServices] = useState<QuoteService[]>([]);
  const [allVariables, setAllVariables] = useState<ServiceVariable[]>([]);
  const [allExtras, setAllExtras] = useState<ServiceExtra[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Client info
  const [source, setSource] = useState("manual");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientNotes, setClientNotes] = useState("");

  // Products
  const [products, setProducts] = useState<ProductLine[]>([]);

  // Merge
  const [mergeCode1, setMergeCode1] = useState("");
  const [mergeCode2, setMergeCode2] = useState("");

  useEffect(() => {
    if (tenantId) fetchCatalog();
  }, [tenantId]);

  const fetchCatalog = async () => {
    setLoading(true);
    const [svcRes] = await Promise.all([
      supabase.from("quote_services").select("*").eq("tenant_id", tenantId!).eq("is_active", true).order("sort_order"),
    ]);
    const svcs = (svcRes.data as any[]) || [];
    setServices(svcs);

    const ids = svcs.map((s: any) => s.id);
    if (ids.length > 0) {
      const [varsRes, extRes] = await Promise.all([
        supabase.from("quote_service_variables").select("*").in("service_id", ids).order("sort_order"),
        supabase.from("quote_service_extras").select("*").in("service_id", ids).eq("is_active", true).order("sort_order"),
      ]);
      setAllVariables((varsRes.data as any[]) || []);
      setAllExtras((extRes.data as any[]) || []);
    }
    setLoading(false);
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: generateId(),
        service_id: "",
        service_name: "",
        variables: {},
        width: 0,
        height: 0,
        quantity: 1,
        unit_price: 0,
        installation_price: 0,
        include_installation: false,
        extras: {},
      },
    ]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const duplicateProduct = (id: string) => {
    const original = products.find((p) => p.id === id);
    if (!original) return;
    setProducts((prev) => [
      ...prev,
      { ...original, id: generateId() },
    ]);
  };

  const updateProduct = (id: string, updates: Partial<ProductLine>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleServiceChange = (productId: string, serviceId: string) => {
    const svc = services.find((s) => s.id === serviceId);
    if (!svc) return;
    updateProduct(productId, {
      service_id: serviceId,
      service_name: svc.name,
      unit_price: svc.base_price,
      variables: {},
      extras: {},
    });
  };

  const handleVariableChange = (productId: string, varName: string, value: any) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const newVars = { ...product.variables, [varName]: value };

    // Check if variable option has a price modifier
    const svcVars = allVariables.filter((v) => v.service_id === product.service_id);
    let priceFromVariable = product.unit_price;
    for (const sv of svcVars) {
      if (sv.affects_price && sv.options && Array.isArray(sv.options)) {
        const selectedOpt = (sv.options as any[]).find(
          (o: any) => o.value === newVars[sv.name] || o.label === newVars[sv.name]
        );
        if (selectedOpt?.price_modifier) {
          priceFromVariable = selectedOpt.price_modifier;
        }
      }
    }

    updateProduct(productId, { variables: newVars, unit_price: priceFromVariable });
  };

  // Calculate area and subtotal for a product
  const calcProduct = (p: ProductLine) => {
    const areaM2 = (p.width / 100) * (p.height / 100);
    const totalArea = areaM2 * p.quantity;
    const productCost = totalArea * p.unit_price;
    const installCost = p.include_installation ? p.installation_price * p.quantity : 0;

    // Extras
    let extrasTotal = 0;
    const svcExtras = allExtras.filter((e) => e.service_id === p.service_id);
    for (const ext of svcExtras) {
      if (p.extras[ext.id]) {
        extrasTotal += ext.is_percentage ? productCost * (ext.price / 100) : ext.price * p.quantity;
      }
    }

    return {
      areaM2: Math.round(areaM2 * 100) / 100,
      totalArea: Math.round(totalArea * 100) / 100,
      productCost: Math.round(productCost),
      installCost: Math.round(installCost),
      extrasTotal: Math.round(extrasTotal),
      subtotal: Math.round(productCost + installCost + extrasTotal),
    };
  };

  const grandTotal = products.reduce((sum, p) => sum + calcProduct(p).subtotal, 0);

  const handleSave = async (sendImmediately: boolean) => {
    if (!tenantId) return;
    if (!clientName.trim()) {
      toast.error("El nombre del cliente es obligatorio");
      return;
    }
    if (!clientPhone.trim()) {
      toast.error("El WhatsApp del cliente es obligatorio");
      return;
    }
    if (products.length === 0) {
      toast.error("Agrega al menos un producto");
      return;
    }

    setSaving(true);
    try {
      // Generate short code
      const { data: codeData } = await supabase.rpc("generate_quote_short_code");
      const shortCode = (codeData as string) || `M${Date.now().toString(36).toUpperCase()}`;

      // Insert quote
      const { data: quoteData, error: quoteError } = await supabase
        .from("quotes")
        .insert({
          tenant_id: tenantId,
          short_code: shortCode,
          customer_name: clientName.trim(),
          customer_phone: clientPhone.trim(),
          customer_email: clientEmail.trim() || null,
          customer_company: clientCompany.trim() || null,
          customer_city: clientCity.trim() || null,
          customer_notes: clientNotes.trim() || null,
          status: sendImmediately ? "sent" : "draft",
          subtotal: grandTotal,
          total: grandTotal,
          extras_total: products.reduce((s, p) => s + calcProduct(p).extrasTotal, 0),
        })
        .select("id")
        .single();

      if (quoteError) throw quoteError;
      const quoteId = (quoteData as any).id;

      // Insert line items
      const lineItems = products.map((p, idx) => {
        const calc = calcProduct(p);
        return {
          quote_id: quoteId,
          service_id: p.service_id || null,
          service_name: p.service_name || "Producto",
          description: `${p.width}cm x ${p.height}cm${p.include_installation ? " + Instalación" : ""}`,
          quantity: p.quantity,
          unit_price: calc.productCost / (p.quantity || 1),
          extras_total: calc.extrasTotal,
          line_total: calc.subtotal,
          sort_order: idx,
          variables: p.variables as any,
          extras: Object.entries(p.extras)
            .filter(([, v]) => v)
            .map(([id]) => {
              const ext = allExtras.find((e) => e.id === id);
              return { id, name: ext?.name || id, price: ext?.price || 0 };
            }) as any,
        };
      });

      const { error: lineError } = await supabase.from("quote_line_items").insert(lineItems);
      if (lineError) throw lineError;

      // Activity log
      await supabase.from("quote_activity").insert({
        quote_id: quoteId,
        type: "created",
        description: `Cotización ${shortCode} creada manualmente por ${profile?.full_name || "Sistema"}`,
        new_status: sendImmediately ? "sent" : "draft",
      });

      toast.success(`Cotización ${shortCode} ${sendImmediately ? "enviada" : "guardada como borrador"}`);

      if (sendImmediately && clientPhone) {
        const phone = clientPhone.replace(/\D/g, "");
        const msg = encodeURIComponent(
          `Hola ${clientName}, te envío tu cotización: ${window.location.origin}/q/view/${shortCode}`
        );
        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
      }

      navigate("/dashboard/quotes");
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleMerge = async () => {
    if (!mergeCode1 || !mergeCode2) {
      toast.error("Ingresa ambos folios");
      return;
    }
    // Fetch both quotes and merge line items
    const { data: q1 } = await supabase.from("quotes").select("*, quote_line_items(*)").eq("short_code", mergeCode1.toUpperCase()).single();
    const { data: q2 } = await supabase.from("quotes").select("*, quote_line_items(*)").eq("short_code", mergeCode2.toUpperCase()).single();

    if (!q1 || !q2) {
      toast.error("No se encontraron ambas cotizaciones");
      return;
    }

    const q1Data = q1 as any;
    const q2Data = q2 as any;

    // Pre-fill client info from first quote
    setClientName(q1Data.customer_name || "");
    setClientPhone(q1Data.customer_phone || "");
    setClientEmail(q1Data.customer_email || "");
    setClientCompany(q1Data.customer_company || "");
    setClientCity(q1Data.customer_city || "");

    // Merge line items as products
    const merged: ProductLine[] = [
      ...(q1Data.quote_line_items || []),
      ...(q2Data.quote_line_items || []),
    ].map((item: any) => ({
      id: generateId(),
      service_id: item.service_id || "",
      service_name: item.service_name || "Producto",
      variables: item.variables || {},
      width: 0,
      height: 0,
      quantity: item.quantity || 1,
      unit_price: item.unit_price || 0,
      installation_price: 0,
      include_installation: false,
      extras: {},
    }));

    setProducts(merged);
    toast.success(`Se fusionaron ${merged.length} productos de ambas cotizaciones`);
  };

  const quickQuote = () => {
    setSource("manual");
    setProducts([]);
    addProduct();
    toast.info("Cotización rápida: agrega los datos y productos");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando catálogo...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Nueva Cotización</h1>
        <p className="text-muted-foreground">Crea una nueva cotización para un cliente con múltiples productos.</p>
      </div>

      {/* Tab nav */}
      <Tabs defaultValue="new" className="w-full">
        <TabsList>
          <TabsTrigger value="list" onClick={() => navigate("/dashboard/quotes")}>
            Gestión de Cotizaciones
          </TabsTrigger>
          <TabsTrigger value="new">Nueva Cotización</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Merge section */}
      <Card className="border-dashed border-2 border-primary/30">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✂️</span>
            <h3 className="font-semibold text-foreground">Fusionar Cotizaciones</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Ingresa los folios (ej: COT-000123) de las cotizaciones que deseas fusionar en una nueva.
          </p>
          <div className="flex items-end gap-4">
            <div>
              <Label className="text-xs">Cotización 1</Label>
              <Input
                placeholder="COT-000123"
                value={mergeCode1}
                onChange={(e) => setMergeCode1(e.target.value)}
                className="w-40"
              />
            </div>
            <div>
              <Label className="text-xs">Cotización 2</Label>
              <Input
                placeholder="COT-000456"
                value={mergeCode2}
                onChange={(e) => setMergeCode2(e.target.value)}
                className="w-40"
              />
            </div>
            <Button variant="outline" onClick={handleMerge} className="gap-2">
              ✂️ Fusionar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client Info */}
      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Información del Cliente</h2>
            <Button variant="outline" onClick={quickQuote} className="gap-2">
              <Zap className="h-4 w-4" /> Cotización Rápida
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Origen de cotización *</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">Nombre *</Label>
                <Input placeholder="Nombre del cliente" value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="font-semibold">Empresa</Label>
                <Input placeholder="Empresa (opcional)" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">Email</Label>
                <Input type="email" placeholder="email@ejemplo.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="font-semibold">WhatsApp *</Label>
                <Input placeholder="+56 9 1234 5678" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">Ciudad</Label>
                <Input placeholder="Ciudad" value={clientCity} onChange={(e) => setClientCity(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="font-semibold">Dirección</Label>
                <Input placeholder="Dirección del cliente" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="mt-1" />
              </div>
            </div>

            <div>
              <Label className="font-semibold">Notas</Label>
              <Textarea placeholder="Notas adicionales..." value={clientNotes} onChange={(e) => setClientNotes(e.target.value)} className="mt-1" rows={3} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Productos</h2>
            <Button onClick={addProduct} className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Agregar Producto
            </Button>
          </div>

          {products.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No hay productos. Haz clic en "Agregar Producto" para comenzar.
            </p>
          ) : (
            <div className="space-y-6">
              {products.map((product, idx) => {
                const svcVars = allVariables.filter((v) => v.service_id === product.service_id);
                const svcExtras = allExtras.filter((e) => e.service_id === product.service_id);
                const calc = calcProduct(product);

                return (
                  <Card key={product.id} className="border">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Producto #{idx + 1}</h3>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => duplicateProduct(product.id)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => removeProduct(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Product selector + variables */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Producto</Label>
                          <Select value={product.service_id} onValueChange={(v) => handleServiceChange(product.id, v)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Seleccionar producto" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((svc) => (
                                <SelectItem key={svc.id} value={svc.id}>{svc.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Dynamic variables (e.g., Tela/Fabric) */}
                        {svcVars.map((sv) => (
                          <div key={sv.id}>
                            <Label className="text-xs text-muted-foreground">{sv.label}</Label>
                            {sv.type === "select" && sv.options ? (
                              <Select
                                value={product.variables[sv.name] || ""}
                                onValueChange={(v) => handleVariableChange(product.id, sv.name, v)}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder={`Seleccionar ${sv.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {(sv.options as any[]).map((opt: any) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {opt.label}{opt.price_modifier ? ` ($${Number(opt.price_modifier).toLocaleString()}/m²)` : ""}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                className="mt-1"
                                value={product.variables[sv.name] || ""}
                                onChange={(e) => handleVariableChange(product.id, sv.name, e.target.value)}
                                placeholder={sv.label}
                              />
                            )}
                          </div>
                        ))}

                        <div>
                          <Label className="text-xs text-muted-foreground">Precio/m² cotizado</Label>
                          <Input
                            type="number"
                            className="mt-1"
                            value={product.unit_price}
                            onChange={(e) => updateProduct(product.id, { unit_price: Number(e.target.value) })}
                          />
                        </div>
                      </div>

                      {/* Dimensions */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Ancho (cm)</Label>
                          <Input
                            type="number"
                            className="mt-1"
                            value={product.width || ""}
                            onChange={(e) => updateProduct(product.id, { width: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Alto (cm)</Label>
                          <Input
                            type="number"
                            className="mt-1"
                            value={product.height || ""}
                            onChange={(e) => updateProduct(product.id, { height: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Cantidad</Label>
                          <Input
                            type="number"
                            min={1}
                            className="mt-1"
                            value={product.quantity}
                            onChange={(e) => updateProduct(product.id, { quantity: Math.max(1, Number(e.target.value)) })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Precio Instalación</Label>
                          <Input
                            type="number"
                            className="mt-1"
                            value={product.installation_price || ""}
                            onChange={(e) => updateProduct(product.id, { installation_price: Number(e.target.value) })}
                          />
                        </div>
                      </div>

                      {/* Calculations */}
                      {product.width > 0 && product.height > 0 && (
                        <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Área base:</span>
                            <span className="font-medium">{calc.areaM2} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Área total (x{product.quantity}):</span>
                            <span className="font-semibold">{calc.totalArea} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Producto ({calc.totalArea} m² × ${product.unit_price.toLocaleString()} × {product.quantity}):
                            </span>
                            <span>${calc.productCost.toLocaleString()}</span>
                          </div>
                          {calc.installCost > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Instalación:</span>
                              <span>${calc.installCost.toLocaleString()}</span>
                            </div>
                          )}
                          {calc.extrasTotal > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Extras:</span>
                              <span>${calc.extrasTotal.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between pt-1 border-t border-border">
                            <span className="text-primary font-semibold">Subtotal producto:</span>
                            <span className="text-primary font-bold">${calc.subtotal.toLocaleString()}</span>
                          </div>
                        </div>
                      )}

                      {/* Installation checkbox */}
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={product.include_installation}
                          onCheckedChange={(v) => updateProduct(product.id, { include_installation: !!v })}
                        />
                        <Label className="text-sm cursor-pointer">Incluir instalación</Label>
                      </div>

                      {/* Service extras */}
                      {svcExtras.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Extras disponibles</Label>
                          {svcExtras.map((ext) => (
                            <div key={ext.id} className="flex items-center gap-2">
                              <Checkbox
                                checked={!!product.extras[ext.id]}
                                onCheckedChange={(v) =>
                                  updateProduct(product.id, {
                                    extras: { ...product.extras, [ext.id]: !!v },
                                  })
                                }
                              />
                              <span className="text-sm">
                                {ext.name} — {ext.is_percentage ? `${ext.price}%` : `$${ext.price.toLocaleString()}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grand Total + Actions */}
      {products.length > 0 && (
        <Card className="border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Total cotización</p>
                <p className="text-3xl font-bold text-primary">${grandTotal.toLocaleString()}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                {products.length} producto(s)
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => handleSave(false)} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" /> Guardar como Borrador
              </Button>
              <Button onClick={() => handleSave(true)} disabled={saving} className="gap-2 bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" /> Guardar y Enviar por WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
