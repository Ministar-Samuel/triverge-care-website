"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        return scrollY.onChange((latest) => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Show when scrolled 60% of the page
            if (latest > docHeight * 0.4) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    }, [scrollY]);

    return (
        <motion.div
            className="fixed bottom-0 left-0 w-full z-50 px-[20px] md:px-[40px] pb-[20px] pointer-events-none"
            initial={{ y: "100%" }}
            animate={{ y: isVisible ? "0%" : "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
            <div className="pointer-events-auto max-w-[800px] mx-auto bg-white/90 backdrop-blur-md border border-triverge-blue/10 rounded-full shadow-2xl p-[10px] pl-[30px] flex items-center justify-between">

                <span className="font-heading font-medium text-triverge-blue hidden sm:block">
                    Not sure which service is right?
                </span>

                <Link
                    href="/book"
                    className="flex items-center gap-2 px-[24px] py-[12px] bg-healing-teal text-white rounded-full font-bold font-heading hover:bg-healing-teal/90 transition-colors shadow-lg hover:shadow-healing-teal/30 ml-auto sm:ml-0"
                >
                    Book a Consultation
                    <Icon icon="solar:calendar-add-bold" className="text-xl" />
                </Link>

            </div>
        </motion.div>
    );
}
