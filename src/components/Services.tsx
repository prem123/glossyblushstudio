"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Scissors, Sparkles, Eye, Brush, Star, Leaf } from "lucide-react";

export const SERVICES = [
  {
    id: "hair",
    icon: Scissors,
    title: "Hair Services",
    color: "#E91E8C",
    gradient: "from-[#E91E8C]/20 to-[#E91E8C]/5",
    border: "border-[#E91E8C]/20",
    glow: "hover:shadow-[#E91E8C]/20",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    subservices: ["Cut & Style", "Coloring", "Treatment", "Keratin"],
    description: "Transform your tresses with expert cuts, vibrant color, and luxurious treatments.",
  },
  {
    id: "nails",
    icon: Sparkles,
    title: "Nail Services",
    color: "#F472B6",
    gradient: "from-[#F472B6]/20 to-[#F472B6]/5",
    border: "border-[#F472B6]/20",
    glow: "hover:shadow-[#F472B6]/20",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    subservices: ["Manicure", "Pedicure", "Gel Nails", "Nail Art"],
    description: "Immaculate nails crafted with precision — from minimalist chic to elaborate art.",
  },
  {
    id: "facial",
    icon: Star,
    title: "Facial & Skin",
    color: "#FF6EB4",
    gradient: "from-[#FF6EB4]/20 to-[#FF6EB4]/5",
    border: "border-[#FF6EB4]/20",
    glow: "hover:shadow-[#FF6EB4]/20",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
    subservices: ["Classic Facial", "Deep Cleansing", "Anti-Aging", "Brightening"],
    description: "Reveal your skin's radiance with our science-backed facial and skincare rituals.",
  },
  {
    id: "makeup",
    icon: Brush,
    title: "Makeup",
    color: "#F472B6",
    gradient: "from-[#F472B6]/20 to-[#E91E8C]/5",
    border: "border-[#F472B6]/20",
    glow: "hover:shadow-[#F472B6]/20",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    subservices: ["Bridal", "Party", "Editorial"],
    description: "From bridal elegance to bold editorial looks, our artists create beauty that lasts.",
  },
  {
    id: "eyebrow-lash",
    icon: Eye,
    title: "Eyebrow & Lash",
    color: "#E91E8C",
    gradient: "from-[#E91E8C]/20 to-[#FF6EB4]/5",
    border: "border-[#E91E8C]/20",
    glow: "hover:shadow-[#E91E8C]/20",
    image: "/eyebrow-lash.jpg",
    subservices: ["Shaping", "Tinting", "Extensions", "Lamination"],
    description: "Frame your gaze with perfectly sculpted brows and lush, fluttery lashes.",
  },
  {
    id: "body",
    icon: Leaf,
    title: "Body Treatments",
    color: "#FF6EB4",
    gradient: "from-[#FF6EB4]/20 to-[#F472B6]/5",
    border: "border-[#FF6EB4]/20",
    glow: "hover:shadow-[#FF6EB4]/20",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    subservices: ["Scrub", "Massage", "Waxing"],
    description: "Indulge in full-body pampering — exfoliation, relaxation, and silky-smooth skin.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function ServiceCard({ svc }: { svc: (typeof SERVICES)[0] }) {
  const Icon = svc.icon;

  return (
    <motion.article
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative glass rounded-2xl p-6 border ${svc.border} hover:shadow-xl ${svc.glow} transition-all duration-300 hover:-translate-y-1 cursor-default`}
    >
      {/* Card glow */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${svc.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="relative z-10">
        {/* Service Image */}
        <img
          src={svc.image}
          alt={svc.title}
          className="w-full h-40 object-cover rounded-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          loading="lazy"
        />

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
          style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}
        >
          <Icon size={22} style={{ color: svc.color }} />
        </div>

        {/* Title */}
        <h3
          className="font-heading text-xl text-[#FFF5F7] mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {svc.title}
        </h3>

        {/* Description */}
        <p className="text-[#A89097] text-sm leading-relaxed mb-4">
          {svc.description}
        </p>

        {/* Sub-services */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {svc.subservices.map((sub) => (
            <span
              key={sub}
              className="px-2.5 py-1 rounded-full text-xs"
              style={{
                background: `${svc.color}15`,
                color: svc.color,
                border: `1px solid ${svc.color}25`,
              }}
            >
              {sub}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/book?service=${svc.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:gap-3"
          style={{ color: svc.color }}
        >
          Book this service
          <span className="text-base">→</span>
        </Link>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 px-4 sm:px-6 bg-[#100810]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/30 text-[#E91E8C] text-xs tracking-widest uppercase">
            <Sparkles size={12} />
            Our Offerings
          </div>
          <h2
            className="font-heading text-4xl sm:text-5xl text-[#FFF5F7] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Premium Beauty{" "}
            <span className="bg-gradient-to-r from-[#E91E8C] to-[#F472B6] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-[#A89097] max-w-xl mx-auto text-base sm:text-lg">
            Every treatment is a curated experience designed to make you feel
            extraordinary — inside and out.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white font-medium hover:shadow-xl hover:shadow-[#E91E8C]/30 hover:scale-105 transition-all duration-300 min-h-[52px]"
          >
            <Sparkles size={16} />
            Book Any Service
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
