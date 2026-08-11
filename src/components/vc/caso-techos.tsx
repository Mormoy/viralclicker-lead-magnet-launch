// ============================================================================
// EL CASO REAL · TECHOS.
//
// Reemplaza al "registro del incidente" de la versión anterior, que contaba una
// emergencia de agua inventada y de otro rubro. Este es el flujo real y
// validado: entra el lead del anuncio, Marco llama en ~15 minutos, hace las
// tres preguntas que definen si el trabajo existe, y agenda la inspección.
//
// Las horas van en mono y en amarillo porque son datos, y la secuencia es una
// secuencia de verdad — por eso está ordenada por reloj y no por números
// decorativos.
//
// ⚠️ El cliente del caso NO se nombra: no hay autorización de uso de marca.
// ============================================================================
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Seccion, EncabezadoSeccion, subeSuave } from '@/components/vc/skin';

interface Fila {
  hora: string;
  cuerpo: React.ReactNode;
  /** El último renglón, el del techista, va destacado. */
  remate?: boolean;
}

export default function CasoTechos() {
  const { t } = useTranslation();

  const preguntas = [t('caso.q1'), t('caso.q2'), t('caso.q3')];

  const filas: Fila[] = [
    { hora: '10:32 AM', cuerpo: <p className="text-[17px] leading-[1.55]">{t('caso.t1')}</p> },
    {
      hora: '10:47 AM',
      cuerpo: (
        <div className="flex flex-col gap-3">
          <p className="text-[17px] leading-[1.55]">
            <strong className="text-vc-naranja">{t('caso.t2strong')}</strong> {t('caso.t2')}
          </p>
          <ul className="flex flex-col gap-2 text-base">
            {preguntas.map((q) => (
              <li key={q} className="border border-vc-marron4 bg-vc-marron2 px-3.5 py-2.5">
                ☐ {q}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      hora: '10:51 AM',
      cuerpo: (
        <p className="text-[17px] leading-[1.55]">
          {t('caso.t3a')} <strong className="text-vc-crema">{t('caso.t3strong')}</strong> {t('caso.t3b')}
        </p>
      ),
    },
    { hora: t('caso.t4hora'), cuerpo: <p className="text-[17px] leading-[1.55]">{t('caso.t4')}</p> },
    {
      hora: t('caso.t5hora'),
      remate: true,
      cuerpo: (
        <p className="text-[19px] font-semibold leading-[1.5] text-vc-crema">{t('caso.t5')}</p>
      ),
    },
  ];

  return (
    <Seccion tono="marron">
      <div className="flex flex-col gap-9">
        <EncabezadoSeccion
          etiqueta={t('caso.tag')}
          titulo={t('caso.title')}
          bajada={t('caso.sub')}
          sobreOscuro
        />

        <div className="flex flex-col">
          {filas.map((f) => (
            <motion.div
              key={f.hora}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={subeSuave}
              className={`grid gap-x-5 gap-y-2 py-5 md:grid-cols-[110px_minmax(0,1fr)] ${
                f.remate
                  ? 'border-b border-vc-marron3 border-t-[3px] border-t-vc-naranja'
                  : 'border-t border-vc-marron3'
              }`}
            >
              <span
                className={`font-mono text-base font-extrabold ${
                  f.remate ? 'text-vc-naranja' : 'text-vc-amarillo'
                }`}
              >
                {f.hora}
              </span>
              {f.cuerpo}
            </motion.div>
          ))}
        </div>

        {/* El caso es real, pero el nombre del cliente todavía no se puede usar. */}
        <p className="border-2 border-dashed border-vc-marron4 px-4 py-3.5 font-mono text-[13px] leading-snug text-vc-polvo">
          {t('caso.credit')}
        </p>
      </div>
    </Seccion>
  );
}
