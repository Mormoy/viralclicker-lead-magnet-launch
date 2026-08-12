// ============================================================================
// "Así funciona, de punta a punta" — el recorrido completo del sistema.
//
// Los seis pasos se apilan como naipes (el patrón de Pay-in-4 de PayPal): cada
// panel es `sticky` con un tope un poco más abajo que el anterior, así que al
// scrollear se van montando y los previos asoman por arriba. El efecto sale
// con CSS puro —sin cálculos de scroll en JavaScript— y por eso no cuesta
// rendimiento.
//
// En móvil no hay apilado: cuatro paneles pegados en una pantalla de 360px se
// comen la lectura. Ahí van uno tras otro con un fade simple.
//
// Los pasos 01–02 son captación (número al aire) y los 03–06 son los agentes
// (número dentro de un círculo naranja). Esa diferencia no es decorativa:
// separa "lo que trae al interesado" de "lo que hace que pasen cosas".
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Seccion, EncabezadoSeccion, subeSuave, useEntrada } from '@/components/vc/skin';

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

/** Cuánto asoma cada panel por debajo del anterior, en rem. */
const ASOMA = 1.1;

export default function FlujoSistema() {
  const { t } = useTranslation();
  const entrada = useEntrada();

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
          <span className="font-display text-xl font-black text-vc-oxido">01</span>
          {t('cuadrilla.flujoLeyendaCapta')}
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vc-naranja font-display text-[13px] font-black text-vc-marron">
            03
          </span>
          {t('cuadrilla.flujoLeyendaAgentes')}
        </span>
      </div>

      <ol className="mt-10 flex flex-col gap-4 sm:gap-0">
        {PASOS.map((p, i) => {
          const esAgente = i >= PRIMER_AGENTE;
          const numero = String(i + 1).padStart(2, '0');

          return (
            <li
              key={p.titleKey}
              // El apilado: cada panel se pega un poco más abajo que el
              // anterior, y el z-index creciente hace que tape a los previos.
              //
              // Sin animación de entrada a propósito: mientras un panel se
              // desvanecía hacia adentro se transparentaba y se leía el texto
              // del panel de abajo a través suyo. El apilado ya es el efecto.
              className="sm:sticky"
              style={{
                top: `calc(5.5rem + ${i * ASOMA}rem)`,
                zIndex: i + 1,
              }}
            >
              <div className="grid grid-cols-1 gap-x-8 border-2 border-vc-marron bg-white p-6 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:p-8 md:grid-cols-[7.5rem_minmax(0,1fr)]">
                <div className="mb-3 sm:mb-0">
                  {esAgente ? (
                    <span className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-vc-naranja font-display text-[2.2rem] font-black leading-none text-vc-marron">
                      {numero}
                    </span>
                  ) : (
                    // Óxido y no el naranja de marca: sobre claro, #FF6A00 da
                    // 2,74:1 y no pasa AA ni en texto grande.
                    <span className="block font-display text-[4rem] font-black leading-[0.8] text-vc-oxido">
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
              </div>
            </li>
          );
        })}
      </ol>

      {/* El remate. Es la única línea que valía la pena de la sección de "cómo
          funciona" en 4 pasos, que se eliminó por repetir este mismo recorrido.
          Va por encima del apilado para que quede al cerrar. */}
      <motion.p
        {...entrada}
        style={{ zIndex: PASOS.length + 1 }}
        className="relative mt-8 border-l-[5px] border-vc-naranja bg-vc-crema py-2 pl-5 font-display text-[1.6rem] font-black uppercase leading-none text-vc-tinta sm:text-[2rem]"
      >
        {t('cuadrilla.remateFlujo')}
      </motion.p>
    </Seccion>
  );
}
