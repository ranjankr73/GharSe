import HeroSection from "../../components/landing/driver/HeroSection";
import BenefitsSection from "../../components/landing/driver/BenefitsSection";
import WorkflowSection from "../../components/landing/driver/WorkflowSection";
import EarningsPreviewSection from "../../components/landing/driver/EarningsPreviewSection";
import RequirementsSection from "../../components/landing/driver/RequirementsSection";
import CTASection from "../../components/landing/driver/CTASection";

const DriverLandingPage = () => {
    return (
        <>
            <HeroSection />
            <BenefitsSection />
            <WorkflowSection />
            <EarningsPreviewSection />
            <RequirementsSection />
            <CTASection />
        </>
    );
};

export default DriverLandingPage;