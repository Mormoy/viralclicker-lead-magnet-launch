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
import { Calendar, Loader2 } from 'lucide-react';

const rubros = [
  "Cortinas / Persianas / Toldos",
  "Ventanas / Aluminio / Vidrios",
  "Portones / Cámaras de seguridad",
  "Aire acondicionado / Climatización",
  "Muebles a medida",
  "Eventos - Carpas / Toldos",
  "Eventos - Sillas / Mesas",
  "Eventos - DJ / Iluminación",
  "Eventos - Banquetería / Catering",
  "Eventos - Decoración",
  "Eventos - Cabinas 360 / Fotomatón",
  "Servicios profesionales",
  "Otro"
];

const ContactFormSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // A/B form variant: ?form=full shows full form, else short form
  const formVariant = searchParams.get('form') === 'full' ? 'full' : 'short';

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    rubro: '',
    whatsapp: '',
    correo: '',
    ciudad: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRubroChange = (value: string) => {
    setFormData({ ...formData, rubro: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nombre || !formData.whatsapp) {
      toast({ title: "Error", description: "Nombre y WhatsApp son obligatorios", variant: "destructive" });
      return;
    }

    if (formVariant === 'full' && (!formData.empresa || !formData.rubro || !formData.correo || !formData.ciudad)) {
      toast({ title: "Error", description: "Por favor completa todos los campos obligatorios", variant: "destructive" });
      return;
    }

    // WhatsApp validation
    const phoneRegex = /^[\d\s+()-]{8,20}$/;
    if (!phoneRegex.test(formData.whatsapp)) {
      toast({ title: "Error", description: "Ingresa un número de WhatsApp válido (ej: +56 9 1234 5678)", variant: "destructive" });
      return;
    }

    if (formData.correo) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.correo)) {
        toast({ title: "Error", description: "Por favor ingresa un correo válido", variant: "destructive" });
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
      toast({ title: "Error", description: "Hubo un problema al enviar el formulario. Intenta nuevamente.", variant: "destructive" });
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
                Agendar demo (15 min)
              </h2>
              <p className="text-white/70">
                Cuéntanos sobre tu negocio y te mostramos cómo ViralClicker puede ayudarte
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Always shown: Nombre + WhatsApp */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Nombre *</label>
                  <Input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-1 block">WhatsApp *</label>
                  <Input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              {/* Short form: Rubro dropdown + optional email */}
              {formVariant === 'short' && (
                <>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Rubro</label>
                    <Select onValueChange={handleRubroChange} value={formData.rubro}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecciona tu rubro" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {rubros.map((rubro) => (
                          <SelectItem key={rubro} value={rubro} className="text-white hover:bg-gray-700">
                            {rubro}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Email (opcional)</label>
                    <Input
                      name="correo"
                      type="email"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </>
              )}

              {/* Full form: all fields */}
              {formVariant === 'full' && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/80 text-sm mb-1 block">Empresa *</label>
                      <Input
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/80 text-sm mb-1 block">Correo *</label>
                      <Input
                        name="correo"
                        type="email"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Rubro *</label>
                    <Select onValueChange={handleRubroChange} value={formData.rubro}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecciona tu rubro" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {rubros.map((rubro) => (
                          <SelectItem key={rubro} value={rubro} className="text-white hover:bg-gray-700">
                            {rubro}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Ciudad *</label>
                    <Input
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      placeholder="Tu ciudad"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Mensaje (opcional)</label>
                    <Textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos más sobre tu negocio..."
                      className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                    />
                  </div>
                </>
              )}

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-bold text-lg py-6 shadow-glow"
                data-cta="book-demo"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar demo
                  </>
                )}
              </Button>

              <p className="text-white/40 text-xs text-center mt-4">
                Al enviar este formulario aceptas que te contactemos para agendar una demo.
                No compartimos tu información con terceros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
