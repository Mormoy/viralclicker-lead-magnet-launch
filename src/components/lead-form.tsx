
import { useState } from "react";
import Logo from "./logo";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type LeadFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LeadForm = ({ isOpen, onClose }: LeadFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formspreeEndpoint = "https://formspree.io/f/xqaqydkw";

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {
      name: formData.name ? "" : "Nombre es obligatorio",
      phone: formData.phone ? "" : "WhatsApp es obligatorio",
      email: formData.email ? (
        /^\S+@\S+\.\S+$/.test(formData.email) ? 
          "" : "Email no válido"
      ) : "Email es obligatorio"
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // Track form submission time
        const submissionTime = new Date().toISOString();
        const userMetrics = {
          landingPageVisit: true,
          formSubmissionTime: submissionTime,
        };
        
        // Save lead data and metrics in localStorage first
        const leadData = {
          ...formData,
          metrics: userMetrics
        };
        localStorage.setItem("viralclicker_lead", JSON.stringify(leadData));
        
        // Create FormData for better compatibility
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('userMetrics', JSON.stringify(userMetrics));
        
        // Send data to Formspree with better error handling
        const response = await fetch(formspreeEndpoint, {
          method: "POST",
          body: formDataToSend,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          toast.success("¡Datos registrados correctamente! Redirigiendo al webinar...");
          // Small delay to show the success message
          setTimeout(() => {
            navigate("/webinar");
          }, 1500);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error("Form submission error:", errorData);
          
          // Even if Formspree fails, we have the data saved locally
          toast.success("Datos guardados localmente. Redirigiendo al webinar...");
          setTimeout(() => {
            navigate("/webinar");
          }, 1500);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        
        // Fallback: if network fails, we still have local data
        toast.success("Datos guardados. Redirigiendo al webinar...");
        setTimeout(() => {
          navigate("/webinar");
        }, 1500);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-viralDark border border-viralOrange/30 rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>
        
        <div className="flex justify-center mb-6">
          <Logo className="scale-110" />
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          ¡Completa tus datos para acceder al webinar!
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className={`w-full p-3 bg-gray-800 text-white rounded border ${
                  errors.name ? "border-red-500" : "border-gray-700"
                } focus:border-viralOrange focus:outline-none`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-white mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Tu número de WhatsApp"
                className={`w-full p-3 bg-gray-800 text-white rounded border ${
                  errors.phone ? "border-red-500" : "border-gray-700"
                } focus:border-viralOrange focus:outline-none`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={`w-full p-3 bg-gray-800 text-white rounded border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } focus:border-viralOrange focus:outline-none`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Procesando..." : "Acceder ahora"}
            </button>
            
            <p className="text-white/60 text-xs text-center mt-4">
              Al enviar este formulario, aceptas nuestros términos y condiciones y política de privacidad.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
