import React, { useState } from "react";

const InlineLeadForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    correo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [isSubmitted, setIsSubmitted] = useState(
  //   localStorage.getItem('viralclicker_submitted') === 'true'
  // ); // Disabled for testing

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    // Validation disabled for testing
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      console.log("Enviando datos:", formData);
      console.log("URL del webhook:", "https://mormoy.app.n8n.cloud/webhook/Viralclicker");
      
      const response = await fetch("https://mormoy.app.n8n.cloud/webhook/Viralclicker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(formData),
      });
      
      // Con no-cors no podemos verificar el status, asumimos que fue exitoso
      console.log("Datos enviados correctamente al webhook");
      // Success handling disabled for testing
      // setIsSubmitted(true);
      // localStorage.setItem('viralclicker_submitted', 'true');
      setFormData({ nombre: "", whatsapp: "", correo: "" });
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setErrors({ submit: "Error al enviar el formulario. Inténtalo de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success message disabled for testing
  if (false) {
    return (
      <section className="py-16 bg-gradient-to-br from-viralDark via-gray-900 to-viralDark">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-viralDark/80 backdrop-blur-sm border border-viralOrange/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-viralOrange/10">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/40">
                  <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¡Excelente decisión!</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  Nuestro equipo se pondrá en contacto contigo muy pronto para comenzar a automatizar tu negocio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-viralDark via-gray-900 to-viralDark">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¡Automatiza tu negocio hoy!
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Déjanos tus datos y nuestro sistema comenzará a trabajar por ti en segundos.
            </p>
          </div>
          
          <div className="bg-viralDark/80 backdrop-blur-sm border border-viralOrange/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-viralOrange/10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {errors.submit && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                  {errors.submit}
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-white text-sm font-medium mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Escribe tu nombre completo"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-viralOrange/50 focus:border-viralOrange transition-all disabled:opacity-50 text-lg ${
                      errors.nombre ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.nombre && (
                    <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="whatsapp" className="block text-white text-sm font-medium mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+1234567890"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-viralOrange/50 focus:border-viralOrange transition-all disabled:opacity-50 text-lg ${
                      errors.whatsapp ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-red-400 text-sm mt-1">{errors.whatsapp}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="correo" className="block text-white text-sm font-medium mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-viralOrange/50 focus:border-viralOrange transition-all disabled:opacity-50 text-lg ${
                      errors.correo ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.correo && (
                    <p className="text-red-400 text-sm mt-1">{errors.correo}</p>
                  )}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-viralOrange to-viralOrange/90 hover:from-viralOrange/90 hover:to-viralOrange text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-viralOrange/30 text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  "Quiero automatizar mi negocio"
                )}
              </button>
              
              <div className="text-center pt-4">
                <p className="text-white/60 text-sm">
                  🔒 Tus datos están protegidos. No compartimos información personal.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InlineLeadForm;