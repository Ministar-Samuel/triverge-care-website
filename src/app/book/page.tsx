import { BookingWizard } from "@/components/booking/BookingWizard";

export default function BookPage() {
    return (
        <section className="pt-[160px] pb-[100px] px-4 md:px-8 bg-[#f9fffe] min-h-[calc(100vh-80px)]">
            <div className="max-w-[800px] mx-auto">
                <div className="text-center mb-12">
                    <span className="text-healing-teal font-bold tracking-widest uppercase text-sm mb-3 block">Simple & Fast</span>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-triverge-blue mb-6">
                        Book Your Appointment
                    </h1>
                    <p className="text-xl text-charcoal/70 max-w-[600px] mx-auto">
                        Schedule a home visit, consultation, or facility tour in just a few clicks.
                    </p>
                </div>

                <BookingWizard />
            </div>
        </section>
    );
}
