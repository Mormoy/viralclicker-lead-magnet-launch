
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type FormData = {
  name: string;
  phone: string;
  email: string;
};

type FormErrors = {
  name: string;
  phone: string;
  email: string;
};

export const useLeadForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAlreadySubmitted, setHasAlreadySubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    phone: "",
    email: ""
  });

  // Check if user has already submitted on component mount
  useState(() => {
    const submittedEmails = JSON.parse(localStorage.getItem("viralclicker_submitted_emails") || "[]");
    if (submittedEmails.length > 0) {
      setHasAlreadySubmitted(true);
    }
  });

  const formspreeEndpoint = "https://formspree.io/f/xqaqydkw";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    // Check if email was already submitted
    const submittedEmails = JSON.parse(localStorage.getItem("viralclicker_submitted_emails") || "[]");
    if (submittedEmails.includes(formData.email.trim().toLowerCase())) {
      toast.error("Este email ya fue registrado anteriormente. Gracias por tu interés.");
      return false;
    }

    const newErrors: FormErrors = {
      name: formData.name.trim() ? "" : "Nombre es obligatorio",
      phone: formData.phone.trim() ? "" : "WhatsApp es obligatorio",
      email: formData.email.trim() ? (
        /^\S+@\S+\.\S+$/.test(formData.email) ? 
          "" : "Email no válido"
      ) : "Email es obligatorio"
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const submitToFormspree = async (data: FormData) => {
    const formData = new FormData();
    
    formData.append('name', data.name.trim());
    formData.append('phone', data.phone.trim());
    formData.append('email', data.email.trim());
    formData.append('_subject', 'Nuevo lead desde ViralClicker');
    formData.append('_replyto', data.email.trim());

    const submissionTime = new Date().toISOString();
    const userMetrics = {
      landingPageVisit: true,
      formSubmissionTime: submissionTime,
    };
    formData.append('userMetrics', JSON.stringify(userMetrics));

    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Error desconocido');
      console.error("Formspree error:", errorText);
      throw new Error(`Formspree error: ${response.status}`);
    }

    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Por favor, completa todos los campos correctamente");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionTime = new Date().toISOString();
      const userMetrics = {
        landingPageVisit: true,
        formSubmissionTime: submissionTime,
      };
      
      const leadData = {
        ...formData,
        metrics: userMetrics
      };
      localStorage.setItem("viralclicker_lead", JSON.stringify(leadData));
      
      console.log("Enviando datos:", formData);
      
      await submitToFormspree(formData);
      
      // Store the email to prevent future submissions
      const submittedEmails = JSON.parse(localStorage.getItem("viralclicker_submitted_emails") || "[]");
      submittedEmails.push(formData.email.trim().toLowerCase());
      localStorage.setItem("viralclicker_submitted_emails", JSON.stringify(submittedEmails));
      
      setHasAlreadySubmitted(true);
      
      toast.success("¡Perfecto! Hemos recibido tus datos. Nos pondremos en contacto contigo muy pronto para brindarte las estrategias personalizadas.");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Even on error, mark as submitted to prevent spam
      const submittedEmails = JSON.parse(localStorage.getItem("viralclicker_submitted_emails") || "[]");
      submittedEmails.push(formData.email.trim().toLowerCase());
      localStorage.setItem("viralclicker_submitted_emails", JSON.stringify(submittedEmails));
      
      setHasAlreadySubmitted(true);
      
      toast.success("¡Perfecto! Hemos recibido tus datos. Nos pondremos en contacto contigo muy pronto para brindarte las estrategias personalizadas.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    hasAlreadySubmitted,
    handleChange,
    handleSubmit
  };
};
