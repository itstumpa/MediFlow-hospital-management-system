"use client";

import { staggerItem } from "@/app/components/dashboard/MotionVariants";
import type { PatientDetail } from "@/lib/data/patient-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  CalendarCheck,
  ClipboardList,
  DollarSign,
  FlaskRoundIcon as Flask,
  Pill,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  bgColor: string;
  delay?: number;
}

function AnimatedCounter({
  target,
  duration = 1500,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const startTime = performance.now();
          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="dash-card group cursor-default"
    >
      <div className="flex items-start gap-4 p-5">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
            bgColor,
          )}
        >
          <Icon className={cn("h-6 w-6", color)} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-0.5 text-2xl font-bold text-slate-900 dark:text-white">
            <AnimatedCounter target={value} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface PatientStatsProps {
  patient: PatientDetail;
}

export function PatientStats({ patient }: PatientStatsProps) {
  const stats = [
    {
      icon: CalendarCheck,
      label: "Total Visits",
      value: patient.totalVisits,
      color: "text-dash-primary",
      bgColor: "bg-dash-primary-light dark:bg-teal-900/30",
    },
    {
      icon: Activity,
      label: "Upcoming Appointments",
      value: patient.upcomingAppointments,
      color: "text-violet-600",
      bgColor: "bg-violet-100 dark:bg-violet-900/30",
    },
    {
      icon: ClipboardList,
      label: "Completed Treatments",
      value: patient.completedTreatments,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      icon: Pill,
      label: "Prescriptions",
      value: patient.totalPrescriptions,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      icon: Flask,
      label: "Lab Reports",
      value: patient.totalLabReports,
      color: "text-rose-600",
      bgColor: "bg-rose-100 dark:bg-rose-900/30",
    },
    {
      icon: DollarSign,
      label: "Outstanding Bills",
      value: patient.outstandingBills,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <motion.div variants={staggerItem}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={0.05 * i} />
        ))}
      </div>
    </motion.div>
  );
}
