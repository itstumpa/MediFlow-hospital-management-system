// ============================================================
// Types & Mock Data — Roles & Permissions (RBAC)
// ============================================================

export type PermissionAction =
  | "view"
  | "create"
  | "update"
  | "delete"
  | "export"
  | "approve"
  | "assign"
  | "manage";

export type PermissionModule =
  | "dashboard"
  | "doctors"
  | "patients"
  | "departments"
  | "appointments"
  | "articles"
  | "messages"
  | "analytics"
  | "settings";

export type RoleType = "system" | "custom";

export interface Permission {
  module: PermissionModule;
  action: PermissionAction;
  enabled: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  type: RoleType;
  permissions: Permission[];
  userCount: number;
  createdAt: string;
  updatedAt: string;
  protected?: boolean; // System roles cannot be deleted
}

export interface RoleStats {
  totalRoles: number;
  usersAssigned: number;
  customRoles: number;
  totalPermissions: number;
}

export interface RoleFilters {
  search: string;
  type: RoleType | "all";
  permission: PermissionAction | "all";
  userCountRange: [number, number];
  sortBy: "name" | "users" | "permissions" | "created" | "updated";
  sortAsc: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastActive: string;
}

export const DEFAULT_ROLE_FILTERS: RoleFilters = {
  search: "",
  type: "all",
  permission: "all",
  userCountRange: [0, 1000],
  sortBy: "name",
  sortAsc: true,
};

// ─── Permission Modules & Actions ───

export const PERMISSION_MODULES: {
  key: PermissionModule;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    description: "Overview, metrics, and system health",
    icon: "LayoutDashboard",
  },
  {
    key: "doctors",
    label: "Doctors",
    description: "Doctor profiles, schedules, and management",
    icon: "Stethoscope",
  },
  {
    key: "patients",
    label: "Patients",
    description: "Patient records, history, and intake",
    icon: "Users",
  },
  {
    key: "departments",
    label: "Departments",
    description: "Department structure and configuration",
    icon: "Building2",
  },
  {
    key: "appointments",
    label: "Appointments",
    description: "Scheduling, calendar, and booking management",
    icon: "CalendarCheck",
  },
  {
    key: "articles",
    label: "Articles",
    description: "CMS content, categories, and publishing",
    icon: "FileText",
  },
  {
    key: "messages",
    label: "Messages",
    description: "Internal messaging and notifications",
    icon: "MessageSquare",
  },
  {
    key: "analytics",
    label: "Analytics",
    description: "Reports, insights, and data exports",
    icon: "BarChart3",
  },
  {
    key: "settings",
    label: "Settings",
    description: "System configuration and administration",
    icon: "Settings",
  },
];

export const PERMISSION_ACTIONS: {
  key: PermissionAction;
  label: string;
  description: string;
}[] = [
  { key: "view", label: "View", description: "Read access to resources" },
  { key: "create", label: "Create", description: "Create new resources" },
  { key: "update", label: "Update", description: "Modify existing resources" },
  { key: "delete", label: "Delete", description: "Remove resources" },
  { key: "export", label: "Export", description: "Export data and reports" },
  { key: "approve", label: "Approve", description: "Approve/reject workflows" },
  { key: "assign", label: "Assign", description: "Assign resources to users" },
  {
    key: "manage",
    label: "Manage",
    description: "Full administrative control",
  },
];

// ─── Default Permissions Matrix ───

export function createDefaultPermissions(): Permission[] {
  const permissions: Permission[] = [];
  for (const module of PERMISSION_MODULES) {
    for (const action of PERMISSION_ACTIONS) {
      permissions.push({
        module: module.key,
        action: action.key,
        enabled: false,
      });
    }
  }
  return permissions;
}

export function createFullPermissions(): Permission[] {
  const permissions: Permission[] = [];
  for (const module of PERMISSION_MODULES) {
    for (const action of PERMISSION_ACTIONS) {
      permissions.push({
        module: module.key,
        action: action.key,
        enabled: true,
      });
    }
  }
  return permissions;
}

// ─── Mock Users ───

