
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
    handleChange,
    handleSubmit
  } = useLeadForm();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-viralDark border border-viralOrange/30 rounded-lg max-w-md w-full p-6 relative">
        <LeadFormHeader onClose={onClose} />
        
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
      </div>
    </div>
  );
};

export default LeadForm;
