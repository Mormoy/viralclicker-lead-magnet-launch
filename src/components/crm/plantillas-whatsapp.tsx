import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Pencil, 
  Trash2,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { PlantillaWhatsApp } from './types';
import { PIPELINE_ESTADOS } from './types';

interface PlantillasWhatsAppProps {
  plantillas: PlantillaWhatsApp[];
  onRefresh: () => void;
}

export const PlantillasWhatsApp = ({ plantillas, onRefresh }: PlantillasWhatsAppProps) => {
  const [showModal, setShowModal] = useState(false);
  const [editingPlantilla, setEditingPlantilla] = useState<PlantillaWhatsApp | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    estado_aplicable: 'nuevo' as PlantillaWhatsApp['estado_aplicable'],
    contenido: '',
  });
  const { toast } = useToast();

  const handleEdit = (plantilla: PlantillaWhatsApp) => {
    setEditingPlantilla(plantilla);
    setFormData({
      nombre: plantilla.nombre,
      estado_aplicable: plantilla.estado_aplicable,
      contenido: plantilla.contenido,
    });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingPlantilla(null);
    setFormData({
      nombre: '',
      estado_aplicable: 'nuevo',
      contenido: '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingPlantilla) {
        const { error } = await supabase
          .from('plantillas_whatsapp')
          .update(formData)
          .eq('id', editingPlantilla.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('plantillas_whatsapp')
          .insert({
            ...formData,
            variables: extractVariables(formData.contenido),
          });

        if (error) throw error;
      }

      toast({
        title: editingPlantilla ? 'Plantilla actualizada' : 'Plantilla creada',
        description: 'Los cambios han sido guardados',
      });

      setShowModal(false);
      onRefresh();
    } catch (error) {
      console.error('Error saving plantilla:', error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar la plantilla',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta plantilla?')) return;

    try {
      const { error } = await supabase
        .from('plantillas_whatsapp')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Plantilla eliminada',
      });

      onRefresh();
    } catch (error) {
      console.error('Error deleting plantilla:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la plantilla',
        variant: 'destructive',
      });
    }
  };

  const handleCopy = (contenido: string, id: string) => {
    navigator.clipboard.writeText(contenido);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{\{(\w+)\}\}/g) || [];
    return matches.map(m => m.replace(/\{\{|\}\}/g, ''));
  };

  // Group by estado
  const groupedPlantillas = PIPELINE_ESTADOS.reduce((acc, estado) => {
    acc[estado.value] = plantillas.filter(p => p.estado_aplicable === estado.value);
    return acc;
  }, {} as Record<string, PlantillaWhatsApp[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Plantillas WhatsApp</h2>
        <Button onClick={handleNew} className="bg-viralOrange hover:bg-viralOrange/90">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Plantilla
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PIPELINE_ESTADOS.filter(e => groupedPlantillas[e.value]?.length > 0).map(estado => (
          <div key={estado.value} className="space-y-3">
            <h3 className={`text-sm font-medium ${estado.color} flex items-center gap-2`}>
              <MessageSquare className="w-4 h-4" />
              {estado.label}
            </h3>
            {groupedPlantillas[estado.value].map(plantilla => (
              <Card key={plantilla.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-white">{plantilla.nombre}</p>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-white/60 hover:text-white"
                        onClick={() => handleCopy(plantilla.contenido, plantilla.id)}
                      >
                        {copiedId === plantilla.id ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-white/60 hover:text-white"
                        onClick={() => handleEdit(plantilla)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(plantilla.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm line-clamp-3 whitespace-pre-wrap">
                    {plantilla.contenido}
                  </p>
                  {plantilla.variables.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {plantilla.variables.map(v => (
                        <Badge key={v} variant="outline" className="text-xs text-viralOrange border-viralOrange/30">
                          {`{{${v}}}`}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>

      {plantillas.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-white/20 mb-4" />
            <p className="text-white/60">No hay plantillas configuradas</p>
            <Button onClick={handleNew} className="mt-4 bg-viralOrange">
              Crear primera plantilla
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-viralOrange">
              {editingPlantilla ? 'Editar Plantilla' : 'Nueva Plantilla'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/70">Nombre</Label>
              <Input
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Ej: Primer contacto"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/70">Estado aplicable</Label>
              <Select
                value={formData.estado_aplicable}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  estado_aplicable: value as PlantillaWhatsApp['estado_aplicable'] 
                }))}
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
              <Label className="text-white/70">Contenido del mensaje</Label>
              <Textarea
                value={formData.contenido}
                onChange={(e) => setFormData(prev => ({ ...prev, contenido: e.target.value }))}
                placeholder="Hola {{nombre}}, ..."
                className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
              />
              <p className="text-white/40 text-xs">
                Variables disponibles: {`{{nombre}}, {{empresa}}, {{valor_estimado}}, {{valor_final}}, {{fecha_visita}}, {{direccion_visita}}, {{monto_anticipo}}`}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)} className="border-gray-700 text-white">
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formData.nombre || !formData.contenido}
              className="bg-viralOrange hover:bg-viralOrange/90"
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
