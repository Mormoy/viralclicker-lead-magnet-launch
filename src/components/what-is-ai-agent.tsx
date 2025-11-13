import { Bot, Zap, Users, Target } from 'lucide-react';

const WhatIsAIAgent = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-viralDark to-viralDark/95">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            ¿Qué es un <span className="text-viralOrange">Agente IA</span>?
          </h2>
          <p className="text-white/80 text-lg text-center mb-12 max-w-3xl mx-auto">
            Un agente IA es un asistente virtual inteligente que trabaja 24/7 para su negocio, 
            capaz de entender, aprender y actuar de forma autónoma para resolver problemas y 
            mejorar la experiencia de sus clientes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-viralDark/50 border border-viralOrange/20 rounded-xl p-6 hover:border-viralOrange/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-viralOrange/10 p-3 rounded-lg">
                  <Bot className="h-6 w-6 text-viralOrange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Automatización Inteligente</h3>
                  <p className="text-white/70">
                    Automatice tareas repetitivas, responda consultas y gestione procesos 
                    sin intervención humana constante.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-viralDark/50 border border-viralOrange/20 rounded-xl p-6 hover:border-viralOrange/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-viralOrange/10 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-viralOrange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Respuestas Instantáneas</h3>
                  <p className="text-white/70">
                    Atienda a sus clientes al instante, sin tiempos de espera, 
                    mejorando la satisfacción y la conversión.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-viralDark/50 border border-viralOrange/20 rounded-xl p-6 hover:border-viralOrange/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-viralOrange/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-viralOrange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Personalización Total</h3>
                  <p className="text-white/70">
                    Adaptamos el agente a su negocio, industria y necesidades específicas 
                    para obtener resultados óptimos.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-viralDark/50 border border-viralOrange/20 rounded-xl p-6 hover:border-viralOrange/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-viralOrange/10 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-viralOrange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Mejora Continua</h3>
                  <p className="text-white/70">
                    El agente aprende de cada interacción, mejorando constantemente 
                    su rendimiento y precisión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsAIAgent;
