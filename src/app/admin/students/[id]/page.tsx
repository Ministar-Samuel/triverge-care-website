"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

type Student = {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    status: string;
    enrollment_date: string;
    date_of_birth: string | null;
    gender: string | null;
    address: string | null;
    emergency_contact_name: string | null;
    emergency_contact_phone: string | null;
    next_of_kin: string | null;
    payment_ref: string | null;
    amount_paid: number;
    created_at: string;
};

type StudentNote = {
    id: string;
    content: string;
    author_email: string | null;
    created_at: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    enrolled: { label: "Enrolled", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: "solar:book-bold" },
    graduated: { label: "Graduated", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: "solar:square-academic-cap-bold" },
    cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: "solar:close-circle-bold" },
};

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [student, setStudent] = useState<Student | null>(null);
    const [notes, setNotes] = useState<StudentNote[]>([]);
    const [loading, setLoading] = useState(true);
    const [newNote, setNewNote] = useState("");
    const [savingNote, setSavingNote] = useState(false);
    const [noteSaved, setNoteSaved] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [studentRes, notesRes] = await Promise.all([
                    fetch(`/api/students/${id}`),
                    fetch(`/api/students/${id}/notes`),
                ]);

                if (studentRes.ok) {
                    const data = await studentRes.json();
                    setStudent(data.student);
                }
                if (notesRes.ok) {
                    const data = await notesRes.json();
                    setNotes(data.notes || []);
                }
            } catch (err) {
                console.error("Failed to fetch student:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const updateStatus = async (status: string) => {
        setUpdatingStatus(true);
        try {
            const res = await fetch(`/api/students/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                const data = await res.json();
                setStudent(data.student);
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const addNote = async () => {
        if (!newNote.trim()) return;
        setSavingNote(true);
        setNoteSaved(false);
        try {
            // Get current user email
            const { data: { user } } = await supabase.auth.getUser();

            const res = await fetch(`/api/students/${id}/notes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: newNote.trim(),
                    author_email: user?.email || null,
                }),
            });
            if (res.ok) {
                const data = await res.json();
                setNotes([data.note, ...notes]);
                setNewNote("");
                setNoteSaved(true);
                setTimeout(() => setNoteSaved(false), 3000);
            }
        } catch (err) {
            console.error("Failed to add note:", err);
        } finally {
            setSavingNote(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center gap-3 text-charcoal/40">
                    <Icon icon="solar:loading-bold" className="text-3xl animate-spin" />
                    <p>Loading student details...</p>
                </div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center gap-3 text-charcoal/40">
                    <Icon icon="solar:close-circle-bold" className="text-4xl text-red-400" />
                    <p className="text-lg font-bold">Student not found.</p>
                    <Link href="/admin/students" className="text-healing-teal font-bold hover:underline">← Back to Students</Link>
                </div>
            </div>
        );
    }

    const statusInfo = STATUS_CONFIG[student.status] || STATUS_CONFIG.enrolled;

    const InfoRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40">{label}</span>
            <span className="text-base font-bold text-charcoal">{value || "—"}</span>
        </div>
    );

    return (
        <div className="max-w-[960px] mx-auto flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-charcoal/50">
                <Link href="/admin/students" className="hover:text-triverge-blue transition-colors font-medium">Students</Link>
                <Icon icon="solar:alt-arrow-right-linear" />
                <span className="text-charcoal font-bold">{student.full_name}</span>
            </div>

            {/* Header Card */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-triverge-blue to-healing-teal flex items-center justify-center text-white">
                            <Icon icon="solar:square-academic-cap-bold-duotone" className="text-3xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-heading text-charcoal">{student.full_name}</h2>
                            <p className="text-charcoal/50 text-sm mt-0.5">
                                Enrolled on {student.enrollment_date ? format(new Date(student.enrollment_date), "MMM dd, yyyy") : "—"}
                            </p>
                        </div>
                    </div>
                    <span className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border",
                        statusInfo.color, statusInfo.bg
                    )}>
                        <Icon icon={statusInfo.icon} />
                        {statusInfo.label}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold font-heading text-triverge-blue mb-6 flex items-center gap-2">
                            <Icon icon="solar:user-bold-duotone" className="text-xl" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoRow label="Full Name" value={student.full_name} />
                            <InfoRow label="Email" value={student.email} />
                            <InfoRow label="Phone" value={student.phone} />
                            <InfoRow label="Gender" value={student.gender} />
                            <InfoRow label="Date of Birth" value={student.date_of_birth ? format(new Date(student.date_of_birth), "MMM dd, yyyy") : null} />
                            <InfoRow label="Address" value={student.address} />
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold font-heading text-triverge-blue mb-6 flex items-center gap-2">
                            <Icon icon="solar:phone-calling-bold-duotone" className="text-xl" />
                            Emergency Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoRow label="Contact Name" value={student.emergency_contact_name} />
                            <InfoRow label="Contact Phone" value={student.emergency_contact_phone} />
                            <InfoRow label="Next of Kin" value={student.next_of_kin} />
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold font-heading text-triverge-blue mb-6 flex items-center gap-2">
                            <Icon icon="solar:wallet-money-bold-duotone" className="text-xl" />
                            Payment Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoRow label="Amount Paid" value={`₦${(student.amount_paid || 0).toLocaleString()}`} />
                            <InfoRow label="Payment Reference" value={student.payment_ref} />
                            <InfoRow label="Student ID" value={student.id} />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold font-heading text-triverge-blue flex items-center gap-2">
                                <Icon icon="solar:notebook-bold-duotone" className="text-xl" />
                                Admin Notes
                            </h3>
                            {noteSaved && (
                                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                                    <Icon icon="solar:check-circle-bold" />
                                    Note Added
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-charcoal/50 mb-4">
                            Record observations, performance notes, or personal information about this student.
                        </p>
                        <textarea
                            value={newNote}
                            onChange={e => setNewNote(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm resize-none leading-relaxed"
                            placeholder="e.g. Student demonstrated excellent understanding of dementia care module..."
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={addNote}
                                disabled={savingNote || !newNote.trim()}
                                className="px-5 py-2.5 bg-triverge-blue text-white rounded-xl font-bold hover:bg-healing-teal transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <Icon icon="solar:pen-new-square-bold" />
                                {savingNote ? "Adding..." : "Add Note"}
                            </button>
                        </div>

                        {/* Notes Timeline */}
                        {notes.length > 0 && (
                            <div className="mt-8 border-t border-gray-100 pt-6 flex flex-col gap-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal/40">Note History</h4>
                                {notes.map((note) => (
                                    <div key={note.id} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                                        <p className="text-sm text-charcoal leading-relaxed whitespace-pre-wrap">{note.content}</p>
                                        <div className="flex items-center gap-3 text-xs text-charcoal/40">
                                            <span className="flex items-center gap-1">
                                                <Icon icon="solar:clock-circle-bold" />
                                                {format(new Date(note.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                                            </span>
                                            {note.author_email && (
                                                <span className="flex items-center gap-1">
                                                    <Icon icon="solar:user-bold" />
                                                    {note.author_email}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/50 mb-4">Update Status</h3>
                        <div className="flex flex-col gap-2">
                            {student.status !== "enrolled" && (
                                <button
                                    onClick={() => updateStatus("enrolled")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:book-bold" className="text-blue-500 text-lg" />
                                    Mark as Enrolled
                                </button>
                            )}
                            {student.status !== "graduated" && (
                                <button
                                    onClick={() => updateStatus("graduated")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:square-academic-cap-bold" className="text-green-500 text-lg" />
                                    Mark as Graduated
                                </button>
                            )}
                            {student.status !== "cancelled" && (
                                <button
                                    onClick={() => updateStatus("cancelled")}
                                    disabled={updatingStatus}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-sm font-bold text-charcoal transition-colors w-full text-left disabled:opacity-50"
                                >
                                    <Icon icon="solar:close-circle-bold" className="text-red-500 text-lg" />
                                    Mark as Cancelled
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Student Summary */}
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/50 mb-4">Summary</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-charcoal/20 mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Enrolled</p>
                                    <p className="text-xs text-charcoal/40">
                                        {student.enrollment_date ? format(new Date(student.enrollment_date), "MMM dd, yyyy") : "—"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", statusInfo.color.replace("text-", "bg-"))} />
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Status: {statusInfo.label}</p>
                                    <p className="text-xs text-charcoal/40">Current status</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-charcoal">₦{(student.amount_paid || 0).toLocaleString()}</p>
                                    <p className="text-xs text-charcoal/40">Amount paid</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-healing-teal mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-charcoal">{notes.length} Notes</p>
                                    <p className="text-xs text-charcoal/40">Admin observations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Link */}
                    <Link
                        href="/admin/students"
                        className="flex items-center gap-2 text-sm font-bold text-charcoal/50 hover:text-triverge-blue transition-colors"
                    >
                        <Icon icon="solar:arrow-left-bold" />
                        Back to All Students
                    </Link>
                </div>
            </div>
        </div>
    );
}
