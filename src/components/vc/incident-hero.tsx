// ============================================================================
// El hero.
//
// La página no dice "respondemos en 2 minutos": deja que pasen. A la izquierda
// el argumento; a la derecha, una emergencia real de las 2:47 de la mañana
// resolviéndose sola mientras el dueño duerme, con el cronómetro corriendo.
//
// El reloj es lo único naranja de esta pantalla junto al botón. Si todo grita,
// nada se escucha.
//
// Es un ejemplo y lo dice: nada acá simula ser el testimonio de un cliente.
// ============================================================================
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  OrdenEntrante, LlamadaSaliente, ConfirmacionWhatsApp, type Linea,
} from '@/components/vc/incident-artifacts';
import { useIncident, formatClock, TOTAL_SECONDS } from '@/components/vc/use-incident';

interface Props {
  onDemo: () => void;
  pricingHref: string;
}

export default function IncidentHero({ onDemo, pricingHref }: Props) {
  const { t } = useTranslation();
  const { elapsed, revealed, still } = useIncident();

  const lineas = t('incident.callLines', { returnObjects: true }) as unknown;
  const transcripcion: Linea[] = Array.isArray(lineas)
    ? (lineas as { quien: string; texto: string }[]).map((l) => ({
        quien: l.quien === 'cliente' ? 'cliente' : 'agente',
        texto: l.texto,
      }))
    : [];

  return (
    <section className="relative overflow-hidden border-b border-vc-ink3 bg-vc-ink">
      {/* Una sola veladura, muy tenue, para que el papel no flote sobre un
          rectángulo plano. Nada de mallas ni destellos. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(90rem 40rem at 78% -10%, rgba(255,106,0,0.08), transparent 60%)',
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          {/* ── El argumento ─────────────────────────────────────────── */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-vc-steel">
              {t('incident.eyebrow')}
            </p>

            {/* Se contuvo el tamaño a propósito: con 6xl el titular ocupaba
                cuatro líneas y empujaba el botón de la demo fuera de la
                primera pantalla. El protagonista acá es el incidente. */}
            <h1 className="mt-5 font-display text-[2.4rem] font-extrabold leading-[1] tracking-[-0.02em] text-vc-paper sm:text-5xl">
              {t('home.heroTitle1')}
              <span className="mt-1 block text-vc-steel">{t('home.heroTitle2')}</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-vc-steel">
              {t('home.heroSubtitle')}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={onDemo}
                data-cta="demo-hero"
                className="h-12 gap-2 rounded-sm bg-vc-signal px-7 font-semibold text-white hover:bg-vc-signal/90"
              >
                <Play className="h-4 w-4" /> {t('home.heroDemo')}
              </Button>
              <Link to={pricingHref}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full gap-2 rounded-sm border-vc-ink3 bg-transparent px-7 font-semibold text-vc-paper hover:bg-vc-ink2 hover:text-vc-paper sm:w-auto"
                >
                  {t('home.heroPricing')} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-vc-steel">
              {[t('home.heroMicro1'), t('home.heroMicro2'), t('home.heroMicro3')].map((m) => (
                <li key={m} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-vc-signal" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* ── El incidente ─────────────────────────────────────────── */}
          <div className="relative">
            <div className="mb-4 flex items-baseline justify-between border-b border-vc-ink3 pb-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vc-steel">
                {t('incident.logTitle')}
              </p>
              {/* El cronómetro. Tabular para que no bailen los dígitos. */}
              <p
                className="font-mono text-2xl font-medium tabular-nums text-vc-signal"
                aria-label={t('incident.clockLabel')}
              >
                {formatClock(elapsed)}
              </p>
            </div>

            <div className="space-y-5">
              <OrdenEntrante
                visible={revealed > 0}
                still={still}
                hora="2:47"
                titulo={t('incident.a1Kicker')}
                detalle={t('incident.a1Detail')}
                origen={t('incident.a1Source')}
                lugar={t('incident.a1Place')}
                rotuloOrigen={t('incident.a1LabelSource')}
                rotuloZona={t('incident.a1LabelZone')}
              />
              <LlamadaSaliente
                visible={revealed > 1}
                still={still}
                hora="2:49"
                titulo={t('incident.a2Kicker')}
                agente={t('incident.a2Agent')}
                estado={t('incident.a2Status')}
                lineas={transcripcion}
              />
              <ConfirmacionWhatsApp
                visible={revealed > 2}
                still={still}
                hora="2:49"
                titulo={t('incident.a3Kicker')}
                mensaje={t('incident.a3Message')}
                pie="2:49 AM"
              />
            </div>

            <motion.p
              initial={still ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: elapsed >= TOTAL_SECONDS ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-5 border-t border-vc-ink3 pt-4 text-sm leading-relaxed text-vc-steel"
            >
              {t('incident.closer')}{' '}
              <span className="font-mono text-[11px] uppercase tracking-wider text-vc-steel/60">
                {t('incident.disclaimer')}
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
