// ============================================================
// Types & Mock Data — Roles & Permissions (RBAC)
// ============================================================

export type Permission =
  | "View"
  | "Create"
  | "Update"
  | "Delete"
  | "Export"
  | "Approve"
  | "Assign"
  | "Manage";

export type Module =
  | "Dashboard"
  | "Doctors"
  | "Patients"
  | "Departments"
  | "Appointments"
  | "Articles"
  | "Messages"
  | "Analytics"
  | "Settings";

export const ALL_MODULES: Module[] = [
  "Dashboard",
  "Doctors",
  "Patients",
  "Departments",
  "Appointments",
  "Articles",
  "Messages",
  "Analytics",
  "Settings",
];

export const ALL_PERMISSIONS: Permission[] = [
  "View",
  "Create",
  "Update",
  "Delete",
  "Export",
  "Approve",
  "Assign",
  "Manage",
];

/** Full permission map: Module -> Permission[] */
export type PermissionMap = Record<Module, Permission[]>;

export interface Role {
  id: string;
  name: string;
  description: string;
  isProtected: boolean;
  isCustom: boolean;
  userCount: number;
  permissions: PermissionMap;
  createdAt: string;
  updatedAt: string;
}

export interface RoleUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  department: string;
  status: "Active" | "Inactive";
  lastActive: string;
}

export interface RoleStats {
  totalRoles: number;
  totalUsers: number;
  customRoles: number;
  totalPermissions: number;
}

// ─── Helpers ────────────────────────────────────────────────

function allPermissions(): Permission[] {
  return [...ALL_PERMISSIONS];
}

function noPermissions(): Permission[] {
  return [];
}

function somePermissions(...perms: Permission[]): Permission[] {
  return perms;
}

function buildPermissionMap(
  overrides: Partial<Record<Module, Permission[]>>,
): PermissionMap {
  const map = {} as PermissionMap;
  for (const mod of ALL_MODULES) {
    map[mod] = overrides[mod] ?? [];
  }
  return map;
}

// ─── Mock Roles ─────────────────────────────────────────────