export const mockUsers: User[] = [
  {
    id: "usr-001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    role: "Doctor",
    status: "active",
    lastActive: "2026-07-12T10:30:00",
  },
  {
    id: "usr-002",
    name: "Michael Chen",
    email: "michael.chen@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "Admin",
    status: "active",
    lastActive: "2026-07-12T09:15:00",
  },
  {
    id: "usr-003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    role: "Receptionist",
    status: "active",
    lastActive: "2026-07-12T08:45:00",
  },
  {
    id: "usr-004",
    name: "Dr. James Wilson",
    email: "james.wilson@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    role: "Doctor",
    status: "active",
    lastActive: "2026-07-11T16:20:00",
  },
  {
    id: "usr-005",
    name: "Lisa Thompson",
    email: "lisa.thompson@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    role: "Nurse",
    status: "active",
    lastActive: "2026-07-12T07:30:00",
  },
  {
    id: "usr-006",
    name: "David Park",
    email: "david.park@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "Content Manager",
    status: "active",
    lastActive: "2026-07-11T14:00:00",
  },
  {
    id: "usr-007",
    name: "Maria Santos",
    email: "maria.santos@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    role: "Support Staff",
    status: "inactive",
    lastActive: "2026-07-05T10:00:00",
  },
  {
    id: "usr-008",
    name: "Robert Kim",
    email: "robert.kim@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    role: "Super Admin",
    status: "active",
    lastActive: "2026-07-12T06:00:00",
  },
  {
    id: "usr-009",
    name: "Jennifer Adams",
    email: "jennifer.adams@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1598550874171-9a07c7a5a3f2?w=100&h=100&fit=crop&crop=face",
    role: "Doctor",
    status: "pending",
    lastActive: "2026-07-10T12:00:00",
  },
  {
    id: "usr-010",
    name: "Thomas Brown",
    email: "thomas.brown@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    role: "Receptionist",
    status: "active",
    lastActive: "2026-07-12T08:00:00",
  },
];

// ─── Mock Roles ───

