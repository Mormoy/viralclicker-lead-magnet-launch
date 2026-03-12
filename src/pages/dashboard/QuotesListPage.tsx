import { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Search, Download, TrendingUp, ChevronDown, ChevronLeft, ChevronRight,
  Calendar, Filter, Edit2, Copy, Trash2, Share2, ExternalLink,
  FileText, Inbox, Send, Eye, CheckCircle2, Clock, XCircle, RefreshCw,
  MessageCircle, Gift, CalendarCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Pipeline Status Config ───
const PIPELINE_STATUSES = {
  draft: {
    key: "draft", label: "Borrador", shortLabel: "Borrador",
    color: "hsl(220 9% 46%)", textColor: "text-[hsl(220,9%,35%)]",
    bgLight: "bg-[hsl(220,9%,96%)]", borderColor: "border-[hsl(220,9%,85%)]",
    order: 0, isFinal: false,
  },
  sent: {
    key: "sent", label: "Enviada", shortLabel: "Enviada",
    color: "hsl(217 91% 60%)", textColor: "text-[hsl(217,91%,45%)]",
    bgLight: "bg-[hsl(217,91%,96%)]", borderColor: "border-[hsl(217,91%,85%)]",
    order: 1, isFinal: false,
  },
  viewed: {
    key: "viewed", label: "Vista", shortLabel: "Vista",
    color: "hsl(38 92% 50%)", textColor: "text-[hsl(38,92%,35%)]",
    bgLight: "bg-[hsl(38,92%,96%)]", borderColor: "border-[hsl(38,80%,82%)]",
    order: 2, isFinal: false,
  },
  accepted: {
    key: "accepted", label: "Aceptada", shortLabel: "Aceptada",
    color: "hsl(142 71% 45%)", textColor: "text-[hsl(142,71%,30%)]",
    bgLight: "bg-[hsl(142,76%,94%)]", borderColor: "border-[hsl(142,60%,78%)]",
    order: 3, isFinal: false,
  },
  converted: {
    key: "converted", label: "Convertida", shortLabel: "Convertida",
    color: "hsl(160 84% 39%)", textColor: "text-[hsl(160,84%,25%)]",
    bgLight: "bg-[hsl(160,84%,94%)]", borderColor: "border-[hsl(160,60%,75%)]",
    order: 4, isFinal: true,
  },
  expired: {
    key: "expired", label: "Expirada", shortLabel: "Expirada",
    color: "hsl(0 0% 55%)", textColor: "text-[hsl(0,0%,40%)]",
    bgLight: "bg-[hsl(0,0%,96%)]", borderColor: "border-[hsl(0,0%,85%)]",
    order: 5, isFinal: true,
  },
  rejected: {
    key: "rejected", label: "Rechazada", shortLabel: "Rechazada",
    color: "hsl(0 72% 51%)", textColor: "text-[hsl(0,72%,40%)]",
    bgLight: "bg-[hsl(0,86%,97%)]", borderColor: "border-[hsl(0,60%,87%)]",
    order: 6, isFinal: true,
  },
} as const;

type StatusKey = keyof typeof PIPELINE_STATUSES;
const ALL_STATUSES: StatusKey[] = ["draft", "sent", "viewed", "accepted", "converted", "expired", "rejected"];

const STATUS_ICON_MAP: Record<StatusKey, LucideIcon> = {
  draft: FileText,
  sent: Send,
  viewed: Eye,
  accepted: CheckCircle2,
  converted: TrendingUp,
  expired: Clock,
  rejected: XCircle,
};

// ─── Date filter presets ───
const DATE_FILTER_PRESETS = [
  { key: "hoy", label: "Hoy" },
  { key: "ayer", label: "Ayer" },
  { key: "esta_semana", label: "Esta semana" },
  { key: "este_mes", label: "Este mes" },
] as const;
type DateFilterPreset = (typeof DATE_FILTER_PRESETS)[number]["key"];

const getDateRange = (preset: DateFilterPreset) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  switch (preset) {
    case "hoy": return { from: today, to: new Date(today.getTime() + 86400000 - 1) };
    case "ayer": { const y = new Date(today.getTime() - 86400000); return { from: y, to: new Date(today.getTime() - 1) }; }
    case "esta_semana": { const d = today.getDay(); const m = new Date(today.getTime() - ((d === 0 ? 6 : d - 1) * 86400000)); return { from: m, to: new Date(today.getTime() + 86400000 - 1) }; }
    case "este_mes": { const f = new Date(now.getFullYear(), now.getMonth(), 1); return { from: f, to: new Date(today.getTime() + 86400000 - 1) }; }
    default: return null;
  }
};

