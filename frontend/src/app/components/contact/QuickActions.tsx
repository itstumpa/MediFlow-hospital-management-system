"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import {
  Ambulance,
  CalendarCheck,
  Mail,
  MessageCircle,
  MessageSquareText,
} from "lucide-react";
import Link from "next/link";

interface QuickAction {
  icon: typeof CalendarCheck;
  title: string;
  description: string;
  href: string;
  color: "primary" | "danger" | "green" | "accent" | "info";
  label: string;
}

const actions: QuickAction[] = [
  {
    icon: CalendarCheck,
    title: "Book Appointment",
    description: "Schedule a visit with our specialists online.",
    href: "/appointment",
    color: "primary",
    label: "Book an appointment",
  },
  {
    icon: Ambulance,
    title: "Emergency Care",
    description: "Immediate medical attention available 24/7.",
    href: "tel:+1 (249) 752-5000",
    color: "danger",
    label: "Call emergency care",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us on WhatsApp for quick queries.",
    href: "https://wa.me/12497525068",
    color: "green",
    label: "Chat on WhatsApp",
  },
  {
    icon: MessageSquareText,
    title: "Live Chat",
    description: "Instant messaging with our support team.",
    href: "#",
    color: "accent",
    label: "Start live chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us an email and we'll respond promptly.",
    href: "mailto:info@mediflow.com",
    color: "info",
    label: "Send email",
  },
];

const colorMap = {
  primary: {
    gradient: "from-primary/10 to-primary/5",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/40",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    btnBg: "bg-primary hover:bg-primary-dark",
  },
  danger: {
    gradient: "from-danger/10 to-danger/5",
    border: "border-danger/20",
    hoverBorder: "hover:border-danger/40",
    iconBg: "bg-danger/10",
    iconColor: "text-danger",
    btnBg: "bg-danger hover:bg-danger/80",
  },
  green: {
    gradient: "from-[#16a34a]/10 to-[#16a34a]/5",
    border: "border-[#16a34a]/20",
    hoverBorder: "hover:border-[#16a34a]/40",
    iconBg: "bg-[#16a34a]/10",
    iconColor: "text-[#16a34a]",
    btnBg: "bg-[#16a34a] hover:bg-[#16a34a]/80",
  },
  accent: {
    gradient: "from-accent/10 to-accent/5",
    border: "border-accent/20",
    hoverBorder: "hover:border-accent/40",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    btnBg: "bg-accent hover:bg-accent/80",
  },
  info: {
    gradient: "from-info/10 to-info/5",
    border: "border-info/20",
    hoverBorder: "hover:border-info/40",
    iconBg: "bg-info/10",
    iconColor: "text-info",
    btnBg: "bg-info hover:bg-info/80",
  },
};

export function QuickActions() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-[28px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-3xl md:text-4xl lg:text-5xl">
            Quick Contact Options
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Choose the fastest way to get in touch with us.
          </p>
        </div>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {actions.map((action) => {
            const Icon = action.icon;
            const colors = colorMap[action.color];
            return (
              <motion.div
                key={action.title}
                variants={reduced ? undefined : staggerItem}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -8, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className={`group relative overflow-hidden rounded-xl border ${colors.border} ${colors.hoverBorder} bg-gradient-to-br ${colors.gradient} p-6 shadow-sm transition-all duration-300 hover:shadow-lg`}
              >
                {/* Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.iconBg} transition-all duration-300 group-hover:scale-110`}
                >
                  <Icon
                    className={`h-7 w-7 ${colors.iconColor}`}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {action.description}
                </p>

                {/* Action link */}
                <Link
                  href={action.href}
                  aria-label={action.label}
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 ${colors.btnBg} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                >
                  {action.title === "Book Appointment" ? "Book Now" : "Go"}
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
