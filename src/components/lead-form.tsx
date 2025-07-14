
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-viralDark border border-viralOrange/30 rounded-lg max-w-md w-full p-6 relative">
        <LeadFormHeader onClose={onClose} />
        
        {hasAlreadySubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">¡Datos enviados!</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Gracias por tu interés. Te contactaremos pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormField
                id="name"
                name="name"
                type="text"
                label="Nombre completo"
                placeholder="Tu nombre completo"
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
                placeholder="Tu número de WhatsApp"
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
                placeholder="tu@email.com"
                value={formData.email}
                error={errors.email}
                disabled={isSubmitting}
                onChange={handleChange}
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Procesando..." : "Acceder ahora"}
              </button>
              
              <LeadFormFooter />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadForm;
