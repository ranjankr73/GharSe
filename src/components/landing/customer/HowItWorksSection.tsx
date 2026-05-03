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
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        How it works
                    </p>

                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Order in three simple steps
                    </h2>

                    <p className="text-gray-500 mt-4 text-sm md:text-base leading-relaxed">
                        Designed for speed, convenience, and local shopping.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative mt-20">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-200 to-transparent" />

                    <div className="grid md:grid-cols-3 gap-14 md:gap-10 relative">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                                viewport={{ once: true }}
                                className="relative text-center"
                            >
                                {/* Step circle */}
                                <div className="flex justify-center">
                                    <div className="relative w-16 h-16 rounded-2xl bg-white shadow-sm border border-red-100 flex items-center justify-center text-2xl">
                                        {step.icon}

                                        {/* Step badge */}
                                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                                            {step.step}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-900 text-lg">
                                        {step.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-xs mx-auto">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerHowItWorksSection;
