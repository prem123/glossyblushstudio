import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentsList from "@/components/AppointmentsList";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "My Appointments | Glossy Blush Beauty Studio",
  description: "View, cancel, or rebook your beauty appointments at Glossy Blush Women's Beauty Studio.",
};

export default function AppointmentsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#030303] via-[#100810] to-[#030303] pt-24 pb-20 px-4 sm:px-6">
        {/* Background glow */}
        <div
          className="fixed top-1/3 right-1/4 w-[500px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(244,114,182,0.05) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/30 text-[#E91E8C] text-xs tracking-widest uppercase">
              <Sparkles size={12} />
              Your Schedule
            </div>
            <h1
              className="font-heading text-4xl sm:text-5xl text-[#FFF5F7] mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              My{" "}
              <span className="bg-gradient-to-r from-[#E91E8C] to-[#F472B6] bg-clip-text text-transparent">
                Appointments
              </span>
            </h1>
            <p className="text-[#A89097] text-base">
              Manage all your upcoming and past beauty sessions.
            </p>
          </div>

          <AppointmentsList />
        </div>
      </main>
      <Footer />
    </>
  );
}
