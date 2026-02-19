"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const gentleScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export function CentreFeature() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-porcelain transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[40px] lg:gap-[60px] items-center">

                {/* Left Column: Content */}
                <motion.div
                    className="col-span-1 lg:col-span-6 flex flex-col gap-[30px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >

                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                        <div className="w-[10px] h-[10px] bg-healing-teal rounded-full animate-pulse" />
                        <span className="text-healing-teal font-heading font-bold text-sm uppercase tracking-widest">
                            Ibadan Facility
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold font-heading text-[#2d4375] leading-tight">
                        A{" "}
                        <span className="relative">
                            Dedicated
                            {/* Doodle Underline */}
                            <svg
                                className="absolute left-0 -bottom-2 w-full h-[12px] text-healing-teal w-full"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                />
                            </svg>
                        </span>{" "}
                        Centre for Elderly Care in Ibadan
                    </h2>

                    {/* Body Text */}
                    <div className="space-y-4 text-lg leading-relaxed font-body text-charcoal">
                        <p>
                            The Triverge Geriatric Centre is a safe, comfortable space where seniors receive medical support, rehabilitation, and day-to-day assistance in a warm, community setting.
                        </p>
                        <p>
                            Our centre brings together clinical professionals, physiotherapists, care assistants, and support teams under one roof to help older adults live well, recover from illness, and stay connected.
                        </p>
                    </div>

                    {/* Location Card */}
                    <div className="group p-[20px] rounded-[16px] bg-white hover:bg-triverge-blue/5 shadow-triverge transition-all duration-300 cursor-pointer border border-triverge-blue/10 hover:border-triverge-blue/20">
                        <div className="flex items-start gap-[15px]">
                            <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Icon icon="solar:map-point-bold" className="text-2xl text-healing-teal group-hover:animate-bounce" />
                            </div>
                            <div>
                                <span className="block text-sm font-bold font-heading text-triverge-blue mb-1 uppercase tracking-wide opacity-70">
                                    Location
                                </span>
                                <p className="text-lg font-bold font-heading text-[#2d4375]">
                                    15, Oyeniwe Street, Amuda, Bashorun, Ibadan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact & CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[30px] mt-[10px]">
                        {/* Contact Group */}
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-bold font-heading text-charcoal/60">
                                Book a visit
                            </span>
                            <div className="flex flex-col gap-1">
                                <a href="tel:+2347053390270" className="text-lg font-semibold font-heading text-[#2d4375] hover:text-healing-teal transition-colors hover:underline decoration-healing-teal underline-offset-4">
                                    +234 705 3390 270
                                </a>
                                <a href="tel:+2347053390269" className="text-lg font-semibold font-heading text-[#2d4375] hover:text-healing-teal transition-colors hover:underline decoration-healing-teal underline-offset-4">
                                    +234 705 3390 269
                                </a>
                            </div>
                        </div>

                        {/* CTA Link */}
                        <Link
                            href="/ibadan-centre"
                            className="group flex items-center gap-2 text-xl font-body italic text-healing-teal hover:text-triverge-blue transition-colors"
                        >
                            Explore the Centre
                            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </Link>
                    </div>

                </motion.div>

                {/* Right Column: Visual */}
                <motion.div
                    className="col-span-1 lg:col-span-6 relative h-[500px] lg:h-[600px] w-full group"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={gentleScale}
                >
                    <div className="absolute inset-0 bg-gray-200 rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                        {/* Ibadan Facility Image */}
                        <Image
                            src="/images/ibadan-facility.jpg"
                            alt="Triverge Geriatric Centre - Ibadan Facility"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-triverge-blue/50 to-transparent opacity-60" />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute bottom-[40px] -left-[20px] lg:-left-[40px] bg-white backdrop-blur-md border border-triverge-blue/10 p-[20px] rounded-[24px] shadow-[0_4px_20px_rgba(45,67,117,0.12)] flex items-center gap-[15px] animate-bounce-slow z-10">
                        <div className="w-[50px] h-[50px] rounded-full bg-healing-teal flex items-center justify-center text-white shadow-lg">
                            <Icon icon="solar:clock-circle-bold" className="text-2xl" />
                        </div>
                        <div className="pr-2">
                            <p className="text-sm font-bold font-heading text-triverge-blue uppercase tracking-wider">
                                Facility
                            </p>
                            <p className="text-xl font-bold font-heading text-triverge-blue">
                                Open 24/7
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
