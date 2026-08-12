// ============================================================================
// Piel "Cuadrilla" — las piezas que se repiten en las tres páginas públicas.
//
// La referencia es un cartel de obra: franja de peligro, etiquetas estampadas,
// titulares condensados en mayúsculas y sombras duras sin difuminado. Cálida y
// de oficio, porque quien mira esto es un techista de Florida, no un director
// de tecnología.
// ============================================================================
import { motion } from 'framer-motion';

export const subeSuave = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/** La franja amarilla y negra. Separa bloques importantes, no cualquier cosa. */
export function FranjaPeligro({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`h-3.5 w-full bg-franja-peligro ${className}`} />;
}

/** Etiqueta: mono en mayúsculas, SIN caja.
 *
 *  Antes iba dentro de un rectángulo amarillo o marrón. Con una caja por
 *  sección la página se llenaba de bloques de color compitiendo entre sí; el
 *  mockup original las tiene sueltas y así respiran. */
export function Etiqueta({
  children, tono = 'claro', className = '',
}: {
  children: React.ReactNode;
  /** `claro` sobre crema · `oscuro` dentro de la sección marrón. */
  tono?: 'claro' | 'oscuro';
  className?: string;
}) {
  const color = tono === 'oscuro' ? 'text-vc-amarillo' : 'text-vc-quemado';

  return (
    <span
      className={`inline-block font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] ${color} ${className}`}
    >
      {children}
    </span>
  );
}

/** Titular de sección: condensado, mayúsculas, enorme. */
export function Titular({
  children, sobreOscuro = false, className = '',
}: {
  children: React.ReactNode;
  sobreOscuro?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[2.35rem] font-black uppercase leading-[1] tracking-[0.01em] sm:text-5xl lg:text-[3.6rem] ${
        sobreOscuro ? 'text-vc-crema' : 'text-vc-tinta'
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/** Encabezado completo de sección: etiqueta + titular + bajada. */
export function EncabezadoSeccion({
  etiqueta, titulo, bajada, sobreOscuro = false,
}: {
  etiqueta?: string;
  titulo: string;
  bajada?: string;
  sobreOscuro?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={subeSuave}
      className="flex max-w-3xl flex-col gap-3"
    >
      {etiqueta && <Etiqueta tono={sobreOscuro ? 'oscuro' : 'claro'}>{etiqueta}</Etiqueta>}
      <Titular sobreOscuro={sobreOscuro}>{titulo}</Titular>
      {bajada && (
        <p className={`text-lg leading-relaxed ${sobreOscuro ? 'text-vc-arena' : 'text-vc-marron3'}`}>
          {bajada}
        </p>
      )}
    </motion.div>
  );
}

/** Sección con su fondo. `crema` es el estado normal; `marron` el contraste. */
export function Seccion({
  id, tono = 'crema', ancho = 'normal', children, className = '',
}: {
  id?: string;
  tono?: 'crema' | 'marron';
  ancho?: 'normal' | 'ancho';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${tono === 'crema' ? 'bg-vc-crema text-vc-tinta' : 'bg-vc-marron text-vc-hueso'} ${className}`}
    >
      {/* Aire: 64px en móvil, 96px en escritorio. Con menos, las secciones se
          pisan y la página se siente recargada aunque cada bloque esté bien. */}
      <div
        className={`mx-auto px-[5vw] py-16 md:py-24 ${ancho === 'ancho' ? 'max-w-[1280px]' : 'max-w-[1100px]'}`}
      >
        {children}
      </div>
    </section>
  );
}

/** Botón-cartel. El principal lleva la sombra dura; el secundario, solo borde. */
export function BotonCartel({
  children, onClick, href, variante = 'principal', className = '', ...resto
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variante?: 'principal' | 'secundario' | 'oscuro';
  className?: string;
} & Record<string, unknown>) {
  const base =
    'inline-flex items-center justify-center gap-2 border-[3px] border-vc-marron px-7 py-4 text-[17px] font-bold transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vc-amarillo active:translate-x-[2px] active:translate-y-[2px]';
  // El texto del botón naranja va en marrón y no en crema: crema sobre naranja
  // da 2,74:1 y no pasa AA. Marrón sobre naranja da 6,05:1 — y es lo que hace
  // el propio mockup en el CTA del header.
  //
  // La sombra dura amarilla queda SOLO acá, en los botones. Cuando la llevaban
  // también las tarjetas, el amarillo dejaba de ser un acento y se volvía el
  // color de fondo de la página.
  const estilos = {
    principal: 'bg-vc-naranja text-vc-marron shadow-dura-lg hover:bg-vc-amarillo',
    secundario: 'bg-vc-crema text-vc-marron hover:bg-vc-amarillo',
    oscuro: 'bg-vc-marron text-vc-crema hover:bg-vc-marron2',
  }[variante];

  const clases = `${base} ${estilos} ${className}`;

  if (href) {
    return (
      <a href={href} className={clases} {...resto}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={clases} {...resto}>
      {children}
    </button>
  );
}
