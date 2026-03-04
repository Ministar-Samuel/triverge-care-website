"use client";

import { useEffect, useState } from "react";
import { HeroBlog } from "@/components/blog/HeroBlog";
import { RecentPosts } from "@/components/blog/RecentPosts";
import { BlogControls } from "@/components/blog/BlogControls";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { motion } from "framer-motion";

export type BlogPost = {
    id: string;
    title: string;
    slug: string;
    hero_image: string | null;
    content: string | null;
    category: string | null;
    excerpt: string | null;
    author: string | null;
    featured: boolean;
    views: number;
    published_at: string | null;
    created_at: string;
};

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/blog?published=true");
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data.posts || []);
                }
            } catch (err) {
                console.error("Failed to fetch blog posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 border-[#2ea69a] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const featured = posts.find(p => p.featured) || posts[0];
    const recent = posts.filter(p => p.id !== featured?.id).slice(0, 2);
    const remaining = posts.filter(p => p.id !== featured?.id && !recent.includes(p));

    const filteredRemaining = activeCategory === "All"
        ? remaining
        : remaining.filter(p => p.category === activeCategory);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full"
        >
            {featured && <HeroBlog post={featured} />}
            {recent.length > 0 && <RecentPosts posts={recent} />}
            <BlogControls activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <BlogGrid posts={filteredRemaining} />
            <BlogNewsletter />
        </motion.div>
    );
}
