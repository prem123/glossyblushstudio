"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, AlertCircle } from "lucide-react";
import AppointmentCard from "./AppointmentCard";
import type { Appointment } from "./BookingForm";

const STORAGE_KEY = "glossy_blush_appointments";

type Filter = "all" | "confirmed" | "cancelled";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loaded, setLoaded] = useState(false);
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Appointment[];
        setAppointments(parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      } catch {
        setAppointments([]);
      }
    }
    setLoaded(true);
  }, []);

  const handleCancel = (id: string) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "cancelled" as const } : a
    );
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setCancelId(null);
  };

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  if (!loaded) {
    return (
      <div className="text-center py-16 text-[#A89097]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#E91E8C]/30 border-t-[#E91E8C] rounded-full mx-auto mb-3"
        />
        Loading appointments…
      </div>
    );
  }

  return (
    <div>
      {/* Filter tabs */}
      {appointments.length > 0 && (
        <div
          className="flex items-center gap-2 mb-6 glass rounded-full p-1 w-fit mx-auto"
          role="tablist"
          aria-label="Filter appointments"
        >
          {(["all", "confirmed", "cancelled"] as Filter[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm capitalize transition-all duration-200 min-h-[40px] ${
                filter === f
                  ? "bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white shadow-lg"
                  : "text-[#A89097] hover:text-[#FFF5F7]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Cancel confirmation dialog */}
      <AnimatePresence>
        {cancelId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass rounded-2xl p-7 border border-white/10 max-w-sm w-full text-center shadow-2xl"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                  <AlertCircle size={26} className="text-red-400" />
                </div>
                <h3
                  className="font-heading text-xl text-[#FFF5F7] mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Cancel Appointment?
                </h3>
                <p className="text-[#A89097] text-sm mb-6">
                  This action cannot be undone. You can rebook the same service afterwards.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCancelId(null)}
                    className="flex-1 px-4 py-2.5 rounded-full glass border border-white/10 text-[#A89097] text-sm hover:text-[#FFF5F7] transition-colors min-h-[44px]"
                  >
                    Keep it
                  </button>
                  <button
                    onClick={() => handleCancel(cancelId)}
                    className="flex-1 px-4 py-2.5 rounded-full bg-red-500/80 text-white text-sm hover:bg-red-500 transition-colors min-h-[44px]"
                  >
                    Yes, cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Appointments list */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((appt, i) => (
            <AppointmentCard
              key={appt.id}
              appt={appt}
              onCancel={(id) => setCancelId(id)}
              index={i}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E91E8C]/10 border border-[#E91E8C]/20 flex items-center justify-center">
            <Calendar size={32} className="text-[#E91E8C]" />
          </div>
          <h3
            className="font-heading text-2xl text-[#FFF5F7] mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {filter === "all" ? "No appointments yet" : `No ${filter} appointments`}
          </h3>
          <p className="text-[#A89097] text-sm mb-8 max-w-xs mx-auto">
            {filter === "all"
              ? "Book your first luxury beauty treatment and start your journey to radiance."
              : "Switch to 'All' to see all your appointments."}
          </p>
          {filter === "all" && (
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white font-medium hover:shadow-xl hover:shadow-[#E91E8C]/30 hover:scale-105 transition-all duration-300 min-h-[52px]"
            >
              <Sparkles size={15} />
              Book Now
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
