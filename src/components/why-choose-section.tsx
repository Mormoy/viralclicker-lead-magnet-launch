import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp, Users } from 'lucide-react';

const WhyChooseSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Automatización Total',
      description: 'Sistemas que trabajan 24/7 sin intervención manual'
    },
    {
      icon: Target,
      title: 'Leads Cualificados',
      description: 'Generación de leads listos para comprar'
    },
    {
      icon: TrendingUp,
      title: 'Escalabilidad',
      description: 'Crece sin límites con sistemas que se adaptan'
    },
    {
      icon: Users,
      title: 'Acompañamiento',
      description: 'Soporte personalizado en cada paso del proceso'
    }
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
    <section className="py-16 bg-viralDark">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Por qué elegir </span>
            <span className="text-viralOrange">Viral Clicker</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Transformamos tu negocio con tecnología de vanguardia y estrategias probadas
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-viralDark/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center hover:border-viralOrange/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-viralOrange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-viralOrange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;