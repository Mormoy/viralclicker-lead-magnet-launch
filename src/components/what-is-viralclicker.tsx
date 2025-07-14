import { Shield, Zap, Users, Target } from 'lucide-react';

const WhatIsViralClicker = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-viralDark to-viralDark/90">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-viralDark/50 backdrop-blur-sm border border-viralOrange/20 rounded-xl p-8 mb-12">
            <p className="text-white/90 text-lg md:text-xl leading-relaxed text-justify">
              ViralClicker es una plataforma integral de automatización de marketing digital que revoluciona la forma en que las empresas generan, califican y convierten leads. Nuestro sistema combina inteligencia artificial avanzada con estrategias de marketing probadas para crear un ecosistema automatizado que trabaja las 24 horas del día, los 7 días de la semana.
              <br /><br />
              A diferencia de las soluciones tradicionales que requieren supervisión constante, ViralClicker funciona como un empleado digital que nunca descansa. Nuestro avatar inteligente, Nairok, analiza comportamientos, identifica patrones y optimiza automáticamente las campañas para maximizar el retorno de inversión de nuestros clientes.
              <br /><br />
              Con ViralClicker, no solo obtienes más leads, sino leads de mayor calidad que realmente están interesados en tu propuesta de valor. Nuestro sistema pre-califica a cada prospecto, asegurando que solo inviertas tiempo en oportunidades reales de negocio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-viralDark/30 backdrop-blur-sm border border-viralOrange/20 rounded-lg p-6 hover:border-viralOrange/40 transition-all duration-300">
              <div className="w-16 h-16 bg-viralOrange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-viralOrange" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Confiable</h3>
              <p className="text-white/70 text-sm">Sistema probado y respaldado por resultados</p>
            </div>
            
            <div className="text-center bg-viralDark/30 backdrop-blur-sm border border-viralOrange/20 rounded-lg p-6 hover:border-viralOrange/40 transition-all duration-300">
              <div className="w-16 h-16 bg-viralOrange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-viralOrange" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Automatizado</h3>
              <p className="text-white/70 text-sm">Funciona sin supervisión constante</p>
            </div>
            
            <div className="text-center bg-viralDark/30 backdrop-blur-sm border border-viralOrange/20 rounded-lg p-6 hover:border-viralOrange/40 transition-all duration-300">
              <div className="w-16 h-16 bg-viralOrange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-viralOrange" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Escalable</h3>
              <p className="text-white/70 text-sm">Crece con tu negocio sin límites</p>
            </div>
            
            <div className="text-center bg-viralDark/30 backdrop-blur-sm border border-viralOrange/20 rounded-lg p-6 hover:border-viralOrange/40 transition-all duration-300">
              <div className="w-16 h-16 bg-viralOrange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-viralOrange" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Preciso</h3>
              <p className="text-white/70 text-sm">Leads calificados y de alta calidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsViralClicker;