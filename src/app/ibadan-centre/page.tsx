import { HeroSection } from "@/components/ibadan/HeroSection";
import { ApproachSection } from "@/components/ibadan/ApproachSection";
import { ServicesMarquee } from "@/components/ibadan/ServicesMarquee";
import { DailyTimeline } from "@/components/ibadan/DailyTimeline";
import { TeamStack } from "@/components/ibadan/TeamStack";
import { AdmissionsProcess } from "@/components/ibadan/AdmissionsProcess";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Geriatric Centre (Ibadan) | Triverge Healthcare",
    description: "A sanctuary for elderly care in Ibadan, offering specialized nursing, dementia support, and holistic well-being.",
};

export default function IbadanCentrePage() {
    return (
        <main className="min-h-screen bg-porcelain dark:bg-background">
            <HeroSection />
            <ApproachSection />
            <ServicesMarquee />
            <DailyTimeline />
            <TeamStack />
            <AdmissionsProcess />
        </main>
    );
}
