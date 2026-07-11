"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  HeartPulse,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";

export function DepartmentsCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark py-16 md:py-24">
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/[0.03]" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent/[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02]" />
      </div>

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <HeartPulse size={16} aria-hidden="true" />
              <span>Get the Care You Need</span>
            </div>

            <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl">
              Need Help Finding the{" "}
              <span className="text-accent">Right Specialist?</span>
            </h2>

            <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">
              Our patient care coordinators are here to help you find the
              perfect department and doctor for your healthcare needs.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-accent hover:text-primary-dark hover:shadow-xl"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Talk to Our Team
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/appointment"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
              >
                <Calendar size={18} aria-hidden="true" />
                Book Appointment
              </Link>
            </div>

            {/* Phone */}
            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <Phone size={14} aria-hidden="true" />
              <span>Or call us at </span>
              <a
                href="tel:+12497525068"
                className="font-semibold text-white underline underline-offset-2 transition-colors hover:text-accent"
              >
                +1 (249) 752-5068
              </a>
            </div>
          </motion.div>

          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto flex h-80 w-80 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/5 bg-white/5" />
              <HeartPulse
                className="h-24 w-24 text-accent/50"
                aria-hidden="true"
              />

              {/* Floating medical cards */}
              {[
                { text: "✔ Insurance Accepted", top: "10%", left: "50%" },
                { text: "✔ Same-Day Appointments", top: "50%", left: "50%" },
                { text: "✔ Online Consultations", top: "88%", left: "50%" },
              ].map((card) => (
                <motion.div
                  key={card.text}
                  className="absolute rounded-xl border border-white/10 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-sm"
                  style={{
                    top: card.top,
                    left: card.left,
                    transform: "translateX(-50%)",
                  }}
                  animate={{
                    y: [-4, 4, -4],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <span className="whitespace-nowrap text-sm font-medium text-gray-800">
                    {card.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
