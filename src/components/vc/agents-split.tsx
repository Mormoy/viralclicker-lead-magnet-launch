// ============================================================================
// Los dos agentes.
//
// Son dos canales distintos y se ven distintos: el que llama va en marrón
// oscuro (la pantalla del teléfono) y el que conversa en amarillo de obra. Dos
// tarjetas gemelas habrían dicho lo contrario de lo que el producto hace.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PhoneCall, MessageCircle } from 'lucide-react';
import { subeSuave } from '@/components/vc/skin';

export default function AgentsSplit() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          className="border-[3px] border-vc-marron bg-vc-marron p-7 text-vc-hueso shadow-dura"
        >
          <PhoneCall className="h-6 w-6 text-vc-amarillo" />
          <h3 className="mt-4 font-display text-3xl font-black uppercase leading-none text-vc-crema">
            {t('home.agentCallTitle')}
          </h3>
          <p className="mt-3 leading-relaxed text-vc-arena">{t('home.agentCallDesc')}</p>
        </motion.article>

        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          transition={{ delay: 0.08 }}
          className="border-[3px] border-vc-marron bg-vc-amarillo p-7 text-vc-marron shadow-dura"
        >
          <MessageCircle className="h-6 w-6 text-vc-marron" />
          <h3 className="mt-4 font-display text-3xl font-black uppercase leading-none">
            {t('home.agentChatTitle')}
          </h3>
          <p className="mt-3 leading-relaxed text-vc-marron">{t('home.agentChatDesc')}</p>
        </motion.article>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={subeSuave}
        className="mt-7 max-w-2xl"
      >
        <p className="text-lg font-semibold leading-relaxed text-vc-tinta">
          {t('home.agentsHandoff')}
        </p>
        {/* La objeción de frente. Es la única mención de "CRM" del sitio. */}
        <p className="mt-4 border-l-[5px] border-vc-naranja pl-4 leading-relaxed text-vc-marron3">
          {t('home.agentsObjection')}
        </p>
      </motion.div>
    </>
  );
}
