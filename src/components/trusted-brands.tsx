
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type TrustedBrandsProps = {
  className?: string;
}

const TrustedBrands = ({ className }: TrustedBrandsProps) => {
  const brands = [
    { name: "Empresa 1", logo: "/brand-1.svg" },
    { name: "Empresa 2", logo: "/brand-2.svg" },
    { name: "Empresa 3", logo: "/brand-3.svg" },
    { name: "Empresa 4", logo: "/brand-4.svg" },
    { name: "Empresa 5", logo: "/brand-5.svg" },
  ];
  
  return (
    <section className={cn("py-16 bg-gradient-to-br from-viralDark to-viralDark/80", className)}>
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center text-white mb-3">
          Marcas que confían en nosotros
        </h3>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
          Empresas líderes en diferentes industrias han confiado en nuestra tecnología para potenciar su presencia digital
        </p>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-viralDark to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-viralDark to-transparent z-10"></div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20 py-8 px-4 overflow-hidden">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="group relative transition-all duration-300"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-viralOrange to-viralOrange/60 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-viralDark/80 p-4 rounded-lg">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-16 md:h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/200x100?text=${brand.name}`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
