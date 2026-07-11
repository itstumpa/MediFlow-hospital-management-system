"use client";

import { Button } from "@/app/components/ui/Button";
import { createFloatingY } from "@/lib/animations/floating";
import type { Department } from "@/lib/data/departments";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Shield, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  slideRight,
  staggerContainer,
  staggerItem,
} from "./SharedMotionVariants";

interface Props {
  department: Department;
}

function FloatingCard({
  icon: Icon,
  text,
  className,
  delay,
  x,
  y,
}: {
  icon: React.ElementType;
  text: string;
  className: string;
  delay: number;
  x: number;
  y: number;
}) {
  return (
    <motion.div
      className="absolute flex items-center gap-2 rounded-xl border border-white/10 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-sm"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={createFloatingY([-6, 6], 5 + delay)}
    >
      <Icon className={`h-4 w-4 ${className}`} aria-hidden="true" />
      <span className="whitespace-nowrap text-sm font-medium text-gray-800">
        {text}
      </span>
    </motion.div>
  );
}

export function DepartmentHero({ department }: Props) {
  const heroStats = useMemo(
    () => [
      { value: department.doctors, label: "Specialists", suffix: "+" },
      { value: department.yearsOfService, label: "Years", suffix: "+" },
      { value: department.patientsTreated, label: "Patients" },
      { value: department.successRate, label: "Success Rate", suffix: "%" },
    ],
    [department],
  );

  const Icon = department.icon;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a5f5e] via-primary to-primary-dark">
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/[0.03]" />
        <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-accent/[0.04]" />
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-white/[0.02]" />
      </div>

      <div className="relative mx-auto max-w-page px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center gap-2 text-sm text-white/70"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
          >
            Home
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link
            href="/departments"
            className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
          >
            Departments
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="font-medium text-white" aria-current="page">
            {department.name}
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
            {/* Department Badge */}
            <motion.div
              variants={staggerItem}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              <Icon size={16} aria-hidden="true" />
              <span>{department.name}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Advanced{" "}
              <span className="text-accent">
                {department.name.split("(")[0].trim()} Care
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="mt-5 text-lg leading-relaxed text-white/80"
            >
              {department.description}
            </motion.p>

            {/* Statistics grid */}
            <motion.div
              variants={staggerItem}
              className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                variant="secondary"
                size="lg"
                href="/appointment"
                className="group"
              >
                Book Appointment
                <ChevronRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/doctors"
                className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
              >
                Find a {department.name.split("(")[0].trim()} Specialist
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Image with floating cards */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
              {/* Main image */}
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={department.imageUrl}
                  alt={`${department.name} department at MediFlow`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating cards */}
              <FloatingCard
                icon={Star}
                text="★★★★★ 4.9 Rating"
                className="text-amber-500"
                delay={0}
                x={5}
                y={45}
              />
              <FloatingCard
                icon={Shield}
                text="Board Certified"
                className="text-emerald-500"
                delay={0.5}
                x={30}
                y={160}
              />
              <FloatingCard
                icon={Clock}
                text={
                  department.emergencyAvailable
                    ? "Emergency Available"
                    : "Online Consultations"
                }
                className="text-primary"
                delay={1}
                x={-5}
                y={270}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
