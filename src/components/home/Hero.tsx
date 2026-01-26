"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const SERVICES = [
    "Skilled Nursing",
    "Dementia Care",
    "Post-Hospital Rehab",
    "Physiotherapy",
    "Occupational Therapy",
    "Daily Living Assistance",
    "Respite Care",
    "Palliative Care",
    "Residential Care",
    "Caregiver Education"
];

// Distinct gradients/colors for each service placeholder
const SERVICE_STYLES = [
    "bg-gradient-to-br from-blue-100 to-blue-200",
    "bg-gradient-to-br from-teal-100 to-teal-200",
    "bg-gradient-to-br from-indigo-100 to-indigo-200",
    "bg-gradient-to-br from-rose-100 to-rose-200",
    "bg-gradient-to-br from-orange-100 to-orange-200",
    "bg-gradient-to-br from-emerald-100 to-emerald-200",
    "bg-gradient-to-br from-cyan-100 to-cyan-200",
    "bg-gradient-to-br from-purple-100 to-purple-200",
    "bg-gradient-to-br from-amber-100 to-amber-200",
    "bg-gradient-to-br from-lime-100 to-lime-200"
];

// Image mapping for services
const SERVICE_IMAGES: Record<string, string> = {
    "Skilled Nursing": "/images/skilled-nursing.jpg",
    "Dementia Care": "/images/dementia-care.jpg",
    "Post-Hospital Rehab": "/images/post-hospital-rehab.jpg",
    "Physiotherapy": "/images/physiotherapy.jpg",
    "Occupational Therapy": "/images/occupational-therapy.jpg",
    "Daily Living Assistance": "/images/daily-living-assistance.jpg",
    "Respite Care": "/images/respite-care.jpg",
    "Palliative Care": "/images/palliative-care.jpg",
    "Residential Care": "/images/residential-care.jpg",
    "Caregiver Education": "/images/caregiver-education.jpg",
};

// Custom object-position for specific images
const SERVICE_IMAGE_POSITIONS: Record<string, string> = {
    "Occupational Therapy": "object-right",
    "Palliative Care": "object-right",
};