export const mockRoles: Role[] = [
  {
    id: "role-super-admin",
    name: "Super Admin",
    description:
      "Full unrestricted access to all modules and settings. Can manage other admins and configure system-wide settings.",
    isProtected: true,
    isCustom: false,
    userCount: 2,
    permissions: buildPermissionMap({
      Dashboard: allPermissions(),
      Doctors: allPermissions(),
      Patients: allPermissions(),
      Departments: allPermissions(),
      Appointments: allPermissions(),
      Articles: allPermissions(),
      Messages: allPermissions(),
      Analytics: allPermissions(),
      Settings: allPermissions(),
    }),
    createdAt: "2025-01-01",
    updatedAt: "2026-07-10",
  },
  {
    id: "role-admin",
    name: "Admin",
    description:
      "Extended administrative access. Can manage most modules and settings but cannot modify system-level configurations.",
    isProtected: true,
    isCustom: false,
    userCount: 5,
    permissions: buildPermissionMap({
      Dashboard: allPermissions(),
      Doctors: somePermissions("View", "Create", "Update", "Export"),
      Patients: somePermissions("View", "Create", "Update", "Export"),
      Departments: somePermissions(
        "View",
        "Create",
        "Update",
        "Delete",
        "Export",
        "Assign",
      ),
      Appointments: somePermissions(
        "View",
        "Create",
        "Update",
        "Delete",
        "Export",
        "Assign",
      ),
      Articles: somePermissions(
        "View",
        "Create",
        "Update",
        "Delete",
        "Approve",
      ),
      Messages: somePermissions("View", "Create", "Update", "Delete", "Assign"),
      Analytics: allPermissions(),
      Settings: somePermissions("View", "Update", "Manage"),
    }),
    createdAt: "2025-01-01",
    updatedAt: "2026-07-08",
  },
  {
    id: "role-doctor",
    name: "Doctor",
    description:
      "Clinical access focused on patient care. Can view and update patient records, manage appointments, and access medical analytics.",
    isProtected: true,
    isCustom: false,
    userCount: 48,
    permissions: buildPermissionMap({
      Dashboard: somePermissions("View"),
      Doctors: somePermissions("View"),
      Patients: somePermissions("View", "Create", "Update", "Export"),
      Departments: somePermissions("View"),
      Appointments: somePermissions("View", "Create", "Update", "Export"),
      Articles: somePermissions("View"),
      Messages: somePermissions("View", "Create", "Update"),
      Analytics: somePermissions("View", "Export"),
      Settings: noPermissions(),
    }),
    createdAt: "2025-01-15",
    updatedAt: "2026-07-05",
  },
  {
    id: "role-receptionist",
    name: "Receptionist",
    description:
      "Front-desk access for managing appointments, patient check-ins, and basic patient registration.",
    isProtected: true,
    isCustom: false,
    userCount: 12,
    permissions: buildPermissionMap({
      Dashboard: somePermissions("View"),
      Doctors: somePermissions("View"),
      Patients: somePermissions("View", "Create", "Update"),
      Departments: somePermissions("View"),
      Appointments: somePermissions("View", "Create", "Update", "Assign"),
      Articles: noPermissions(),
      Messages: somePermissions("View", "Create"),
      Analytics: noPermissions(),
      Settings: noPermissions(),
    }),
    createdAt: "2025-02-01",
    updatedAt: "2026-06-28",
  },
  {
    id: "role-nurse",
    name: "Nurse",
    description:
      "Clinical support access. Can view patient records, update vitals and care notes, and manage their appointment queue.",
    isProtected: true,
    isCustom: false,
    userCount: 36,
    permissions: buildPermissionMap({
      Dashboard: somePermissions("View"),
      Doctors: somePermissions("View"),
      Patients: somePermissions("View", "Create", "Update"),
      Departments: somePermissions("View"),
      Appointments: somePermissions("View", "Update"),
      Articles: noPermissions(),
      Messages: somePermissions("View", "Create"),
      Analytics: noPermissions(),
      Settings: noPermissions(),
    }),
    createdAt: "2025-02-15",
    updatedAt: "2026-07-01",
  },
  {
    id: "role-content-manager",
    name: "Content Manager",
    description:
      "Manages articles, blog posts, and public-facing content. Can moderate comments and manage content categories.",
    isProtected: true,
    isCustom: false,
    userCount: 4,
    permissions: buildPermissionMap({
      Dashboard: somePermissions("View"),
      Doctors: somePermissions("View"),
      Patients: noPermissions(),
      Departments: somePermissions("View"),
      Appointments: noPermissions(),
      Articles: somePermissions(
        "View",
        "Create",
        "Update",
        "Delete",
        "Approve",
      ),
      Messages: noPermissions(),
      Analytics: somePermissions("View", "Export"),
      Settings: noPermissions(),
    }),
    createdAt: "2025-03-01",
    updatedAt: "2026-06-20",
  },
  {
    id: "role-support-staff",
    name: "Support Staff",
    description:
      "Basic access for support personnel. Can view public information and manage support tickets through messages.",
    isProtected: true,
    isCustom: false,
    userCount: 8,
    permissions: buildPermissionMap({
      Dashboard: somePermissions("View"),
      Doctors: somePermissions("View"),
      Patients: somePermissions("View"),
      Departments: somePermissions("View"),
      Appointments: somePermissions("View"),
      Articles: somePermissions("View"),
      Messages: somePermissions("View", "Create", "Update"),
      Analytics: noPermissions(),
      Settings: noPermissions(),
    }),
    createdAt: "2025-04-01",
    updatedAt: "2026-06-15",
  },
];

// ─── Mock Users for Assignment ──────────────────────────────

