"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    label: "123 Healthcare Avenue, New York, NY 10001, USA",
    href: null,
  },
  {
    icon: Phone,
    label: "+1 (249) 752-5068",
    href: "tel:+12497525068",
  },
  {
    icon: Mail,
    label: "info@mediflow.com",
    href: "mailto:info@mediflow.com",
  },
  {
    icon: Clock,
    label: "Mon–Sat: 8:00 AM – 8:00 PM | Sun: 10:00 AM – 4:00 PM",
    href: null,
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function FooterContact() {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold tracking-wider text-accent">
        Contact Information
      </h3>
      <ul className="space-y-4" role="list">
        {contactItems.map((item, i) => {
          const Icon = item.icon;
          const content = (
            <div className="flex items-start gap-3">
              <Icon
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                aria-hidden="true"
              />
              <span className="break-words text-sm leading-relaxed text-white/60">
                {item.label}
              </span>
            </div>
          );

          return (
            <motion.li
              key={item.label}
              variants={itemVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