export function Hero() {
    const [activeService, setActiveService] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Magnetic Badge Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove(e: React.MouseEvent) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic pull (limit range)
        if (Math.abs(distanceX) < 200 && Math.abs(distanceY) < 200) {
            x.set(distanceX * 0.2);
            y.set(distanceY * 0.2);
        } else {
            x.set(0);
            y.set(0);
        }
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Auto-rotate logic (3 seconds)
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveService((prev) => (prev + 1) % SERVICES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <header className="relative w-full pt-[120px] pb-[80px] px-[20px] md:px-[40px] max-w-[1440px] mx-auto min-h-screen flex items-center overflow-hidden">
            {/* Visual Enhancements: Detail Grid (Void Effect) */}
            <div className="absolute inset-0 z-0 bg-grid-void opacity-40 dark:opacity-20 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] w-full relative z-10">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-6 flex flex-col gap-[30px] justify-center">

                    {/* Headline - Adjusted size and max-width to fit 2 lines */}
                    <h1 className="text-[36px] md:text-[50px] lg:text-[60px] font-bold font-heading text-triverge-blue dark:text-white leading-[1.1] relative w-full lg:max-w-3xl tracking-tight transition-colors duration-300">
                        We Are Your One-Stop <br />
                        <span className="relative inline-block text-triverge-blue dark:text-healing-teal transition-colors duration-300">
                            Elderly Care
                            {/* Refined Doodle: Underline style */}
                            <svg className="absolute -bottom-2 left-0 w-full h-[20px] text-healing-teal" viewBox="0 0 200 20" preserveAspectRatio="none">
                                <motion.path
                                    d="M2,15 Q50,0 100,10 T198,15"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                                />
                            </svg>
                        </span> Provider
                    </h1>

                    {/* Description */}
                    <p className="text-[20px] text-charcoal/70 dark:text-white/70 font-body max-w-lg leading-relaxed transition-colors duration-300">
                        At Triverge Healthcare, we understand how important it is to receive dependable, high-quality support at your convenience.
                    </p>

                    {/* Active Service Grid */}
                    <div className="flex flex-wrap gap-[12px] mt-[10px]">
                        {SERVICES.map((service, idx) => {
                            const isActive = idx === activeService;
                            return (
                                <button
                                    key={service}
                                    onMouseEnter={() => { setActiveService(idx); setIsPaused(true); }}
                                    onMouseLeave={() => setIsPaused(false)}
                                    // Visual Refinements: Font Heading (Manrope), Force Light Porcelain + Blue Text in ALL modes
                                    className={cn(
                                        "relative px-[24px] py-[12px] rounded-full text-[15px] font-heading font-medium transition-all duration-300 group border",
                                        isActive
                                            ? "text-triverge-blue bg-porcelain shadow-[0_0_20px_rgba(46,166,154,0.4)] scale-105 border-transparent"
                                            : "bg-porcelain border-triverge-blue/20 text-triverge-blue hover:border-triverge-blue/50"
                                    )}
                                >
                                    <span className="relative z-10">{service}</span>
                                    {/* Engaging Pulsing Glow Animation - Border Only */}
                                    {isActive && (
                                        <div className="absolute inset-[-2px] rounded-full border-[2px] border-healing-teal animate-glow-pulse pointer-events-none" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Refined Glass Card CTA */}
                    <div
                        className="mt-[40px] p-[30px] rounded-[32px] bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row justify-between items-center gap-[20px] transition-colors duration-300"
                    >
                        <div>
                            <p className="text-[18px] font-bold font-heading text-triverge-blue dark:text-white mb-1 transition-colors">
                                Book a free 30mins consultation
                            </p>
                            <p className="text-[14px] text-charcoal/60 dark:text-white/60 font-body transition-colors">Expert advice for your family's needs</p>
                        </div>

                        <Link
                            href="/contact"
                            className="px-[40px] py-[16px] bg-triverge-blue dark:bg-healing-teal text-white rounded-full text-[16px] font-bold font-heading shadow-lg hover:shadow-healing-teal/30 hover:bg-healing-teal dark:hover:bg-triverge-blue dark:text-white transform hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2 group"
                        >
                            Book Now
                            {/* Small "Noodle" highlight on hover */}
                            <Icon icon="solar:arrow-right-bold" className="text-xl group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Secondary CTA */}
                    <Link href="/services" className="flex items-center gap-[12px] text-charcoal/80 hover:text-healing-teal transition-colors group w-fit ml-2">
                        <div className="w-[36px] h-[36px] rounded-full bg-healing-teal/10 flex items-center justify-center group-hover:bg-healing-teal group-hover:text-white transition-colors">
                            <Icon icon="solar:arrow-right-up-bold-duotone" className="text-lg" />
                        </div>
                        <span className="font-body text-[18px] italic underline decoration-gray-300 group-hover:decoration-healing-teal underline-offset-4">
                            Explore more of our services
                        </span>
                    </Link>

                </div>

                {/* RIGHT COLUMN */}
                <div
                    className="lg:col-span-6 relative h-[600px] lg:h-[700px] w-full flex items-center justify-center"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Dynamic Image Container */}
                    <div className="w-full h-full max-h-[700px] rounded-[48px] overflow-hidden relative shadow-2xl border-[8px] border-white/50">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={activeService}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className={cn(
                                    "absolute inset-0 flex items-center justify-center",
                                    !SERVICE_IMAGES[SERVICES[activeService]] && SERVICE_STYLES[activeService % SERVICE_STYLES.length]
                                )}
                            >
                                {/* Render Image if available */}
                                {SERVICE_IMAGES[SERVICES[activeService]] ? (
                                    <Image
                                        src={SERVICE_IMAGES[SERVICES[activeService]]}
                                        alt={SERVICES[activeService]}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className={cn(
                                            "object-cover",
                                            SERVICE_IMAGE_POSITIONS[SERVICES[activeService]] || ""
                                        )}
                                    />
                                ) : (
                                    // Placeholder gradient/icon if no image
                                    <Icon icon="solar:gallery-wide-bold-duotone" className="text-[120px] text-triverge-blue/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                )}

                                {/* Overlay gradient for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-triverge-blue/60 via-transparent to-transparent z-10" />

                                <motion.span
                                    className="absolute bottom-12 left-12 z-20 text-white font-bold text-3xl md:text-4xl"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {SERVICES[activeService]}
                                </motion.span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Magnetic Badge */}
                    <motion.div
                        ref={ref}
                        style={{ x: springX, y: springY }}
                        className="absolute top-[60px] left-[60px] z-30 pointer-events-none" // pointer-events-none to let mouse pass through to container for tracking
                    >
                        <Link
                            href="/services"
                            className="w-[100px] h-[100px] rounded-full bg-porcelain/90 backdrop-blur-sm border border-triverge-blue flex items-center justify-center relative group shadow-xl pointer-events-auto" // Re-enable pointer events for click
                        >
                            {/* Rotating Text */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                    <text className="text-[11px] font-bold uppercase tracking-[3px] fill-triverge-blue">
                                        <textPath href="#circlePath" startOffset="0%">
                                            • Explore Service • Explore Service
                                        </textPath>
                                    </text>
                                </svg>
                            </motion.div>

                            {/* Center Arrow */}
                            <Icon
                                icon="solar:arrow-right-up-linear"
                                className="text-3xl text-healing-teal group-hover:scale-125 transition-transform"
                            />
                        </Link>
                    </motion.div>
                </div>

            </div>
        </header>
    );
}
