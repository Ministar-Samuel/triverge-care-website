import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ServicesBento } from "@/components/home/ServicesBento";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) return { title: "Service Not Found" };

    return {
        title: `${service.title} | Triverge Healthcare`,
        description: service.tagline,
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-porcelain dark:bg-background">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={service.heroImage}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-center pb-[80px]">
                    <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] w-full">
                        <span className="inline-block px-4 py-1 rounded-full bg-healing-teal/20 backdrop-blur-md border border-healing-teal/30 text-white font-bold tracking-widest text-xs uppercase mb-6">
                            Our Services
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 max-w-[800px]">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-body max-w-[600px] italic">
                            {service.tagline}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] py-[100px] grid grid-cols-1 lg:grid-cols-12 gap-[60px]">

                {/* Main Text & Features */}
                <div className="lg:col-span-7 flex flex-col gap-10">
                    <div>
                        <h2 className="text-3xl font-bold font-heading text-triverge-blue dark:text-white mb-6">About this Service</h2>
                        <p className="text-lg font-body text-charcoal/80 dark:text-white/80 leading-relaxed">
                            {service.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold font-heading text-triverge-blue dark:text-white mb-6">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                    <Icon icon="solar:check-circle-bold" className="text-healing-teal text-xl" />
                                    <span className="font-heading font-medium text-charcoal dark:text-white">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Benefits Sidebar */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="bg-white dark:bg-white/5 p-[40px] rounded-[32px] shadow-lg border border-gray-100 dark:border-white/10 sticky top-[100px]">
                        <h3 className="text-2xl font-bold font-heading text-triverge-blue dark:text-white mb-8">Why Choose Us?</h3>

                        <div className="flex flex-col gap-8">
                            {service.benefits.map((benefit, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-[50px] h-[50px] rounded-full bg-healing-teal/10 flex items-center justify-center shrink-0">
                                        <Icon icon={benefit.icon} className="text-2xl text-healing-teal" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-heading text-triverge-blue dark:text-white text-lg mb-1">{benefit.title}</h4>
                                        <p className="text-sm font-body text-charcoal/60 dark:text-white/60 leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/10">
                            <Link
                                href="/book"
                                className="w-full py-4 bg-triverge-blue hover:bg-healing-teal text-white rounded-xl font-bold font-heading transition-colors flex items-center justify-center gap-2"
                            >
                                <Icon icon="solar:calendar-add-bold" className="text-xl" />
                                Book Consultation
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            {/* Reusing Bento Grid for "Explore More" feel */}
            <div className="py-[100px] bg-white dark:bg-black/20">
                <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] mb-12">
                    <h2 className="text-3xl font-bold font-heading text-center text-triverge-blue dark:text-white">Other Services</h2>
                </div>
                {/* Note: In a real app we might filter out the current service */}
                <ServicesBento />
            </div>

        </main>
    );
}
