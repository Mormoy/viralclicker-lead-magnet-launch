import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CreditCard, Shield, Check, Settings, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';

interface FormData {
  nombre: string;
  empresa: string;
  correo: string;
  whatsapp: string;
  ciudad: string;
}

const plans = {
  starter: { name: 'Starter', price: 99, priceId: 'price_starter' },
  pro: { name: 'Pro', price: 249, priceId: 'price_pro' },
  elite: { name: 'Elite', price: 449, priceId: 'price_elite' }
};

const SETUP_PRICE = 499;
const SETUP_ORIGINAL_PRICE = 999;

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const planId = (searchParams.get('plan') || 'starter') as keyof typeof plans;
  const plan = plans[planId] || plans.starter;

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    correo: '',
    whatsapp: '',
    ciudad: ''
  });
  const [includeSetup, setIncludeSetup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalFirstPayment = plan.price + (includeSetup ? SETUP_PRICE : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.empresa || !formData.correo || !formData.whatsapp) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const baseUrl = window.location.origin;
      const successParams = new URLSearchParams({
        plan: planId,
        email: formData.correo,
        nombre: formData.nombre,
        empresa: formData.empresa,
        setup: includeSetup ? 'true' : 'false'
      });
      const successUrl = `${baseUrl}/success?${successParams.toString()}`;
      const cancelUrl = `${baseUrl}/pago-fallido?plan=${planId}`;

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          planId,
          nombre: formData.nombre,
          empresa: formData.empresa,
          correo: formData.correo,
          whatsapp: formData.whatsapp,
          ciudad: formData.ciudad || '',
          includeSetup,
          successUrl,
          cancelUrl
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error('Error al conectar con el servidor de pagos');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No se recibió URL de pago');
      }

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Hubo un problema al procesar tu solicitud. Intenta de nuevo.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

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
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <h1 className="text-2xl font-bold text-white mb-6">
                Completa tu información
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Nombre completo *
                  </label>
                  <Input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Empresa *
                  </label>
                  <Input
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu empresa"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Correo electrónico *
                  </label>
                  <Input
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    WhatsApp *
                  </label>
                  <Input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="+56 9 1234 5678"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Ciudad
                  </label>
                  <Input
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    placeholder="Tu ciudad"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-6 text-lg mt-6"
                >
                  {isSubmitting ? (
                    'Procesando...'
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Continuar al pago - ${totalFirstPayment}
                    </>
                  )}
                </Button>

                <p className="text-white/40 text-xs text-center mt-4">
                  Al continuar, serás redirigido a la pasarela de pago seguro de Stripe.
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-gray-900 border-gray-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Resumen de tu pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan details */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold text-lg">
                        Plan {plan.name}
                      </span>
                      <span className="text-viralOrange font-bold text-xl">
                        ${plan.price}/mes
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">
                      Suscripción mensual
                    </p>
                  </div>

                  {/* Setup Option */}
                  <div 
                    className={`rounded-lg p-4 border-2 transition-all cursor-pointer ${
                      includeSetup 
                        ? 'bg-viralOrange/10 border-viralOrange' 
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setIncludeSetup(!includeSetup)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        checked={includeSetup}
                        onCheckedChange={(checked) => setIncludeSetup(checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Settings className="w-4 h-4 text-viralOrange" />
                          <span className="text-white font-semibold">Setup Inicial</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-bold border border-green-500/30">
                            50% OFF
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 line-through text-sm">${SETUP_ORIGINAL_PRICE}</span>
                          <span className="text-viralOrange font-bold text-lg">${SETUP_PRICE}</span>
                          <span className="text-white/60 text-sm">pago único</span>
                        </div>
                        <p className="text-white/60 text-xs mt-2">
                          Configuración e implementación personalizada de tu CRM
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm font-medium mb-3">Incluye:</p>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-viralOrange" />
                      <span>Landing + cotizador personalizado</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-viralOrange" />
                      <span>CRM con estados y seguimiento</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-viralOrange" />
                      <span>Plantillas WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-viralOrange" />
                      <span>Implementación en 7 días</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">Primer pago:</span>
                      <span className="text-white font-bold text-xl">${totalFirstPayment}</span>
                    </div>
                    <p className="text-white/60 text-xs">
                      {includeSetup 
                        ? `Incluye Plan ${plan.name} ($${plan.price}/mes) + Setup ($${SETUP_PRICE} único)`
                        : `Plan ${plan.name} - $${plan.price}/mes recurrente`
                      }
                    </p>
                  </div>

                  {/* Security badge */}
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-green-400 text-sm">
                      Pago 100% seguro con Stripe
                    </span>
                  </div>

                  {/* Note */}
                  <p className="text-white/40 text-xs">
                    * Twilio/WhatsApp se paga directo por el cliente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
