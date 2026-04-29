import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Button from "../../ui/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";

const CustomerHero = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    const handlePrimaryCTA = () => {
        navigate(
            isAuthenticated && user?.role === "customer"
                ? "/customers/browse-shops"
                : "/register"
        );
    };

    return (
        <section className="relative min-h-screen flex items-center bg-linear-to-b from-red-50 via-white to-white overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-red-100 rounded-full blur-3xl opacity-40 -z-10" />

            <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid lg:grid-cols-2 gap-14 items-center w-full">
                {/* Left */}
                <div className="text-center lg:text-left space-y-7">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-medium"
                    >
                        ⚡ Fast • Local • Reliable
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                    >
                        Order from nearby shops,
                        <span className="text-red-500 block">
                            delivered to your door
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-gray-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
                    >
                        Discover trusted local stores, browse products, and
                        place orders in seconds — all without calls, confusion,
                        or waiting.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                    >
                        <Button onClick={handlePrimaryCTA} size="lg">
                            {isAuthenticated && user?.role === "customer"
                                ? "Browse Shops"
                                : "Start Ordering"}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() =>
                                navigate("/partner")
                            }
                        >
                            Partner With Us
                        </Button>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2"
                    >
                        {[
                            "📍 Nearby shops",
                            "🛵 Fast delivery",
                            "🔔 Live tracking",
                        ].map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
                            >
                                {item}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Right visual */}
                <div className="relative flex justify-center">
                    {/* Main card */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                        className="w-80 bg-white border border-gray-100 rounded-3xl shadow-xl p-6"
                    >
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="font-semibold text-gray-900">
                                Fresh Basket
                            </h3>
                            <span className="text-green-500 text-xs font-medium">
                                Open now
                            </span>
                        </div>

                        <div className="space-y-4 text-sm">
                            {[
                                ["Milk (1L)", "₹40"],
                                ["Bread", "₹30"],
                                ["Eggs (6)", "₹60"],
                            ].map(([name, price]) => (
                                <div
                                    key={name}
                                    className="flex justify-between"
                                >
                                    <span>{name}</span>
                                    <span>{price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 bg-red-500 text-white text-center py-3 rounded-2xl text-sm font-medium">
                            Checkout • ₹130
                        </div>
                    </motion.div>

                    {/* Floating cards */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-5 right-0 bg-white shadow-md border rounded-xl px-4 py-2 text-xs"
                    >
                        ⭐ 4.8 rating
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                        className="absolute -bottom-5 left-0 bg-white shadow-md border rounded-xl px-4 py-2 text-xs"
                    >
                        🛵 20–30 mins
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -7, 0] }}
                        transition={{ duration: 3.2, repeat: Infinity }}
                        className="absolute top-1/2 -right-8 bg-white shadow-md border rounded-xl px-4 py-2 text-xs"
                    >
                        🔥 10% off
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CustomerHero;