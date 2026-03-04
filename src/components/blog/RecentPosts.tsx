"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/app/blog/page";

export function RecentPosts({ posts }: { posts: BlogPost[] }) {
    const primaryPost = posts[0];
    const secondaryPost = posts[1];

    if (!primaryPost) return null;

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <section className="bg-[#f9fffe] py-[60px] px-[20px] md:px-[40px]">
            <div className="max-w-[1440px] mx-auto">
                <motion.h2
                    {...fadeInUp}
                    className="text-[32px] md:text-[40px] font-bold font-heading text-[#2d4375] mb-[40px]"
                >
                    Recent Updates
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px]">
                    <motion.div {...fadeInUp} className="lg:col-span-7 flex flex-col gap-[20px]">
                        <Link href={`/blog/${primaryPost.slug}`} className="group relative w-full aspect-[16/9] rounded-[24px] overflow-hidden shadow-lg">
                            {primaryPost.hero_image && (
                                <motion.img
                                    src={primaryPost.hero_image}
                                    alt={primaryPost.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute top-[20px] left-[20px] px-[12px] py-[6px] bg-[#2ea69a] text-white text-[12px] font-bold font-heading rounded-lg">
                                {primaryPost.category || "Blog"}
                            </div>
                        </Link>
                        <div className="flex flex-col gap-[12px]">
                            <span className="text-[#2ea69a] font-medium font-heading tracking-wide uppercase text-[14px]">
                                {primaryPost.published_at ? new Date(primaryPost.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
                            </span>
                            <h3 className="text-[28px] md:text-[32px] font-bold font-heading text-[#2d4375] leading-tight hover:text-[#2ea69a] transition-colors">
                                <Link href={`/blog/${primaryPost.slug}`}>{primaryPost.title}</Link>
                            </h3>
                            <p className="text-[18px] text-charcoal/80 font-body leading-relaxed max-w-2xl">
                                {primaryPost.excerpt || ""}
                            </p>
                        </div>
                    </motion.div>

                    {secondaryPost && (
                        <motion.div {...fadeInUp} className="lg:col-span-5 flex flex-col h-full bg-[#2d4375] text-white rounded-[24px] overflow-hidden shadow-xl">
                            <Link href={`/blog/${secondaryPost.slug}`} className="relative h-[240px] w-full group overflow-hidden">
                                {secondaryPost.hero_image && (
                                    <img src={secondaryPost.hero_image} alt={secondaryPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                )}
                                <div className="absolute inset-0 bg-black/20" />
                            </Link>
                            <div className="p-[30px] flex flex-col justify-between flex-grow gap-[20px]">
                                <div className="flex flex-col gap-[12px]">
                                    <span className="text-[#2ea69a] font-bold text-[14px] uppercase tracking-wider">{secondaryPost.category || "Blog"}</span>
                                    <h3 className="text-[24px] font-bold font-heading leading-tight italic">{secondaryPost.title}</h3>
                                    <p className="text-white/70 font-body text-[16px] leading-[1.6]">{secondaryPost.excerpt || ""}</p>
                                </div>
                                <Link
                                    href={`/blog/${secondaryPost.slug}`}
                                    className="flex items-center gap-[8px] text-[#2ea69a] font-bold font-heading hover:text-white transition-colors group"
                                >
                                    Read Guide
                                    <Icon icon="solar:arrow-right-bold" className="text-xl group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
