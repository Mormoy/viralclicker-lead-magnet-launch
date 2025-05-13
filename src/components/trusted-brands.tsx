import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const TrustedBrands = () => {
  const brandLogos = ['/brand-1.svg', '/brand-2.svg', '/brand-3.svg', '/brand-4.svg', '/brand-5.svg'];

  // Use placeholder images for brands
  const placeholderImages = ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=80&q=80', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&h=80&q=80', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&h=80&q=80', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=200&h=80&q=80', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&h=80&q=80'];
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
  return <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Marcas que confían en nosotros
        </h2>
        
        <motion.div className="flex flex-wrap justify-center items-center gap-8 md:gap-16" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.8
      }}>
          {placeholderImages.map((image, index) => <motion.div key={index} className="h-12 flex items-center grayscale hover:grayscale-0 transition-all duration-300" variants={itemVariants}>
              <img src={image} alt={`Brand logo ${index + 1}`} className="h-full object-contain" />
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};
export default TrustedBrands;