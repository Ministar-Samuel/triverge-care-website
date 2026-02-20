"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { TESTIMONIALS } from "@/lib/data";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function TestimonialCarousel() {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-porcelain transition-colors duration-300 overflow-hidden">
            <div className="max-w-[1440px] mx-auto">

                {/* Headline */}
                <div className="text-center max-w-[800px] mx-auto mb-[70px]">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Icon icon="solar:chat-square-like-bold-duotone" className="text-3xl text-healing-teal" />
                        <span className="text-healing-teal font-heading font-bold text-sm uppercase tracking-widest">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold font-heading text-triverge-blue mb-4">
                        Stories of Hope & Healing
                    </h2>
                </div>

                {/* Carousel Rows */}
                <div className="flex flex-col gap-[30px]">

                    {/* Row 1 — scrolls left */}
                    <div
                        className="relative w-full overflow-hidden"
                        onMouseEnter={() => setHoveredRow(1)}
                        onMouseLeave={() => setHoveredRow(null)}
                    >
                        {/* Gradient Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-r from-porcelain to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-l from-porcelain to-transparent z-10 pointer-events-none" />

                        <div
                            className={cn(
                                "flex w-max animate-marquee-left",
                                hoveredRow === 1 && "marquee-paused"
                            )}
                        >
                            {/* Two identical sets — when the first scrolls out, the second takes its place seamlessly */}
                            {[0, 1].map((setIndex) => (
                                <div key={setIndex} className="flex gap-[24px] pr-[24px]">
                                    {TESTIMONIALS.map((testimonial, idx) => (
                                        <TestimonialCard
                                            key={`r1-s${setIndex}-${idx}`}
                                            testimonial={testimonial}
                                            paused={hoveredRow === 1}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 — scrolls right (reversed order) */}
                    <div
                        className="relative w-full overflow-hidden"
                        onMouseEnter={() => setHoveredRow(2)}
                        onMouseLeave={() => setHoveredRow(null)}
                    >
                        {/* Gradient Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-r from-porcelain to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-l from-porcelain to-transparent z-10 pointer-events-none" />

                        <div
                            className={cn(
                                "flex w-max animate-marquee-right",
                                hoveredRow === 2 && "marquee-paused"
                            )}
                        >
                            {[0, 1].map((setIndex) => (
                                <div key={setIndex} className="flex gap-[24px] pr-[24px]">
                                    {[...TESTIMONIALS].reverse().map((testimonial, idx) => (
                                        <TestimonialCard
                                            key={`r2-s${setIndex}-${idx}`}
                                            testimonial={testimonial}
                                            paused={hoveredRow === 2}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

function TestimonialCard({ testimonial, paused }: { testimonial: typeof TESTIMONIALS[0]; paused: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                w-[220px] md:w-[260px] flex-shrink-0
                bg-white/80 backdrop-blur-md
                py-[36px] px-[24px]
                rounded-[24px]
                shadow-sm border border-triverge-blue/8
                flex flex-col justify-between
                transition-all duration-300 ease-out
                cursor-default
                ${isHovered
                    ? "scale-[1.08] shadow-2xl shadow-healing-teal/15 border-healing-teal/30 -translate-y-2 z-20 bg-white"
                    : paused
                        ? "opacity-60 scale-[0.97]"
                        : "hover:shadow-md"
                }
            `}
            style={{ minHeight: "380px" }}
        >
            {/* Stars */}
            <div>
                <div className="flex gap-1 mb-5 text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} icon="solar:star-bold" className="text-lg" />
                    ))}
                </div>

                {/* Quote */}
                <div className="relative flex-1">
                    <Icon icon="solar:quote-up-bold" className="absolute -top-3 -left-1 text-3xl text-triverge-blue/10" />
                    <p className="text-base font-body italic text-charcoal leading-relaxed relative z-10 line-clamp-6">
                        &ldquo;{testimonial.content}&rdquo;
                    </p>
                </div>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                <div className="w-[44px] h-[44px] rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                    <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="min-w-0">
                    <h4 className="font-bold font-heading text-[#2d4375] text-sm truncate">
                        {testimonial.name}
                    </h4>
                    <p className="text-xs font-body text-charcoal/60 truncate">
                        {testimonial.role}
                    </p>
                </div>
            </div>
        </div>
    );
}
