
import { Link } from "react-router-dom";
import Logo from "@/components/logo";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      {/* Header */}
      <header className="p-4 bg-viralDark border-b border-gray-800">
        <div className="container mx-auto">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-viralOrange mb-4">404</h1>
          <p className="text-white text-xl mb-6">Página no encontrada</p>
          <Link 
            to="/" 
            className="bg-viralOrange hover:bg-viralOrange/90 text-white px-6 py-3 rounded inline-block transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-viralDark border-t border-gray-800 py-4">
        <div className="container mx-auto text-white/60 text-center text-sm">
          © 2025 ViralClicker. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
