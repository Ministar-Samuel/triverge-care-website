"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const clipPathReveal = {
    hidden: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 20 },
    visible: {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
};

export function HCAPHero() {
    return (
        <header className="relative pt-[120px] pb-[100px] px-[20px] md:px-[40px] bg-triverge-blue dark:bg-slate-900 overflow-hidden">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">

                {/* Left Column */}
                <div className="flex flex-col gap-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex items-center gap-2"
                    >
                        <span className="text-healing-teal font-heading font-bold tracking-widest uppercase">
                            HCAP Certification
                        </span>
                    </motion.div>

                    <div className="relative">
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={clipPathReveal}
                            className="text-5xl md:text-7xl font-bold font-heading text-[#f9fffe] leading-tight"
                        >
                            Become a <br />
                            <span className="relative inline-block">
                                Certified
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-6 -right-8 text-healing-teal"
                                >
                                    <Icon icon="solar:star-bold" className="text-4xl" />
                                </motion.div>
                            </span> <br />
                            Elderly Caregiver
                        </motion.h1>
                    </div>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="text-xl md:text-2xl font-body text-[#f9fffe]/90 font-light max-w-[500px] leading-relaxed"
                    >
                        Older adults deserve caregivers who understand their needs. The Home Care Assistant Programme (HCAP) prepares students with the knowledge and skills to support seniors safely and respectfully.
                    </motion.p>
                </div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative"
                >
                    <div className="relative aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl border-[4px] border-white/10 group">
                        <img
                            src="/images/training-academy.jpg"
                            alt="HCAP Student"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-triverge-blue/20 mix-blend-multiply" />

                        {/* Rotating Badge */}
                        <div className="absolute top-6 left-6 w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer z-10">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 w-full h-full flex items-center justify-center"
                            >
                                <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]">
                                    <path
                                        id="textPath"
                                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        fill="transparent"
                                    />
                                    <text fill="#2d4375" fontSize="11" fontWeight="bold" letterSpacing="1.2">
                                        <textPath href="#textPath" startOffset="0%">
                                            CERTIFIED • HCAP • TRIVERGE •
                                        </textPath>
                                    </text>
                                </svg>
                            </motion.div>
                            <Icon icon="solar:diploma-verified-bold" className="text-3xl text-healing-teal relative z-20" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </header>
    );
}
