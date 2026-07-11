import { EmergencyBanner } from "@/app/components/home/EmergencyBanner";
import { Footer } from "@/app/components/home/Footer";
import { Navbar } from "@/app/components/home/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediFlow | Modern Hospital & Clinic Management",
  description:
    "Quality healthcare, one click away. MediFlow connects you with top doctors, seamless appointment booking, and complete digital healthcare management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <EmergencyBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
