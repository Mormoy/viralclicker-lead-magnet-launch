
import { Card, CardContent } from "@/components/ui/card";

type TestimonialProps = {
  name: string;
  position: string;
  quote: string;
  imageSrc: string;
};

const testimonials: TestimonialProps[] = [
  {
    name: "María González",
    position: "CEO de MarketingPro",
    quote: "Gracias a ViralClicker hemos aumentado nuestras conversiones en un 150% en solo 3 meses.",
    imageSrc: "/testimonial-1.jpg"
  },
  {
    name: "Carlos Mendez",
    position: "Director de Ventas en TechSoluciones",
    quote: "La calidad de los leads generados superó nuestras expectativas. Definitivamente volveremos a trabajar con ellos.",
    imageSrc: "/testimonial-2.jpg"
  },
  {
    name: "Ana Rodríguez",
    position: "Fundadora de eCommerce Plus",
    quote: "El retorno de inversión fue inmediato. En menos de un mes recuperamos lo invertido y seguimos creciendo.",
    imageSrc: "/testimonial-3.jpg"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-viralDark/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Lo que nuestros clientes dicen
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-viralDark/80 border border-gray-800 text-white overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <img 
                      src={testimonial.imageSrc} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/100?text=Client";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-viralOrange text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <p className="text-white/90 italic">"{testimonial.quote}"</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
