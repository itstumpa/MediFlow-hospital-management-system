"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import {
  Award,
  Beaker,
  BookOpen,
  HeartPulse,
  TrendingUp,
  Users,
} from "lucide-react";

interface ProfileStatsProps {
  doctor: Doctor;
}

export function ProfileStats({ doctor }: ProfileStatsProps) {
  const stats = [
    {
      icon: Users,
      value: doctor.patientsTreated,
      label: "Patients Treated",
    },
    {
      icon: TrendingUp,
      value: `${doctor.successRate}%`,
      label: "Success Rate",
    },
    { icon: Award, value: doctor.awards, label: "Awards" },
    {
      icon: BookOpen,
      value: doctor.qualifications.length,
      label: "Qualifications",
    },
    {
      icon: Beaker,
      value: doctor.expertise.length,
      label: "Specializations",
    },
    { icon: HeartPulse, value: doctor.experience, label: "Years Exp." },
  ];

  return (
    <section className="border-b border-border/50 bg-surface">
      <div className="mx-auto max-w-page px-4 py-6 md:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:grid-cols-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="flex flex-col items-center rounded-xl bg-background p-4 text-center"
              >
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-1.5 text-lg font-bold text-text-primary">
                  {stat.value}
                </p>
                <p className="text-[10px] font-medium text-text-secondary">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
