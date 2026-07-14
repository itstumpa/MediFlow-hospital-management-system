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

      
    ];
  },
};

export default nextConfig;
