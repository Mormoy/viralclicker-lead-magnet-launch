import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Shield, Check, Settings, Star } from 'lucide-react';
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

const setupOptions = {
  simple: { 
    id: 'simple',
    name: 'Simple', 
    price: 500, 
    landings: 1,
    features: ['1 landing page', 'Flujo básico de cotización', 'Configuración estándar']
  },
  standard: { 
    id: 'standard',
    name: 'Estándar', 
    price: 1000, 
    landings: 3,
    features: ['Hasta 3 landing pages', 'Flujos personalizados', 'Landing Pack Pro incluido']
  },
  complex: { 
    id: 'complex',
    name: 'Complejo', 
    price: 1600, 
    landings: 5,
    features: ['Hasta 5 landing pages', 'Integraciones ERP/Inventario', 'Catálogos grandes (30+ productos)']
  }
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initialPlanId = (searchParams.get('plan') || 'starter') as keyof typeof plans;
  
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof plans>(initialPlanId);
  const [selectedSetup, setSelectedSetup] = useState<keyof typeof setupOptions>('simple');
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    correo: '',
    whatsapp: '',
    ciudad: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const plan = plans[selectedPlan];
  const setup = setupOptions[selectedSetup];
  const totalFirstPayment = plan.price + setup.price;

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
        plan: selectedPlan,
        email: formData.correo,
        nombre: formData.nombre,
        empresa: formData.empresa,
        setup: selectedSetup
      });
      const successUrl = `${baseUrl}/success?${successParams.toString()}`;
      const cancelUrl = `${baseUrl}/pago-fallido?plan=${selectedPlan}`;

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          planId: selectedPlan,
          setupType: selectedSetup,
          nombre: formData.nombre,
          empresa: formData.empresa,
          correo: formData.correo,
          whatsapp: formData.whatsapp,
          ciudad: formData.ciudad || '',
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Plan Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-viralOrange" />
              Elige tu Plan Mensual
            </h2>
            <p className="text-white/60 text-sm mb-4">
              Selecciona el plan que mejor se adapte a tus necesidades (suscripción mensual)
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(plans).map(([key, planOption]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedPlan(key as keyof typeof plans)}
                  className={`relative text-left p-5 rounded-xl border-2 transition-all ${
                    selectedPlan === key
                      ? 'border-viralOrange bg-viralOrange/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  {key === 'pro' && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-viralOrange text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      Más popular
                    </span>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{planOption.name}</h3>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === key ? 'border-viralOrange bg-viralOrange' : 'border-gray-500'
                    }`}>
                      {selectedPlan === key && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  
                  <p className="text-viralOrange font-bold text-2xl">${planOption.price}<span className="text-sm font-normal text-white/50">/mes</span></p>
                </button>
              ))}
            </div>
          </div>

          {/* Setup Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Settings className="w-5 h-5 text-viralOrange" />
              Elige tu tipo de Setup Inicial
            </h2>
            <p className="text-white/60 text-sm mb-4">
              Selecciona el nivel de configuración que mejor se adapte a tu negocio (pago único)
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(setupOptions).map(([key, option]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedSetup(key as keyof typeof setupOptions)}
                  className={`relative text-left p-5 rounded-xl border-2 transition-all ${
                    selectedSetup === key
                      ? 'border-viralOrange bg-viralOrange/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  {key === 'standard' && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-viralOrange text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      Más común
                    </span>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{option.name}</h3>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedSetup === key ? 'border-viralOrange bg-viralOrange' : 'border-gray-500'
                    }`}>
                      {selectedSetup === key && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  
                  <p className="text-viralOrange font-bold text-2xl mb-3">${option.price.toLocaleString()}</p>
                  
                  <ul className="space-y-1.5">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="text-white/60 text-sm flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-viralOrange flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {key === 'standard' && (
                    <div className="mt-3 bg-viralOrange/20 rounded-lg p-2 border border-viralOrange/30">
                      <p className="text-viralOrange text-xs flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Incluye Landing Pack Pro
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">
                Completa tu información
              </h2>
              
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
                      Continuar al pago - ${totalFirstPayment.toLocaleString()}
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
                <CardContent className="space-y-5">
                  {/* Plan details */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-semibold">
                        Plan {plan.name}
                      </span>
                      <span className="text-viralOrange font-bold">
                        ${plan.price}/mes
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">
                      Suscripción mensual recurrente
                    </p>
                  </div>

                  {/* Setup details */}
                  <div className="bg-viralOrange/10 border border-viralOrange/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-semibold flex items-center gap-2">
                        <Settings className="w-4 h-4 text-viralOrange" />
                        Setup {setup.name}
                      </span>
                      <span className="text-viralOrange font-bold">
                        ${setup.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">
                      Pago único • {setup.landings} landing{setup.landings > 1 ? 's' : ''} incluida{setup.landings > 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-700 pt-4 bg-viralOrange/10 -mx-6 px-6 py-4 rounded-b-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">Total a pagar hoy:</span>
                      <span className="text-viralOrange font-bold text-2xl">${totalFirstPayment.toLocaleString()}</span>
                    </div>
                    <div className="text-white/60 text-xs space-y-1">
                      <p>• Plan {plan.name}: ${plan.price}</p>
                      <p>• Setup {setup.name}: ${setup.price.toLocaleString()}</p>
                    </div>
                    <p className="text-white/50 text-xs mt-2 pt-2 border-t border-white/10">
                      * Después del primer pago, se cobrará ${plan.price}/mes
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
