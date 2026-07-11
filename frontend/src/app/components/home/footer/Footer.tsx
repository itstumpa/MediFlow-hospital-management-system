"use client";

import { m } from "framer-motion";
import { BackToTop } from "./BackToTop";
import { Certifications } from "./Certifications";
import { EmergencyCard } from "./EmergencyCard";
import { FooterBrand } from "./FooterBrand";
import { FooterContact } from "./FooterContact";
import { FooterLinks } from "./FooterLinks";
import { FooterServices } from "./FooterServices";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Sitemap", href: "/sitemap" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0f1a1a] text-white" role="contentinfo">
      {/* Subtle top gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        aria-hidden="true"
      />

      <BackToTop />

      <div className="mx-auto max-w-page px-4 py-14 md:px-6 md:py-18 lg:px-8">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <m.div variants={columnVariants}>
              <FooterBrand />
            </m.div>
            <m.div variants={columnVariants}>
              <FooterLinks />
            </m.div>
            <m.div variants={columnVariants}>
              <FooterServices />
            </m.div>
            <m.div variants={columnVariants}>
              <FooterContact />
            </m.div>
          </div>

          {/* Divider */}
          <m.hr variants={columnVariants} className="my-10 border-white/10" />

          {/* Certifications */}
          <Certifications />

          {/* Emergency Card */}
          <EmergencyCard />
        </m.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6 lg:px-8">
          <p className="text-xs text-white/40">
            &copy; {currentYear} MediFlow. All Rights Reserved.
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-4">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/40 transition-all duration-200 hover:text-white/70 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
