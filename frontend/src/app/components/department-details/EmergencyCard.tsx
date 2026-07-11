"use client";

import { motion } from "framer-motion";
import { Heart, Phone, Clock, MapPin, AlertTriangle } from "lucide-react";
import { staggerContainer, staggerItem } from "./SharedMotionVariants";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { Button } from "@/app/components/ui/Button";
import type { EmergencyInfo } from "@/lib/data/department-detail";
import type { Department } from "@/lib/data/departments";

interface Props {
  info: EmergencyInfo;
  department: Department;
}

export function EmergencyCard({ info, department }: Props) {
  return (
    <AnimatedSection className="py-16 md:py-20">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-red-800 shadow-xl"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/[0.04]" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-white/[0.03]" />
            <div className="absolute left-1/3 top-0 h-32 w-32 rounded-full bg-white/[0.02]" />
          </div>

          <div className="relative p-6 md:p-10 lg:p-14">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: Content */}
              <motion.div variants={staggerItem} className="max-w-2xl">
                {/* Emergency badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  <Heart size={15} className="animate-pulse" aria-hidden="true" />
                  <span>Heart Emergency?</span>
                </div>

                <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                  Immediate Care When You Need It Most
                </h2>
                <p className="mt-3 text-base leading-relaxed text-white/80 md:text-lg">
                  Our emergency team is available 24/7 to provide urgent {department.name.split("(")[0].trim().toLowerCase()} care. Every second matters — don&apos;t wait.
                </p>

                {/* Quick actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                    <Phone size={18} className="shrink-0 text-white" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-white/60">Emergency Hotline</p>
                      <p className="text-sm font-bold text-white">{info.hotline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                    <Clock size={18} className="shrink-0 text-white" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-white/60">Available</p>
                      <p className="text-sm font-bold text-white">24/7 Emergency Care</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                    <MapPin size={18} className="shrink-0 text-white" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-white/60">Location</p>
                      <p className="text-sm font-bold text-white">Main Campus — Ground Floor</p>
                    </div>
                  </div>
                </div>

                {/* Quick instructions */}
                <div className="mt-6 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <AlertTriangle size={15} aria-hidden="true" />
                    In case of emergency:
                  </p>
                  <ul className="space-y-1.5">
                    {info.instructions.map((step) => (
                      <li key={step} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Right: CTA */}
              <motion.div
                variants={staggerItem}
                className="flex shrink-0 flex-col gap-4"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  href="tel:+12497525068"
                  className="min-w-[200px]"
                >
                  <Phone size={18} aria-hidden="true" />
                  Call Emergency Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  href="/appointment"
                  className="min-w-[200px] border-white/30 text-white hover:bg-white hover:text-red-700"
                >
                  <Clock size={18} aria-hidden="true" />
                  Book Urgent Appointment
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
