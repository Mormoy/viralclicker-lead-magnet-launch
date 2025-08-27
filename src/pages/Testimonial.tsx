import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, CheckCircle, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';

const TestimonialSubmission = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    rating: 5,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([formData]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "¡Testimonio enviado!",
        description: "Gracias por tu reseña. La revisaremos pronto y la publicaremos.",
      });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu testimonio. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-viralDark flex flex-col">
        <header className="p-4 bg-viralDark border-b border-gray-800">
          <div className="container mx-auto flex justify-center items-center">
            <Logo />
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-900 border-gray-800">
            <CardContent className="text-center p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">¡Gracias!</h2>
              <p className="text-gray-300 mb-6">
                Tu testimonio ha sido enviado exitosamente. Lo revisaremos y lo publicaremos pronto.
              </p>
              <p className="text-sm text-gray-400">
                Puedes cerrar esta ventana.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-viralDark flex flex-col">
      <header className="p-4 bg-viralDark border-b border-gray-800">
        <div className="container mx-auto flex justify-center items-center">
          <Logo />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Comparte tu experiencia
            </CardTitle>
            <CardDescription className="text-gray-300">
              Tu opinión es muy valiosa para nosotros y ayuda a otros clientes
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nombre completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Tu empresa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-white">Cargo</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Tu cargo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Calificación *</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'fill-viralOrange text-viralOrange'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">Tu testimonio *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Cuéntanos sobre tu experiencia con ViralClicker..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white font-semibold py-3"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar testimonio'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TestimonialSubmission;