"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Icon } from "@iconify/react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerText = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.4
        }
    }
};

const imageReveal = {
    hidden: { scale: 0.95, opacity: 0, filter: "blur(10px)" },
    visible: {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 1.2, ease: "circOut" as const }
    }
};

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <header ref={containerRef} className="pt-[140px] pb-[80px] px-[20px] md:px-[40px] bg-porcelain relative overflow-hidden min-h-[90vh] flex items-center">

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center relative z-10 w-full">

                {/* Left Column: The Promise */}
                <motion.div
                    className="col-span-1 lg:col-span-6 flex flex-col gap-[30px]"
                    initial="hidden"
                    animate="visible"
                    variants={staggerText}
                >
                    {/* Eyebrow */}
                    <motion.div variants={fadeInUp} className="flex items-center gap-3">
                        <div className="w-[8px] h-[8px] bg-healing-teal rounded-full animate-pulse" />
                        <span className="text-healing-teal font-heading font-bold text-sm uppercase tracking-widest">
                            Ibadan Facility
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <div className="relative">
                        <motion.h1 variants={fadeInUp} className="text-[48px] md:text-[64px] lg:text-[72px] font-bold font-heading text-triverge-blue leading-[1.1] tracking-tight">
                            A Safe, Warm <br />
                            <span className="text-healing-teal">Space</span>{" "}
                            for Seniors
                        </motion.h1>
                    </div>

                    {/* Body Text */}
                    <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-body text-charcoal/80 max-w-[500px] leading-relaxed">
                        The Triverge Geriatric Centre is designed to be more than a facility—it’s a sanctuary where care feels like home.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div variants={fadeInUp} className="btn-group flex gap-4 mt-6">
                        <button className="px-[32px] py-[16px] bg-triverge-blue text-white rounded-full font-bold hover:scale-105 transition-transform">
                            Book a Visit
                        </button>
                    </motion.div>

                </motion.div>

                {/* Right Column: The Window */}
                <div className="col-span-1 lg:col-span-6 relative h-[500px] lg:h-[650px] w-full perspective-1000">
                    <motion.div
                        className="relative w-full h-full rounded-t-[200px] rounded-b-[20px] overflow-hidden shadow-2xl bg-gray-200"
                        initial="hidden"
                        animate="visible"
                        variants={imageReveal}
                        style={{ y }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="/images/ibadan-facility.jpg"
                            alt="Ibadan Geriatric Centre Interior"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-triverge-blue/10 mix-blend-multiply" />

                        {/* Floating Badge */}
                        <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl flex items-center gap-3">
                            <Icon icon="solar:shield-check-bold" className="text-3xl text-healing-teal" />
                            <div>
                                <p className="text-xs text-charcoal/60 font-bold uppercase">Safety Rated</p>
                                <p className="font-heading font-bold text-triverge-blue">100% Secure</p>
                            </div>
                        </div>

                    </motion.div>
                </div>

            </div>
        </header>
    );
}
