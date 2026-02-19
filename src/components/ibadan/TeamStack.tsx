"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";

const TEAM = [
    { name: "Dr. A. O. Adeyemi", role: "Medical Director", image: "/images/trained-caregivers-complex.jpg" }, // Reuse existing images for avatars
    { name: "Nurse Chidinma", role: "Head Nurse", image: "/images/trained-caregivers.jpg" },
    { name: "Mr. Tunde", role: "Physiotherapist", image: "/images/physiotherapy.jpg" },
    { name: "Sister Rose", role: "Care Manager", image: "/images/emotional-support.jpg" },
];

export function TeamStack() {
    return (
        <section className="py-[120px] px-[20px] md:px-[40px] bg-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-[60px]">

                {/* Left: Text */}
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-healing-teal font-heading font-bold text-sm uppercase tracking-widest mb-2 block">
                            Our Care Team
                        </span>
                        <h2 className="text-[40px] md:text-[56px] font-bold font-heading text-triverge-blue mb-6">
                            Humans, not <br /> just <span className="text-healing-teal">Healthcare.</span>
                        </h2>
                        <p className="text-xl font-body text-charcoal/80 leading-relaxed mb-6">
                            Our team includes geriatric specialists, registered nurses, and compassionate caregivers who treat every resident like their own parents.
                        </p>
                        <button className="flex items-center gap-2 text-triverge-blue font-bold font-heading group">
                            Meet the full team
                            <Icon icon="solar:arrow-right-bold" className="group-hover:translate-x-1 transition-transform text-healing-teal" />
                        </button>
                    </motion.div>
                </div>

                {/* Right: Avatar Stack */}
                <div className="w-full md:w-1/2 h-[400px] flex items-center justify-center relative perspective-1000">
                    <motion.div
                        className="relative w-[280px] h-[360px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {TEAM.map((member, idx) => (
                            <motion.div
                                key={idx}
                                className="absolute top-0 left-0 w-full h-full rounded-[24px] overflow-hidden shadow-2xl border-[6px] border-white"
                                custom={idx}
                                variants={{
                                    hidden: { rotate: 0, x: 0, y: 0, scale: 1 - idx * 0.05 },
                                    visible: {
                                        rotate: (idx - 1.5) * 10, // Fan out rotation
                                        x: (idx - 1.5) * 40,      // Fan out X
                                        y: Math.abs(idx - 1.5) * 10, // Curve
                                        scale: 1,
                                        transition: { delay: idx * 0.1, duration: 0.8, type: "spring" }
                                    }
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    zIndex: 10,
                                    rotate: 0,
                                    y: -20,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    sizes="280px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-triverge-blue/80 to-transparent flex flex-col justify-end p-6">
                                    <p className="text-white font-heading font-bold text-lg">{member.name}</p>
                                    <p className="text-white/80 text-sm">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
