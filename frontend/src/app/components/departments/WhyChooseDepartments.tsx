"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { whyChooseItems } from "@/lib/data/departments";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function WhyChooseDepartments() {
  return (
    <AnimatedSection className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose Our Departments"
          subtitle="Discover what sets our medical departments apart in patient care and clinical excellence."
        />

        <div className="space-y-12 md:space-y-20">
          {whyChooseItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className={`grid items-center gap-8 md:gap-12 lg:grid-cols-2 ${
                idx % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                variants={staggerItem}
                className={`overflow-hidden rounded-2xl ${
                  idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="group relative aspect-[6/5] overflow-hidden rounded-2xl">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                variants={staggerContainer}
                className={idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}
              >
                <motion.div
                  variants={staggerItem}
                  className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary"
                >
                  <CheckCircle size={15} aria-hidden="true" />
                  <span>Why Choose Us</span>
                </motion.div>

                <motion.h3
                  variants={staggerItem}
                  className="text-2xl font-bold text-text-primary md:text-3xl"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  variants={staggerItem}
                  className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg"
                >
                  {item.description}
                </motion.p>

                <motion.ul variants={staggerItem} className="mt-6 space-y-3">
                  {[
                    "Board-certified specialists",
                    "Evidence-based treatments",
                    "Personalized care plans",
                    "Advanced medical technology",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-sm text-text-secondary"
                    >
                      <CheckCircle
                        size={16}
                        className="shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
