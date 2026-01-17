import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { MissionSection } from "@/components/about/MissionSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { TeamSection } from "@/components/about/TeamSection";

export const metadata: Metadata = {
    title: "About Us | Triverge Healthcare",
    description: "Dedicated to improving the quality of life for older adults through compassionate care, clinical excellence, and a supportive community.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-porcelain dark:bg-background overflow-x-hidden">
            <AboutHero />
            <MissionSection />
            <ValuesSection />
            <TeamSection />
        </main>
    );
}
