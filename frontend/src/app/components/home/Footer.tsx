import {
  ExternalLink,
  Globe,
  HeartPulse,
  MessageCircle,
  Share2,
} from "lucide-react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

// TODO: Replace with API data
const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Departments", href: "/departments" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// TODO: Replace with API data
const departmentLinks: FooterLink[] = [
  { label: "Cardiology", href: "/departments" },
  { label: "Neurology", href: "/departments" },
  { label: "Pediatrics", href: "/departments" },
  { label: "Orthopedics", href: "/departments" },
  { label: "Ophthalmology", href: "/departments" },
  { label: "Women's Health", href: "/departments" },
  { label: "Gynecology", href: "/departments" },
];

const contactInfo = [
  { label: "123 Healthcare Avenue, Voluptate non doloru, USA" },
  { label: "+1 (249) 752-5068" },
  { label: "info@mediflow.com" },
];

const socialLinks = [
  { label: "Facebook", icon: Globe, href: "#" },
  { label: "Twitter", icon: MessageCircle, href: "#" },
  { label: "LinkedIn", icon: ExternalLink, href: "#" },
  { label: "Instagram", icon: Share2, href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white" role="contentinfo">
      <div className="mx-auto max-w-page px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
              aria-label="MediFlow home"
            >
              <HeartPulse className="h-7 w-7 text-accent" aria-hidden="true" />
              <span>MediFlow</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Modern hospital and clinic management platform connecting you with
              trusted healthcare professionals.
            </p>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-accent">
              Quick links
            </h3>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-accent">
              Departments
            </h3>
            <ul className="space-y-3" role="list">
              {departmentLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-accent">
              Contact us
            </h3>
            <ul className="space-y-3" role="list">
              {contactInfo.map((item) => (
                <li key={item.label} className="text-sm text-white/60">
                  {item.label}
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold tracking-wider text-accent">
                Follow us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-all duration-200 hover:bg-accent hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-page px-4 py-5 text-center text-xs text-white/40 md:px-6 lg:px-8">
          &copy; {currentYear} MediFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
