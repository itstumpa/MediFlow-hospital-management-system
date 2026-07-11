"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { DepartmentIcon } from "./DepartmentIcon";
import type { Department } from "./Departments";
import { DepartmentStats } from "./DepartmentStats";
import { FeaturedBadge } from "./FeaturedBadge";

interface DepartmentCardProps {
  department: Department;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.08,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export const DepartmentCard = memo(function DepartmentCard({
  department,
  index,
}: DepartmentCardProps) {
  const {
    name,
    description,
    icon,
    specialists,
    patients,
    rating,
    isFeatured,
    href,
  } = department;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <Link
        href={href}
        className={`group relative flex h-full flex-col rounded-2xl border bg-surface px-6 pb-6 pt-8 shadow-sm transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          isFeatured
            ? "border-primary/30 shadow-md shadow-primary/5"
            : "border-border/70 hover:border-primary/20"
        }`}
        aria-label={`Explore ${name} department`}
      >
        {/* Featured badge */}
        {isFeatured && <FeaturedBadge />}

        {/* Icon */}
        <DepartmentIcon icon={icon} />

        {/* Name */}
        <h3 className="mt-5 text-lg font-bold text-text-primary">{name}</h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>

        {/* Stats */}
        <div className="mt-4">
          <DepartmentStats
            specialists={specialists}
            patients={patients}
            rating={rating}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Explore link */}
        <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-250 group-hover:gap-2">
          Explore
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  );
});
