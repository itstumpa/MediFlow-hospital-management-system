"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { staggerContainer, staggerItem, imageZoom } from "./SharedMotionVariants";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { Button } from "@/app/components/ui/Button";
import type { HealthResource } from "@/lib/data/department-detail";

interface Props {
  resources: HealthResource[];
}

export function HealthResources({ resources }: Props) {
  return (
    <AnimatedSection className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Health Resources"
          subtitle="Stay informed with expert articles, guides, and resources curated by our specialists."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.title}
              variants={staggerItem}
              whileHover="hover"
              initial="rest"
              className="group flex cursor-default flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.div variants={imageZoom} className="h-full w-full">
                  <Image
                    src={resource.imageUrl}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                {/* Meta */}
                <div className="mb-2 flex items-center gap-3 text-[11px] text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Clock size={11} aria-hidden="true" />
                    {resource.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} aria-hidden="true" />
                    By {resource.doctor}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold leading-snug text-text-primary">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-xs leading-relaxed text-text-secondary">
                  {resource.description}
                </p>

                {/* Link */}
                <Button variant="ghost" size="sm" className="group/btn mt-3 self-start p-0 text-primary hover:bg-transparent">
                  Read Article
                  <ChevronRight size={13} className="ml-0.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
