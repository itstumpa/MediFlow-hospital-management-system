"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import Link from "next/link";

interface ContactCardData {
  icon: typeof Phone;
  title: string;
  details: { label: string; value: string; href?: string }[];
  color: "primary" | "danger" | "info" | "warning" | "accent";
}

const cards: ContactCardData[] = [
  {
    icon: Phone,
    title: "Phone",
    details: [
      {
        label: "Main Line",
        value: "+1 (249) 752-5068",
        href: "tel:+1 (249) 752-5068",
      },
      {
        label: "Alternative",
        value: "+1 (249) 752-5069",
        href: "tel:+1 (249) 752-5069",
      },
    ],
    color: "primary",
  },
  {
    icon: Mail,
    title: "Email",
    details: [
      {
        label: "General Inquiries",
        value: "info@mediflow.com",
        href: "mailto:info@mediflow.com",
      },
      {
        label: "Support",
        value: "support@mediflow.com",
        href: "mailto:support@mediflow.com",
      },
    ],
    color: "info",
  },
  {
    icon: PhoneCall,
    title: "Emergency Hotline",
    details: [
      {
        label: "24/7 Emergency",
        value: "+1 (249) 752-5000",
        href: "tel:+1 (249) 752-5000",
      },
      { label: "Response Time", value: "Under 5 minutes" },
    ],
    color: "danger",
  },
  {
    icon: MapPin,
    title: "Clinic Address",
    details: [
      {
        label: "Location",
        value: "123 Gulshan Avenue, Dhaka 1212, Bangladesh",
      },
      { label: "Landmark", value: "Near Gulshan Circle 2" },
    ],
    color: "warning",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [
      { label: "Mon–Fri", value: "8:00 AM – 10:00 PM" },
      { label: "Saturday", value: "9:00 AM – 5:00 PM" },
    ],
    color: "accent",
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    border: "hover:border-primary/30",
  },
  danger: {
    bg: "bg-danger/5",
    iconBg: "bg-danger/10",
    iconColor: "text-danger",
    border: "hover:border-danger/30",
  },
  info: {
    bg: "bg-info/5",
    iconBg: "bg-info/10",
    iconColor: "text-info",
    border: "hover:border-info/30",
  },
  warning: {
    bg: "bg-warning/5",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    border: "hover:border-warning/30",
  },
  accent: {
    bg: "bg-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    border: "hover:border-accent/30",
  },
};

export function ContactCards() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            const colors = colorMap[card.color];
            return (
              <motion.div
                key={card.title}
                variants={reduced ? undefined : staggerItem}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -6, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className={`group rounded-xl border border-border ${colors.border} ${colors.bg} p-6 shadow-sm transition-all duration-300 hover:shadow-lg`}
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon
                    className={`h-6 w-6 ${colors.iconColor}`}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base font-semibold text-text-primary">
                  {card.title}
                </h3>

                {/* Details */}
                <ul className="mt-3 space-y-1.5">
                  {card.details.map((detail) => (
                    <li key={detail.label}>
                      {detail.href ? (
                        <Link
                          href={detail.href}
                          className="block text-sm text-text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                        >
                          <span className="text-xs font-medium uppercase tracking-wider text-text-secondary/70">
                            {detail.label}
                          </span>
                          <br />
                          <span className="font-medium">{detail.value}</span>
                        </Link>
                      ) : (
                        <span className="block text-sm text-text-secondary">
                          <span className="text-xs font-medium uppercase tracking-wider text-text-secondary/70">
                            {detail.label}
                          </span>
                          <br />
                          <span className="font-medium">{detail.value}</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
