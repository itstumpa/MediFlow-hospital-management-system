"use client";

import { Button } from "@/app/components/ui/Button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
      {/* Background image */}
      <Image
        src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Team of medical professionals"
        fill
        priority
        className="object-cover"
      />

      {/* Color overlay using primary token */}
      <div className="absolute inset-0 bg-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-page px-4 md:px-6 lg:px-8"
      >
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
            Healthcare that fits your life,
            <br />
            World-Class Care
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            MediFlow brings together trusted doctors, modern clinics, and
              seamless digital tools to give you and your family the best
              healthcare experience — from booking appointments to managing
              prescriptions, all in one place. Experience expert medical services and personalized treatment
            from the moment you walk through our doors.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex max-w-xl overflow-hidden rounded-lg bg-white shadow-lg">
            <input
              type="text"
              placeholder="Search by specialty, condition, treatment, or Doctors"
              className="flex-1 px-5 py-4 text-sm text-text-primary outline-none placeholder:text-text-secondary"
            />
            <Button variant="primary" className="rounded-none px-8">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}