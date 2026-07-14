"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarPlus, Clock, Stethoscope, Video } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { staggerContainer, staggerItem } from "./MotionVariants";

const quickActionButtons = [
  {
    icon: CalendarPlus,
    label: "Add Prescription",
    href: "/doctor/prescriptions",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Clock,
    label: "View Schedule",
    href: "/doctor/schedule",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Video,
    label: "Start Consultation",
    href: "/doctor/appointments",
    color: "from-emerald-500 to-teal-500",
  },
];

export function DashboardHero() {
  const [greeting, setGreeting] = useState("Good Morning");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const now = new Date();
    setCurrentTime(
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
    setCurrentDate(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 p-6 sm:p-8",
        "dark:from-cyan-900/80 dark:via-blue-900/80 dark:to-indigo-900/80",
        "shadow-lg shadow-cyan-200/30 dark:shadow-cyan-900/20",
      )}
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="relative">
        {/* Top section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: Greeting */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                {greeting}, Dr. Sarah Mitchell 👋
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-sm text-white/70"
            >
              <Stethoscope className="mr-1.5 inline-block h-3.5 w-3.5" />
              Cardiologist • {currentDate}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xs text-white/50"
            >
              Current time: {currentTime}
            </motion.p>
          </div>

          {/* Right: Quick action buttons */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2"
          >
            {quickActionButtons.map((btn) => (
              <motion.div key={btn.label} variants={staggerItem}>
                <Link
                  href={btn.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200",
                    "hover:bg-white/20 hover:shadow-lg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                    "backdrop-blur-sm",
                  )}
                >
                  <btn.icon className="h-4 w-4" />
                  <span>{btn.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
