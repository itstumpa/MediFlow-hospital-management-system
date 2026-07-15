"use client";

import { Button } from "@/app/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  LayoutDashboard,
  Menu,
  Shield,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.3,
      ease: "easeOut" as const,
    },
  }),
};

export function MobileNav({ isOpen, onToggle, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Hamburger / X toggle button */}
      <button
        type="button"
        className="flex items-center justify-center rounded-lg p-2.5 text-text-primary hover:bg-background md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-drawer"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Drawer + Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 z-40 bg-black/30 md:hidden"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-menu-drawer"
              key="mobile-drawer"
              ref={drawerRef}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-label="Mobile navigation"
              aria-modal="true"
              className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-border bg-surface shadow-2xl md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="text-lg font-bold text-primary-dark">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2.5 text-text-secondary hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <nav
                className="flex-1 overflow-y-auto px-4 py-6"
                aria-label="Mobile navigation"
              >
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`flex items-center rounded-lg px-4 py-3.5 text-base font-medium transition-colors duration-200 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          isActive(link.href)
                            ? "bg-primary/5 text-primary"
                            : "text-text-secondary"
                        }`}
                        aria-current={isActive(link.href) ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Dashboard Dropdown */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                    className={`flex items-center justify-between w-full rounded-lg px-4 py-3.5 text-base font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isDashboardOpen
                        ? "bg-primary/5 text-primary"
                        : "text-text-secondary hover:bg-background"
                    }`}
                    aria-expanded={isDashboardOpen}
                    aria-controls="mobile-dashboard-dropdown"
                  >
                    <span className="flex items-center gap-3">
                      <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                      <span>Dashboard</span>
                    </span>
                    <X
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isDashboardOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {isDashboardOpen && (
                      <motion.ul
                        id="mobile-dashboard-dropdown"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 ml-4 space-y-1 border-l-2 border-primary/20 pl-3"
                        role="menu"
                      >
                        {dashboardItems.map((item) => (
                          <motion.li
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => {
                                setIsDashboardOpen(false);
                                onClose();
                              }}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-150"
                              role="menuitem"
                            >
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                {item.icon}
                              </span>
                              <span>{item.label}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </nav>

              {/* CTA buttons */}
              <div className="border-t border-border px-5 py-6">
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    href="/auth/login"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    href="/appointment"
                    className="w-full"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
