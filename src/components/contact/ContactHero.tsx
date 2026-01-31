"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const CONTACT_INFO = [
    { icon: "solar:phone-calling-bold-duotone", text: "+234 705 3390 270", sub: "+234 705 3390 269", href: "tel:+2347053390270" },
    { icon: "solar:letter-bold-duotone", text: "info@trivergecare.com", href: "mailto:info@trivergecare.com" },
    { icon: "solar:map-point-bold-duotone", text: "15, Oyeniwe Street, Amuda, Bashorun, Ibadan.", href: "https://maps.google.com" },
];

export function ContactHero() {
    return (
        <div className="pt-[120px] pb-[100px] px-[20px] md:px-[40px] bg-white dark:bg-background">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-[100px]">

                {/* Top Section: Info & Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">

                    {/* Left: Contact Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-10"
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
                    </motion.div>

                    {/* Right: Map View */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl relative border-8 border-white dark:border-white/5"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.40251761616!2d3.921312373972234!3d7.420601312015509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039933939393939%3A0x3939393939393939!2s15%20Oyeniwe%20St%2C%20Bashorun%20200223%2C%20Ibadan%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1738304000000!5m2!1sen!2sng"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale contrast-110 invert-[0.05] dark:invert-[0.9] transition-all"
                        ></iframe>
                    </motion.div>
                </div>

                {/* Bottom Section: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-[800px] mx-auto w-full"
                >
                    <div className="bg-[#f9f9f9] dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[40px] p-[40px] md:p-[60px] shadow-2xl relative overflow-hidden">
                        {/* Decorative Background Icon */}
                        <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
                            <Icon icon="solar:phone-calling-bold-duotone" className="text-[200px] text-triverge-blue" />
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold font-heading text-triverge-blue dark:text-white mb-10 text-center">Request a Call Back</h3>

                        <form className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black text-charcoal/40 dark:text-white/40 uppercase tracking-[0.2em]">Full Name</label>
                                    <input
                                        type="text"
                                        className="bg-transparent border-b-2 border-triverge-blue/10 dark:border-white/10 py-3 text-xl text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors placeholder:text-gray-300 font-heading"
                                        placeholder="Dr. Jane Doe"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black text-charcoal/40 dark:text-white/40 uppercase tracking-[0.2em]">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="bg-transparent border-b-2 border-triverge-blue/10 dark:border-white/10 py-3 text-xl text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors placeholder:text-gray-300 font-heading"
                                        placeholder="+234..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black text-charcoal/40 dark:text-white/40 uppercase tracking-[0.2em]">Preferred Time</label>
                                    <div className="relative">
                                        <select className="w-full bg-transparent border-b-2 border-triverge-blue/10 dark:border-white/10 py-3 text-xl text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors cursor-pointer appearance-none font-heading">
                                            <option>Morning (9AM - 12PM)</option>
                                            <option>Afternoon (12PM - 4PM)</option>
                                            <option>Evening (4PM - 7PM)</option>
                                        </select>
                                        <Icon icon="solar:alt-arrow-down-bold-duotone" className="absolute right-0 top-1/2 -translate-y-1/2 text-healing-teal pointer-events-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black text-charcoal/40 dark:text-white/40 uppercase tracking-[0.2em]">Service Interest</label>
                                    <div className="relative">
                                        <select className="w-full bg-transparent border-b-2 border-triverge-blue/10 dark:border-white/10 py-3 text-xl text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors cursor-pointer appearance-none font-heading">
                                            <option>Dementia Care</option>
                                            <option>Skilled Nursing</option>
                                            <option>HCAP Training</option>
                                            <option>Post-Hospital Rehab</option>
                                            <option>Other Enquiry</option>
                                        </select>
                                        <Icon icon="solar:alt-arrow-down-bold-duotone" className="absolute right-0 top-1/2 -translate-y-1/2 text-healing-teal pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-black text-charcoal/40 dark:text-white/40 uppercase tracking-[0.2em]">How can we help?</label>
                                <textarea
                                    rows={4}
                                    className="bg-transparent border-b-2 border-triverge-blue/10 dark:border-white/10 py-3 text-xl text-triverge-blue dark:text-white focus:outline-none focus:border-healing-teal transition-colors resize-none placeholder:text-gray-300 font-heading"
                                    placeholder="Tell us about your family's needs..."
                                ></textarea>
                            </div>

                            <button className="mt-6 w-full py-5 bg-triverge-blue hover:bg-healing-teal text-white rounded-2xl font-bold font-heading text-xl shadow-xl hover:shadow-healing-teal/20 transition-all relative overflow-hidden group">
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Request Call Back
                                    <Icon icon="solar:arrow-right-up-bold" className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1s] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                            </button>
                        </form>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
