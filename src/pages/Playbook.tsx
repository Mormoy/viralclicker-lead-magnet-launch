import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  CheckSquare, 
  Map, 
  Clock,
  Workflow,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';

const PlaybookClickCRM = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const ADMIN_PASSWORD = 'viralclicker102030+*+';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      toast({
        title: "Acceso autorizado",
        description: "Bienvenido al Playbook ClickCRM",
      });
    } else {
      toast({
        title: "Acceso denegado",
        description: "Contraseña incorrecta",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-viralDark flex flex-col">
        <header className="p-4 bg-viralDark border-b border-gray-800">
          <div className="container mx-auto flex justify-center items-center">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-viralOrange font-bold text-xl">Playbook ClickCRM</span>
            </div>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 text-viralOrange mx-auto mb-2" />
              <CardTitle className="text-2xl font-bold text-white">
                Playbook ClickCRM
              </CardTitle>
              <CardDescription className="text-gray-300">
                Acceso restringido para administradores
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
                  Acceder al Playbook
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
      <header className="p-4 bg-viralDark border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-viralOrange font-bold text-xl">Playbook ClickCRM</span>
          </div>
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
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Manual de Implementación</h1>
          <p className="text-white/60">Guía completa para onboarding y configuración de ClickCRM</p>
        </div>

        <Tabs defaultValue="journey" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700 flex-wrap h-auto gap-1">
            <TabsTrigger value="journey" className="data-[state=active]:bg-viralOrange">
              <Map className="w-4 h-4 mr-2" />
              Customer Journey
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="data-[state=active]:bg-viralOrange">
              <CheckSquare className="w-4 h-4 mr-2" />
              Onboarding
            </TabsTrigger>
            <TabsTrigger value="tiempos" className="data-[state=active]:bg-viralOrange">
              <Clock className="w-4 h-4 mr-2" />
              Tiempos
            </TabsTrigger>
            <TabsTrigger value="flujos" className="data-[state=active]:bg-viralOrange">
              <Workflow className="w-4 h-4 mr-2" />
              Flujos
            </TabsTrigger>
            <TabsTrigger value="plantillas" className="data-[state=active]:bg-viralOrange">
              <MessageSquare className="w-4 h-4 mr-2" />
              Plantillas WhatsApp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journey">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Map className="w-5 h-5 text-viralOrange" />
                  Customer Journey
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Pasos del recorrido del cliente desde que llega hasta que compra
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { step: 1, title: "Descubrimiento", description: "Cliente encuentra la landing por ads, SEO o referidos", editable: "¿Cómo llegan tus clientes? Anota tus canales principales." },
                    { step: 2, title: "Interés", description: "Completa formulario o hace clic en WhatsApp", editable: "¿Qué información pides? ¿Hay algún lead magnet?" },
                    { step: 3, title: "Evaluación", description: "Recibe cotización y compara opciones", editable: "¿Cuánto demoras en enviar cotización? ¿Envías catálogo?" },
                    { step: 4, title: "Decisión", description: "Hace preguntas, pide ajustes, negocia", editable: "¿Cuáles son las objeciones más comunes?" },
                    { step: 5, title: "Compra", description: "Confirma y realiza el pago/acuerdo", editable: "¿Cuál es el proceso de cierre? ¿Anticipo?" },
                    { step: 6, title: "Post-venta", description: "Instalación, entrega, seguimiento", editable: "¿Hay garantía? ¿Pides referidos?" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="w-10 h-10 bg-viralOrange/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-viralOrange font-bold">{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{item.title}</h4>
                        <p className="text-white/60 text-sm mb-2">{item.description}</p>
                        <div className="bg-gray-700/30 p-3 rounded border border-dashed border-gray-600">
                          <p className="text-viralOrange/80 text-xs italic">📝 {item.editable}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="onboarding">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-viralOrange" />
                  Onboarding Checklist
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Lista de tareas para implementar ClickCRM con un nuevo cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h4 className="text-white font-semibold mb-3">📋 Información a recopilar</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-center gap-2">☐ Logo y colores de marca</li>
                      <li className="flex items-center gap-2">☐ Lista de productos/servicios con precios</li>
                      <li className="flex items-center gap-2">☐ Información de contacto (teléfono, email, dirección)</li>
                      <li className="flex items-center gap-2">☐ Redes sociales</li>
                      <li className="flex items-center gap-2">☐ Testimonios o casos de éxito</li>
                      <li className="flex items-center gap-2">☐ Fotos de trabajos realizados</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h4 className="text-white font-semibold mb-3">🔧 Configuración técnica</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-center gap-2">☐ Crear proyecto en plataforma</li>
                      <li className="flex items-center gap-2">☐ Configurar dominio/subdominio</li>
                      <li className="flex items-center gap-2">☐ Diseñar landing page</li>
                      <li className="flex items-center gap-2">☐ Configurar formulario de contacto</li>
                      <li className="flex items-center gap-2">☐ Configurar cotizador (Pro/Elite)</li>
                      <li className="flex items-center gap-2">☐ Configurar CRM con estados</li>
                      <li className="flex items-center gap-2">☐ Configurar Twilio/WhatsApp (si aplica)</li>
                      <li className="flex items-center gap-2">☐ Configurar automatizaciones n8n (Pro/Elite)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h4 className="text-white font-semibold mb-3">🎓 Capacitación</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-center gap-2">☐ Demo del sistema completo</li>
                      <li className="flex items-center gap-2">☐ Uso del CRM y estados</li>
                      <li className="flex items-center gap-2">☐ Cómo crear cotizaciones</li>
                      <li className="flex items-center gap-2">☐ Plantillas de WhatsApp</li>
                      <li className="flex items-center gap-2">☐ Lectura de reportes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tiempos">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-viralOrange" />
                  Tiempos Estimados
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Cronograma típico de implementación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { day: "Día 0", title: "Kick-off", tasks: ["Reunión inicial", "Recopilación de información", "Definición de alcance"] },
                    { day: "Día 1-2", title: "Diseño", tasks: ["Diseño de landing", "Configuración de formularios", "Revisión con cliente"] },
                    { day: "Día 3-4", title: "Desarrollo", tasks: ["Implementación del CRM", "Configuración de cotizador", "Pruebas internas"] },
                    { day: "Día 5-7", title: "Integraciones", tasks: ["WhatsApp/Twilio", "Automatizaciones n8n", "Pruebas de flujo completo"] },
                    { day: "Día 7-10", title: "Lanzamiento", tasks: ["Capacitación al equipo", "Go-live", "Monitoreo inicial"] },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="w-24 flex-shrink-0">
                        <span className="text-viralOrange font-bold text-sm">{item.day}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                        <ul className="text-white/60 text-sm space-y-1">
                          {item.tasks.map((task, idx) => (
                            <li key={idx}>• {task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flujos">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-viralOrange" />
                  Flujos de Trabajo
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Procesos automatizados y manuales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h4 className="text-white font-semibold mb-3">🎯 Flujo: Lead → Cotización → Cierre</h4>
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded">Lead entra</span>
                      <span className="text-white/40">→</span>
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded">Notificación</span>
                      <span className="text-white/40">→</span>
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded">Contacto inicial</span>
                      <span className="text-white/40">→</span>
                      <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded">Cotización</span>
                      <span className="text-white/40">→</span>
                      <span className="bg-viralOrange/20 text-viralOrange px-3 py-1 rounded">Seguimiento</span>
                      <span className="text-white/40">→</span>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded">Cierre</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h4 className="text-white font-semibold mb-3">⚡ Automatizaciones disponibles</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-viralOrange">•</span>
                        <span><strong className="text-white">Notificación de nuevo lead:</strong> Email/WhatsApp al vendedor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-viralOrange">•</span>
                        <span><strong className="text-white">Seguimiento automático:</strong> Recordatorio a las 24/48/72 horas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-viralOrange">•</span>
                        <span><strong className="text-white">Cotización sin respuesta:</strong> Reenvío con mensaje personalizado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-viralOrange">•</span>
                        <span><strong className="text-white">Post-cierre:</strong> Solicitud de reseña/referidos</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plantillas">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-viralOrange" />
                  Plantillas WhatsApp
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Mensajes predefinidos para cada etapa del proceso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">📥 Primer contacto</h4>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Starter</span>
                    </div>
                    <div className="bg-gray-900 p-3 rounded text-white/80 text-sm font-mono">
                      Hola {"{{nombre}}"} 👋<br/><br/>
                      Gracias por contactarnos. Soy {"{{vendedor}}"} de {"{{empresa}}"}.<br/><br/>
                      Vi que te interesa {"{{producto/servicio}}"}. ¿Me puedes contar un poco más sobre lo que necesitas?
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">📄 Envío de cotización</h4>
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Pro</span>
                    </div>
                    <div className="bg-gray-900 p-3 rounded text-white/80 text-sm font-mono">
                      Hola {"{{nombre}}"} 👋<br/><br/>
                      Te envío la cotización #{"{{codigo}}"} que conversamos.<br/><br/>
                      📋 Resumen:<br/>
                      {"{{detalle_cotizacion}}"}<br/><br/>
                      💰 Total: {"{{total}}"}<br/>
                      ✅ Válida hasta: {"{{fecha_validez}}"}<br/><br/>
                      ¿Tienes alguna duda?
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">🔔 Seguimiento</h4>
                      <span className="text-xs bg-viralOrange/20 text-viralOrange px-2 py-1 rounded">Elite</span>
                    </div>
                    <div className="bg-gray-900 p-3 rounded text-white/80 text-sm font-mono">
                      Hola {"{{nombre}}"} 👋<br/><br/>
                      Paso a saludarte. Hace {"{{dias}}"} días te envié la cotización #{"{{codigo}}"}.<br/><br/>
                      ¿Pudiste revisarla? ¿Necesitas algún ajuste?<br/><br/>
                      Quedo atento 🙌
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PlaybookClickCRM;
