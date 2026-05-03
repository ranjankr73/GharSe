import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { RiArrowRightLine } from "react-icons/ri";

const CustomerCTASection = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAppSelector(
        (state) => state.auth
    );

    const handleCTA = () => {
        navigate(
            isAuthenticated && user?.role === "customer"
                ? "/customers/browse-shops"
                : "/register"
        );
    };

    return (
        <section className="py-24">
            <div className="max-w-5xl mx-auto px-4">
                <div className="relative overflow-hidden rounded-4xl border border-red-100 bg-linear-to-br from-red-50 via-white to-red-50 px-8 py-16 md:px-14 md:py-20 text-center">
                    {/* Background glow */}
                    <div className="absolute -top-20 -left-20 w-56 h-56 bg-red-100 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-red-100 rounded-full blur-3xl opacity-50" />

                    {/* Content */}
                    <div className="relative z-10">
                        <p className="text-sm text-red-500 font-medium mb-3">
                            Ready to order?
                        </p>

                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                            Discover local shops near you
                        </h2>

                        <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            Browse products, place orders instantly, and get
                            faster delivery from trusted nearby stores.
                        </p>

                        {/* CTA */}
                        <div className="mt-10 flex justify-center">
                            <Button
                                onClick={handleCTA}
                                size="lg"
                                className="group"
                            >
                                <span className="flex items-center gap-2">
                                    {isAuthenticated &&
                                    user?.role === "customer"
                                        ? "Browse Shops"
                                        : "Start Ordering"}

                                    <RiArrowRightLine className="text-lg group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </div>

                        {/* Trust note */}
                        <p className="mt-6 text-xs text-gray-400">
                            Fast delivery • Verified shops • Real-time tracking
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerCTASection;