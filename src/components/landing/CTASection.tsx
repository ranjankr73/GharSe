import { useNavigate } from "react-router";
import Button from "../ui/Button";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 bg-red-50 relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40 top-0 left-1/2 -translate-x-1/2 -z-10" />

      <div className="max-w-3xl mx-auto px-4">
        
        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-md px-6 py-10 md:px-10 md:py-12 text-center">
          
          {/* Subtitle */}
          <p className="text-sm text-red-500 font-medium mb-2">
            Get started
          </p>

          {/* Heading */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
            Start ordering from nearby shops today
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Discover local shops, order instantly, and enjoy a seamless experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            
            <Button
              onClick={() => navigate("/shop/shop-001")}
              size="lg"
              fullWidth
            >
              Browse Shops
            </Button>

            <Button
              variant="outline"
              size="lg"
              fullWidth
            >
              Open Your Shop
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;