import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Calendar, Shield, Headphones, Zap } from 'lucide-react';

const TransformBusinessSection = () => {
  const metrics = [
    {
      icon: Clock,
      value: '24/7',
      label: 'Automatización continua'
    },
    {
      icon: TrendingUp,
      value: '300%',
      label: 'Aumento promedio en leads'
    },
    {
      icon: Calendar,
      value: '30 días',
      label: 'Para ver primeros resultados'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      text: 'Garantía de resultados'
    },
    {
      icon: Headphones,
      text: 'Soporte 24/7'
    },
    {
      icon: Zap,
      text: 'Sin permanencia'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section className="py-16 bg-viralDark border-t border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Transforma tu negocio </span>
            <span className="text-viralOrange">hoy mismo</span>
          </h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Únete a cientos de empresarios que ya están multiplicando sus ventas con nuestros sistemas automatizados
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className="w-20 h-20 bg-viralOrange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-10 h-10 text-viralOrange" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-viralOrange mb-2">
                {metric.value}
              </div>
              <p className="text-white/70 text-lg">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 bg-viralDark/30 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:border-viralOrange/50 transition-all duration-300"
              variants={itemVariants}
            >
              <benefit.icon className="w-5 h-5 text-viralOrange" />
              <span className="text-white font-medium">
                {benefit.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TransformBusinessSection;