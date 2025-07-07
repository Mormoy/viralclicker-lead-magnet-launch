import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

interface BookingSectionProps {
  isVisible: boolean;
  onBookingClick: () => void;
}

const BookingSection = ({ isVisible, onBookingClick }: BookingSectionProps) => {
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-2xl mx-auto text-center mt-16"
    >
      <div className="bg-viralDark/50 border-2 border-viralOrange/30 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ¿Desea profundizar en cómo podemos ayudarle?
        </motion.h2>
        
        <motion.p 
          className="text-white/80 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Reserve una videollamada con uno de nuestros especialistas para recibir una estrategia personalizada para su negocio.
        </motion.p>
        
        <motion.button
          onClick={onBookingClick}
          className="bg-viralOrange hover:bg-viralOrange/90 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center mx-auto gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="h-5 w-5" />
          <span>Reservar una videollamada</span>
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BookingSection;