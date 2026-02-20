"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import "react-day-picker/dist/style.css";
import { createClient } from "@/utils/supabase/client";

const SERVICES = [
    { id: "home-care", title: "Home Care", icon: "solar:home-smile-bold", desc: "Assisted daily living at home." },
    { id: "rehab", title: "Rehabilitation", icon: "solar:hospital-bold", desc: "Physiotherapy & recovery." },
    { id: "respite", title: "Respite Care", icon: "solar:sofa-bold", desc: "Short-term relief for caregivers." },
    { id: "consult", title: "Free Consultation", icon: "solar:chat-round-dots-bold", desc: "Discuss your needs with us." },
];

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];

export function BookingWizard() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [bookingData, setBookingData] = useState({
        service: "",
        date: undefined as Date | undefined,
        time: "",
        name: "",
        phone: "",
        notes: ""
    });

    const supabase = createClient();

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const updateData = (key: string, value: any) => {
        setBookingData(prev => ({ ...prev, [key]: value }));
    };

    const handleConfirmBooking = async () => {
        if (!bookingData.date || !bookingData.time || !bookingData.name || !bookingData.phone) return;

        setLoading(true);
        try {
            // Combine date and time
            const dateStr = format(bookingData.date, "yyyy-MM-dd");
            // Convert "09:00 AM" to "09:00:00"
            const [time, period] = bookingData.time.split(" ");
            let [hours, minutes] = time.split(":");
            if (period === "PM" && hours !== "12") hours = (parseInt(hours) + 12).toString();
            if (period === "AM" && hours === "12") hours = "00";
            const timeStr = `${hours.padStart(2, "0")}:${minutes}:00`;

            const scheduledTime = `${dateStr}T${timeStr}.000Z`;

            const { error } = await supabase
                .from("appointments")
                .insert([
                    {
                        client_name: bookingData.name,
                        service_type: SERVICES.find(s => s.id === bookingData.service)?.title || bookingData.service,
                        scheduled_time: scheduledTime,
                        status: "pending",
                        notes: bookingData.phone + (bookingData.notes ? `\n\nNotes: ${bookingData.notes}` : "")
                    }
                ]);

            if (error) throw error;
            nextStep();
        } catch (error) {
            console.error("Booking error:", error);
            alert("There was an error processing your booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-10 border border-gray-100 relative overflow-hidden font-body">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                <motion.div
                    className="h-full bg-healing-teal"
                    initial={{ width: "25%" }}
                    animate={{ width: `${step * 25}%` }}
                />
            </div>

            <div className="mt-6 mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-triverge-blue mb-2">
                    {step === 1 && "Select a Service"}
                    {step === 2 && "Choose Date & Time"}
                    {step === 3 && "Your Details"}
                    {step === 4 && "Booking Confirmed!"}
                </h2>
                <p className="text-charcoal/60">
                    Step {step} of 4
                </p>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {SERVICES.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => { updateData("service", s.id); nextStep(); }}
                                className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] group ${bookingData.service === s.id ? "border-healing-teal bg-healing-teal/5" : "border-gray-100 hover:border-healing-teal/50"}`}
                            >
                                <Icon icon={s.icon} className="text-4xl text-healing-teal mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold font-heading text-lg text-triverge-blue">{s.title}</h3>
                                <p className="text-sm text-charcoal/60 mt-1">{s.desc}</p>
                            </button>
                        ))}
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col md:flex-row gap-8"
                    >
                        <div
                            className="flex-1 bg-gray-50 rounded-2xl p-4 flex justify-center"
                            style={{ "--rdp-cell-size": "40px" } as React.CSSProperties}
                        >
                            <DayPicker
                                mode="single"
                                selected={bookingData.date}
                                onSelect={(d) => updateData("date", d)}
                                disabled={{ before: new Date() }}
                                className="m-0"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg mb-4 text-triverge-blue">Available Slots</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {TIME_SLOTS.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => updateData("time", t)}
                                        className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${bookingData.time === t ? "bg-triverge-blue text-white border-triverge-blue" : "border-gray-200 text-charcoal hover:border-triverge-blue hover:text-triverge-blue"}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-between">
                                <button onClick={prevStep} className="px-6 py-2 text-charcoal/60 hover:text-charcoal transition-colors">Back</button>
                                <button
                                    onClick={nextStep}
                                    disabled={!bookingData.date || !bookingData.time}
                                    className="px-6 py-2 bg-healing-teal text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-healing-teal/90 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-[500px] mx-auto flex flex-col gap-4"
                    >
                        <div>
                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal placeholder:text-gray-400"
                                placeholder="Your Name"
                                value={bookingData.name}
                                onChange={(e) => updateData("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal placeholder:text-gray-400"
                                placeholder="+234..."
                                value={bookingData.phone}
                                onChange={(e) => updateData("phone", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-charcoal/70 mb-2">Additional Notes (Optional)</label>
                            <textarea
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-healing-teal outline-none transition-all text-charcoal placeholder:text-gray-400 min-h-[100px]"
                                placeholder="Any specific requirements?"
                                value={bookingData.notes}
                                onChange={(e) => updateData("notes", e.target.value)}
                            />
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <button onClick={prevStep} className="px-6 py-2 text-charcoal/60 hover:text-charcoal transition-colors">Back</button>
                            <button
                                onClick={handleConfirmBooking}
                                disabled={!bookingData.name || !bookingData.phone || loading}
                                className="px-8 py-3 bg-triverge-blue text-white rounded-xl font-bold shadow-lg shadow-triverge-blue/20 hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                            >
                                {loading ? "Processing..." : "Confirm Booking"}
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                    >
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon icon="solar:check-circle-bold" className="text-4xl" />
                        </div>
                        <h3 className="text-2xl font-bold font-heading text-triverge-blue mb-4">You're All Set!</h3>
                        <p className="text-charcoal/70 max-w-[400px] mx-auto mb-8">
                            We have received your booking request for <strong>{bookingData.time}</strong> on <strong>{bookingData.date ? format(bookingData.date, "MMMM do") : ""}</strong>. A confirmation SMS will be sent shortly.
                        </p>
                        <button
                            onClick={() => window.location.href = "/"}
                            className="px-8 py-3 bg-gray-100 text-charcoal rounded-xl font-bold hover:bg-gray-200 transition-colors"
                        >
                            Return Home
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
