"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES } from "@/lib/data";

const TOOLBAR_ACTIONS = [
    { cmd: "bold", icon: "solar:text-bold-bold", label: "Bold" },
    { cmd: "italic", icon: "solar:text-italic-bold", label: "Italic" },
    { cmd: "underline", icon: "solar:text-underline-bold", label: "Underline" },
    { cmd: "strikeThrough", icon: "solar:text-cross-bold", label: "Strikethrough" },
    { cmd: "divider" },
    { cmd: "formatBlock:H2", icon: "solar:text-field-bold", label: "Heading 2", value: "H2" },
    { cmd: "formatBlock:H3", icon: "solar:text-field-bold", label: "Heading 3", value: "H3" },
    { cmd: "formatBlock:P", icon: "solar:text-bold", label: "Paragraph", value: "P" },
    { cmd: "divider" },
    { cmd: "insertUnorderedList", icon: "solar:list-bold", label: "Bullet List" },
    { cmd: "insertOrderedList", icon: "solar:list-1-bold", label: "Numbered List" },
    { cmd: "formatBlock:BLOCKQUOTE", icon: "solar:chat-square-bold", label: "Blockquote", value: "BLOCKQUOTE" },
    { cmd: "divider" },
    { cmd: "createLink", icon: "solar:link-bold", label: "Insert Link" },
    { cmd: "insertImage", icon: "solar:gallery-add-bold", label: "Insert Inline Image" },
];

