// ============================================================================
// viralclicker.com — la home, con la piel "Propuesta A · Cuadrilla".
//
// La dirección visual la aprobó JC sobre el mockup
// `CLIENTES/ViralClicker/MOCKUP_PROPUESTA_A_CUADRILLA.html`. Tres cosas la
// hacen reconocible y no hay que diluirlas:
//
//  1· La franja de peligro amarilla y negra. Va bajo el header y separando las
//     secciones clave. Si se usa en todas deja de significar algo.
//  2· Los titulares condensados en mayúsculas, enormes, con la cifra en
//     naranja. Es un cartel de obra, no una landing de SaaS.
//  3· El teléfono de Marco con el cronómetro rojo corriendo: el lead atendido
//     de un lado y el tiempo que uno lleva sin contestar del otro.
//
// El contenido se conserva del sitio anterior; lo que cambió es la piel y el
// ejemplo del hero, que ahora es el caso real de techos y no una emergencia de
// otro rubro.
// ============================================================================
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '@/components/logo';
import PricingCta from '@/components/clickcrm/pricing-cta';
import WhatsAppButton from '@/components/clickcrm/whatsapp-button';
import LanguageSwitcher from '@/components/language-switcher';
import { CONTACT } from '@/config/site';

import HeroCuadrilla from '@/components/vc/hero-cuadrilla';
import FlujoSistema from '@/components/vc/flujo-sistema';
import AgentesCuatro from '@/components/vc/agentes-cuatro';
import SupervisorTelegram from '@/components/vc/supervisor-telegram';
import {
  Seccion, EncabezadoSeccion, FranjaPeligro, BotonCartel, Titular, subeSuave,
} from '@/components/vc/skin';
import CycleLedger from '@/components/vc/cycle-ledger';
import RubrosTarjetas from '@/components/vc/rubros-tarjetas';
import AntesDespues from '@/components/vc/antes-despues';
import SetupSieteDias from '@/components/vc/setup-siete-dias';
import FaqList from '@/components/vc/faq-list';

const abrirDemo = () => window.open(CONTACT.demoUrl, '_blank', 'noopener');

