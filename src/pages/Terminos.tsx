import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, MessageCircle, CreditCard, AlertTriangle, RefreshCw } from 'lucide-react';
import Logo from '@/components/logo';

// =====================================================
// TÉRMINOS DEL SERVICIO - EDITA AQUÍ DIRECTAMENTE
// =====================================================

const terms = {
  lastUpdated: "22 de enero de 2025",
  companyName: "Viral Clicker by MORMOY",
  supportEmail: "soporte@viralclicker.com",
  supportWhatsApp: "+56912345678"
};

const Terminos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-viralDark">
      {/* Header */}
      <header className="p-4 bg-viralDark border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-white/60 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
          <Logo />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-viralOrange/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-viralOrange" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Términos del Servicio
            </h1>
            <p className="text-white/60">
              Última actualización: {terms.lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Section 1: Scope by Plan */}
            <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-viralOrange" />
                1. Alcance del servicio por plan
              </h2>
              
              <div className="space-y-4 text-white/70">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Plan Starter ($99/mes)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Landing page con formulario de contacto</li>
                    <li>CRM básico con gestión de estados</li>
                    <li>3 plantillas de WhatsApp predefinidas</li>
                    <li>Export a CSV</li>
                    <li>Soporte básico por email (respuesta en 48-72 hrs)</li>
                    <li>1 sesión de soporte de 30 minutos al mes</li>
                    <li>1 cambio menor por mes incluido</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Plan Pro ($249/mes)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Todo lo del plan Starter, más:</li>
                    <li>Cotizador personalizado con link vivo</li>
                    <li>Sistema de cupones sobre cotizaciones</li>
                    <li>Automatizaciones base con n8n</li>
                    <li>Campañas internas de WhatsApp</li>
                    <li>Reportes de conversión</li>
                    <li>30 minutos de soporte quincenal</li>
                    <li>2 cambios menores por mes</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Plan Elite ($449/mes)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Todo lo del plan Pro, más:</li>
                    <li>Tracking post-venta completo</li>
                    <li>Automatización avanzada</li>
                    <li>Integración con Calendly</li>
                    <li>Multiusuario (si aplica)</li>
                    <li>Soporte prioritario (respuesta en 24 hrs)</li>
                    <li>Onboarding intensivo: 30 min/semana durante 4 semanas</li>
                    <li>3 cambios menores por mes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: Support Limits */}
            <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-viralOrange" />
                2. Límites de soporte y cambios
              </h2>
              
              <div className="space-y-4 text-white/70">
                <p>
                  <strong className="text-white">Cambios menores</strong> se definen como: ajustes de texto, 
                  colores, imágenes, o configuraciones que no requieren desarrollo adicional. Tiempo estimado: 
                  menos de 30 minutos de trabajo.
                </p>
                <p>
                  <strong className="text-white">Cambios mayores</strong> (nuevas funcionalidades, integraciones 
                  adicionales, rediseños completos) se cotizan por separado y no están incluidos en la mensualidad.
                </p>
                <p>
                  Las sesiones de soporte no utilizadas <strong className="text-white">no son acumulables</strong> 
                  entre meses.
                </p>
                <p>
                  El soporte se brinda en horario laboral: <strong className="text-white">Lunes a Viernes, 
                  9:00 a 18:00 hrs (hora Chile)</strong>.
                </p>
              </div>
            </section>

            {/* Section 3: Twilio/WhatsApp */}
            <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                3. Responsabilidad Twilio/WhatsApp
              </h2>
              
              <div className="space-y-4 text-white/70">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-200 font-semibold mb-2">⚠️ Importante</p>
                  <p className="text-sm">
                    Los costos de mensajería de WhatsApp Business API (Twilio) son <strong className="text-white">
                    responsabilidad directa del cliente</strong> y se pagan directamente a Twilio.
                  </p>
                </div>
                
                <p>
                  Viral Clicker se encarga de: configurar, implementar e integrar la API de WhatsApp Business 
                  con tu sistema. <strong className="text-white">No somos responsables</strong> de los costos 
                  de mensajes, números telefónicos, o cualquier cargo de Twilio.
                </p>
                <p>
                  El cliente debe crear y mantener su propia cuenta en Twilio y vincular un método de pago 
                  válido para cubrir los costos de mensajería.
                </p>
                <p>
                  Puedes consultar los precios actuales de Twilio en: 
                  <a href="https://www.twilio.com/whatsapp/pricing" target="_blank" rel="noopener" 
                     className="text-viralOrange hover:underline ml-1">
                    twilio.com/whatsapp/pricing
                  </a>
                </p>
              </div>
            </section>

            {/* Section 4: Refund Policy */}
            <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-viralOrange" />
                4. Política de reembolso y cancelación
              </h2>
              
              <div className="space-y-4 text-white/70">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Setup inicial</h3>
                  <p className="text-sm">
                    El pago del setup inicial <strong className="text-white">no es reembolsable</strong> una vez 
                    que el trabajo de configuración ha comenzado. Si cancelas antes del inicio del trabajo, 
                    se reembolsará el 50% del monto.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Suscripción mensual</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Puedes cancelar tu suscripción en cualquier momento</li>
                    <li>La cancelación toma efecto al final del período de facturación actual</li>
                    <li><strong className="text-white">No hay reembolsos</strong> por el período parcial no utilizado</li>
                    <li>Mantendras acceso a tu sistema hasta el fin del período pagado</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Cómo cancelar</h3>
                  <p className="text-sm">
                    Para cancelar tu suscripción, contacta a nuestro equipo de soporte por email a{' '}
                    <a href={`mailto:${terms.supportEmail}`} className="text-viralOrange hover:underline">
                      {terms.supportEmail}
                    </a>{' '}
                    o por WhatsApp. Procesaremos tu solicitud en un máximo de 48 horas hábiles.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: General */}
            <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">
                5. Términos generales
              </h2>
              
              <div className="space-y-4 text-white/70 text-sm">
                <p>
                  Al contratar cualquier plan de Viral Clicker, el cliente acepta estos términos en su totalidad.
                </p>
                <p>
                  <strong className="text-white">Propiedad intelectual:</strong> El diseño y código desarrollado 
                  específicamente para el cliente permanece bajo licencia de uso mientras la suscripción esté activa.
                </p>
                <p>
                  <strong className="text-white">Disponibilidad:</strong> Nos esforzamos por mantener un uptime 
                  del 99.5%, pero no garantizamos disponibilidad ininterrumpida del servicio.
                </p>
                <p>
                  <strong className="text-white">Modificaciones:</strong> Nos reservamos el derecho de modificar 
                  estos términos con previo aviso de 30 días por email.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-viralOrange/10 border border-viralOrange/30 rounded-xl p-6 text-center">
              <h2 className="text-xl font-bold text-white mb-4">¿Tienes preguntas?</h2>
              <p className="text-white/70 mb-6">
                Estamos aquí para ayudarte a entender cualquier aspecto de nuestros términos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open(`https://wa.me/${terms.supportWhatsApp}?text=Hola,%20tengo%20una%20pregunta%20sobre%20los%20términos%20del%20servicio`, '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = `mailto:${terms.supportEmail}`}
                  className="border-viralOrange text-viralOrange hover:bg-viralOrange/10"
                >
                  Email de soporte
                </Button>
              </div>
            </section>
          </div>

          {/* Back to home */}
          <div className="text-center mt-12">
            <Button 
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white/60 hover:text-white"
            >
              ← Volver al inicio
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-white/40 text-sm">
          © 2025 {terms.companyName}. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Terminos;
