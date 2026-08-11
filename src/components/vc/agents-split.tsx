// ============================================================================
// Los dos agentes.
//
// Son dos canales distintos, así que se ven distintos: el que llama vive en la
// pantalla del teléfono (tinta) y el que conversa vive en el chat (papel). Dos
// tarjetas gemelas habrían dicho lo contrario de lo que el producto hace.
// ============================================================================
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PhoneCall, MessageCircle } from 'lucide-react';
import { subeSuave } from '@/components/vc/section';

export default function AgentsSplit() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {/* El que llama — pantalla de teléfono */}
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          className="rounded-sm border border-vc-ink3 bg-vc-ink2 p-7"
        >
          <div className="flex items-center gap-3">
            <PhoneCall className="h-5 w-5 text-vc-signal" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-vc-steel">
              {t('home.agentsTitle')}
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold text-vc-paper">
            {t('home.agentCallTitle')}
          </h3>
          <p className="mt-3 leading-relaxed text-vc-steel">{t('home.agentCallDesc')}</p>
        </motion.article>

        {/* El que conversa — papel, como el hilo de WhatsApp del hero */}
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subeSuave}
          transition={{ delay: 0.08 }}
          className="rounded-sm bg-vc-paper p-7"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-vc-ink" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-vc-ink/50">
              WhatsApp
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold text-vc-ink">
            {t('home.agentChatTitle')}
          </h3>
          <p className="mt-3 leading-relaxed text-vc-ink/70">{t('home.agentChatDesc')}</p>
        </motion.article>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={subeSuave}
        className="mt-8 max-w-2xl"
      >
        <p className="text-lg leading-relaxed text-vc-paper">{t('home.agentsHandoff')}</p>
        {/* La objeción de frente. Es la única mención de "CRM" del sitio. */}
        <p className="mt-4 border-l-2 border-vc-signal pl-4 leading-relaxed text-vc-steel">
          {t('home.agentsObjection')}
        </p>
      </motion.div>
    </>
  );
}
