"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle, PhoneCall, Star } from "lucide-react";
import Image from "next/image";
import { FloatingCard } from "./FloatingCard";

export function Illustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="relative mx-auto h-[500px] w-full max-w-[500px]"
    >
      {/* Doctor image */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-2xl"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop"
          alt="MediFlow doctor consulting a patient"
          fill
          sizes="500px"
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </motion.div>

      {/* Floating card 1 — Appointment Confirmed */}
      <FloatingCard
        className="-top-2 right-4 w-56"
        delay={0.2}
        xOffset={3}
        yRange={[-6, 6]}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle
                className="h-4 w-4 text-green-500"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-text-primary">
                Appointment Confirmed
              </p>
            </div>
            <p className="mt-0.5 text-xs text-text-secondary">
              Tomorrow · 09:30 AM
            </p>
          </div>
        </div>
      </FloatingCard>

      {/* Floating card 2 — Rating */}
      <FloatingCard
        className="bottom-20 -left-4 w-52"
        delay={0.5}
        xOffset={-3}
        yRange={[-5, 7]}
      >
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm font-bold text-text-primary">4.9</span>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          Trusted by 10,000+ Patients
        </p>
      </FloatingCard>

      {/* Floating card 3 — Emergency Support */}
      <FloatingCard
        className="-bottom-2 right-8 w-44"
        delay={0.8}
        xOffset={2}
        yRange={[-7, 5]}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
            <PhoneCall className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">24/7</p>
            <p className="text-xs text-text-secondary">Emergency Support</p>
          </div>
        </div>
      </FloatingCard>
    </motion.div>
  );
}
