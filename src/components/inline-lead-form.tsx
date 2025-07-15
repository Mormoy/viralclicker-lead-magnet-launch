import React from "react";
import FormField from "./form-field";
import { useLeadForm } from "@/hooks/use-lead-form";

const InlineLeadForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    hasAlreadySubmitted,
    handleChange,
    handleSubmit
  } = useLeadForm();

  if (hasAlreadySubmitted) {
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
              <div className="space-y-6">
                <FormField
                  id="name"
                  name="name"
                  type="text"
                  label="Nombre completo"
                  placeholder="Escribe tu nombre completo"
                  value={formData.name}
                  error={errors.name}
                  disabled={isSubmitting}
                  onChange={handleChange}
                />
                
                <FormField
                  id="phone"
                  name="phone"
                  type="tel"
                  label="WhatsApp"
                  placeholder="+1234567890"
                  value={formData.phone}
                  error={errors.phone}
                  disabled={isSubmitting}
                  onChange={handleChange}
                />
                
                <FormField
                  id="email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  error={errors.email}
                  disabled={isSubmitting}
                  onChange={handleChange}
                />
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