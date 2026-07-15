"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  LayoutDashboard,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface DashboardDropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const dashboardItems: DashboardDropdownItem[] = [
  {
    label: "Admin",
    href: "/admin",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    label: "Doctor",
    href: "/doctor",
    icon: <Stethoscope className="h-4 w-4" />,
  },
  {
    label: "Patient",
    href: "/patient",
    icon: <Heart className="h-4 w-4" />,
  },
  {
    label: "Staff",
    href: "/staff",
    icon: <Users className="h-4 w-4" />,
  },
];

export function DashboardDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/10"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Dashboard menu"
      >
        <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">Dashboard</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-surface border border-border shadow-lg overflow-hidden z-50"
            role="menu"
          >
            <div className="p-2">
              {dashboardItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-150"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
