"use client";

import { Button } from "@/app/components/ui/Button";
import { fadeUp } from "@/lib/animations/fade";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import {
  Ambulance,
  BadgeCheck,
  CalendarCheck,
  ChevronRight,
  HeartPulse,
  Home,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "15+", label: "Departments" },
  { value: "50+", label: "Specialists" },
  { value: "10K+", label: "Happy Patients" },
  { value: "20+", label: "Years Experience" },
];

const floatingItems = [
  {
    icon: BadgeCheck,
    label: "Trusted Healthcare",
    delay: 0.8,
    floatDelay: 0,
    className: "top-[12%] right-[6%] sm:right-[10%]",
  },
  {
    icon: Ambulance,
    label: "24/7 Emergency",
    delay: 1.0,
    floatDelay: 0.5,
    className: "top-[45%] right-[-3%] sm:right-[2%]",
  },
  {
    icon: Star,
    label: "4.9 Rating",
    extra: "★★★★★",
    delay: 1.2,
    floatDelay: 1.0,
    className: "top-[72%] right-[10%] sm:right-[18%]",
  },
];

function FloatingCard({
  children,
  className,
  entranceDelay,
  floatDelay,
}: {
  children: React.ReactNode;
  className?: string;
  entranceDelay?: number;
  floatDelay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 30 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={
        reduced
          ? undefined
          : {
              duration: 0.6,
              delay: entranceDelay ?? 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }
      }
      className={className}
    >
      {!reduced ? (
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay ?? 0,
          }}
        >
          {children}
        </motion.div>
      ) : (
        <>{children}</>
      )}
    </motion.div>
  );
}

export function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0a4a4a] pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background decorative elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-60 w-60 rounded-full bg-accent/5 blur-2xl" />
        <div className="absolute bottom-1/4 left-[10%] h-40 w-40 rounded-full bg-white/[0.03] blur-xl" />
      </div>

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : "visible"}
          aria-label="Breadcrumb"
          className="mb-8"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark rounded"
              >
                <Home size={14} aria-hidden="true" />
                <span>Home</span>
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/30">
              /
            </li>
            <li className="text-white/90" aria-current="page">
              About
            </li>
          </ol>
        </motion.nav>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              variants={reduced ? undefined : fadeUp}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              transition={reduced ? undefined : { delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm"
            >
              <HeartPulse size={16} aria-hidden="true" />
              <span>About MediFlow</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={reduced ? undefined : fadeUp}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              transition={reduced ? undefined : { delay: 0.2 }}
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
            >
              Delivering Trusted Healthcare with{" "}
              <span className="text-accent">Compassion</span> &amp;{" "}
              <span className="text-accent">Innovation</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={reduced ? undefined : fadeUp}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              transition={reduced ? undefined : { delay: 0.3 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              MediFlow combines experienced medical professionals, advanced
              technology, and patient-centered care to provide exceptional
              healthcare services for individuals and families.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.4,
                        },
                      },
                    }
              }
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={
                    reduced
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 16 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.5,
                              ease: [0.25, 0.1, 0.25, 1],
                            },
                          },
                        }
                  }
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm"
                >
                  <p className="text-xl font-bold text-accent sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-white/60 sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={reduced ? undefined : fadeUp}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              transition={reduced ? undefined : { delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                variant="secondary"
                size="lg"
                href="/doctors"
                className="group gap-2"
                ariaLabel="Meet Our Doctors"
              >
                <span>Meet Our Doctors</span>
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
                ariaLabel="Book Appointment"
              >
                <CalendarCheck size={18} aria-hidden="true" />
                <span>Book Appointment</span>
              </Button>
            </motion.div>
          </div>

          {/* Right illustration area */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, scale: 0.92 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              transition={
                reduced
                  ? undefined
                  : { duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }
              }
              className="relative"
            >
              {/* Main illustration card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-1 shadow-2xl backdrop-blur-sm">
                <div className="rounded-xl bg-gradient-to-br from-primary/30 via-primary-dark/40 to-[#0a4a4a]/50 p-8">
                  {/* Decorative grid pattern */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "24px 24px",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    {/* Hospital icon */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                        <Stethoscope
                          className="h-6 w-6 text-accent"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          MediFlow
                        </p>
                        <p className="text-xs text-white/50">
                          Healthcare Excellence
                        </p>
                      </div>
                    </div>

                    {/* Illustration placeholder with pattern */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white/5 p-4">
                        <div className="mb-2 h-2 w-16 rounded-full bg-accent/40" />
                        <div className="h-2 w-12 rounded-full bg-white/10" />
                      </div>
                      <div className="rounded-lg bg-white/5 p-4">
                        <div className="mb-2 h-2 w-16 rounded-full bg-accent/40" />
                        <div className="h-2 w-12 rounded-full bg-white/10" />
                      </div>
                      <div className="rounded-lg bg-white/5 p-4">
                        <div className="mb-2 h-2 w-16 rounded-full bg-accent/40" />
                        <div className="h-2 w-12 rounded-full bg-white/10" />
                      </div>
                      <div className="rounded-lg bg-white/5 p-4">
                        <div className="mb-2 h-2 w-16 rounded-full bg-accent/40" />
                        <div className="h-2 w-12 rounded-full bg-white/10" />
                      </div>
                    </div>

                    {/* Doctor icon */}
                    <div className="mt-6 flex items-center gap-3 rounded-lg bg-white/5 p-3">
                      <Users
                        className="h-5 w-5 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-white/70">
                        50+ Expert Specialists
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <FloatingCard
                entranceDelay={0.8}
                floatDelay={0}
                className="absolute -top-4 -left-6"
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-sm">
                  <BadgeCheck
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    Trusted Healthcare
                  </span>
                </div>
              </FloatingCard>

              <FloatingCard
                entranceDelay={1.0}
                floatDelay={0.5}
                className="absolute -bottom-2 -right-4"
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-sm">
                  <Ambulance
                    className="h-5 w-5 text-danger"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    24/7 Emergency
                  </span>
                </div>
              </FloatingCard>

              <FloatingCard
                entranceDelay={1.2}
                floatDelay={1.0}
                className="absolute -bottom-4 left-[30%]"
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-sm">
                  <Star
                    className="h-5 w-5 text-yellow-500 fill-yellow-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    4.9 Rating
                  </span>
                </div>
              </FloatingCard>
            </motion.div>
          </div>

          {/* Mobile illustration */}
          <div className="lg:hidden">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={
                reduced
                  ? undefined
                  : { duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }
              }
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                <BadgeCheck
                  className="h-4 w-4 text-accent"
                  aria-hidden="true"
                />
                <span className="text-xs text-white/80">
                  Trusted Healthcare
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                <Ambulance className="h-4 w-4 text-accent" aria-hidden="true" />
                <span className="text-xs text-white/80">24/7 Emergency</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                <Star
                  className="h-4 w-4 text-yellow-400 fill-yellow-400"
                  aria-hidden="true"
                />
                <span className="text-xs text-white/80">4.9 Rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
