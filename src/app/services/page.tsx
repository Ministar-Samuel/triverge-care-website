import { HeroSection } from "@/components/services/HeroSection";
import { ServiceDirectory } from "@/components/services/ServiceDirectory";
import { FloatingCTA } from "@/components/services/FloatingCTA";
import { VideoTestimonials } from "@/components/services/VideoTestimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Triverge Healthcare",
    description: "Explore our comprehensive elderly care services, from skilled nursing and rehabilitation to dementia support and companionship.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <ServiceDirectory />
            <VideoTestimonials />
            <FloatingCTA />
        </main>
    );
}
