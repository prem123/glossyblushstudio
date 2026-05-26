import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Book Appointment | Glossy Blush Beauty Studio",
  description: "Book your luxury beauty appointment at Glossy Blush Women's Beauty Studio in Bandar Seri Begawan, Brunei.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#030303] via-[#100810] to-[#030303] pt-24 pb-20 px-4 sm:px-6">
        {/* Background glow */}
        <div
          className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(233,30,140,0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/30 text-[#E91E8C] text-xs tracking-widest uppercase">
              <Sparkles size={12} />
              Appointment
            </div>
            <h1
              className="font-heading text-4xl sm:text-5xl text-[#FFF5F7] mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book Your{" "}
              <span className="bg-gradient-to-r from-[#E91E8C] to-[#F472B6] bg-clip-text text-transparent">
                Session
              </span>
            </h1>
            <p className="text-[#A89097] text-base">
              A luxurious experience awaits. Reserve your spot in minutes.
            </p>
          </div>

          {/* Form panel */}
          <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl shadow-black/50">
            <Suspense fallback={<div className="text-[#A89097] text-center py-8">Loading…</div>}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
