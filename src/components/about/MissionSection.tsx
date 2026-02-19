"use client";

import { motion } from "framer-motion";

const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            staggerChildren: 0.05,
        },
    },
};

const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export function MissionSection() {
    const text = "To deliver dependable, compassionate elderly care through trained caregivers, clinical excellence, and a supportive community environment.";

    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-triverge-blue border-t border-white/10">
            <div className="max-w-[1000px] mx-auto text-center text-white">
                <span className="block text-healing-teal font-heading font-bold uppercase tracking-widest text-sm mb-8">
                    Our Mission
                </span>

                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading leading-tight"
                    variants={sentence}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {text.split(" ").map((word, index) => (
                        <span key={index} className="inline-block mr-[0.25em] whitespace-nowrap">
                            <motion.span variants={letter} className="inline-block">
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </motion.h2>
            </div>
        </section>
    );
}
