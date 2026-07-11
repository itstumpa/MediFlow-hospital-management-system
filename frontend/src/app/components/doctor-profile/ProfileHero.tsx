"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  MapPin,
  Sparkles,
  Star,
  Verified,
} from "lucide-react";
import Image from "next/image";

interface ProfileHeroProps {
  doctor: Doctor;
}

export function ProfileHero({ doctor }: ProfileHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#063f3e] pb-20 pt-16 md:pb-28 md:pt-16">
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
          {/* Avatar */}
          <motion.div
            variants={staggerItem}
            className="relative h-40 w-40 shrink-0 md:h-56 md:w-56"
          >
            <div className="absolute inset-0 rounded-2xl border-4 border-white/20 shadow-2xl">
              <Image
                src={doctor.imageUrl}
                alt={`${doctor.name} - ${doctor.specialty}`}
                fill
                className="rounded-2xl object-cover"
                sizes="224px"
                priority
              />
            </div>

            {/* Verification badge */}
            {doctor.isVerified && (
              <div className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-lg">
                <Verified className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-[10px] font-bold text-primary">
                  Verified
                </span>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              {doctor.isTopRated && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Top Rated
                </span>
              )}
              {doctor.awards > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  <Award className="h-3 w-3" aria-hidden="true" />
                  Award Winner
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            >
              {doctor.name}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-1 text-lg font-medium text-accent"
            >
              {doctor.specialty}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 md:justify-start"
            >
              <span className="flex items-center gap-1.5">
                <Star
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
                <span className="font-semibold text-white">
                  {doctor.rating}
                </span>
                ({doctor.reviewCount.toLocaleString()} reviews)
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck
                  className="h-4 w-4 text-accent"
                  aria-hidden="true"
                />
                {doctor.experience} Years Experience
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                {doctor.hospital}
              </span>
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:mx-0"
            >
              {doctor.shortBio ||
                `${doctor.name} is a renowned ${doctor.specialty} specialist with ${doctor.experience}+ years of experience.`}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
