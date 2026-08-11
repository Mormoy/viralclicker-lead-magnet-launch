// ============================================================================
// El reloj del incidente.
//
// La promesa entera de ViralClicker cabe en dos minutos, así que la página no
// los dice: los deja pasar. Este hook corre el cronómetro y va destapando los
// artefactos (la orden que entra, la llamada, el WhatsApp) a medida que su
// marca de tiempo se cumple.
//
// El tiempo va comprimido —2 minutos reales serían una eternidad mirando una
// web— pero el orden y las proporciones son los de verdad.
// ============================================================================
import { useEffect, useMemo, useRef, useState } from 'react';

/** Segundos del incidente en los que aparece cada artefacto. */
export const BEATS = [0, 24, 131] as const;

/** Duración total del incidente: 2:11 desde que entra el interesado. */
export const TOTAL_SECONDS = 131;

/** El reloj corre 22x: 2:11 de historia en unos 6 segundos de página. */
const SPEED = 22;

export interface Incident {
  /** Segundos transcurridos dentro de la historia, para el reloj. */
  elapsed: number;
  /** Cuántos artefactos ya se revelaron. */
  revealed: number;
  /** true si el usuario pidió menos movimiento: se muestra todo, quieto. */
  still: boolean;
}

const prefiereQuieto = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function useIncident(): Incident {
  const [still] = useState(prefiereQuieto);
  const [elapsed, setElapsed] = useState(() => (prefiereQuieto() ? TOTAL_SECONDS : 0));
  const raf = useRef<number>();

  useEffect(() => {
    // Con movimiento reducido no hay animación que valga: el reloj ya está en
    // 2:11 y los tres artefactos están puestos desde el principio.
    if (still) return;

    const inicio = performance.now();
    const tick = (ahora: number) => {
      const t = Math.min(TOTAL_SECONDS, ((ahora - inicio) / 1000) * SPEED);
      setElapsed(t);
      if (t < TOTAL_SECONDS) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [still]);

  const revealed = useMemo(
    () => (still ? BEATS.length : BEATS.filter((b) => elapsed >= b).length),
    [elapsed, still],
  );

  return { elapsed, revealed, still };
}

/** 131 → "2:11". Con dos dígitos en los segundos, como cualquier cronómetro. */
export const formatClock = (segundos: number) => {
  const s = Math.floor(segundos);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
