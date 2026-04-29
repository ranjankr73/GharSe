import { motion } from "framer-motion";

const features = [
    {
        title: "Real-time tracking",
        description: "Track your order from shop to doorstep.",
        icon: "📍",
    },
    {
        title: "Instant ordering",
        description: "Place orders without making calls.",
        icon: "⚡",
    },
    {
        title: "Fast local delivery",
        description: "Get deliveries from nearby shops faster.",
        icon: "🛵",
    },
    {
        title: "Live updates",
        description: "Receive order updates instantly.",
        icon: "🔔",
    },
    {
        title: "Mobile-first experience",
        description: "Smooth ordering experience on mobile devices.",
        icon: "📱",
    },
    {
        title: "Trusted shops",
        description: "Order only from verified local stores.",
        icon: "✅",
    },
];

const CustomerFeaturesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Features
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Built for better local shopping
                    </h2>

                    <p className="text-gray-500 mt-3 text-sm md:text-base">
                        Everything you need for faster and easier ordering.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition"
                        >
                            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl mb-4">
                                {feature.icon}
                            </div>

                            <h3 className="font-semibold text-gray-900">
                                {feature.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerFeaturesSection;