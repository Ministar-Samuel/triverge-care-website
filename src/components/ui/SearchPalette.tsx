"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

type SearchResult = {
    title: string;
    description?: string;
    tagline?: string;
    excerpt?: string;
    href: string;
    icon: string;
};

type SearchResults = {
    pages: SearchResult[];
    services: SearchResult[];
    posts: SearchResult[];
};

const SUGGESTED = [
    { title: "Our Services", href: "/services", icon: "solar:medical-kit-bold-duotone" },
    { title: "Book Consultation", href: "/book", icon: "solar:calendar-add-bold-duotone" },
    { title: "HCAP Training", href: "/hcap", icon: "solar:diploma-bold-duotone" },
    { title: "Contact Us", href: "/contact", icon: "solar:chat-line-bold-duotone" },
    { title: "Blog", href: "/blog", icon: "solar:notebook-bold-duotone" },
];

export function SearchPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResults>({ pages: [], services: [], posts: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setResults({ pages: [], services: [], posts: [] });
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const search = useCallback(async (q: string) => {
        if (q.trim().length < 2) {
            setResults({ pages: [], services: [], posts: [] });
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
            if (res.ok) {
                const data = await res.json();
                setResults(data);
                setActiveIndex(0);
            }
        } catch {
            // Silently fail
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleInputChange = (value: string) => {
        setQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => search(value), 300);
    };

    const navigateTo = (href: string) => {
        onClose();
        router.push(href);
    };

    // Flatten all results for keyboard navigation
    const allResults = [
        ...results.pages.map((r) => ({ ...r, description: r.description || "" })),
        ...results.services.map((r) => ({ ...r, description: r.tagline || "" })),
        ...results.posts.map((r) => ({ ...r, description: r.excerpt || "" })),
    ];

    const hasResults = allResults.length > 0;
    const showSuggested = query.length < 2 && !hasResults;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const items = hasResults ? allResults : SUGGESTED;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % items.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + items.length) % items.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            const selected = items[activeIndex];
            if (selected) navigateTo(selected.href);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[101] w-[92vw] max-w-[640px]"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                <Icon
                                    icon="solar:magnifer-linear"
                                    className="text-xl text-healing-teal flex-shrink-0"
                                />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search pages, services, blog posts..."
                                    className="flex-1 text-[15px] font-body text-charcoal placeholder:text-charcoal/30 bg-transparent outline-none"
                                />
                                {isLoading && (
                                    <Icon
                                        icon="solar:refresh-bold-duotone"
                                        className="text-lg text-healing-teal animate-spin flex-shrink-0"
                                    />
                                )}
                                <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-gray-100 text-[11px] text-charcoal/40 font-mono border border-gray-200">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results Area */}
                            <motion.div
                                layout
                                className="max-h-[50vh] overflow-y-auto"
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                {/* Suggested (when no query) */}
                                {showSuggested && (
                                    <div className="p-3">
                                        <p className="px-2 text-[11px] font-bold text-charcoal/30 uppercase tracking-wider mb-1">
                                            Quick Links
                                        </p>
                                        {SUGGESTED.map((item, i) => (
                                            <button
                                                key={item.href}
                                                onClick={() => navigateTo(item.href)}
                                                onMouseEnter={() => setActiveIndex(i)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${activeIndex === i
                                                        ? "bg-healing-teal/8 text-triverge-blue"
                                                        : "text-charcoal/70 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activeIndex === i
                                                        ? "bg-healing-teal/15"
                                                        : "bg-gray-100"
                                                    }`}>
                                                    <Icon icon={item.icon} className={`text-base ${activeIndex === i ? "text-healing-teal" : "text-charcoal/40"
                                                        }`} />
                                                </div>
                                                <span className="text-sm font-medium">{item.title}</span>
                                                <Icon icon="solar:arrow-right-linear" className="ml-auto text-sm text-charcoal/20" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Search Results */}
                                {!showSuggested && hasResults && (
                                    <div className="p-3">
                                        {/* Pages */}
                                        {results.pages.length > 0 && (
                                            <ResultSection
                                                label="Pages"
                                                items={results.pages.map((r) => ({
                                                    title: r.title,
                                                    sub: r.description || "",
                                                    href: r.href,
                                                    icon: r.icon,
                                                }))}
                                                offset={0}
                                                activeIndex={activeIndex}
                                                setActiveIndex={setActiveIndex}
                                                onNavigate={navigateTo}
                                            />
                                        )}

                                        {/* Services */}
                                        {results.services.length > 0 && (
                                            <ResultSection
                                                label="Services"
                                                items={results.services.map((r) => ({
                                                    title: r.title,
                                                    sub: r.tagline || "",
                                                    href: r.href,
                                                    icon: r.icon,
                                                }))}
                                                offset={results.pages.length}
                                                activeIndex={activeIndex}
                                                setActiveIndex={setActiveIndex}
                                                onNavigate={navigateTo}
                                            />
                                        )}

                                        {/* Blog Posts */}
                                        {results.posts.length > 0 && (
                                            <ResultSection
                                                label="Blog Posts"
                                                items={results.posts.map((r) => ({
                                                    title: r.title,
                                                    sub: r.excerpt || "",
                                                    href: r.href,
                                                    icon: r.icon,
                                                }))}
                                                offset={results.pages.length + results.services.length}
                                                activeIndex={activeIndex}
                                                setActiveIndex={setActiveIndex}
                                                onNavigate={navigateTo}
                                            />
                                        )}
                                    </div>
                                )}

                                {/* No Results */}
                                {!showSuggested && !hasResults && !isLoading && query.length >= 2 && (
                                    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                            <Icon icon="solar:magnifer-zoom-in-linear" className="text-2xl text-charcoal/25" />
                                        </div>
                                        <p className="text-sm text-charcoal/50 font-medium">
                                            No results for &ldquo;{query}&rdquo;
                                        </p>
                                        <p className="text-xs text-charcoal/30 mt-1">
                                            Try different keywords or browse our services
                                        </p>
                                    </div>
                                )}
                            </motion.div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-3 text-[11px] text-charcoal/30">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-[10px]">↑↓</kbd>
                                        navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-[10px]">↵</kbd>
                                        select
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-[10px]">esc</kbd>
                                        close
                                    </span>
                                </div>
                                <span className="text-[10px] text-charcoal/20 font-medium">
                                    Triverge Search
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ——— Result Section Sub-Component ——— */
function ResultSection({
    label,
    items,
    offset,
    activeIndex,
    setActiveIndex,
    onNavigate,
}: {
    label: string;
    items: { title: string; sub: string; href: string; icon: string }[];
    offset: number;
    activeIndex: number;
    setActiveIndex: (i: number) => void;
    onNavigate: (href: string) => void;
}) {
    return (
        <div className="mb-2">
            <p className="px-2 text-[11px] font-bold text-charcoal/30 uppercase tracking-wider mb-1">
                {label}
            </p>
            {items.map((item, i) => {
                const globalIndex = offset + i;
                const isActive = activeIndex === globalIndex;
                return (
                    <button
                        key={item.href}
                        onClick={() => onNavigate(item.href)}
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${isActive
                                ? "bg-healing-teal/8 text-triverge-blue"
                                : "text-charcoal/70 hover:bg-gray-50"
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? "bg-healing-teal/15" : "bg-gray-100"
                            }`}>
                            <Icon icon={item.icon} className={`text-base ${isActive ? "text-healing-teal" : "text-charcoal/40"
                                }`} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            {item.sub && (
                                <p className="text-xs text-charcoal/40 truncate">{item.sub}</p>
                            )}
                        </div>
                        <Icon icon="solar:arrow-right-linear" className="ml-auto text-sm text-charcoal/20 flex-shrink-0" />
                    </button>
                );
            })}
        </div>
    );
}
