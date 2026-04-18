import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen flex items-start md:items-center pt-2 md:pt-0 bg-linear-to-b from-red-50 via-white to-white">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 lg:py-20 grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-10 items-center w-full text-center lg:text-left">
                {/* 🔥 LEFT */}
                <div className="space-y-6">
                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold leading-tight tracking-tight"
                    >
                        Order from nearby shops <br />
                        <span className="text-red-500">without calling</span> 📦
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-gray-600 text-base md:text-lg max-w-md text-center lg:text-left mx-auto lg:mx-0"
                    >
                        Browse items, add to cart, and place orders instantly.
                        Simple, fast, and made for your neighborhood.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex gap-3 text-center justify-center lg:justify-start"
                    >
                        <Button
                            onClick={() => navigate("/customers/browse-shops")}
                            size="lg"
                        >
                            Browse Shops
                        </Button>

                        <Button onClick={() => navigate("/shops/register")} variant="outline" size="lg">
                            Open Your Shop
                        </Button>
                    </motion.div>

                    {/* Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-wrap gap-2 pt-2 text-center justify-center lg:justify-start"
                    >
                        <span className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-full">
                            ⚡ Fast ordering
                        </span>
                        <span className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                            📍 Local shops
                        </span>
                        <span className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                            💬 No calls needed
                        </span>
                    </motion.div>
                </div>

                {/* 🔥 RIGHT */}
                <div className="flex justify-center relative mt-10 md:mt-0">
                    {/* Glow */}
                    <div className="absolute w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-50 -z-10" />

                    {/* Main Card */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="bg-white border border-gray-100 rounded-2xl shadow-xl p-5 w-75"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-semibold text-sm">
                                Fresh Basket
                            </p>
                            <span className="text-xs text-green-500 font-medium">
                                Open
                            </span>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Milk (1L)</span>
                                <span>₹40</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Bread</span>
                                <span>₹30</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Eggs (6)</span>
                                <span>₹60</span>
                            </div>
                        </div>

                        <div className="mt-5 bg-red-500 text-white text-center py-2.5 rounded-xl text-sm font-medium">
                            View Cart • ₹130
                        </div>
                    </motion.div>

                    {/* 🔥 Floating badges (consistent design) */}

                    {/* Delivery time */}
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -bottom-6 -left-6 bg-white border border-gray-100 shadow-md rounded-xl px-4 py-2 text-xs font-medium text-gray-700 ml-5"
                    >
                        🛵 30–45 min
                    </motion.div>

                    {/* Rating */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                        className="absolute -top-6 -right-6 bg-white border border-gray-100 shadow-md rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700 mr-5"
                    >
                        ⭐ 4.5 rating
                    </motion.div>

                    {/* Discount */}
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3.2, repeat: Infinity }}
                        className="absolute -bottom-4 -right-8 bg-white border border-gray-100 shadow-md rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700 mr-5"
                    >
                        🔥 10% OFF
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
