"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

declare global {
    interface Window {
        PaystackPop: {
            setup: (config: Record<string, unknown>) => { openIframe: () => void };
        };
    }
}

const HCAP_PRICE = 150_000; // ₦150,000

const HIGHLIGHTS = [
    { icon: "solar:clock-circle-bold-duotone", label: "8-Week Intensive Training" },
    { icon: "solar:diploma-bold-duotone", label: "Nationally Recognized Certificate" },
    { icon: "solar:users-group-rounded-bold-duotone", label: "Expert-Led Instruction" },
    { icon: "solar:heart-pulse-bold-duotone", label: "Hands-On Clinical Practice" },
    { icon: "solar:book-bold-duotone", label: "Full Course Materials Included" },
    { icon: "solar:shield-check-bold-duotone", label: "Job Placement Support" },
];

export default function HCAPEnrollPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // Load Paystack script
    useEffect(() => {
        if (typeof window !== "undefined" && !document.getElementById("paystack-script")) {
            const script = document.createElement("script");
            script.id = "paystack-script";
            script.src = "https://js.paystack.co/v1/inline.js";
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            document.body.appendChild(script);
        } else {
            setScriptLoaded(true);
        }
    }, []);

    const handlePayment = () => {
        if (!email) return;
        if (!scriptLoaded || !window.PaystackPop) {
            alert("Payment system is still loading. Please try again in a moment.");
            return;
        }

        setLoading(true);

        const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            email,
            amount: HCAP_PRICE * 100, // Paystack uses kobo
            currency: "NGN",
            ref: `HCAP-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
            metadata: {
                custom_fields: [
                    { display_name: "Program", variable_name: "program", value: "HCAP Training" },
                ],
            },
            callback: (response: { reference: string }) => {
                setLoading(false);
                router.push(`/hcap/enroll/form?ref=${response.reference}&email=${encodeURIComponent(email)}&amount=${HCAP_PRICE}`);
            },
            onClose: () => {
                setLoading(false);
            },
        });

        handler.openIframe();
    };

    return (
        <main className="min-h-screen bg-porcelain overflow-x-hidden">
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-triverge-blue via-[#1e3a8a] to-[#0f1d45] text-white py-[100px] px-[20px] md:px-[40px] overflow-hidden">
                <div className="absolute inset-0 bg-grid-void opacity-30" />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Link href="/hcap" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors mb-8">
                            <Icon icon="solar:arrow-left-bold" />
                            Back to HCAP Overview
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                            Enroll in <span className="text-healing-teal">HCAP</span> Training
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Begin your journey to becoming a certified Home Care Assistant. Complete your payment below to secure your spot.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-[80px] px-[20px] md:px-[40px]">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Highlights */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold font-heading text-triverge-blue mb-8">
                            What's Included
                        </h2>
                        <div className="flex flex-col gap-5">
                            {HIGHLIGHTS.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-healing-teal/10 flex items-center justify-center text-healing-teal">
                                        <Icon icon={item.icon} className="text-2xl" />
                                    </div>
                                    <span className="text-base font-bold text-charcoal">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden sticky top-8"
                    >
                        {/* Card Header */}
                        <div className="bg-gradient-to-br from-triverge-blue to-[#1e3a8a] p-8 text-white text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm font-bold mb-4">
                                <Icon icon="solar:star-bold" className="text-yellow-300" />
                                Most Popular
                            </div>
                            <h3 className="text-2xl font-bold font-heading mb-2">HCAP Full Programme</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl font-bold font-heading">₦{HCAP_PRICE.toLocaleString()}</span>
                            </div>
                            <p className="text-white/60 text-sm mt-2">One-time payment • Full access</p>
                        </div>

                        {/* Card Body */}
                        <div className="p-8 flex flex-col gap-6">
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Icon icon="solar:letter-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-charcoal/30" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm"
                                    />
                                </div>
                                <p className="text-xs text-charcoal/40 mt-2">
                                    You'll use this email to complete the enrollment form after payment.
                                </p>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={!email || loading}
                                className="w-full py-4 bg-healing-teal hover:bg-deep-teal text-white font-bold rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02]"
                            >
                                {loading ? (
                                    <>
                                        <Icon icon="solar:loading-bold" className="animate-spin text-xl" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Icon icon="solar:lock-bold" className="text-xl" />
                                        Pay ₦{HCAP_PRICE.toLocaleString()} Now
                                    </>
                                )}
                            </button>

                            <div className="flex items-center gap-3 justify-center text-xs text-charcoal/40">
                                <Icon icon="solar:shield-check-bold" className="text-healing-teal text-lg" />
                                <span>Secured by Paystack • 256-bit SSL encryption</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
