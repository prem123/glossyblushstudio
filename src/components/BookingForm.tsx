"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import {
  User,
  Phone,
  Mail,
  Scissors,
  Calendar,
  Clock,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { SERVICES } from "./Services";

/* ─── Types ──────────────────────────────────────── */
export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  subservice: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

/* ─── Constants ──────────────────────────────────── */
const STORAGE_KEY = "glossy_blush_appointments";
const ADMIN_STORAGE_KEY = "glossy_blush_all_appointments";
const WA_NUMBER = "6737406316";

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM",
];

/* ─── Helpers ────────────────────────────────────── */
function generateId() {
  return `appt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getAvailableDates() {
  const today = startOfDay(new Date());
  const dates: Date[] = [];
  for (let i = 1; i <= 30; i++) {
    dates.push(addDays(today, i));
  }
  return dates;
}

/* ─── Input field wrapper ────────────────────────── */
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#FFF5F7] text-sm font-medium">
        {label}
        {required && <span className="text-[#F472B6] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <div
          className="flex items-center gap-1.5 text-xs text-red-400"
          role="alert"
        >
          <AlertCircle size={12} />
          {error}
        </div>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl glass border text-[#FFF5F7] text-sm placeholder:text-[#A89097]/60 focus:outline-none focus:ring-2 focus:ring-[#E91E8C]/50 transition-all duration-200 min-h-[44px] ${
    hasError
      ? "border-red-400/50 focus:ring-red-400/50"
      : "border-white/10 focus:border-[#E91E8C]/50"
  }`;
}

/* ─── Steps ──────────────────────────────────────── */
type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  subservice: string;
  date: string;
  time: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const STEPS = ["Personal Info", "Select Service", "Date & Time"];

/* ─── Step 1: Personal Info ──────────────────────── */
function Step1({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: FormErrors;
  onChange: (k: keyof FormData, v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <Field label="Full Name" required error={errors.name}>
        <div className="relative">
          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89097]" />
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Siti Nurhaliza"
            className={`${inputClass(!!errors.name)} pl-10`}
            autoComplete="name"
          />
        </div>
      </Field>

      <Field label="Phone Number" required error={errors.phone}>
        <div className="relative">
          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89097]" />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+673 8XX XXXX"
            className={`${inputClass(!!errors.phone)} pl-10`}
            autoComplete="tel"
          />
        </div>
      </Field>

      <Field label="Email Address" error={errors.email}>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89097]" />
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="your@email.com"
            className={`${inputClass(!!errors.email)} pl-10`}
            autoComplete="email"
          />
        </div>
      </Field>
    </div>
  );
}

/* ─── Step 2: Service selection ──────────────────── */
function Step2({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: FormErrors;
  onChange: (k: keyof FormData, v: string) => void;
}) {
  const selectedSvc = SERVICES.find((s) => s.id === data.service);

  return (
    <div className="space-y-6">
      <Field label="Service Category" required error={errors.service}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            const active = data.service === svc.id;
            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => {
                  onChange("service", svc.id);
                  onChange("subservice", "");
                }}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-200 min-h-[80px] ${
                  active
                    ? "border-[#E91E8C] bg-[#E91E8C]/15 text-[#E91E8C]"
                    : "border-white/10 text-[#A89097] hover:border-white/20 hover:text-[#FFF5F7] hover:bg-white/5"
                }`}
              >
                <Icon size={20} style={active ? { color: svc.color } : {}} />
                <span className="text-xs font-medium leading-tight">{svc.title}</span>
              </button>
            );
          })}
        </div>
      </Field>

      {selectedSvc && (
        <Field label="Specific Treatment" required error={errors.subservice}>
          <div className="grid grid-cols-2 gap-2">
            {selectedSvc.subservices.map((sub) => {
              const active = data.subservice === sub;
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => onChange("subservice", sub)}
                  className={`px-4 py-2.5 rounded-lg border text-sm text-left transition-all duration-200 min-h-[44px] ${
                    active
                      ? "border-[#E91E8C] bg-[#E91E8C]/15 text-[#E91E8C]"
                      : "border-white/10 text-[#A89097] hover:border-white/20 hover:text-[#FFF5F7] hover:bg-white/5"
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </Field>
      )}
    </div>
  );
}

