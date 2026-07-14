"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  FileText,
  Lightbulb,
  Stethoscope,
  User,
} from "lucide-react";

interface QuickInfoProps {
  reasonForVisit: string;
  symptoms: string[];
  notes?: string;
  diagnosis?: string;
  treatment?: string;
  recommendations?: string[];
  className?: string;
}

export function QuickInfo({
  reasonForVisit,
  symptoms,
  notes,
  diagnosis,
  treatment,
  recommendations,
  className,
}: QuickInfoProps) {
  return (
    <motion.div variants={staggerItem} className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Quick Information
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Reason for Visit */}
        <InfoCard
          icon={Stethoscope}
          title="Reason for Visit"
          color="text-blue-600 dark:text-blue-400"
          bgColor="bg-blue-50 dark:bg-blue-950/30"
          iconBg="bg-blue-100 dark:bg-blue-950/50"
        >
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {reasonForVisit}
          </p>
        </InfoCard>

        {/* Symptoms */}
        <InfoCard
          icon={AlertTriangle}
          title="Symptoms"
          color="text-amber-600 dark:text-amber-400"
          bgColor="bg-amber-50 dark:bg-amber-950/30"
          iconBg="bg-amber-100 dark:bg-amber-950/50"
        >
          {symptoms.length > 0 ? (
            <ul className="space-y-1">
              {symptoms.map((symptom, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {symptom}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500 italic">
              No symptoms recorded
            </p>
          )}
        </InfoCard>

        {/* Notes */}
        {notes && (
          <InfoCard
            icon={User}
            title="Additional Notes"
            color="text-violet-600 dark:text-violet-400"
            bgColor="bg-violet-50 dark:bg-violet-950/30"
            iconBg="bg-violet-100 dark:bg-violet-950/50"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {notes}
            </p>
          </InfoCard>
        )}

        {/* Treatment Plan */}
        {treatment && (
          <InfoCard
            icon={FileText}
            title="Treatment Plan"
            color="text-emerald-600 dark:text-emerald-400"
            bgColor="bg-emerald-50 dark:bg-emerald-950/30"
            iconBg="bg-emerald-100 dark:bg-emerald-950/50"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {treatment}
            </p>
          </InfoCard>
        )}

        {/* Diagnosis (full width) */}
        {diagnosis && (
          <InfoCard
            icon={Lightbulb}
            title="Diagnosis"
            color="text-[var(--color-primary)]"
            bgColor="bg-[var(--color-primary)]/5 dark:bg-[var(--color-accent)]/5"
            iconBg="bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/10"
            className="md:col-span-2"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {diagnosis}
            </p>
          </InfoCard>
        )}

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <InfoCard
            icon={Lightbulb}
            title="Recommendations"
            color="text-indigo-600 dark:text-indigo-400"
            bgColor="bg-indigo-50 dark:bg-indigo-950/30"
            iconBg="bg-indigo-100 dark:bg-indigo-950/50"
            className="md:col-span-2"
          >
            <ol className="space-y-2">
              {recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                    {i + 1}
                  </span>
                  {rec}
                </li>
              ))}
            </ol>
          </InfoCard>
        )}
      </div>
    </motion.div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  color,
  bgColor,
  iconBg,
  children,
  className,
}: {
  icon: typeof Stethoscope;
  title: string;
  color: string;
  bgColor: string;
  iconBg: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl",
            iconBg,
          )}
        >
          <Icon className={cn("h-4.5 w-4.5", color)} />
        </div>
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </h4>
      </div>
      {children}
    </motion.div>
  );
}
