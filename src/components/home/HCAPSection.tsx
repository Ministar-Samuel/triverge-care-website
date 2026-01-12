"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { HCAP_CURRICULUM } from "@/lib/data";

export function HCAPSection() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-[#2d4375] text-porcelain relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-healing-teal/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center relative z-10">

                {/* Left: Content */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-[30px]">
                    <div className="flex items-center gap-3 mb-2">
                        <Icon icon="solar:diploma-verified-bold" className="text-3xl text-healing-teal" />
                        <span className="text-healing-teal font-heading font-bold text-sm uppercase tracking-widest">
                            Training Academy
                        </span>
                    </div>

                    <h2 className="text-[40px] lg:text-[56px] font-bold font-heading leading-none dark:text-[#f9fffe]">
                        Become a <span className="text-healing-teal">Certified</span><br />
                        Elderly Caregiver
                    </h2>

                    <p className="text-xl font-body text-porcelain/80 dark:text-[#f9fffe]/80 max-w-[600px] leading-relaxed">
                        Our Home Care Assistant Programme (HCAP) trains caregivers to deliver world-class support with empathy and skill.
                    </p>

                    {/* Curriculum Tags */}
                    <div className="flex flex-wrap gap-[10px] mt-4">
                        {HCAP_CURRICULUM.map((item, idx) => (
                            <span
                                key={idx}
                                className="px-[20px] py-[10px] rounded-full border border-white/30 text-white/90 font-medium font-heading transition-all duration-300 hover:bg-healing-teal hover:border-healing-teal hover:scale-105 cursor-default"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <p className="text-lg font-body italic text-white/60 mt-4 border-l-2 border-healing-teal pl-4">
                        "Graduates receive placement support within our network."
                    </p>

                    {/* Shimmer Button CTA */}
                    <div className="mt-6">
                        <Link
                            href="/hcap"
                            className="relative inline-flex items-center gap-3 px-[40px] py-[18px] bg-white text-triverge-blue dark:text-healing-teal rounded-full text-lg font-bold font-heading overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            Start Training
                            <Icon icon="solar:round-arrow-right-bold" className="text-2xl group-hover:translate-x-1 transition-transform dark:text-healing-teal" />

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] bg-gradient-to-r from-transparent via-healing-teal/20 to-transparent skew-x-12" />
                        </Link>
                    </div>
                </div>

                {/* Right: Graphic */}
                <div className="col-span-1 lg:col-span-5 relative">
                    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-800 group">
                        {/* Training Academy Image */}
                        <img
                            src="/images/training-academy.jpg"
                            alt="Triverge HCAP Student Nurse"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 object-bottom"
                        />
                        <div className="absolute inset-0 bg-triverge-blue/30 mix-blend-multiply" />

                        {/* Certificate Badge */}
                        <div className="absolute bottom-8 right-8 bg-white text-triverge-blue p-6 rounded-2xl shadow-xl max-w-[200px] rotate-[-5deg] hover:rotate-0 transition-transform duration-300 z-10">
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => <Icon key={i} icon="solar:star-bold" className="text-yellow-400 text-sm" />)}
                            </div>
                            <p className="font-bold font-heading leading-tight">
                                Triverge Certified
                            </p>
                            <p className="text-xs text-charcoal/60 mt-1">
                                Industry recognized
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
