"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// Placeholder data for team
const TEAM_MEMBERS = [
    { name: "Dr. A. Adeyemi", role: "Medical Director", image: "/images/doctor-consult.jpg" },
    { name: "Nurse Sarah", role: "Head of Nursing", image: "/images/trained-caregivers-complex.jpg" },
    { name: "Mrs. Okonjo", role: "Care Manager", image: "/images/emotional-support.jpg" },
    { name: "Mr. Tunde", role: "Physiotherapist", image: "/images/physiotherapy.jpg" },
    { name: "Grace O.", role: "Senior Caregiver", image: "/images/ibadan-facility.jpg" },
];

const TESTIMONIALS = [
    {
        quote: "My mother became stronger and happier within weeks. The staff treated her like family.",
        author: "Mrs. Folake A."
    },
    {
        quote: "The physiotherapy helped my dad walk again after surgery. We are forever grateful.",
        author: "Mr. Emeka O."
    }
];

export function TeamSection() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-gradient-to-b from-[#f9fffe] to-[#e0f7fa] overflow-hidden">
            <div className="max-w-[1440px] mx-auto">

                {/* Team Intro */}
                <div className="text-center mb-[60px]">
                    <h2 className="text-3xl font-bold font-heading text-triverge-blue mb-4">Meet Our Team</h2>
                    <p className="max-w-[800px] mx-auto text-xl font-body text-charcoal/80 font-light leading-relaxed">
                        Our team includes doctors, nurses, therapists, social workers, and trained care assistants, all united by a passion for service.
                    </p>
                </div>

                {/* Team Horizontal Scroll (Marquee style or just overflow) */}
                <div className="flex gap-8 overflow-x-auto pb-8 snap-x hide-scrollbar mb-[100px]">
                    {TEAM_MEMBERS.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="min-w-[200px] snap-center flex flex-col items-center gap-4 group cursor-pointer"
                        >
                            <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-healing-teal transition-colors duration-300">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold font-heading text-triverge-blue text-lg">{member.name}</h4>
                                <p className="text-sm text-healing-teal font-medium uppercase tracking-wide opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Short Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] max-w-[1000px] mx-auto">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-[24px] shadow-sm relative"
                        >
                            {/* Watermark Quote */}
                            <Icon icon="solar:quote-up-bold" className="absolute top-4 left-4 text-8xl text-healing-teal/5 pointer-events-none" />

                            <p className="text-xl font-heading font-medium italic text-triverge-blue leading-relaxed relative z-10 mb-4">
                                "{testimonial.quote}"
                            </p>
                            <p className="text-sm font-bold text-healing-teal uppercase tracking-widest text-right">
                                — {testimonial.author}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
