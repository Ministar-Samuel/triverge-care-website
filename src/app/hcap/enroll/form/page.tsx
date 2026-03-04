"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function EnrollmentFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paymentRef = searchParams.get("ref") || "";
    const paymentEmail = searchParams.get("email") || "";
    const amountPaid = searchParams.get("amount") || "0";

    const [form, setForm] = useState({
        full_name: "",
        email: paymentEmail,
        phone: "",
        date_of_birth: "",
        gender: "",
        address: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        next_of_kin: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.full_name || !form.email || !form.phone) {
            setError("Please fill in all required fields.");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    payment_ref: paymentRef,
                    amount_paid: Number(amountPaid),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to submit enrollment");
            }

            setSuccess(true);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <main className="min-h-screen bg-porcelain flex items-center justify-center px-[20px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-12 text-center max-w-lg w-full"
                >
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                        <Icon icon="solar:check-circle-bold" className="text-5xl text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading text-charcoal mb-4">
                        Enrollment Complete!
                    </h2>
                    <p className="text-charcoal/60 mb-8 leading-relaxed">
                        Your enrollment has been submitted successfully. We'll be in touch with you shortly via <strong>{form.email}</strong> with further details about the HCAP training programme.
                    </p>
                    {paymentRef && (
                        <p className="text-xs text-charcoal/40 mb-6 bg-gray-50 p-3 rounded-xl font-mono">
                            Payment Ref: {paymentRef}
                        </p>
                    )}
                    <Link
                        href="/hcap"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-triverge-blue text-white font-bold rounded-xl hover:bg-healing-teal transition-colors"
                    >
                        <Icon icon="solar:arrow-left-bold" />
                        Back to HCAP
                    </Link>
                </motion.div>
            </main>
        );
    }

    const inputClass = "w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm bg-white";
    const labelClass = "block text-sm font-bold text-charcoal/70 mb-2";

    return (
        <main className="min-h-screen bg-porcelain overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-triverge-blue via-[#1e3a8a] to-[#0f1d45] text-white py-[80px] px-[20px] md:px-[40px] overflow-hidden">
                <div className="absolute inset-0 bg-grid-void opacity-30" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/20 rounded-full text-sm font-bold text-green-300 mb-6">
                            <Icon icon="solar:check-circle-bold" />
                            Payment Successful
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                            Complete Your Enrollment
                        </h1>
                        <p className="text-lg text-white/70 max-w-xl mx-auto">
                            Fill in the form below with your details to finalize your HCAP programme enrollment.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form */}
            <section className="py-[60px] px-[20px] md:px-[40px]">
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden"
                >
                    {/* Payment Reference Banner */}
                    {paymentRef && (
                        <div className="bg-green-50 border-b border-green-100 px-8 py-4 flex items-center gap-3 text-green-700">
                            <Icon icon="solar:shield-check-bold" className="text-xl" />
                            <span className="text-sm font-bold">Payment Verified</span>
                            <span className="text-xs text-green-600/60 font-mono ml-auto">{paymentRef}</span>
                        </div>
                    )}

                    <div className="p-8 md:p-10 flex flex-col gap-8">

                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-bold font-heading text-triverge-blue mb-6 flex items-center gap-2">
                                <Icon icon="solar:user-bold-duotone" className="text-xl" />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Full Name *</label>
                                    <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="e.g. John Doe" className={inputClass} required />
                                </div>
                                <div>
                                    <label className={labelClass}>Email Address *</label>
                                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} required />
                                </div>
                                <div>
                                    <label className={labelClass}>Phone Number *</label>
                                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" className={inputClass} required />
                                </div>
                                <div>
                                    <label className={labelClass}>Date of Birth</label>
                                    <input name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Gender</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Address</label>
                                    <textarea name="address" value={form.address} onChange={handleChange} placeholder="Your residential address" rows={2} className={inputClass + " resize-none"} />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* Emergency Contact */}
                        <div>
                            <h3 className="text-lg font-bold font-heading text-triverge-blue mb-6 flex items-center gap-2">
                                <Icon icon="solar:phone-calling-bold-duotone" className="text-xl" />
                                Emergency Contact
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Emergency Contact Name</label>
                                    <input name="emergency_contact_name" value={form.emergency_contact_name} onChange={handleChange} placeholder="Contact full name" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Emergency Contact Phone</label>
                                    <input name="emergency_contact_phone" type="tel" value={form.emergency_contact_phone} onChange={handleChange} placeholder="+234 800 000 0000" className={inputClass} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Next of Kin</label>
                                    <input name="next_of_kin" value={form.next_of_kin} onChange={handleChange} placeholder="Name and relationship (e.g. Jane Doe — Sister)" className={inputClass} />
                                </div>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700 text-sm">
                                <Icon icon="solar:danger-triangle-bold" className="text-lg flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-triverge-blue hover:bg-healing-teal text-white font-bold rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-[1.01]"
                        >
                            {submitting ? (
                                <>
                                    <Icon icon="solar:loading-bold" className="animate-spin text-xl" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Icon icon="solar:check-circle-bold" className="text-xl" />
                                    Complete Enrollment
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            </section>
        </main>
    );
}

export default function HCAPEnrollFormPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-porcelain flex items-center justify-center">
                <Icon icon="solar:loading-bold" className="text-3xl animate-spin text-triverge-blue" />
            </div>
        }>
            <EnrollmentFormContent />
        </Suspense>
    );
}
