"use client";

import { fadeUp } from "@/lib/animations/fade";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface GalleryProps {
  doctor: Doctor;
}

export function Gallery({ doctor }: GalleryProps) {
  if (!doctor.gallery || doctor.gallery.length === 0) return null;

  return (
    <section id="gallery">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-text-primary">Gallery</h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {doctor.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img}
                alt={`${doctor.name} gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
