"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function BlogNewsletter() {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitting(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });
            if (res.ok) {
                setSuccess(true);
                setEmail("");
            } else {
                const data = await res.json();
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Failed to subscribe. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <motion.section
            {...fadeInUp}
            className="bg-[#2d4375] rounded-[32px] mx-[20px] md:mx-[40px] mb-[80px] p-[60px] text-center relative overflow-hidden shadow-2xl"
        >
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#2ea69a] rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-[20px] items-center">
                <div className="w-[60px] h-[60px] rounded-full bg-white/10 flex items-center justify-center mb-[10px]">
                    <Icon icon="solar:letter-bold-duotone" className="text-[#2ea69a] text-3xl" />
                </div>

                <h2 className="text-[32px] md:text-[45px] font-bold font-heading text-white leading-tight">
                    Get Health Tips Delivered
                </h2>

                <p className="text-[18px] md:text-[20px] text-white/80 font-body leading-relaxed">
                    Join 1,200+ families receiving our weekly care guides, medical advice, and dementia support tips.
                </p>

                {success ? (
                    <div className="mt-[20px] w-full max-w-xl p-[20px] bg-[#2ea69a]/20 backdrop-blur-md rounded-[20px] border border-[#2ea69a]/30 text-white flex items-center justify-center gap-3">
                        <Icon icon="solar:check-circle-bold" className="text-[#2ea69a] text-2xl" />
                        <span className="font-bold font-heading">You&apos;re subscribed! Check your inbox.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-[20px] w-full max-w-xl flex flex-col sm:flex-row gap-[12px] p-[10px] bg-white/10 backdrop-blur-md rounded-[20px] border border-white/20">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            className="flex-grow px-[20px] py-[14px] bg-white text-[#2d4375] rounded-[14px] font-body text-[16px] focus:outline-none focus:ring-2 focus:ring-[#2ea69a]/50 placeholder:text-gray-400"
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-[30px] py-[14px] bg-[#2ea69a] text-white rounded-[14px] font-bold font-heading hover:bg-white hover:text-[#2d4375] transition-all duration-300 flex items-center justify-center gap-[8px] disabled:opacity-50"
                        >
                            {submitting ? "Subscribing..." : "Subscribe"}
                            <Icon icon="solar:paper-plane-bold" className="text-xl" />
                        </button>
                    </form>
                )}

                {error && <p className="text-red-300 text-sm font-bold mt-2">{error}</p>}

                <p className="text-white/40 text-[12px] mt-[10px] font-body">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </motion.section>
    );
}
