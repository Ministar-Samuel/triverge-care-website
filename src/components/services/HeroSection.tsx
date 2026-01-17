"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const CHOICE_PILLARS = [
    { title: "Home-based Care", icon: "solar:home-smile-bold" },
    { title: "Centre Rehabilitation", icon: "solar:hospital-bold" },
    { title: "Short-term Respite", icon: "solar:sofa-bold" },
    { title: "Long-term Residential", icon: "solar:city-bold" },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.6 // Delay after headline animation
        }
    }
};

export function HeroSection() {
    return (
        <header className="pt-[160px] pb-[80px] px-[20px] md:px-[40px] bg-[#f9fffe] dark:bg-background relative overflow-hidden transition-colors duration-300">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-[60px]">

                {/* Headline Block */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="max-w-[800px]"
                >
                    <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-triverge-blue dark:text-white mb-6 leading-tight">
                        Our <span className="relative inline-block">
                            Elder Care
                            {/* Animated Underline */}
                            <svg className="absolute -bottom-2 left-0 w-full h-[12px] text-healing-teal" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                                />
                            </svg>
                        </span> Services
                    </h1>
                    <p className="text-xl md:text-2xl font-body text-charcoal/80 dark:text-white/80 leading-relaxed max-w-[700px]">
                        We provide medical and daily living support for seniors at home or in our centre. Care is personalised to each person’s needs.
                    </p>
                </motion.div>

                {/* Choice Pillars */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <div className="col-span-full mb-4">
                        <span className="text-sm font-bold uppercase tracking-widest text-charcoal/50 dark:text-white/50">
                            You can choose:
                        </span>
                    </div>

                    {CHOICE_PILLARS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="group p-[30px] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[24px] flex flex-col items-center justify-center gap-4 text-center hover:bg-triverge-blue hover:border-triverge-blue dark:hover:bg-healing-teal dark:hover:border-healing-teal transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default"
                        >
                            <Icon
                                icon={item.icon}
                                className="text-4xl text-healing-teal dark:text-healing-teal group-hover:text-white transition-colors duration-300"
                            />
                            <span className="font-heading font-bold text-lg text-charcoal dark:text-white group-hover:text-white transition-colors duration-300">
                                {item.title}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </header>
    );
}
