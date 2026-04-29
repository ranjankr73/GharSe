import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";

const CustomerCTASection = () => {
    const navigate = useNavigate();

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const handleCTA = () => {
        navigate(
            isAuthenticated && user?.role === "customer"
                ? "/customers/browse-shops"
                : "/register"
        );
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <div className="rounded-3xl bg-red-50 border border-red-100 px-8 py-14 text-center">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Ready to order?
                    </p>

                    <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
                        Discover local shops near you
                    </h2>

                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm md:text-base">
                        Browse products, place orders instantly, and get them
                        delivered faster from nearby trusted stores.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <Button onClick={handleCTA} size="lg">
                            {isAuthenticated && user?.role === "customer"
                                ? "Browse Shops"
                                : "Start Ordering"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerCTASection;