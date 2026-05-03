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
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Features
                    </p>

                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                        Built for better local shopping
                    </h2>

                    <p className="text-gray-500 mt-4 text-sm md:text-base leading-relaxed">
                        Faster ordering, smarter tracking, and seamless
                        delivery from trusted nearby shops.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative mt-16 md:mt-20">
                    {/* Mobile left spine */}
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-linear-to-b from-red-100 via-red-200 to-red-50 md:hidden" />

                    {/* Desktop center spine */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-red-100 via-red-200 to-red-50 -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-14">
                        {features.map((feature, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.45,
                                        delay: index * 0.08,
                                    }}
                                    viewport={{ once: true }}
                                >
                                    {/* Mobile */}
                                    <div className="md:hidden grid grid-cols-[auto_1fr] gap-5 items-start relative">
                                        {/* Spine node */}
                                        <div className="relative flex justify-center">
                                            <div className="w-4 h-4 rounded-full bg-red-500 ring-8 ring-red-50 shadow-sm" />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">
                                                    {feature.icon}
                                                </span>

                                                <h3 className="font-semibold text-gray-900">
                                                    {feature.title}
                                                </h3>
                                            </div>

                                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Desktop */}
                                    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 items-center">
                                        {/* Left */}
                                        <div
                                            className={`${
                                                isLeft
                                                    ? "text-right"
                                                    : ""
                                            }`}
                                        >
                                            {isLeft && (
                                                <>
                                                    <div className="inline-flex items-center gap-3">
                                                        <span className="text-2xl">
                                                            {feature.icon}
                                                        </span>

                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {feature.title}
                                                        </h3>
                                                    </div>

                                                    <p className="text-gray-500 mt-3 leading-relaxed">
                                                        {feature.description}
                                                    </p>
                                                </>
                                            )}
                                        </div>

                                        {/* Center node */}
                                        <div className="relative flex justify-center">
                                            <div className="w-4 h-4 rounded-full bg-red-500 ring-8 ring-red-50 shadow-sm" />
                                        </div>

                                        {/* Right */}
                                        <div>
                                            {!isLeft && (
                                                <>
                                                    <div className="inline-flex items-center gap-3">
                                                        <span className="text-2xl">
                                                            {feature.icon}
                                                        </span>

                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {feature.title}
                                                        </h3>
                                                    </div>

                                                    <p className="text-gray-500 mt-3 leading-relaxed">
                                                        {feature.description}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerFeaturesSection;