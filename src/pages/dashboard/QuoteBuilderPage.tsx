import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Plus, Package, Settings2, Tag, Layers, Trash2, Edit, GripVertical,
  DollarSign, Variable, Gift, FileText, ExternalLink, Copy
} from "lucide-react";

interface QuotePage {
  id: string;
  tenant_id: string;
  title: string;
  slug: string;
  description: string | null;
  thank_you_message: string | null;
  whatsapp_cta_text: string | null;
  is_active: boolean;
}

interface ServiceCategory {
  id: string;
  tenant_id: string;
  quote_page_id: string | null;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

interface QuoteService {
  id: string;
  tenant_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  pricing_model: string;
  base_price: number;
  price_formula: string | null;
  installation_formula: string | null;
  min_price: number;
  max_price: number | null;
  min_width: number | null;
  min_height: number | null;
  is_active: boolean;
  sort_order: number;
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
  sort_order: number;
}

interface ServiceExtra {
  id: string;
  service_id: string;
  name: string;
  description: string | null;
  price: number;
  is_percentage: boolean;
  is_active: boolean;
}

export default function QuoteBuilderPage() {
  const { tenantId } = useAuth();
  const [activeTab, setActiveTab] = useState("pages");
  const [pages, setPages] = useState<QuotePage[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<QuoteService[]>([]);
  const [variables, setVariables] = useState<ServiceVariable[]>([]);
  const [extras, setExtras] = useState<ServiceExtra[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [showPageDialog, setShowPageDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showVariableDialog, setShowVariableDialog] = useState(false);
  const [showExtraDialog, setShowExtraDialog] = useState(false);
  const [showFormulaDialog, setShowFormulaDialog] = useState(false);

  // Edit states
  const [editingPage, setEditingPage] = useState<QuotePage | null>(null);
  const [editingService, setEditingService] = useState<QuoteService | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Form states
  const [pageForm, setPageForm] = useState({ title: "", slug: "", description: "", thank_you_message: "Gracias por solicitar tu cotización.", whatsapp_cta_text: "Continuar por WhatsApp" });
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "", quote_page_id: "" });
  const [serviceForm, setServiceForm] = useState({ name: "", description: "", pricing_model: "fixed", base_price: 0, price_formula: "", category_id: "", min_price: 0, max_price: "" });
  const [variableForm, setVariableForm] = useState({ name: "", label: "", type: "select", is_required: false, affects_price: false, optionsText: "" });
  const [extraForm, setExtraForm] = useState({ name: "", description: "", price: 0, is_percentage: false });
  const [formulaForm, setFormulaForm] = useState({ price_formula: "", installation_formula: "", min_width: "", min_height: "" });
  const [editingFormulaService, setEditingFormulaService] = useState<QuoteService | null>(null);

  useEffect(() => {
    if (tenantId) fetchAll();
  }, [tenantId]);

  const fetchAll = async () => {
    setLoading(true);
    const [pagesRes, catsRes, servicesRes] = await Promise.all([
      supabase.from("quote_pages").select("*").eq("tenant_id", tenantId!).order("created_at"),
      supabase.from("quote_service_categories").select("*").eq("tenant_id", tenantId!).order("sort_order"),
      supabase.from("quote_services").select("*").eq("tenant_id", tenantId!).order("sort_order"),
    ]);
    setPages((pagesRes.data as any[]) || []);
    setCategories((catsRes.data as any[]) || []);
    setServices((servicesRes.data as any[]) || []);

    // Fetch variables and extras for all services
    const serviceIds = (servicesRes.data as any[])?.map((s: any) => s.id) || [];
    if (serviceIds.length > 0) {
      const [varsRes, extrasRes] = await Promise.all([
        supabase.from("quote_service_variables").select("*").in("service_id", serviceIds).order("sort_order"),
        supabase.from("quote_service_extras").select("*").in("service_id", serviceIds).order("sort_order"),
      ]);
      setVariables((varsRes.data as any[]) || []);
      setExtras((extrasRes.data as any[]) || []);
    }
    setLoading(false);
  };

  // ---- QUOTE PAGES ----
  const savePage = async () => {
    const slug = pageForm.slug || pageForm.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
    if (editingPage) {
      const { error } = await supabase.from("quote_pages").update({ ...pageForm, slug }).eq("id", editingPage.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Página actualizada");
    } else {
      const { error } = await supabase.from("quote_pages").insert({ ...pageForm, slug, tenant_id: tenantId! });
      if (error) { toast.error(error.message); return; }
      toast.success("Página creada");
    }
    setShowPageDialog(false);
    setEditingPage(null);
    setPageForm({ title: "", slug: "", description: "", thank_you_message: "Gracias por solicitar tu cotización.", whatsapp_cta_text: "Continuar por WhatsApp" });
    fetchAll();
  };

  const togglePageActive = async (page: QuotePage) => {
    await supabase.from("quote_pages").update({ is_active: !page.is_active }).eq("id", page.id);
    fetchAll();
  };

  const deletePage = async (id: string) => {
    await supabase.from("quote_pages").delete().eq("id", id);
    fetchAll();
    toast.success("Página eliminada");
  };

  // ---- CATEGORIES ----
  const saveCategory = async () => {
    const { error } = await supabase.from("quote_service_categories").insert({
      name: categoryForm.name,
      description: categoryForm.description || null,
      quote_page_id: categoryForm.quote_page_id || null,
      tenant_id: tenantId!,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Categoría creada");
    setShowCategoryDialog(false);
    setCategoryForm({ name: "", description: "", quote_page_id: "" });
    fetchAll();
  };

  const deleteCategory = async (id: string) => {
    await supabase.from("quote_service_categories").delete().eq("id", id);
    fetchAll();
    toast.success("Categoría eliminada");
  };

  // ---- SERVICES ----
  const saveService = async () => {
    const data: any = {
      name: serviceForm.name,
      description: serviceForm.description || null,
      pricing_model: serviceForm.pricing_model,
      base_price: serviceForm.base_price,
      price_formula: serviceForm.price_formula || null,
      category_id: serviceForm.category_id || null,
      min_price: serviceForm.min_price,
      max_price: serviceForm.max_price ? Number(serviceForm.max_price) : null,
      tenant_id: tenantId!,
    };
    if (editingService) {
      const { error } = await supabase.from("quote_services").update(data).eq("id", editingService.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Servicio actualizado");
    } else {
      const { error } = await supabase.from("quote_services").insert(data);
      if (error) { toast.error(error.message); return; }
      toast.success("Servicio creado");
    }
    setShowServiceDialog(false);
    setEditingService(null);
    setServiceForm({ name: "", description: "", pricing_model: "fixed", base_price: 0, price_formula: "", category_id: "", min_price: 0, max_price: "" });
    fetchAll();
  };

  const deleteService = async (id: string) => {
    await supabase.from("quote_services").delete().eq("id", id);
    fetchAll();
    toast.success("Servicio eliminado");
  };

  // ---- VARIABLES ----
  const saveVariable = async () => {
    if (!selectedServiceId) return;
    const options = variableForm.optionsText
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [label, priceStr] = line.split("|").map((s) => s.trim());
        return { value: label.toLowerCase().replace(/\s+/g, "_"), label, price_modifier: priceStr ? Number(priceStr) : 0 };
      });
    const { error } = await supabase.from("quote_service_variables").insert({
      service_id: selectedServiceId,
      name: variableForm.name,
      label: variableForm.label,
      type: variableForm.type,
      options,
      is_required: variableForm.is_required,
      affects_price: variableForm.affects_price,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Variable creada");
    setShowVariableDialog(false);
    setVariableForm({ name: "", label: "", type: "select", is_required: false, affects_price: false, optionsText: "" });
    fetchAll();
  };

  const deleteVariable = async (id: string) => {
    await supabase.from("quote_service_variables").delete().eq("id", id);
    fetchAll();
  };

  // ---- EXTRAS ----
  const saveExtra = async () => {
    if (!selectedServiceId) return;
    const { error } = await supabase.from("quote_service_extras").insert({
      service_id: selectedServiceId,
      name: extraForm.name,
      description: extraForm.description || null,
      price: extraForm.price,
      is_percentage: extraForm.is_percentage,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Extra creado");
    setShowExtraDialog(false);
    setExtraForm({ name: "", description: "", price: 0, is_percentage: false });
    fetchAll();
  };

  const deleteExtra = async (id: string) => {
    await supabase.from("quote_service_extras").delete().eq("id", id);
    fetchAll();
  };

  const saveFormula = async () => {
    if (!editingFormulaService) return;
    const { error } = await supabase.from("quote_services").update({
      price_formula: formulaForm.price_formula || null,
      installation_formula: formulaForm.installation_formula || null,
      min_width: formulaForm.min_width ? Number(formulaForm.min_width) : null,
      min_height: formulaForm.min_height ? Number(formulaForm.min_height) : null,
    } as any).eq("id", editingFormulaService.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Fórmula actualizada");
    setShowFormulaDialog(false);
    setEditingFormulaService(null);
    fetchAll();
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Smart Quote Builder</h1>
          <p className="text-muted-foreground">Configura servicios, precios y páginas de cotización</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="pages" className="gap-1"><FileText className="h-3 w-3" /> Páginas</TabsTrigger>
          <TabsTrigger value="categories" className="gap-1"><Layers className="h-3 w-3" /> Categorías</TabsTrigger>
          <TabsTrigger value="services" className="gap-1"><Package className="h-3 w-3" /> Servicios</TabsTrigger>
          <TabsTrigger value="discounts" className="gap-1"><Tag className="h-3 w-3" /> Descuentos</TabsTrigger>
        </TabsList>

        {/* ===== QUOTE PAGES TAB ===== */}
        <TabsContent value="pages" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setEditingPage(null); setPageForm({ title: "", slug: "", description: "", thank_you_message: "Gracias por solicitar tu cotización.", whatsapp_cta_text: "Continuar por WhatsApp" }); setShowPageDialog(true); }}>
              <Plus className="h-4 w-4 mr-1" /> Nueva Página
            </Button>
          </div>
          {pages.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No hay páginas de cotización. Crea tu primera página.</CardContent></Card>
          ) : (
            <div className="grid gap-4">
              {pages.map((page) => (
                <Card key={page.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{page.title}</h3>
                        <Badge variant={page.is_active ? "default" : "secondary"}>{page.is_active ? "Activa" : "Inactiva"}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">/{page.slug}</p>
                      {page.description && <p className="text-sm text-muted-foreground">{page.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/q/${page.slug}`);
                        toast.success("Link copiado");
                      }}><Copy className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => window.open(`/q/${page.slug}`, "_blank")}><ExternalLink className="h-4 w-4" /></Button>
                      <Switch checked={page.is_active} onCheckedChange={() => togglePageActive(page)} />
                      <Button size="sm" variant="ghost" onClick={() => { setEditingPage(page); setPageForm({ title: page.title, slug: page.slug, description: page.description || "", thank_you_message: page.thank_you_message || "", whatsapp_cta_text: page.whatsapp_cta_text || "" }); setShowPageDialog(true); }}><Edit className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deletePage(page.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ===== CATEGORIES TAB ===== */}
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setCategoryForm({ name: "", description: "", quote_page_id: "" }); setShowCategoryDialog(true); }}>
              <Plus className="h-4 w-4 mr-1" /> Nueva Categoría
            </Button>
          </div>
          {categories.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No hay categorías. Crea categorías para organizar tus servicios.</CardContent></Card>
          ) : (
            <div className="grid gap-3">
              {categories.map((cat) => (
                <Card key={cat.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{cat.name}</h3>
                      {cat.description && <p className="text-sm text-muted-foreground">{cat.description}</p>}
                    </div>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteCategory(cat.id)}><Trash2 className="h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ===== SERVICES TAB ===== */}
        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setEditingService(null); setServiceForm({ name: "", description: "", pricing_model: "fixed", base_price: 0, price_formula: "", category_id: "", min_price: 0, max_price: "" }); setShowServiceDialog(true); }}>
              <Plus className="h-4 w-4 mr-1" /> Nuevo Servicio
            </Button>
          </div>
          {services.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No hay servicios configurados. Agrega tu primer servicio o producto.</CardContent></Card>
          ) : (
            <div className="space-y-4">
              {services.map((svc) => {
                const svcVars = variables.filter((v) => v.service_id === svc.id);
                const svcExtras = extras.filter((e) => e.service_id === svc.id);
                const cat = categories.find((c) => c.id === svc.category_id);
                return (
                  <Card key={svc.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            {svc.name}
                            <Badge variant="outline" className="text-xs">
                              {svc.pricing_model === "fixed" ? "Precio Fijo" :
                               svc.pricing_model === "variable" ? "Variable" :
                               svc.pricing_model === "per_quantity" ? "Por Cantidad" : "Fórmula"}
                            </Badge>
                            {cat && <Badge variant="secondary" className="text-xs">{cat.name}</Badge>}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            ${svc.base_price.toLocaleString()} base
                            {svc.price_formula && ` · Fórmula: ${svc.price_formula}`}
                          </CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => { setEditingService(svc); setServiceForm({ name: svc.name, description: svc.description || "", pricing_model: svc.pricing_model, base_price: svc.base_price, price_formula: svc.price_formula || "", category_id: svc.category_id || "", min_price: svc.min_price, max_price: svc.max_price?.toString() || "" }); setShowServiceDialog(true); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteService(svc.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      {/* Variables */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Variable className="h-3 w-3" /> Variables ({svcVars.length})</span>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setSelectedServiceId(svc.id); setVariableForm({ name: "", label: "", type: "select", is_required: false, affects_price: false, optionsText: "" }); setShowVariableDialog(true); }}>
                            <Plus className="h-3 w-3 mr-1" /> Variable
                          </Button>
                        </div>
                        {svcVars.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {svcVars.map((v) => (
                              <Badge key={v.id} variant="outline" className="gap-1 pr-1">
                                {v.label}
                                {v.affects_price && <DollarSign className="h-3 w-3 text-primary" />}
                                <button onClick={() => deleteVariable(v.id)} className="ml-1 text-destructive hover:text-destructive/80"><Trash2 className="h-3 w-3" /></button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Extras */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Gift className="h-3 w-3" /> Extras ({svcExtras.length})</span>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setSelectedServiceId(svc.id); setExtraForm({ name: "", description: "", price: 0, is_percentage: false }); setShowExtraDialog(true); }}>
                            <Plus className="h-3 w-3 mr-1" /> Extra
                          </Button>
                        </div>
                        {svcExtras.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {svcExtras.map((e) => (
                              <Badge key={e.id} variant="outline" className="gap-1 pr-1">
                                {e.name} (+${e.price}{e.is_percentage ? "%" : ""})
                                <button onClick={() => deleteExtra(e.id)} className="ml-1 text-destructive hover:text-destructive/80"><Trash2 className="h-3 w-3" /></button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ===== DISCOUNTS TAB ===== */}
        <TabsContent value="discounts">
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Las reglas de descuento estarán disponibles próximamente.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ===== DIALOGS ===== */}

      {/* Page Dialog */}
      <Dialog open={showPageDialog} onOpenChange={setShowPageDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingPage ? "Editar Página" : "Nueva Página de Cotización"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Título</Label><Input value={pageForm.title} onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })} placeholder="Ej: Cotizador de Persianas" /></div>
            <div><Label>Slug (URL)</Label><Input value={pageForm.slug} onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })} placeholder="persianas" /></div>
            <div><Label>Descripción</Label><Textarea value={pageForm.description} onChange={(e) => setPageForm({ ...pageForm, description: e.target.value })} placeholder="Descripción corta..." /></div>
            <div><Label>Mensaje de agradecimiento</Label><Textarea value={pageForm.thank_you_message} onChange={(e) => setPageForm({ ...pageForm, thank_you_message: e.target.value })} /></div>
            <div><Label>Texto CTA WhatsApp</Label><Input value={pageForm.whatsapp_cta_text} onChange={(e) => setPageForm({ ...pageForm, whatsapp_cta_text: e.target.value })} /></div>
            <Button className="w-full" onClick={savePage}>{editingPage ? "Guardar Cambios" : "Crear Página"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nueva Categoría</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nombre</Label><Input value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} placeholder="Ej: Persianas, Toldos, Eventos" /></div>
            <div><Label>Descripción</Label><Textarea value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} /></div>
            {pages.length > 0 && (
              <div>
                <Label>Página de cotización</Label>
                <Select value={categoryForm.quote_page_id} onValueChange={(v) => setCategoryForm({ ...categoryForm, quote_page_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar página..." /></SelectTrigger>
                  <SelectContent>
                    {pages.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button className="w-full" onClick={saveCategory}>Crear Categoría</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingService ? "Editar Servicio" : "Nuevo Servicio"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nombre</Label><Input value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} placeholder="Ej: Persiana Enrollable" /></div>
            <div><Label>Descripción</Label><Textarea value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} /></div>
            {categories.length > 0 && (
              <div>
                <Label>Categoría</Label>
                <Select value={serviceForm.category_id} onValueChange={(v) => setServiceForm({ ...serviceForm, category_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Sin categoría" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Modelo de precios</Label>
              <Select value={serviceForm.pricing_model} onValueChange={(v) => setServiceForm({ ...serviceForm, pricing_model: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Precio Fijo</SelectItem>
                  <SelectItem value="variable">Variable (por opciones)</SelectItem>
                  <SelectItem value="per_quantity">Por Cantidad</SelectItem>
                  <SelectItem value="formula">Fórmula personalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Precio base ($)</Label><Input type="number" value={serviceForm.base_price} onChange={(e) => setServiceForm({ ...serviceForm, base_price: Number(e.target.value) })} /></div>
              <div><Label>Precio mínimo ($)</Label><Input type="number" value={serviceForm.min_price} onChange={(e) => setServiceForm({ ...serviceForm, min_price: Number(e.target.value) })} /></div>
            </div>
            {serviceForm.pricing_model === "formula" && (
              <div><Label>Fórmula de precio</Label><Input value={serviceForm.price_formula} onChange={(e) => setServiceForm({ ...serviceForm, price_formula: e.target.value })} placeholder="width * height * 15" /><p className="text-xs text-muted-foreground mt-1">Usa nombres de variables: width, height, quantity, etc.</p></div>
            )}
            <Button className="w-full" onClick={saveService}>{editingService ? "Guardar Cambios" : "Crear Servicio"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Variable Dialog */}
      <Dialog open={showVariableDialog} onOpenChange={setShowVariableDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nueva Variable</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nombre (clave)</Label><Input value={variableForm.name} onChange={(e) => setVariableForm({ ...variableForm, name: e.target.value })} placeholder="Ej: size, color, material" /></div>
            <div><Label>Etiqueta (visible)</Label><Input value={variableForm.label} onChange={(e) => setVariableForm({ ...variableForm, label: e.target.value })} placeholder="Ej: Tamaño, Color, Material" /></div>
            <div>
              <Label>Tipo</Label>
              <Select value={variableForm.type} onValueChange={(v) => setVariableForm({ ...variableForm, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="select">Selección</SelectItem>
                  <SelectItem value="number">Número</SelectItem>
                  <SelectItem value="text">Texto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {variableForm.type === "select" && (
              <div>
                <Label>Opciones (una por línea, formato: Etiqueta | Precio)</Label>
                <Textarea value={variableForm.optionsText} onChange={(e) => setVariableForm({ ...variableForm, optionsText: e.target.value })} placeholder={"3x3 | 500\n4x4 | 800\n6x6 | 1200"} rows={5} />
              </div>
            )}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm"><Switch checked={variableForm.is_required} onCheckedChange={(v) => setVariableForm({ ...variableForm, is_required: v })} /> Obligatorio</label>
              <label className="flex items-center gap-2 text-sm"><Switch checked={variableForm.affects_price} onCheckedChange={(v) => setVariableForm({ ...variableForm, affects_price: v })} /> Afecta precio</label>
            </div>
            <Button className="w-full" onClick={saveVariable}>Crear Variable</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Extra Dialog */}
      <Dialog open={showExtraDialog} onOpenChange={setShowExtraDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nuevo Extra</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nombre</Label><Input value={extraForm.name} onChange={(e) => setExtraForm({ ...extraForm, name: e.target.value })} placeholder="Ej: Instalación, Envío urgente" /></div>
            <div><Label>Descripción</Label><Textarea value={extraForm.description} onChange={(e) => setExtraForm({ ...extraForm, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Precio</Label><Input type="number" value={extraForm.price} onChange={(e) => setExtraForm({ ...extraForm, price: Number(e.target.value) })} /></div>
              <div className="flex items-end"><label className="flex items-center gap-2 text-sm pb-2"><Switch checked={extraForm.is_percentage} onCheckedChange={(v) => setExtraForm({ ...extraForm, is_percentage: v })} /> Es porcentaje (%)</label></div>
            </div>
            <Button className="w-full" onClick={saveExtra}>Crear Extra</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