export const mockRoles: Role[] = [
  {
    id: "role-super-admin",
    name: "Super Admin",
    description:
      "Full system access with all permissions. Can manage users, roles, and system configuration.",
    type: "system",
    permissions: createFullPermissions(),
    userCount: 2,
    createdAt: "2025-01-15T10:00:00",
    updatedAt: "2026-01-15T10:00:00",
    protected: true,
  },
  {
    id: "role-admin",
    name: "Admin",
    description:
      "Administrative access to most modules. Can manage users, content, and operations but cannot modify system settings.",
    type: "system",
    permissions: PERMISSION_MODULES.flatMap((module) =>
      PERMISSION_ACTIONS.map((action) => ({
        module: module.key,
        action: action.key,
        enabled:
          !["settings"].includes(module.key) ||
          !["manage"].includes(action.key),
      })),
    ),
    userCount: 5,
    createdAt: "2025-01-15T10:00:00",
    updatedAt: "2026-02-20T14:30:00",
    protected: true,
  },
  {
    id: "role-doctor",
    name: "Doctor",
    description:
      "Clinical access for patient care. Can view and update patient records, manage appointments, and access clinical modules.",
    type: "system",
    permissions: [
      { module: "dashboard", action: "view", enabled: true },
      { module: "dashboard", action: "create", enabled: false },
      { module: "dashboard", action: "update", enabled: false },
      { module: "dashboard", action: "delete", enabled: false },
      { module: "dashboard", action: "export", enabled: false },
      { module: "dashboard", action: "approve", enabled: false },
      { module: "dashboard", action: "assign", enabled: false },
      { module: "dashboard", action: "manage", enabled: false },

      { module: "doctors", action: "view", enabled: true },
      { module: "doctors", action: "create", enabled: false },
      { module: "doctors", action: "update", enabled: true },
      { module: "doctors", action: "delete", enabled: false },
      { module: "doctors", action: "export", enabled: false },
      { module: "doctors", action: "approve", enabled: false },
      { module: "doctors", action: "assign", enabled: false },
      { module: "doctors", action: "manage", enabled: false },

      { module: "patients", action: "view", enabled: true },
      { module: "patients", action: "create", enabled: true },
      { module: "patients", action: "update", enabled: true },
      { module: "patients", action: "delete", enabled: false },
      { module: "patients", action: "export", enabled: true },
      { module: "patients", action: "approve", enabled: false },
      { module: "patients", action: "assign", enabled: true },
      { module: "patients", action: "manage", enabled: false },

      { module: "departments", action: "view", enabled: true },
      { module: "departments", action: "create", enabled: false },
      { module: "departments", action: "update", enabled: false },
      { module: "departments", action: "delete", enabled: false },
      { module: "departments", action: "export", enabled: false },
      { module: "departments", action: "approve", enabled: false },
      { module: "departments", action: "assign", enabled: false },
      { module: "departments", action: "manage", enabled: false },

      { module: "appointments", action: "view", enabled: true },
      { module: "appointments", action: "create", enabled: true },
      { module: "appointments", action: "update", enabled: true },
      { module: "appointments", action: "delete", enabled: false },
      { module: "appointments", action: "export", enabled: true },
      { module: "appointments", action: "approve", enabled: true },
      { module: "appointments", action: "assign", enabled: true },
      { module: "appointments", action: "manage", enabled: false },

      { module: "articles", action: "view", enabled: true },
      { module: "articles", action: "create", enabled: true },
      { module: "articles", action: "update", enabled: true },
      { module: "articles", action: "delete", enabled: false },
      { module: "articles", action: "export", enabled: false },
      { module: "articles", action: "approve", enabled: false },
      { module: "articles", action: "assign", enabled: false },
      { module: "articles", action: "manage", enabled: false },

      { module: "messages", action: "view", enabled: true },
      { module: "messages", action: "create", enabled: true },
      { module: "messages", action: "update", enabled: false },
      { module: "messages", action: "delete", enabled: false },
      { module: "messages", action: "export", enabled: false },
      { module: "messages", action: "approve", enabled: false },
      { module: "messages", action: "assign", enabled: false },
      { module: "messages", action: "manage", enabled: false },

      { module: "analytics", action: "view", enabled: true },
      { module: "analytics", action: "create", enabled: false },
      { module: "analytics", action: "update", enabled: false },
      { module: "analytics", action: "delete", enabled: false },
      { module: "analytics", action: "export", enabled: true },
      { module: "analytics", action: "approve", enabled: false },
      { module: "analytics", action: "assign", enabled: false },
      { module: "analytics", action: "manage", enabled: false },

      { module: "settings", action: "view", enabled: false },
      { module: "settings", action: "create", enabled: false },
      { module: "settings", action: "update", enabled: false },
      { module: "settings", action: "delete", enabled: false },
      { module: "settings", action: "export", enabled: false },
      { module: "settings", action: "approve", enabled: false },
      { module: "settings", action: "assign", enabled: false },
      { module: "settings", action: "manage", enabled: false },
    ],
    userCount: 12,
    createdAt: "2025-01-15T10:00:00",
    updatedAt: "2026-03-10T09:15:00",
    protected: true,
  },
  {
    id: "role-receptionist",
    name: "Receptionist",
    description:
      "Front desk operations. Can manage appointments, patient check-ins, and basic patient information.",
    type: "system",
    permissions: [
      { module: "dashboard", action: "view", enabled: true },
      { module: "dashboard", action: "create", enabled: false },
      { module: "dashboard", action: "update", enabled: false },
      { module: "dashboard", action: "delete", enabled: false },
      { module: "dashboard", action: "export", enabled: false },
      { module: "dashboard", action: "approve", enabled: false },
      { module: "dashboard", action: "assign", enabled: false },
      { module: "dashboard", action: "manage", enabled: false },

      { module: "doctors", action: "view", enabled: true },
      { module: "doctors", action: "create", enabled: false },
      { module: "doctors", action: "update", enabled: false },
      { module: "doctors", action: "delete", enabled: false },
      { module: "doctors", action: "export", enabled: false },
      { module: "doctors", action: "approve", enabled: false },
      { module: "doctors", action: "assign", enabled: false },
      { module: "doctors", action: "manage", enabled: false },

      { module: "patients", action: "view", enabled: true },
      { module: "patients", action: "create", enabled: true },
      { module: "patients", action: "update", enabled: true },
      { module: "patients", action: "delete", enabled: false },
      { module: "patients", action: "export", enabled: false },
      { module: "patients", action: "approve", enabled: false },
      { module: "patients", action: "assign", enabled: false },
      { module: "patients", action: "manage", enabled: false },

      { module: "departments", action: "view", enabled: true },
      { module: "departments", action: "create", enabled: false },
      { module: "departments", action: "update", enabled: false },
      { module: "departments", action: "delete", enabled: false },
      { module: "departments", action: "export", enabled: false },
      { module: "departments", action: "approve", enabled: false },
      { module: "departments", action: "assign", enabled: false },
      { module: "departments", action: "manage", enabled: false },

      { module: "appointments", action: "view", enabled: true },
      { module: "appointments", action: "create", enabled: true },
      { module: "appointments", action: "update", enabled: true },
      { module: "appointments", action: "delete", enabled: false },
      { module: "appointments", action: "export", enabled: true },
      { module: "appointments", action: "approve", enabled: true },
      { module: "appointments", action: "assign", enabled: true },
      { module: "appointments", action: "manage", enabled: false },

      { module: "articles", action: "view", enabled: true },
      { module: "articles", action: "create", enabled: false },
      { module: "articles", action: "update", enabled: false },
      { module: "articles", action: "delete", enabled: false },
      { module: "articles", action: "export", enabled: false },
      { module: "articles", action: "approve", enabled: false },
      { module: "articles", action: "assign", enabled: false },
      { module: "articles", action: "manage", enabled: false },

      { module: "messages", action: "view", enabled: true },
      { module: "messages", action: "create", enabled: true },
      { module: "messages", action: "update", enabled: false },
      { module: "messages", action: "delete", enabled: false },
      { module: "messages", action: "export", enabled: false },
      { module: "messages", action: "approve", enabled: false },
      { module: "messages", action: "assign", enabled: false },
      { module: "messages", action: "manage", enabled: false },

      { module: "analytics", action: "view", enabled: false },
      { module: "analytics", action: "create", enabled: false },
      { module: "analytics", action: "update", enabled: false },
      { module: "analytics", action: "delete", enabled: false },
      { module: "analytics", action: "export", enabled: false },
      { module: "analytics", action: "approve", enabled: false },
      { module: "analytics", action: "assign", enabled: false },
      { module: "analytics", action: "manage", enabled: false },

      { module: "settings", action: "view", enabled: false },
      { module: "settings", action: "create", enabled: false },
      { module: "settings", action: "update", enabled: false },
      { module: "settings", action: "delete", enabled: false },
      { module: "settings", action: "export", enabled: false },
      { module: "settings", action: "approve", enabled: false },
      { module: "settings", action: "assign", enabled: false },
      { module: "settings", action: "manage", enabled: false },
    ],
    userCount: 8,
    createdAt: "2025-01-15T10:00:00",
    updatedAt: "2026-01-20T11:00:00",
    protected: true,
  },
  {
    id: "role-nurse",
    name: "Nurse",
    description:
      "Clinical support role. Can view and update patient records, manage appointments, and assist with clinical workflows.",
    type: "system",
    permissions: [
      { module: "dashboard", action: "view", enabled: true },
      { module: "dashboard", action: "create", enabled: false },
      { module: "dashboard", action: "update", enabled: false },
      { module: "dashboard", action: "delete", enabled: false },
      { module: "dashboard", action: "export", enabled: false },
      { module: "dashboard", action: "approve", enabled: false },
      { module: "dashboard", action: "assign", enabled: false },
      { module: "dashboard", action: "manage", enabled: false },

      { module: "doctors", action: "view", enabled: true },
      { module: "doctors", action: "create", enabled: false },
      { module: "doctors", action: "update", enabled: false },
      { module: "doctors", action: "delete", enabled: false },
      { module: "doctors", action: "export", enabled: false },
      { module: "doctors", action: "approve", enabled: false },
      { module: "doctors", action: "assign", enabled: false },
      { module: "doctors", action: "manage", enabled: false },

      { module: "patients", action: "view", enabled: true },
      { module: "patients", action: "create", enabled: true },
      { module: "patients", action: "update", enabled: true },
      { module: "patients", action: "delete", enabled: false },
      { module: "patients", action: "export", enabled: true },
      { module: "patients", action: "approve", enabled: false },
      { module: "patients", action: "assign", enabled: true },
      { module: "patients", action: "manage", enabled: false },

      { module: "departments", action: "view", enabled: true },
      { module: "departments", action: "create", enabled: false },
      { module: "departments", action: "update", enabled: false },
      { module: "departments", action: "delete", enabled: false },
      { module: "departments", action: "export", enabled: false },
      { module: "departments", action: "approve", enabled: false },
      { module: "departments", action: "assign", enabled: false },
      { module: "departments", action: "manage", enabled: false },

      { module: "appointments", action: "view", enabled: true },
      { module: "appointments", action: "create", enabled: true },
      { module: "appointments", action: "update", enabled: true },
      { module: "appointments", action: "delete", enabled: false },
      { module: "appointments", action: "export", enabled: true },
      { module: "appointments", action: "approve", enabled: false },
      { module: "appointments", action: "assign", enabled: true },
      { module: "appointments", action: "manage", enabled: false },

      { module: "articles", action: "view", enabled: true },
      { module: "articles", action: "create", enabled: false },
      { module: "articles", action: "update", enabled: false },
      { module: "articles", action: "delete", enabled: false },
      { module: "articles", action: "export", enabled: false },
      { module: "articles", action: "approve", enabled: false },
      { module: "articles", action: "assign", enabled: false },
      { module: "articles", action: "manage", enabled: false },

      { module: "messages", action: "view", enabled: true },
      { module: "messages", action: "create", enabled: true },
      { module: "messages", action: "update", enabled: false },
      { module: "messages", action: "delete", enabled: false },
      { module: "messages", action: "export", enabled: false },
      { module: "messages", action: "approve", enabled: false },
      { module: "messages", action: "assign", enabled: false },
      { module: "messages", action: "manage", enabled: false },

      { module: "analytics", action: "view", enabled: false },
      { module: "analytics", action: "create", enabled: false },
      { module: "analytics", action: "update", enabled: false },
      { module: "analytics", action: "delete", enabled: false },
      { module: "analytics", action: "export", enabled: false },
      { module: "analytics", action: "approve", enabled: false },
      { module: "analytics", action: "assign", enabled: false },
      { module: "analytics", action: "manage", enabled: false },

      { module: "settings", action: "view", enabled: false },
      { module: "settings", action: "create", enabled: false },
      { module: "settings", action: "update", enabled: false },
      { module: "settings", action: "delete", enabled: false },
      { module: "settings", action: "export", enabled: false },
      { module: "settings", action: "approve", enabled: false },
      { module: "settings", action: "assign", enabled: false },
      { module: "settings", action: "manage", enabled: false },
    ],
    userCount: 15,
    createdAt: "2025-01-15T10:00:00",
    updatedAt: "2026-02-15T10:00:00",
    protected: true,
  },
  {
    id: "role-content-manager",
    name: "Content Manager",
    description:
      "Manages articles, categories, and CMS content. Can create, edit, and publish content across the platform.",
    type: "system",
    permissions: [
      { module: "dashboard", action: "view", enabled: true },
      { module: "dashboard", action: "create", enabled: false },
      { module: "dashboard", action: "update", enabled: false },
      { module: "dashboard", action: "delete", enabled: false },
      { module: "dashboard", action: "export", enabled: false },
      { module: "dashboard", action: "approve", enabled: false },
      { module: "dashboard", action: "assign", enabled: false },
      { module: "dashboard", action: "manage", enabled: false },

      { module: "doctors", action: "view", enabled: true },
      { module: "doctors", action: "create", enabled: false },
      { module: "doctors", action: "update", enabled: false },
      { module: "doctors", action: "delete", enabled: false },
      { module: "doctors", action: "export", enabled: false },
      { module: "doctors", action: "approve", enabled: false },
      { module: "doctors", action: "assign", enabled: false },
      { module: "doctors", action: "manage", enabled: false },

      { module: "patients", action: "view", enabled: true },
      { module: "patients", action: "create", enabled: false },
      { module: "patients", action: "update", enabled: false },
      { module: "patients", action: "delete", enabled: false },
      { module: "patients", action: "export", enabled: false },
      { module: "patients", action: "approve", enabled: false },
      { module: "patients", action: "assign", enabled: false },
      { module: "patients", action: "manage", enabled: false },

      { module: "departments", action: "view", enabled: true },
      { module: "departments", action: "create", enabled: false },
      { module: "departments", action: "update", enabled: false },
      { module: "departments", action: "delete", enabled: false },
      { module: "departments", action: "export", enabled: false },
      { module: "departments", action: "approve", enabled: false },
      { module: "departments", action: "assign", enabled: false },
      { module: "departments", action: "manage", enabled: false },

      { module: "appointments", action: "view", enabled: true },
      { module: "appointments", action: "create", enabled: false },
      { module: "appointments", action: "update", enabled: false },
      { module: "appointments", action: "delete", enabled: false },
      { module: "appointments", action: "export", enabled: false },
      { module: "appointments", action: "approve", enabled: false },
      { module: "appointments", action: "assign", enabled: false },
      { module: "appointments", action: "manage", enabled: false },

      { module: "articles", action: "view", enabled: true },
      { module: "articles", action: "create", enabled: true },
      { module: "articles", action: "update", enabled: true },
      { module: "articles", action: "delete", enabled: true },
      { module: "articles", action: "export", enabled: true },
      { module: "articles", action: "approve", enabled: true },
      { module: "articles", action: "assign", enabled: true },
      { module: "articles", action: "manage", enabled: true },

      { module: "messages", action: "view", enabled: true },
      { module: "messages", action: "create", enabled: true },
      { module: "messages", action: "update", enabled: false },
      { module: "messages", action: "delete", enabled: false },
      { module: "messages", action: "export", enabled: false },
      { module: "messages", action: "approve", enabled: false },
      { module: "messages", action: "assign", enabled: false },
      { module: "messages", action: "manage", enabled: false },

      { module: "analytics", action: "view", enabled: true },
      { module: "analytics", action: "create", enabled: false },
      { module: "analytics", action: "update", enabled: false },
      { module: "analytics", action: "delete", enabled: false },
      { module: "analytics", action: "export", enabled: true },
      { module: "analytics", action: "approve", enabled: false },
      { module: "analytics", action: "assign", enabled: false },
      { module: "analytics", action: "manage", enabled: false },

      { module: "settings", action: "view", enabled: false },
      { module: "settings", action: "create", enabled: false },
      { module: "settings", action: "update", enabled: false },
      { module: "settings", action: "delete", enabled: false },
      { module: "settings", action: "export", enabled: false },
      { module: "settings", action: "approve", enabled: false },
      { module: "settings", action: "assign", enabled: false },
      { module: "settings", action: "manage", enabled: false },
    ],
    userCount: 3,
    createdAt: "2025-01-15T10:00:00",
    updatedAt: "2026-03-01T12:00:00",
    protected: true,
  },
  {
    id: "role-support-staff",
    name: "Support Staff",
    description:
      "General support operations. Limited view access to most modules for customer service and assistance.",
    type: "system",
    permissions: [
      { module: "dashboard", action: "view", enabled: true },
      { module: "dashboard", action: "create", enabled: false },
      { module: "dashboard", action: "update", enabled: false },
      { module: "dashboard", action: "delete", enabled: false },
      { module: "dashboard", action: "export", enabled: false },
      { module: "dashboard", action: "approve", enabled: false },
      { module: "dashboard", action: "assign", enabled: false },
      { module: "dashboard", action: "manage", enabled: false },

      { module: "doctors", action: "view", enabled: true },
      { module: "doctors", action: "create", enabled: false },
      { module: "doctors", action: "update", enabled: false },
      { module: "doctors", action: "delete", enabled: false },
      { module: "doctors", action: "export", enabled: false },
      { module: "doctors", action: "approve", enabled: false },
      { module: "doctors", action: "assign", enabled: false },
      { module: "doctors", action: "manage", enabled: false },

      { module: "patients", action: "view", enabled: true },
      { module: "patients", action: "create", enabled: false },
      { module: "patients", action: "update", enabled: false },
      { module: "patients", action: "delete", enabled: false },
      { module: "patients", action: "export", enabled: false },
      { module: "patients", action: "approve", enabled: false },
      { module: "patients", action: "assign", enabled: false },
      { module: "patients", action: "manage", enabled: false },

      { module: "departments", action: "view", enabled: true },
      { module: "departments", action: "create", enabled: false },
      { module: "departments", action: "update", enabled: false },
      { module: "departments", action: "delete", enabled: false },
      { module: "departments", action: "export", enabled: false },
      { module: "departments", action: "approve", enabled: false },
      { module: "departments", action: "assign", enabled: false },
      { module: "departments", action: "manage", enabled: false },

      { module: "appointments", action: "view", enabled: true },
      { module: "appointments", action: "create", enabled: false },
      { module: "appointments", action: "update", enabled: false },
      { module: "appointments", action: "delete", enabled: false },
      { module: "appointments", action: "export", enabled: false },
      { module: "appointments", action: "approve", enabled: false },
      { module: "appointments", action: "assign", enabled: false },
      { module: "appointments", action: "manage", enabled: false },

      { module: "articles", action: "view", enabled: true },
      { module: "articles", action: "create", enabled: false },
      { module: "articles", action: "update", enabled: false },
      { module: "articles", action: "delete", enabled: false },
      { module: "articles", action: "export", enabled: false },
      { module: "articles", action: "approve", enabled: false },
      { module: "articles", action: "assign", enabled: false },
      { module: "articles", action: "manage", enabled: false },

      { module: "messages", action: "view", enabled: true },
      { module: "messages", action: "create", enabled: true },
      { module: "messages", action: "update", enabled: false },
      { module: "messages", action: "delete", enabled: false },
      { module: "messages", action: "export", enabled: false },
      { module: "messages", action: "approve", enabled: false },
      { module: "messages", action: "assign", enabled: false },
      { module: "messages", action: "manage", enabled: false },

      { module: "analytics", action: "view", enabled: false },
      { module: "analytics", action: "create", enabled: false },
      { module: "analytics", action: "update", enabled: false },
      { module: "analytics", action: "delete", enabled: false },
      { module: "analytics", action: "export", enabled: false },
      { module: "analytics", action: "approve", enabled: false },
      { module: "analytics", action: "assign", enabled: false },
      { module: "analytics", action: "manage", enabled: false },

      { module: "settings", action: "view", enabled: false },
      { module: "settings", action: "create", enabled: false },
      { module: "settings", action: "update", enabled: false },
      { module: "settings", action: "delete", enabled: false },
      { module: "settings", action: "export", enabled: false },
      { module: "settings", action: "approve", enabled: false },
      { module: "settings", action: "assign", enabled: false },
      { module: "settings", action: "manage", enabled: false },
    ],
    userCount: 6,
    createdAt: "2025-01-15T10:00:00",
    updatedAt: "2026-01-25T15:00:00",
    protected: true,
  },
  {
    id: "role-custom-1",
    name: "Clinical Coordinator",
    description:
      "Coordinates between doctors, nurses, and departments. Manages schedules and patient flow.",
    type: "custom",
    permissions: [
      { module: "dashboard", action: "view", enabled: true },
      { module: "dashboard", action: "create", enabled: false },
      { module: "dashboard", action: "update", enabled: false },
      { module: "dashboard", action: "delete", enabled: false },
      { module: "dashboard", action: "export", enabled: true },
      { module: "dashboard", action: "approve", enabled: false },
      { module: "dashboard", action: "assign", enabled: true },
      { module: "dashboard", action: "manage", enabled: false },

      { module: "doctors", action: "view", enabled: true },
      { module: "doctors", action: "create", enabled: false },
      { module: "doctors", action: "update", enabled: true },
      { module: "doctors", action: "delete", enabled: false },
      { module: "doctors", action: "export", enabled: true },
      { module: "doctors", action: "approve", enabled: false },
      { module: "doctors", action: "assign", enabled: true },
      { module: "doctors", action: "manage", enabled: false },

      { module: "patients", action: "view", enabled: true },
      { module: "patients", action: "create", enabled: true },
      { module: "patients", action: "update", enabled: true },
      { module: "patients", action: "delete", enabled: false },
      { module: "patients", action: "export", enabled: true },
      { module: "patients", action: "approve", enabled: false },
      { module: "patients", action: "assign", enabled: true },
      { module: "patients", action: "manage", enabled: false },

      { module: "departments", action: "view", enabled: true },
      { module: "departments", action: "create", enabled: false },
      { module: "departments", action: "update", enabled: false },
      { module: "departments", action: "delete", enabled: false },
      { module: "departments", action: "export", enabled: false },
      { module: "departments", action: "approve", enabled: false },
      { module: "departments", action: "assign", enabled: false },
      { module: "departments", action: "manage", enabled: false },

      { module: "appointments", action: "view", enabled: true },
      { module: "appointments", action: "create", enabled: true },
      { module: "appointments", action: "update", enabled: true },
      { module: "appointments", action: "delete", enabled: false },
      { module: "appointments", action: "export", enabled: true },
      { module: "appointments", action: "approve", enabled: true },
      { module: "appointments", action: "assign", enabled: true },
      { module: "appointments", action: "manage", enabled: false },

      { module: "articles", action: "view", enabled: true },
      { module: "articles", action: "create", enabled: false },
      { module: "articles", action: "update", enabled: false },
      { module: "articles", action: "delete", enabled: false },
      { module: "articles", action: "export", enabled: false },
      { module: "articles", action: "approve", enabled: false },
      { module: "articles", action: "assign", enabled: false },
      { module: "articles", action: "manage", enabled: false },

      { module: "messages", action: "view", enabled: true },
      { module: "messages", action: "create", enabled: true },
      { module: "messages", action: "update", enabled: true },
      { module: "messages", action: "delete", enabled: false },
      { module: "messages", action: "export", enabled: false },
      { module: "messages", action: "approve", enabled: false },
      { module: "messages", action: "assign", enabled: false },
      { module: "messages", action: "manage", enabled: false },

      { module: "analytics", action: "view", enabled: true },
      { module: "analytics", action: "create", enabled: false },
      { module: "analytics", action: "update", enabled: false },
      { module: "analytics", action: "delete", enabled: false },
      { module: "analytics", action: "export", enabled: true },
      { module: "analytics", action: "approve", enabled: false },
      { module: "analytics", action: "assign", enabled: false },
      { module: "analytics", action: "manage", enabled: false },

      { module: "settings", action: "view", enabled: false },
      { module: "settings", action: "create", enabled: false },
      { module: "settings", action: "update", enabled: false },
      { module: "settings", action: "delete", enabled: false },
      { module: "settings", action: "export", enabled: false },
      { module: "settings", action: "approve", enabled: false },
      { module: "settings", action: "assign", enabled: false },
      { module: "settings", action: "manage", enabled: false },
    ],
    userCount: 4,
    createdAt: "2026-02-10T14:00:00",
    updatedAt: "2026-03-15T10:30:00",
    protected: false,
  },
];

