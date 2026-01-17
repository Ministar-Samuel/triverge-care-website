import type { Metadata } from "next";
import { HCAPHero } from "@/components/hcap/HCAPHero";
import { CurriculumGrid } from "@/components/hcap/CurriculumGrid";
import { TrainingJourney } from "@/components/hcap/TrainingJourney";
import { ApplySection } from "@/components/hcap/ApplySection";

export const metadata: Metadata = {
    title: "HCAP Training Academy | Triverge Healthcare",
    description: "Become a certified elderly caregiver with our Home Care Assistant Programme (HCAP). Learn personal care, dementia support, and more.",
};

export default function HCAPPage() {
    return (
        <main className="min-h-screen bg-porcelain dark:bg-background overflow-x-hidden">
            <HCAPHero />
            <CurriculumGrid />
            <TrainingJourney />
            <ApplySection />
        </main>
    );
}
