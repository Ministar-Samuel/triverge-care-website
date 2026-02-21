"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type Profile = {
    id: string;
    email: string;
    display_name: string | null;
    avatar_url: string | null;
    role: string;
    notes: string | null;
    created_at: string;
};

const TABS = [
    { id: "profile", label: "Profile", icon: "solar:user-bold-duotone" },
    { id: "security", label: "Security", icon: "solar:shield-keyhole-bold-duotone" },
    { id: "notes", label: "Notes", icon: "solar:notebook-bold-duotone" },
    { id: "preferences", label: "Preferences", icon: "solar:settings-bold-duotone" },
];

export default function SettingsPage() {
    const supabase = createClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Profile state
    const [profile, setProfile] = useState<Profile | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Security state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Notes state
    const [notes, setNotes] = useState("");

    // Preferences state
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (data) {
            setProfile({ ...data, email: user.email || "" } as Profile);
            setDisplayName(data.display_name || "");
            setAvatarUrl(data.avatar_url || null);
            setNotes(data.notes || "");
        } else {
            // Profile row doesn't exist yet — create one
            setProfile({
                id: user.id,
                email: user.email || "",
                display_name: null,
                avatar_url: null,
                role: "admin",
                notes: null,
                created_at: new Date().toISOString(),
            });
        }
        setLoading(false);
    };

    const showSuccess = (msg: string) => {
        setSuccessMsg(msg);
        setErrorMsg(null);
        setTimeout(() => setSuccessMsg(null), 4000);
    };

    const showError = (msg: string) => {
        setErrorMsg(msg);
        setSuccessMsg(null);
        setTimeout(() => setErrorMsg(null), 5000);
    };

    // --- Profile handlers ---
    const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSaveProfile = async () => {
        if (!profile) return;
        setSaving(true);

        let uploadedAvatarUrl = avatarUrl;

        // Upload avatar if a new one was selected
        if (avatarFile) {
            const fileExt = avatarFile.name.split(".").pop();
            const filePath = `avatars/${profile.id}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, avatarFile, { upsert: true });

            if (uploadError) {
                showError("Failed to upload avatar: " + uploadError.message);
                setSaving(false);
                return;
            }

            const { data: urlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

            uploadedAvatarUrl = urlData.publicUrl;
        }

        const { error } = await supabase
            .from("profiles")
            .upsert({
                id: profile.id,
                display_name: displayName,
                avatar_url: uploadedAvatarUrl,
            }, { onConflict: "id" });

        if (error) {
            showError("Failed to save profile: " + error.message);
        } else {
            setAvatarUrl(uploadedAvatarUrl);
            setAvatarFile(null);
            setAvatarPreview(null);
            showSuccess("Profile updated successfully!");
            // Dispatch a custom event so the sidebar can pick up the change
            window.dispatchEvent(new Event("profile-updated"));
        }
        setSaving(false);
    };

    // --- Security handlers ---
    const handleChangePassword = async () => {
        if (newPassword.length < 6) {
            showError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        setSaving(true);

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            showError("Failed to change password: " + error.message);
        } else {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            showSuccess("Password changed successfully!");
        }
        setSaving(false);
    };

    // --- Notes handler ---
    const handleSaveNotes = async () => {
        if (!profile) return;
        setSaving(true);

        const { error } = await supabase
            .from("profiles")
            .upsert({
                id: profile.id,
                notes,
            }, { onConflict: "id" });

        if (error) {
            showError("Failed to save notes: " + error.message);
        } else {
            showSuccess("Notes saved successfully!");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Icon icon="solar:spinner-bold-duotone" className="animate-spin text-4xl text-triverge-blue" />
            </div>
        );
    }

    const currentAvatar = avatarPreview || avatarUrl;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-heading text-triverge-blue">Settings</h1>
                <p className="text-charcoal/60 mt-1">Manage your account, security, and preferences.</p>
            </div>

            {/* Notifications */}
            {successMsg && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700 text-sm font-medium animate-in slide-in-from-top-2">
                    <Icon icon="solar:check-circle-bold" className="text-xl flex-shrink-0" />
                    {successMsg}
                </div>
            )}
            {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium animate-in slide-in-from-top-2">
                    <Icon icon="solar:danger-circle-bold" className="text-xl flex-shrink-0" />
                    {errorMsg}
                </div>
            )}

            {/* Tab Nav */}
            <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                            activeTab === tab.id
                                ? "bg-triverge-blue text-white shadow-lg shadow-triverge-blue/20"
                                : "text-charcoal/60 hover:text-charcoal hover:bg-gray-50"
                        )}
                    >
                        <Icon icon={tab.icon} className="text-lg" />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* ========== PROFILE TAB ========== */}
            {activeTab === "profile" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Avatar Card */}
                    <div className="bg-white rounded-[24px] border border-gray-100 p-8 flex flex-col items-center text-center shadow-sm">
                        <div className="relative group mb-6">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                                {currentAvatar ? (
                                    <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-triverge-blue to-healing-teal flex items-center justify-center text-white text-3xl font-bold">
                                        {displayName ? displayName.charAt(0).toUpperCase() : profile?.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 w-10 h-10 bg-triverge-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-triverge-blue/90 transition-colors border-2 border-white"
                            >
                                <Icon icon="solar:camera-bold" className="text-lg" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarSelect}
                            />
                        </div>

                        <h3 className="font-bold text-charcoal text-lg">{displayName || "Admin User"}</h3>
                        <p className="text-charcoal/50 text-sm">{profile?.email}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-triverge-blue/10 text-triverge-blue text-xs font-bold uppercase tracking-wider">
                            <Icon icon="solar:shield-check-bold" className="text-sm" />
                            {profile?.role || "admin"}
                        </span>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-lg font-bold font-heading text-charcoal mb-6 flex items-center gap-2">
                            <Icon icon="solar:user-id-bold-duotone" className="text-triverge-blue text-2xl" />
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">Display Name</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-triverge-blue outline-none transition-all text-charcoal placeholder:text-gray-400"
                                    placeholder="Your display name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={profile?.email || ""}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-charcoal/50 cursor-not-allowed"
                                />
                                <p className="text-xs text-charcoal/40 mt-1">Email cannot be changed here.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">Role</label>
                                <input
                                    type="text"
                                    value={profile?.role || "admin"}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-charcoal/50 cursor-not-allowed capitalize"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">Member Since</label>
                                <input
                                    type="text"
                                    value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "-"}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-charcoal/50 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="px-8 py-3 bg-triverge-blue text-white rounded-xl font-bold shadow-lg shadow-triverge-blue/20 hover:bg-triverge-blue/90 transition-all disabled:opacity-60 flex items-center gap-2"
                            >
                                {saving ? (
                                    <Icon icon="solar:spinner-bold-duotone" className="animate-spin text-lg" />
                                ) : (
                                    <Icon icon="solar:diskette-bold" className="text-lg" />
                                )}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== SECURITY TAB ========== */}
            {activeTab === "security" && (
                <div className="max-w-2xl">
                    <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-lg font-bold font-heading text-charcoal mb-2 flex items-center gap-2">
                            <Icon icon="solar:lock-password-bold-duotone" className="text-triverge-blue text-2xl" />
                            Change Password
                        </h2>
                        <p className="text-charcoal/50 text-sm mb-8">Update your password to keep your account secure.</p>

                        <div className="flex flex-col gap-5">
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-triverge-blue outline-none transition-all text-charcoal"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-triverge-blue outline-none transition-all text-charcoal"
                                    placeholder="Min. 6 characters"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-triverge-blue outline-none transition-all text-charcoal"
                                    placeholder="Re-enter your new password"
                                />
                                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <Icon icon="solar:danger-circle-bold" className="text-sm" />
                                        Passwords do not match
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleChangePassword}
                                disabled={saving || !newPassword || !confirmPassword}
                                className="px-8 py-3 bg-triverge-blue text-white rounded-xl font-bold shadow-lg shadow-triverge-blue/20 hover:bg-triverge-blue/90 transition-all disabled:opacity-60 flex items-center gap-2"
                            >
                                {saving ? (
                                    <Icon icon="solar:spinner-bold-duotone" className="animate-spin text-lg" />
                                ) : (
                                    <Icon icon="solar:shield-check-bold" className="text-lg" />
                                )}
                                Update Password
                            </button>
                        </div>
                    </div>

                    {/* Active Sessions Info */}
                    <div className="mt-8 bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-lg font-bold font-heading text-charcoal mb-2 flex items-center gap-2">
                            <Icon icon="solar:monitor-smartphone-bold-duotone" className="text-triverge-blue text-2xl" />
                            Active Session
                        </h2>
                        <p className="text-charcoal/50 text-sm mb-6">You are currently signed in from this device.</p>
                        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <Icon icon="solar:monitor-bold" className="text-xl" />
                            </div>
                            <div>
                                <p className="font-bold text-charcoal text-sm">Current Browser Session</p>
                                <p className="text-xs text-charcoal/50">{profile?.email} · Active now</p>
                            </div>
                            <div className="ml-auto">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== NOTES TAB ========== */}
            {activeTab === "notes" && (
                <div className="max-w-3xl">
                    <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-lg font-bold font-heading text-charcoal mb-2 flex items-center gap-2">
                            <Icon icon="solar:notebook-bold-duotone" className="text-triverge-blue text-2xl" />
                            Personal Notes
                        </h2>
                        <p className="text-charcoal/50 text-sm mb-6">Jot down quick reminders, to-dos, or anything important. Only visible to you.</p>

                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-triverge-blue outline-none transition-all text-charcoal placeholder:text-gray-400 min-h-[300px] text-sm leading-relaxed resize-y"
                            placeholder="Write your notes here... &#10;&#10;Examples:&#10;- Follow up with John's appointment&#10;- Check HCAP enrollment numbers&#10;- Update blog with new testimonials"
                        />

                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-xs text-charcoal/40">{notes.length} characters</p>
                            <button
                                onClick={handleSaveNotes}
                                disabled={saving}
                                className="px-8 py-3 bg-triverge-blue text-white rounded-xl font-bold shadow-lg shadow-triverge-blue/20 hover:bg-triverge-blue/90 transition-all disabled:opacity-60 flex items-center gap-2"
                            >
                                {saving ? (
                                    <Icon icon="solar:spinner-bold-duotone" className="animate-spin text-lg" />
                                ) : (
                                    <Icon icon="solar:diskette-bold" className="text-lg" />
                                )}
                                Save Notes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== PREFERENCES TAB ========== */}
            {activeTab === "preferences" && (
                <div className="max-w-2xl">
                    <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-lg font-bold font-heading text-charcoal mb-6 flex items-center gap-2">
                            <Icon icon="solar:settings-bold-duotone" className="text-triverge-blue text-2xl" />
                            Preferences
                        </h2>

                        <div className="flex flex-col gap-6">
                            {/* Email Notifications */}
                            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Icon icon="solar:letter-bold-duotone" className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-charcoal text-sm">Email Notifications</p>
                                        <p className="text-xs text-charcoal/50">Receive email alerts for new bookings and updates</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEmailNotifications(!emailNotifications)}
                                    className={cn(
                                        "w-12 h-7 rounded-full transition-colors duration-200 relative",
                                        emailNotifications ? "bg-triverge-blue" : "bg-gray-300"
                                    )}
                                >
                                    <span className={cn(
                                        "absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200",
                                        emailNotifications ? "translate-x-5" : "translate-x-0.5"
                                    )} />
                                </button>
                            </div>

                            {/* Dark Mode (placeholder) */}
                            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                        <Icon icon="solar:moon-bold-duotone" className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-charcoal text-sm">Dark Mode</p>
                                        <p className="text-xs text-charcoal/50">Switch the dashboard to dark theme</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={cn(
                                        "w-12 h-7 rounded-full transition-colors duration-200 relative",
                                        darkMode ? "bg-triverge-blue" : "bg-gray-300"
                                    )}
                                >
                                    <span className={cn(
                                        "absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200",
                                        darkMode ? "translate-x-5" : "translate-x-0.5"
                                    )} />
                                </button>
                            </div>

                            {/* Timezone */}
                            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                                        <Icon icon="solar:clock-circle-bold-duotone" className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-charcoal text-sm">Timezone</p>
                                        <p className="text-xs text-charcoal/50">Used for scheduling and appointment times</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-charcoal/70 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                                </span>
                            </div>

                            {/* Language */}
                            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                        <Icon icon="solar:globus-bold-duotone" className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-charcoal text-sm">Language</p>
                                        <p className="text-xs text-charcoal/50">Dashboard display language</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-charcoal/70 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                                    English
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
