"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";

type BlogPost = {
    id: string;
    title: string;
    slug: string;
    hero_image: string | null;
    content: string | null;
    category: string | null;
    excerpt: string | null;
    author: string | null;
    views: number;
    published_at: string | null;
    created_at: string;
};

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // First get all published posts to find by slug
                const res = await fetch(`/api/blog?published=true`);
                if (res.ok) {
                    const data = await res.json();
                    const found = (data.posts as BlogPost[]).find(p => p.slug === slug);
                    if (found) {
                        setPost(found);
                        // Increment views
                        fetch(`/api/blog/${found.id}`);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch post:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen pt-[100px]">
                <div className="w-8 h-8 border-4 border-[#2ea69a] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pt-[100px] text-center px-4">
                <Icon icon="solar:document-text-bold-duotone" className="text-6xl text-gray-300 mb-4" />
                <h1 className="text-3xl font-bold font-heading text-[#2d4375]">Post Not Found</h1>
                <p className="text-charcoal/60 mt-2 mb-6">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Link
                    href="/blog"
                    className="flex items-center gap-2 px-6 py-3 bg-[#2ea69a] text-white rounded-full font-bold font-heading hover:bg-[#2d4375] transition-colors"
                >
                    <Icon icon="solar:arrow-left-bold" />
                    Back to Blog
                </Link>
            </div>
        );
    }

    const readTime = post.content ? `${Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200))} min read` : "1 min read";
    const publishDate = post.published_at
        ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : "";

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full"
        >
            {/* Hero Banner */}
            <header className="relative w-full bg-[#2d4375] pt-[120px] pb-[60px] px-[20px] md:px-[40px] overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-void" />
                </div>
                <div className="max-w-[800px] mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-[20px]"
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            {post.category && (
                                <span className="px-[14px] py-[6px] rounded-full bg-[#2ea69a] text-white text-[13px] font-bold font-heading uppercase tracking-wider">
                                    {post.category}
                                </span>
                            )}
                            <span className="text-white/50 text-[14px]">{readTime}</span>
                        </div>

                        <h1 className="text-[32px] md:text-[48px] font-bold font-heading text-white leading-[1.15] tracking-tight">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-[18px] md:text-[20px] text-white/70 font-body leading-relaxed max-w-[700px]">
                                {post.excerpt}
                            </p>
                        )}

                        <div className="flex items-center gap-[16px] mt-[10px]">
                            <div className="w-[44px] h-[44px] rounded-full bg-[#2ea69a] flex items-center justify-center text-white font-bold text-lg">
                                {(post.author || "A").charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-bold font-heading text-[15px]">{post.author || "Unknown"}</p>
                                <p className="text-white/50 text-[13px]">{publishDate}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Hero Image */}
            {post.hero_image && (
                <div className="max-w-[900px] mx-auto w-full px-[20px] -mt-[40px] relative z-10">
                    <motion.img
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        src={post.hero_image}
                        alt={post.title}
                        className="w-full rounded-[24px] shadow-2xl object-cover max-h-[500px]"
                    />
                </div>
            )}

            {/* Content */}
            <div className="max-w-[740px] mx-auto w-full px-[20px] py-[60px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="blog-content prose prose-lg max-w-none"
                    style={{
                        lineHeight: 1.85,
                        fontSize: "18px",
                        color: "#2d4375",
                    }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || "<p>No content available.</p>") }}
                />
            </div>

            {/* Footer */}
            <div className="max-w-[740px] mx-auto w-full px-[20px] pb-[80px]">
                <div className="border-t border-gray-200 pt-[40px] flex flex-col md:flex-row items-center justify-between gap-[20px]">
                    <div className="flex items-center gap-[12px]">
                        <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-[#2d4375] to-[#2ea69a] flex items-center justify-center text-white font-bold text-xl">
                            {(post.author || "A").charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold font-heading text-[#2d4375]">Written by {post.author || "Unknown"}</p>
                            <p className="text-[14px] text-charcoal/50">{publishDate} · {readTime}</p>
                        </div>
                    </div>
                    <Link
                        href="/blog"
                        className="flex items-center gap-2 px-[24px] py-[12px] bg-[#f9fffe] border border-[#2ea69a]/20 rounded-full font-bold font-heading text-[#2d4375] hover:bg-[#2ea69a] hover:text-white transition-all duration-300 text-[15px]"
                    >
                        <Icon icon="solar:arrow-left-bold" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}
