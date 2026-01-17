"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { VIDEO_TESTIMONIALS } from "@/lib/data";

export function VideoTestimonials() {
    const [selectedVideo, setSelectedVideo] = useState<typeof VIDEO_TESTIMONIALS[0] | null>(null);

    return (
        <section className="py-[100px] bg-[#1a1f2e] text-white overflow-hidden relative">
            <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] mb-[60px] text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Real Stories, Real Impact</h2>
                <p className="text-lg opacity-70 max-w-[600px] mx-auto">See how Triverge Healthcare has made a difference in the lives of families across Nigeria.</p>
            </div>

            {/* Video Strip */}
            <div className="relative w-full overflow-hidden">
                {/* Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-[50px] md:w-[100px] bg-gradient-to-r from-[#1a1f2e] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-[50px] md:w-[100px] bg-gradient-to-l from-[#1a1f2e] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-[30px] w-max px-[40px]"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop" as const,
                            duration: 30,
                            ease: "linear" as const,
                        },
                    }}
                >
                    {[...VIDEO_TESTIMONIALS, ...VIDEO_TESTIMONIALS, ...VIDEO_TESTIMONIALS].map((video, idx) => (
                        <motion.div
                            key={`${video.id}-${idx}`}
                            className="relative w-[300px] md:w-[400px] aspect-video rounded-[24px] overflow-hidden cursor-pointer group border border-white/10"
                            whileHover={{ scale: 1.05, borderColor: "rgba(46, 166, 154, 0.5)" }}
                            onClick={() => setSelectedVideo(video)}
                        >
                            <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                <div className="w-[60px] h-[60px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-healing-teal transition-colors">
                                    <Icon icon="solar:play-bold" className="text-2xl text-white ml-1" />
                                </div>
                            </div>

                            {/* Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h4 className="font-bold font-heading text-white text-lg">{video.name}</h4>
                                <p className="text-white/70 text-sm">{video.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-[1000px] aspect-video bg-black rounded-[24px] overflow-hidden shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 w-[40px] h-[40px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                                <Icon icon="solar:close-circle-bold" className="text-2xl" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
