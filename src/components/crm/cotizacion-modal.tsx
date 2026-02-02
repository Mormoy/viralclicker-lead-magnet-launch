import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  MessageSquare,
  FileText,
  X
} from 'lucide-react';
import type { Cotizacion, PlantillaWhatsApp } from './types';
import { 
  PIPELINE_ESTADOS, 
  FUENTES, 
  PRIORIDADES, 
  TAGS_PRODUCTO, 
  TAGS_AMBIENTE 
} from './types';

interface CotizacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Cotizacion>) => void;
  cotizacion?: Cotizacion;
  plantillas: PlantillaWhatsApp[];
}

export const CotizacionModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  cotizacion,
  plantillas 
}: CotizacionModalProps) => {
  const [formData, setFormData] = useState<Partial<Cotizacion>>({
    nombre: '',
    empresa: '',
    whatsapp: '',
    correo: '',
    ciudad: '',
    direccion: '',
    estado: 'nuevo',
    fuente: 'manual',
    prioridad: 'media',
    valor_estimado: 0,
    valor_final: 0,
    tags: [],
    campana: '',
    adset: '',
    notas_internas: '',
    accion_recomendada: '',
    proximo_seguimiento: '',
    fecha_visita: '',
    direccion_visita: '',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (cotizacion) {
      setFormData({
        ...cotizacion,
        proximo_seguimiento: cotizacion.proximo_seguimiento?.slice(0, 16) || '',
        fecha_visita: cotizacion.fecha_visita?.slice(0, 16) || '',
      });
      setSelectedTags(cotizacion.tags || []);
    } else {
      setFormData({
        nombre: '',
        empresa: '',
        whatsapp: '',
        correo: '',
        ciudad: '',
        direccion: '',
        estado: 'nuevo',
        fuente: 'manual',
        prioridad: 'media',
        valor_estimado: 0,
        valor_final: 0,
        tags: [],
        campana: '',
        adset: '',
        notas_internas: '',
        accion_recomendada: '',
        proximo_seguimiento: '',
        fecha_visita: '',
        direccion_visita: '',
      });
      setSelectedTags([]);
    }
  }, [cotizacion, isOpen]);

  const handleChange = (field: keyof Cotizacion, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!formData.nombre || !formData.whatsapp) {
      return;
    }

    onSave({
      ...formData,
      tags: selectedTags,
      proximo_seguimiento: formData.proximo_seguimiento ? new Date(formData.proximo_seguimiento).toISOString() : null,
      fecha_visita: formData.fecha_visita ? new Date(formData.fecha_visita).toISOString() : null,
    });
  };

  const handleWhatsAppClick = (plantilla?: PlantillaWhatsApp) => {
    let message = '';
    if (plantilla) {
      message = plantilla.contenido
        .replace('{{nombre}}', formData.nombre || '')
        .replace('{{valor_estimado}}', formData.valor_estimado?.toString() || '')
        .replace('{{valor_final}}', formData.valor_final?.toString() || '');
    }
    const phone = (formData.whatsapp || '').replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-viralOrange flex items-center gap-2">
            {cotizacion ? 'Editar Cotización' : 'Nueva Cotización'}
            {cotizacion && (
              <Badge className={PIPELINE_ESTADOS.find(e => e.value === cotizacion.estado)?.bgColor}>
                {PIPELINE_ESTADOS.find(e => e.value === cotizacion.estado)?.label}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="contacto" className="w-full">
            <TabsList className="bg-gray-800 w-full justify-start mb-4">
              <TabsTrigger value="contacto" className="data-[state=active]:bg-viralOrange">
                <User className="w-4 h-4 mr-2" />
                Contacto
              </TabsTrigger>
              <TabsTrigger value="pipeline" className="data-[state=active]:bg-viralOrange">
                <Tag className="w-4 h-4 mr-2" />
                Pipeline
              </TabsTrigger>
              <TabsTrigger value="seguimiento" className="data-[state=active]:bg-viralOrange">
                <Calendar className="w-4 h-4 mr-2" />
                Seguimiento
              </TabsTrigger>
              <TabsTrigger value="notas" className="data-[state=active]:bg-viralOrange">
                <FileText className="w-4 h-4 mr-2" />
                Notas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contacto" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <User className="w-4 h-4" /> Nombre *
                  </Label>
                  <Input
                    value={formData.nombre || ''}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    placeholder="Nombre completo"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Empresa
                  </Label>
                  <Input
                    value={formData.empresa || ''}
                    onChange={(e) => handleChange('empresa', e.target.value)}
                    placeholder="Nombre de empresa"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> WhatsApp *
                  </Label>
                  <Input
                    value={formData.whatsapp || ''}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    placeholder="+56 9 1234 5678"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Correo
                  </Label>
                  <Input
                    value={formData.correo || ''}
                    onChange={(e) => handleChange('correo', e.target.value)}
                    placeholder="email@ejemplo.com"
                    type="email"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Ciudad
                  </Label>
                  <Input
                    value={formData.ciudad || ''}
                    onChange={(e) => handleChange('ciudad', e.target.value)}
                    placeholder="Santiago"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Dirección
                  </Label>
                  <Input
                    value={formData.direccion || ''}
                    onChange={(e) => handleChange('direccion', e.target.value)}
                    placeholder="Av. Principal 123"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* WhatsApp Quick Actions */}
              {cotizacion && plantillas.length > 0 && (
                <div className="pt-4 border-t border-gray-800">
                  <Label className="text-white/70 mb-2 block">Plantillas WhatsApp</Label>
                  <div className="flex flex-wrap gap-2">
                    {plantillas.map(plantilla => (
                      <Button
                        key={plantilla.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleWhatsAppClick(plantilla)}
                        className="border-green-500/30 text-green-400 hover:bg-green-500/20"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {plantilla.nombre}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pipeline" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70">Estado</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => handleChange('estado', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {PIPELINE_ESTADOS.map(estado => (
                        <SelectItem key={estado.value} value={estado.value} className={estado.color}>
                          {estado.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Fuente</Label>
                  <Select
                    value={formData.fuente}
                    onValueChange={(value) => handleChange('fuente', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {FUENTES.map(fuente => (
                        <SelectItem key={fuente.value} value={fuente.value} className="text-white">
                          {fuente.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Prioridad</Label>
                  <Select
                    value={formData.prioridad}
                    onValueChange={(value) => handleChange('prioridad', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {PRIORIDADES.map(prioridad => (
                        <SelectItem key={prioridad.value} value={prioridad.value} className="text-white">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${prioridad.color}`} />
                            {prioridad.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70">Campaña</Label>
                  <Input
                    value={formData.campana || ''}
                    onChange={(e) => handleChange('campana', e.target.value)}
                    placeholder="Nombre de campaña"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">AdSet</Label>
                  <Input
                    value={formData.adset || ''}
                    onChange={(e) => handleChange('adset', e.target.value)}
                    placeholder="Nombre de adset"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Valor Estimado
                  </Label>
                  <Input
                    value={formData.valor_estimado || ''}
                    onChange={(e) => handleChange('valor_estimado', Number(e.target.value))}
                    placeholder="0"
                    type="number"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Valor Final
                  </Label>
                  <Input
                    value={formData.valor_final || ''}
                    onChange={(e) => handleChange('valor_final', Number(e.target.value))}
                    placeholder="0"
                    type="number"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-white/70">Tags Producto</Label>
                <div className="flex flex-wrap gap-2">
                  {TAGS_PRODUCTO.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        selectedTags.includes(tag) 
                          ? 'bg-viralOrange text-white' 
                          : 'border-gray-600 text-white/70 hover:bg-gray-800'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70">Tags Ambiente</Label>
                <div className="flex flex-wrap gap-2">
                  {TAGS_AMBIENTE.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        selectedTags.includes(tag) 
                          ? 'bg-purple-600 text-white' 
                          : 'border-gray-600 text-white/70 hover:bg-gray-800'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seguimiento" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Próximo Seguimiento
                  </Label>
                  <Input
                    value={formData.proximo_seguimiento || ''}
                    onChange={(e) => handleChange('proximo_seguimiento', e.target.value)}
                    type="datetime-local"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Fecha Visita
                  </Label>
                  <Input
                    value={formData.fecha_visita || ''}
                    onChange={(e) => handleChange('fecha_visita', e.target.value)}
                    type="datetime-local"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Dirección Visita
                </Label>
                <Input
                  value={formData.direccion_visita || ''}
                  onChange={(e) => handleChange('direccion_visita', e.target.value)}
                  placeholder="Dirección para la visita"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/70">Acción Recomendada</Label>
                <Select
                  value={formData.accion_recomendada || ''}
                  onValueChange={(value) => handleChange('accion_recomendada', value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Seleccionar acción" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="visita" className="text-white">Agendar Visita</SelectItem>
                    <SelectItem value="anticipo" className="text-white">Solicitar Anticipo</SelectItem>
                    <SelectItem value="cotizacion" className="text-white">Enviar Cotización</SelectItem>
                    <SelectItem value="seguimiento" className="text-white">Hacer Seguimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="notas" className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/70">Notas Internas</Label>
                <Textarea
                  value={formData.notas_internas || ''}
                  onChange={(e) => handleChange('notas_internas', e.target.value)}
                  placeholder="Notas privadas sobre esta cotización..."
                  className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
                />
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <Button variant="outline" onClick={onClose} className="border-gray-700 text-white">
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.nombre || !formData.whatsapp}
            className="bg-viralOrange hover:bg-viralOrange/90"
          >
            {cotizacion ? 'Guardar Cambios' : 'Crear Cotización'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
