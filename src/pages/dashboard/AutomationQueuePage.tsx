import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format, formatDistanceToNow, isPast } from "date-fns";
import { es } from "date-fns/locale";
import { Copy, RefreshCw, CheckCircle, XCircle, Clock, Send, List, Zap, Search, ExternalLink, Loader2 } from "lucide-react";
import { QUEUE_STATUS_CONFIG, FOLLOW_UP_TEMPLATES, type QueueStatusKey } from "@/config/automation-templates";

interface QueueItem {
  id: string;
  tenant_id: string;
  automation_id: string;
  deal_id: string | null;
  entity_type: string | null;
  trigger_event: string | null;
  recipient_phone: string | null;
  message_template: string | null;
  status: string;
  scheduled_at: string;
  sent_at: string | null;
  error_message: string | null;
  processed_at: string | null;
  created_at: string;
}

export default function AutomationQueuePage() {
  const { tenantId } = useAuth();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [tab, setTab] = useState("queue");

  const { data: queueItems = [], isLoading } = useQuery({
    queryKey: ["automation-queue-dashboard", tenantId, statusFilter],
    queryFn: async () => {
      if (!tenantId) return [];
      let query = supabase
        .from("automation_queue")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("scheduled_at", { ascending: true });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query.limit(200);
      if (error) throw error;
      return (data || []) as QueueItem[];
    },
    enabled: !!tenantId,
  });

  const markSent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("automation_queue")
        .update({ status: "sent", sent_at: new Date().toISOString(), processed_at: new Date().toISOString() } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automation-queue-dashboard"] });
      toast.success("Marcado como enviado");
    },
  });

  const cancelItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("automation_queue")
        .update({ status: "cancelled" } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automation-queue-dashboard"] });
      toast.success("Cancelado");
    },
  });

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
  };

  const openWhatsApp = (phone: string, message: string) => {
    const cleanPhone = phone.replace(/[^0-9+]/g, "").replace("+", "");
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const stats = {
    total: queueItems.length,
    pending: queueItems.filter(i => i.status === "pending").length,
    sent: queueItems.filter(i => i.status === "sent").length,
    failed: queueItems.filter(i => i.status === "failed").length,
    overdue: queueItems.filter(i => i.status === "pending" && isPast(new Date(i.scheduled_at))).length,
  };

  const filtered = queueItems.filter(item => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (item.trigger_event || '').toLowerCase().includes(s) || (item.recipient_phone || '').toLowerCase().includes(s) || (item.message_template || '').toLowerCase().includes(s);
  });

  const getStatusBadge = (status: string) => {
    const cfg = QUEUE_STATUS_CONFIG[(status || "pending") as QueueStatusKey] || QUEUE_STATUS_CONFIG.pending;
    return <Badge variant="outline" className={`text-[10px] ${cfg.color} border`}>{cfg.icon} {cfg.label}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />Cola de Automatización
        </h2>
        <p className="text-sm text-muted-foreground">Gestiona los mensajes automáticos programados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {[
          { label: "Total", value: stats.total, icon: "📊", color: "text-foreground" },
          { label: "Pendientes", value: stats.pending, icon: "⏳", color: "text-yellow-600" },
          { label: "Enviados", value: stats.sent, icon: "✅", color: "text-green-600" },
          { label: "Fallidos", value: stats.failed, icon: "❌", color: "text-red-600" },
          { label: "Vencidos", value: stats.overdue, icon: "⚠️", color: "text-orange-600" },
        ].map(s => (
          <Card key={s.label} className="p-3">
            <div className="text-[10px] text-muted-foreground">{s.icon} {s.label}</div>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="queue" className="gap-1"><List className="h-3.5 w-3.5" /> Cola</TabsTrigger>
          <TabsTrigger value="templates" className="gap-1"><Zap className="h-3.5 w-3.5" /> Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Estado" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">⏳ Pendiente</SelectItem>
                <SelectItem value="sent">✅ Enviado</SelectItem>
                <SelectItem value="failed">❌ Falló</SelectItem>
                <SelectItem value="cancelled">🚫 Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => queryClient.invalidateQueries({ queryKey: ["automation-queue-dashboard"] })}>
              <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Estado</TableHead>
                  <TableHead className="text-xs">Evento</TableHead>
                  <TableHead className="text-xs">Destinatario</TableHead>
                  <TableHead className="text-xs">Programado</TableHead>
                  <TableHead className="text-xs">Enviado</TableHead>
                  <TableHead className="text-xs text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Sin mensajes en cola</TableCell></TableRow>
                ) : filtered.map(item => {
                  const isOverdue = item.status === "pending" && isPast(new Date(item.scheduled_at));
                  return (
                    <TableRow key={item.id} className={isOverdue ? "bg-orange-500/5" : ""}>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-xs">{item.trigger_event || '—'}</TableCell>
                      <TableCell className="text-xs font-mono">{item.recipient_phone || "—"}</TableCell>
                      <TableCell className="text-xs">
                        <div>{format(new Date(item.scheduled_at), "dd/MM HH:mm")}</div>
                        <div className="text-[10px] text-muted-foreground">
                          {formatDistanceToNow(new Date(item.scheduled_at), { locale: es, addSuffix: true })}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">{item.sent_at ? format(new Date(item.sent_at), "dd/MM HH:mm") : "—"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          {item.message_template && (
                            <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => { setSelectedItem(item); setPreviewOpen(true); }}>
                              <Send className="h-3 w-3" />
                            </Button>
                          )}
                          {item.status === "pending" && (
                            <>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-green-600" onClick={() => markSent.mutate(item.id)}>
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-red-500" onClick={() => cancelItem.mutate(item.id)}>
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            {Object.values(FOLLOW_UP_TEMPLATES).map(tpl => (
              <Card key={tpl.key}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <span>{tpl.icon}</span> {tpl.label}
                  </CardTitle>
                  <CardDescription className="text-[10px]">
                    Se envía {tpl.delayHours}h después · {tpl.triggerEvent}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-[11px] whitespace-pre-wrap bg-muted/50 p-3 rounded-md border max-h-40 overflow-y-auto font-sans">{tpl.template}</pre>
                  <Button variant="outline" size="sm" className="mt-2 w-full text-xs" onClick={() => copyMessage(tpl.template)}>
                    <Copy className="h-3 w-3 mr-1" /> Copiar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="text-sm">📤 Enviar mensaje</DialogTitle></DialogHeader>
          {selectedItem && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Destinatario:</span>
                <span className="font-mono font-medium">{selectedItem.recipient_phone || "Sin número"}</span>
              </div>
              <Textarea value={selectedItem.message_template || ""} readOnly className="text-xs min-h-[150px] font-sans" />
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => selectedItem?.message_template && copyMessage(selectedItem.message_template)}>
              <Copy className="h-3 w-3 mr-1" /> Copiar
            </Button>
            {selectedItem?.recipient_phone && selectedItem?.message_template && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => {
                openWhatsApp(selectedItem.recipient_phone!, selectedItem.message_template!);
                markSent.mutate(selectedItem.id);
                setPreviewOpen(false);
              }}>
                <ExternalLink className="h-3 w-3 mr-1" /> WhatsApp
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
