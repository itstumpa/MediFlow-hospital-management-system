"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const leadership = [
  {
    name: "Dr. Farid Ahmed",
    position: "Chief Executive Officer",
    bio: "Visionary healthcare leader with 25+ years of experience in hospital management and patient care innovation. Dr. Ahmed has transformed MediFlow into a trusted healthcare brand.",
    initials: "FA",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    name: "Dr. Nusrat Jahan",
    position: "Medical Director",
    bio: "Board-certified physician with expertise in internal medicine and healthcare quality standards. Dr. Jahan oversees all clinical operations and medical protocols.",
    initials: "NJ",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    gradient: "from-accent/20 to-primary/20",
  },
  {
    name: "Dr. Tahmid Karim",
    position: "Head of Surgery",
    bio: "Renowned surgeon with specialized training in minimally invasive procedures. Dr. Karim has performed over 5,000 successful surgeries with a 99% success rate.",
    initials: "TK",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    gradient: "from-primary-dark/20 to-accent/20",
  },
  {
    name: "Sarah Rahman",
    position: "Operations Manager",
    bio: "Healthcare administration expert ensuring seamless daily operations. Sarah's leadership has improved patient satisfaction scores by 40% through process optimization.",
    initials: "SR",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    gradient: "from-accent/20 to-primary-dark/20",
  },
];

export function Leadership() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="bg-background py-6 md:py-16">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Meet Our Leadership"
          subtitle="Dedicated professionals committed to delivering exceptional healthcare and driving medical innovation."
        />

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {leadership.map((member) => (
            <motion.div
              key={member.name}
              variants={reduced ? undefined : staggerItem}
              whileHover={
                reduced
                  ? undefined
                  : { y: -8, transition: { duration: 0.3, ease: "easeOut" } }
              }
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Quote icon decoration */}
              <Quote
                className="absolute top-3 right-3 h-8 w-8 text-primary/5"
                aria-hidden="true"
              />

              {/* Photo */}
              <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full ring-2 ring-border transition-shadow duration-300 group-hover:ring-primary/30">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Name & Position */}
              <h3 className="text-lg font-semibold text-text-primary">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {member.position}
              </p>

              {/* Bio */}
              <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                {member.bio}
              </p>

              {/* LinkedIn */}
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? undefined : { scale: 1.15, rotate: 8 }}
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label={`${member.name} on LinkedIn`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-xs">LinkedIn</span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
