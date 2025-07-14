
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

type TestimonialProps = {
  name: string;
  position: string;
  quote: string;
  imageSrc: string;
  rating: number;
};

const testimonials: TestimonialProps[] = [
  {
    name: "María González",
    position: "CEO de MarketingPro",
    quote: "Gracias a ViralClicker hemos aumentado nuestras conversiones en un 150% en solo 3 meses. El equipo fue excepcional desde el primer día.",
    imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 5
  },
  {
    name: "Carlos Mendez",
    position: "Director de Ventas en TechSoluciones",
    quote: "La calidad de los leads generados superó nuestras expectativas. Definitivamente volveremos a trabajar con ellos. Su enfoque estratégico marcó la diferencia.",
    imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 5
  },
  {
    name: "Ana Rodríguez",
    position: "Fundadora de eCommerce Plus",
    quote: "El retorno de inversión fue inmediato. En menos de un mes recuperamos lo invertido y seguimos creciendo. La mejor inversión para nuestro negocio.",
    imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 5
  },
  {
    name: "Roberto Jiménez",
    position: "Director de Marketing Digital",
    quote: "ViralClicker transformó nuestra estrategia digital por completo. Los resultados fueron inmediatos y el equipo de soporte es excepcional.",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 5
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 3);

  const handlePrev = () => {
    setActiveIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => Math.min(testimonials.length - 3, prev + 1));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-viralDark/30 to-viralDark/70">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lo que nuestros clientes dicen
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Historias reales de negocios que han potenciado sus resultados con nuestra ayuda
            </p>
          </motion.div>
          
          {/* Desktop Version */}
          <div className="hidden md:block">
            <div className="relative">
              {testimonials.length > 3 && (
                <>
                  <button 
                    onClick={handlePrev} 
                    disabled={activeIndex === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-viralDark/80 border border-viralOrange/20 p-3 rounded-full text-white disabled:opacity-30 disabled:cursor-not-allowed z-10 hover:bg-viralOrange/20 transition-colors"
                    aria-label="Testimonios anteriores"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={handleNext} 
                    disabled={activeIndex >= testimonials.length - 3}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-viralDark/80 border border-viralOrange/20 p-3 rounded-full text-white disabled:opacity-30 disabled:cursor-not-allowed z-10 hover:bg-viralOrange/20 transition-colors"
                    aria-label="Testimonios siguientes"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${activeIndex}-${index}`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-viralDark/80 backdrop-blur-lg border border-viralOrange/20 text-white overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-viralOrange/20 hover:border-viralOrange/40 h-full">
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-center mb-6">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-viralOrange">
                            <img 
                              src={testimonial.imageSrc} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150?text=Cliente";
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex mb-4 justify-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-viralOrange fill-viralOrange" : "text-gray-400"}`}
                            />
                          ))}
                        </div>
                        
                        <p className="text-white/90 italic text-center mb-6 flex-grow">"{testimonial.quote}"</p>
                        
                        <div className="text-center">
                          <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                          <p className="text-viralOrange text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              className="w-full"
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
                containScroll: "trimSnaps"
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2">
                    <Card className="bg-viralDark/80 backdrop-blur-lg border border-viralOrange/20 text-white overflow-hidden h-full">
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-viralOrange">
                            <img 
                              src={testimonial.imageSrc} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150?text=Cliente";
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex mb-4 justify-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < testimonial.rating ? "text-viralOrange fill-viralOrange" : "text-gray-400"}`}
                            />
                          ))}
                        </div>
                        
                        <p className="text-white/90 italic text-center mb-4 flex-grow text-sm">"{testimonial.quote}"</p>
                        
                        <div className="text-center">
                          <h4 className="font-bold text-white text-base">{testimonial.name}</h4>
                          <p className="text-viralOrange text-xs">{testimonial.position}</p>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-viralDark/80 border-viralOrange/50 text-white hover:bg-viralOrange/20 h-10 w-10" />
              <CarouselNext className="right-2 bg-viralDark/80 border-viralOrange/50 text-white hover:bg-viralOrange/20 h-10 w-10" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
