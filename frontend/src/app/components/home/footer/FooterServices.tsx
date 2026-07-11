"use client";

import { motion } from "framer-motion";
import { Ambulance, Baby, Bone, Brain, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  label: string;
  icon: typeof Heart;
  href: string;
}

const services: ServiceItem[] = [
  { label: "Cardiology", icon: Heart, href: "/departments" },
  { label: "Neurology", icon: Brain, href: "/departments" },
  { label: "Orthopedics", icon: Bone, href: "/departments" },
  { label: "Pediatrics", icon: Baby, href: "/departments" },
  { label: "Dermatology", icon: Sparkles, href: "/departments" },
  { label: "Emergency Care", icon: Ambulance, href: "/departments" },
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

export function FooterServices() {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold tracking-wider text-accent">
        Medical Services
      </h3>
      <ul className="space-y-3" role="list">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.li
              key={service.label}
              variants={itemVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href={service.href}
                className="group inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon
                  className="h-3.5 w-3.5 text-accent/70 transition-all duration-200 group-hover:text-accent"
                  aria-hidden="true"
                />
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {service.label}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
