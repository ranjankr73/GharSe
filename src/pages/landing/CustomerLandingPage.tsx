import HeroSection from "../../components/landing/customer/HeroSection";
import PopularShopsSection from "../../components/landing/customer/PopularShopsSection";
import CustomerHowItWorksSection from "../../components/landing/customer/HowItWorksSection";
import FeaturesSection from "../../components/landing/customer/FeaturesSection";
import WhyLocalShoppingSection from "../../components/landing/customer/WhyLocalShoppingSection";
import CTASection from "../../components/landing/customer/CTASection";

const CustomerLandingPage = () => {
    return (
        <>
            <HeroSection />
            <PopularShopsSection />
            <CustomerHowItWorksSection />
            <FeaturesSection />
            <WhyLocalShoppingSection />
            <CTASection />
        </>
    );
};

export default CustomerLandingPage;
