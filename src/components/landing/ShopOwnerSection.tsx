import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useNavigate } from "react-router";

const features = [
    "Accept & manage orders easily",
    "Update products in real-time",
    "Track orders & growth insights",
];

const ShopOwnerSection = () => {
    const navigate = useNavigate();
    
    return (
        <section id="shops" className="py-20 bg-white overflow-hidden px-10">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* 🔥 LEFT */}
                <div className="space-y-5">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-sm text-red-500 font-medium"
                    >
                        For shop owners
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-semibold"
                    >
                        Run your shop like a pro 🚀
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-gray-500 text-sm max-w-md"
                    >
                        Manage orders, update products, and grow your business
                        effortlessly with GharSe.
                    </motion.p>

                    {/* Features */}
                    <div className="space-y-3 mt-4">
                        {features.map((f, i) => (
                            <motion.div
                                key={f}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.3 + i * 0.1,
                                    duration: 0.4,
                                }}
                                viewport={{ once: true }}
                                className="flex items-start gap-3 text-sm text-gray-700"
                            >
                                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-50 text-red-500 text-xs font-bold">
                                    ✓
                                </span>
                                <span>{f}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Button onClick={() => navigate("/shops/login")} size="lg" className="mt-6">
                            Start Selling
                        </Button>
                    </motion.div>
                </div>

                {/* 🔥 RIGHT */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="relative flex justify-center"
                >
                    {/* Glow */}
                    <div className="absolute w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-50 -z-10" />

                    {/* Floating card */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white border border-gray-100 rounded-2xl shadow-xl p-5 w-75"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm font-semibold">
                                Shop Dashboard
                            </p>
                            <span className="text-xs text-green-500">
                                Online
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-gray-400">Orders</p>
                                <p className="font-semibold text-gray-800">
                                    24
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-gray-400">Revenue</p>
                                <p className="font-semibold text-gray-800">
                                    ₹2,400
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span>#1023</span>
                                <span className="text-green-500">Accepted</span>
                            </div>
                            <div className="flex justify-between">
                                <span>#1024</span>
                                <span className="text-yellow-500">
                                    Preparing
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            delay: 0.4,
                            duration: 3,
                            repeat: Infinity,
                        }}
                        viewport={{ once: true }}
                        className="absolute -bottom-6 -right-6 bg-white border border-gray-100 shadow-md rounded-xl px-4 py-2 text-xs font-medium text-gray-700"
                    >
                        📈 Growing fast
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{ y: [0, -7, 0] }}
                        transition={{
                            delay: 0.5,
                            duration: 3.2,
                            repeat: Infinity,
                        }}
                        viewport={{ once: true }}
                        className="absolute -top-4 -left-6 bg-white border border-gray-100 shadow-md rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                        🧾 New order
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            delay: 0.6,
                            duration: 3.6,
                            repeat: Infinity,
                        }}
                        viewport={{ once: true }}
                        className="absolute -top-5 md:top-1/3 -right-10 bg-white border border-gray-100 shadow-md rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                        ⚡ Fast delivery
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            delay: 0.7,
                            duration: 3.3,
                            repeat: Infinity,
                        }}
                        viewport={{ once: true }}
                        className="absolute -bottom-4 md:bottom-12 -left-8 bg-white border border-gray-100 shadow-md rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                        💰 ₹2.4k today
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ShopOwnerSection;
