import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, RefreshCw, Home, MessageCircle, CreditCard } from 'lucide-react';
import Logo from '@/components/logo';

const PagoFallido = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || '';

  const handleRetry = () => {
    // Navigate back to pricing section
    navigate('/#planes');
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
        <div className="max-w-xl mx-auto text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pago no completado
          </h1>
          
          <p className="text-white/70 text-lg mb-8">
            Hubo un problema procesando tu pago. No te preocupes, no se realizó ningún cargo a tu tarjeta.
          </p>

          {/* Possible reasons */}
          <Card className="bg-gray-800/50 border-gray-700 mb-8 text-left">
            <CardContent className="pt-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-viralOrange" />
                Posibles causas:
              </h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Fondos insuficientes en la tarjeta</li>
                <li>• Datos de tarjeta incorrectos</li>
                <li>• Tarjeta expirada o bloqueada</li>
                <li>• Límite de transacciones alcanzado</li>
                <li>• Conexión interrumpida durante el proceso</li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <Button 
              onClick={handleRetry}
              size="lg"
              className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-bold"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Intentar de nuevo
            </Button>

            <Button 
              onClick={() => window.open('https://wa.me/56912345678?text=Hola,%20tuve%20un%20problema%20con%20el%20pago', '_blank')}
              variant="outline"
              size="lg"
              className="w-full border-green-600 text-green-400 hover:bg-green-600/20"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar soporte por WhatsApp
            </Button>
          </div>

          {/* Alternative payment */}
          <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
            <p className="text-white/60 text-sm">
              ¿Prefieres pagar por transferencia?{' '}
              <a 
                href="https://wa.me/56912345678?text=Hola,%20quiero%20pagar%20por%20transferencia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-viralOrange hover:underline"
              >
                Escríbenos y te enviamos los datos
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PagoFallido;
