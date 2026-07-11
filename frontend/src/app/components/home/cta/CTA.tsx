"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import Image from "next/image";
import { BackgroundDecorations } from "./BackgroundDecorations";
import { CTAButtons } from "./CTAButtons";
import { Illustration } from "./Illustration";
import { TrustPoints } from "./TrustPoints";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function CTA() {
  return (
    <section
      className="relative min-h-0 overflow-hidden py-16 md:py-20 lg:py-24 xl:min-h-[600px]"
      aria-labelledby="cta-heading"
    >
      {/* Background hospital image */}
      <Image
        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1153&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-primary/80" />

      <BackgroundDecorations />

      <motion.div
        className="relative z-10 mx-auto max-w-page px-4 md:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — Content */}
          <div>
            {/* Badge */}
            <motion.div variants={contentVariants}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <Rocket className="h-4 w-4" aria-hidden="true" />
                Ready to Get Started?
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="cta-heading"
              variants={contentVariants}
              className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Take the First Step Toward{" "}
              <span className="text-accent">Better Health</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={contentVariants}
              className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Book your appointment today and receive personalized healthcare
              from experienced specialists using modern medical technology.
            </motion.p>

            {/* Trust Points */}
            <motion.div variants={contentVariants} className="mt-8">
              <TrustPoints />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={contentVariants} className="mt-10">
              <CTAButtons />
            </motion.div>
          </div>

          {/* Right column — Illustration */}
          <div className="hidden lg:block">
            <Illustration />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
