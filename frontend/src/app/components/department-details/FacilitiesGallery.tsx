"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { GalleryItem } from "@/lib/data/department-detail";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import {
  imageZoom,
  staggerContainer,
  staggerItem,
} from "./SharedMotionVariants";

interface Props {
  items: GalleryItem[];
}

export function FacilitiesGallery({ items }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevLightbox = useCallback(
    () => setLightboxIndex((p) => (p === 0 ? items.length - 1 : p - 1)),
    [items.length],
  );

  const nextLightbox = useCallback(
    () => setLightboxIndex((p) => (p === items.length - 1 ? 0 : p + 1)),
    [items.length],
  );

  return (
    <AnimatedSection className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Our Facilities"
          subtitle="World-class infrastructure designed for patient comfort and clinical excellence."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, idx) => (
            <motion.button
              key={item.title}
              variants={staggerItem}
              whileHover="hover"
              initial="rest"
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`View ${item.title} - ${item.description}`}
            >
              <motion.div variants={imageZoom} className="h-full w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </motion.div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs text-white/80">
                  {item.description}
                </p>
              </div>

              {/* Expand icon */}
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Expand size={13} className="text-white" aria-hidden="true" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Facility image lightbox"
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>

              {/* Prev */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightbox();
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[80vh] max-w-[90vw] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={items[lightboxIndex].imageUrl}
                  alt={items[lightboxIndex].title}
                  width={1200}
                  height={900}
                  className="h-auto w-auto object-contain"
                  sizes="90vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-4">
                  <p className="text-sm font-semibold text-white">
                    {items[lightboxIndex].title}
                  </p>
                  <p className="mt-0.5 text-xs text-white/80">
                    {items[lightboxIndex].description}
                  </p>
                </div>
              </motion.div>

              {/* Next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightbox();
                }}
                className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white md:block"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === lightboxIndex
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
