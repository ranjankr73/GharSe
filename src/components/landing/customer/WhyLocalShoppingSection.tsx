import { motion } from "framer-motion";

const points = [
    {
        title: "Support neighborhood businesses",
        description:
            "Every order supports local shop owners and your community.",
        icon: "🏪",
    },
    {
        title: "Faster than big marketplaces",
        description:
            "Nearby deliveries mean less waiting and quicker fulfillment.",
        icon: "⚡",
    },
    {
        title: "Better product availability",
        description:
            "Get essentials from shops you already know and trust.",
        icon: "✅",
    },
];

const WhyLocalShoppingSection = () => {
    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Why local
                    </p>

                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                        Shop local. Get more.
                    </h2>

                    <p className="text-gray-500 mt-4 text-sm md:text-base leading-relaxed">
                        Better for your neighborhood and better for your daily
                        shopping experience.
                    </p>
                </div>

                {/* Value band */}
                <div className="mt-16 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-red-100 border-y md:border border-red-100 rounded-3xl overflow-hidden bg-white">
                    {points.map((point, index) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.12,
                            }}
                            viewport={{ once: true }}
                            className="px-8 py-10 text-center"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-2xl mb-6">
                                {point.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-900">
                                {point.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 mt-3 leading-relaxed text-sm md:text-base">
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