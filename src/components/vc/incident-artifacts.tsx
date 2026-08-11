// ============================================================================
// Los tres artefactos del incidente: la orden que entra, la llamada y el chat.
//
// Van en papel sobre el fondo tinta. Es la decisión visual que sostiene toda la
// página: los objetos del oficio —una orden de trabajo, una transcripción, un
// hilo de WhatsApp— son de papel y pantalla, no tarjetas de software. Ese
// contraste es lo que le da imagen a un sitio que no tiene una sola foto.
// ============================================================================
import { motion } from 'framer-motion';
import { Phone, Check, CheckCheck } from 'lucide-react';

const entra = {
  hidden: { opacity: 0, y: 18, rotate: 0 },
  visible: { opacity: 1, y: 0 },
};

interface ArtefactoProps {
  /** Hora que estampa el artefacto, ya formateada. */
  hora: string;
  visible: boolean;
  /** Sin animación cuando el visitante pidió menos movimiento. */
  still: boolean;
  /** Grados de inclinación: el papel no cae perfectamente derecho. */
  tilt?: number;
  children: React.ReactNode;
  etiqueta: string;
}

function Artefacto({ hora, visible, still, tilt = 0, etiqueta, children }: ArtefactoProps) {
  return (
    <motion.div
      variants={entra}
      initial={still ? 'visible' : 'hidden'}
      animate={visible ? 'visible' : 'hidden'}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotate: `${tilt}deg` }}
      className="relative"
    >
      <div className="mb-1.5 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-widest text-vc-steel">
        <span className="text-vc-signal">{hora}</span>
        <span>{etiqueta}</span>
      </div>
      {children}
    </motion.div>
  );
}

/** 1 · La orden que entra. Papel de verdad, con su troquel arriba. */
export function OrdenEntrante({
  visible, still, hora, titulo, detalle, origen, lugar, rotuloOrigen, rotuloZona,
}: {
  visible: boolean; still: boolean; hora: string;
  titulo: string; detalle: string; origen: string; lugar: string;
  rotuloOrigen: string; rotuloZona: string;
}) {
  return (
    <Artefacto hora={hora} visible={visible} still={still} tilt={-0.8} etiqueta={titulo}>
      <div className="rounded-sm bg-vc-paper p-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
        <p className="font-display text-lg font-bold leading-snug text-vc-ink">{detalle}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-vc-paperDim pt-3 font-mono text-[11px] text-vc-ink/70">
          <div>
            <dt className="uppercase tracking-wider text-vc-ink/45">{rotuloOrigen}</dt>
            <dd className="mt-0.5 text-vc-ink">{origen}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider text-vc-ink/45">{rotuloZona}</dt>
            <dd className="mt-0.5 text-vc-ink">{lugar}</dd>
          </div>
        </dl>
      </div>
    </Artefacto>
  );
}

export interface Linea {
  quien: 'agente' | 'cliente';
  texto: string;
}

/** 2 · La llamada. Pantalla de teléfono, no papel: es lo único que ocurre en vivo. */
export function LlamadaSaliente({
  visible, still, hora, titulo, agente, estado, lineas,
}: {
  visible: boolean; still: boolean; hora: string;
  titulo: string; agente: string; estado: string; lineas: Linea[];
}) {
  return (
    <Artefacto hora={hora} visible={visible} still={still} tilt={0.5} etiqueta={titulo}>
      <div className="rounded-sm border border-vc-ink3 bg-vc-ink2 p-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-2.5 border-b border-vc-ink3 pb-3">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-vc-signal/15">
            <Phone className="h-3.5 w-3.5 text-vc-signal" />
          </span>
          <p className="font-mono text-xs text-vc-steel">
            <span className="text-vc-paper">{agente}</span> · {estado}
          </p>
        </div>
        <div className="mt-3 space-y-2.5">
          {lineas.map((l, i) => (
            <motion.p
              key={i}
              initial={still ? { opacity: 1 } : { opacity: 0 }}
              animate={visible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: still ? 0 : 0.35 + i * 0.55, duration: 0.35 }}
              className={`text-sm leading-relaxed ${
                l.quien === 'agente' ? 'text-vc-paper' : 'pl-4 text-vc-steel'
              }`}
            >
              <span className="mr-1.5 font-mono text-[10px] uppercase tracking-wider text-vc-steel/60">
                {l.quien === 'agente' ? '—' : '·'}
              </span>
              {l.texto}
            </motion.p>
          ))}
        </div>
      </div>
    </Artefacto>
  );
}

/** 3 · La confirmación por WhatsApp. Verde solo acá, donde es la verdad del medio. */
export function ConfirmacionWhatsApp({
  visible, still, hora, titulo, mensaje, pie,
}: {
  visible: boolean; still: boolean; hora: string;
  titulo: string; mensaje: string; pie: string;
}) {
  return (
    <Artefacto hora={hora} visible={visible} still={still} tilt={-0.4} etiqueta={titulo}>
      <div className="rounded-sm bg-vc-paper p-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
        <div className="ml-auto max-w-[92%] rounded-lg rounded-tr-sm bg-vc-wa/15 px-3 py-2">
          <p className="text-sm leading-relaxed text-vc-ink">{mensaje}</p>
          <p className="mt-1 flex items-center justify-end gap-1 font-mono text-[10px] text-vc-ink/45">
            {pie} <CheckCheck className="h-3 w-3 text-vc-wa" />
          </p>
        </div>
      </div>
    </Artefacto>
  );
}

export { Check };
