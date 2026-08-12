// ============================================================================
// "Conoce a tus empleados con IA" — los cuatro agentes.
//
// Segunda versión. La primera llevaba pictogramas abstractos —barras y
// rectángulos— que parecían un wireframe sin terminar. Fuera.
//
// Ahora cada tarjeta lleva UN detalle concreto que se entiende en medio
// segundo: una onda de voz, una burbuja con el doble check, tres columnas con
// una tarjeta que avanza, y un aviso con su punto rojo. Si alguno no se
// entendiera solo, es mejor dejarlo sin dibujo que poner relleno.
//
// Van en blanco sobre el crema, con borde marrón fino. La única que puede ir
// oscura es la del supervisor, como adelanto de su propia sección.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave } from '@/components/vc/skin';

/** Voz: una onda sonora. Alturas fijas para que no baile en cada render. */
function Onda({ claro }: { claro?: boolean }) {
  const alturas = [24, 52, 86, 100, 72, 40, 64, 96, 58, 30];
  return (
    <div className="flex h-9 items-center gap-[3px]" aria-hidden>
      {alturas.map((h, i) => (
        <span
          key={i}
          className={`w-[4px] rounded-full ${claro ? 'bg-vc-amarillo' : 'bg-vc-naranja'}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/** WhatsApp: la burbuja verde con el doble check. */
function BurbujaWhatsApp(_: { claro?: boolean }) {
  return (
    <div className="flex h-9 items-center" aria-hidden>
      <span className="inline-flex items-center gap-1.5 rounded-[8px_2px_8px_8px] bg-vc-waVerde px-2.5 py-1.5">
        <span className="h-1.5 w-14 rounded-full bg-vc-marron/25" />
        <span className="font-mono text-[11px] font-bold text-[#2F6B3F]">✓✓</span>
      </span>
    </div>
  );
}

/** Pipelines: tres columnas y una tarjeta que ya avanzó a la del medio. */
function Columnas(_: { claro?: boolean }) {
  return (
    <div className="flex h-9 items-stretch gap-1.5" aria-hidden>
      {[0, 1, 2].map((c) => (
        <span
          key={c}
          className="flex w-9 flex-col gap-1 border border-vc-marron/25 p-1"
        >
          {c === 1 ? (
            <span className="h-2 w-full bg-vc-naranja" />
          ) : (
            <span className="h-2 w-full bg-vc-marron/15" />
          )}
        </span>
      ))}
    </div>
  );
}

/** Supervisor: el aviso de Telegram con su punto sin leer. */
function AvisoTelegram(_: { claro?: boolean }) {
  return (
    <div className="flex h-9 items-center" aria-hidden>
      <span className="relative inline-flex items-center gap-2 rounded-[8px_8px_8px_2px] bg-[#2B5278] px-2.5 py-1.5">
        <span className="h-1.5 w-16 rounded-full bg-white/40" />
        <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-vc-alerta" />
      </span>
    </div>
  );
}

const AGENTES = [
  { visual: Onda,            rolKey: 'cuadrilla.a1Rol', nameKey: 'cuadrilla.a1Name', descKey: 'cuadrilla.a1Desc' },
  { visual: BurbujaWhatsApp, rolKey: 'cuadrilla.a2Rol', nameKey: 'cuadrilla.a2Name', descKey: 'cuadrilla.a2Desc' },
  { visual: Columnas,        rolKey: 'cuadrilla.a3Rol', nameKey: 'cuadrilla.a3Name', descKey: 'cuadrilla.a3Desc' },
  { visual: AvisoTelegram,   rolKey: 'cuadrilla.a4Rol', nameKey: 'cuadrilla.a4Name', descKey: 'cuadrilla.a4Desc', oscura: true },
];

export default function AgentesCuatro() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        {AGENTES.map((a, i) => (
          <motion.article
            key={a.nameKey}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={subeSuave}
            transition={{ delay: Math.min(i, 3) * 0.06 }}
            className={`flex flex-col border-2 border-vc-marron p-6 ${
              a.oscura ? 'bg-vc-marron' : 'bg-white'
            }`}
          >
            <a.visual claro={a.oscura} />
            <p
              className={`mt-5 font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] ${
                a.oscura ? 'text-vc-amarillo' : 'text-vc-quemado'
              }`}
            >
              {t(a.rolKey)}
            </p>
            <h3
              className={`mt-1.5 font-display text-[1.85rem] font-black uppercase leading-none ${
                a.oscura ? 'text-vc-crema' : 'text-vc-oxido'
              }`}
            >
              {t(a.nameKey)}
            </h3>
            <p className={`mt-3 text-base leading-[1.55] ${a.oscura ? 'text-vc-crema' : 'text-vc-marron3'}`}>
              {t(a.descKey)}
            </p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={subeSuave}
        className="mt-8 max-w-3xl"
      >
        <p className="text-lg font-semibold leading-relaxed text-vc-tinta">
          {t('cuadrilla.agentesHandoff')}
        </p>
        {/* La objeción de frente. Es la única mención de "CRM" del sitio. */}
        <p className="mt-4 border-l-[5px] border-vc-naranja pl-4 leading-relaxed text-vc-marron3">
          {t('home.agentsObjection')}
        </p>
      </motion.div>
    </>
  );
}
