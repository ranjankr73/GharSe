import { motion } from "framer-motion";

const EarningsPreviewSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p className="text-sm text-red-500 font-medium mb-2">
                    Earnings
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold">
                    Track your work and earnings
                </h2>

                <div className="mt-14 bg-white border border-gray-100 rounded-3xl shadow-xl p-8">
                    <div className="grid md:grid-cols-3 gap-5 mb-8">
                        {[
                            { label: "Deliveries Today", value: "12" },
                            { label: "Today's Earnings", value: "₹1,280" },
                            { label: "Weekly Earnings", value: "₹7,640" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="bg-gray-50 rounded-2xl p-5"
                            >
                                <p className="text-sm text-gray-400">
                                    {item.label}
                                </p>
                                <p className="text-xl font-semibold mt-2">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                        className="bg-blue-50 rounded-2xl p-6 text-left"
                    >
                        <p className="font-medium">Next Delivery</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Pickup in 1.8 km • Delivery in 3.2 km
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EarningsPreviewSection;