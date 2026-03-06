import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Loader2 } from 'lucide-react';

const rubros = [
  "Window Treatments / Blinds / Awnings",
  "Windows / Aluminum / Glass",
  "Gates / Security Cameras",
  "HVAC / Air Conditioning",
  "Custom Furniture",
  "Events - Tents / Awnings",
  "Events - Tables & Chairs",
  "Events - DJ / Lighting",
  "Events - Catering",
  "Events - Decor",
  "Events - 360 Photo Booth",
  "Professional Services",
  "Other"
];

const ContactFormSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formVariant = searchParams.get('form') === 'full' ? 'full' : 'short';

  const [formData, setFormData] = useState({
    nombre: '', empresa: '', rubro: '', whatsapp: '', correo: '', ciudad: '', mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRubroChange = (value: string) => {
    setFormData({ ...formData, rubro: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.whatsapp) {
      toast({ title: "Error", description: "Name and WhatsApp are required", variant: "destructive" });
      return;
    }
    if (formVariant === 'full' && (!formData.empresa || !formData.rubro || !formData.correo || !formData.ciudad)) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const phoneRegex = /^[\d\s+()-]{8,20}$/;
    if (!phoneRegex.test(formData.whatsapp)) {
      toast({ title: "Error", description: "Enter a valid WhatsApp number (e.g. +1 305 123 4567)", variant: "destructive" });
      return;
    }
    if (formData.correo) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.correo)) {
        toast({ title: "Error", description: "Please enter a valid email", variant: "destructive" });
        return;
      }
    }

    setIsLoading(true);
    try {
      const insertData = {
        nombre: formData.nombre,
        whatsapp: formData.whatsapp,
        correo: formData.correo || `${Date.now()}@form.viralclicker.com`,
        empresa: formData.empresa || 'N/A',
        rubro: formData.rubro || 'N/A',
        ciudad: formData.ciudad || 'N/A',
        mensaje: formData.mensaje || null,
      };
      const { error } = await supabase.from('leads').insert([insertData]);
      if (error) throw error;
      navigate('/gracias');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({ title: "Error", description: "There was a problem submitting the form. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" id="demo">
                Talk to us
              </h2>
              <p className="text-white/70">
                Tell us about your business and we'll show you how ViralClicker can help
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Name *</label>
                  <Input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Your name" className="bg-gray-800 border-gray-700 text-white" required />
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-1 block">WhatsApp *</label>
                  <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+1 305 123 4567" className="bg-gray-800 border-gray-700 text-white" required />
                </div>
              </div>

              {formVariant === 'short' && (
                <>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Industry</label>
                    <Select onValueChange={handleRubroChange} value={formData.rubro}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {rubros.map((rubro) => (
                          <SelectItem key={rubro} value={rubro} className="text-white hover:bg-gray-700">{rubro}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Email (optional)</label>
                    <Input name="correo" type="email" value={formData.correo} onChange={handleChange} placeholder="you@email.com" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                </>
              )}

              {formVariant === 'full' && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/80 text-sm mb-1 block">Company *</label>
                      <Input name="empresa" value={formData.empresa} onChange={handleChange} placeholder="Your company name" className="bg-gray-800 border-gray-700 text-white" required />
                    </div>
                    <div>
                      <label className="text-white/80 text-sm mb-1 block">Email *</label>
                      <Input name="correo" type="email" value={formData.correo} onChange={handleChange} placeholder="you@email.com" className="bg-gray-800 border-gray-700 text-white" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Industry *</label>
                    <Select onValueChange={handleRubroChange} value={formData.rubro}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white"><SelectValue placeholder="Select your industry" /></SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {rubros.map((rubro) => (<SelectItem key={rubro} value={rubro} className="text-white hover:bg-gray-700">{rubro}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">City *</label>
                    <Input name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Your city" className="bg-gray-800 border-gray-700 text-white" required />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Message (optional)</label>
                    <Textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Tell us more about your business..." className="bg-gray-800 border-gray-700 text-white min-h-[100px]" />
                  </div>
                </>
              )}

              <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6 shadow-glow" data-cta="whatsapp">
                {isLoading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending...</>) : (<><MessageCircle className="w-5 h-5 mr-2" />Talk on WhatsApp</>)}
              </Button>

              <p className="text-white/40 text-xs text-center mt-4">
                By submitting this form you agree to be contacted. We don't share your information with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