// ─── Helper Functions ───

export function calculateStats(roles: Role[]): RoleStats {
  const totalRoles = roles.length;
  const usersAssigned = roles.reduce((sum, r) => sum + r.userCount, 0);
  const customRoles = roles.filter((r) => r.type === "custom").length;
  const totalPermissions = roles.reduce((sum, r) => {
    return sum + r.permissions.filter((p) => p.enabled).length;
  }, 0);
  return { totalRoles, usersAssigned, customRoles, totalPermissions };
}

export function filterRoles(roles: Role[], filters: RoleFilters): Role[] {
  let result = [...roles];

  // Search filter
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q),
    );
  }

  // Type filter
  if (filters.type !== "all") {
    result = result.filter((r) => r.type === filters.type);
  }

  // Permission filter - check if role has any permission with this action enabled
  if (filters.permission !== "all") {
    result = result.filter((r) =>
      r.permissions.some((p) => p.action === filters.permission && p.enabled),
    );
  }

  // User count range
  result = result.filter(
    (r) =>
      r.userCount >= filters.userCountRange[0] &&
      r.userCount <= filters.userCountRange[1],
  );

  // Sort
  result.sort((a, b) => {
    let aVal: string | number = "";
    let bVal: string | number = "";
    switch (filters.sortBy) {
      case "name":
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case "users":
        aVal = a.userCount;
        bVal = b.userCount;
        break;
      case "permissions":
        aVal = a.permissions.filter((p) => p.enabled).length;
        bVal = b.permissions.filter((p) => p.enabled).length;
        break;
      case "created":
        aVal = new Date(a.createdAt).getTime();
        bVal = new Date(b.createdAt).getTime();
        break;
      case "updated":
        aVal = new Date(a.updatedAt).getTime();
        bVal = new Date(b.updatedAt).getTime();
        break;
    }
    if (aVal < bVal) return filters.sortAsc ? -1 : 1;
    if (aVal > bVal) return filters.sortAsc ? 1 : -1;
    return 0;
  });

  return result;
}

