
import React from "react";
import LeadFormHeader from "./lead-form-header";
import LeadFormFooter from "./lead-form-footer";
import FormField from "./form-field";
import { useLeadForm } from "@/hooks/use-lead-form";

type LeadFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LeadForm = ({ isOpen, onClose }: LeadFormProps) => {
  const {
    formData,
    errors,
    isSubmitting,
    hasAlreadySubmitted,
    handleChange,
    handleSubmit
  } = useLeadForm(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-viralDark border border-viralOrange/20 rounded-2xl max-w-md w-full p-8 relative shadow-2xl shadow-viralOrange/10">
        <LeadFormHeader onClose={onClose} />
        
        {hasAlreadySubmitted ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/40">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">¡Excelente decisión!</h3>
            <p className="text-white/80 text-base leading-relaxed">
              Nuestro equipo se pondrá en contacto contigo muy pronto para comenzar a automatizar tu negocio.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
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
              className="w-full bg-gradient-to-r from-viralOrange to-viralOrange/90 hover:from-viralOrange/90 hover:to-viralOrange text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-viralOrange/25"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Procesando...
                </span>
              ) : (
                "Quiero automatizar mi negocio"
              )}
            </button>
            
            <LeadFormFooter />
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadForm;
