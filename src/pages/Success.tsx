import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Calendar, FileText, Mail, Home, ExternalLink, MessageCircle, Package, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [contractAccepted, setContractAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState('https://calendly.com/atacamacortinas/onbording-viralclicker');
  const [contractUrl, setContractUrl] = useState('');
  
  // Get params from URL (will be set by Stripe checkout or form)
  const plan = searchParams.get('plan') || 'starter';
  const email = searchParams.get('email') || '';
  const nombre = searchParams.get('nombre') || '';
  const empresa = searchParams.get('empresa') || '';

  useEffect(() => {
    // Fetch integration settings
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('integrations_settings')
        .select('calendly_url, contract_url')
        .limit(1)
        .single();
      
      if (data) {
        if (data.calendly_url) setCalendlyUrl(data.calendly_url);
        if (data.contract_url) setContractUrl(data.contract_url);
      }
    };
    
    fetchSettings();
  }, []);

  const handleContractAccept = async () => {
    if (!contractAccepted) {
      toast({
        title: "Acepta el contrato",
        description: "Debes aceptar el contrato de servicio para continuar",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Update client record with contract acceptance
      const { error } = await supabase
        .from('clients')
        .update({
          contrato_aceptado: true,
          contrato_timestamp: new Date().toISOString(),
          estado: 'contrato_firmado'
        })
        .eq('correo', email);

      if (error) throw error;

      toast({
        title: "¡Contrato aceptado!",
        description: "Tu aceptación ha sido registrada. Ahora agenda tu onboarding.",
      });
    } catch (error) {
      console.error('Error updating contract:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al registrar tu aceptación. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlanDetails = (planId: string) => {
    const plans: Record<string, { name: string; price: string; features: string[] }> = {
      starter: {
        name: 'Starter',
        price: '$99/mes',
        features: [
          'Landing + formulario de contacto',
          'CRM básico con estados',
          '3 plantillas WhatsApp',
          'Export CSV',
          '1 sesión de soporte 30 min/mes'
        ]
      },
      pro: {
        name: 'Pro',
        price: '$249/mes',
        features: [
          'Todo de Starter +',
          'Cotizador personalizado',
          'Automatizaciones n8n',
          'Campañas internas WhatsApp',
          'Soporte quincenal 30 min'
        ]
      },
      elite: {
        name: 'Elite',
        price: '$449/mes',
        features: [
          'Todo de Pro +',
          'Tracking post-venta',
          'Automatización avanzada',
          'Soporte prioritario',
          'Onboarding: 30 min/semana x4'
        ]
      }
    };
    return plans[planId] || plans.starter;
  };

  const planDetails = getPlanDetails(plan);

  return (
    <div className="min-h-screen bg-viralDark">
      {/* Header */}
      <header className="p-4 bg-viralDark border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-viralOrange font-bold text-xl">Viral Clicker</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Home className="w-4 h-4 mr-2" />
            Inicio
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¡Pago exitoso! 🎉
            </h1>
            <p className="text-white/70 text-lg">
              Bienvenido/a al equipo, <span className="text-viralOrange font-semibold">{nombre || 'cliente'}</span>
            </p>
          </div>

          {/* Plan Summary */}
          <Card className="bg-gradient-to-br from-viralOrange/20 to-gray-900 border-viralOrange/50 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-viralOrange/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-viralOrange" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-white font-bold text-lg">Plan {planDetails.name}</h3>
                      <p className="text-viralOrange font-semibold">{planDetails.price}</p>
                    </div>
                    {empresa && (
                      <span className="text-white/60 text-sm">Empresa: {empresa}</span>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {planDetails.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receipt Notice */}
          <Card className="bg-gray-800/50 border-gray-700 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">📧 Revisa tu correo</h3>
                  <p className="text-white/60 text-sm">
                    Te enviamos un email a <span className="text-viralOrange">{email || 'tu correo'}</span> con:
                  </p>
                  <ul className="text-white/60 text-sm mt-2 space-y-1">
                    <li>• Recibo/factura de Stripe</li>
                    <li>• Email de bienvenida con instrucciones</li>
                    <li>• Link para agendar onboarding</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1: Contract */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="w-8 h-8 bg-viralOrange rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <FileText className="w-5 h-5 text-viralOrange" />
                  Acepta los términos del servicio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-viralOrange text-viralOrange hover:bg-viralOrange/10"
                  onClick={() => navigate('/terminos')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Leer términos del servicio
                </Button>
                
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="contract"
                      checked={contractAccepted}
                      onCheckedChange={(checked) => setContractAccepted(checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="contract" className="text-white/80 text-sm cursor-pointer">
                      He leído y acepto los <a href="/terminos" target="_blank" className="text-viralOrange hover:underline">términos del servicio</a> de Viral Clicker. 
                      Entiendo que el servicio se factura mensualmente y que Twilio/WhatsApp se paga por separado directamente a Twilio.
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={handleContractAccept}
                  disabled={!contractAccepted || isSubmitting}
                  className="w-full bg-viralOrange hover:bg-viralOrange/90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Guardando...' : 'Confirmar aceptación'}
                </Button>
              </CardContent>
            </Card>

            {/* Step 2: Calendly */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="w-8 h-8 bg-viralOrange rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <Calendar className="w-5 h-5 text-viralOrange" />
                  Agenda tu onboarding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/60 text-sm mb-4">
                  Selecciona un horario para tu sesión de onboarding 1:1. Aquí configuraremos todo tu sistema.
                </p>
                
                {/* Calendly Embed */}
                <div className="bg-white rounded-lg overflow-hidden" style={{ minHeight: '650px' }}>
                  <iframe
                    src={calendlyUrl}
                    width="100%"
                    height="650"
                    frameBorder="0"
                    title="Calendly Onboarding"
                  />
                </div>

                <p className="text-white/40 text-xs mt-4 text-center">
                  ¿Problemas para ver el calendario?{' '}
                  <a 
                    href={calendlyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-viralOrange hover:underline"
                  >
                    Abre en nueva pestaña
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* WhatsApp Alternative */}
            <Card className="bg-green-900/20 border-green-700/30">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-white font-semibold mb-1">¿No puedes agendar ahora?</h3>
                    <p className="text-white/60 text-sm">
                      Escríbenos por WhatsApp y coordinamos un horario que te sirva.
                    </p>
                  </div>
                  <Button
                    className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                    onClick={() => window.open(`https://wa.me/56912345678?text=Hola,%20acabo%20de%20contratar%20el%20plan%20${plan}%20y%20quiero%20agendar%20mi%20onboarding`, '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">📋 Próximos pasos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Revisa tu recibo/factura en tu correo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Acepta los términos del servicio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Agenda tu onboarding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 border-2 border-white/40 rounded flex-shrink-0 mt-0.5" />
                    <span>Prepara: logo, colores de marca, catálogo de productos/servicios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 border-2 border-white/40 rounded flex-shrink-0 mt-0.5" />
                    <span>¡Listo para empezar en 7 días!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
