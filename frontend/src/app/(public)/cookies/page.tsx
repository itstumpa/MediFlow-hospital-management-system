"use client";

import { PageTransition } from "@/app/components/ui/PageTransition";

const cookieCategories = [
  {
    title: "Essential Cookies",
    description:
      "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. Without these cookies, our services cannot be provided.",
    examples: [
      "Session management",
      "Authentication tokens",
      "Security tokens",
      "Load balancing",
    ],
    alwaysActive: true,
  },
  {
    title: "Functional Cookies",
    description:
      "These cookies allow us to remember choices you make and provide enhanced, more personalized features. They may be set by us or by third-party providers whose services we have added to our pages.",
    examples: [
      "Language preferences",
      "Theme preferences",
      "Saved appointments",
      "Region selection",
    ],
    alwaysActive: false,
  },
  {
    title: "Analytics Cookies",
    description:
      "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our platform and deliver a better user experience.",
    examples: [
      "Page visit tracking",
      "User flow analysis",
      "Feature usage statistics",
      "Performance monitoring",
    ],
    alwaysActive: false,
  },
  {
    title: "Marketing Cookies",
    description:
      "These cookies are used to track visitors across websites to display relevant advertisements. They help us measure the effectiveness of our marketing campaigns and deliver content tailored to your interests.",
    examples: [
      "Ad personalization",
      "Campaign tracking",
      "Social media sharing",
      "Retargeting",
    ],
    alwaysActive: false,
  },
];

const lastUpdated = "June 15, 2026";

export default function CookiesPage() {
  return (
    <PageTransition>
      {/* Header */}
      <div className="mx-auto max-w-page px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-text-secondary">Last updated: {lastUpdated}</p>
        <p className="mt-1 text-text-secondary">
          How MediFlow uses cookies and similar tracking technologies.
        </p>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-page px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10">
          <p className="mb-10 text-base leading-relaxed text-text-secondary">
            This Cookie Policy explains what cookies are, how MediFlow uses
            them, and your choices regarding cookies. By continuing to use our
            website, you consent to our use of cookies in accordance with this
            policy. If you do not agree, please adjust your browser settings or
            refrain from using our platform.
          </p>

          {/* What are cookies */}
          <div className="mb-12 rounded-xl bg-[#f0f7f7] p-6">
            <h2 className="mb-3 text-lg font-semibold text-text-primary">
              What Are Cookies?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Cookies are small text files stored on your device by your web
              browser. They are widely used to make websites work efficiently,
              enhance user experience, and provide information to site owners.
              Cookies can be "persistent" (remain on your device) or "session"
              (deleted when you close your browser).
            </p>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-6">
            {cookieCategories.map((category, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-text-secondary">
                      {category.description}
                    </p>
                    {category.examples.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {category.examples.map((example, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-[#e8f4f4] px-3 py-1 text-sm text-primary"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0">
                    {category.alwaysActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Always Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-text-secondary">
                        Optional
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to control cookies */}
          <div className="mt-12 rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-semibold text-text-primary">
              How to Control Cookies
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                You can control and manage cookies in various ways. Most
                browsers allow you to view, block, delete, or disable cookies
                through your browser settings. Please note that restricting
                cookies may impact your experience on our website and limit
                certain functionality.
              </p>
              <p>
                <strong>Browser settings:</strong> You can typically find cookie
                controls in your browser's "Settings," "Preferences," or
                "Options" menu. Refer to your browser's help documentation for
                detailed instructions.
              </p>
              <p>
                <strong>Third-party opt-outs:</strong> For analytics and
                advertising cookies, you can opt out through tools such as the
                Network Advertising Initiative opt-out page or the Digital
                Advertising Alliance opt-out platform.
              </p>
              <p>
                <strong>Do Not Track:</strong> Some browsers support a "Do Not
                Track" signal. Our platform currently does not respond to these
                signals, but we will update this policy if our practices change.
              </p>
            </div>
          </div>

          {/* Updates */}
          <div className="mt-8 text-sm text-text-secondary">
            <p>
              We may update this Cookie Policy from time to time. Changes will
              be posted on this page with an updated revision date. For
              questions about our cookie practices, contact us at{" "}
              <a
                href="mailto:privacy@mediflow.com"
                className="text-primary underline hover:text-primary-dark"
              >
                privacy@mediflow.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
