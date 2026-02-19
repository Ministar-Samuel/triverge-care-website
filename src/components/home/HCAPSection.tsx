"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { HCAP_CURRICULUM } from "@/lib/data";
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
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } }
};

const gentleScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export function HCAPSection() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-[#2d4375] text-porcelain relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-healing-teal/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center relative z-10">

                {/* Left: Content */}
                <motion.div
                    className="col-span-1 lg:col-span-7 flex flex-col gap-[30px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div className="flex items-center gap-3 mb-2" variants={fadeInUp}>
                        <Icon icon="solar:diploma-verified-bold" className="text-3xl text-healing-teal" />
                        <span className="text-healing-teal font-heading font-bold text-sm uppercase tracking-widest">
                            Training Academy
                        </span>
                    </motion.div>

                    <motion.h2 variants={fadeInUp} className="text-[40px] lg:text-[56px] font-bold font-heading leading-none">
                        Become a <span className="text-healing-teal">Certified</span><br />
                        Elderly Caregiver
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="text-xl font-body text-porcelain/80 max-w-[600px] leading-relaxed">
                        Our Home Care Assistant Programme (HCAP) trains caregivers to deliver world-class support with empathy and skill.
                    </motion.p>

                    {/* Curriculum Tags */}
                    <div className="flex flex-wrap gap-[10px] mt-4">
                        {HCAP_CURRICULUM.map((item, idx) => (
                            <motion.span
                                key={idx}
                                variants={itemVariant}
                                className="px-[20px] py-[10px] rounded-full border border-white/30 text-white/90 font-medium font-heading transition-all duration-300 hover:bg-healing-teal hover:border-healing-teal hover:scale-105 cursor-default"
                            >
                                {item}
                            </motion.span>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <motion.p variants={fadeInUp} className="text-lg font-body italic text-white/60 mt-4 border-l-2 border-healing-teal pl-4">
                        "Graduates receive placement support within our network."
                    </motion.p>

                    {/* Shimmer Button CTA */}
                    <motion.div className="mt-6" variants={fadeInUp}>
                        <Link
                            href="/hcap"
                            className="relative inline-flex items-center gap-3 px-[40px] py-[18px] bg-white text-triverge-blue rounded-full text-lg font-bold font-heading overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            Start Training
                            <Icon icon="solar:round-arrow-right-bold" className="text-2xl group-hover:translate-x-1 transition-transform" />

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] bg-gradient-to-r from-transparent via-healing-teal/20 to-transparent skew-x-12" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right: Graphic */}
                <motion.div
                    className="col-span-1 lg:col-span-5 relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={gentleScale}
                >
                    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-800 group">
                        {/* Training Academy Image */}
                        <img
                            src="/images/training-academy.jpg"
                            alt="Triverge HCAP Student Nurse"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 object-bottom"
                        />
                        <div className="absolute inset-0 bg-triverge-blue/30 mix-blend-multiply" />

                        {/* Certificate Badge */}
                        <div className="absolute bottom-8 right-8 bg-white text-triverge-blue p-6 rounded-2xl shadow-xl max-w-[200px] rotate-[-5deg] hover:rotate-0 transition-transform duration-300 z-10">
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => <Icon key={i} icon="solar:star-bold" className="text-yellow-400 text-sm" />)}
                            </div>
                            <p className="font-bold font-heading leading-tight">
                                Triverge Certified
                            </p>
                            <p className="text-xs text-charcoal/60 mt-1">
                                Industry recognized
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
