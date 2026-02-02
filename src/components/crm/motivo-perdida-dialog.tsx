import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MOTIVOS_PERDIDA } from './types';

interface MotivoPerdidaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (motivo: string, texto?: string) => void;
}

export const MotivoPerdidaDialog = ({ isOpen, onClose, onConfirm }: MotivoPerdidaDialogProps) => {
  const [selectedMotivo, setSelectedMotivo] = useState<string>('');
  const [textoOtro, setTextoOtro] = useState('');

  const handleConfirm = () => {
    if (!selectedMotivo) return;
    onConfirm(selectedMotivo, selectedMotivo === 'otro' ? textoOtro : undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-red-400">Marcar como Perdido</DialogTitle>
          <DialogDescription className="text-white/60">
            Selecciona el motivo por el cual se perdió esta cotización.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={selectedMotivo} onValueChange={setSelectedMotivo}>
            {MOTIVOS_PERDIDA.map(motivo => (
              <div key={motivo.value} className="flex items-center space-x-2 py-2">
                <RadioGroupItem 
                  value={motivo.value} 
                  id={motivo.value}
                  className="border-white/30 text-viralOrange"
                />
                <Label htmlFor={motivo.value} className="text-white cursor-pointer">
                  {motivo.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selectedMotivo === 'otro' && (
            <Textarea
              value={textoOtro}
              onChange={(e) => setTextoOtro(e.target.value)}
              placeholder="Describe el motivo..."
              className="mt-4 bg-gray-800 border-gray-700 text-white"
            />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-700 text-white">
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedMotivo || (selectedMotivo === 'otro' && !textoOtro)}
            className="bg-red-600 hover:bg-red-700"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
