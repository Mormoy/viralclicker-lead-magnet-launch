
import React from 'react';

const TrustedBrands = () => {
  return (
    <section className="py-12 bg-viralDark border-t border-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Marcas que confían en nosotros
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {/* Replace with your actual brand images */}
          <img src="/brand-1.svg" alt="Brand 1" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/brand-2.svg" alt="Brand 2" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/brand-3.svg" alt="Brand 3" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/brand-4.svg" alt="Brand 4" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/brand-5.svg" alt="Brand 5" className="h-12 opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
