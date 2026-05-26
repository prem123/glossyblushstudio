"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/book", label: "Book Now" },
  { href: "/appointments", label: "My Appointments" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHashLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      setMenuOpen(false);
      const id = href.replace("/#", "");
      if (pathname !== "/") {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-dark shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group"
            aria-label="Glossy Blush Studio — Home"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#E91E8C]/40 group-hover:ring-[#E91E8C]/80 group-hover:scale-105 transition-all duration-200 shadow-lg shadow-[#E91E8C]/20">
              <Image
                src="/logo.jpg"
                alt="Glossy Blush Women's Beauty Studio"
                width={48}
                height={48}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace("/#", "/"));
              const isBook = link.href === "/book";

              return (
                <li key={link.href}>
                  {isBook ? (
                    <Link
                      href={link.href}
                      className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#E91E8C]/40 hover:scale-105 transition-all duration-200 min-h-[44px] flex items-center gap-1.5"
                    >
                      <Calendar size={14} />
                      Book Now
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={(e) => handleHashLink(e, link.href)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 min-h-[44px] flex items-center ${
                        isActive
                          ? "text-[#E91E8C]"
                          : "text-[#A89097] hover:text-[#FFF5F7]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg text-[#A89097] hover:text-[#FFF5F7] hover:bg-white/5 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-dark flex flex-col pt-20 pb-8 px-6"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-lg text-[#A89097] hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
              <ul className="flex flex-col gap-1 mt-4">
                {navLinks.map((link, i) => {
                  const isBook = link.href === "/book";
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      {isBook ? (
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FF6EB4] text-white font-medium min-h-[44px]"
                        >
                          <Calendar size={15} />
                          Book Now
                        </Link>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={(e) => handleHashLink(e, link.href)}
                          className="flex items-center px-3 py-3 rounded-lg text-[#A89097] hover:text-[#FFF5F7] hover:bg-white/5 transition-colors min-h-[44px]"
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
