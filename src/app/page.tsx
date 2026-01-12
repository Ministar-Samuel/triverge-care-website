import { Hero } from "@/components/home/Hero";
import { CentreFeature } from "@/components/home/CentreFeature";
import { ServicesBento } from "@/components/home/ServicesBento";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HCAPSection } from "@/components/home/HCAPSection";
import { PreFooter } from "@/components/home/PreFooter";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 z-10 bg-background relative shadow-2xl mb-[0px]">
      <Hero />
      <CentreFeature />
      <ServicesBento />
      <WhyChooseUs />
      <HCAPSection />
      <PreFooter />
      <TestimonialCarousel />
      <NewsletterSection />
    </div>
  );
}
