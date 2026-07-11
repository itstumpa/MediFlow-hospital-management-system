"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { InsuranceProvider } from "@/lib/data/department-detail";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle,
  CreditCard,
  Landmark,
  Shield,
} from "lucide-react";
import {
  iconRotate,
  staggerContainer,
  staggerItem,
} from "./SharedMotionVariants";

interface Props {
  providers: InsuranceProvider[];
}

const paymentFeatures = [
  "Flexible payment plans available",
  "Insurance claim assistance",
  "Cashless treatment options",
  "Corporate healthcare packages",
  "Medical tourism assistance",
];

export function InsuranceSection({ providers }: Props) {
  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Insurance & Payment Options"
          subtitle="We work with leading insurance providers to make quality healthcare accessible."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Insurance Providers */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="mb-4 flex items-center gap-2 text-text-primary">
              <Shield size={18} className="text-primary" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Accepted Insurance</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {providers.map((provider) => (
                <motion.div
                  key={provider.name}
                  variants={staggerItem}
                  whileHover="hover"
                  initial="rest"
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                >
                  <motion.div
                    variants={iconRotate}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary"
                  >
                    <Landmark size={20} aria-hidden="true" />
                  </motion.div>
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-sm font-semibold text-text-primary">
                      {provider.name}
                    </p>
                    {provider.accepted && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                        Accepted
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment & Corporate */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="space-y-6 lg:col-span-2"
          >
            {/* Payment Methods */}
            <motion.div
              variants={staggerItem}
              className="rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2 text-text-primary">
                <CreditCard
                  size={18}
                  className="text-primary"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold">Payment Methods</h3>
              </div>
              <ul className="space-y-2">
                {paymentFeatures.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-text-secondary"
                  >
                    <CheckCircle
                      size={13}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Corporate Healthcare */}
            <motion.div
              variants={staggerItem}
              className="rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2 text-text-primary">
                <Building2
                  size={18}
                  className="text-primary"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold">Corporate Healthcare</h3>
              </div>
              <ul className="space-y-2">
                {paymentFeatures.slice(3).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-text-secondary"
                  >
                    <CheckCircle
                      size={13}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
