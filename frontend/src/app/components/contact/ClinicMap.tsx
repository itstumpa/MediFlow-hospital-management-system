"use client";

import { slideRight } from "@/lib/animations/slide";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import {
  Bus,
  Car,
  ExternalLink,
  MapPin,
  Navigation,
  Train,
} from "lucide-react";
import Link from "next/link";

export function ClinicMap() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-[28px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-3xl md:text-4xl lg:text-5xl">
            Find Us Here
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            We are conveniently located in the heart of the city.
          </p>
        </div>

        <motion.div
          variants={reduced ? undefined : slideRight}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
        >
          {/* Map Placeholder */}
          <div className="relative h-[320px] bg-gradient-to-br from-primary/5 to-primary/10 md:h-[400px]">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25px 25px, currentColor 1px, transparent 0)",
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Map placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <MapPin
                    className="h-10 w-10 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold text-text-primary">
                  MediFlow Clinic
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  123 Gulshan Avenue, Dhaka 1212, Bangladesh
                </p>
              </div>
            </div>

            {/* Animated marker pulse */}
            <motion.div
              aria-hidden="true"
              className="absolute left-[48%] top-[45%]"
              animate={
                reduced
                  ? undefined
                  : {
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0, 0.4],
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="h-16 w-16 rounded-full bg-primary/20" />
            </motion.div>
          </div>

          {/* Map Info Footer */}
          <div className="grid gap-6 p-6 md:grid-cols-3 md:p-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  Address
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  123 Gulshan Avenue
                  <br />
                  Dhaka 1212, Bangladesh
                </p>
              </div>
            </div>

            {/* Parking */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                <Car className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  Parking
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  Free underground parking available
                  <br />
                  <span className="text-xs text-text-secondary/70">
                    Valet parking: $5
                  </span>
                </p>
              </div>
            </div>

            {/* Transport */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                <Bus className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  Nearby Transport
                </h3>
                <ul className="mt-1 space-y-1">
                  <li className="flex items-center gap-1.5 text-sm text-text-secondary">
                    <Bus
                      className="h-3.5 w-3.5 text-primary/60"
                      aria-hidden="true"
                    />
                    Bus stop: 50m (Gulshan 2)
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-text-secondary">
                    <Train
                      className="h-3.5 w-3.5 text-primary/60"
                      aria-hidden="true"
                    />
                    Metro: 300m (Gulshan Station)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Directions Button */}
          <div className="border-t border-border px-6 py-4 md:px-8">
            <Link
              href="https://maps.google.com/?q=123+Gulshan+Avenue+Dhaka+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
