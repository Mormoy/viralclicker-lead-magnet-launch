// ============================================================================
// "Así se ve el antes y el después".
//
// Antes era un bloque de párrafos con tres números: mucho texto y ningún
// diseño. Ahora es una comparación de dos columnas que se entiende sin leer —
// la izquierda apagada con el teléfono que nadie contestó, la derecha viva con
// lo que pasa cuando sí se contesta.
//
// El aviso de la FTC se mantiene, pero en UNA línea al pie: es obligatorio,
// no un párrafo de introducción y otro de cierre.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PhoneMissed, PhoneCall, MessageSquareOff } from 'lucide-react';
import { subeSuave } from '@/components/vc/skin';

/** Un teléfono dibujado en código: no hay fotos y no hacen falta. */
function Telefono({ apagado, children }: { apagado?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`mx-auto w-full max-w-[15rem] rounded-[1.6rem] border-[3px] p-3 ${
        apagado ? 'border-vc-marron3/40 bg-[#EDE7DD]' : 'border-vc-marron bg-white'
      }`}
    >
      <span
        aria-hidden
        className={`mx-auto mb-3 block h-1.5 w-12 rounded-full ${
          apagado ? 'bg-vc-marron3/30' : 'bg-vc-marron/25'
        }`}
      />
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Aviso({
  icono: Icono, texto, apagado,
}: {
  icono: typeof PhoneMissed; texto: string; apagado?: boolean;
}) {
  return (
    <span
      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-semibold leading-tight ${
        apagado ? 'bg-white/70 text-vc-marron3' : 'bg-vc-waVerde text-vc-marron'
      }`}
    >
      <Icono className={`h-4 w-4 shrink-0 ${apagado ? 'text-vc-alerta' : 'text-[#2F6B3F]'}`} />
      {texto}
    </span>
  );
}

export default function AntesDespues() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="grid items-stretch gap-0 md:grid-cols-[1fr_auto_1fr]">
        {/* ── SIN ─────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          className="flex flex-col border-2 border-vc-marron3/40 bg-[#F3EEE5] p-6 md:p-8"
        >
          <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-vc-marron3">
            {t('comparacion.sinTag')}
          </p>

          <div className="my-6">
            <Telefono apagado>
              <Aviso apagado icono={PhoneMissed} texto={t('comparacion.sinLlamadas')} />
              <Aviso apagado icono={MessageSquareOff} texto={t('comparacion.sinMensaje')} />
            </Telefono>
          </div>

          <div className="mt-auto">
            <p className="font-display text-[3.25rem] font-black leading-[0.9] text-vc-marron3">
              {t('home.caseBefore1')}
            </p>
            <p className="mt-1 font-semibold text-vc-marron3">{t('comparacion.sinLabel')}</p>
          </div>
        </motion.div>

        {/* El divisor. En móvil separa las dos columnas apiladas. */}
        <div className="relative flex items-center justify-center py-3 md:px-4 md:py-0">
          <span
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-[2px] bg-vc-marron3/25 md:inset-x-auto md:inset-y-0 md:left-1/2 md:h-auto md:w-[2px]"
          />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-vc-marron bg-vc-amarillo font-display text-sm font-black text-vc-marron">
            VS
          </span>
        </div>

        {/* ── CON ─────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          transition={{ delay: 0.08 }}
          className="flex flex-col border-2 border-vc-marron bg-white p-6 md:p-8"
        >
          <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-vc-oxido">
            {t('comparacion.conTag')}
          </p>

          <div className="my-6">
            <Telefono>
              <Aviso icono={PhoneCall} texto={t('comparacion.conLlamada')} />
              <span className="flex items-center gap-2 rounded-lg bg-vc-amarillo/40 px-2.5 py-2 text-[13px] font-semibold leading-tight text-vc-marron">
                {t('comparacion.conAgenda')}
              </span>
            </Telefono>
          </div>

          <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-4">
            <div className="col-span-2">
              <dd className="font-display text-[3.25rem] font-black leading-[0.9] text-vc-oxido">
                {t('home.caseMetric1')}
              </dd>
              <dt className="mt-1 font-semibold text-vc-marron3">{t('home.caseLabel1')}</dt>
            </div>
            <div className="border-t-2 border-vc-marron3/25 pt-3">
              <dd className="font-display text-3xl font-black leading-none text-vc-tinta">
                {t('home.caseMetric2')}
              </dd>
              <dt className="mt-1 text-sm text-vc-marron3">{t('home.caseLabel2')}</dt>
            </div>
            <div className="border-t-2 border-vc-marron3/25 pt-3">
              <dd className="font-display text-3xl font-black leading-none text-vc-tinta">
                {t('home.caseMetric3')}
              </dd>
              <dt className="mt-1 text-sm text-vc-marron3">{t('home.caseLabel3')}</dt>
            </div>
          </dl>
        </motion.div>
      </div>

      {/* Obligatorio y en una sola línea. */}
      <p className="mt-5 text-sm leading-relaxed text-vc-marron3">
        {t('comparacion.nota')}
      </p>
    </div>
  );
}
