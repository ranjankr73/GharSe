const steps = [
  { title: "Choose Shop", desc: "Browse nearby shops easily", icon: "🏪" },
  { title: "Add Items", desc: "Add products to your cart", icon: "🛒" },
  { title: "Get Delivered", desc: "Track and receive order", icon: "📦" },
];

const HowItWorks = () => {
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

        {/* 🔥 Steps */}
        <div className="relative mt-12 grid md:grid-cols-3 gap-8">

          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gray-100 z-0" />

          {steps.map((step, index) => (
            <div
              key={step.title}
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

              <p className="text-sm text-gray-500 mt-1 max-w-55">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;