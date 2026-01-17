"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SERVICES = [
    "Dementia & memory care",
    "Post-surgical rehabilitation",
    "Palliative & end-of-life care",
    "Respite care for families",
    "Stroke recovery support",
    "Assisted living",
    "Chronic disease management",
    "Nutritional planning"
];

const marqueeVariants = {
    animate: {
        x: [0, -1000],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop" as const,
                duration: 20,
                ease: "linear" as const,
            },
        },
    },
};

export function ServicesMarquee() {
    return (
        <section className="py-[100px] bg-triverge-blue text-white relative overflow-hidden">

            {/* Header */}
            <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] mb-[60px] relative z-10 text-center">
                <span className="text-healing-teal font-heading font-bold text-sm uppercase tracking-widest mb-2 block">
                    Our Expertise
                </span>
                <h2 className="text-[32px] md:text-[40px] font-bold font-heading">
                    Services Available
                </h2>
            </div>

            {/* Marquee Track */}
            <div className="relative w-full overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-[100px] bg-gradient-to-r from-triverge-blue to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-[100px] bg-gradient-to-l from-triverge-blue to-transparent z-10" />

                <motion.div
                    className="flex gap-[20px] w-max"
                    variants={marqueeVariants}
                    animate="animate"
                >
                    {/* Double the list for seamless loop */}
                    {[...SERVICES, ...SERVICES, ...SERVICES].map((service, idx) => (
                        <div
                            key={idx}
                            className="group/item relative px-[30px] py-[16px] rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-default"
                        >
                            <span className="text-lg font-medium whitespace-nowrap group-hover/item:text-healing-teal transition-colors">
                                {service}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Pause on hover overlay - handled by group-hover on parent stopping pointer events? 
                    Actually CSS is better for pausing marquee, but Framer Motion handles it if we bind controls.
                    For simplicity, we'll let it run or rely on user focus.
                */}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-[60px]">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 px-[40px] py-[18px] bg-healing-teal text-white rounded-full text-lg font-bold font-heading hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                        Book a Tour
                        <Icon icon="solar:arrow-right-bold" className="text-xl" />
                    </Link>
                </motion.div>
            </div>

        </section>
    );
}
