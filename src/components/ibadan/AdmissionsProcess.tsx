"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const STEPS = [
    { title: "Consultation", icon: "solar:chat-round-dots-bold", desc: "Speak with a care manager." },
    { title: "Assessment", icon: "solar:clipboard-check-bold", desc: "We review health needs." },
    { title: "Care Plan", icon: "solar:document-text-bold", desc: "Customized schedule created." },
    { title: "Move In", icon: "solar:sofa-bold", desc: "Welcome to the family." },
];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const flipVariant = {
    hidden: { rotateX: 90, opacity: 0 },
    visible: {
        rotateX: 0,
        opacity: 1,
        transition: { duration: 0.6, type: "spring" as const }
    }
};

export function AdmissionsProcess() {
    return (
        <section className="py-[120px] px-[20px] md:px-[40px] bg-gradient-to-b from-porcelain to-[#e0f7fa] dark:from-background dark:to-triverge-blue/20 relative z-10 shadow-2xl rounded-b-[60px]">


            <div className="max-w-[1200px] mx-auto text-center">

                <div className="mb-[60px]">
                    <h2 className="text-[40px] md:text-[56px] font-bold font-heading text-triverge-blue dark:text-white mb-4">
                        Simple Admissions Process
                    </h2>
                    <p className="text-xl font-body text-charcoal/80 dark:text-white/80">
                        We’ve made joining us as stress-free as possible.
                    </p>
                </div>

                {/* Steps Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-[80px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {STEPS.map((step, idx) => (
                        <div key={idx} className="relative group perspective-1000">
                            <motion.div
                                variants={flipVariant}
                                className="bg-white dark:bg-white/10 p-[30px] rounded-[24px] shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                            >
                                <div className="w-[60px] h-[60px] rounded-full bg-triverge-blue/5 dark:bg-white/5 flex items-center justify-center mb-4 text-healing-teal text-3xl group-hover:bg-healing-teal group-hover:text-white transition-colors duration-300">
                                    <Icon icon={step.icon} />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-triverge-blue text-white flex items-center justify-center font-bold text-sm mb-4">
                                    {idx + 1}
                                </div>
                                <h3 className="text-lg font-bold font-heading text-triverge-blue dark:text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-charcoal/70 dark:text-white/70">{step.desc}</p>
                            </motion.div>

                            {/* Arrow for Desktop (except last item) */}
                            {idx < STEPS.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-[20px] -translate-y-1/2 z-10 text-triverge-blue/20">
                                    <Icon icon="solar:arrow-right-bold" className="text-2xl" />
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Pulse Contact Box */}
                <motion.div
                    className="inline-flex items-center gap-[40px] bg-triverge-blue dark:bg-slate-900 text-white p-[10px] pr-[40px] rounded-full shadow-2xl shadow-healing-teal/20 animate-pulse-slow max-w-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="bg-healing-teal px-[30px] py-[20px] rounded-full font-bold font-heading">
                        Questions?
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-xs uppercase opacity-70 tracking-widest">Call our care line</span>
                        <span className="text-2xl font-bold font-heading">+234 705 3390 270</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
