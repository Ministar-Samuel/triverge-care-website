"use client";

import { useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { BlogPost } from "@/app/blog/page";

export function HeroBlog({ post }: { post: BlogPost }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX / rect.width - 0.5);
        y.set(e.clientY / rect.height - 0.5);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <header className="relative w-full bg-[#2d4375] pt-[120px] pb-[80px] px-[20px] md:px-[40px] overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-void" />
            </div>

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[40px] relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-7 flex flex-col justify-center items-start gap-[24px]"
                >
                    <span className="px-[16px] py-[6px] rounded-full bg-[#2ea69a] text-white text-[14px] font-bold font-heading uppercase tracking-wider">
                        Featured Article
                    </span>

                    <h1 className="text-[36px] md:text-[50px] lg:text-[60px] font-bold font-heading text-white leading-[1.1] tracking-tight">
                        {post.title}
                    </h1>

                    <p className="text-[18px] md:text-[22px] text-white/80 font-body max-w-2xl leading-relaxed">
                        {post.excerpt || ""}
                    </p>

                    <Link
                        href={`/blog/${post.slug}`}
                        className="mt-[10px] flex items-center gap-[12px] px-[32px] py-[16px] bg-[#2ea69a] text-white rounded-full font-bold font-heading hover:bg-white hover:text-[#2d4375] transition-all duration-300 group shadow-lg hover:shadow-[#2ea69a]/40"
                    >
                        Read Article
                        <Icon icon="solar:arrow-right-bold" className="text-xl group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="lg:col-span-5 flex items-center justify-center">
                    <motion.div
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[32px] overflow-hidden group shadow-2xl"
                    >
                        {post.hero_image && (
                            <motion.img
                                src={post.hero_image}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ transform: "translateZ(-50px) scale(1.1)" }}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div
                            style={{ transform: "translateZ(50px)" }}
                            className="absolute bottom-0 left-0 right-0 p-[30px] flex items-center justify-between pointer-events-none"
                        >
                            <div className="flex items-center gap-[12px] bg-white/10 backdrop-blur-md border border-white/20 p-[12px] rounded-2xl">
                                <div className="w-[40px] h-[40px] rounded-full bg-[#2ea69a] flex items-center justify-center text-white font-bold">
                                    {(post.author || "A").charAt(0)}
                                </div>
                                <div className="text-white">
                                    <p className="text-[14px] font-bold font-heading">{post.author || "Unknown"}</p>
                                    <p className="text-[12px] opacity-70">{post.category || ""}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute top-[30px] right-[30px] p-[15px] bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                            style={{ transform: "translateZ(80px)" }}
                        >
                            <Icon icon="solar:star-fall-bold-duotone" className="text-white text-2xl" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
