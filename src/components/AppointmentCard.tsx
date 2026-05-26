"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, Scissors, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { SERVICES } from "./Services";
import type { Appointment } from "./BookingForm";

interface Props {
  appt: Appointment;
  onCancel: (id: string) => void;
  index: number;
}

export default function AppointmentCard({ appt, onCancel, index }: Props) {
  const router = useRouter();
  const svc = SERVICES.find((s) => s.id === appt.service);
  const isCancelled = appt.status === "cancelled";

  const handleRebook = () => {
    const params = new URLSearchParams({
      service: appt.service,
      subservice: appt.subservice,
      name: appt.name,
      phone: appt.phone,
      ...(appt.email ? { email: appt.email } : {}),
    });
    router.push(`/book?${params.toString()}`);
  };

  const formattedDate = (() => {
    try {
      return format(new Date(appt.date + "T00:00:00"), "EEE, MMM d, yyyy");
    } catch {
      return appt.date;
    }
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      className={`glass rounded-2xl p-5 border transition-all duration-300 ${
        isCancelled
          ? "border-white/5 opacity-60"
          : "border-white/10 hover:border-[#E91E8C]/25"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Service icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${svc?.color ?? "#E91E8C"}18`,
            border: `1px solid ${svc?.color ?? "#E91E8C"}30`,
          }}
        >
          <Scissors
            size={18}
            style={{ color: svc?.color ?? "#E91E8C" }}
          />
        </div>

        {/* Status badge */}
        <span
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            isCancelled
              ? "bg-red-500/15 text-red-400 border border-red-500/20"
              : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
          }`}
        >
          {isCancelled ? (
            <XCircle size={12} />
          ) : (
            <CheckCircle size={12} />
          )}
          {isCancelled ? "Cancelled" : "Confirmed"}
        </span>
      </div>

      {/* Service info */}
      <h3
        className="font-heading text-lg text-[#FFF5F7] mb-0.5"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {svc?.title ?? appt.service}
      </h3>
      <p className="text-[#A89097] text-sm mb-4">{appt.subservice}</p>

      {/* Date & time */}
      <div className="flex flex-wrap items-center gap-4 mb-5 text-sm">
        <span className="flex items-center gap-1.5 text-[#A89097]">
          <Calendar size={13} className="text-[#E91E8C]" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1.5 text-[#A89097]">
          <Clock size={13} className="text-[#E91E8C]" />
          {appt.time}
        </span>
      </div>

      {/* Name */}
      <p className="text-[#A89097] text-xs mb-4">
        Booked for{" "}
        <span className="text-[#FFF5F7]">{appt.name}</span>
        {appt.phone && (
          <> · <span className="text-[#FFF5F7]">{appt.phone}</span></>
        )}
      </p>

      {/* Actions */}
      {!isCancelled && (
        <div className="flex gap-2">
          <button
            onClick={() => onCancel(appt.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-400/30 text-red-400 text-xs hover:bg-red-400/10 transition-colors min-h-[44px]"
          >
            <XCircle size={13} />
            Cancel
          </button>
          <button
            onClick={handleRebook}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white text-xs hover:shadow-lg hover:shadow-[#E91E8C]/20 hover:scale-105 transition-all duration-200 min-h-[44px]"
          >
            <RotateCcw size={13} />
            Rebook
          </button>
        </div>
      )}
      {isCancelled && (
        <button
          onClick={handleRebook}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass border border-white/10 text-[#A89097] text-xs hover:text-[#FFF5F7] hover:border-white/20 transition-colors min-h-[44px]"
        >
          <RotateCcw size={13} />
          Rebook This Service
        </button>
      )}
    </motion.article>
  );
}
