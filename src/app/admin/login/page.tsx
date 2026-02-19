"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-[24px] shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-triverge-blue rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                        <span className="font-heading font-bold text-xl">T</span>
                    </div>
                    <h1 className="text-2xl font-bold font-heading text-triverge-blue">Admin Login</h1>
                    <p className="text-charcoal/60 mt-2">Sign in to access the dashboard</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
                        <Icon icon="solar:danger-circle-bold" className="text-xl flex-shrink-0 mt-0.5" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full py-3 bg-triverge-blue text-white rounded-xl font-bold shadow-lg shadow-triverge-blue/20 hover:bg-triverge-blue/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Icon icon="solar:spinner-bold-duotone" className="animate-spin text-xl" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-charcoal/60">
                        Need access?{" "}
                        <Link href="/admin/register" className="text-triverge-blue hover:underline font-bold">
                            Request Approval
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
