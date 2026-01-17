"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const FAQS = [
    { q: "How do we start care services?", a: "Simply call us or request a call back using the form above. We will arrange a free assessment visit to understand your needs and create a personalized care plan." },
    { q: "Do you provide home care?", a: "Yes, we support families in their own homes. Our caregivers can visit daily, live-in, or provide overnight support depending on what your family needs." },
    { q: "Can we visit the centre often?", a: "Absolutely. We encourage family visits. Our centre is designed to be welcoming, and we believe consistent family connection is vital for our residents' well-being." },
    { q: "Do you help with dementia?", a: "Yes. Our team includes specialists trained in dementia care. We focus on validation therapy, routine management, and creating safe environments that reduce anxiety." },
    { q: "Are your caregivers trained?", a: "Every caregiver at Triverge undergoes our rigorous HCAP training program, covering personal care, safety, first aid, and emotional support before they ever attend to a client." },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-[80px] px-[20px] md:px-[40px] bg-[#f9fffe] dark:bg-background">
            <div className="max-w-[800px] mx-auto">
                <div className="text-center mb-[60px]">
                    <h2 className="text-3xl font-bold font-heading text-triverge-blue dark:text-white">Common Questions</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {FAQS.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[16px] overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        >
                            <div className="p-6 flex items-center justify-between gap-4">
                                <h3 className={cn(
                                    "text-lg font-bold font-heading transition-colors",
                                    openIndex === idx ? "text-healing-teal" : "text-triverge-blue dark:text-white"
                                )}>
                                    {faq.q}
                                </h3>
                                <div className={cn(
                                    "w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300",
                                    openIndex === idx ? "bg-healing-teal text-white rotate-45" : "bg-gray-100 dark:bg-white/10 text-charcoal dark:text-white"
                                )}>
                                    <Icon icon="solar:add-circle-bold" className="text-xl" />
                                </div>
                            </div>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pt-0 text-charcoal/80 dark:text-white/80 font-body leading-relaxed border-t border-transparent">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