// ─── Types ───
interface Quote {
  id: string;
  short_code: string;
  status: StatusKey;
  customer_name: string;
  customer_company: string | null;
  customer_phone: string;
  customer_email: string | null;
  customer_city: string | null;
  customer_notes: string | null;
  subtotal: number;
  total: number;
  discount_amount: number;
  extras_total: number;
  delivery_fee: number;
  created_at: string;
  updated_at: string;
  viewed_at: string | null;
  accepted_at: string | null;
  line_items: QuoteLineItem[];
}

interface QuoteLineItem {
  id: string;
  service_name: string;
  description: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
  variables: any;
}

// ─── Component ───
export default function QuotesListPage() {
  const { tenantId } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [datePreset, setDatePreset] = useState<DateFilterPreset | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (tenantId) fetchQuotes();
  }, [tenantId]);

  const fetchQuotes = async () => {
    setLoading(true);
    const { data: quotesData, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("tenant_id", tenantId!)
      .order("created_at", { ascending: false });

    if (error) { toast.error(error.message); setLoading(false); return; }

    // Fetch line items for all quotes
    const quoteIds = (quotesData || []).map((q: any) => q.id);
    let allItems: any[] = [];
    if (quoteIds.length > 0) {
      const { data: items } = await supabase
        .from("quote_line_items")
        .select("*")
        .in("quote_id", quoteIds)
        .order("sort_order");
      allItems = items || [];
    }

    const enriched = (quotesData || []).map((q: any) => ({
      ...q,
      line_items: allItems.filter((i: any) => i.quote_id === q.id),
    }));

    setQuotes(enriched);
    setLoading(false);
  };

  // ─── Filters ───
  const baseFiltered = useMemo(() => {
    return quotes.filter((q) => {
      const matchesSearch =
        q.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.short_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.customer_company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.customer_email || "").toLowerCase().includes(searchTerm.toLowerCase());

      let matchesDate = true;
      if (datePreset) {
        const range = getDateRange(datePreset);
        if (range) {
          const created = new Date(q.created_at);
          if (created < range.from || created > range.to) matchesDate = false;
        }
      }
      return matchesSearch && matchesDate;
    });
  }, [quotes, searchTerm, datePreset]);

  const filteredQuotes = useMemo(() => {
    return baseFiltered.filter((q) => statusFilter === "all" || q.status === statusFilter);
  }, [baseFiltered, statusFilter]);

  // ─── Metrics ───
  const totalQuotes = filteredQuotes.length;
  const convertedQuotes = filteredQuotes.filter((q) => q.status === "accepted" || q.status === "converted").length;
  const conversionRate = totalQuotes > 0 ? (convertedQuotes / totalQuotes) * 100 : 0;

  // ─── Actions ───
  const updateStatus = async (quoteId: string, newStatus: StatusKey) => {
    setQuotes((prev) => prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus, updated_at: new Date().toISOString() } : q)));
    const { error } = await supabase.from("quotes").update({ status: newStatus, updated_at: new Date().toISOString() } as any).eq("id", quoteId);
    if (error) { toast.error("Error al actualizar"); fetchQuotes(); }
    else toast.success(`Estado: ${PIPELINE_STATUSES[newStatus].label}`);
  };

  const deleteQuote = async (quoteId: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
    const { error } = await supabase.from("quotes").delete().eq("id", quoteId);
    if (error) { toast.error("Error al eliminar"); fetchQuotes(); }
    else toast.success("Cotización eliminada");
  };

  const copyLink = (q: Quote) => {
    navigator.clipboard.writeText(`${window.location.origin}/q/view/${q.short_code}`);
    toast.success("Link copiado");
  };

  const sendWhatsApp = (q: Quote, type: "quote" | "promo" | "visit") => {
    if (!q.customer_phone) return;
    const clean = q.customer_phone.replace(/\D/g, "");
    const link = `${window.location.origin}/q/view/${q.short_code}`;
    let message = "";
    if (type === "quote") {
      message = `Hola ${q.customer_name}, te envío tu cotización:\n${link}`;
    } else if (type === "promo") {
      message = `Hola ${q.customer_name}! 🎁 Tenemos una promoción especial para ti. Revisa tu cotización:\n${link}`;
    } else {
      message = `Hola ${q.customer_name}, ¿cuándo te viene bien para agendar una visita técnica?`;
    }
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const exportToCSV = () => {
    const headers = ["Código", "Cliente", "Email", "Productos", "Total", "Estado", "Creada"];
    const csv = [
      headers.join(","),
      ...filteredQuotes.map((q) =>
        [`"${q.short_code}"`, `"${q.customer_name}"`, `"${q.customer_email || ""}"`,
          `"${q.line_items.length} productos"`, `"$${Number(q.total).toLocaleString()}"`,
          `"${PIPELINE_STATUSES[q.status]?.label || q.status}"`,
          `"${new Date(q.created_at).toLocaleDateString()}"`].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `cotizaciones_${new Date().toISOString().split("T")[0]}.csv`; a.click();
    toast.success("CSV exportado");
  };

  // ─── Row color by age ───
  const getRowClassName = (q: Quote) => {
    const days = Math.floor((Date.now() - new Date(q.updated_at).getTime()) / 86400000);
    if (q.status === "accepted" || q.status === "converted") return "bg-[hsl(142,76%,97%)] hover:bg-[hsl(142,76%,94%)]";
    if (q.status === "rejected") return "bg-[hsl(0,86%,98%)] hover:bg-[hsl(0,86%,95%)]";
    if (days > 14) return "bg-[hsl(0,86%,98%)] hover:bg-[hsl(0,86%,95%)]";
    if (days > 7) return "bg-[hsl(48,96%,97%)] hover:bg-[hsl(48,96%,94%)]";
    return "hover:bg-muted/50";
  };

  // ─── Status Badge with dropdown ───
  const StatusBadge = ({ status, onChange }: { status: StatusKey; onChange?: (s: StatusKey) => void }) => {
    const config = PIPELINE_STATUSES[status] || PIPELINE_STATUSES.draft;
    const Icon = STATUS_ICON_MAP[status] || FileText;
    const badge = (
      <Badge className={`${config.bgLight} ${config.textColor} ${config.borderColor} border gap-1 text-xs py-0.5 px-2 cursor-pointer hover:opacity-80`}>
        <Icon className="h-3 w-3" />
        {config.shortLabel}
        {onChange && <ChevronDown className="h-3 w-3" />}
      </Badge>
    );
    if (!onChange) return badge;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" className="p-0 h-auto">{badge}</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background border shadow-md max-h-80 overflow-y-auto">
          {ALL_STATUSES.map((sk) => {
            const sc = PIPELINE_STATUSES[sk];
            const IC = STATUS_ICON_MAP[sk];
            return (
              <DropdownMenuItem key={sk} onClick={() => onChange(sk)} className="flex items-center gap-2 cursor-pointer">
                <IC className="h-3.5 w-3.5" style={{ color: sc.color }} />
                {sc.shortLabel}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">CRM / Cotizaciones</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Gestión de cotizaciones</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchQuotes} className="shrink-0">
          <RefreshCw className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Refrescar</span>
        </Button>
      </div>

      {/* Metrics + Filters Card */}
      <Card className="overflow-hidden">
        <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base sm:text-2xl flex items-center gap-1.5 sm:gap-2">
              <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 shrink-0" />
              <span className="truncate">Cotizaciones</span>
            </CardTitle>
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <div className="bg-primary/10 rounded-md px-2 py-1 sm:p-2 text-center">
                <div className="text-sm sm:text-2xl font-bold text-primary leading-tight">{totalQuotes}</div>
                <div className="text-[9px] sm:text-sm text-muted-foreground leading-tight hidden sm:block">Total</div>
              </div>
              <div className="bg-[hsl(142,76%,94%)] rounded-md px-2 py-1 sm:p-2 text-center">
                <div className="text-sm sm:text-2xl font-bold text-[hsl(142,71%,30%)] leading-tight">{conversionRate.toFixed(0)}%</div>
                <div className="text-[9px] sm:text-sm text-[hsl(142,71%,40%)] leading-tight hidden sm:block">Conv.</div>
              </div>
              <Button onClick={exportToCSV} variant="outline" size="sm" className="h-7 sm:h-9 px-2 sm:px-3">
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline ml-2">CSV</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          {/* Conversion bar */}
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between text-[10px] sm:text-sm mb-1 sm:mb-2">
              <span>Conversión</span>
              <span>{convertedQuotes}/{totalQuotes}</span>
            </div>
            <Progress value={conversionRate} className="h-1.5 sm:h-2" />
          </div>

          {/* Filters */}
          <div className="flex gap-2 sm:gap-4 mb-3 sm:mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[120px]">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <Input
                placeholder="Buscar nombre, email o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
              />
            </div>
            <Select value={datePreset || "all"} onValueChange={(v) => setDatePreset(v === "all" ? null : (v as DateFilterPreset))}>
              <SelectTrigger className="w-[100px] sm:w-[140px] h-8 sm:h-10 text-xs sm:text-sm">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 shrink-0" />
                <SelectValue placeholder="Fecha" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="all">Todas</SelectItem>
                {DATE_FILTER_PRESETS.map((p) => <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[100px] sm:w-[160px] h-8 sm:h-10 text-xs sm:text-sm">
                <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2 shrink-0" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="bg-background max-h-60">
                <SelectItem value="all">Todos</SelectItem>
                {ALL_STATUSES.map((sk) => {
                  const ps = PIPELINE_STATUSES[sk];
                  const IC = STATUS_ICON_MAP[sk];
                  return (
                    <SelectItem key={sk} value={sk}>
                      <span className="flex items-center gap-1.5"><IC className="h-3.5 w-3.5" style={{ color: ps.color }} /> {ps.shortLabel}</span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Status pills */}
          <div className="overflow-x-auto -mx-2 px-2 scrollbar-hide">
            <div className="flex gap-2 sm:gap-3 min-w-max pb-1">
              {ALL_STATUSES.map((sk) => {
                const ps = PIPELINE_STATUSES[sk];
                const count = baseFiltered.filter((q) => q.status === sk).length;
                const isActive = statusFilter === sk;
                const IC = STATUS_ICON_MAP[sk];
                return (
                  <div
                    key={sk}
                    className={`${ps.bgLight} ${ps.borderColor} border rounded-2xl flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 cursor-pointer transition-all hover:shadow-md min-w-[100px] sm:min-w-[120px] ${isActive ? "ring-2 ring-primary ring-offset-2 shadow-md" : ""}`}
                    onClick={() => setStatusFilter(statusFilter === sk ? "all" : sk)}
                  >
                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex-shrink-0" style={{ background: ps.color.replace(")", " / 0.15)") }}>
                      <IC className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ps.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg sm:text-xl font-bold leading-tight">{count}</div>
                      <div className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight truncate font-medium">{ps.shortLabel}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filteredQuotes.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              {quotes.length === 0 ? "Aún no hay cotizaciones. Comparte tus páginas de cotización para empezar." : "No se encontraron cotizaciones con esos filtros."}
            </div>
          ) : (
            <>
              {/* Mobile view */}
              <div className="md:hidden divide-y divide-border/50">
                {filteredQuotes.map((q) => {
                  const itemsCount = q.line_items.length;
                  return (
                    <div key={q.id} className={`p-2.5 ${getRowClassName(q).replace("hover:", "")}`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          <span className="text-xs font-semibold text-primary">
                            <Calendar className="h-3 w-3 mr-1 inline" />
                            {new Date(q.created_at).toLocaleDateString("es", { day: "2-digit", month: "short", year: "2-digit" })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <StatusBadge status={q.status} onChange={(s) => updateStatus(q.id, s)} />
                          <span className="font-bold text-primary text-sm">${Number(q.total).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-xs truncate">{q.customer_name}</div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-muted-foreground">#{q.short_code}</span>
                            {itemsCount > 0 && <span className="text-[10px] text-muted-foreground">• {itemsCount} producto{itemsCount > 1 ? "s" : ""}</span>}
                          </div>
                        </div>
                        {q.customer_phone && (
                          <Button variant="ghost" size="sm" onClick={() => sendWhatsApp(q, "quote")} className="h-7 px-2 text-green-600 hover:text-green-800 hover:bg-green-50">
                            <MessageCircle className="h-3.5 w-3.5 mr-1" /><span className="text-[10px]">WA</span>
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 pt-1.5 border-t border-border/30">
                        <Button variant="ghost" size="sm" onClick={() => copyLink(q)} className="h-8 w-8 p-0 hover:bg-blue-100" title="Copiar link"><Copy className="h-4 w-4 text-blue-600" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => window.open(`/q/view/${q.short_code}`, "_blank")} className="h-8 w-8 p-0 hover:bg-purple-100" title="Ver"><ExternalLink className="h-4 w-4 text-purple-600" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => sendWhatsApp(q, "quote")} className="h-8 w-8 p-0 hover:bg-green-100" title="Enviar"><Share2 className="h-4 w-4 text-green-600" /></Button>
                        <div className="flex-1" />
                        <AlertDialog>
                          <AlertDialogTrigger asChild><Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100"><Trash2 className="h-4 w-4 text-red-600" /></Button></AlertDialogTrigger>
                          <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar cotización?</AlertDialogTitle>
                              <AlertDialogDescription>La cotización de <strong>{q.customer_name}</strong> será eliminada permanentemente.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-row gap-2">
                              <AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteQuote(q.id)} className="bg-destructive hover:bg-destructive/90 flex-1">Eliminar</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead className="min-w-[110px]">Fecha</TableHead>
                      <TableHead className="min-w-[180px]">Cliente</TableHead>
                      <TableHead className="min-w-[130px] text-right font-semibold">Total</TableHead>
                      <TableHead className="min-w-[150px]">Estado</TableHead>
                      <TableHead className="min-w-[200px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuotes.map((q) => {
                      const itemsCount = q.line_items.length;
                      const isExpanded = expandedRows.has(q.id);
                      return (
                        <>
                          <TableRow key={q.id} className={getRowClassName(q)}>
                            <TableCell className="p-2">
                              <Button variant="ghost" size="sm" onClick={() => toggleExpand(q.id)} className="h-7 w-7 p-0 hover:bg-primary/10">
                                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                              </Button>
                            </TableCell>
                            <TableCell className="font-medium p-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 text-primary" />
                                {new Date(q.created_at).toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" })}
                              </div>
                            </TableCell>
                            <TableCell className="p-3">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-medium">{q.customer_name}</span>
                                {q.customer_company && <span className="text-xs text-muted-foreground">{q.customer_company}</span>}
                                {itemsCount > 0 && (
                                  <Badge variant="secondary" className="w-fit text-xs">{itemsCount} producto{itemsCount > 1 ? "s" : ""}</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right p-3 font-bold text-lg text-primary">${Number(q.total).toLocaleString()}</TableCell>
                            <TableCell className="p-3"><StatusBadge status={q.status} onChange={(s) => updateStatus(q.id, s)} /></TableCell>
                            <TableCell className="p-3">
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" onClick={() => copyLink(q)} title="Copiar link" className="h-8 w-8 p-0 hover:bg-blue-100"><Copy className="h-4 w-4 text-blue-600" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => window.open(`/q/view/${q.short_code}`, "_blank")} title="Ver" className="h-8 w-8 p-0 hover:bg-purple-100"><ExternalLink className="h-4 w-4 text-purple-600" /></Button>
                                <Button variant="ghost" size="sm" onClick={() => sendWhatsApp(q, "quote")} title="Enviar WA" className="h-8 w-8 p-0 hover:bg-green-100"><Share2 className="h-4 w-4 text-green-600" /></Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild><Button variant="ghost" size="sm" title="Eliminar" className="h-8 w-8 p-0 hover:bg-red-100"><Trash2 className="h-4 w-4 text-red-600" /></Button></AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>¿Eliminar cotización?</AlertDialogTitle>
                                      <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteQuote(q.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                          {isExpanded && (
                            <TableRow key={`${q.id}-details`}>
                              <TableCell colSpan={6} className="bg-muted/30 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Código:</span>
                                    <span className="font-mono font-semibold text-primary">#{q.short_code}</span>
                                  </div>
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl">
                                    {/* Products */}
                                    <div>
                                      <h4 className="font-semibold mb-2">Productos ({itemsCount})</h4>
                                      {itemsCount > 0 ? (
                                        <div className="space-y-2">
                                          {q.line_items.map((item) => (
                                            <div key={item.id} className="text-sm bg-background p-2 rounded border">
                                              <div className="font-medium">{item.service_name}</div>
                                              {item.description && <div className="text-muted-foreground text-xs">{item.description}</div>}
                                              <div className="font-medium mt-1">${Number(item.line_total).toLocaleString()}</div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : <p className="text-sm text-muted-foreground">Sin productos</p>}
                                    </div>
                                    {/* Totals */}
                                    <div>
                                      <h4 className="font-semibold mb-2">Totales</h4>
                                      <div className="bg-background p-3 rounded border text-sm space-y-1">
                                        <div className="flex justify-between"><span>Productos:</span><span>${Number(q.subtotal).toLocaleString()}</span></div>
                                        {Number(q.extras_total) > 0 && <div className="flex justify-between"><span>Extras:</span><span>${Number(q.extras_total).toLocaleString()}</span></div>}
                                        {Number(q.discount_amount) > 0 && <div className="flex justify-between text-green-600"><span>Descuento:</span><span>-${Number(q.discount_amount).toLocaleString()}</span></div>}
                                        {Number(q.delivery_fee) > 0 && <div className="flex justify-between"><span>Envío:</span><span>${Number(q.delivery_fee).toLocaleString()}</span></div>}
                                        <div className="flex justify-between font-bold border-t pt-1"><span>Total:</span><span className="text-primary">${Number(q.total).toLocaleString()}</span></div>
                                      </div>
                                    </div>
                                    {/* WhatsApp */}
                                    <div>
                                      <h4 className="font-semibold mb-2">Enviar WhatsApp</h4>
                                      <div className="space-y-2">
                                        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-green-700 border-green-200 hover:bg-green-50" onClick={() => sendWhatsApp(q, "quote")}>
                                          <Share2 className="h-4 w-4" /> Enviar cotización
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-purple-700 border-purple-200 hover:bg-purple-50" onClick={() => sendWhatsApp(q, "promo")}>
                                          <Gift className="h-4 w-4" /> Enviar promoción/cupón
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-blue-700 border-blue-200 hover:bg-blue-50" onClick={() => sendWhatsApp(q, "visit")}>
                                          <CalendarCheck className="h-4 w-4" /> Agendar visita técnica
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
