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
import { subeSuave, useEntrada } from '@/components/vc/skin';

const PREGUNTAS = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
  qKey: `home.faq${n}Q`,
  aKey: `home.faq${n}A`,
}));

export default function FaqList() {
  const { t } = useTranslation();
  const entrada = useEntrada();

  return (
    <div className="mt-7 flex flex-col">
      {PREGUNTAS.map((f, i) => {
        const pregunta = t(f.qKey);
        // Las claves que no existan en el idioma vuelven como la propia clave:
        // mejor no pintar una fila vacía.
        if (!pregunta || pregunta === f.qKey) return null;

        return (
          <motion.div
            key={f.qKey}
            {...entrada}
            transition={{ delay: Math.min(i, 4) * 0.04 }}
          >
            <details className="group border-t-2 border-vc-marron3/40 last:border-b-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vc-amarillo">
                <span className="font-display text-xl font-black uppercase leading-tight text-vc-tinta">
                  {pregunta}
                </span>
                <Plus
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-vc-oxido transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-3xl pb-6 text-[17px] leading-relaxed text-vc-marron3">
                {t(f.aKey)}
              </p>
            </details>
          </motion.div>
        );
      })}
    </div>
  );
}