export function getRoleById(id: string): Role | undefined {
  return mockRoles.find((r) => r.id === id);
}

export function getUsersByRole(roleName: string): User[] {
  return mockUsers.filter((u) => u.role === roleName);
}

export function getAvailableUsers(currentRoleUsers: string[]): User[] {
  return mockUsers.filter((u) => !currentRoleUsers.includes(u.id));
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getPermissionCount(role: Role): number {
  return role.permissions.filter((p) => p.enabled).length;
}

export function getModulePermissions(
  role: Role,
  module: PermissionModule,
): Permission[] {
  return role.permissions.filter((p) => p.module === module);
}

export function hasPermission(
  role: Role,
  module: PermissionModule,
  action: PermissionAction,
): boolean {
  return role.permissions.some(
    (p) => p.module === module && p.action === action && p.enabled,
  );
}

export function clonePermissions(permissions: Permission[]): Permission[] {
  return permissions.map((p) => ({ ...p }));
}

export function mergePermissions(
  base: Permission[],
  override: Partial<
    Record<PermissionModule, Partial<Record<PermissionAction, boolean>>>
  >,
): Permission[] {
  return base.map((p) => {
    const modOverride = override[p.module];
    if (modOverride && modOverride[p.action] !== undefined) {
      return { ...p, enabled: modOverride[p.action]! };
    }
    return p;
  });
}
