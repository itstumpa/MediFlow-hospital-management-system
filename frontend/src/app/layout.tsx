import { EmergencyBanner } from "@/app/components/home/EmergencyBanner";
import { Navbar } from "@/app/components/home/Navbar";
import { ScrollProgress } from "@/app/components/ui/ScrollProgress";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const Footer = dynamic(
  () =>
    import("@/app/components/home/footer/Footer").then((m) => ({
      default: m.Footer,
    })),
  {
    loading: () => <div className="bg-[#0f1a1a] h-64" aria-hidden="true" />,
  },
);

const siteUrl = "https://mediflow.com";

export const metadata: Metadata = {
  title: {
    default: "MediFlow | Modern Hospital & Clinic Management",
    template: "%s | MediFlow",
  },
  description:
    "Quality healthcare, one click away. MediFlow connects you with top doctors, seamless appointment booking, and complete digital healthcare management.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MediFlow",
    title: "MediFlow | Modern Hospital & Clinic Management",
    description:
      "Quality healthcare, one click away. MediFlow connects you with top doctors, seamless appointment booking, and complete digital healthcare management.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MediFlow - Modern Hospital & Clinic Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediFlow | Modern Hospital & Clinic Management",
    description:
      "Quality healthcare, one click away. MediFlow connects you with top doctors, seamless appointment booking, and complete digital healthcare management.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Skip-to-content link for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hospital",
              name: "MediFlow",
              description:
                "Modern hospital and clinic management platform connecting you with trusted healthcare professionals.",
              url: siteUrl,
              telephone: "+1 (249) 752-5068",
              medicalSpecialty: [
                "Cardiology",
                "Neurology",
                "Pediatrics",
                "Orthopedics",
                "Ophthalmology",
                "Gynecology",
              ],
              areaServed: "US",
              sameAs: ["#"],
            }),
          }}
        />
        <LazyMotion features={domMax}>
          <MotionConfig reducedMotion="user">
            <ScrollProgress />
            <aside aria-label="Emergency announcement">
              <EmergencyBanner />
            </aside>
            <Navbar />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </MotionConfig>
        </LazyMotion>
      </body>
    </html>
  );
}
