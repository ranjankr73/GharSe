import { motion } from "framer-motion";

const requirements = [
    {
        title: "Valid ID proof",
        description:
            "Government-issued ID for verification and onboarding.",
        icon: "🪪",
    },
    {
        title: "Vehicle",
        description:
            "Bike, scooter, or cycle depending on delivery availability.",
        icon: "🏍️",
    },
    {
        title: "Smartphone",
        description:
            "Use the app to manage and complete deliveries.",
        icon: "📱",
    },
];

const RequirementsSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Requirements
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold">
                        What you need to get started
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Simple requirements to start delivering.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-14">
                    {requirements.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="bg-white border border-gray-100 rounded-2xl p-6"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-4">
                                {item.icon}
                            </div>

                            <h3 className="font-semibold text-gray-900">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RequirementsSection;