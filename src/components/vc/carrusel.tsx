// ============================================================================
// Carrusel para móvil, grilla en escritorio.
//
// El 80% del tráfico llega por Instagram, así que apilar cuatro tarjetas en una
// columna infinita es condenar a la mayoría a hacer scroll eterno. En móvil las
// tarjetas se deslizan de a una con scroll-snap; desde `sm` se convierten en la
// grilla de siempre y el carrusel desaparece.
//
// Se resuelve con scroll nativo y no con una librería: el navegador ya sabe
// hacer esto, respeta el gesto del sistema y no suma peso al bundle.
// ============================================================================
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  /** Una por tarjeta. Se usan como slides en móvil y como celdas en escritorio. */
  children: React.ReactNode[];
  /** Clases de la grilla desde `sm` en adelante. */
  grilla?: string;
  /** Etiqueta accesible del carrusel. */
  titulo: string;
}

export default function Carrusel({ children, grilla = 'sm:grid-cols-2', titulo }: Props) {
  const pista = useRef<HTMLDivElement>(null);
  const [activa, setActiva] = useState(0);

  // Qué tarjeta está centrada, para pintar los puntitos. Se mide con el scroll
  // real en vez de escuchar cada gesto: funciona igual con dedo, con teclado y
  // con la barra de desplazamiento.
  const alDesplazar = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    const ancho = el.scrollWidth / children.length;
    setActiva(Math.round(el.scrollLeft / ancho));
  }, [children.length]);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    el.addEventListener('scroll', alDesplazar, { passive: true });
    return () => el.removeEventListener('scroll', alDesplazar);
  }, [alDesplazar]);

  const irA = (i: number) => {
    const el = pista.current;
    if (!el) return;
    el.scrollTo({ left: (el.scrollWidth / children.length) * i, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={pista}
        role="group"
        aria-label={titulo}
        className={`-mx-[5vw] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] pb-2
                    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                    sm:mx-0 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 ${grilla}`}
      >
        {children.map((hijo, i) => (
          <div
            key={i}
            className="w-[82vw] shrink-0 snap-center sm:w-auto sm:shrink"
          >
            {hijo}
          </div>
        ))}
      </div>

      {/* Los puntitos solo existen mientras hay carrusel. */}
      {/* El punto se ve chico, pero el botón que lo envuelve mide 44px: es el
          mínimo para acertarle con el dedo. */}
      <div className="mt-1 flex justify-center sm:hidden">
        {children.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => irA(i)}
            aria-label={`${titulo} — ${i + 1} de ${children.length}`}
            aria-current={i === activa}
            className="flex h-11 w-9 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vc-amarillo"
          >
            <span
              className={`h-2.5 rounded-full transition-all ${
                i === activa ? 'w-7 bg-vc-oxido' : 'w-2.5 bg-vc-marron3/35'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
