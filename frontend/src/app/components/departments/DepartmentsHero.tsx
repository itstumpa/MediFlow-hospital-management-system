"use client";

import { Button } from "@/app/components/ui/Button";
import { createFloatingY } from "@/lib/animations/floating";
import { slideRight } from "@/lib/animations/slide";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import {
  Ambulance,
  Award,
  Bed,
  CheckCircle,
  ChevronRight,
  HeartPulse,
  Star,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Bed, value: "15+", label: "Departments" },
  { icon: Users, value: "50+", label: "Doctors" },
  { icon: HeartPulse, value: "10k+", label: "Patients" },
  { icon: Ambulance, value: "24/7", label: "Emergency Care" },
];

const floatingCards = [
  {
    icon: CheckCircle,
    text: "Board Certified",
    color: "text-emerald-500",
    delay: 0,
    x: 10,
    y: 50,
  },
  {
    icon: UserCheck,
    text: "Same Day Appointment",
    color: "text-primary",
    delay: 0.5,
    x: 30,
    y: 160,
  },
  {
    icon: Star,
    text: "★★★★★ 4.9 Rating",
    color: "text-amber-500",
    delay: 1,
    x: 5,
    y: 270,
  },
];

export function DepartmentsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a5f5e] via-primary to-primary-dark">
      {/* Background decorative elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/[0.03]" />
        <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-accent/[0.04]" />
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-white/[0.02]" />
      </div>

      <div className="relative mx-auto max-w-page px-4 py-12 md:px-6 md:py-16 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center gap-2 text-sm text-white/70"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="font-medium text-white" aria-current="page">
            Departments
          </span>
        </motion.nav>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div
              variants={staggerItem}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              <HeartPulse size={16} aria-hidden="true" />
              <span>Medical Departments</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Comprehensive Healthcare{" "}
              <span className="text-accent">Across Every Specialty</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="mt-5 text-lg leading-relaxed text-white/80"
            >
              Explore our specialized medical departments, staffed by
              experienced physicians using advanced technology to provide
              exceptional patient care.
            </motion.p>

           

            {/* Buttons */}
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                variant="secondary"
                size="lg"
                href="/doctors"
                className="group"
              >
                Find Doctor
                <ChevronRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/appointment"
                className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
              >
                Book Appointment
              </Button>
            </motion.div>
          </motion.div>

          {/* Right illustration */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
              {/* Main illustration area */}
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative">
                  {/* Decorative circles */}
                  <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full border border-white/10 bg-white/5" />
                  <div className="absolute -bottom-6 -right-6 h-52 w-52 rounded-full border border-white/10 bg-white/5" />

                  {/* Medical cross icon */}
                  <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <Award
                      className="h-24 w-24 text-accent/60"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.text}
                    className="absolute flex items-center gap-2 rounded-xl border border-white/10 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-sm"
                    style={{ left: card.x, top: card.y }}
                    animate={createFloatingY([-6, 6], 5 + card.delay)}
                  >
                    <Icon
                      className={`h-4 w-4 ${card.color}`}
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap text-sm font-medium text-gray-800">
                      {card.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
