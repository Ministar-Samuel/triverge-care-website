"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Caregiver = {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    location: string | null;
    years_experience: string | null;
    specializations: string[];
    availability: string | null;
    bio: string | null;
    cv_url: string | null;
    status: string;
    created_at: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    new: { label: "New", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: "solar:star-bold" },
    reviewed: { label: "Reviewed", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: "solar:eye-bold" },
    approved: { label: "Approved", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: "solar:check-circle-bold" },
    rejected: { label: "Rejected", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: "solar:close-circle-bold" },
};

export default function CaregiverDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        const fetchCaregiver = async () => {
            try {
                const res = await fetch(`/api/caregivers/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setCaregiver(data.caregiver);
                }
            } catch (err) {
                console.error("Failed to fetch caregiver:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCaregiver();
    }, [id]);

    const updateStatus = async (newStatus: string) => {
        setUpdatingStatus(true);
        try {
            const res = await fetch(`/api/caregivers/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                const data = await res.json();
                setCaregiver(data.caregiver);
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const deleteCaregiver = async () => {
        if (!confirm("Are you sure you want to delete this applicant?")) return;
        try {
            const res = await fetch(`/api/caregivers/${id}`, { method: "DELETE" });
            if (res.ok) {
                window.location.href = "/admin/caregivers";
            }
        } catch (err) {
            console.error("Failed to delete:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Icon icon="solar:loading-bold" className="text-4xl animate-spin text-charcoal/30" />
            </div>
        );
    }

    if (!caregiver) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-charcoal/40">
                <Icon icon="solar:stethoscope-bold-duotone" className="text-6xl mb-4" />
                <p className="text-xl font-bold mb-2">Applicant Not Found</p>
                <Link href="/admin/caregivers" className="text-triverge-blue hover:underline font-bold">
                    ← Back to Caregivers
                </Link>
            </div>
        );
    }

    const status = STATUS_CONFIG[caregiver.status] || STATUS_CONFIG.new;

    return (
        <div className="flex flex-col gap-8 max-w-[1200px]">
            {/* Back Link */}
            <Link
                href="/admin/caregivers"
                className="inline-flex items-center gap-2 text-sm font-bold text-charcoal/60 hover:text-triverge-blue transition-colors w-fit"
            >
                <Icon icon="solar:arrow-left-bold" />
                Back to Caregivers
            </Link>

            {/* Header Card */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-triverge-blue to-healing-teal flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg">
                    {caregiver.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold font-heading text-charcoal">{caregiver.full_name}</h2>
                    <p className="text-charcoal/50 text-sm mt-1">
                        Applied on {format(new Date(caregiver.created_at), "MMMM dd, yyyy 'at' hh:mm a")}
                    </p>
                </div>
                <span className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border",
                    status.color, status.bg
                )}>
                    <Icon icon={status.icon} />
                    {status.label}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Personal Information */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold font-heading text-triverge-blue mb-6 flex items-center gap-2">
                            <Icon icon="solar:user-id-bold-duotone" className="text-xl" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Full Name</span>
                                <span className="text-base font-bold text-charcoal">{caregiver.full_name}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Email</span>
                                <a href={`mailto:${caregiver.email}`} className="text-base font-bold text-healing-teal hover:underline">
                                    {caregiver.email}
                                </a>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Phone</span>
                                <span className="text-base font-bold text-charcoal">{caregiver.phone || "Not provided"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Location</span>
                                <span className="text-base font-bold text-charcoal">{caregiver.location || "Not provided"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Years of Experience</span>
                                <span className="text-base font-bold text-charcoal">{caregiver.years_experience || "Not provided"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">Availability</span>
                                <span className="text-base font-bold text-charcoal">{caregiver.availability || "Not provided"}</span>
                            </div>
                        </div>

                        {/* Specializations */}
                        {caregiver.specializations && caregiver.specializations.length > 0 && (
                            <div className="mt-6">
                                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40 block mb-3">Specializations</span>
                                <div className="flex flex-wrap gap-2">
                                    {caregiver.specializations.map(spec => (
                                        <span key={spec} className="px-4 py-1.5 rounded-full bg-healing-teal/10 text-healing-teal text-sm font-bold">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bio / Cover Letter */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold font-heading text-triverge-blue mb-4 flex items-center gap-2">
                            <Icon icon="solar:notebook-bold-duotone" className="text-xl" />
                            About / Cover Letter
                        </h3>
                        {caregiver.bio ? (
                            <p className="text-sm text-charcoal/70 leading-relaxed whitespace-pre-wrap">{caregiver.bio}</p>
                        ) : (
                            <p className="text-sm text-charcoal/40 italic">No bio or cover letter provided.</p>
                        )}
                    </div>

                    {/* CV Download */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold font-heading text-triverge-blue mb-4 flex items-center gap-2">
                            <Icon icon="solar:document-bold-duotone" className="text-xl" />
                            Curriculum Vitae
                        </h3>
                        {caregiver.cv_url ? (
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="w-12 h-12 rounded-xl bg-triverge-blue/10 flex items-center justify-center text-triverge-blue">
                                    <Icon icon="solar:file-text-bold-duotone" className="text-2xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-charcoal">CV Document</p>
                                    <p className="text-xs text-charcoal/50">Click to download and review</p>
                                </div>
                                <a
                                    href={caregiver.cv_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-triverge-blue text-white rounded-xl font-bold hover:bg-healing-teal transition-colors"
                                >
                                    <Icon icon="solar:download-minimalistic-bold" />
                                    Download CV
                                </a>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-charcoal/40">
                                <Icon icon="solar:file-remove-bold-duotone" className="text-2xl" />
                                <p className="text-sm italic">No CV was uploaded with this application.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="flex flex-col gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/50 mb-4">Quick Actions</h3>
                        <div className="flex flex-col gap-2">
                            {caregiver.status !== "reviewed" && (
                                <button
                                    onClick={() => updateStatus("reviewed")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:eye-bold-duotone" className="text-xl text-yellow-600" />
                                    Mark as Reviewed
                                </button>
                            )}
                            {caregiver.status !== "approved" && (
                                <button
                                    onClick={() => updateStatus("approved")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:check-circle-bold-duotone" className="text-xl text-green-600" />
                                    Approve Applicant
                                </button>
                            )}
                            {caregiver.status !== "rejected" && (
                                <button
                                    onClick={() => updateStatus("rejected")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:close-circle-bold-duotone" className="text-xl text-red-600" />
                                    Reject Applicant
                                </button>
                            )}
                            <div className="border-t border-gray-100 my-2" />
                            <button
                                onClick={deleteCaregiver}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-sm font-bold text-red-600 transition-colors w-full text-left"
                            >
                                <Icon icon="solar:trash-bin-trash-bold-duotone" className="text-xl" />
                                Delete Applicant
                            </button>
                        </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/50 mb-4">Quick Contact</h3>
                        <div className="flex flex-col gap-3">
                            {caregiver.email && (
                                <a
                                    href={`mailto:${caregiver.email}`}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-triverge-blue/5 text-sm text-charcoal transition-colors"
                                >
                                    <Icon icon="solar:letter-bold-duotone" className="text-xl text-triverge-blue" />
                                    {caregiver.email}
                                </a>
                            )}
                            {caregiver.phone && (
                                <a
                                    href={`tel:${caregiver.phone}`}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-triverge-blue/5 text-sm text-charcoal transition-colors"
                                >
                                    <Icon icon="solar:phone-bold-duotone" className="text-xl text-healing-teal" />
                                    {caregiver.phone}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Application ID */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/50 mb-2">Application ID</h3>
                        <p className="text-xs font-mono text-charcoal/50 break-all">{caregiver.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
