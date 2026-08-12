// ============================================================================
// "Tú no te vas a perder de nada" — el agente supervisor.
//
// Es el diferencial: el resto del mercado vende un recepcionista con IA que
// contesta el teléfono, y ahí termina. Nadie le cuenta después al dueño cómo
// va su negocio. Por eso esta sección existe aparte de la de los cuatro
// agentes, aunque el supervisor ya aparezca ahí.
//
// El chat de Telegram usa el mismo tratamiento que el WhatsApp del hero —
// colores reales de la app— porque es lo que lo hace leer como una captura del
// teléfono y no como una ilustración.
//
// ⚠️ Va etiquetado como simulación: son datos inventados y la regla FTC exige
// que se note. Ningún número de acá es de un cliente.
// ============================================================================
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Seccion, EncabezadoSeccion, subeSuave, useEntrada, useEnPantalla } from '@/components/vc/skin';

/** Colores reales de Telegram, igual que se hizo con WhatsApp en el hero. */
const TG_FONDO = '#17212B';
const TG_BARRA = '#232E3C';
const TG_BURBUJA = '#2B5278';

const MENSAJES = [
  { key: 'cuadrilla.supM1', hora: '10:32' },
  { key: 'cuadrilla.supM2', hora: '11:04' },
  { key: 'cuadrilla.supM3', hora: '16:22' },
  { key: 'cuadrilla.supM4', hora: '20:00' },
];

export default function SupervisorTelegram() {
  const { t } = useTranslation();
  const entrada = useEntrada();
  const reducido = useReducedMotion();

  // Acá aparecer SÍ es el efecto: los avisos tienen que llegar de a uno, así
  // que se mantiene la opacidad. Pero el movimiento va con CSS y NO con framer.
  //
  // Por qué: estos avisos cuelgan de un `motion` con variantes, y framer hace
  // que los hijos esperen a que el padre entre en pantalla. Se midió el
  // resultado — los cuatro avisos en opacidad 0 dos minutos después de cargar
  // la página, porque nadie había scrolleado hasta ahí. Con una clase y una
  // transición de CSS, el temporizador de seguridad manda de verdad.
  const { ref: refChat, mostrar } = useEnPantalla();
  const visible = reducido || mostrar;

  const llegada = (i: number) => ({
    className: `max-w-[92%] self-start rounded-[10px_10px_10px_2px] px-3 py-2 ${
      reducido ? '' : 'transition-all duration-[400ms] ease-out'
    } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`,
    style: {
      background: TG_BURBUJA,
      transitionDelay: visible && !reducido ? `${i * 450}ms` : '0ms',
    },
  });

  return (
    <Seccion id="supervisor" tono="marron">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,26rem)] lg:gap-14">
        <div>
          <EncabezadoSeccion
            etiqueta={t('cuadrilla.supTag')}
            sobreOscuro
            titulo={t('cuadrilla.supTitle')}
            bajada={t('cuadrilla.supSub')}
          />
          <motion.p
            {...entrada}
            className="mt-6 max-w-xl border-l-[5px] border-vc-naranja pl-4 text-lg font-semibold leading-relaxed text-vc-crema"
          >
            {t('cuadrilla.supCloser')}
          </motion.p>
        </div>

        <motion.div
          {...entrada}
          className="border-2 border-vc-marron4 bg-vc-marron2 p-5"
        >
          <div className="overflow-hidden rounded-xl" style={{ background: TG_FONDO }}>
            {/* Barra del chat */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5" style={{ background: TG_BARRA }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vc-naranja font-display text-lg font-black text-vc-marron">
                V
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-bold text-white">
                  {t('cuadrilla.supChatName')}
                </span>
                <span className="text-[11px] text-[#BFD9EC]">{t('cuadrilla.supChatSub')}</span>
              </span>
            </div>

            {/* Los avisos del día.
                Llegan de a uno al entrar en pantalla, no todos juntos: es la
                demo del producto —el dueño recibiendo su día— y verlos caer en
                secuencia es lo que lo cuenta. El alto mínimo evita que la
                tarjeta crezca a saltos mientras aparecen. */}
            <div ref={refChat} className="flex min-h-[15.5rem] flex-col gap-2.5 px-3 py-4">
              {MENSAJES.map((m, i) => (
                <div key={m.key} {...llegada(i)}>
                  <p className="text-[13.5px] leading-[1.45] text-white">{t(m.key)}</p>
                  <p className="mt-0.5 text-right font-mono text-[10px] text-[#D6E8F5]">{m.hora}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 font-mono text-[12px] leading-snug text-vc-arena">
            {t('cuadrilla.supDisclaimer')}
          </p>
        </motion.div>
      </div>
    </Seccion>
  );
}
