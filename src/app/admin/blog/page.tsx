"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type BlogPost = {
    id: string;
    title: string;
    slug: string;
    hero_image: string | null;
    category: string | null;
    excerpt: string | null;
    author: string | null;
    featured: boolean;
    views: number;
    published_at: string | null;
    created_at: string;
};

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/blog");
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts || []);
            }
        } catch (err) {
            console.error("Failed to fetch posts:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    const totalPosts = posts.length;
    const publishedCount = posts.filter(p => p.published_at).length;
    const featuredCount = posts.filter(p => p.featured).length;
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

    const toggleFeatured = async (id: string, current: boolean) => {
        try {
            await fetch(`/api/blog/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ featured: !current }),
            });
            fetchPosts();
        } catch (err) {
            console.error("Failed to toggle featured:", err);
        }
    };

    const deletePost = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            await fetch(`/api/blog/${id}`, { method: "DELETE" });
            fetchPosts();
        } catch (err) {
            console.error("Failed to delete post:", err);
        }
    };

    const statCards = [
        { label: "Total Posts", value: totalPosts.toString(), icon: "solar:document-text-bold-duotone", color: "text-triverge-blue", bg: "bg-blue-50" },
        { label: "Published", value: publishedCount.toString(), icon: "solar:check-circle-bold-duotone", color: "text-green-600", bg: "bg-green-50" },
        { label: "Featured", value: featuredCount.toString(), icon: "solar:star-bold-duotone", color: "text-yellow-600", bg: "bg-yellow-50" },
        { label: "Total Views", value: totalViews.toLocaleString(), icon: "solar:eye-bold-duotone", color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold font-heading text-charcoal mb-2">Blog Management</h2>
                    <p className="text-charcoal/60">Create, edit, and manage your blog posts.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 px-6 py-3 bg-triverge-blue text-white rounded-xl font-bold hover:bg-healing-teal transition-colors shadow-lg"
                >
                    <Icon icon="solar:pen-new-square-bold" className="text-lg" />
                    New Post
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white p-5 rounded-[20px] border border-gray-100 flex items-center gap-4 shadow-sm">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <Icon icon={stat.icon} className="text-xl" />
                        </div>
                        <div>
                            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                            <p className="text-xl font-bold font-heading text-charcoal mt-0.5">
                                {loading ? "..." : stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Icon icon="solar:loading-bold" className="text-3xl animate-spin text-charcoal/30" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-charcoal/40">
                        <Icon icon="solar:document-text-bold-duotone" className="text-5xl mb-3" />
                        <p className="text-lg font-bold">No blog posts yet</p>
                        <p className="text-sm">Click "New Post" to create your first article.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Post</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Category</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Views</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Date</th>
                                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-charcoal/40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {posts.map((post) => (
                                    <tr key={post.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                                    {post.hero_image ? (
                                                        <img src={post.hero_image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-charcoal/20">
                                                            <Icon icon="solar:gallery-bold" className="text-xl" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-charcoal truncate max-w-[250px]">{post.title}</p>
                                                    <p className="text-xs text-charcoal/40">{post.author || "Unknown"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-charcoal/70">
                                                {post.category || "—"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border",
                                                    post.published_at
                                                        ? "text-green-700 bg-green-50 border-green-200"
                                                        : "text-yellow-700 bg-yellow-50 border-yellow-200"
                                                )}>
                                                    {post.published_at ? "Published" : "Draft"}
                                                </span>
                                                {post.featured && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold text-yellow-700 bg-yellow-50 border border-yellow-200">
                                                        <Icon icon="solar:star-bold" className="text-xs" />
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-charcoal/70">{(post.views || 0).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-charcoal/70">
                                            {post.created_at ? format(new Date(post.created_at), "MMM dd, yyyy") : "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/admin/blog/${post.id}/edit`}
                                                    className="p-2 rounded-lg hover:bg-blue-50 text-charcoal/50 hover:text-triverge-blue transition-colors"
                                                    title="Edit"
                                                >
                                                    <Icon icon="solar:pen-bold" className="text-lg" />
                                                </Link>
                                                <button
                                                    onClick={() => toggleFeatured(post.id, post.featured)}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-colors",
                                                        post.featured
                                                            ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                                                            : "hover:bg-yellow-50 text-charcoal/50 hover:text-yellow-600"
                                                    )}
                                                    title={post.featured ? "Remove Featured" : "Make Featured"}
                                                >
                                                    <Icon icon={post.featured ? "solar:star-bold" : "solar:star-linear"} className="text-lg" />
                                                </button>
                                                <button
                                                    onClick={() => deletePost(post.id)}
                                                    className="p-2 rounded-lg hover:bg-red-50 text-charcoal/50 hover:text-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Icon icon="solar:trash-bin-trash-bold" className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
