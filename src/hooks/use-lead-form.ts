
import { useState, useEffect } from 'react';
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

export const useLeadForm = (onSuccess?: () => void) => {
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
  useEffect(() => {
    const submittedEmails = JSON.parse(localStorage.getItem("viralclicker_submitted_emails") || "[]");
    if (submittedEmails.length > 0) {
      setHasAlreadySubmitted(true);
    }
  }, []);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    // Check if email was already submitted
    const submittedEmails = JSON.parse(localStorage.getItem("viralclicker_submitted_emails") || "[]");
    if (submittedEmails.includes(formData.email.trim().toLowerCase())) {
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

  const submitToWebhook = async (data: FormData) => {
    const response = await fetch('https://mormoy.app.n8n.cloud/webhook-test/viralcliker', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: data.name.trim(),
        whatsapp: data.phone.trim(),
        correo: data.email.trim()
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Error desconocido');
      console.error("Webhook error:", errorText);
      throw new Error(`Webhook error: ${response.status}`);
    }

    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
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
      
      await submitToWebhook(formData);
      
      // Store the email to prevent future submissions
      const submittedEmails = JSON.parse(localStorage.getItem("viralclicker_submitted_emails") || "[]");
      submittedEmails.push(formData.email.trim().toLowerCase());
      localStorage.setItem("viralclicker_submitted_emails", JSON.stringify(submittedEmails));
      
      setHasAlreadySubmitted(true);
      
      // Close modal automatically after success
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Even on error, mark as submitted to prevent spam
      const submittedEmails = JSON.parse(localStorage.getItem("viralclicker_submitted_emails") || "[]");
      submittedEmails.push(formData.email.trim().toLowerCase());
      localStorage.setItem("viralclicker_submitted_emails", JSON.stringify(submittedEmails));
      
      setHasAlreadySubmitted(true);
      
      // Close modal automatically after success
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
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
