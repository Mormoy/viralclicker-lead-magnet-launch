
import React from 'react';
import Logo from './logo';

type LeadFormHeaderProps = {
  onClose: () => void;
};

const LeadFormHeader = ({ onClose }: LeadFormHeaderProps) => {
  return (
    <>
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white"
      >
        ✕
      </button>
      
      <div className="flex justify-center mb-6">
        <Logo className="scale-110" />
      </div>
      
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Gracias por enviar tus datos a ViralClicker
      </h2>
    </>
  );
};

export default LeadFormHeader;
