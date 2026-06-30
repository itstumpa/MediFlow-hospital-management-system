"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HeartPulse, Menu, X } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface NavLink {
  label: string;
  href: string;
}

// TODO: Replace with API data
const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "#doctors" },
  { label: "Departments", href: "#departments" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(href: string) {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        isScrolled
          ? "bg-surface shadow-md"
          : "bg-surface/95 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          aria-label="MediFlow home"
        >
          <HeartPulse className="h-7 w-7 text-primary" aria-hidden="true" />
          <span>MediFlow</span>
        </Link>

        {/* Desktop navigation links */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded px-1 py-1 ${
                  activeLink === link.href
                    ? "text-primary"
                    : "text-text-secondary"
                }`}
                aria-current={activeLink === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop action buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="sm" href="/login">
            Login
          </Button>
          <Button variant="primary" size="sm" href="/book-appointment">
            Book Appointment
          </Button>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="flex items-center justify-center rounded-lg p-2 text-text-primary hover:bg-background md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-surface px-4 pb-6 pt-2 md:hidden"
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    activeLink === link.href
                      ? "text-primary bg-primary/5"
                      : "text-text-secondary"
                  }`}
                  aria-current={activeLink === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 px-4">
            <Button variant="outline" size="md" href="/login">
              Login
            </Button>
            <Button variant="primary" size="md" href="/book-appointment">
              Book Appointment
            </Button>
          </div>
        </div>
      )}

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-0 z-[-1] bg-black/20 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
