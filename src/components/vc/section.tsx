// ============================================================================
// Piezas compartidas de la web pública.
//
// El encabezado de sección va alineado a la izquierda y con un ancho de medida
// legible, no centrado a lo ancho de la pantalla. Centrar todo es lo que hace
// que ocho secciones distintas terminen pareciendo la misma.
// ============================================================================
import { motion } from 'framer-motion';

export const subeSuave = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/** Envuelve una sección con su fondo y separador. */
export function Seccion({
  id, tono = 'ink', children, className = '',
}: {
  id?: string;
  /** `ink` para el fondo normal, `ink2` para alternar sin cambiar de mundo. */
  tono?: 'ink' | 'ink2';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-b border-vc-ink3 ${tono === 'ink' ? 'bg-vc-ink' : 'bg-vc-ink2'} ${className}`}
    >
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">{children}</div>
    </section>
  );
}

/** Eyebrow + título + bajada. El eyebrow numera de verdad: son secciones. */
export function EncabezadoSeccion({
  indice, titulo, bajada, className = '',
}: {
  indice?: string;
  titulo: string;
  bajada?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={subeSuave}
      className={`max-w-2xl ${className}`}
    >
      {indice && (
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-vc-steel">
          {indice}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.015em] text-vc-paper sm:text-[2.6rem]">
        {titulo}
      </h2>
      {bajada && <p className="mt-4 text-lg leading-relaxed text-vc-steel">{bajada}</p>}
    </motion.div>
  );
}
