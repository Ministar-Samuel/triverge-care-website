"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES } from "@/lib/data";

interface MagneticButtonProps {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}

function MagneticButton({ children, isActive, onClick }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x: springX, y: springY }}
            className={cn(
                "px-[24px] py-[10px] rounded-full text-[15px] font-heading font-bold transition-all duration-300 border whitespace-nowrap",
                isActive
                    ? "bg-[#2ea69a] text-white border-transparent shadow-lg shadow-[#2ea69a]/20"
                    : "bg-transparent text-[#2d4375] border-[#2d4375]/50 hover:border-[#2ea69a] hover:text-[#2ea69a]"
            )}
        >
            {children}
        </motion.button>
    );
}

export function BlogControls({
    activeCategory,
    onCategoryChange,
}: {
    activeCategory: string;
    onCategoryChange: (cat: string) => void;
}) {
    return (
        <div className="py-[40px] px-[20px] md:px-[40px] max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[30px]">
            <div className="hidden lg:flex items-center gap-[12px] overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide no-scrollbar">
                {BLOG_CATEGORIES.map((category) => (
                    <MagneticButton
                        key={category}
                        isActive={activeCategory === category}
                        onClick={() => onCategoryChange(category)}
                    >
                        {category}
                    </MagneticButton>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-[15px] w-full lg:hidden">
                <div className="relative w-full sm:w-[240px]">
                    <div className="absolute left-[15px] top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon icon="solar:filter-bold" className="text-[#2ea69a] text-xl" />
                    </div>
                    <select
                        value={activeCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full pl-[45px] pr-[15px] py-[12px] bg-white border border-gray-200 rounded-2xl appearance-none focus:outline-none focus:border-[#2ea69a] font-heading font-bold text-[#2d4375]"
                    >
                        {BLOG_CATEGORIES.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <div className="absolute right-[15px] top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon icon="solar:alt-arrow-down-bold" className="text-[#2d4375]/50" />
                    </div>
                </div>
            </div>
        </div>
    );
}
