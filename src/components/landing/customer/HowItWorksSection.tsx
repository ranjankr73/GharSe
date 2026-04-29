import { motion } from "framer-motion";

const steps = [
    {
        step: "01",
        title: "Choose a nearby shop",
        description:
            "Discover trusted local shops around your location with live availability.",
        icon: "🏪",
    },
    {
        step: "02",
        title: "Add items to cart",
        description:
            "Browse products, select what you need, and place your order instantly.",
        icon: "🛒",
    },
    {
        step: "03",
        title: "Track and receive",
        description:
            "Track order progress in real-time and get it delivered to your doorstep.",
        icon: "📦",
    },
];

const CustomerHowItWorksSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        How it works
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Order in three simple steps
                    </h2>

                    <p className="text-gray-500 mt-3 text-sm md:text-base">
                        Fast, simple, and built for local shopping.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 mt-14">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-100 p-6"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl">
                                    {step.icon}
                                </div>

                                <span className="text-xs font-semibold text-red-400">
                                    {step.step}
                                </span>
                            </div>

                            <h3 className="font-semibold text-gray-900">
                                {step.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerHowItWorksSection;