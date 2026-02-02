import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import type { Cotizacion } from './types';
import { PIPELINE_ESTADOS, FUENTES, MOTIVOS_PERDIDA } from './types';

interface DashboardMetricsProps {
  cotizaciones: Cotizacion[];
}

export const DashboardMetrics = ({ cotizaciones }: DashboardMetricsProps) => {
  const metrics = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentCotizaciones = cotizaciones.filter(c => 
      new Date(c.created_at) >= thirtyDaysAgo
    );

    // Total stats
    const totalCotizaciones = cotizaciones.length;
    const totalValorEstimado = cotizaciones.reduce((acc, c) => acc + (c.valor_estimado || 0), 0);
    const cerradasGanadas = cotizaciones.filter(c => c.estado === 'cerrado_ganado');
    const totalGanado = cerradasGanadas.reduce((acc, c) => acc + (c.valor_final || c.valor_estimado || 0), 0);
    const perdidas = cotizaciones.filter(c => c.estado === 'perdido');

    // Conversion rate
    const finalizadas = cerradasGanadas.length + perdidas.length;
    const conversionRate = finalizadas > 0 ? (cerradasGanadas.length / finalizadas) * 100 : 0;

    // Time metrics
    const cotizacionesConContacto = cotizaciones.filter(c => c.fecha_primer_contacto);
    const avgTimeToContact = cotizacionesConContacto.length > 0
      ? cotizacionesConContacto.reduce((acc, c) => {
          const created = new Date(c.created_at).getTime();
          const contacted = new Date(c.fecha_primer_contacto!).getTime();
          return acc + (contacted - created) / (1000 * 60);
        }, 0) / cotizacionesConContacto.length
      : 0;

    // By source
    const bySource = FUENTES.map(fuente => ({
      ...fuente,
      count: cotizaciones.filter(c => c.fuente === fuente.value).length,
      ganadas: cotizaciones.filter(c => c.fuente === fuente.value && c.estado === 'cerrado_ganado').length,
    }));

    // By stage (funnel)
    const byStage = PIPELINE_ESTADOS.map(estado => ({
      ...estado,
      count: cotizaciones.filter(c => c.estado === estado.value).length,
      value: cotizaciones.filter(c => c.estado === estado.value).reduce((acc, c) => acc + (c.valor_estimado || 0), 0),
    }));

    // Loss reasons
    const lossReasons = MOTIVOS_PERDIDA.map(motivo => ({
      ...motivo,
      count: perdidas.filter(c => c.motivo_perdida === motivo.value).length,
    })).filter(m => m.count > 0).sort((a, b) => b.count - a.count);

    return {
      totalCotizaciones,
      totalValorEstimado,
      totalGanado,
      conversionRate,
      avgTimeToContact,
      cerradasGanadas: cerradasGanadas.length,
      perdidas: perdidas.length,
      bySource,
      byStage,
      lossReasons,
      recentCount: recentCotizaciones.length,
    };
  }, [cotizaciones]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{metrics.totalCotizaciones}</p>
                <p className="text-white/60 text-sm">Total cotizaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  ${metrics.totalGanado.toLocaleString()}
                </p>
                <p className="text-white/60 text-sm">Ventas cerradas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{metrics.conversionRate.toFixed(1)}%</p>
                <p className="text-white/60 text-sm">Tasa conversión</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {metrics.avgTimeToContact > 60 
                    ? `${(metrics.avgTimeToContact / 60).toFixed(0)}h`
                    : `${metrics.avgTimeToContact.toFixed(0)}m`
                  }
                </p>
                <p className="text-white/60 text-sm">Tiempo a contacto</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Funnel */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-viralOrange" />
            Embudo de Ventas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.byStage.filter(s => s.count > 0).map((stage, index) => {
              const maxCount = Math.max(...metrics.byStage.map(s => s.count));
              const width = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
              
              return (
                <div key={stage.value} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className={stage.color}>{stage.label}</span>
                    <span className="text-white/70">
                      {stage.count} - ${stage.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-6 bg-gray-800 rounded overflow-hidden">
                    <div 
                      className={`h-full ${stage.bgColor} transition-all duration-500`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* By Source */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Conversión por Fuente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.bySource.filter(s => s.count > 0).map(source => {
                const convRate = source.count > 0 ? (source.ganadas / source.count) * 100 : 0;
                return (
                  <div key={source.value} className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{source.label}</p>
                      <p className="text-white/50 text-sm">{source.count} cotizaciones</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">{source.ganadas} ganadas</p>
                      <p className="text-white/50 text-sm">{convRate.toFixed(1)}% conv.</p>
                    </div>
                  </div>
                );
              })}
              {metrics.bySource.filter(s => s.count > 0).length === 0 && (
                <p className="text-white/40 text-center py-4">Sin datos</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loss Reasons */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Top Motivos de Pérdida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.lossReasons.slice(0, 5).map((reason, index) => (
                <div key={reason.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-sm">#{index + 1}</span>
                    <p className="text-white">{reason.label}</p>
                  </div>
                  <Badge variant="outline" className="text-red-400 border-red-400/30">
                    {reason.count}
                  </Badge>
                </div>
              ))}
              {metrics.lossReasons.length === 0 && (
                <p className="text-white/40 text-center py-4">Sin pérdidas registradas</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Win/Loss Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-green-900/20 border-green-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-10 h-10 text-green-400" />
                <div>
                  <p className="text-3xl font-bold text-green-400">{metrics.cerradasGanadas}</p>
                  <p className="text-green-400/70">Cerradas ganadas</p>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-900/20 border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-10 h-10 text-red-400" />
                <div>
                  <p className="text-3xl font-bold text-red-400">{metrics.perdidas}</p>
                  <p className="text-red-400/70">Perdidas</p>
                </div>
              </div>
              <TrendingDown className="w-8 h-8 text-red-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