export const mockRoleUsers: RoleUser[] = [
  {
    id: "USR-001",
    name: "Alex Thompson",
    email: "alex.thompson@mediflow.com",
    initials: "AT",
    role: "Super Admin",
    department: "Administration",
    status: "Active",
    lastActive: "2026-07-12",
  },
  {
    id: "USR-002",
    name: "Sarah Chen",
    email: "sarah.chen@mediflow.com",
    initials: "SC",
    role: "Super Admin",
    department: "Administration",
    status: "Active",
    lastActive: "2026-07-12",
  },
  {
    id: "USR-003",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@mediflow.com",
    initials: "MR",
    role: "Admin",
    department: "Administration",
    status: "Active",
    lastActive: "2026-07-11",
  },
  {
    id: "USR-004",
    name: "Emily Watson",
    email: "emily.watson@mediflow.com",
    initials: "EW",
    role: "Admin",
    department: "Human Resources",
    status: "Active",
    lastActive: "2026-07-10",
  },
  {
    id: "USR-005",
    name: "James Park",
    email: "james.park@mediflow.com",
    initials: "JP",
    role: "Admin",
    department: "Finance",
    status: "Active",
    lastActive: "2026-07-12",
  },
  {
    id: "USR-006",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@mediflow.com",
    initials: "SJ",
    role: "Doctor",
    department: "Cardiology",
    status: "Active",
    lastActive: "2026-07-12",
  },
  {
    id: "USR-007",
    name: "Dr. James Mitchell",
    email: "james.mitchell@mediflow.com",
    initials: "JM",
    role: "Doctor",
    department: "Neurology",
    status: "Active",
    lastActive: "2026-07-11",
  },
  {
    id: "USR-008",
    name: "Dr. Ayesha Khan",
    email: "ayesha.khan@mediflow.com",
    initials: "AK",
    role: "Doctor",
    department: "Pediatrics",
    status: "Active",
    lastActive: "2026-07-12",
  },
  {
    id: "USR-009",
    name: "Maria Santos",
    email: "maria.santos@mediflow.com",
    initials: "MS",
    role: "Receptionist",
    department: "Front Desk",
    status: "Active",
    lastActive: "2026-07-12",
  },
  {
    id: "USR-010",
    name: "John Baker",
    email: "john.baker@mediflow.com",
    initials: "JB",
    role: "Receptionist",
    department: "Front Desk",
    status: "Active",
    lastActive: "2026-07-10",
  },
  {
    id: "USR-011",
    name: "Lisa Wong",
    email: "lisa.wong@mediflow.com",
    initials: "LW",
    role: "Nurse",
    department: "Cardiology",
    status: "Active",
    lastActive: "2026-07-12",
  },
  {
    id: "USR-012",
    name: "Robert Kim",
    email: "robert.kim@mediflow.com",
    initials: "RK",
    role: "Nurse",
    department: "Emergency",
    status: "Inactive",
    lastActive: "2026-06-28",
  },
  {
    id: "USR-013",
    name: "Amanda Foster",
    email: "amanda.foster@mediflow.com",
    initials: "AF",
    role: "Content Manager",
    department: "Marketing",
    status: "Active",
    lastActive: "2026-07-09",
  },
  {
    id: "USR-014",
    name: "David Chen",
    email: "david.chen@mediflow.com",
    initials: "DC",
    role: "Content Manager",
    department: "Marketing",
    status: "Active",
    lastActive: "2026-07-08",
  },
  {
    id: "USR-015",
    name: "Priya Sharma",
    email: "priya.sharma@mediflow.com",
    initials: "PS",
    role: "Support Staff",
    department: "Customer Support",
    status: "Active",
    lastActive: "2026-07-11",
  },
  {
    id: "USR-016",
    name: "Tom Wilson",
    email: "tom.wilson@mediflow.com",
    initials: "TW",
    role: "Support Staff",
    department: "Customer Support",
    status: "Active",
    lastActive: "2026-07-10",
  },
  {
    id: "USR-017",
    name: "Admin User",
    email: "admin.user@mediflow.com",
    initials: "AU",
    role: "Admin",
    department: "IT",
    status: "Active",
    lastActive: "2026-07-12",
  },
  {
    id: "USR-018",
    name: "Nurse Taylor",
    email: "nurse.taylor@mediflow.com",
    initials: "NT",
    role: "Nurse",
    department: "Pediatrics",
    status: "Active",
    lastActive: "2026-07-11",
  },
];

// ─── Derived Stats ──────────────────────────────────────────

export function computeRoleStats(roles: Role[]): RoleStats {
  const totalRoles = roles.length;
  const totalUsers = roles.reduce((sum, r) => sum + r.userCount, 0);
  const customRoles = roles.filter((r) => r.isCustom).length;
  const totalPermissions = roles.reduce((sum, r) => {
    let count = 0;
    for (const mod of ALL_MODULES) {
      count += r.permissions[mod]?.length ?? 0;
    }
    return sum + count;
  }, 0);
  return { totalRoles, totalUsers, customRoles, totalPermissions };
}

export const defaultRoleStats = computeRoleStats(mockRoles);

// ─── Module Display Config ──────────────────────────────────

export const moduleDisplayConfig: Record<
  Module,
  { label: string; color: string; bgColor: string }
> = {
  Dashboard: {
    label: "Dashboard",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  Doctors: {
    label: "Doctors",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  Patients: {
    label: "Patients",
    color: "text-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
  },
  Departments: {
    label: "Departments",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
  },
  Appointments: {
    label: "Appointments",
    color: "text-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
  },
  Articles: {
    label: "Articles",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  Messages: {
    label: "Messages",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  Analytics: {
    label: "Analytics",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  Settings: {
    label: "Settings",
    color: "text-slate-600",
    bgColor: "bg-slate-50 dark:bg-slate-900/20",
  },
};

// ─── Utility Functions ──────────────────────────────────────

export function getAssignedUsers(roleName: string): RoleUser[] {
  return mockRoleUsers.filter((u) => u.role === roleName);
}

export function getPermissionCount(permissions: PermissionMap): number {
  let count = 0;
  for (const mod of ALL_MODULES) {
    count += permissions[mod]?.length ?? 0;
  }
  return count;
}

export function getRoleById(id: string): Role | undefined {
  return mockRoles.find((r) => r.id === id);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
