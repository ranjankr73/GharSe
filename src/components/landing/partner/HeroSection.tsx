import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Button from "../../ui/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";

const PartnerHero = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    const handlePrimaryCTA = () => {
        navigate(
            isAuthenticated && user?.role === "shopOwner"
                ? "/shops/dashboard"
                : "/register/shop-owner"
        );
    };

    return (
        <section className="relative min-h-screen flex items-center bg-linear-to-b from-orange-50 via-white to-white overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-orange-100 rounded-full blur-3xl opacity-40 -z-10" />

            <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid lg:grid-cols-2 gap-14 items-center w-full">
                {/* Left */}
                <div className="space-y-7 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium"
                    >
                        🚀 Grow your business locally
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                    >
                        Turn your shop into a
                        <span className="block text-red-500">
                            digital storefront
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
                    >
                        Reach nearby customers, accept orders instantly, manage
                        products, and grow revenue — all from one dashboard.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                    >
                        <Button onClick={handlePrimaryCTA} size="lg">
                            {isAuthenticated && user?.role === "shopOwner"
                                ? "Go to Dashboard"
                                : "Start Selling"}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate("/login/shop-owner")}
                        >
                            Partner Login
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-3 justify-center lg:justify-start"
                    >
                        {[
                            "📈 More orders",
                            "🧾 Easy management",
                            "📦 Real-time inventory",
                        ].map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium"
                            >
                                {item}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Right */}
                <div className="relative flex justify-center">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-80 bg-white border border-gray-100 rounded-3xl shadow-xl p-6"
                    >
                        <div className="flex justify-between mb-5">
                            <h3 className="font-semibold">Shop Dashboard</h3>
                            <span className="text-green-500 text-xs">
                                Active
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400">Orders</p>
                                <p className="font-semibold">48</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400">Revenue</p>
                                <p className="font-semibold">₹8,400</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>#1024</span>
                                <span className="text-yellow-500">
                                    Preparing
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>#1025</span>
                                <span className="text-green-500">
                                    Delivered
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PartnerHero;