const ViralClicker = () => {
  const { t, i18n } = useTranslation();
  const pricingHref = i18n.language === 'en' ? '/pricing' : '/precios';

  return (
    <div className="flex min-h-screen flex-col bg-vc-crema font-body text-vc-tinta antialiased">
      {/* ── Cabecera ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50">
        <div className="bg-vc-marron">
          {/* A 360px el conjunto logo + selector + botón se pasaba 13px del
              ancho. El botón se achica en móvil y el gap se cierra. */}
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-2 px-[5vw] py-3.5 sm:gap-4">
            <Logo />
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <span className="hidden font-mono text-[13px] font-semibold text-vc-arena sm:inline">
                {t('cuadrilla.headerZone')}
              </span>
              <LanguageSwitcher />
              <BotonCartel
                onClick={abrirDemo}
                data-cta="demo-header"
                className="!border-vc-naranja !px-3 !py-2 !text-[13px] !shadow-none sm:!px-4 sm:!py-2.5 sm:!text-[15px]"
              >
                {t('home.navGetStarted')}
              </BotonCartel>
            </div>
          </div>
        </div>
        <FranjaPeligro />
      </header>

      <main className="flex-grow">
        {/* 1 · El titular que nombra la pérdida + el teléfono de Marco */}
        <HeroCuadrilla onDemo={abrirDemo} pricingHref={pricingHref} />

        {/* 2 · El flujo completo. Es la sección que explica QUÉ es esto. */}
        <FlujoSistema />

        {/* 3 · Los cuatro agentes, con su mini-visual cada uno */}
        <Seccion id="agentes">
          <EncabezadoSeccion
            etiqueta={t('cuadrilla.agentesTag')}
            titulo={t('cuadrilla.agentesTitle')}
            bajada={t('cuadrilla.agentesSub')}
          />
          <AgentesCuatro />
        </Seccion>

        {/* 4 · El supervisor: LA sección oscura de la página */}
        <SupervisorTelegram />

        {/* 5 · El ciclo comercial */}
        <Seccion id="product">
          <EncabezadoSeccion
            etiqueta={t('cuadrilla.plataforma')}
            titulo={t('home.cycleTitle')}
            bajada={t('home.cycleSubtitle')}
          />
          <CycleLedger />
        </Seccion>

        {/* 6 · Rubros: para quién es esto. Sin enlaces a las landings — son
            destino exclusivo de los anuncios. */}
        <Seccion>
          <EncabezadoSeccion titulo={t('home.vertTitle')} bajada={t('home.vertSubtitle')} />
          <RubrosTarjetas />
        </Seccion>

        {/* 7 · La comparación. Se entiende sin leer los párrafos. */}
        <Seccion>
          <EncabezadoSeccion titulo={t('home.caseTitle')} />
          <div className="mt-9">
            <AntesDespues />
          </div>
        </Seccion>

        {/* 8 · Setup: la promesa de los 7 días, mostrada como calendario.
            (La sección de "cómo funciona" en 4 pasos se eliminó: repetía los
            6 pasos del flujo y era la tercera tabla de filas seguida.) */}
        <Seccion>
          <EncabezadoSeccion titulo={t('home.implTitle')} bajada={t('home.implSubtitle')} />
          <SetupSieteDias />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={subeSuave}
            className="mt-8 max-w-3xl border-l-[5px] border-vc-amarillo bg-white px-5 py-4 text-[17px] leading-relaxed text-vc-marron3"
          >
            {t('cuadrilla.setupCuentas')}
          </motion.p>
        </Seccion>

        {/* 11 · Planes */}
        <PricingCta />

        {/* 12 · FAQ */}
        <Seccion id="faq">
          <EncabezadoSeccion titulo={t('home.faqTitle')} bajada={t('home.faqSubtitle')} />
          <FaqList />
        </Seccion>

        {/* 13 · El cierre. La banda naranja es el último bloque de la página y
            el único de este color: por eso funciona como remate. */}
        <Seccion>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={subeSuave}
            className="max-w-3xl"
          >
            <Titular>{t('home.ctaTitle')}</Titular>
            <p className="mt-4 text-lg leading-relaxed text-vc-marron3">{t('home.ctaSubtitle')}</p>

            {/* La credencial honesta. Vivía en la sección del caso de techos,
                que se fue a su landing; acá sigue haciendo el mismo trabajo —
                y justo antes del CTA, que es donde más pesa: no nombra a
                ningún cliente, nombra la empresa propia. */}
            <p className="mt-7 border-l-[5px] border-vc-amarillo bg-white px-5 py-4 text-[17px] leading-relaxed text-vc-marron3">
              {t('cuadrilla.casoCredito')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={subeSuave}
            className="mt-9 flex flex-wrap items-center justify-between gap-5 border-[3px] border-vc-marron bg-vc-naranja p-8 shadow-dura-lg"
          >
            <p className="max-w-2xl font-display text-[1.7rem] font-black uppercase leading-none text-vc-marron sm:text-4xl">
              {t('cuadrilla.ctaBanda')}
            </p>
            <div className="flex flex-wrap gap-3">
              <BotonCartel variante="oscuro" onClick={abrirDemo} data-cta="demo-final">
                {t('cuadrilla.ctaBandaBoton')}
              </BotonCartel>
              <Link to={pricingHref}>
                <BotonCartel variante="secundario">{t('home.ctaPricing')}</BotonCartel>
              </Link>
            </div>
          </motion.div>
        </Seccion>
      </main>

      {/* ── Pie ───────────────────────────────────────────────────────── */}
      <footer className="bg-vc-marron">
        <div className="mx-auto max-w-[1100px] px-[5vw] py-9">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="font-mono text-[11px] uppercase tracking-wider text-vc-arena">
              {t('home.footerRights', { year: new Date().getFullYear() })}
            </p>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider">
              <Link to={pricingHref} className="text-vc-arena transition-colors hover:text-vc-amarillo">
                {t('home.footerPricing')}
              </Link>
              <a href="/terms" className="text-vc-arena transition-colors hover:text-vc-amarillo">
                {t('home.footerTerms')}
              </a>
              <a href="/privacy" className="text-vc-arena transition-colors hover:text-vc-amarillo">
                {t('home.footerPrivacy')}
              </a>
              <span className="text-vc-arena">{t('home.footerTagline')}</span>
            </nav>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default ViralClicker;
