"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, Lock, Calendar, Users, CheckCircle, XCircle, Clock, Phone, Mail, Sparkles } from "lucide-react";
import type { Appointment } from "./BookingForm";

const ADMIN_STORAGE_KEY = "glossy_blush_all_appointments";
const PIN = "glossy2024";

const SERVICE_COLORS: Record<string, string> = {
  hair: "#E91E8C",
  nails: "#F472B6",
  facial: "#FF6EB4",
  makeup: "#E91E8C",
  "eyebrow-lash": "#F472B6",
  body: "#FF6EB4",
};

/* ─── PIN screen ─────────────────────────────────── */
function PinScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <motion.div
        animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="glass rounded-3xl p-8 border border-[#E91E8C]/20 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-[#E91E8C]/40">
            <Image src="/logo.jpg" alt="Glossy Blush" width={64} height={64} className="object-cover w-full h-full" />
          </div>
          <h1 className="text-[#FFF5F7] text-2xl font-semibold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
            Owner Dashboard
          </h1>
          <p className="text-[#A89097] text-sm mb-8">Glossy Blush Women&apos;s Beauty Studio</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A89097]" />
              <input
                type="password"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false); }}
                placeholder="Enter PIN"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/10 text-[#FFF5F7] text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-[#E91E8C]/50 focus:border-[#E91E8C]/50 min-h-[52px]"
                autoComplete="off"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs">Incorrect PIN. Try again.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white font-medium hover:shadow-lg hover:shadow-[#E91E8C]/30 hover:scale-[1.02] transition-all duration-200 min-h-[52px]"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Stat card ──────────────────────────────────── */
function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; color: string }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-[#A89097] text-xs uppercase tracking-wide">{label}</p>
        <p className="text-[#FFF5F7] text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

/* ─── Appointment detail panel ───────────────────── */
function AppointmentDetail({ appt, onClose }: { appt: Appointment; onClose: () => void }) {
  const color = SERVICE_COLORS[appt.service] ?? "#E91E8C";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="glass rounded-2xl p-5 border mt-4"
      style={{ borderColor: `${color}30` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[#FFF5F7] font-semibold text-base">{appt.name}</p>
          <p className="text-[#A89097] text-xs capitalize">{appt.service.replace("-", " & ")} — {appt.subservice}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${appt.status === "confirmed" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
          {appt.status}
        </span>
      </div>
      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center gap-2 text-[#A89097]"><Clock size={13} style={{ color }} />{appt.time}</div>
        {appt.phone && <div className="flex items-center gap-2 text-[#A89097]"><Phone size={13} style={{ color }} />{appt.phone}</div>}
        {appt.email && <div className="flex items-center gap-2 text-[#A89097]"><Mail size={13} style={{ color }} />{appt.email}</div>}
      </div>
      <div className="flex gap-2">
        <a
          href={`https://wa.me/${appt.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${appt.name}! This is Glossy Blush Studio confirming your appointment on ${format(new Date(appt.date + "T00:00:00"), "MMMM d")} at ${appt.time} for ${appt.subservice}. See you soon! 🌸`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 text-white text-xs font-medium transition-opacity hover:opacity-90"
          style={{ background: "#25D366" }}
        >
          WhatsApp Client
        </a>
        <button onClick={onClose} className="px-4 py-2 rounded-lg glass border border-white/10 text-[#A89097] text-xs hover:text-[#FFF5F7] transition-colors">
          Close
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Main dashboard ─────────────────────────────── */
function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  useEffect(() => {
    // Merge both keys — covers bookings made before dual-storage was added
    const adminRaw = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY) ?? "[]") as Appointment[];
    const userRaw = JSON.parse(localStorage.getItem("glossy_blush_appointments") ?? "[]") as Appointment[];
    const merged = [...adminRaw, ...userRaw];
    // Deduplicate by id
    const unique = Array.from(new Map(merged.map((a) => [a.id, a])).values());
    setAppointments(unique);
  }, []);

  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    // Pad to start on Monday
    const startDay = (start.getDay() + 6) % 7; // Mon=0
    const padded: (Date | null)[] = Array(startDay).fill(null);
    return [...padded, ...days];
  }, [currentMonth]);

  const apptsByDate = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    for (const a of appointments) {
      if (!map[a.date]) map[a.date] = [];
      map[a.date].push(a);
    }
    return map;
  }, [appointments]);

  const dayAppts = selectedDay
    ? (apptsByDate[format(selectedDay, "yyyy-MM-dd")] ?? []).sort((a, b) => a.time.localeCompare(b.time))
    : [];

  const confirmed = appointments.filter((a) => a.status === "confirmed").length;
  const cancelled = appointments.filter((a) => a.status === "cancelled").length;
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todayCount = (apptsByDate[todayStr] ?? []).filter((a) => a.status === "confirmed").length;

  return (
    <div className="min-h-screen bg-[#030303] text-[#FFF5F7]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#E91E8C]/40">
              <Image src="/logo.jpg" alt="Glossy Blush" width={36} height={36} className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="text-[#FFF5F7] text-sm font-semibold leading-tight">Owner Dashboard</p>
              <p className="text-[#A89097] text-[10px] uppercase tracking-widest">Glossy Blush Studio</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-[#E91E8C]/20 text-[#E91E8C] text-xs">
            <Sparkles size={11} />
            All Appointments
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Bookings" value={appointments.length} icon={Calendar} color="#E91E8C" />
          <StatCard label="Today" value={todayCount} icon={Clock} color="#FF6EB4" />
          <StatCard label="Confirmed" value={confirmed} icon={CheckCircle} color="#4ade80" />
          <StatCard label="Cancelled" value={cancelled} icon={XCircle} color="#f87171" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 border border-white/10">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#FFF5F7] text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-[#A89097] hover:text-[#FFF5F7] transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-3 h-9 rounded-lg glass border border-white/10 text-[#A89097] hover:text-[#FFF5F7] text-xs transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-[#A89097] hover:text-[#FFF5F7] transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="text-center text-[#A89097] text-xs py-2 font-medium">{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                if (!day) return <div key={`pad-${i}`} />;
                const iso = format(day, "yyyy-MM-dd");
                const dayApptList = apptsByDate[iso] ?? [];
                const confirmedCount = dayApptList.filter((a) => a.status === "confirmed").length;
                const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
                const todayDay = isToday(day);
                const otherMonth = !isSameMonth(day, currentMonth);

                return (
                  <button
                    key={iso}
                    onClick={() => { setSelectedDay(day); setSelectedAppt(null); }}
                    className={`relative aspect-square rounded-xl flex flex-col items-center justify-start pt-1.5 text-sm transition-all duration-150 ${
                      isSelected
                        ? "bg-[#E91E8C] text-white shadow-lg shadow-[#E91E8C]/30"
                        : todayDay
                        ? "border-2 border-[#E91E8C] text-[#E91E8C]"
                        : otherMonth
                        ? "text-white/20"
                        : "text-[#FFF5F7] hover:bg-white/5"
                    }`}
                  >
                    <span className="font-medium leading-none">{format(day, "d")}</span>
                    {confirmedCount > 0 && (
                      <div className="flex gap-0.5 mt-1 flex-wrap justify-center px-1">
                        {Array.from({ length: Math.min(confirmedCount, 3) }).map((_, j) => (
                          <span
                            key={j}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: isSelected ? "white" : "#E91E8C" }}
                          />
                        ))}
                        {confirmedCount > 3 && (
                          <span className={`text-[8px] ${isSelected ? "text-white" : "text-[#E91E8C]"}`}>+{confirmedCount - 3}</span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day detail panel */}
          <div className="glass rounded-3xl p-6 border border-white/10 flex flex-col">
            <h3 className="text-[#FFF5F7] font-semibold mb-1">
              {selectedDay ? format(selectedDay, "EEEE, MMMM d") : "Select a day"}
            </h3>
            <p className="text-[#A89097] text-xs mb-5">
              {dayAppts.length === 0 ? "No appointments" : `${dayAppts.length} appointment${dayAppts.length > 1 ? "s" : ""}`}
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 max-h-80 pr-1">
              {dayAppts.length === 0 ? (
                <div className="text-center py-10 text-[#A89097] text-sm">
                  <Calendar size={32} className="mx-auto mb-3 opacity-30" />
                  No bookings on this day
                </div>
              ) : (
                dayAppts.map((appt) => {
                  const color = SERVICE_COLORS[appt.service] ?? "#E91E8C";
                  return (
                    <div key={appt.id}>
                      <button
                        onClick={() => setSelectedAppt(selectedAppt?.id === appt.id ? null : appt)}
                        className="w-full text-left p-3 rounded-xl border transition-all duration-150 hover:border-[#E91E8C]/30"
                        style={{
                          background: `${color}08`,
                          borderColor: selectedAppt?.id === appt.id ? `${color}50` : "rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                            <div className="min-w-0">
                              <p className="text-[#FFF5F7] text-sm font-medium truncate">{appt.name}</p>
                              <p className="text-[#A89097] text-xs truncate">{appt.subservice}</p>
                            </div>
                          </div>
                          <span className="text-[#A89097] text-xs shrink-0">{appt.time}</span>
                        </div>
                      </button>
                      <AnimatePresence>
                        {selectedAppt?.id === appt.id && (
                          <AppointmentDetail appt={appt} onClose={() => setSelectedAppt(null)} />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* All appointments table */}
        <div className="glass rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Users size={18} className="text-[#E91E8C]" />
            <h2 className="text-[#FFF5F7] font-semibold">All Bookings</h2>
            <span className="ml-auto text-[#A89097] text-xs">{appointments.length} total</span>
          </div>
          {appointments.length === 0 ? (
            <div className="text-center py-12 text-[#A89097]">
              <Calendar size={40} className="mx-auto mb-3 opacity-20" />
              <p>No bookings yet. They&apos;ll appear here once customers book.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#A89097] text-xs uppercase tracking-wide border-b border-white/5">
                    {["Name", "Service", "Date", "Time", "Phone", "Status"].map((h) => (
                      <th key={h} className="text-left py-3 pr-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[...appointments].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((appt) => (
                    <tr key={appt.id} className="hover:bg-white/3 transition-colors">
                      <td className="py-3 pr-4 text-[#FFF5F7] font-medium">{appt.name}</td>
                      <td className="py-3 pr-4 text-[#A89097] capitalize">{appt.service.replace("-", " & ")} · {appt.subservice}</td>
                      <td className="py-3 pr-4 text-[#A89097]">{format(new Date(appt.date + "T00:00:00"), "d MMM yyyy")}</td>
                      <td className="py-3 pr-4 text-[#A89097]">{appt.time}</td>
                      <td className="py-3 pr-4">
                        <a href={`tel:${appt.phone}`} className="text-[#E91E8C] hover:underline">{appt.phone}</a>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${appt.status === "confirmed" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Root export ────────────────────────────────── */
export default function AdminDashboard() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("glossy_admin_auth");
    if (saved === "1") setUnlocked(true);
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem("glossy_admin_auth", "1");
    setUnlocked(true);
  };

  return unlocked ? <Dashboard /> : <PinScreen onUnlock={handleUnlock} />;
}
