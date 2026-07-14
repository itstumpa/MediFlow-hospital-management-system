"use client";

import { PageTransition } from "@/app/components/ui/PageTransition";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, including your name, email address, phone number, date of birth, medical history, insurance details, and payment information when you register, book appointments, or communicate with us. We also automatically collect certain information when you visit our website, such as your IP address, browser type, operating system, referring URLs, and usage patterns.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use your information to provide and improve our healthcare services, process appointments, communicate with you about your care, send administrative messages, comply with legal obligations, and enhance your experience on our platform. Your data is processed in accordance with applicable healthcare privacy regulations.",
  },
  {
    title: "Data Sharing & Disclosure",
    content:
      "We may share your information with healthcare providers involved in your care, insurance companies for billing purposes, trusted third-party service providers who assist us in operating our platform, and regulatory authorities as required by law. We never sell your personal information to third parties.",
  },
  {
    title: "Data Security",
    content:
      "We implement industry-standard security measures including SSL/TLS encryption, secure data storage, regular security audits, access controls, and staff training to protect your personal and medical information. Despite our best efforts, no electronic transmission or storage method is 100% secure.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, correct, update, or request deletion of your personal information at any time. You may also object to or restrict certain processing activities, request data portability, and withdraw consent where processing is based on consent. To exercise these rights, contact our Data Protection Officer.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your personal information for as long as necessary to provide you with healthcare services and as required by applicable laws and regulations. Medical records are retained in accordance with statutory retention periods. When data is no longer needed, it is securely disposed of or anonymized.",
  },
  {
    title: "International Data Transfers",
    content:
      "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place through standard contractual clauses, data processing agreements, and compliance with international data protection frameworks.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and, where appropriate, via email or in-app notification. We encourage you to review this policy periodically.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer at privacy@mediflow.com or call +1 (249) 752-5068. You also have the right to lodge a complaint with your local data protection authority.",
  },
];

const lastUpdated = "June 15, 2026";

export default function PrivacyPolicyPage() {
  return (
    <PageTransition>
      {/* Header */}
      <div className="mx-auto max-w-page px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-text-secondary">Last updated: {lastUpdated}</p>
        <p className="mt-1 text-text-secondary">
          Your privacy matters to us. Learn how MediFlow collects, uses, and
          protects your information.
        </p>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-page px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10">
          <div className="prose prose-lg max-w-none">
            <p className="text-base leading-relaxed text-text-secondary">
              At MediFlow, we are committed to protecting your privacy and
              ensuring the security of your personal and medical information.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website and use our
              healthcare management services.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border-b border-border pb-8 last:border-b-0 last:pb-0"
              >
                <h2 className="mb-4 text-xl font-semibold text-text-primary sm:text-2xl">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-base leading-relaxed text-text-secondary">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
