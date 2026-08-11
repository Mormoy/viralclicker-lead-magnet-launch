// ============================================================================
// Preguntas frecuentes.
//
// Sobre <details>/<summary> nativos: el navegador ya sabe abrirlos, anunciarlos
// al lector de pantalla y encontrarlos con Ctrl+F aunque estén cerrados. Un
// acordeón hecho a mano con useState pierde las tres cosas.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { subeSuave } from '@/components/vc/section';

const PREGUNTAS = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
  qKey: `home.faq${n}Q`,
  aKey: `home.faq${n}A`,
}));

export default function FaqList() {
  const { t } = useTranslation();

  return (
    <div className="mt-12 border-t border-vc-ink3">
      {PREGUNTAS.map((f, i) => {
        const pregunta = t(f.qKey);
        // Las claves que no existan en el idioma vuelven como la propia clave:
        // mejor no pintar una fila vacía.
        if (!pregunta || pregunta === f.qKey) return null;

        return (
          <motion.div
            key={f.qKey}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={subeSuave}
            transition={{ delay: Math.min(i, 4) * 0.04 }}
          >
            <details className="group border-b border-vc-ink3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vc-signal">
                <span className="font-display text-lg font-semibold text-vc-paper">
                  {pregunta}
                </span>
                <Plus
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-vc-steel transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-3xl pb-6 leading-relaxed text-vc-steel">{t(f.aKey)}</p>
            </details>
          </motion.div>
        );
      })}
    </div>
  );
}
