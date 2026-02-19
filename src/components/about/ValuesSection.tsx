"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const VALUES = [
    {
        title: "Comfort",
        desc: "We create a calm, reassuring environment.",
        icon: "solar:sofa-bold-duotone"
    },
    {
        title: "Dignity",
        desc: "We respect every person’s story and choices.",
        icon: "solar:crown-star-bold-duotone"
    },
    {
        title: "Expertise",
        desc: "We use professional knowledge to guide safe, personalized care.",
        icon: "solar:diploma-verified-bold-duotone"
    },
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function ValuesSection() {
    return (
        <section className="py-[100px] px-[20px] md:px-[40px] bg-white">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-[60px]">
                    <h2 className="text-3xl font-bold font-heading text-triverge-blue">Our Core Values</h2>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-[30px]"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {VALUES.map((value, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className="group p-[40px] rounded-[24px] bg-white/50 border border-gray-100 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-healing-teal/10 transition-all duration-300"
                        >
                            <div className="w-[80px] h-[80px] rounded-full bg-healing-teal/10 flex items-center justify-center mb-6 group-hover:bg-healing-teal transition-colors duration-300">
                                <Icon icon={value.icon} className="text-4xl text-healing-teal group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading text-triverge-blue mb-4">
                                {value.title}
                            </h3>
                            <p className="text-lg font-body text-charcoal/80 leading-relaxed">
                                {value.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
