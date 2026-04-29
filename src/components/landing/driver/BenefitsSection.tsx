import { motion } from "framer-motion";

const benefits = [
    {
        title: "Flexible working hours",
        description:
            "Work when you want. Choose your own schedule and availability.",
        icon: "⏰",
    },
    {
        title: "Nearby deliveries",
        description:
            "Accept deliveries close to your location and reduce travel time.",
        icon: "📍",
    },
    {
        title: "Weekly payouts",
        description:
            "Track your earnings and receive payouts regularly.",
        icon: "💸",
    },
    {
        title: "Simple app experience",
        description:
            "Accept, track, and complete deliveries from your phone.",
        icon: "📱",
    },
];

const BenefitsSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Benefits
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Why deliver with GharSe
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Built for flexible work and predictable earnings.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-14">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-4">
                                {benefit.icon}
                            </div>

                            <h3 className="font-semibold text-gray-900">
                                {benefit.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;