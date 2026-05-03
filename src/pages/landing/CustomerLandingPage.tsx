import HeroSection from "../../components/landing/customer/HeroSection";
import PopularShopsSection from "../../components/landing/customer/PopularShopsSection";
import CustomerHowItWorksSection from "../../components/landing/customer/HowItWorksSection";
import FeaturesSection from "../../components/landing/customer/FeaturesSection";
import WhyLocalShoppingSection from "../../components/landing/customer/WhyLocalShoppingSection";
import CTASection from "../../components/landing/customer/CTASection";

const CustomerLandingPage = () => {
    return (
        <div className="relative overflow-hidden bg-linear-to-b from-red-50 via-white to-slate-50">
            {/* Content */}
            <div className="relative z-10">
                <HeroSection />

                <PopularShopsSection />

                <CustomerHowItWorksSection />

                <FeaturesSection />

                <WhyLocalShoppingSection />
                <CTASection />
            </div>
        </div>
    );
};

export default CustomerLandingPage;
