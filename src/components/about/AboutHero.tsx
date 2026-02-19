"use client";

import { motion } from "framer-motion";

export function AboutHero() {
    return (
        <header className="pt-[120px] pb-[100px] px-[20px] md:px-[40px] bg-porcelain transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">

                {/* Left Column: Narrative */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col gap-6"
                >
                    <span className="text-healing-teal font-heading font-bold uppercase tracking-widest text-sm">
                        Who We Are
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-triverge-blue leading-tight">
                        Dedicated to improving the quality of life for older adults.
                    </h1>

                    <div className="text-xl font-body text-charcoal/80 leading-relaxed font-light">
                        <p className="mb-6">
                            Triverge Healthcare is dedicated to providing compassionate, professional support for seniors. We provide clinical care, rehabilitation, and companionship, all focused on comfort, dignity, and expertise.
                        </p>
                    </div>

                    <div className="border-l-4 border-healing-teal pl-6 py-2">
                        <p className="text-2xl font-body italic text-triverge-blue leading-relaxed">
                            "We believe that ageing should be supported, not endured. Our goal is to make families feel reassured and seniors feel respected."
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: Vision */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl shadow-healing-teal/20">
                        <img
                            src="/images/emotional-support.jpg"
                            alt="Caregiver holding senior's hand"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-triverge-blue/10 mix-blend-multiply" />
                    </div>
                </motion.div>

            </div>
        </header>
    );
}
