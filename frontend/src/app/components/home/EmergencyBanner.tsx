import { Phone } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Twitter",
    href: "#",
    path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Zm0 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10Zm-5 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4.5-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM10 15.5V8.5l6 3.5-6 3.5z",
  },
];

export function EmergencyBanner() {
  return (
    <div className="bg-primary-dark">
      <div className="mx-auto flex max-w-page items-center justify-between px-4 py-2 md:px-6 lg:px-8">
        {/* Emergency contact — right side */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20">
            <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          </div>
          <span className="text-xs font-medium text-white/80">
            Emergency? Call us 24/7:
          </span>
          <a
            href="tel:+1 (249) 752-5068"
            className="text-xs font-bold text-accent transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
            aria-label="Call emergency hotline: plus 1 (249) 752-5068"
          >
            +1 (249) 752-5068
          </a>
        </div>

        {/* Social icons — left side */}
        <div className="hidden items-center gap-3 sm:flex">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d={social.path} />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
