"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordRequirements = [
        { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
        { label: "At least one uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
        { label: "At least one lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
        { label: "At least one number", test: (pw: string) => /[0-9]/.test(pw) },
        { label: "At least one special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
    ];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const supabase = createClient();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Password validation logic
        const allRequirementsMet = passwordRequirements.every(req => req.test(password));

        if (!allRequirementsMet) {
            setError("Password does not meet the strength requirements.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-[24px] shadow-xl border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon icon="solar:check-circle-bold" className="text-4xl" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading text-triverge-blue mb-4">Request Sent!</h2>
                    <p className="text-charcoal/70 mb-8">
                        Your account has been created and is pending approval from a Super Administrator. You will be notified once access is granted.
                    </p>
                    <Link
                        href="/admin/login"
                        className="inline-block px-8 py-3 bg-gray-100 text-charcoal rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-[24px] shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold font-heading text-triverge-blue">Request Access</h1>
                    <p className="text-charcoal/60 mt-2">Create an admin account using your email</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
                        <Icon icon="solar:danger-circle-bold" className="text-xl flex-shrink-0 mt-0.5" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-charcoal/70 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-triverge-blue outline-none transition-all text-charcoal"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-charcoal/70 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-triverge-blue outline-none transition-all text-charcoal"
                            placeholder="••••••••"
                        />
                        <div className="mt-2 space-y-1">
                            {passwordRequirements.map((req, index) => {
                                const isMet = req.test(password);
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-2 text-xs transition-colors ${
                                            isMet ? "text-green-600" : "text-charcoal/40"
                                        }`}
                                    >
                                        <Icon
                                            icon={isMet ? "solar:check-circle-bold" : "solar:round-transfer-vertical-broken"}
                                            className={isMet ? "text-green-500" : "text-gray-300"}
                                        />
                                        <span>{req.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-charcoal/70 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-triverge-blue outline-none transition-all text-charcoal"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full py-3 bg-healing-teal text-white rounded-xl font-bold shadow-lg shadow-healing-teal/20 hover:bg-healing-teal/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Icon icon="solar:spinner-bold-duotone" className="animate-spin text-xl" />
                        ) : (
                            "Submit Request"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-charcoal/60">
                        Already have an account?{" "}
                        <Link href="/admin/login" className="text-triverge-blue hover:underline font-bold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
