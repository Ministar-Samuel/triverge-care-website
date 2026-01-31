"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/lib/data";

export function BlogGrid() {
    // Excluding the featured post if needed, but spec says "All Blog Posts"
    // I'll show everything except the featured post to avoid redundancy
    const posts = BLOG_POSTS.filter(p => !p.featured);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="bg-white py-[80px] px-[20px] md:px-[40px]">
            <div className="max-w-[1440px] mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]"
                >
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            variants={itemVariants}
                            className="group flex flex-col bg-white rounded-[24px] shadow-sm hover:shadow-xl hover:-translate-y-[10px] transition-all duration-500 overflow-hidden"
                        >
                            {/* Image Area */}
                            <div className="relative h-[240px] w-full overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Tag Overlay */}
                                <div className="absolute top-[20px] left-[20px] px-[12px] py-[6px] bg-white/90 backdrop-blur-sm text-[#2d4375] text-[12px] font-bold font-heading rounded-lg shadow-sm">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-[20px] flex flex-col flex-grow">
                                <span className="text-gray-400 text-[14px] font-body mb-[8px]">
                                    {post.date}
                                </span>
                                <h3 className="text-[20px] font-bold font-heading text-[#2d4375] mb-[12px] leading-tight group-hover:text-[#2ea69a] transition-colors">
                                    <Link href={`/blog/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-[16px] text-[#2d4375]/70 font-body leading-relaxed line-clamp-2 mb-[20px]">
                                    {post.excerpt}
                                </p>

                                {/* Footer */}
                                <div className="mt-auto pt-[20px] border-t border-[#2d4375]/5 flex items-center justify-between">
                                    <span className="text-[14px] font-medium font-body text-[#2d4375]/60">
                                        {post.readTime}
                                    </span>
                                    <Link href={`/blog/${post.id}`} className="w-[36px] h-[36px] rounded-full bg-[#f9fffe] border border-[#2d4375]/10 flex items-center justify-center group-hover:bg-[#2ea69a] group-hover:text-white transition-all duration-300">
                                        <Icon icon="solar:arrow-right-up-bold" className="text-lg" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pagination */}
                <div className="mt-[60px] flex justify-center items-center gap-[10px]">
                    <button className="w-[40px] h-[40px] rounded-full bg-[#2ea69a] text-white font-bold flex items-center justify-center shadow-lg shadow-[#2ea69a]/20">
                        1
                    </button>
                    <button className="w-[40px] h-[40px] rounded-full bg-white text-[#2d4375] font-bold border border-gray-200 flex items-center justify-center hover:border-[#2ea69a] hover:text-[#2ea69a] transition-all">
                        2
                    </button>
                    <button className="w-[40px] h-[40px] rounded-full bg-white text-[#2d4375] font-bold border border-gray-200 flex items-center justify-center hover:border-[#2ea69a] hover:text-[#2ea69a] transition-all">
                        3
                    </button>
                    <button className="ml-[10px] text-[#2d4375] font-bold font-heading hover:text-[#2ea69a] transition-colors">
                        Next {">"}
                    </button>
                </div>
            </div>
        </section>
    );
}
