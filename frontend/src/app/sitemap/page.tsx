"use client";

import { PageTransition } from "@/app/components/ui/PageTransition";
import {
  Calendar,
  Home,
  Mail,
  Phone,
  Scale,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

interface PageGroup {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: { href: string; label: string; description?: string }[];
}

const pageGroups: PageGroup[] = [
  {
    title: "Main Pages",
    description: "Core pages of the MediFlow platform",
    icon: <Home className="h-6 w-6" />,
    links: [
      { href: "/", label: "Home", description: "Welcome to MediFlow" },
      {
        href: "/about",
        label: "About Us",
        description: "Learn about our mission and team",
      },
      {
        href: "/contact",
        label: "Contact Us",
        description: "Get in touch with MediFlow",
      },
      {
        href: "/appointment",
        label: "Book Appointment",
        description: "Schedule a visit with a specialist",
      },
    ],
  },
  {
    title: "Medical Departments",
    description: "Browse our specialized medical departments",
    icon: <Stethoscope className="h-6 w-6" />,
    links: [
      {
        href: "/departments",
        label: "All Departments",
        description: "View all medical departments",
      },
      {
        href: "/departments/cardiology",
        label: "Cardiology",
        description: "Heart and cardiovascular care",
      },
      {
        href: "/departments/neurology",
        label: "Neurology",
        description: "Brain and nervous system care",
      },
      {
        href: "/departments/pediatrics",
        label: "Pediatrics",
        description: "Child healthcare services",
      },
      {
        href: "/departments/orthopedics",
        label: "Orthopedics",
        description: "Bone and joint care",
      },
      {
        href: "/departments/ophthalmology",
        label: "Ophthalmology",
        description: "Eye care and vision services",
      },
    ],
  },
  {
    title: "Doctors",
    description: "Meet our team of healthcare professionals",
    icon: <Users className="h-6 w-6" />,
    links: [
      {
        href: "/doctors",
        label: "All Doctors",
        description: "Browse our full medical team",
      },
    ],
  },
  {
    title: "Authentication",
    description: "Account management pages",
    icon: <UserPlus className="h-6 w-6" />,
    links: [
      {
        href: "/auth/login",
        label: "Login",
        description: "Sign in to your account",
      },
      {
        href: "/auth/register",
        label: "Register",
        description: "Create a new account",
      },
      {
        href: "/auth/forgot-password",
        label: "Forgot Password",
        description: "Reset your password",
      },
      {
        href: "/auth/reset-password",
        label: "Reset Password",
        description: "Set a new password",
      },
      {
        href: "/auth/verify-email",
        label: "Verify Email",
        description: "Confirm your email address",
      },
      {
        href: "/auth/resend-verification",
        label: "Resend Verification",
        description: "Request a new verification email",
      },
    ],
  },
  {
    title: "Legal",
    description: "Policies and legal information",
    icon: <Scale className="h-6 w-6" />,
    links: [
      {
        href: "/privacy",
        label: "Privacy Policy",
        description: "How we handle your data",
      },
      {
        href: "/terms",
        label: "Terms & Conditions",
        description: "Rules for using MediFlow",
      },
      {
        href: "/cookies",
        label: "Cookie Policy",
        description: "How we use cookies",
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <PageTransition>
      {/* Header */}
      <div className="mx-auto max-w-page px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Sitemap
        </h1>
        <p className="mt-2 text-text-secondary">
          A complete overview of all pages on MediFlow
        </p>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-page px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pageGroups.map((group, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f4f4] text-primary">
                  {group.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    {group.title}
                  </h2>
                  <p className="text-sm text-text-secondary">
                    {group.description}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-[#f0f7f7] hover:text-primary"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-border group-hover:bg-primary" />
                      <span className="font-medium">{link.label}</span>
                      {link.description && (
                        <span className="hidden text-xs text-text-secondary/60 group-hover:block sm:block">
                          — {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Contact */}
        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Need Help?
          </h2>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <a
              href="tel:+12497525068"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              +1 (249) 752-5068
            </a>
            <a
              href="mailto:info@mediflow.com"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              info@mediflow.com
            </a>
            <Link
              href="/appointment"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Calendar className="h-4 w-4" />
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
