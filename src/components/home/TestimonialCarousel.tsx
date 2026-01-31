"use client";

import { Icon } from "@iconify/react";
import { TESTIMONIALS } from "@/lib/data";
import { motion } from "framer-motion";

const DISPLAY_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export function TestimonialCarousel() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-porcelain dark:bg-background transition-colors duration-300 overflow-hidden">
            <div className="max-w-[1440px] mx-auto">

                {/* Headline */}
                <div className="text-center max-w-[800px] mx-auto mb-[60px]">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Icon icon="solar:chat-square-like-bold-duotone" className="text-3xl text-healing-teal" />
                        <span className="text-healing-teal font-heading font-bold text-sm uppercase tracking-widest">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold font-heading text-triverge-blue dark:text-white mb-4">
                        Stories of Hope & Healing
                    </h2>
                </div>

                {/* Carousel Container */}
                {/* Hide scrollbar but allow scrolling */}
                {/* Carousel Container (Infinite Marquee) */}
                <div className="relative w-full overflow-hidden mask-linear-fade">
                    {/* Gradient Masks (optional visual polish) */}
                    <div className="absolute left-0 top-0 bottom-0 w-[50px] md:w-[100px] bg-gradient-to-r from-porcelain dark:from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-[50px] md:w-[100px] bg-gradient-to-l from-porcelain dark:from-background to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-[30px] w-max"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        {/* Duplicate list for seamless loop */}
                        {DISPLAY_TESTIMONIALS.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="min-w-[280px] md:min-w-[340px] bg-white/70 dark:bg-white/5 backdrop-blur-md p-[30px] rounded-[24px] shadow-triverge dark:shadow-none border border-triverge-blue/10 dark:border-white/10 flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                            >
                                <div>
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6 text-yellow-400">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Icon key={i} icon="solar:star-bold" className="text-xl" />
                                        ))}
                                    </div>

                                    {/* Quote Content */}
                                    <div className="relative">
                                        <Icon icon="solar:quote-up-bold" className="absolute -top-4 -left-2 text-4xl text-triverge-blue/10 dark:text-white/10" />
                                        <p className="text-lg md:text-xl font-body italic text-charcoal dark:text-white/80 leading-relaxed relative z-10">
                                            "{testimonial.content}"
                                        </p>
                                    </div>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
                                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-heading text-[#2d4375] dark:text-white text-lg">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm font-body text-charcoal/80 dark:text-white/60">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
