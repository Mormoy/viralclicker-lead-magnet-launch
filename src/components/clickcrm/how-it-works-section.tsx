const steps = [
  {
    number: 1,
    title: "Cliente entra al Cotizador Inteligente",
    description: "Tu cliente accede a una página donde selecciona lo que necesita.",
  },
  {
    number: 2,
    title: "Genera una cotización",
    description: "Recibe un presupuesto personalizado en segundos.",
  },
  {
    number: 3,
    title: "El lead entra automáticamente al CRM",
    description: "Cada cotización se registra en tu pipeline con todos los datos.",
  },
  {
    number: 4,
    title: "Cierras la venta por WhatsApp",
    description: "Envía seguimiento, recordatorios y cierra desde el CRM.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-12 md:py-16 px-4 bg-gray-900/30">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          ¿Cómo funciona?
        </h2>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/40 border border-gray-700/50"
            >
              <div className="w-10 h-10 bg-viralOrange rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {step.number}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
