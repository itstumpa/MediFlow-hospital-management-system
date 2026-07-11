"use client";

import { Button } from "@/app/components/ui/Button";
import { fadeUp } from "@/lib/animations/fade";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import {
  Ambulance,
  CalendarCheck,
  ChevronRight,
  Headphones,
  HeartPulse,
  Home,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";

const floatingItems = [
  {
    icon: Headphones,
    label: "24/7 Support",
    delay: 0.8,
    floatDelay: 0,
    className: "top-[10%] right-[5%] sm:right-[12%]",
  },
  {
    icon: Ambulance,
    label: "Emergency Care",
    delay: 1.0,
    floatDelay: 0.5,
    className: "top-[40%] right-[-2%] sm:right-[2%]",
  },
  {
    icon: PhoneCall,
    label: "Fast Response",
    delay: 1.2,
    floatDelay: 1.0,
    className: "top-[70%] right-[8%] sm:right-[18%]",
  },
];

function FloatingCard({
  children,
  className,
  entranceDelay,
  floatDuration,
  floatDelay,
}: {
  children: React.ReactNode;
  className?: string;
  entranceDelay?: number;
  floatDuration?: number;
  floatDelay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: entranceDelay ?? 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: floatDuration ?? 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay ?? 0,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function ContactHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0a4a4a] pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background decorative circles */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-60 w-60 rounded-full bg-accent/5 blur-2xl" />
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
          <ol className="inline-flex items-center gap-2 text-sm text-white/70">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded"
              >
                <Home className="h-3.5 w-3.5" aria-hidden="true" />
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-white/90" aria-current="page">
                Contact
              </span>
            </li>
          </ol>
        </motion.nav>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : "visible"}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              <HeartPulse className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>📞 Contact Us</span>
            </div>

            {/* Heading */}
            <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px] md:text-[52px] lg:text-6xl">
              We&apos;re Here to Help You{" "}
              <span className="text-accent">Every Step of the Way</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Whether you need to book an appointment, ask a medical question,
              or find our clinic, our team is ready to assist you.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/appointment">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="tel:+1 (249) 752-5068"
                className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
              >
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
                Call Now
              </Button>
            </div>
          </motion.div>

          {/* Right Illustration Area */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={
              reduced
                ? undefined
                : { duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }
            }
            className="relative hidden lg:block"
          >
            {/* Main illustration card */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              {/* Decorative medical cross */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <HeartPulse className="h-40 w-40 text-white" />
              </div>

              {/* Illustration grid */}
              <div className="relative grid h-full grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <CalendarCheck className="h-6 w-6 text-accent" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-white/80">
                    Easy Booking
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <Headphones className="h-6 w-6 text-accent" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-white/80">
                    24/7 Support
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <Ambulance className="h-6 w-6 text-accent" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-white/80">
                    Emergency
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <PhoneCall className="h-6 w-6 text-accent" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-white/80">
                    Fast Response
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <FloatingCard
              entranceDelay={0.8}
              floatDuration={4}
              floatDelay={0}
              className="absolute top-[6%] right-[0%]"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-md">
                <Headphones
                  className="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-text-primary">
                  ✔ 24/7 Support
                </span>
              </div>
            </FloatingCard>

            <FloatingCard
              entranceDelay={1.0}
              floatDuration={5}
              floatDelay={0.5}
              className="absolute top-[38%] right-[-8%]"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-md">
                <Ambulance className="h-4 w-4 text-danger" aria-hidden="true" />
                <span className="text-sm font-semibold text-text-primary">
                  ✔ Emergency Care
                </span>
              </div>
            </FloatingCard>

            <FloatingCard
              entranceDelay={1.2}
              floatDuration={3.5}
              floatDelay={1.0}
              className="absolute top-[70%] right-[4%]"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-md">
                <PhoneCall
                  className="h-4 w-4 text-success"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-text-primary">
                  ✔ Fast Response
                </span>
              </div>
            </FloatingCard>
          </motion.div>

          {/* Mobile floating cards row */}
          <div className="flex flex-wrap gap-3 lg:hidden">
            {floatingItems.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-sm"
              >
                <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
