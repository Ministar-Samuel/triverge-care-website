"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export function Footer() {
    return (
        <footer className="relative w-full bg-[#212121] text-porcelain dark:text-[#f9fffe] py-[80px] px-[20px] md:px-[40px]">
            <div className="max-w-[1440px] mx-auto w-full">

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[60px] mb-[80px]">

                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/triverge-logo.png"
                                alt="Triverge Logo"
                                className="w-[40px] h-[40px] object-contain brightness-0 invert"
                            />
                            <span className="text-2xl font-bold font-heading dark:text-[#f9fffe]">Triverge</span>
                        </Link>
                        <p className="text-lg font-body italic opacity-80 dark:text-[#f9fffe] dark:opacity-100">
                            Comfort. Dignity. Expertise.
                        </p>
                        <div className="flex gap-4 mt-4">
                            {[
                                { icon: "solar:facebook-bold", href: "#" },
                                { icon: "solar:instagram-bold", href: "#" },
                                { icon: "ri:twitter-x-fill", href: "#" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-healing-teal transition-colors group">
                                    <Icon icon={social.icon} className="text-xl group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Contact */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">Phone</h4>
                            <div className="flex flex-col gap-2 font-heading font-medium">
                                <a href="tel:+2347053390270" className="hover:text-healing-teal transition-colors dark:text-[#f9fffe]">+234 705 3390 270</a>
                                <a href="tel:+2347053390269" className="hover:text-healing-teal transition-colors dark:text-[#f9fffe]">+234 705 3390 269</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">Geriatric Centre</h4>
                            <p className="font-body opacity-80 leading-relaxed dark:text-[#f9fffe] dark:opacity-100">
                                15, Oyeniwe Street,<br />Amuda, Bashorun,<br />Ibadan.
                            </p>
                        </div>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Quick Links</h4>
                        <div className="flex flex-col gap-3 font-heading group/links">
                            <Link href="/hcap" className="text-lg text-healing-teal font-bold hover:translate-x-2 transition-all duration-300 group-hover/links:opacity-50 hover:!opacity-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-healing-teal animate-pulse" />
                                HCAP Training Programme
                            </Link>
                            <Link href="/about" className="text-lg hover:text-healing-teal hover:translate-x-2 transition-all duration-300 group-hover/links:opacity-50 hover:!opacity-100 dark:text-[#f9fffe]">
                                About Us
                            </Link>
                            <Link href="/services" className="text-lg hover:text-healing-teal hover:translate-x-2 transition-all duration-300 group-hover/links:opacity-50 hover:!opacity-100 dark:text-[#f9fffe]">
                                Our Services
                            </Link>
                            <Link href="/blog" className="text-lg hover:text-healing-teal hover:translate-x-2 transition-all duration-300 group-hover/links:opacity-50 hover:!opacity-100 dark:text-[#f9fffe]">
                                Blog
                            </Link>
                        </div>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Stay Updated</h4>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-transparent border-b border-white/30 py-4 text-white focus:outline-none focus:border-healing-teal transition-colors pr-[100px]"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-healing-teal font-bold text-sm uppercase tracking-wide hover:text-white transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
                    <p>© 2026 Triverge Healthcare. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors dark:text-[#f9fffe]">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors dark:text-[#f9fffe]">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
