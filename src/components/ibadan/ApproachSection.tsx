"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const APPROACH_ITEMS = [
    { title: "Calm Environment", icon: "solar:sun-fog-bold", desc: "Noise-controlled spaces for peace." },
    { title: "Nutritious Meals", icon: "solar:chef-hat-heart-bold", desc: "Dietician-planned menu daily." },
    { title: "24/7 Nursing", icon: "solar:stethoscope-bold", desc: "Medical support always on hand." },
    { title: "Social Activities", icon: "solar:music-note-bold", desc: "Music, games, and community." },
    { title: "Secure Grounds", icon: "solar:lock-keyhole-bold", desc: "Safe walking paths and gardens." },
    { title: "Physiotherapy", icon: "solar:running-bold", desc: "On-site rehab equipment." },
    // Add more as needed
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
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

export function ApproachSection() {
    return (
        <section className="py-[120px] px-[20px] md:px-[40px] bg-white transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[60px]">

                {/* Left Column: Sticky Philosophy */}
                <div className="col-span-1 lg:col-span-5 relative">
                    <div className="lg:sticky lg:top-[150px] flex flex-col gap-[30px]">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[40px] md:text-[56px] font-bold font-heading text-triverge-blue leading-none mb-6">
                                Whole-person <br />
                                <span className="text-healing-teal">elderly care.</span>
                            </h2>
                            <p className="text-xl font-body text-charcoal/80 leading-relaxed">
                                Older adults need more than just medication—they need purpose, connection, and comfort. We’ve built every inch of our Ibadan centre to support these pillars of well-being.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Column: The Day-to-Day Grid */}
                <div className="col-span-1 lg:col-span-7">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {APPROACH_ITEMS.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariant}
                                className="group p-[30px] rounded-[24px] bg-[#f9f9f9] border border-transparent hover:border-healing-teal/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-[50px] h-[50px] rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                    <Icon icon={item.icon} className="text-2xl text-healing-teal" />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-triverge-blue mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-charcoal/70 font-body">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
