import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PRIORITIES, DEAL_SOURCES, DATE_FILTER_PRESETS, type DateFilterPreset } from "@/config/pipeline-config";
import { Search, RefreshCw, X, CalendarIcon } from "lucide-react";

interface PipelineFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  priorityFilter: string | null;
  setPriorityFilter: (v: string | null) => void;
  sourceFilter: string | null;
  setSourceFilter: (v: string | null) => void;
  datePreset: DateFilterPreset | null;
  setDatePreset: (v: DateFilterPreset | null) => void;
  onRefresh: () => void;
}

export function PipelineFilters({
  searchTerm, setSearchTerm, priorityFilter, setPriorityFilter,
  sourceFilter, setSourceFilter, datePreset, setDatePreset, onRefresh,
}: PipelineFiltersProps) {
  const hasFilters = searchTerm || priorityFilter || sourceFilter || datePreset;
  const clearFilters = () => { setSearchTerm(""); setPriorityFilter(null); setSourceFilter(null); setDatePreset(null); };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center flex-wrap">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar nombre, empresa, email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 h-9" />
      </div>
      <Select value={datePreset || "all"} onValueChange={v => setDatePreset(v === "all" ? null : v as DateFilterPreset)}>
        <SelectTrigger className="w-full md:w-40 h-9">
          <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" /><SelectValue placeholder="Fecha" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las fechas</SelectItem>
          {DATE_FILTER_PRESETS.filter(p => p.key !== 'custom').map(p => (<SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>))}
        </SelectContent>
      </Select>
      <Select value={priorityFilter || "all"} onValueChange={v => setPriorityFilter(v === "all" ? null : v)}>
        <SelectTrigger className="w-full md:w-32 h-9"><SelectValue placeholder="Prioridad" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {PRIORITIES.map(p => (<SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>))}
        </SelectContent>
      </Select>
      <Select value={sourceFilter || "all"} onValueChange={v => setSourceFilter(v === "all" ? null : v)}>
        <SelectTrigger className="w-full md:w-32 h-9"><SelectValue placeholder="Fuente" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {DEAL_SOURCES.map(s => (<SelectItem key={s.key} value={s.key}>{s.icon} {s.label}</SelectItem>))}
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        {hasFilters && (<Button variant="ghost" size="sm" onClick={clearFilters} className="h-9"><X className="h-4 w-4 mr-1" /> Limpiar</Button>)}
        <Button variant="outline" size="sm" onClick={onRefresh} className="h-9"><RefreshCw className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
