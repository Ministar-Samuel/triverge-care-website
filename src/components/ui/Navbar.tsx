"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
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
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full h-[80px] bg-white/70 backdrop-blur-md border-b border-triverge-blue/10 shadow-sm transition-colors duration-300">
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
                    <span className="hidden md:block text-xl font-bold font-heading text-[#2d4375] tracking-tight transition-colors">
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
                                            ? "text-triverge-blue"
                                            : "text-charcoal hover:text-triverge-blue"
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute left-0 -bottom-1 h-[2px] bg-triverge-blue transition-all duration-300",
                                        isActive ? "w-full" : "w-0 group-hover:w-full"
                                    )} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right: Actions */}
                <div className="flex items-center gap-[15px]">

                    {/* Search Icon */}
                    <button className="p-2 text-charcoal hover:text-triverge-blue transition-colors rounded-full hover:bg-black/5">
                        <Icon icon="solar:magnifer-linear" className="text-xl" />
                    </button>

                    {/* CTA Button */}
                    <Link
                        href="/book"
                        className="hidden md:block px-[30px] py-[10px] text-[14px] font-bold font-heading text-porcelain bg-triverge-blue rounded-full shadow-lg hover:shadow-xl hover:bg-healing-teal hover:scale-105 transition-all duration-300"
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
                        className="absolute top-[80px] left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden lg:hidden"
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
                                                ? "bg-healing-teal/10 text-triverge-blue"
                                                : "hover:bg-gray-50 text-charcoal"
                                        )}
                                    >
                                        <Icon
                                            icon={link.icon}
                                            className={cn(
                                                "text-xl",
                                                isActive ? "text-healing-teal" : "text-triverge-blue"
                                            )}
                                        />
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="mt-2 pt-2 border-t border-gray-100">
                                <Link
                                    href="/book"
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
