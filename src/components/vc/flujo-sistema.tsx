// ============================================================================
// "Así funciona, de punta a punta" — el recorrido completo del sistema.
//
// Segunda versión. La primera usaba iconos de línea fina dentro de cajitas y
// JC no los veía: no aportaban nada y encima competían con el texto. Fuera.
//
// Ahora el protagonista es el NÚMERO. Gigante, a la izquierda, con un hilo
// vertical que une los seis. Se entiende de un vistazo que es un recorrido y
// en qué orden va, que es exactamente lo que la sección tiene que lograr.
//
// Los pasos 01–02 son captación (número al aire) y los 03–06 son los agentes
// (número dentro de un círculo naranja). Esa diferencia no es decorativa:
// separa "lo que trae al interesado" de "lo que hace que pasen cosas", que es
// como el brief cuenta el producto.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Seccion, EncabezadoSeccion, subeSuave } from '@/components/vc/skin';

const PASOS = [
  { tagKey: 'cuadrilla.f1Tag', titleKey: 'cuadrilla.f1Title', descKey: 'cuadrilla.f1Desc' },
  { tagKey: 'cuadrilla.f2Tag', titleKey: 'cuadrilla.f2Title', descKey: 'cuadrilla.f2Desc' },
  { tagKey: 'cuadrilla.f3Tag', titleKey: 'cuadrilla.f3Title', descKey: 'cuadrilla.f3Desc' },
  { tagKey: 'cuadrilla.f4Tag', titleKey: 'cuadrilla.f4Title', descKey: 'cuadrilla.f4Desc' },
  { tagKey: 'cuadrilla.f5Tag', titleKey: 'cuadrilla.f5Title', descKey: 'cuadrilla.f5Desc' },
  { tagKey: 'cuadrilla.f6Tag', titleKey: 'cuadrilla.f6Title', descKey: 'cuadrilla.f6Desc' },
];

/** Desde el paso 3 empiezan los agentes. */
const PRIMER_AGENTE = 2;

export default function FlujoSistema() {
  const { t } = useTranslation();

  return (
    <Seccion id="sistema">
      <EncabezadoSeccion
        etiqueta={t('cuadrilla.flujoTag')}
        titulo={t('cuadrilla.flujoTitle')}
        bajada={t('cuadrilla.flujoSub')}
      />

      {/* La leyenda que explica los dos tipos de número, antes de que el lector
          tenga que deducirlo. */}
      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.14em] text-vc-marron3">
        <span className="flex items-center gap-2">
          <span className="font-display text-xl font-black not-italic text-vc-oxido">01</span>
          {t('cuadrilla.flujoLeyendaCapta')}
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vc-naranja font-display text-[13px] font-black text-vc-marron">
            03
          </span>
          {t('cuadrilla.flujoLeyendaAgentes')}
        </span>
      </div>

      <ol className="mt-10">
        {PASOS.map((p, i) => {
          const esAgente = i >= PRIMER_AGENTE;
          const numero = String(i + 1).padStart(2, '0');

          return (
            <motion.li
              key={p.titleKey}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={subeSuave}
              transition={{ delay: Math.min(i, 3) * 0.05 }}
              className={`relative grid grid-cols-1 gap-x-8 sm:grid-cols-[6.5rem_minmax(0,1fr)] md:grid-cols-[7.5rem_minmax(0,1fr)] ${i === PASOS.length - 1 ? "pb-0" : "pb-10"}`}
            >
              {/* El hilo del recorrido. En móvil no se dibuja: los números van
                  arriba del texto y una línea vertical no uniría nada. */}
              {i < PASOS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[2.4rem] top-[4.5rem] hidden h-[calc(100%-3.5rem)] w-[2px] bg-vc-marron3/25 sm:block md:left-[2.9rem]"
                />
              )}

              <div className="relative z-10 mb-2 sm:mb-0">
                {esAgente ? (
                  <span className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-vc-naranja font-display text-[2.4rem] font-black leading-none text-vc-marron">
                    {numero}
                  </span>
                ) : (
                  // Óxido y no el naranja de marca: sobre crema, #FF6A00 da
                  // 2,74:1 y no pasa AA ni siquiera en texto grande.
                  <span className="block font-display text-[4.5rem] font-black leading-[0.8] text-vc-oxido">
                    {numero}
                  </span>
                )}
              </div>

              <div className="pt-0.5">
                <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] text-vc-marron3">
                  {t(p.tagKey)}
                </p>
                <h3 className="mt-1.5 font-display text-[1.75rem] font-black uppercase leading-none text-vc-tinta md:text-[2.1rem]">
                  {t(p.titleKey)}
                </h3>
                <p className="mt-2.5 max-w-2xl text-[17px] leading-[1.55] text-vc-marron3">
                  {t(p.descKey)}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* El remate. Es la única línea que valía la pena de la sección de "cómo
          funciona" en 4 pasos, que se eliminó por repetir este mismo recorrido:
          acá cierra el hilo en vez de abrir una sección nueva. */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={subeSuave}
        className="mt-4 border-l-[5px] border-vc-naranja pl-5 font-display text-[1.6rem] font-black uppercase leading-none text-vc-tinta sm:ml-[7.5rem] sm:text-[2rem]"
      >
        {t('cuadrilla.remateFlujo')}
      </motion.p>
    </Seccion>
  );
}
