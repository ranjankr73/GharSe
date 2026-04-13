import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import FeaturesSection from "../components/landing/FeaturesSection";
import ShopOwnerSection from "../components/landing/ShopOwnerSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
        <div className="bg-white text-gray-900 scroll-smooth">
      
      {/* 🔥 NAVBAR */}
      <Navbar />

      {/* 🔥 HERO */}
      <HeroSection />

      {/* 🔥 MAIN CONTENT FLOW */}
      <main className="space-y-0">
        
        {/* subtle section divider feel */}
        <div className="relative">
          <HowItWorks />
        </div>

        <div className="relative">
          <FeaturesSection />
        </div>

        <div className="relative">
          <ShopOwnerSection />
        </div>

        <div className="relative">
          <CTASection />
        </div>

      </main>

      {/* 🔥 FOOTER */}
      <Footer />
    </div>
  );
};

export default LandingPage;