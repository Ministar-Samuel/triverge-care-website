"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { PROMISES } from "@/lib/data";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export function WhyChooseUs() {
    const [activePromise, setActivePromise] = useState(0);

    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-porcelain dark:bg-background transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[40px] lg:gap-[80px] items-start">

                {/* Left Column: Headline & Accordion */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-[50px]">

                    {/* Headline Area */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold font-heading text-triverge-blue dark:text-white leading-tight mb-4">
                            Comfort,{" "}
                            <span className="relative inline-block px-1">
                                Dimensions of
                                <span className="relative z-10"> Dignity</span>,
                                <svg className="absolute inset-0 w-full h-full text-healing-teal -z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <ellipse cx="50" cy="50" rx="48" ry="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="10 5" className="opacity-60" />
                                </svg>
                            </span>
                            <br />
                            and expertise.
                        </h2>
                        <p className="text-xl font-body text-charcoal/80 dark:text-white/80 italic">
                            Every older adult deserves care that respects their story, their schedule, and their preferences.
                        </p>
                    </motion.div>

                    {/* The "Promise" List */}
                    <motion.ul
                        className="flex flex-col gap-[20px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                    >
                        {PROMISES.map((promise, idx) => (
                            <motion.li
                                key={idx}
                                variants={itemVariant}
                                className="group cursor-pointer"
                                onMouseEnter={() => setActivePromise(idx)}
                            >
                                <div className={cn(
                                    "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                                    activePromise === idx
                                        ? "bg-white dark:bg-white/10 shadow-lg scale-102 pl-6 border-l-4 border-healing-teal"
                                        : "hover:bg-gray-50 dark:hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}>
                                    {/* Icon */}
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
                                        activePromise === idx ? "bg-healing-teal text-white" : "bg-triverge-blue/10 dark:bg-white/10 text-triverge-blue dark:text-white"
                                    )}>
                                        <Icon icon={promise.icon} className="text-xl" />
                                    </div>

                                    {/* Text */}
                                    <span className={cn(
                                        "text-lg md:text-xl font-medium font-heading transition-colors duration-300",
                                        activePromise === idx ? "text-triverge-blue dark:text-white font-bold" : "text-charcoal dark:text-white"
                                    )}>
                                        {promise.title}
                                    </span>

                                    {/* Active Check */}
                                    {activePromise === idx && (
                                        <Icon icon="solar:shield-check-bold" className="ml-auto text-2xl text-healing-teal animate-in fade-in zoom-in" />
                                    )}
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>

                <motion.div
                    className="col-span-1 lg:col-span-6 relative h-[600px] lg:h-[700px] lg:sticky lg:top-[120px] rounded-[32px] overflow-hidden shadow-2xl bg-gray-200 dark:bg-slate-800"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Image Swap Logic */}
                    {PROMISES.map((promise, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                                activePromise === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                            )}
                        >
                            <img
                                src={promise.image}
                                alt={promise.title}
                                className={cn(
                                    "w-full h-full object-cover",
                                    // @ts-ignore
                                    promise.imagePosition
                                )}
                            />
                            {/* Gradient Overlay for text readability if needed, though text is on the left */}
                            <div className="absolute inset-0 bg-gradient-to-t from-triverge-blue/60 via-transparent to-transparent opacity-60" />

                            {/* Optional: Caption at bottom */}
                            <div className="absolute bottom-10 left-10 right-10 z-20 translate-y-4 opacity-0 transition-all duration-500 delay-300" style={{ transform: activePromise === idx ? 'translateY(0)' : 'translateY(20px)', opacity: activePromise === idx ? 1 : 0 }}>
                                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-white/20 shadow-lg inline-flex items-center gap-3">
                                    <Icon icon={promise.icon} className="text-2xl text-healing-teal" />
                                    <span className="font-heading font-bold text-triverge-blue dark:text-white text-sm">
                                        {promise.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
