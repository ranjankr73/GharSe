import { motion } from "framer-motion";

const points = [
    {
        title: "Support neighborhood businesses",
        description:
            "Every order supports local shop owners and your community.",
    },
    {
        title: "Faster than big marketplaces",
        description:
            "Nearby deliveries mean less waiting and quicker fulfillment.",
    },
    {
        title: "Better product availability",
        description:
            "Get essentials from shops you already know and trust.",
    },
];

const WhyLocalShoppingSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Why local
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Shop local. Get more.
                    </h2>

                    <p className="text-gray-500 mt-3 text-sm md:text-base">
                        Better for your neighborhood and better for you.
                    </p>
                </div>

                <div className="space-y-6 mt-14">
                    {points.map((point, index) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="bg-white border border-gray-100 rounded-2xl p-6"
                        >
                            <h3 className="font-semibold text-gray-900">
                                {point.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyLocalShoppingSection;