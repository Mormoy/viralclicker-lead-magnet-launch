
import { cn } from "@/lib/utils";

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
    <section className={cn("py-10", className)}>
      <div className="container mx-auto px-4">
        <h3 className="text-xl text-center text-white/70 mb-8">
          Marcas que confían en nosotros
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-12 md:h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/150x80?text=${brand.name}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
