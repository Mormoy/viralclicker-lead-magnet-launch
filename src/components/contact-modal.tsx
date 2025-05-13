
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-viralDark border border-viralOrange/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-white">
            Solicitud Recibida
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center">
          <p className="mb-4">Nuestro equipo se pondrá en contacto con usted.</p>
          <button
            onClick={onClose}
            className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-2 px-4 rounded-full"
          >
            Cerrar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
