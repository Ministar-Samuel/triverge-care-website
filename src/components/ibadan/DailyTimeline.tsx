"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const TIMELINE_STEPS = [
    { time: "08:00 AM", title: "Morning Check-in", desc: "Vitals check and medication administration." },
    { time: "09:00 AM", title: "Breakfast", desc: "Nutritious, dietician-planned meal." },
    { time: "10:30 AM", title: "Gentle Exercise", desc: "Group mobility and stretching session." },
    { time: "12:00 PM", title: "Lunch & Social", desc: "Community dining experience." },
    { time: "02:00 PM", title: "Rest & Relaxation", desc: "Nap time or quiet reading." },
    { time: "03:30 PM", title: "Activities", desc: "Games, music, or art therapy." },
    { time: "06:00 PM", title: "Dinner", desc: "Light evening meal." },
    { time: "08:00 PM", title: "Evening Routine", desc: "Preparation for a restful sleep." },
];

export function DailyTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <section ref={containerRef} className="py-[120px] px-[20px] md:px-[40px] bg-porcelain dark:bg-background">
            <div className="max-w-[1000px] mx-auto relative">

                <div className="text-center mb-[80px]">
                    <h2 className="text-[40px] md:text-[56px] font-bold font-heading text-triverge-blue dark:text-white mb-4">
                        A typical day at <br />
                        <span className="text-healing-teal">The Centre</span>
                    </h2>
                </div>

                {/* The Central Line */}
                <div className="absolute left-[20px] md:left-1/2 top-[180px] bottom-0 w-[2px] bg-gray-200 dark:bg-white/10 -translate-x-1/2" />

                {/* The "Drawing" Line */}
                <motion.div
                    className="absolute left-[20px] md:left-1/2 top-[180px] bottom-0 w-[2px] bg-healing-teal -translate-x-1/2 origin-top"
                    style={{ scaleY: scrollYProgress }}
                />

                <div className="flex flex-col gap-[60px] pb-[100px] mt-[60px]">
                    {TIMELINE_STEPS.map((step, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <TimelineNode
                                key={idx}
                                step={step}
                                isEven={isEven}
                            />
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

function TimelineNode({ step, isEven }: { step: any, isEven: boolean }) {
    return (
        <motion.div
            className={cn(
                "relative flex items-center md:justify-between group pl-[50px] md:pl-0",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
        >
            {/* Dot */}
            <div className="absolute left-[20px] md:left-1/2 w-[16px] h-[16px] rounded-full bg-white border-4 border-healing-teal -translate-x-1/2 z-10 group-hover:scale-150 transition-transform duration-300" />

            {/* Time (Opposite Side on Desktop) */}
            <div className={cn(
                "hidden md:block w-[45%] text-right font-heading font-bold text-healing-teal text-xl",
                isEven ? "text-right pr-10" : "text-left pl-10"
            )}>
                {isEven ? step.time : step.desc}
                {/* Swapping content for visual balance/variety or keeping simplistic? 
                   Let's keep time always visible clearly. 
                */}
            </div>

            {/* Content Card */}
            <div className="w-full md:w-[45%]">
                <div className="p-[24px] bg-white dark:bg-white/5 rounded-[20px] shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <span className="md:hidden text-sm font-bold text-healing-teal block mb-1">
                        {step.time}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-triverge-blue dark:text-white mb-2">
                        {step.title}
                    </h3>
                    <p className="text-charcoal/70 dark:text-white/70">
                        {step.desc}
                    </p>
                </div>
            </div>

        </motion.div>
    );
}
