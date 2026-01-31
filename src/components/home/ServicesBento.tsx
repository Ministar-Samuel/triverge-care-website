"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SERVICES_BENTO } from "@/lib/data";
import { motion } from "framer-motion";
import { DotPattern } from "@/components/ui/dot-pattern";

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

export function ServicesBento() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-white dark:bg-[#1f6b63] transition-colors duration-300 relative overflow-hidden">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "fill-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
                )}
            />
            <div className="max-w-[1440px] mx-auto">

                {/* Header */}
                <motion.div
                    className="text-center max-w-[800px] mx-auto mb-[60px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold font-heading text-[#2d4375] dark:text-[#f9fffe] mb-4">
                        Personalised Care at Every Stage of Ageing
                    </h2>
                    <p className="text-lg md:text-xl font-body text-charcoal dark:text-[#f9fffe]/80 leading-relaxed">
                        Ageing comes with different needs. Whether it's post-surgery recovery, long-term memory support, or just a little help around the house, we have a plan for you.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-[60px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >

                    {/* Large Cards (Span 2) */}
                    {SERVICES_BENTO.large.map((service, idx) => (
                        <motion.div
                            variants={fadeInUp}
                            key={idx}
                            className={cn(
                                "col-span-1 md:col-span-2 p-[30px] rounded-[24px] flex flex-col justify-between min-h-[320px] group transition-all duration-300 hover:shadow-xl shadow-triverge dark:shadow-none dark:bg-white/10 dark:backdrop-blur-sm overflow-hidden relative",
                                service.bg || "bg-[#f9f9f9] dark:bg-white/10"
                            )}
                        >
                            {/* 3D Icon or Standard Icon */}
                            {service.icon3d ? (
                                <motion.div
                                    className="w-full flex justify-end -mt-10 -mr-10"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Image
                                        src={service.icon3d}
                                        alt={service.title}
                                        width={220}
                                        height={220}
                                        className="w-[220px] h-[220px] object-contain drop-shadow-2xl opacity-90 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </motion.div>
                            ) : (
                                <div className="w-[60px] h-[60px] rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Icon icon={service.icon} className="text-3xl text-healing-teal dark:text-healing-teal" />
                                </div>
                            )}

                            <h3 className="text-2xl font-bold font-heading text-triverge-blue dark:text-[#f9fffe] max-w-[80%] relative z-10">
                                {service.title}
                            </h3>
                        </motion.div>
                    ))}

                    {/* Medium Cards (Span 1) */}
                    {SERVICES_BENTO.medium.map((service, idx) => (
                        <motion.div
                            variants={fadeInUp}
                            key={idx}
                            className="col-span-1 p-[24px] rounded-[24px] bg-white dark:bg-white/10 dark:backdrop-blur-sm border border-triverge-blue/10 dark:border-white/10 shadow-triverge dark:shadow-none hover:shadow-lg hover:border-healing-teal/30 transition-all duration-300 flex flex-col justify-between min-h-[240px] group overflow-hidden relative"
                        >
                            {/* 3D Icon or Standard Icon */}
                            {service.icon3d ? (
                                <motion.div
                                    className="self-end -mr-4 -mt-4"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                                >
                                    <Image
                                        src={service.icon3d}
                                        alt={service.title}
                                        width={120}
                                        height={120}
                                        className="w-[120px] h-[120px] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                                    />
                                </motion.div>
                            ) : (
                                <div className="w-[50px] h-[50px] rounded-full bg-triverge-blue/5 dark:bg-slate-700 flex items-center justify-center mb-4 group-hover:bg-healing-teal group-hover:text-white transition-colors duration-300">
                                    <Icon icon={service.icon} className="text-2xl text-triverge-blue dark:text-[#f9fffe] group-hover:text-white" />
                                </div>
                            )}

                            <h3 className="text-lg font-bold font-heading text-[#2d4375] dark:text-[#f9fffe] leading-tight relative z-10 mt-auto">
                                {service.title}
                            </h3>
                        </motion.div>
                    ))}

                    {/* List Card (Full Width) */}
                    <motion.div
                        variants={fadeInUp}
                        className="col-span-1 md:col-span-2 lg:col-span-4 p-[40px] rounded-[24px] bg-[#2d4375] dark:bg-white/10 dark:backdrop-blur-sm dark:border dark:border-white/20 text-white flex flex-col md:flex-row items-center justify-between gap-[30px] relative overflow-hidden"
                    >
                        {/* Background Texture Element */}
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="w-full">
                            <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                                <Icon icon="solar:star-fall-bold-duotone" className="text-healing-teal" />
                                Comprehensive Assistance
                            </h3>
                            <div className="flex flex-wrap gap-x-[40px] gap-y-[15px]">
                                {SERVICES_BENTO.list.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 min-w-[280px]">
                                        <Icon icon="solar:check-circle-bold" className="text-xl text-healing-teal shrink-0" />
                                        <span className="text-white/90 font-medium text-lg">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/contact"
                        className="relative px-[40px] py-[16px] bg-healing-teal text-white rounded-full text-lg font-bold font-heading shadow-lg hover:shadow-healing-teal/40 hover:scale-105 transition-all duration-300 overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Speak to a care manager
                            <Icon icon="solar:arrow-right-bold" className="text-xl group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Beam Animation */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
