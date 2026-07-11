"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  quote: string;
  rating: number;
  imageUrl: string;
}

// TODO: Replace with API data
const testimonials: Testimonial[] = [
  {
    name: "Fatima Begum",
    quote:
      "MediFlow made booking an appointment so easy. I found a specialist in minutes and the whole experience was smooth from start to finish.",
    rating: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Ariful Islam",
    quote:
      "The video consultation feature is a lifesaver. I got a prescription without leaving home. Highly recommend this platform.",
    rating: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Nusrat Jahan",
    quote:
      "My son's pediatrician was booked solid everywhere, but MediFlow had an available slot the same day. Truly a blessing for busy parents.",
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Tariq Hossain",
    quote:
      "The online booking system saved me hours of waiting. I booked my appointment in under a minute and the doctor was extremely professional.",
    rating: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sadia Rahman",
    quote:
      "I love how easy it is to access my lab reports online. No more running back and forth to collect paper copies. Truly a modern healthcare platform.",
    rating: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-10 md:py-14">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            What our patients say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Real stories from people who trust MediFlow for their healthcare
            needs.
          </p>
        </motion.div>

        {/* Infinite carousel — scrolls right to left */}
        <div className="relative mx-auto max-w-page overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {/* First set */}
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={`dup-${testimonial.name}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[22rem] shrink-0">
      <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Floating quote icon */}
        <div className="absolute top-4 right-4 opacity-30 transition-opacity duration-300 group-hover:opacity-60">
          <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>

        {/* Rating stars */}
        <div
          className="mb-4 flex gap-1"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? "fill-warning text-warning"
                  : "fill-none text-border"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative flex-1 text-sm leading-relaxed text-text-secondary">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author with photo */}
        <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
          <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-border">
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.name}
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-text-primary">
            {testimonial.name}
          </span>
        </div>
      </div>
    </div>
  );
}
