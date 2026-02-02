"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/", icon: "solar:home-smile-bold-duotone" },
    { name: "About Us", href: "/about", icon: "solar:users-group-two-rounded-bold-duotone" },
    { name: "Services", href: "/services", icon: "solar:medical-kit-bold-duotone" },
    { name: "HCAP Training", href: "/hcap", icon: "solar:diploma-bold-duotone" },
    { name: "Blog", href: "/blog", icon: "solar:notebook-bold-duotone" },
    { name: "Contact", href: "/contact", icon: "solar:chat-line-bold-duotone" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full h-[80px] bg-white/70 dark:bg-slate-900/90 backdrop-blur-md border-b border-triverge-blue/10 dark:border-white/10 shadow-sm dark:shadow-none transition-colors duration-300">
            <div className="flex justify-between items-center w-full h-full px-[20px] md:px-[40px] max-w-[1440px] mx-auto">

                {/* Left: Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 group transform transition-transform duration-300 hover:scale-105"
                >
                    <Image
                        src="/triverge-logo.png"
                        alt="Triverge Logo"
                        width={40}
                        height={40}
                        priority
                        className="object-contain"
                    />
                    <span className="hidden md:block text-xl font-bold font-heading text-[#2d4375] dark:text-white tracking-tight transition-colors">
                        Triverge <span className="font-extralight opacity-60">| Healthcare</span>
                    </span>
                </Link>

                {/* Center: Desktop Menu */}
                <ul className="hidden lg:flex items-center gap-[30px]">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "relative text-[16px] font-medium font-heading transition-colors group",
                                        isActive
                                            ? "text-triverge-blue dark:text-healing-teal"
                                            : "text-charcoal dark:text-white/90 hover:text-triverge-blue dark:hover:text-healing-teal"
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute left-0 -bottom-1 h-[2px] bg-triverge-blue dark:bg-healing-teal transition-all duration-300",
                                        isActive ? "w-full" : "w-0 group-hover:w-full"
                                    )} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right: Actions */}
                <div className="flex items-center gap-[15px]">

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-charcoal dark:text-white"
                            aria-label="Toggle Theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={theme}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Icon
                                        icon={theme === "dark" ? "solar:moon-bold-duotone" : "solar:sun-bold-duotone"}
                                        className="text-xl"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    )}

                    {/* Search Icon */}
                    <button className="p-2 text-charcoal dark:text-white hover:text-triverge-blue dark:hover:text-healing-teal transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                        <Icon icon="solar:magnifer-linear" className="text-xl" />
                    </button>

                    {/* CTA Button */}
                    <Link
                        href="/contact"
                        className="hidden md:block px-[30px] py-[10px] text-[14px] font-bold font-heading text-porcelain bg-triverge-blue dark:bg-healing-teal rounded-full shadow-lg hover:shadow-xl hover:bg-healing-teal dark:hover:bg-triverge-blue hover:scale-105 transition-all duration-300 dark:text-white"
                    >
                        Book Consultation
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-charcoal hover:text-triverge-blue transition-colors"
                    >
                        <Icon icon={isOpen ? "solar:close-circle-bold-duotone" : "solar:hamburger-menu-bold-duotone"} className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-[80px] left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-white/10 shadow-xl overflow-hidden lg:hidden"
                    >
                        <div className="flex flex-col p-[20px] gap-[10px]">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg transition-colors font-medium",
                                            isActive
                                                ? "bg-healing-teal/10 text-triverge-blue dark:text-healing-teal"
                                                : "hover:bg-gray-50 dark:hover:bg-white/5 text-charcoal dark:text-white"
                                        )}
                                    >
                                        <Icon
                                            icon={link.icon}
                                            className={cn(
                                                "text-xl",
                                                isActive ? "text-healing-teal" : "text-triverge-blue dark:text-healing-teal"
                                            )}
                                        />
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-white/10">
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center w-full p-3 font-bold text-white bg-triverge-blue rounded-xl"
                                >
                                    Book Consultation
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
