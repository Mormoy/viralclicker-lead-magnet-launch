
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const TrustedBrands = () => {
  // Array de marcas con sus respectivas URLs e información
  const brands = [
    { id: 1, name: "Google", image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=100&fit=crop&auto=format" },
    { id: 2, name: "Microsoft", image: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=200&h=100&fit=crop&auto=format" },
    { id: 3, name: "Apple", image: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=200&h=100&fit=crop&auto=format" },
    { id: 4, name: "Amazon", image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=100&fit=crop&auto=format" },
    { id: 5, name: "Meta", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=200&h=100&fit=crop&auto=format" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-12 bg-viralDark border-t border-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          <span className="text-white">Marcas que </span>
          <span className="text-viralOrange">confían</span>
          <span className="text-white"> en nosotros</span>
        </h2>
        
        <div className="hidden md:block">
          <motion.div 
            className="grid grid-cols-5 gap-8 items-center justify-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {brands.map((brand) => (
              <motion.div
                key={brand.id}
                className="bg-viralDark/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 w-full h-32 flex items-center justify-center transition-all duration-300 hover:border-viralOrange/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] group"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Carousel para móviles */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {brands.map((brand) => (
                <CarouselItem key={brand.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-viralDark/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 h-32 flex items-center justify-center transition-all duration-300 hover:border-viralOrange/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] group">
                    <img 
                      src={brand.image} 
                      alt={brand.name} 
                      className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-viralDark border-viralOrange/50 text-white" />
            <CarouselNext className="right-1 bg-viralDark border-viralOrange/50 text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
