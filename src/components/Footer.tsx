"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Book Now", href: "/book" },
  { label: "My Appointments", href: "/appointments" },
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.2 8.2 0 0 0 4.79 1.53V6.82a4.85 4.85 0 0 1-1.02-.13z"/>
  </svg>
);

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/glossyblush_studio_bn", Icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@glossy_blushstudio", Icon: TikTokIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#E91E8C]/40 shadow-lg shadow-[#E91E8C]/20 shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="Glossy Blush Women's Beauty Studio"
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <span
                  className="block text-[#FFF5F7] font-heading text-base font-semibold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Glossy Blush
                </span>
                <span className="block text-[#A89097] text-[10px] tracking-widest uppercase">
                  Women&apos;s Beauty Studio
                </span>
              </div>
            </Link>
            <p className="text-[#A89097] text-sm leading-relaxed max-w-sm mb-6">
              Brunei&apos;s premier luxury beauty destination. Where every visit is
              a transformative experience crafted with passion and expertise.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-[#A89097] hover:text-[#E91E8C] hover:border-[#E91E8C]/30 transition-colors border border-white/10"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-[#FFF5F7] font-heading text-sm font-semibold mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#A89097] hover:text-[#E91E8C] text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[#FFF5F7] font-heading text-sm font-semibold mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#A89097]">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#E91E8C] mt-0.5 shrink-0" />
                <span>Unit D3-1, Block D, First Floor, The Curve, Batu Bersurat Jalan, Lebuhraya Tungku, BSB, Brunei BE3719</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#E91E8C] shrink-0" />
                <a href="tel:+6737406316" className="hover:text-[#E91E8C] transition-colors">
                  +673 740 6316
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[#E91E8C] mt-0.5 shrink-0" />
                <div>
                  <div>Mon–Sat: 9 AM – 8 PM</div>
                  <div>Sun: 10 AM – 6 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A89097]">
          <span>
            © {year} Glossy Blush Women&apos;s Beauty Studio. All rights reserved.
          </span>
          <span>Bandar Seri Begawan, Brunei</span>
        </div>
      </div>
    </footer>
  );
}
