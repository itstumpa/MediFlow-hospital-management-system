import { RootLayoutContent } from "@/app/components/layout/RootLayoutContent";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

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
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
