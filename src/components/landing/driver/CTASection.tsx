import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";

const CTASection = () => {
    const navigate = useNavigate();

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const handleCTA = () => {
        navigate(
            isAuthenticated && user?.role === "deliveryAgent"
                ? "/drivers/dashboard"
                : "/register/driver"
        );
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <div className="rounded-3xl bg-blue-50 border border-blue-100 px-8 py-14 text-center">
                    <p className="text-sm text-blue-500 font-medium mb-2">
                        Ready to start?
                    </p>

                    <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
                        Join GharSe as a delivery partner
                    </h2>

                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        Deliver nearby, earn flexibly, and manage everything
                        from your phone.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <Button onClick={handleCTA} size="lg">
                            {isAuthenticated && user?.role === "deliveryAgent"
                                ? "Go to Dashboard"
                                : "Join as Driver"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;