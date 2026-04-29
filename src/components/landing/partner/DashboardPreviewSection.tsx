import { motion } from "framer-motion";

const DashboardPreviewSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p className="text-sm text-red-500 font-medium mb-2">
                    Dashboard
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold">
                    Manage your business in one place
                </h2>

                <div className="mt-14 bg-white border border-gray-100 rounded-3xl shadow-xl p-8">
                    <div className="grid md:grid-cols-3 gap-5 mb-8">
                        {[
                            { label: "Orders Today", value: "24" },
                            { label: "Revenue", value: "₹5,280" },
                            { label: "Products", value: "86" },
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
                        className="bg-red-50 rounded-2xl p-6 text-left"
                    >
                        <p className="font-medium">Latest Order</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Order #1025 • 4 items • Preparing
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreviewSection;