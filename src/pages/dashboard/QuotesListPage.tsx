import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  FileText, Search, ExternalLink, Copy, MessageCircle, DollarSign,
  Eye, CheckCircle2, Clock, XCircle, Send, TrendingUp
} from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: "Borrador", color: "bg-muted text-muted-foreground", icon: FileText },
  sent: { label: "Enviada", color: "bg-blue-500/10 text-blue-600", icon: Send },
  viewed: { label: "Vista", color: "bg-yellow-500/10 text-yellow-600", icon: Eye },
  accepted: { label: "Aceptada", color: "bg-green-500/10 text-green-600", icon: CheckCircle2 },
  expired: { label: "Expirada", color: "bg-muted text-muted-foreground", icon: Clock },
  converted: { label: "Convertida", color: "bg-primary/10 text-primary", icon: TrendingUp },
  rejected: { label: "Rechazada", color: "bg-destructive/10 text-destructive", icon: XCircle },
};

interface Quote {
  id: string;
  short_code: string;
  status: string;
  customer_name: string;
  customer_company: string | null;
  customer_phone: string;
  customer_email: string | null;
  customer_city: string | null;
  subtotal: number;
  total: number;
  discount_amount: number;
  extras_total: number;
  created_at: string;
  viewed_at: string | null;
  accepted_at: string | null;
}

export default function QuotesListPage() {
  const { tenantId } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (tenantId) fetchQuotes();
  }, [tenantId]);

  const fetchQuotes = async () => {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("tenant_id", tenantId!)
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setQuotes((data as any[]) || []);
    setLoading(false);
  };

  const filtered = quotes.filter((q) => {
    const matchesSearch = q.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      q.short_code.toLowerCase().includes(search.toLowerCase()) ||
      (q.customer_company || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Analytics
  const totalQuotes = quotes.length;
  const acceptedQuotes = quotes.filter((q) => q.status === "accepted" || q.status === "converted").length;
  const conversionRate = totalQuotes > 0 ? ((acceptedQuotes / totalQuotes) * 100).toFixed(1) : "0";
  const totalValue = quotes.reduce((sum, q) => sum + q.total, 0);
  const avgValue = totalQuotes > 0 ? totalValue / totalQuotes : 0;

  if (loading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cotizaciones</h1>
        <p className="text-muted-foreground">Gestiona todas las cotizaciones generadas</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{totalQuotes}</p><p className="text-xs text-muted-foreground">Total cotizaciones</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{conversionRate}%</p><p className="text-xs text-muted-foreground">Tasa de conversión</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">${totalValue.toLocaleString()}</p><p className="text-xs text-muted-foreground">Valor total</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">${avgValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p><p className="text-xs text-muted-foreground">Valor promedio</p></CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar por nombre, código..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {Object.entries(statusConfig).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quote List */}
      {filtered.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">
          {totalQuotes === 0 ? "Aún no hay cotizaciones. Comparte tus páginas de cotización para empezar." : "No se encontraron cotizaciones con esos filtros."}
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => {
            const sc = statusConfig[q.status] || statusConfig.draft;
            const StatusIcon = sc.icon;
            return (
              <Card key={q.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{q.customer_name}</span>
                        {q.customer_company && <span className="text-sm text-muted-foreground">· {q.customer_company}</span>}
                        <Badge className={`${sc.color} gap-1`}><StatusIcon className="h-3 w-3" />{sc.label}</Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="font-mono">#{q.short_code}</span>
                        <span>{new Date(q.created_at).toLocaleDateString()}</span>
                        {q.customer_phone && <span>{q.customer_phone}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-foreground">${q.total.toLocaleString()}</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/q/view/${q.short_code}`);
                          toast.success("Link copiado");
                        }}><Copy className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => window.open(`/q/view/${q.short_code}`, "_blank")}><ExternalLink className="h-4 w-4" /></Button>
                        {q.customer_phone && (
                          <Button size="sm" variant="ghost" onClick={() => window.open(`https://wa.me/${q.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${q.customer_name}, te envío tu cotización: ${window.location.origin}/q/view/${q.short_code}`)}`, "_blank")}>
                            <MessageCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
