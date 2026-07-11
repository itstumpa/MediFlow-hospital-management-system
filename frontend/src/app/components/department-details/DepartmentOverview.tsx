"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Heart, Eye, Target } from "lucide-react";
import { staggerContainer, staggerItem } from "./SharedMotionVariants";
import type { Department } from "@/lib/data/departments";
import type { DepartmentOverview } from "@/lib/data/department-detail";

interface Props {
  department: Department;
  overview: DepartmentOverview;
}

export function DepartmentOverview({ department, overview }: Props) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left: Image */}
          <motion.div variants={staggerItem} className="overflow-hidden rounded-2xl">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={department.imageUrl}
                alt={`${department.name} department overview`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={staggerContainer} className="space-y-6">
            {/* Mission */}
            <motion.div variants={staggerItem}>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Target size={18} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Our Mission
                </span>
              </div>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {overview.mission}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={staggerItem}>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Eye size={18} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Our Vision
                </span>
              </div>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {overview.vision}
              </p>
            </motion.div>

            {/* Long Description */}
            <motion.div variants={staggerItem}>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {department.longDescription}
              </p>
            </motion.div>

            {/* Core Values */}
            <motion.div variants={staggerItem}>
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Heart size={18} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Core Values
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {overview.coreValues.map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <CheckCircle
                      size={15}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
