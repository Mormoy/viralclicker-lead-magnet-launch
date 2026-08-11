// ============================================================================
// "Conoce a tus empleados con IA" — los cuatro agentes.
//
// Antes eran dos. El brief define cuatro roles y el cuarto —el supervisor— es
// el diferencial del producto, así que tiene que estar acá aunque después tenga
// su propia sección.
//
// Cada uno lleva un mini-visual DIBUJADO EN CÓDIGO: una onda de voz, un par de
// burbujas, unas tarjetas de tablero, una campana con su punto. Nada de stock
// ni de robots 3D — y además así no dependen de imágenes que no existen.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave } from '@/components/vc/skin';

/** Onda de voz: barras de alturas fijas, no aleatorias, para que no baile. */
function OndaVoz() {
  const alturas = [30, 62, 100, 74, 44, 88, 56, 100, 38, 70, 26, 52];
  return (
    <div className="flex h-14 items-center gap-[3px]" aria-hidden>
      {alturas.map((h, i) => (
        <span
          key={i}
          className="w-[5px] bg-vc-amarillo"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/** Dos burbujas: la del cliente y la del agente. */
function Burbujas() {
  return (
    <div className="flex h-14 flex-col justify-center gap-1.5" aria-hidden>
      <span className="h-3.5 w-24 rounded-[3px] bg-vc-marron4" />
      <span className="ml-auto h-3.5 w-32 rounded-[3px] bg-vc-amarillo" />
      <span className="h-3.5 w-16 rounded-[3px] bg-vc-marron4" />
    </div>
  );
}

/** Tarjetas moviéndose de columna: el tablero que avanza solo. */
function Tarjetas() {
  return (
    <div className="flex h-14 items-end gap-2" aria-hidden>
      {[40, 65, 100, 55].map((h, i) => (
        <span
          key={i}
          className={`w-7 border-2 ${i === 2 ? 'border-vc-amarillo bg-vc-amarillo/30' : 'border-vc-marron4'}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/** El aviso: una campana con su punto de notificación. */
function Aviso() {
  return (
    <div className="flex h-14 items-center gap-2.5" aria-hidden>
      <span className="relative flex h-11 w-11 items-center justify-center border-2 border-vc-marron4">
        <span className="h-4 w-4 rounded-t-full border-2 border-b-0 border-vc-amarillo" />
        <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-vc-alerta" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="h-2.5 w-20 rounded-[2px] bg-vc-marron4" />
        <span className="h-2.5 w-14 rounded-[2px] bg-vc-marron4" />
      </span>
    </div>
  );
}

const AGENTES = [
  { visual: OndaVoz,  rolKey: 'cuadrilla.a1Rol', nameKey: 'cuadrilla.a1Name', descKey: 'cuadrilla.a1Desc' },
  { visual: Burbujas, rolKey: 'cuadrilla.a2Rol', nameKey: 'cuadrilla.a2Name', descKey: 'cuadrilla.a2Desc' },
  { visual: Tarjetas, rolKey: 'cuadrilla.a3Rol', nameKey: 'cuadrilla.a3Name', descKey: 'cuadrilla.a3Desc' },
  { visual: Aviso,    rolKey: 'cuadrilla.a4Rol', nameKey: 'cuadrilla.a4Name', descKey: 'cuadrilla.a4Desc' },
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
            transition={{ delay: Math.min(i, 3) * 0.07 }}
            className="flex flex-col border-[3px] border-vc-marron bg-vc-marron p-6 shadow-dura-lg"
          >
            <a.visual />
            <p className="mt-5 font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] text-vc-naranja">
              {t(a.rolKey)}
            </p>
            <h3 className="mt-1.5 font-display text-[1.85rem] font-black uppercase leading-none text-vc-crema">
              {t(a.nameKey)}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.55] text-vc-arena">{t(a.descKey)}</p>
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
        <p className="text-lg font-semibold leading-relaxed text-vc-crema">
          {t('cuadrilla.agentesHandoff')}
        </p>
        {/* La objeción de frente. Es la única mención de "CRM" del sitio. */}
        <p className="mt-4 border-l-[5px] border-vc-naranja pl-4 leading-relaxed text-vc-arena">
          {t('home.agentsObjection')}
        </p>
      </motion.div>
    </>
  );
}
