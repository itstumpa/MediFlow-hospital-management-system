"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

const NAV_HEIGHT_EXPANDED = 80;
const NAV_HEIGHT_SCROLLED = 64;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <motion.header
      animate={{
        height: isScrolled ? NAV_HEIGHT_SCROLLED : NAV_HEIGHT_EXPANDED,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky top-0 z-50 w-full ${
        isScrolled
          ? "bg-surface/90 shadow-sm backdrop-blur-md"
          : "bg-surface/95 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex h-full max-w-page items-center justify-between px-4 md:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo />
        <DesktopNav />
        <MobileNav
          isOpen={isMobileMenuOpen}
          onToggle={toggleMobileMenu}
          onClose={closeMobileMenu}
        />
      </nav>
    </motion.header>
  );
}
