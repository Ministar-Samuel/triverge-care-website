"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const CONTACT_INFO = [
    { icon: "solar:phone-calling-bold-duotone", text: "+234 705 3390 270", sub: "+234 705 3390 269", href: "tel:+2347053390270" },
    { icon: "solar:letter-bold-duotone", text: "info@trivergecare.com", href: "mailto:info@trivergecare.com" },
    { icon: "solar:map-point-bold-duotone", text: "15, Oyenwa Street, Amuda, Bashorun, Ibadan.", href: "https://maps.google.com" },
];

export function ContactHero() {
    return (
        <div className="pt-[120px] pb-[80px] px-[20px] md:px-[40px] bg-white dark:bg-background">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[60px]">

                {/* Left: Contact Details */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-5 flex flex-col gap-10"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-triverge-blue dark:text-white mb-4">
                            Talk to Us
                        </h1>
                        <p className="text-xl font-body text-charcoal/80 dark:text-white/80 font-light leading-relaxed">
                            Every family’s situation is different. Let’s discuss what you need and how we can help.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {CONTACT_INFO.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="flex items-start gap-4 group"
                            >
                                <div className="w-[50px] h-[50px] rounded-full bg-healing-teal/10 flex items-center justify-center group-hover:bg-healing-teal transition-colors duration-300 shrink-0">
                                    <Icon icon={item.icon} className="text-2xl text-healing-teal group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium font-heading text-charcoal dark:text-white group-hover:text-triverge-blue dark:group-hover:text-healing-teal transition-colors">
                                        {item.text}
                                    </p>
                                    {item.sub && (
                                        <p className="text-lg font-medium font-heading text-charcoal/60 dark:text-white/60 group-hover:text-triverge-blue dark:group-hover:text-healing-teal transition-colors">
                                            {item.sub}
                                        </p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Simple Map Thumbnail Placeholder */}
                    <div className="w-full h-[200px] bg-gray-100 rounded-[24px] overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                            <Icon icon="solar:map-point-bold" className="text-4xl" />
                            <span className="ml-2 font-bold">view on map</span>
                        </div>
                        {/* In real app, embed Google Map iframe here */}
                    </div>
                </motion.div>

                {/* Right: Request Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-7"
                >
                    <div className="bg-[#f9f9f9] dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[24px] p-[30px] md:p-[40px] shadow-sm">
                        <h3 className="text-2xl font-bold font-heading text-triverge-blue dark:text-white mb-8">Request a Call Back</h3>

                        <form className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-charcoal/60 dark:text-white/60 uppercase tracking-wide">Name</label>
                                    <input
                                        type="text"
                                        className="bg-transparent border-b border-triverge-blue/30 dark:border-white/30 py-2 text-lg text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors placeholder:text-gray-300"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-charcoal/60 dark:text-white/60 uppercase tracking-wide">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="bg-transparent border-b border-triverge-blue/30 dark:border-white/30 py-2 text-lg text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors placeholder:text-gray-300"
                                        placeholder="+234..."
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-charcoal/60 dark:text-white/60 uppercase tracking-wide">Preferred Time to Call</label>
                                <select className="bg-transparent border-b border-triverge-blue/30 dark:border-white/30 py-2 text-lg text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors cursor-pointer">
                                    <option>Morning (9AM - 12PM)</option>
                                    <option>Afternoon (12PM - 4PM)</option>
                                    <option>Evening (4PM - 7PM)</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-charcoal/60 dark:text-white/60 uppercase tracking-wide">Short Message</label>
                                <textarea
                                    rows={3}
                                    className="bg-transparent border-b border-triverge-blue/30 dark:border-white/30 py-2 text-lg text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors resize-none placeholder:text-gray-300"
                                    placeholder="Briefly describe what you need help with..."
                                ></textarea>
                            </div>

                            <button className="mt-4 w-full py-4 bg-triverge-blue hover:bg-healing-teal text-white rounded-xl font-bold font-heading transition-colors relative overflow-hidden group">
                                <span className="relative z-10">Request Call Back</span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                            </button>
                        </form>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
