// ============================================================================
// Los rubros: para quién es esto.
//
// Antes eran filas con un enlace a la landing de cada rubro. Los enlaces se
// quitaron a propósito: las landings son el destino EXCLUSIVO de los anuncios.
// Si se puede llegar desde la home, se ensucia la medición del embudo y se
// regala la página de la oferta fuera del contexto que la hace funcionar.
// Quedan accesibles solo por URL directa.
//
// Y dejan de ser filas: había tres módulos seguidos con la misma forma de tabla
// y eso es lo que hacía sentir la página vacía. Acá van tarjetas.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { subeSuave, useEntrada } from '@/components/vc/skin';
import Carrusel from '@/components/vc/carrusel';

const RUBROS = [
  { nameKey: 'home.vert3Name', descKey: 'home.vert3Desc' },
  { nameKey: 'home.vert1Name', descKey: 'home.vert1Desc' },
  { nameKey: 'home.vert2Name', descKey: 'home.vert2Desc' },
  { nameKey: 'home.vert4Name', descKey: 'home.vert4Desc' },
];

export default function RubrosTarjetas() {
  const { t } = useTranslation();
  const entrada = useEntrada();

  return (
    <div className="mt-9">
      <Carrusel titulo={t('home.vertTitle')} grilla="sm:grid-cols-2 lg:grid-cols-4">
        {RUBROS.map((r, i) => (
          <motion.article
            key={r.nameKey}
            {...entrada}
            transition={{ duration: 0.4 }}
            className="flex h-full flex-col border-2 border-vc-marron bg-white p-6"
          >
            <h3 className="font-display text-[1.9rem] font-black uppercase leading-[0.95] text-vc-oxido">
              {t(r.nameKey)}
            </h3>
            <p className="mt-3 text-base leading-[1.55] text-vc-marron3">{t(r.descKey)}</p>
          </motion.article>
        ))}
      </Carrusel>
    </div>
  );
}
