"use client";

import { motion } from "framer-motion";

const STEPS = [
    { title: "Classroom learning" },
    { title: "Practical demonstrations" },
    { title: "Supervised practice shifts" },
    { title: "Real-world experience" },
    { title: "Assessment & certification" },
    { title: "Job placement support", isFinal: true },
];

export function TrainingJourney() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-white">
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center mb-[80px]">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-triverge-blue">
                        How training works
                    </h2>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Background Line */}
                    <div className="absolute top-[80px] md:top-[20px] left-[20px] md:left-0 bottom-[20px] md:bottom-auto md:right-0 w-[4px] md:w-full md:h-[4px] bg-gray-200 rounded-full" />

                    {/* Active Line (Animated on scroll) */}
                    <motion.div
                        className="absolute top-[80px] md:top-[20px] left-[20px] md:left-0 w-[4px] md:h-[4px] bg-healing-teal rounded-full origin-top md:origin-left z-0"
                        initial={{ height: 0, width: 0 }}
                        whileInView={{ height: "100%", width: "100%" }}
                        transition={{ duration: 2, ease: "linear" }}
                        viewport={{ once: true, margin: "-200px" }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-[40px] relative z-10">
                        {STEPS.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.3 }}
                                viewport={{ once: true }}
                                className="flex flex-row md:flex-col items-center gap-6 md:gap-8"
                            >
                                {/* Circle Number */}
                                <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-white font-bold font-heading shrink-0 shadow-lg ${step.isFinal ? "bg-yellow-500 ring-4 ring-yellow-500/20" : "bg-triverge-blue"}`}>
                                    {idx + 1}
                                </div>

                                {/* Content */}
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full md:text-center md:min-h-[100px] flex items-center md:justify-center">
                                    <h3 className={`font-heading font-medium leading-tight ${step.isFinal ? "text-triverge-blue font-bold" : "text-charcoal"}`}>
                                        {step.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
