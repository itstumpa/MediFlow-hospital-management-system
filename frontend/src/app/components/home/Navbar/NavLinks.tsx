"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Departments", href: "/departments" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function NavLinks() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <ul className="hidden items-center gap-8 md:flex lg:gap-10" role="list">
      {navLinks.map((link) => {
        const active = isActive(link.href);
        return (
          <motion.li
            key={link.href}
            className="relative"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Link
              href={link.href}
              className={`relative block px-1 py-2.5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "text-primary"
                  : "text-text-secondary hover:text-primary"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
              {active && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