/* ─── Step 3: Date & Time ────────────────────────── */
function Step3({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: FormErrors;
  onChange: (k: keyof FormData, v: string) => void;
}) {
  const dates = getAvailableDates();

  return (
    <div className="space-y-6">
      <Field label="Select Date" required error={errors.date}>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 max-h-52 overflow-y-auto pr-1">
          {dates.map((d) => {
            const iso = format(d, "yyyy-MM-dd");
            const active = data.date === iso;
            const dayNum = format(d, "d");
            const dayName = format(d, "EEE");
            const monthName = format(d, "MMM");
            return (
              <button
                key={iso}
                type="button"
                onClick={() => onChange("date", iso)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl border text-center transition-all duration-200 min-h-[60px] ${
                  active
                    ? "border-[#E91E8C] bg-[#E91E8C]/20 text-[#E91E8C]"
                    : "border-white/10 text-[#A89097] hover:border-white/20 hover:text-[#FFF5F7] hover:bg-white/5"
                }`}
              >
                <span className="text-[10px] opacity-70">{dayName}</span>
                <span className="font-bold text-base leading-tight">{dayNum}</span>
                <span className="text-[10px] opacity-70">{monthName}</span>
              </button>
            );
          })}
        </div>
      </Field>

      {data.date && (
        <Field label="Select Time" required error={errors.time}>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = data.time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onChange("time", slot)}
                  className={`py-2 px-2 rounded-lg border text-xs text-center transition-all duration-200 min-h-[44px] ${
                    active
                      ? "border-[#E91E8C] bg-[#E91E8C]/20 text-[#E91E8C]"
                      : "border-white/10 text-[#A89097] hover:border-white/20 hover:text-[#FFF5F7] hover:bg-white/5"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </Field>
      )}
    </div>
  );
}

/* ─── Confirmation screen ────────────────────────── */
function Confirmation({ appt, onNew }: { appt: Appointment; onNew: () => void }) {
  const svc = SERVICES.find((s) => s.id === appt.service);
  const dateFormatted = format(new Date(appt.date + "T00:00:00"), "EEEE, MMMM d, yyyy");
  const waMsg = `🌸 *New Appointment Request*\n\n*Name:* ${appt.name}\n*Phone:* ${appt.phone}${appt.email ? `\n*Email:* ${appt.email}` : ""}\n*Service:* ${svc?.title} — ${appt.subservice}\n*Date:* ${dateFormatted}\n*Time:* ${appt.time}\n*Booking ID:* ${appt.id.slice(0, 16)}\n\n_Booked via Glossy Blush Website_`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E91E8C] to-[#FF6EB4] flex items-center justify-center shadow-xl shadow-[#E91E8C]/30">
        <CheckCircle size={36} className="text-white" />
      </div>
      <h3
        className="font-heading text-3xl text-[#FFF5F7] mb-2"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Booking Confirmed!
      </h3>
      <p className="text-[#A89097] mb-6">
        We&apos;re looking forward to seeing you, {appt.name.split(" ")[0]}.
      </p>

      <div className="glass rounded-2xl p-5 text-left space-y-3 mb-6 border border-[#E91E8C]/20">
        {[
          { label: "Service", value: `${svc?.title} — ${appt.subservice}` },
          { label: "Date", value: dateFormatted },
          { label: "Time", value: appt.time },
          { label: "Booking ID", value: appt.id.slice(0, 16) },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-2 text-sm">
            <span className="text-[#A89097] shrink-0">{label}</span>
            <span className="text-[#FFF5F7] text-right">{value}</span>
          </div>
        ))}
      </div>

      {/* Primary WhatsApp CTA */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold text-base mb-4 hover:opacity-90 hover:scale-[1.02] transition-all duration-200 min-h-[56px] shadow-lg shadow-black/30"
        style={{ background: "#25D366" }}
      >
        <MessageCircle size={22} fill="white" />
        Tap to Send Booking to WhatsApp
      </a>
      <p className="text-[#A89097] text-xs mb-6">
        This opens WhatsApp with your booking details pre-filled — just hit Send.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onNew}
          className="flex-1 px-6 py-3 rounded-full glass border border-[#E91E8C]/30 text-[#E91E8C] text-sm font-medium hover:bg-white/5 transition-all duration-200 min-h-[44px]"
        >
          Book Another
        </button>
        <a
          href="/appointments"
          className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white text-sm font-medium text-center hover:shadow-lg hover:shadow-[#E91E8C]/30 hover:scale-105 transition-all duration-200 min-h-[44px] flex items-center justify-center"
        >
          View My Appointments
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────── */
export default function BookingForm({
  prefill,
}: {
  prefill?: Partial<FormData>;
}) {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") ?? "";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [data, setData] = useState<FormData>({
    name: prefill?.name ?? "",
    phone: prefill?.phone ?? "",
    email: prefill?.email ?? "",
    service: prefill?.service ?? serviceParam ?? "",
    subservice: prefill?.subservice ?? "",
    date: prefill?.date ?? "",
    time: prefill?.time ?? "",
  });

  const onChange = (k: keyof FormData, v: string) => {
    setData((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const errs: FormErrors = {};
    if (s === 0) {
      if (!data.name.trim()) errs.name = "Full name is required";
      if (!data.phone.trim()) errs.phone = "Phone number is required";
      else if (!/^\+?[\d\s\-()]{7,}$/.test(data.phone))
        errs.phone = "Please enter a valid phone number";
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errs.email = "Please enter a valid email address";
    } else if (s === 1) {
      if (!data.service) errs.service = "Please select a service category";
      if (!data.subservice) errs.subservice = "Please select a specific treatment";
    } else if (s === 2) {
      if (!data.date) errs.date = "Please select a date";
      if (!data.time) errs.time = "Please select a time slot";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    const appt: Appointment = {
      ...data,
      id: generateId(),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    // Save to user's own storage
    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    ) as Appointment[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, appt]));

    // Also save to admin-visible shared storage
    const allExisting = JSON.parse(
      localStorage.getItem(ADMIN_STORAGE_KEY) ?? "[]"
    ) as Appointment[];
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify([...allExisting, appt]));

    setLoading(false);
    setConfirmed(appt);
  };

  const resetForm = () => {
    setData({
      name: "",
      phone: "",
      email: "",
      service: "",
      subservice: "",
      date: "",
      time: "",
    });
    setStep(0);
    setErrors({});
    setConfirmed(null);
  };

  if (confirmed) {
    return <Confirmation appt={confirmed} onNew={resetForm} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                i < step
                  ? "bg-gradient-to-br from-[#E91E8C] to-[#FF6EB4] text-white"
                  : i === step
                  ? "border-2 border-[#E91E8C] text-[#E91E8C]"
                  : "border-2 border-white/20 text-[#A89097]"
              }`}
            >
              {i < step ? <CheckCircle size={14} /> : i + 1}
            </div>
            <span
              className={`hidden sm:block text-xs transition-colors duration-200 ${
                i === step ? "text-[#FFF5F7]" : "text-[#A89097]"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-px transition-colors duration-300 ${
                  i < step ? "bg-[#E91E8C]" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <h3
            className="font-heading text-xl text-[#FFF5F7] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {STEPS[step]}
          </h3>

          {step === 0 && <Step1 data={data} errors={errors} onChange={onChange} />}
          {step === 1 && <Step2 data={data} errors={errors} onChange={onChange} />}
          {step === 2 && <Step3 data={data} errors={errors} onChange={onChange} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-5 py-3 rounded-full glass border border-white/10 text-[#A89097] text-sm hover:text-[#FFF5F7] hover:border-white/20 transition-all duration-200 min-h-[44px]"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        )}

        <div className="flex-1" />

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#E91E8C]/30 hover:scale-105 transition-all duration-200 min-h-[44px]"
          >
            Continue
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#E91E8C]/30 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 min-h-[44px]"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Confirming…
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Confirm Booking
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
