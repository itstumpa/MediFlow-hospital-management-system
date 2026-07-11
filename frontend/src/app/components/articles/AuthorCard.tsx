"use client";

import { slideRight } from "@/lib/animations/slide";
import type { ArticleAuthor } from "@/lib/data/articles";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Calendar, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AuthorCardProps {
  author: ArticleAuthor;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <motion.div
      variants={slideRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:p-8">
        {/* Avatar */}
        <div className="relative mx-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-border md:mx-0">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center gap-1.5 md:justify-start">
            <h3 className="text-xl font-bold text-text-primary">
              {author.name}
            </h3>
            <BadgeCheck
              className="h-5 w-5 text-primary"
              aria-label="Verified Doctor"
            />
          </div>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-sm text-text-secondary md:justify-start">
            <span className="flex items-center gap-1">
              <Stethoscope className="h-4 w-4" aria-hidden="true" />
              {author.specialization}
            </span>
            <span>{author.experience} years experience</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {author.bio}
          </p>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href={`/doctors`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Book Appointment
            </Link>
            <Link
              href={`/doctors`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View Profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
