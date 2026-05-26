"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronDown, Sparkles, MapPin } from "lucide-react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[#030303] via-[#100810] to-[#030303]" />
  ),
});

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const y = window.scrollY;
      scrollRef.current.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030303] via-[#100810] to-[#030303]" />

      {/* 3D Canvas */}
      <div
        ref={scrollRef}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <HeroScene />
      </div>

      {/* Radial glow overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#E91E8C]/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#F472B6]/8 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/30 text-[#E91E8C] text-xs tracking-widest uppercase"
        >
          <Sparkles size={12} />
          Luxury Beauty Experience
          <Sparkles size={12} />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-heading text-4xl sm:text-6xl md:text-7xl text-[#FFF5F7] mb-4 leading-[1.1]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Glossy Blush
          <br />
          <span className="bg-gradient-to-r from-[#E91E8C] via-[#FF6EB4] to-[#F472B6] bg-clip-text text-transparent">
            Beauty Studio
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-[#A89097] text-base sm:text-lg md:text-xl mb-3 max-w-xl mx-auto leading-relaxed"
        >
          Where luxury meets artistry. Redefine your beauty with premium
          treatments tailored exclusively for you.
        </motion.p>

        {/* Location */}
        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-1.5 text-[#A89097] text-sm mb-10"
        >
          <MapPin size={14} className="text-[#E91E8C]" />
          Bandar Seri Begawan, Brunei
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/book"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white font-medium text-base hover:shadow-xl hover:shadow-[#E91E8C]/30 hover:scale-105 transition-all duration-300 min-h-[52px] flex items-center gap-2"
          >
            <Sparkles size={16} />
            Book Appointment
          </Link>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-full glass border border-[#E91E8C]/30 text-[#E91E8C] font-medium text-base hover:bg-white/10 hover:scale-105 transition-all duration-300 min-h-[52px] flex items-center"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#A89097]"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
