import { motion } from 'framer-motion';
const TrustedBrands = () => {
  // Imágenes de prueba estables y confiables
  const brandImages = ['https://placehold.co/200x80/333/FFF/svg?text=BRAND+1', 'https://placehold.co/200x80/333/FFF/svg?text=BRAND+2', 'https://placehold.co/200x80/333/FFF/svg?text=BRAND+3', 'https://placehold.co/200x80/333/FFF/svg?text=BRAND+4', 'https://placehold.co/200x80/333/FFF/svg?text=BRAND+5'];
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
  return <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <motion.h2 className="text-3xl font-bold text-center mb-12 text-white relative" initial={{
        opacity: 0,
        y: -20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }} viewport={{
        once: true
      }}>
          <span className="relative inline-block">
            Marcas que confían en nosotros
            <motion.span className="absolute -bottom-2 left-0 w-full h-1 bg-viralOrange" initial={{
            width: 0
          }} whileInView={{
            width: '100%'
          }} transition={{
            duration: 1,
            delay: 0.5
          }} viewport={{
            once: true
          }}></motion.span>
          </span>
        </motion.h2>
        
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-16 items-center justify-items-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.3
      }}>
          {brandImages.map((image, index) => <motion.div key={index} className="h-16 md:h-20 w-32 md:w-40 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-viralOrange/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]" variants={itemVariants} whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 20px rgba(249, 115, 22, 0.6)"
        }}>
              <img src={image} alt={`Brand logo ${index + 1}`} className="h-full object-contain transition-all duration-300" />
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};
export default TrustedBrands;