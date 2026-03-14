"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const SPECIALIZATIONS = [
    "Home Care",
    "Rehabilitation",
    "Respite Care",
    "Dementia Care",
    "Physiotherapy",
    "Palliative Care",
    "Post-Surgery Care",
    "Elderly Companionship",
];

const EXPERIENCE_OPTIONS = [
    "Less than 1 year",
    "1–2 years",
    "3–5 years",
    "5–10 years",
    "10+ years",
];

export default function JoinOurTeamPage() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        location: "",
        years_experience: "",
        specializations: [] as string[],
        availability: "",
        bio: "",
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const formRef = useRef<HTMLDivElement>(null);

    const toggleSpecialization = (spec: string) => {
        setForm(f => ({
            ...f,
            specializations: f.specializations.includes(spec)
                ? f.specializations.filter(s => s !== spec)
                : [...f.specializations, spec],
        }));
    };

    const fireConfetti = () => {
        const end = Date.now() + 2000;
        const interval = setInterval(() => {
            if (Date.now() > end) return clearInterval(interval);
            confetti({
                particleCount: 80,
                spread: 100,
                startVelocity: 35,
                origin: { x: Math.random(), y: Math.random() * 0.4 },
                colors: ["#2d4375", "#2ea69a", "#FFD700", "#FF6B6B", "#8B5CF6"],
            });
        }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.full_name || !form.email) {
            setError("Full name and email are required.");
            return;
        }
        setSubmitting(true);
        setError("");

        try {
            // 1. Upload CV if provided
            let cv_url = null;
            if (cvFile) {
                const formData = new FormData();
                formData.append("file", cvFile);
                const uploadRes = await fetch("/api/caregivers/upload", { method: "POST", body: formData });
                if (!uploadRes.ok) {
                    const d = await uploadRes.json();
                    throw new Error(d.error || "CV upload failed");
                }
                const d = await uploadRes.json();
                cv_url = d.url;
            }

            // 2. Submit the application
            const res = await fetch("/api/caregivers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, cv_url }),
            });

            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error || "Submission failed");
            }

            setSubmitted(true);
            fireConfetti();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-[120px] pb-[80px] bg-gradient-to-br from-triverge-blue via-[#2d4375] to-[#1a2a4a] overflow-hidden">
                {/* Decorative shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-healing-teal/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-healing-teal/5 rounded-full translate-y-1/3 -translate-x-1/4" />

                <div className="relative max-w-[1200px] mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-healing-teal text-sm font-bold mb-6">
                            <Icon icon="solar:heart-pulse-bold" className="text-lg" />
                            Make a Difference Every Day
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6 leading-tight">
                            Join Our <span className="text-healing-teal">Team</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 max-w-[700px] mx-auto mb-10 leading-relaxed">
                            Are you a compassionate caregiver looking to make a meaningful impact?
                            Submit your application and become part of the Triverge Healthcare family.
                        </p>
                        <button
                            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-healing-teal text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-white hover:text-triverge-blue transition-all duration-300 hover:scale-105"
                        >
                            <Icon icon="solar:document-add-bold" className="text-xl" />
                            Apply Now
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-3xl font-bold font-heading text-triverge-blue text-center mb-4">Why Join Triverge Healthcare?</h2>
                    <p className="text-center text-charcoal/60 max-w-[600px] mx-auto mb-12">We provide the support, training, and opportunity for you to do what you love — caring for others.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "solar:hand-heart-bold-duotone", title: "Meaningful Work", desc: "Make a real difference in the lives of elderly patients and their families every single day." },
                            { icon: "solar:graduation-cap-bold-duotone", title: "Growth & Training", desc: "Access professional development through our HCAP Training Programme and ongoing mentorship." },
                            { icon: "solar:users-group-rounded-bold-duotone", title: "Supportive Community", desc: "Be part of a caring team that values your wellbeing just as much as our clients'." },
                        ].map((item) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-healing-teal/10 flex items-center justify-center text-healing-teal mb-5">
                                    <Icon icon={item.icon} className="text-3xl" />
                                </div>
                                <h3 className="text-lg font-bold text-charcoal mb-2">{item.title}</h3>
                                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section ref={formRef} className="py-20" id="apply">
                <div className="max-w-[800px] mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-healing-teal to-triverge-blue flex items-center justify-center shadow-xl">
                                    <Icon icon="solar:confetti-bold-duotone" className="text-5xl text-white" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold font-heading text-triverge-blue mb-4">
                                    Welcome to the Triverge Family! 🎉
                                </h2>
                                <p className="text-lg text-charcoal/60 max-w-[500px] mx-auto mb-6 leading-relaxed">
                                    Your application has been submitted successfully. Our team will review your profile and get back to you soon.
                                </p>
                                <p className="text-base text-charcoal/50 max-w-[500px] mx-auto mb-10">
                                    In the meantime, stay in touch with us — we're excited about building something great together.
                                </p>
                                <div className="flex justify-center gap-4 flex-wrap">
                                    <a
                                        href="/"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-triverge-blue text-white font-bold rounded-full hover:bg-healing-teal transition-colors"
                                    >
                                        <Icon icon="solar:home-smile-bold" />
                                        Back to Home
                                    </a>
                                    <a
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-charcoal font-bold rounded-full hover:bg-gray-200 transition-colors"
                                    >
                                        <Icon icon="solar:chat-line-bold" />
                                        Contact Us
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold font-heading text-triverge-blue mb-3">
                                        Caregiver Application Form
                                    </h2>
                                    <p className="text-charcoal/60">
                                        Fill in your details below and upload your CV. We'll review your application and reach out.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    {/* Name & Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={form.full_name}
                                                onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal placeholder:text-gray-400"
                                                placeholder="e.g. Adunni Adekunle"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal placeholder:text-gray-400"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone & Location */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal placeholder:text-gray-400"
                                                placeholder="+234 xxx xxxx xxx"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Location / City</label>
                                            <input
                                                type="text"
                                                value={form.location}
                                                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal placeholder:text-gray-400"
                                                placeholder="e.g. Ibadan, Oyo State"
                                            />
                                        </div>
                                    </div>

                                    {/* Experience & Availability */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Years of Experience</label>
                                            <select
                                                value={form.years_experience}
                                                onChange={e => setForm(f => ({ ...f, years_experience: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal"
                                            >
                                                <option value="">Select experience...</option>
                                                {EXPERIENCE_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Availability</label>
                                            <select
                                                value={form.availability}
                                                onChange={e => setForm(f => ({ ...f, availability: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal"
                                            >
                                                <option value="">Select availability...</option>
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Flexible">Flexible</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Specializations */}
                                    <div>
                                        <label className="block text-sm font-bold text-charcoal/70 mb-3">Specializations</label>
                                        <div className="flex flex-wrap gap-2">
                                            {SPECIALIZATIONS.map(spec => (
                                                <button
                                                    key={spec}
                                                    type="button"
                                                    onClick={() => toggleSpecialization(spec)}
                                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                                        form.specializations.includes(spec)
                                                            ? "bg-healing-teal text-white shadow-md"
                                                            : "bg-gray-100 text-charcoal/60 hover:bg-gray-200 hover:text-charcoal"
                                                    }`}
                                                >
                                                    {form.specializations.includes(spec) && (
                                                        <Icon icon="solar:check-read-bold" className="inline mr-1" />
                                                    )}
                                                    {spec}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="block text-sm font-bold text-charcoal/70 mb-2">About You / Cover Letter</label>
                                        <textarea
                                            value={form.bio}
                                            onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal placeholder:text-gray-400 resize-none leading-relaxed"
                                            placeholder="Tell us a bit about yourself, your experience, and why you'd like to join Triverge Healthcare..."
                                        />
                                    </div>

                                    {/* CV Upload */}
                                    <div>
                                        <label className="block text-sm font-bold text-charcoal/70 mb-2">Upload Your CV</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={e => setCvFile(e.target.files?.[0] || null)}
                                                className="hidden"
                                                id="cv-upload"
                                            />
                                            <label
                                                htmlFor="cv-upload"
                                                className="flex items-center gap-3 w-full px-4 py-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 hover:border-healing-teal cursor-pointer transition-colors"
                                            >
                                                <Icon icon="solar:upload-minimalistic-bold-duotone" className="text-2xl text-healing-teal" />
                                                <div>
                                                    <p className="text-sm font-bold text-charcoal">
                                                        {cvFile ? cvFile.name : "Click to upload your CV"}
                                                    </p>
                                                    <p className="text-xs text-charcoal/50">PDF, DOC, or DOCX — Max 5MB</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2">
                                            <Icon icon="solar:danger-triangle-bold" className="text-lg flex-shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-4 bg-gradient-to-r from-triverge-blue to-healing-teal text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {submitting ? (
                                            <>
                                                <Icon icon="solar:loading-bold" className="animate-spin text-xl" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Icon icon="solar:plain-bold" className="text-xl" />
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}
