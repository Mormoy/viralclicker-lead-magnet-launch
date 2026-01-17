import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import Logo from '@/components/logo';
import { useNavigate } from 'react-router-dom';

const Gracias = () => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open('https://wa.me/56912345678?text=Hola,%20acabo%20de%20completar%20el%20formulario%20de%20ClickCRM', '_blank');
  };

  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      {/* Header */}
      <header className="p-4 bg-viralDark border-b border-gray-800">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Logo />
            <span className="text-viralOrange font-bold text-xl">ClickCRM</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Gracias por tu interés!
          </h1>
          
          <p className="text-white/70 text-lg mb-8">
            Recibimos tu solicitud correctamente. Nos pondremos en contacto contigo 
            dentro de las próximas <span className="text-viralOrange font-semibold">24 horas hábiles</span>.
          </p>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
            <h3 className="text-white font-semibold mb-3">¿Quieres acelerar el proceso?</h3>
            <p className="text-white/60 text-sm mb-4">
              Escríbenos directamente por WhatsApp y agenda tu demo ahora mismo.
            </p>
            <Button 
              onClick={handleWhatsApp}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-full"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Hablar por WhatsApp ahora
            </Button>
          </div>

          <Button 
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white/60 hover:text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-4">
        <div className="container mx-auto text-white/40 text-center text-sm">
          © 2025 ClickCRM by Viral Clicker. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Gracias;
