import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Check, X, Trash2, Eye, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Testimonial {
  id: string;
  name: string;
  email: string;
  company: string | null;
  position: string | null;
  rating: number;
  message: string;
  status: string;
  created_at: string;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const { toast } = useToast();

  const ADMIN_PASSWORD = 'viralclicker102030+*+';

  useEffect(() => {
    if (isAuthenticated) {
      fetchTestimonials();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      toast({
        title: "Acceso autorizado",
        description: "Bienvenido al panel de administración",
      });
    } else {
      toast({
        title: "Acceso denegado",
        description: "Contraseña incorrecta",
        variant: "destructive",
      });
    }
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los testimonios",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonialStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ 
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null,
          approved_by: 'admin'
        })
        .eq('id', id);

      if (error) throw error;

      setTestimonials(prev => 
        prev.map(t => t.id === id ? { ...t, status } : t)
      );

      toast({
        title: "Actualizado",
        description: `Testimonio ${status === 'approved' ? 'aprobado' : 'rechazado'}`,
      });
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el testimonio",
        variant: "destructive",
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTestimonials(prev => prev.filter(t => t.id !== id));
      toast({
        title: "Eliminado",
        description: "Testimonio eliminado exitosamente",
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el testimonio",
        variant: "destructive",
      });
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    filter === 'all' || t.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      default: return 'Pendiente';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-viralDark flex flex-col">
        <header className="p-4 bg-viralDark border-b border-gray-800">
          <div className="container mx-auto flex justify-center items-center">
            <Logo />
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Panel de Administración
              </CardTitle>
              <CardDescription className="text-gray-300">
                Ingresa la contraseña para acceder
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-viralOrange hover:bg-viralOrange/90 text-white"
                >
                  Ingresar
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-viralDark">
      <header className="p-4 bg-viralDark border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <h1 className="text-white text-xl font-semibold">Panel de Administración</h1>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status as any)}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                className={filter === status ? "bg-viralOrange hover:bg-viralOrange/90" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
              >
                {status === 'all' ? 'Todos' : 
                 status === 'pending' ? 'Pendientes' :
                 status === 'approved' ? 'Aprobados' : 'Rechazados'}
                <Badge variant="secondary" className="ml-2 bg-gray-700 text-white">
                  {status === 'all' ? testimonials.length : 
                   testimonials.filter(t => t.status === status).length}
                </Badge>
              </Button>
            ))}
          </div>

          <Button onClick={fetchTestimonials} disabled={loading} className="bg-viralOrange hover:bg-viralOrange/90">
            {loading ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-lg">
                      {testimonial.name}
                      {testimonial.company && (
                        <span className="text-gray-400 font-normal ml-2">
                          - {testimonial.company}
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {testimonial.email}
                      {testimonial.position && ` • ${testimonial.position}`}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(testimonial.status)} text-white`}>
                    {getStatusText(testimonial.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= testimonial.rating
                            ? 'fill-viralOrange text-viralOrange'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 ml-2">
                      ({testimonial.rating}/5)
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{testimonial.message}</p>
                  <p className="text-sm text-gray-500">
                    Enviado el {new Date(testimonial.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className="flex gap-2">
                  {testimonial.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => updateTestimonialStatus(testimonial.id, 'approved')}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        onClick={() => updateTestimonialStatus(testimonial.id, 'rejected')}
                        size="sm"
                        variant="destructive"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Rechazar
                      </Button>
                    </>
                  )}
                  
                  {testimonial.status === 'approved' && (
                    <Button
                      onClick={() => updateTestimonialStatus(testimonial.id, 'rejected')}
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Rechazar
                    </Button>
                  )}
                  
                  {testimonial.status === 'rejected' && (
                    <Button
                      onClick={() => updateTestimonialStatus(testimonial.id, 'approved')}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Aprobar
                    </Button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-900 border-gray-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                          ¿Eliminar testimonio?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          Esta acción no se puede deshacer. El testimonio será eliminado permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteTestimonial(testimonial.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTestimonials.length === 0 && !loading && (
          <Card className="bg-gray-900 border-gray-800 text-center p-8">
            <CardContent>
              <p className="text-gray-400 text-lg">
                No hay testimonios para mostrar
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;