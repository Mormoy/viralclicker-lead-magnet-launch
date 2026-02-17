import { Monitor, Kanban } from 'lucide-react';

const EarlyProofSection = () => {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-6">
          <span className="text-viralOrange font-semibold text-sm uppercase tracking-wider">
            Demo rápida
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-2">
            Así se ve por dentro
          </h2>
          <p className="text-white/60 text-sm">
            Así se ve una cotización viva + pipeline de seguimiento
          </p>
        </div>

        {/* Product Preview Mock */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Quote Preview Mock */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-900/80 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/40 text-xs ml-2">cotizacion.tuempresa.com/VC-0047</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-viralOrange" />
                <span className="text-white font-semibold text-sm">Cotización Viva</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-gray-900/50 rounded-lg px-3 py-2">
                  <span className="text-white/70 text-xs">Cortinas Roller Blackout 2.4m</span>
                  <span className="text-viralOrange text-xs font-bold">$380</span>
                </div>
                <div className="flex justify-between items-center bg-gray-900/50 rounded-lg px-3 py-2">
                  <span className="text-white/70 text-xs">Instalación profesional</span>
                  <span className="text-viralOrange text-xs font-bold">$120</span>
                </div>
                <div className="flex justify-between items-center bg-viralOrange/10 rounded-lg px-3 py-2 border border-viralOrange/30">
                  <span className="text-white font-medium text-xs">Total</span>
                  <span className="text-viralOrange font-bold text-sm">$500</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full">✓ Cupón VERANO15 aplicado</span>
                <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded-full">Válida 72h</span>
              </div>
            </div>
          </div>

          {/* Pipeline Preview Mock */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-900/80 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/40 text-xs ml-2">crm.viralclicker.com/pipeline</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Kanban className="w-5 h-5 text-viralOrange" />
                <span className="text-white font-semibold text-sm">Pipeline CRM</span>
              </div>
              <div className="flex gap-2 overflow-hidden">
                {[
                  { label: 'Nuevo', count: 4, color: 'bg-blue-500/20 text-blue-400' },
                  { label: 'Cotizado', count: 3, color: 'bg-yellow-500/20 text-yellow-400' },
                  { label: 'Negociando', count: 2, color: 'bg-viralOrange/20 text-viralOrange' },
                  { label: 'Cerrado', count: 1, color: 'bg-green-500/20 text-green-400' },
                ].map((col) => (
                  <div key={col.label} className="flex-1 min-w-0">
                    <div className={`text-[10px] font-medium px-2 py-1 rounded-t ${col.color}`}>
                      {col.label} ({col.count})
                    </div>
                    <div className="bg-gray-900/50 rounded-b p-1.5 space-y-1">
                      {Array.from({ length: Math.min(col.count, 2) }).map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded px-2 py-1.5">
                          <div className="w-full h-1.5 bg-gray-700 rounded mb-1" />
                          <div className="w-2/3 h-1.5 bg-gray-700/50 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <span className="bg-viralOrange/20 text-viralOrange text-[10px] px-2 py-1 rounded-full">🔔 3 seguimientos pendientes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyProofSection;
