
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TrustedBrands = () => {
  const brandLogos = ['/brand-1.svg', '/brand-2.svg', '/brand-3.svg', '/brand-4.svg', '/brand-5.svg'];

  // Use placeholder images for brands
  const placeholderImages = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=80&q=80', 
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&h=80&q=80', 
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&h=80&q=80', 
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=200&h=80&q=80', 
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&h=80&q=80'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with random images
    setCurrentImageIndex(brandLogos.map(() => Math.floor(Math.random() * placeholderImages.length)));
  }, []);

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="bg-gray-800 py-16 text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-white relative"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="relative inline-block">
            Marcas que confían en nosotros
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-viralOrange"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.span>
          </span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-16 items-center justify-items-center"
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3
          }}
        >
          {placeholderImages.map((image, index) => (
            <motion.div 
              key={index} 
              className="h-16 md:h-20 w-32 md:w-40 flex items-center justify-center bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-viralOrange/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]" 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(249, 115, 22, 0.6)" 
              }}
            >
              <img 
                src={image} 
                alt={`Brand logo ${index + 1}`} 
                className="h-full object-contain filter brightness-0 invert hover:brightness-100 hover:invert-0 transition-all duration-300" 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBrands;
