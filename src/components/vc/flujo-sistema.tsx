// ============================================================================
// "Así funciona, de punta a punta" — el recorrido completo del sistema.
//
// Es la sección que decide si un desconocido entiende qué es ViralClicker. No
// es una lista de beneficios: es un ORDEN, y por eso va numerada y con una
// línea que atraviesa los seis pasos. Los tres primeros traen al interesado,
// los tres siguientes lo trabajan, y el último le habla al dueño.
//
// El corte visual entre el paso 2 y el 3 es intencional: ahí termina "el
// embudo" y empiezan "los agentes", que es exactamente cómo lo cuenta el brief.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Megaphone, MonitorPlay, PhoneCall, MessageCircle, Repeat, BellRing } from 'lucide-react';
import { Seccion, EncabezadoSeccion, subeSuave } from '@/components/vc/skin';

const PASOS = [
  { icono: Megaphone,    tagKey: 'cuadrilla.f1Tag', titleKey: 'cuadrilla.f1Title', descKey: 'cuadrilla.f1Desc' },
  { icono: MonitorPlay,  tagKey: 'cuadrilla.f2Tag', titleKey: 'cuadrilla.f2Title', descKey: 'cuadrilla.f2Desc' },
  { icono: PhoneCall,    tagKey: 'cuadrilla.f3Tag', titleKey: 'cuadrilla.f3Title', descKey: 'cuadrilla.f3Desc' },
  { icono: MessageCircle, tagKey: 'cuadrilla.f4Tag', titleKey: 'cuadrilla.f4Title', descKey: 'cuadrilla.f4Desc' },
  { icono: Repeat,       tagKey: 'cuadrilla.f5Tag', titleKey: 'cuadrilla.f5Title', descKey: 'cuadrilla.f5Desc' },
  { icono: BellRing,     tagKey: 'cuadrilla.f6Tag', titleKey: 'cuadrilla.f6Title', descKey: 'cuadrilla.f6Desc' },
];

export default function FlujoSistema() {
  const { t } = useTranslation();

  return (
    <Seccion id="sistema" tono="marron">
      <EncabezadoSeccion
        etiqueta={t('cuadrilla.flujoTag')}
        titulo={t('cuadrilla.flujoTitle')}
        bajada={t('cuadrilla.flujoSub')}
        sobreOscuro
      />

      <ol className="mt-10">
        {PASOS.map((p, i) => (
          <motion.li
            key={p.titleKey}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={subeSuave}
            transition={{ delay: Math.min(i, 3) * 0.06 }}
            className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-5 pb-8 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-x-8"
          >
            {/* La línea que une los pasos. El último no la lleva: ahí termina
                el recorrido y no hay nada más colgando. */}
            {i < PASOS.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[1.6rem] top-14 h-[calc(100%-2.5rem)] w-[2px] bg-vc-marron4 md:left-[2.1rem]"
              />
            )}

            <span className="relative z-10 flex h-14 w-14 items-center justify-center border-[3px] border-vc-amarillo bg-vc-marron2 md:h-[4.25rem] md:w-[4.25rem]">
              <p.icono className="h-6 w-6 text-vc-amarillo md:h-7 md:w-7" />
            </span>

            <div className="pt-1">
              <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] text-vc-naranja">
                {String(i + 1).padStart(2, '0')} · {t(p.tagKey)}
              </p>
              <h3 className="mt-2 font-display text-2xl font-black uppercase leading-none text-vc-crema md:text-[2rem]">
                {t(p.titleKey)}
              </h3>
              <p className="mt-2.5 max-w-2xl text-[17px] leading-[1.55] text-vc-arena">
                {t(p.descKey)}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Seccion>
  );
}
