import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // ── /admin/* → /dashboard/admin/* (old route group redirects) ──
      {
        source: "/admin",
        destination: "/dashboard/admin/dashboard",
        permanent: true,
      },
      {
        source: "/admin/dashboard",
        destination: "/dashboard/admin/dashboard",
        permanent: true,
      },
      {
        source: "/admin/doctors",
        destination: "/dashboard/admin/doctors",
        permanent: true,
      },
      {
        source: "/admin/doctors/new",
        destination: "/dashboard/admin/doctors/new",
        permanent: true,
      },
      {
        source: "/admin/doctors/:id",
        destination: "/dashboard/admin/doctors/:id",
        permanent: true,
      },
      {
        source: "/admin/doctors/:id/edit",
        destination: "/dashboard/admin/doctors/:id/edit",
        permanent: true,
      },
      {
        source: "/admin/patients",
        destination: "/dashboard/admin/patients",
        permanent: true,
      },
      {
        source: "/admin/patients/:id",
        destination: "/dashboard/admin/patients/:id",
        permanent: true,
      },
      {
        source: "/admin/departments",
        destination: "/dashboard/admin/departments",
        permanent: true,
      },
      {
        source: "/admin/departments/new",
        destination: "/dashboard/admin/departments/new",
        permanent: true,
      },
      {
        source: "/admin/departments/:id/edit",
        destination: "/dashboard/admin/departments/:id/edit",
        permanent: true,
      },
      {
        source: "/admin/appointments",
        destination: "/dashboard/admin/appointments",
        permanent: true,
      },
      {
        source: "/admin/appointments/calendar",
        destination: "/dashboard/admin/appointments/calendar",
        permanent: true,
      },
      {
        source: "/admin/appointments/:id",
        destination: "/dashboard/admin/appointments/:id",
        permanent: true,
      },
      {
        source: "/admin/articles",
        destination: "/dashboard/admin/articles",
        permanent: true,
      },
      {
        source: "/admin/articles/new",
        destination: "/dashboard/admin/articles/new",
        permanent: true,
      },
      {
        source: "/admin/articles/categories",
        destination: "/dashboard/admin/articles/categories",
        permanent: true,
      },
      {
        source: "/admin/articles/:id/edit",
        destination: "/dashboard/admin/articles/:id/edit",
        permanent: true,
      },
      {
        source: "/admin/analytics",
        destination: "/dashboard/admin/analytics",
        permanent: true,
      },
      {
        source: "/admin/messages",
        destination: "/dashboard/admin/messages",
        permanent: true,
      },
      {
        source: "/admin/notifications",
        destination: "/dashboard/admin/notifications",
        permanent: true,
      },
      {
        source: "/admin/roles",
        destination: "/dashboard/admin/roles",
        permanent: true,
      },
      {
        source: "/admin/settings",
        destination: "/dashboard/admin/settings",
        permanent: true,
      },
      {
        source: "/admin/activity-logs",
        destination: "/dashboard/admin/activity-logs",
        permanent: true,
      },
      {
        source: "/admin/:path*",
        destination: "/dashboard/admin/dashboard",
        permanent: true,
      },

      // ── /patient/* → /dashboard/patient/* (old route group redirects) ──
      {
        source: "/patient",
        destination: "/dashboard/patient/dashboard",
        permanent: true,
      },
      {
        source: "/patient/dashboard",
        destination: "/dashboard/patient/dashboard",
        permanent: true,
      },
      {
        source: "/patient/book-appointment",
        destination: "/dashboard/patient/appointments/book",
        permanent: true,
      },
      {
        source: "/patient/appointments",
        destination: "/dashboard/patient/appointments",
        permanent: true,
      },
      {
        source: "/patient/appointments/:id",
        destination: "/dashboard/patient/appointments/:id",
        permanent: true,
      },
      {
        source: "/patient/records",
        destination: "/dashboard/patient/medical-records",
        permanent: true,
      },
      {
        source: "/patient/records/:id",
        destination: "/dashboard/patient/medical-records/:id",
        permanent: true,
      },
      {
        source: "/patient/prescriptions",
        destination: "/dashboard/patient/prescriptions",
        permanent: true,
      },
      {
        source: "/patient/prescriptions/:path*",
        destination: "/dashboard/patient/prescriptions",
        permanent: true,
      },
      {
        source: "/patient/labs",
        destination: "/dashboard/patient/lab-reports",
        permanent: true,
      },
      {
        source: "/patient/labs/:path*",
        destination: "/dashboard/patient/lab-reports",
        permanent: true,
      },
      {
        source: "/patient/favorites",
        destination: "/dashboard/patient/favorite-doctors",
        permanent: true,
      },
      {
        source: "/patient/notifications",
        destination: "/dashboard/patient/notifications",
        permanent: true,
      },
      {
        source: "/patient/profile",
        destination: "/dashboard/patient/profile",
        permanent: true,
      },
      {
        source: "/patient/settings",
        destination: "/dashboard/patient/settings",
        permanent: true,
      },
      {
        source: "/patient/settings/security",
        destination: "/dashboard/patient/settings/security",
        permanent: true,
      },
      {
        source: "/patient/logout",
        destination: "/",
        permanent: true,
      },
      {
        source: "/patient/:path*",
        destination: "/dashboard/patient/dashboard",
        permanent: true,
      },

      // ── Old clean URLs → /dashboard/patient/* (catch-all redirects) ──
      {
        source: "/dashboard",
        destination: "/dashboard/patient/dashboard",
        permanent: true,
      },
      {
        source: "/appointments",
        destination: "/dashboard/patient/appointments",
        permanent: true,
      },
      {
        source: "/appointments/book",
        destination: "/dashboard/patient/appointments/book",
        permanent: true,
      },
      {
        source: "/appointments/:id",
        destination: "/dashboard/patient/appointments/:id",
        permanent: true,
      },
      {
        source: "/medical-records",
        destination: "/dashboard/patient/medical-records",
        permanent: true,
      },
      {
        source: "/medical-records/:id",
        destination: "/dashboard/patient/medical-records/:id",
        permanent: true,
      },
      {
        source: "/prescriptions",
        destination: "/dashboard/patient/prescriptions",
        permanent: true,
      },
      {
        source: "/prescriptions/:path*",
        destination: "/dashboard/patient/prescriptions",
        permanent: true,
      },
      {
        source: "/lab-reports",
        destination: "/dashboard/patient/lab-reports",
        permanent: true,
      },
      {
        source: "/lab-reports/:path*",
        destination: "/dashboard/patient/lab-reports",
        permanent: true,
      },
      {
        source: "/favorite-doctors",
        destination: "/dashboard/patient/favorite-doctors",
        permanent: true,
      },
      {
        source: "/notifications",
        destination: "/dashboard/patient/notifications",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "/dashboard/patient/profile",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/dashboard/patient/settings",
        permanent: true,
      },
      {
        source: "/settings/security",
        destination: "/dashboard/patient/settings/security",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
