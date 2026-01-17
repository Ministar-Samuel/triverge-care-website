"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const CURRICULUM_ITEMS = [
    { title: "Personal care routines", icon: "solar:bath-bold-duotone" },
    { title: "Communication with seniors", icon: "solar:chat-round-line-bold-duotone" },
    { title: "Dementia care skills", icon: "solar:brain-bold-duotone" },
    { title: "Infection prevention", icon: "solar:shield-check-bold-duotone" },
    { title: "Mobility assistance", icon: "solar:walking-round-bold-duotone" },
    { title: "Vital signs and observations", icon: "solar:heart-pulse-bold-duotone" },
    { title: "Safety and fall prevention", icon: "solar:danger-triangle-bold-duotone" },
    { title: "Documentation and reporting", icon: "solar:document-add-bold-duotone" },
    { title: "Emotional support & boundaries", icon: "solar:hearts-bold-duotone" },
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardFlip = {
    hidden: { opacity: 0, rotateX: -90, y: -50 },
    visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transition: {
            type: "spring",
            damping: 15,
            stiffness: 100,
            mass: 1.2
        }
    }
};

export function CurriculumGrid() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-[#f9fffe] dark:bg-background">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-[60px]">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-triverge-blue dark:text-white">
                        What you learn
                    </h2>
                    <p className="mt-4 text-charcoal/60 dark:text-white/60 max-w-[600px] mx-auto">
                        A comprehensive curriculum designed to build confidence and competence.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {CURRICULUM_ITEMS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardFlip}
                            className="bg-white dark:bg-white/5 rounded-[16px] p-[20px] flex items-center gap-[15px] shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 border border-gray-100 dark:border-white/10"
                        >
                            <div className="w-[50px] h-[50px] rounded-full bg-[#2ea69a]/10 flex items-center justify-center group-hover:bg-healing-teal transition-colors duration-300 shrink-0">
                                <Icon
                                    icon={item.icon}
                                    className="text-2xl text-healing-teal group-hover:text-white transition-colors duration-300"
                                />
                            </div>
                            <span className="font-heading font-medium text-[#212121] dark:text-white text-lg">
                                {item.title}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
