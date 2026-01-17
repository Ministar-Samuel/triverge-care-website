import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { FAQSection } from "@/components/contact/FAQSection";

export const metadata: Metadata = {
    title: "Contact Us | Triverge Healthcare",
    description: "Get in touch with Triverge Healthcare. Call us, visit our Ibadan centre, or request a call back to discuss your elderly care needs.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-background">
            <ContactHero />
            <FAQSection />
        </main>
    );
}
