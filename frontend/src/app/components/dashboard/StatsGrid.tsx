"use client";

import {
  Building2,
  CalendarCheck,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Stethoscope,
  Users,
} from "lucide-react";
import type { StatsCardData } from "./StatsCard";
import { StatsCard } from "./StatsCard";

const statsData: StatsCardData[] = [
  {
    icon: Stethoscope,
    label: "Total Doctors",
    value: 24,
    suffix: "",
    trend: 8.5,
    trendLabel: "vs last month",
    sparkline: [18, 18, 19, 20, 21, 23, 24],
    colorClass: "blue",
    description: "Active practicing physicians",
  },
  {
    icon: Users,
    label: "Total Patients",
    value: 1482,
    trend: 12.3,
    trendLabel: "vs last month",
    sparkline: [980, 1050, 1120, 1200, 1320, 1400, 1482],
    colorClass: "emerald",
    description: "Registered patients",
  },
  {
    icon: CalendarCheck,
    label: "Today's Appointments",
    value: 38,
    trend: 15.2,
    trendLabel: "vs yesterday",
    sparkline: [22, 25, 28, 30, 33, 36, 38],
    colorClass: "violet",
    description: "Scheduled for today",
  },
  {
    icon: Building2,
    label: "Total Departments",
    value: 12,
    trend: 0,
    trendLabel: "unchanged",
    sparkline: [10, 10, 11, 11, 12, 12, 12],
    colorClass: "amber",
    description: "Medical departments",
  },
  {
    icon: Clock,
    label: "Pending Appointments",
    value: 7,
    trend: -23.5,
    trendLabel: "vs last week",
    sparkline: [12, 11, 10, 9, 9, 8, 7],
    colorClass: "rose",
    description: "Awaiting confirmation",
  },
  {
    icon: FileText,
    label: "Published Articles",
    value: 64,
    trend: 4.9,
    trendLabel: "vs last month",
    sparkline: [48, 52, 55, 58, 60, 62, 64],
    colorClass: "cyan",
    description: "Health blog posts",
  },
  {
    icon: MessageSquare,
    label: "New Messages",
    value: 18,
    trend: 45.2,
    trendLabel: "vs last week",
    sparkline: [5, 7, 9, 11, 14, 16, 18],
    colorClass: "orange",
    description: "Unread inquiries",
  },
  {
    icon: DollarSign,
    label: "Monthly Revenue",
    value: 84250,
    prefix: "$",
    trend: 8.3,
    trendLabel: "vs last month",
    sparkline: [62000, 65000, 71000, 75000, 78000, 81000, 84250],
    colorClass: "indigo",
    description: "Current month revenue",
  },
];

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {statsData.map((stat, i) => (
        <StatsCard key={stat.label} data={stat} index={i} />
      ))}
    </div>
  );
}
