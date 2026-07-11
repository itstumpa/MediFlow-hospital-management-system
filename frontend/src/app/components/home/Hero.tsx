"use client";

import { Button } from "@/app/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroBookingSearch } from "./HeroBookingSearch";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-20 pb-10 lg:min-h-[60vh]">
      {/* Background image */}
      <Image
        src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay layers */}
      <div className="absolute inset-0 bg-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-primary/10" />

      {/* Bottom fade gradient for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-page px-4 md:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left column */}
          <div className="lg:col-span-7">
            {/* Trust badge */}
            <motion.div variants={itemVariants}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <ShieldCheck
                  className="h-4 w-4 text-accent"
                  aria-hidden="true"
                />
                <span>
                  Trusted by <strong>500+ hospitals</strong> nationwide
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px] md:text-[52px] lg:text-6xl xl:text-7xl">
                Healthcare that{" "}
                <span className="text-accent">fits your life</span>
                <br />
                World-Class Care
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base lg:text-lg"
            >
              MediFlow brings together trusted doctors, modern clinics, and
              seamless digital tools to give you and your family the best
              healthcare experience — from booking appointments to managing
              prescriptions, all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg" href="/appointment">
                Book Appointment
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3 text-lg font-medium text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <User className="h-5 w-5" aria-hidden="true" />
                Find Doctors
              </Link>
            </motion.div>

            {/* Booking Search */}
            <motion.div variants={itemVariants} className="mt-10">
              <HeroBookingSearch />
            </motion.div>
          </div>

          {/* Right column — Floating Cards */}
          <div className="relative hidden lg:col-span-5 lg:block">
            {/* <HeroFloatingCards /> */}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
