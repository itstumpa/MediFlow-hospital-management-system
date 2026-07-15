"use client";

import { EmergencyBanner } from "@/app/components/home/EmergencyBanner";
import { Navbar } from "@/app/components/home/Navbar";
import { ScrollProgress } from "@/app/components/ui/ScrollProgress";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Footer = dynamic(
  () =>
    import("@/app/components/home/footer/Footer").then((m) => ({
      default: m.Footer,
    })),
  {
    loading: () => <div className="bg-[#0f1a1a] h-64" aria-hidden="true" />,
  },
);

/** Routes where the global navbar, footer, and banner should be hidden. */
const DASHBOARD_PATTERNS = [
  /^\/admin(\/|$)/,
  /^\/patient(\/|$)/,
  /^\/doctor(\/|$)/,
  /^\/staff(\/|$)/,
];

function isDashboardRoute(pathname: string): boolean {
  return DASHBOARD_PATTERNS.some((pattern) => pattern.test(pathname));
}

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = isDashboardRoute(pathname);

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        {isDashboard ? (
          children
        ) : (
          <>
            <ScrollProgress />
            <aside aria-label="Emergency announcement">
              <EmergencyBanner />
            </aside>
            <Navbar />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </>
        )}
      </MotionConfig>
    </LazyMotion>
  );
}
