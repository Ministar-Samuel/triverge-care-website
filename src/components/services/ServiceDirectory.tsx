"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SERVICES_LIST = [
    { title: "Skilled Nursing", icon: "solar:stethoscope-bold-duotone", desc: "Clinical support at home or in our centre, including medication management and wound care.", isMedical: true },
    { title: "Dementia Care", icon: "solar:brain-bold-duotone", desc: "Support for memory loss, confusion, wandering, and behavioural changes." },
    { title: "Post-Hospital Rehab", icon: "solar:wheelchair-bold-duotone", desc: "Recovery support after surgery, stroke, fractures, or acute illness." },
    { title: "Physiotherapy", icon: "solar:running-bold-duotone", desc: "Movement, pain relief, balance training, and strength building." },
    { title: "Occupational Therapy", icon: "solar:armchair-2-bold-duotone", desc: "Support with daily activities, adaptive equipment, and home safety." },
    { title: "Daily Living Assistance", icon: "solar:bath-bold-duotone", desc: "Help with bathing, dressing, feeding, hygiene, and mobility." },
    { title: "Companionship", icon: "solar:cup-hot-bold-duotone", desc: "Emotional support, conversation, reading, games, and social outings." },
    { title: "Respite Care", icon: "solar:clock-circle-bold-duotone", desc: "Short-term support that gives families space to rest and recharge." },
    { title: "Palliative Care", icon: "solar:heart-pulse-bold-duotone", desc: "Comfort-focused support for seniors with life-limiting illnesses." },
    { title: "Residential Care", icon: "solar:home-add-bold-duotone", desc: "Long-term living in the Triverge Geriatric Centre with 24/7 support." },
    { title: "Caregiver Education", icon: "solar:diploma-bold-duotone", desc: "Structured training through the HCAP programme for family and professional caregivers.", isFullWidth: true },
];

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

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

export function ServiceDirectory() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-white dark:bg-background transition-colors duration-300">
            <div className="max-w-[1280px] mx-auto">

                <div className="text-center mb-[60px]">
                    <h2 className="text-2xl font-bold font-heading text-triverge-blue dark:text-white">
                        Below are the services we offer.
                    </h2>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {SERVICES_LIST.map((service, idx) => (
                        <motion.article
                            key={idx}
                            variants={cardVariant}
                            className={cn(
                                "group p-[30px] rounded-[24px] bg-[#f9f9f9] dark:bg-white/5 border border-transparent hover:bg-white dark:hover:bg-white/10 hover:border-healing-teal transition-all duration-300 relative overflow-hidden",
                                service.isFullWidth ? "col-span-1 md:col-span-2 lg:col-span-3 bg-triverge-blue dark:bg-triverge-blue hover:bg-triverge-blue hover:border-transparent text-white" : "hover:shadow-xl"
                            )}
                        >
                            {/* Beam Animation for All Services */}
                            <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-healing-teal/20 to-transparent translate-x-[-100%] group-hover:animate-beam" />
                            </div>

                            <Link href={`/services/${service.title.toLowerCase().replace(/ /g, "-")}`} className="block h-full relative z-10">
                                <div className="flex flex-col gap-4 transition-transform duration-300 h-full">
                                    <div className={cn(
                                        "w-[60px] h-[60px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
                                        service.isFullWidth ? "text-white" : "text-healing-teal"
                                    )}>
                                        <Icon icon={service.icon} className="text-4xl" />
                                    </div>

                                    <h3 className={cn(
                                        "text-xl font-bold font-heading",
                                        service.isFullWidth ? "text-white" : "text-triverge-blue dark:text-white"
                                    )}>
                                        {service.title}
                                    </h3>

                                    <p className={cn(
                                        "font-body text-md leading-relaxed",
                                        service.isFullWidth ? "text-white/80 max-w-[600px]" : "text-[#212121] dark:text-white/80"
                                    )}>
                                        {service.desc}
                                    </p>

                                    {service.isFullWidth && (
                                        <div className="mt-4 flex justify-end">
                                            <span className="flex items-center gap-2 text-white font-bold hover:text-healing-teal transition-colors">
                                                Learn about HCAP
                                                <Icon icon="solar:arrow-right-bold" />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>

                        </motion.article>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
