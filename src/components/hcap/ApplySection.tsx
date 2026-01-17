"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function ApplySection() {
    return (
        <section className="py-[120px] px-[20px] md:px-[40px] bg-gradient-to-b from-[#f9fffe] to-[#e0f7fa] dark:from-background dark:to-background relative overflow-hidden">

            {/* Background Hand Graphic */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Icon icon="solar:hand-shake-bold" className="text-[400px] text-triverge-blue dark:text-white" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-triverge-blue dark:text-white mb-8">
                        Who can apply
                    </h2>

                    <p className="text-2xl md:text-3xl font-body italic text-[#212121] dark:text-white/90 leading-relaxed mb-[60px]">
                        "Anyone passionate about care. No medical background required — we train you from the ground up."
                    </p>

                    <Link
                        href="/contact?type=hcap"
                        className="relative inline-flex items-center gap-4 px-[60px] py-[20px] bg-triverge-blue rounded-full text-white text-lg font-bold font-heading overflow-hidden group hover:scale-105 hover:bg-[#1e2f52] transition-all duration-300 shadow-xl"
                    >
                        Apply now
                        <Icon icon="solar:arrow-right-bold" className="text-2xl group-hover:translate-x-2 transition-transform" />

                        {/* Shimmer */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] bg-gradient-to-r from-transparent via-healing-teal/30 to-transparent skew-x-12" />

                        {/* Auto Shimmer Loop */}
                        <motion.div
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-healing-teal/20 to-transparent skew-x-12"
                            animate={{ translateX: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
