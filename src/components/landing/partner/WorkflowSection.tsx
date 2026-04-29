import { motion } from "framer-motion";

const steps = [
    {
        step: "01",
        title: "Register your shop",
        description:
            "Create your shop profile and verify business details.",
    },
    {
        step: "02",
        title: "Add products",
        description:
            "Upload products, prices, and stock availability.",
    },
    {
        step: "03",
        title: "Start receiving orders",
        description:
            "Go live and start serving customers nearby.",
    },
];

const WorkflowSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        How it works
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Start selling in minutes
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-14">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-100 p-6"
                        >
                            <span className="text-red-500 text-sm font-semibold">
                                {step.step}
                            </span>

                            <h3 className="font-semibold mt-4">
                                {step.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;