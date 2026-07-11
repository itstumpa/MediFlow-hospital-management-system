"use client";

import { PageTransition } from "@/app/components/ui/PageTransition";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using MediFlow's website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our platform. These terms constitute a legally binding agreement between you and MediFlow.",
  },
  {
    title: "Medical Disclaimer",
    content:
      "MediFlow provides a platform for healthcare management and appointment booking. The content on our website is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare provider for medical concerns, diagnoses, or treatment decisions. In case of a medical emergency, call 911 immediately.",
  },
  {
    title: "User Responsibilities",
    content:
      "You agree to provide accurate, current, and complete information when using our services. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use of your account or any security breach.",
  },
  {
    title: "Appointments & Cancellations",
    content:
      "Appointments booked through MediFlow are subject to availability. We require at least 24 hours' notice for cancellations or rescheduling. Late cancellations or missed appointments may result in a fee. MediFlow reserves the right to cancel or reschedule appointments due to unforeseen circumstances, with reasonable notice provided.",
  },
  {
    title: "Telehealth Services",
    content:
      "Telehealth consultations are provided as a convenience and may not be suitable for all medical conditions. You must be in a private, well-lit location with a stable internet connection. MediFlow does not guarantee the availability or quality of third-party telehealth platforms used in conjunction with our services.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on MediFlow's platform, including text, graphics, logos, images, software, and design elements, is the property of MediFlow or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.",
  },
  {
    title: "Limitation of Liability",
    content:
      "MediFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our platform. Our total liability for any claim shall not exceed the amount you have paid us in the twelve months preceding the claim. Some jurisdictions may not allow certain limitations, so these may not apply to you.",
  },
  {
    title: "Privacy & Data Protection",
    content:
      "Your use of MediFlow is also governed by our Privacy Policy and Cookie Policy. By using our platform, you consent to the collection, use, and processing of your information as described in those policies. We implement appropriate security measures to protect your data.",
  },
  {
    title: "Third-Party Links",
    content:
      "Our platform may contain links to third-party websites or services that are not owned or controlled by MediFlow. We are not responsible for the content, privacy practices, or terms of any third-party sites. Accessing third-party links is at your own risk, and we encourage you to review their terms and policies.",
  },
  {
    title: "Termination",
    content:
      "MediFlow reserves the right to suspend or terminate your access to our platform at any time, without prior notice, for conduct that we believe violates these Terms & Conditions or is harmful to other users, third parties, or MediFlow. Upon termination, your right to use the platform will immediately cease.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting. We will notify you of material changes via email or through our platform. Your continued use of MediFlow after changes constitutes acceptance of the new terms.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms & Conditions shall be governed by and construed in accordance with the applicable laws. Any disputes arising under these terms shall be resolved in the appropriate courts. The failure to enforce any right or provision of these terms shall not constitute a waiver of such right or provision.",
  },
  {
    title: "Contact Information",
    content:
      "For questions, concerns, or inquiries about these Terms & Conditions, please contact us at legal@mediflow.com, call +1 (249) 752-5068, or write to MediFlow Legal Department, 123 Healthcare Avenue, Medical District, CA 94102, United States.",
  },
];

const lastUpdated = "June 15, 2026";

export default function TermsPage() {
  return (
    <PageTransition>
      {/* Header */}
      <div className="mx-auto max-w-page px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-text-secondary">Last updated: {lastUpdated}</p>
        <p className="mt-1 text-text-secondary">
          Please read these terms carefully before using MediFlow services.
        </p>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-page px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10">
          <p className="mb-10 text-base leading-relaxed text-text-secondary">
            Welcome to MediFlow. These Terms &amp; Conditions govern your use of
            our website, mobile application, and healthcare management services.
            By accessing or using our platform, you acknowledge that you have
            read, understood, and agree to be bound by these terms.
          </p>

          <div className="space-y-10">
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
