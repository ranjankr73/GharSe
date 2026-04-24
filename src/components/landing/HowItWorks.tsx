import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const customerSteps = [
    {
        title: "Choose Shop",
        desc: "Browse nearby verified shops in your area",
        icon: "🏪",
    },
    {
        title: "Add Items",
        desc: "Add products to your cart with one tap",
        icon: "🛒",
    },
    {
        title: "Get Delivered",
        desc: "Track your order and receive it fast",
        icon: "📦",
    },
];

const shopSteps = [
    {
        title: "Create Shop",
        desc: "Register your shop in just a few minutes",
        icon: "🏪",
    },
    {
        title: "Add Products",
        desc: "List your items with prices and stock",
        icon: "📦",
    },
    {
        title: "Accept Orders",
        desc: "Manage and fulfill orders from your dashboard",
        icon: "✅",
    },
];

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState<"customer" | "shop">("customer");
    const steps = activeTab === "customer" ? customerSteps : shopSteps;

    return (
        <section id="how" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* 🔥 Heading */}
                <p className="text-sm text-red-500 font-medium mb-2">
                    Simple process
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold">
                    How GharSe works
                </h2>

                <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                    Order from your nearby shops in just a few simple steps
                </p>

                {/* ✅ Tab switcher */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {(["customer", "shop"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                                activeTab === tab
                                    ? "bg-red-500 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {tab === "customer"
                                ? "For Customers"
                                : "For Shop Owners"}
                        </button>
                    ))}
                </div>

                {/* 🔥 Steps */}
                <div className="relative mt-12 grid md:grid-cols-3 gap-8">
                    {/* Connector line (desktop only) */}
                    <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gray-100 z-0" />

                    <AnimatePresence mode="wait">
                        {steps.map((step, index) => (
                            <motion.div
                                key={`${activeTab}-${step.title}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.4,
                                }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                {/* 🔥 Icon + Step number */}
                                <div className="relative">
                                    {/* Step number */}
                                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center shadow-sm">
                                        {index + 1}
                                    </div>

                                    {/* Icon circle */}
                                    <div className="w-16 h-16 flex items-center justify-center text-2xl bg-red-50 text-red-500 rounded-2xl border border-red-100 shadow-sm group-hover:shadow-md transition">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Text */}
                                <h3 className="mt-4 font-semibold text-gray-800">
                                    {step.title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1 max-w-56">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
