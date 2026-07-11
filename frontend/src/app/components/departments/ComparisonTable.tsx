"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { comparisonData } from "@/lib/data/departments";
import { motion } from "framer-motion";
import { CheckCircle, Monitor, Phone, XCircle } from "lucide-react";

export function ComparisonTable() {
  return (
    <AnimatedSection className="bg-background py-16 md:py-24" id="comparison">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Medical Services Comparison"
          subtitle="Compare our departments to find the right specialty for your needs."
        />

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
          <table className="w-full text-left text-sm" role="table">
            <caption className="sr-only">
              Comparison of medical departments including conditions treated,
              available specialists, emergency support, and online consultation
              availability.
            </caption>
            <thead>
              <tr className="border-b border-border bg-primary/5">
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary"
                >
                  Conditions Treated
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary md:table-cell"
                >
                  Available Specialists
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary md:table-cell"
                >
                  Emergency Support
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary md:table-cell"
                >
                  Online Consultation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisonData.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <motion.tr
                    key={row.department}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="transition-colors hover:bg-primary/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                          <Icon
                            className="h-5 w-5 text-primary"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="font-semibold text-text-primary">
                          {row.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-text-secondary">
                      {row.conditions}
                    </td>
                    <td className="hidden px-5 py-4 text-text-secondary md:table-cell">
                      <span className="inline-flex items-center gap-1.5 font-medium text-text-primary">
                        <Monitor
                          size={14}
                          className="text-primary"
                          aria-hidden="true"
                        />
                        {row.specialists}
                      </span>
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      {row.emergency ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                          <CheckCircle size={16} aria-hidden="true" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary/60">
                          <XCircle size={16} aria-hidden="true" />
                          Not Available
                        </span>
                      )}
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      {row.onlineConsultation ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                          <Phone size={16} aria-hidden="true" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary/60">
                          <XCircle size={16} aria-hidden="true" />
                          Not Available
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Responsive card view for mobile */}
        <div className="mt-6 space-y-4 md:hidden">
          {comparisonData.map((row, idx) => {
            const Icon = row.icon;
            return (
              <motion.div
                key={row.department}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-xl border border-border bg-surface p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-text-primary">
                    {row.department}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>
                    <span className="font-medium text-text-primary">
                      Conditions:
                    </span>{" "}
                    {row.conditions}
                  </p>
                  <p>
                    <span className="font-medium text-text-primary">
                      Specialists:
                    </span>{" "}
                    {row.specialists}
                  </p>
                  <div className="flex gap-4">
                    <span>
                      {row.emergency ? "✅ Emergency" : "❌ No Emergency"}
                    </span>
                    <span>
                      {row.onlineConsultation
                        ? "✅ Online Consult"
                        : "❌ No Online Consult"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
