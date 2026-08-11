// ============================================================================
// El guion del chat de Marco y el cronómetro de la carrera.
//
// Son las dos cosas que pasan a la vez en el hero:
//
//  · El cronómetro cuenta hacia ARRIBA desde 2:07:00 y no para. Es el tiempo
//    que lleva el techista sin contestar ese lead. No es un contador de carga:
//    es la cuenta de lo que se está perdiendo mientras mira la página.
//  · El chat avanza en 9 pasos y vuelve a empezar. Se repite a propósito —
//    quien llega scrolleando desde abajo también tiene que ver la conversación.
//
// Con `prefers-reduced-motion` no se anima nada: el chat aparece completo y el
// cronómetro queda quieto. La página se entiende igual.
// ============================================================================
import { useEffect, useRef, useState } from 'react';

/** Segundos en los que arranca el cronómetro: 2 h 07 min sin contestar. */
const ARRANQUE = 7620;

/** Milisegundos que dura cada paso del guion, en orden. */
const PASOS = [900, 1600, 1800, 1500, 1400, 1600, 2200, 1800, 5000];

/** El paso final: la conversación completa, con la inspección ya agendada. */
export const PASO_FINAL = 8;

export interface ChatMarco {
  /** Cronómetro formateado, `H:MM:SS`. */
  reloj: string;
  /** Paso actual del guion, de 0 a 8. */
  paso: number;
  /** true si el visitante pidió menos movimiento. */
  quieto: boolean;
}

const prefiereQuieto = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function useChatMarco(): ChatMarco {
  const [quieto] = useState(prefiereQuieto);
  const [segundos, setSegundos] = useState(ARRANQUE);
  const [paso, setPaso] = useState(() => (prefiereQuieto() ? PASO_FINAL : 0));
  const temporizador = useRef<ReturnType<typeof setTimeout>>();

  // El cronómetro.
  useEffect(() => {
    if (quieto) return;
    const iv = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [quieto]);

  // El guion del chat. Cada paso agenda el siguiente con su propia duración,
  // en vez de un intervalo fijo: los silencios entre mensajes son parte de lo
  // que hace que se lea como una conversación real.
  useEffect(() => {
    if (quieto) return;
    temporizador.current = setTimeout(
      () => setPaso((p) => (p + 1) % PASOS.length),
      PASOS[paso],
    );
    return () => clearTimeout(temporizador.current);
  }, [paso, quieto]);

  const dosDigitos = (n: number) => String(n).padStart(2, '0');
  const reloj = `${Math.floor(segundos / 3600)}:${dosDigitos(
    Math.floor((segundos % 3600) / 60),
  )}:${dosDigitos(segundos % 60)}`;

  return { reloj, paso, quieto };
}
