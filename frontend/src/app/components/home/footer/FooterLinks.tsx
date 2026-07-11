"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Departments", href: "/departments" },
  { label: "Appointments", href: "/appointment" },
  { label: "Health Articles", href: "/articles" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function FooterLinks() {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold tracking-wider text-accent">
        Quick Links
      </h3>
      <ul className="space-y-3" role="list">
        {quickLinks.map((link, i) => (
          <motion.li
            key={link.label}
            variants={itemVariants}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <motion.span
                className="inline-flex opacity-0 group-hover:opacity-100"
                initial={{ x: -4 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight
                  className="h-3.5 w-3.5 text-accent"
                  aria-hidden="true"
                />
              </motion.span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {link.label}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
