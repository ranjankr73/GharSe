import { motion } from "framer-motion";

const steps = [
    {
        step: "01",
        title: "Sign up",
        description:
            "Create your delivery partner account in a few minutes.",
    },
    {
        step: "02",
        title: "Get verified",
        description:
            "Submit your documents and complete account verification.",
    },
    {
        step: "03",
        title: "Start delivering",
        description:
            "Accept nearby delivery requests and start earning.",
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
                        Start earning in three steps
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
                            <span className="text-blue-500 text-sm font-semibold">
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