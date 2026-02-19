"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function PreFooter() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-gradient-to-b from-porcelain to-[#e0f7fa] text-center relative overflow-hidden">
            <motion.div
                className="max-w-[800px] mx-auto relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
            >

                <h2 className="text-[40px] md:text-[56px] font-bold font-heading text-triverge-blue mb-6">
                    Let’s support your family
                </h2>

                <p className="text-xl font-body text-charcoal/80 mb-[40px]">
                    Talk to a care manager about what your family needs, or schedule a visit to see our centre.
                </p>

                {/* Buttons Grid */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-[20px] mb-[40px]">
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-[40px] py-[18px] bg-triverge-blue text-white rounded-full text-lg font-bold font-heading hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        Request a Call Back →
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-[40px] py-[18px] bg-transparent border-2 border-triverge-blue text-triverge-blue rounded-full text-lg font-bold font-heading hover:bg-triverge-blue hover:text-white transition-all duration-300"
                    >
                        Visit the Centre →
                    </Link>
                </div>

                {/* Phone Contact */}
                <div className="flex items-center justify-center gap-3 text-triverge-blue">
                    <div className="w-[50px] h-[50px] rounded-full bg-white shadow-md flex items-center justify-center animate-bounce-slow">
                        <Icon icon="solar:phone-calling-bold" className="text-2xl text-healing-teal" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-bold uppercase tracking-widest opacity-60">Call or WhatsApp</span>
                        <a href="tel:+2347053390270" className="text-2xl font-bold font-heading hover:text-healing-teal transition-colors">
                            +234 705 3390 270
                        </a>
                    </div>
                </div>

            </motion.div>
        </section>
    );
}
