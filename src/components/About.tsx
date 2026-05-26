"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Sparkles, Award, Users, Heart, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Happy Clients" },
  { icon: Award, value: "8 Years", label: "Of Excellence" },
  { icon: Star, value: "4.9★", label: "Average Rating" },
  { icon: Heart, value: "20+", label: "Expert Therapists" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#030303" }}
    >
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(233,30,140,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content + Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full glass border border-[#E91E8C]/30 text-[#E91E8C] text-xs tracking-widest uppercase">
              <Sparkles size={12} />
              Our Story
            </div>
            <h2
              className="font-heading text-4xl sm:text-5xl text-[#FFF5F7] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Luxury Beauty,{" "}
              <span className="bg-gradient-to-r from-[#E91E8C] to-[#F472B6] bg-clip-text text-transparent">
                Redefined
              </span>
            </h2>
            <div className="space-y-4 text-[#A89097] text-base leading-relaxed mb-6">
              <p>
                Nestled in the heart of Bandar Seri Begawan, Glossy Blush
                Women&apos;s Beauty Studio is Brunei&apos;s premier destination for
                luxury beauty experiences. Since our founding, we&apos;ve been
                dedicated to empowering women through transformative beauty rituals.
              </p>
              <p>
                Our team of internationally trained therapists and stylists brings
                the world&apos;s finest techniques to Brunei — from advanced hair
                color formulations to cutting-edge skincare treatments — all in an
                atmosphere of pure indulgence.
              </p>
              <p>
                Every detail of your experience is thoughtfully crafted: from the
                moment you enter our studio to the moment you leave
                feeling renewed, radiant, and utterly beautiful.
              </p>
            </div>

            {/* Salon Image */}
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80"
                alt="Glossy Blush Beauty Studio interior"
                className="rounded-2xl object-cover w-full h-80 sm:h-96 shadow-2xl shadow-[#E91E8C]/20"
                loading="lazy"
              />
            </div>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white font-medium hover:shadow-xl hover:shadow-[#E91E8C]/30 hover:scale-105 transition-all duration-300 min-h-[52px]"
            >
              <Sparkles size={15} />
              Experience the Difference
            </Link>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.25 + i * 0.08,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="glass rounded-2xl p-6 border border-[#E91E8C]/15 hover:border-[#E91E8C]/30 transition-all duration-300 hover:-translate-y-1 text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#E91E8C]/10 border border-[#E91E8C]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon size={22} className="text-[#E91E8C]" />
                  </div>
                  <div
                    className="font-heading text-3xl text-[#FFF5F7] mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#A89097] text-sm">{stat.label}</div>
                </motion.div>
              );
            })}

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
              className="col-span-2 glass rounded-2xl p-6 border border-[#F472B6]/15 text-center"
            >
              <p
                className="font-heading text-lg text-[#FFF5F7] italic mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;Beauty is not in the face; beauty is a light in the heart.&rdquo;
              </p>
              <span className="text-[#A89097] text-sm">— Our Studio Motto</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
