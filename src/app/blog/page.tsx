"use client";

import { HeroBlog } from "@/components/blog/HeroBlog";
import { RecentPosts } from "@/components/blog/RecentPosts";
import { BlogControls } from "@/components/blog/BlogControls";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { motion } from "framer-motion";

export default function BlogPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full"
        >
            <HeroBlog />
            <RecentPosts />
            <BlogControls />
            <BlogGrid />
            <BlogNewsletter />
        </motion.div>
    );
}
