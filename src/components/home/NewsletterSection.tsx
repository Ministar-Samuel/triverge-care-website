"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function NewsletterSection() {
    return (
        <section className="py-[80px] px-[20px] md:px-[40px] bg-triverge-blue text-porcelain relative overflow-hidden">

            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-healing-teal/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[60px] pointer-events-none translate-x-1/3 translate-y-1/3" />

            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-[40px] relative z-10">

                {/* Text Content */}
                <motion.div
                    className="lg:max-w-[600px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInLeft}
                >
                    <h2 className="text-[32px] md:text-[40px] font-bold font-heading mb-4 leading-tight">
                        Health Tips for Your <span className="text-healing-teal">Loved Ones</span>
                    </h2>
                    <p className="text-lg font-body text-porcelain/80">
                        Join our community to receive expert advice on elderly care, dementia support, and family wellness directly to your inbox.
                    </p>
                </motion.div>

                {/* Signup Form */}
                <motion.div
                    className="w-full lg:w-auto flex-1 max-w-[500px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInRight}
                >
                    <form className="relative flex items-center bg-white/10 rounded-full p-2 border border-white/20 focus-within:bg-white/15 focus-within:border-healing-teal/50 transition-all duration-300">
                        <div className="pl-6 text-white/50">
                            <Icon icon="solar:letter-bold" className="text-2xl" />
                        </div>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 bg-transparent border-none text-white placeholder:text-white/50 px-4 py-3 focus:outline-none text-lg"
                        />
                        <button
                            className="bg-healing-teal hover:bg-healing-teal/90 text-white font-bold font-heading rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 w-[44px] h-[44px] md:w-auto md:h-auto md:px-8 md:py-3"
                        >
                            <span className="hidden md:inline">Subscribe</span>
                            <Icon icon="solar:plain-3-bold" className="text-xl" />
                        </button>
                    </form>
                    <p className="text-sm text-white/40 mt-3 ml-6 font-medium">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
