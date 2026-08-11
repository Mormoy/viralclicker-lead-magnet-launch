// ============================================================================
// El teléfono del hero: la conversación de Marco con el dueño del techo.
//
// Usa los colores REALES de WhatsApp (fondo #E5DDD5, burbuja #DCF8C6). Eso es
// deliberado: hace que se lea como una captura de un teléfono y no como una
// ilustración de software. Es la prueba del producto, no un adorno.
//
// Arriba, el cronómetro rojo cuenta el tiempo que el techista lleva SIN
// contestar ese mismo lead. El contraste entre las dos cosas es el argumento
// entero de la página.
// ============================================================================
import { useTranslation } from 'react-i18next';
import { useChatMarco, PASO_FINAL } from '@/components/vc/use-chat-marco';

/** Los tres puntitos de "escribiendo". */
function Escribiendo({ verde }: { verde?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[10px] px-3.5 py-2.5 shadow-[0_1px_1px_rgba(0,0,0,.12)] ${
        verde ? 'bg-vc-waVerde' : 'bg-white'
      }`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#9A8C7A]"
          style={{ animationDelay: `${i * 0.18}s`, animationDuration: '1.1s' }}
        />
      ))}
    </span>
  );
}

function Burbuja({
  mia, texto, hora, children,
}: {
  /** `mia` = la manda Marco (verde, a la derecha). */
  mia?: boolean;
  texto?: string;
  hora: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`max-w-[85%] px-3 py-2 text-sm leading-[1.45] text-vc-tinta shadow-[0_1px_1px_rgba(0,0,0,.12)] ${
        mia
          ? 'self-end rounded-[10px_0_10px_10px] bg-vc-waVerde'
          : 'self-start rounded-[0_10px_10px_10px] bg-white'
      }`}
    >
      {children ?? texto}
      <div className={`mt-0.5 text-right text-[10px] ${mia ? 'text-[#7A9A6A]' : 'text-[#9A8C7A]'}`}>
        {hora}
        {mia && ' ✓✓'}
      </div>
    </div>
  );
}

export default function TelefonoMarco() {
  const { t } = useTranslation();
  const { reloj, paso, quieto } = useChatMarco();

  return (
    <div className="border-[3px] border-vc-marron bg-vc-marron p-5 shadow-dura-lg">
      {/* La carrera: el cronómetro de lo que se está perdiendo */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-vc-amarillo">
          {t('marco.raceTitle')}
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className={`h-2.5 w-2.5 rounded-full bg-vc-alerta ${quieto ? '' : 'animate-pulse'}`}
          />
          <span className="font-mono text-[13px] font-extrabold tabular-nums text-vc-alerta">
            {t('marco.raceLabel')} · {reloj}
          </span>
        </span>
      </div>

      {/* El teléfono */}
      <div className="rounded-xl bg-vc-waFondo px-3 pb-3.5">
        <div className="-mx-3 mb-2 flex items-center gap-2.5 rounded-t-xl bg-vc-waBarra px-3.5 py-2.5">
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-vc-naranja font-display text-lg font-black text-vc-marron">
            M
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold text-white">{t('marco.contact')}</span>
            <span className="text-[11px] text-[#B8E0C8]">{t('marco.online')}</span>
          </span>
          <span aria-hidden className="ml-auto tracking-[2px] text-[#C9BEB2]">⋮</span>
        </div>

        <div className="mb-2.5 flex justify-center">
          <span className="rounded-md bg-[#DCD3C8] px-2.5 py-0.5 text-[11px] font-semibold text-[#6B5D4D]">
            {t('marco.today')}
          </span>
        </div>

        {/* Altura fija: sin esto la tarjeta salta de tamaño en cada paso del
            guion y arrastra media página con ella. */}
        <div className="flex min-h-[340px] flex-col gap-2.5">
          {paso >= 1 && (
            <Burbuja hora="10:32 AM" texto={t('marco.m1')} />
          )}
          {paso === 2 && <span className="self-end"><Escribiendo verde /></span>}
          {paso >= 3 && <Burbuja mia hora="10:33 AM" texto={t('marco.m2')} />}
          {paso === 4 && <span className="self-start"><Escribiendo /></span>}
          {paso >= 5 && <Burbuja hora="10:34 AM" texto={t('marco.m3')} />}
          {paso >= 6 && (
            <span className="self-center rounded-lg border border-[#DCD3C8] bg-[#F4EFE8] px-3.5 py-1.5 text-xs font-semibold text-[#6B5D4D]">
              {t('marco.call')}
            </span>
          )}
          {paso === 7 && <span className="self-end"><Escribiendo verde /></span>}
          {paso >= PASO_FINAL && (
            <Burbuja mia hora="10:38 AM">
              {t('marco.m4a')}{' '}
              <strong>{t('marco.m4slot')}</strong> {t('marco.m4b')}
            </Burbuja>
          )}
        </div>
      </div>

      {/* La aclaración va acá, pegada a la conversación, no al pie de página:
          es donde alguien podría confundirla con el caso de un cliente. */}
      <p className="mt-3 font-mono text-[12px] leading-snug text-vc-polvo">
        {t('marco.disclaimer')}
      </p>
    </div>
  );
}
