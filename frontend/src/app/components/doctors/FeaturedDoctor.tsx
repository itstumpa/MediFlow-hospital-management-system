"use client";

import type { Doctor } from "@/lib/data/doctors";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Beaker,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface FeaturedDoctorProps {
  doctors: Doctor[];
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function FeaturedDoctor({ doctors }: FeaturedDoctorProps) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (newIndex: number) => {
      const dir = newIndex > index ? 1 : -1;
      setIndex([newIndex, dir]);
    },
    [index],
  );

  const next = useCallback(() => {
    setIndex(([curr]) => [(curr + 1) % doctors.length, 1]);
  }, [doctors.length]);

  const prev = useCallback(() => {
    setIndex(([curr]) => [(curr - 1 + doctors.length) % doctors.length, -1]);
  }, [doctors.length]);

  // Auto-play
  useEffect(() => {
    if (isPaused || doctors.length <= 1) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next, doctors.length]);

  const doctor = doctors[index];
  if (!doctor) return null;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-amber-200/50 bg-gradient-to-br from-amber-50 via-surface to-surface shadow-lg shadow-amber-500/5"
      aria-label="Featured specialists carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ribbon */}
      <div className="absolute -right-12 top-6 z-10 rotate-45 bg-gradient-to-r from-amber-400 to-amber-500 px-12 py-1 shadow-sm">
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-white">
          <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
          Editor&apos;s Choice
        </span>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={doctor.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-8 p-6 md:flex-row md:items-center md:p-10 lg:p-14"
          >
            {/* Left: Image */}
            <div className="relative mx-auto h-56 w-56 shrink-0 md:mx-0 md:h-64 md:w-64">
              <Image
                src={doctor.imageUrl}
                alt={`${doctor.name} - ${doctor.specialty}`}
                fill
                className="rounded-2xl border-4 border-amber-100 object-cover shadow-lg"
                sizes="256px"
                priority
              />
              {/* Overlay stats */}
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-xl border border-border/60 bg-surface px-4 py-2 shadow-lg">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star
                    className="h-3.5 w-3.5 fill-amber-500"
                    aria-hidden="true"
                  />
                  {doctor.rating}
                </div>
                <div className="text-xs text-text-secondary">|</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-text-secondary">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  {doctor.patientsTreated}+
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex-1 text-center md:text-left">
              {/* Name & Specialty */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                  Featured Specialist
                </p>
                <h2 className="mt-1 text-2xl font-bold text-text-primary md:text-3xl lg:text-4xl">
                  {doctor.name}
                </h2>
                <p className="text-base font-medium text-primary">
                  {doctor.specialty}
                </p>
              </div>

              {/* Key highlights */}
              <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                <span className="flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  {doctor.experience}+ Years
                </span>
                {doctor.awards > 0 && (
                  <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                    <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                    {doctor.awards}+ Awards
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-secondary md:mx-0">
                {doctor.shortBio ||
                  `Dr. ${doctor.name.split(" ").pop()} is a highly experienced ${doctor.specialty} specialist known for exceptional patient outcomes and cutting-edge treatments.`}
              </p>

              {/* Stats grid */}
              <div className="mt-5 grid grid-cols-3 gap-4 rounded-2xl bg-background p-4">
                <div className="text-center">
                  <TrendingUp
                    className="mx-auto h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  <p className="mt-1 text-lg font-bold text-text-primary">
                    {doctor.successRate}%
                  </p>
                  <p className="text-[10px] font-medium text-text-secondary">
                    Success Rate
                  </p>
                </div>
                <div className="text-center">
                  <Beaker
                    className="mx-auto h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  <p className="mt-1 text-lg font-bold text-text-primary">
                    {doctor.awards}
                  </p>
                  <p className="text-[10px] font-medium text-text-secondary">
                    Awards
                  </p>
                </div>
                <div className="text-center">
                  <BookOpen
                    className="mx-auto h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  <p className="mt-1 text-lg font-bold text-text-primary">
                    {doctor.qualifications.length}
                  </p>
                  <p className="text-[10px] font-medium text-text-secondary">
                    Qualifications
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="group/btn inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Book Appointment
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="inline-flex items-center rounded-lg border border-border px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-4 border-t border-amber-200/30 px-6 py-4">
        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-200 text-amber-600 transition-all hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          aria-label="Previous specialist"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Featured specialist selector"
        >
          {doctors.map((d, i) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${d.name}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                i === index
                  ? "w-8 bg-amber-500"
                  : "w-2 bg-amber-300 hover:bg-amber-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-200 text-amber-600 transition-all hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          aria-label="Next specialist"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
