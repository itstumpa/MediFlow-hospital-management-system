"use client";

import type { Department } from "@/lib/data/departments";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Clock,
  HeartPulse,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DepartmentCardProps {
  department: Department;
  index: number;
}

export function DepartmentCard({
  department: dept,
  index,
}: DepartmentCardProps) {
  const Icon = dept.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Entire card is clickable */}
      <Link
        href={`/departments/${dept.id}`}
        className="flex flex-1 flex-col"
        aria-label={`Learn more about ${dept.name} department`}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={dept.imageUrl}
            alt={`${dept.name} department`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Emergency badge */}
          {dept.emergencyAvailable && (
            <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-danger/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <AlertCircle size={12} aria-hidden="true" />
              24/7 Emergency
            </div>
          )}

          {/* Icon overlay */}
          <div
            className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:rotate-6"
            style={{ color: dept.color }}
          >
            <Icon size={22} aria-hidden="true" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Name + rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
              {dept.name}
            </h3>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
              <Star
                size={12}
                className="fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold text-amber-700">
                {dept.rating}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {dept.description}
          </p>

          {/* Stats row */}
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1">
              <Users size={13} aria-hidden="true" />
              {dept.doctors} Doctors
            </span>
            <span className="inline-flex items-center gap-1">
              <HeartPulse size={13} aria-hidden="true" />
              {dept.patientsTreated}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              {dept.operatingHours}
            </span>
          </div>

          {/* Common treatments */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {dept.commonTreatments.slice(0, 3).map((treatment) => (
              <span
                key={treatment}
                className="rounded-md bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary"
              >
                {treatment}
              </span>
            ))}
          </div>

          {/* Spacer */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="text-primary transition-all duration-200 group-hover:underline">
                View Doctors
              </span>
              <span className="flex items-center gap-1 text-text-secondary transition-all duration-200 group-hover:text-primary">
                Learn More
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>

          {/* Hover glow effect */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow: `inset 0 0 0 1px ${dept.color}20`,
            }}
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  );
}