export default function NewBlogPostPage() {
    const router = useRouter();
    const editorRef = useRef<HTMLDivElement>(null);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [heroUploading, setHeroUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [heroMode, setHeroMode] = useState<"upload" | "url">("upload");
    const [heroUrl, setHeroUrl] = useState("");
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(false);
    const [error, setError] = useState("");
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    const heroInputRef = useRef<HTMLInputElement>(null);

    // Auto-generate slug from title
    const handleTitleChange = (val: string) => {
        setTitle(val);
        if (!slugManuallyEdited) {
            setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
        }
    };

    const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            setError("Hero image must be under 2MB.");
            return;
        }
        setHeroUploading(true);
        setUploadProgress(0);
        setError("");

        // Simulate progress while uploading
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) { clearInterval(progressInterval); return 90; }
                return prev + Math.random() * 15;
            });
        }, 200);

        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
            clearInterval(progressInterval);
            setUploadProgress(100);
            const data = await res.json();
            if (res.ok) {
                setHeroImage(data.url);
            } else {
                setError(data.error || "Upload failed");
            }
        } catch {
            clearInterval(progressInterval);
            setError("Upload failed");
        } finally {
            setTimeout(() => { setHeroUploading(false); setUploadProgress(0); }, 500);
        }
    };

    const handleHeroUrl = () => {
        if (!heroUrl.trim()) return;
        setHeroImage(heroUrl.trim());
        setHeroUrl("");
    };

    const execCommand = (cmd: string) => {
        if (cmd.startsWith("formatBlock:")) {
            const tag = cmd.split(":")[1];
            document.execCommand("formatBlock", false, tag);
        } else if (cmd === "createLink") {
            const url = prompt("Enter URL:");
            if (url) document.execCommand("createLink", false, url);
        } else if (cmd === "insertImage") {
            // Trigger a file input for inline image
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async () => {
                const file = input.files?.[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                    alert("Image must be under 2MB.");
                    return;
                }
                const formData = new FormData();
                formData.append("file", file);
                const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
                const data = await res.json();
                if (res.ok) {
                    document.execCommand("insertImage", false, data.url);
                } else {
                    alert(data.error || "Upload failed");
                }
            };
            input.click();
        } else {
            document.execCommand(cmd, false);
        }
        editorRef.current?.focus();
    };

    const handleSave = async (isDraft: boolean) => {
        if (!title.trim() || !slug.trim()) {
            setError("Title and slug are required.");
            return;
        }
        setSaving(true);
        setError("");

        const content = editorRef.current?.innerHTML || "";

        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    slug,
                    content,
                    hero_image: heroImage,
                    category: category || null,
                    excerpt,
                    author,
                    published_at: isDraft ? null : new Date().toISOString(),
                }),
            });

            if (res.ok) {
                router.push("/admin/blog");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save post.");
            }
        } catch {
            setError("Failed to save post.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-[960px] mx-auto flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-charcoal/50">
                    <button onClick={() => router.push("/admin/blog")} className="hover:text-triverge-blue transition-colors font-medium">Blog</button>
                    <Icon icon="solar:alt-arrow-right-linear" />
                    <span className="text-charcoal font-bold">New Post</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setPreview(!preview)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors",
                            preview ? "bg-triverge-blue text-white" : "bg-gray-100 text-charcoal/60 hover:bg-gray-200"
                        )}
                    >
                        <Icon icon={preview ? "solar:pen-bold" : "solar:eye-bold"} />
                        {preview ? "Edit" : "Preview"}
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-charcoal/70 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSave(false)}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 bg-triverge-blue text-white rounded-xl text-sm font-bold hover:bg-healing-teal transition-colors shadow-lg disabled:opacity-50"
                    >
                        <Icon icon="solar:upload-bold" />
                        {saving ? "Publishing..." : "Publish"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm font-bold flex items-center gap-2">
                    <Icon icon="solar:danger-triangle-bold" />
                    {error}
                </div>
            )}

            {/* Post Meta */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => handleTitleChange(e.target.value)}
                            placeholder="Your amazing blog post title"
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-base font-bold"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Slug *</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={e => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
                            placeholder="your-blog-post-slug"
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm font-mono"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            placeholder="e.g. Dr. A. Otaru"
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Category</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm font-bold"
                        >
                            <option value="">Select Category</option>
                            {BLOG_CATEGORIES.filter(c => c !== "All").map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Excerpt</label>
                    <textarea
                        value={excerpt}
                        onChange={e => setExcerpt(e.target.value)}
                        rows={2}
                        placeholder="Short summary of the post for previews..."
                        className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm resize-none"
                    />
                </div>
            </div>

            {/* Hero Image */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Hero Image</label>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => setHeroMode("upload")}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                heroMode === "upload" ? "bg-white text-triverge-blue shadow-sm" : "text-charcoal/40 hover:text-charcoal/60"
                            )}
                        >
                            <Icon icon="solar:cloud-upload-bold" className="text-sm" />
                            Upload
                        </button>
                        <button
                            onClick={() => setHeroMode("url")}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                heroMode === "url" ? "bg-white text-triverge-blue shadow-sm" : "text-charcoal/40 hover:text-charcoal/60"
                            )}
                        >
                            <Icon icon="solar:link-bold" className="text-sm" />
                            Image URL
                        </button>
                    </div>
                </div>

                {heroImage ? (
                    <div className="relative rounded-2xl overflow-hidden group">
                        <img src={heroImage} alt="Hero" className="w-full h-[300px] object-cover" />
                        <button
                            onClick={() => setHeroImage(null)}
                            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Icon icon="solar:trash-bin-trash-bold" />
                        </button>
                    </div>
                ) : heroMode === "url" ? (
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <input
                                type="url"
                                value={heroUrl}
                                onChange={(e) => setHeroUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm"
                                onKeyDown={(e) => e.key === "Enter" && handleHeroUrl()}
                            />
                            <button
                                onClick={handleHeroUrl}
                                disabled={!heroUrl.trim()}
                                className="px-5 py-3 bg-triverge-blue text-white rounded-xl text-sm font-bold hover:bg-healing-teal transition-colors disabled:opacity-40"
                            >
                                Add Image
                            </button>
                        </div>
                        <p className="text-xs text-charcoal/40">Paste a direct link to an image (PNG, JPG, WebP)</p>
                    </div>
                ) : (
                    <button
                        onClick={() => heroInputRef.current?.click()}
                        disabled={heroUploading}
                        className="w-full h-[200px] rounded-2xl border-2 border-dashed border-gray-200 hover:border-healing-teal flex flex-col items-center justify-center gap-3 text-charcoal/40 hover:text-healing-teal transition-colors"
                    >
                        {heroUploading ? (
                            <div className="flex flex-col items-center gap-3 w-full px-12">
                                <Icon icon="solar:cloud-upload-bold-duotone" className="text-4xl text-healing-teal" />
                                <span className="text-sm font-bold text-healing-teal">Uploading... {Math.round(uploadProgress)}%</span>
                                <div className="w-full max-w-[300px] h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-healing-teal to-triverge-blue rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <Icon icon="solar:cloud-upload-bold-duotone" className="text-4xl" />
                                <span className="text-sm font-bold">Click to upload hero image</span>
                                <span className="text-xs">PNG, JPG, or WebP — max 2MB</span>
                            </>
                        )}
                    </button>
                )}
                <input ref={heroInputRef} type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
            </div>

            {/* Editor */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                {!preview && (
                    <div className="border-b border-gray-100 p-3 flex items-center gap-1 flex-wrap bg-gray-50/50">
                        {TOOLBAR_ACTIONS.map((action, i) => {
                            if (action.cmd === "divider") {
                                return <div key={i} className="w-px h-6 bg-gray-200 mx-1" />;
                            }
                            return (
                                <button
                                    key={action.cmd}
                                    onClick={() => execCommand(action.cmd)}
                                    title={action.label}
                                    className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-charcoal/60 hover:text-triverge-blue transition-all"
                                >
                                    <Icon icon={action.icon!} className="text-lg" />
                                </button>
                            );
                        })}
                    </div>
                )}

                {preview ? (
                    <div
                        className="p-8 prose prose-lg max-w-none blog-content"
                        dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || "<p class='text-charcoal/40'>Nothing to preview yet...</p>" }}
                    />
                ) : (
                    <div
                        ref={editorRef}
                        contentEditable
                        className="p-8 min-h-[400px] focus:outline-none prose prose-lg max-w-none blog-content"
                        style={{ lineHeight: 1.8 }}
                        data-placeholder="Start writing your blog post..."
                        suppressContentEditableWarning
                    />
                )}
            </div>
        </div>
    );
}
