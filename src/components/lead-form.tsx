
import React, { useState } from "react";
import { X } from "lucide-react";

type LeadFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LeadForm = ({ isOpen, onClose }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    correo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatWhatsAppNumber = (value: string) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    // If it doesn't start with a country code, add +1 (US/Canada default)
    if (digitsOnly.length > 0 && !value.startsWith('+')) {
      return '+1' + digitsOnly;
    }
    
    // If it starts with +, preserve it
    if (value.startsWith('+')) {
      return '+' + digitsOnly;
    }
    
    return value;
  };

  const validateWhatsApp = (value: string) => {
    if (!value) return "El número de WhatsApp es requerido";
    
    // Must start with +
    if (!value.startsWith('+')) {
      return "El número debe comenzar con + seguido del código de país";
    }
    
    // Remove + and check if all remaining are digits
    const digits = value.slice(1);
    if (!/^\d+$/.test(digits)) {
      return "Solo se permiten números después del código de país";
    }
    
    // Minimum length check (country code + number)
    if (digits.length < 8) {
      return "El número parece estar incompleto";
    }
    
    // Maximum length check
    if (digits.length > 15) {
      return "El número es demasiado largo";
    }
    
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'whatsapp') {
      const formattedValue = formatWhatsAppNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      
      // Validate WhatsApp in real-time
      const whatsappError = validateWhatsApp(formattedValue);
      if (whatsappError) {
        setErrors(prev => ({ ...prev, whatsapp: whatsappError }));
      } else {
        setErrors(prev => ({ ...prev, whatsapp: "" }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate name
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }
    
    // Validate WhatsApp
    const whatsappError = validateWhatsApp(formData.whatsapp);
    if (whatsappError) {
      newErrors.whatsapp = whatsappError;
    }
    
    // Validate email
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo electrónico válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ nombre: "", whatsapp: "", correo: "" });
      }, 4000);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setErrors({ submit: "Error al enviar el formulario. Inténtalo de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
      <div className="bg-viralDark border border-viralOrange/20 rounded-2xl max-w-md w-full p-8 relative shadow-2xl shadow-viralOrange/10 animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Success message */}
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/40">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">¡Información enviada exitosamente!</h3>
            <p className="text-white/80 text-base leading-relaxed mb-4">
              Gracias por tu interés en nuestros servicios. Nuestro equipo de expertos se comunicará contigo en las próximas horas para coordinar tu consulta personalizada.
            </p>
            <p className="text-white/60 text-sm">
              Mientras tanto, te invitamos a continuar explorando nuestra propuesta de valor.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                ¡Transforma tu negocio con ViralClicker!
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Únete a miles de emprendedores que ya están multiplicando sus ventas con nuestro sistema automatizado de generación de leads
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 p-3 rounded-lg border border-viralOrange/30 bg-viralOrange/10">
                  <div className="w-2 h-2 bg-viralOrange rounded-full"></div>
                  <span className="text-white text-sm font-medium">Sistema probado</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg border border-viralOrange/30 bg-viralOrange/10">
                  <div className="w-2 h-2 bg-viralOrange rounded-full"></div>
                  <span className="text-white text-sm font-medium">100% automatizado</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg border border-viralOrange/30 bg-viralOrange/10">
                  <div className="w-2 h-2 bg-viralOrange rounded-full"></div>
                  <span className="text-white text-sm font-medium">Leads de calidad</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg border border-viralOrange/30 bg-viralOrange/10">
                  <div className="w-2 h-2 bg-viralOrange rounded-full"></div>
                  <span className="text-white text-sm font-medium">Soporte 24/7</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                  {errors.submit}
                </div>
              )}
              
              <div className="space-y-5">
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
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-viralOrange/50 focus:border-viralOrange transition-all disabled:opacity-50 ${
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
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-viralOrange/50 focus:border-viralOrange transition-all disabled:opacity-50 ${
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
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-viralOrange/50 focus:border-viralOrange transition-all disabled:opacity-50 ${
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
                   "Solicitar consulta gratuita"
                 )}
              </button>
              
              <div className="text-center pt-2">
                <p className="text-white/60 text-sm">
                  🔒 Tus datos están protegidos. No compartimos información personal.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadForm;
