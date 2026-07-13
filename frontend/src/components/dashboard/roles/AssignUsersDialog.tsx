"use client";

import { Role, User } from "@/lib/data/rbac";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, UserMinus, UserPlus, Users, X } from "lucide-react";
import { useMemo, useState } from "react";

interface AssignUsersDialogProps {
  role: Role;
  open: boolean;
  onClose: () => void;
  onAssign: (userIds: string[]) => void;
  onRemove: (userIds: string[]) => void;
  availableUsers: User[];
  assignedUsers: User[];
  isLoading?: boolean;
}

export function AssignUsersDialog({
  role,
  open,
  onClose,
  onAssign,
  onRemove,
  availableUsers,
  assignedUsers,
  isLoading = false,
}: AssignUsersDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAvailable, setSelectedAvailable] = useState<Set<string>>(
    new Set(),
  );
  const [selectedAssigned, setSelectedAssigned] = useState<Set<string>>(
    new Set(),
  );
  const [activeTab, setActiveTab] = useState<"available" | "assigned">(
    "available",
  );

  const filteredAvailable = useMemo(() => {
    if (!searchQuery) return availableUsers;
    const q = searchQuery.toLowerCase();
    return availableUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
    );
  }, [availableUsers, searchQuery]);

  const filteredAssigned = useMemo(() => {
    if (!searchQuery) return assignedUsers;
    const q = searchQuery.toLowerCase();
    return assignedUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
    );
  }, [assignedUsers, searchQuery]);

  const handleToggleAvailable = (userId: string) => {
    setSelectedAvailable((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const handleToggleAssigned = (userId: string) => {
    setSelectedAssigned((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const handleAssignSelected = () => {
    if (selectedAvailable.size > 0) {
      onAssign(Array.from(selectedAvailable));
      setSelectedAvailable(new Set());
    }
  };

  const handleRemoveSelected = () => {
    if (selectedAssigned.size > 0) {
      onRemove(Array.from(selectedAssigned));
      setSelectedAssigned(new Set());
    }
  };

  const handleAssignAll = () => {
    if (availableUsers.length > 0) {
      onAssign(availableUsers.map((u) => u.id));
    }
  };

  const handleRemoveAll = () => {
    if (assignedUsers.length > 0) {
      onRemove(assignedUsers.map((u) => u.id));
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "inactive":
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300";
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-users-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-dash-primary/10 text-dash-primary flex items-center justify-center">
                <Users className="size-5" />
              </div>
              <div>
                <h2 id="assign-users-title" className="text-lg font-semibold">
                  Assign Users to {role.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {role.type === "system" ? "System Role" : "Custom Role"} •{" "}
                  {role.userCount} user{role.userCount !== 1 ? "s" : ""}{" "}
                  currently assigned
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50"
              aria-label="Close dialog"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4">
              <button
                onClick={() => setActiveTab("available")}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === "available"
                    ? "border-dash-primary text-dash-primary"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                )}
              >
                <UserPlus className="size-4" />
                <span>Available Users</span>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    activeTab === "available"
                      ? "bg-dash-primary text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
                  )}
                >
                  {filteredAvailable.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("assigned")}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === "assigned"
                    ? "border-dash-primary text-dash-primary"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                )}
              >
                <UserMinus className="size-4" />
                <span>Assigned Users</span>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    activeTab === "assigned"
                      ? "bg-dash-primary text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
                  )}
                >
                  {filteredAssigned.length}
                </span>
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/30">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 size-4" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  aria-label="Search users"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>

            {/* User Lists */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "available" ? (
                <AvailableUsersList
                  users={filteredAvailable}
                  selected={selectedAvailable}
                  onToggle={handleToggleAvailable}
                  onAssignSelected={handleAssignSelected}
                  onAssignAll={handleAssignAll}
                  hasSelection={selectedAvailable.size > 0}
                  isLoading={isLoading}
                  getInitials={getInitials}
                  getStatusColor={getStatusColor}
                />
              ) : (
                <AssignedUsersList
                  users={filteredAssigned}
                  selected={selectedAssigned}
                  onToggle={handleToggleAssigned}
                  onRemoveSelected={handleRemoveSelected}
                  onRemoveAll={handleRemoveAll}
                  hasSelection={selectedAssigned.size > 0}
                  isLoading={isLoading}
                  getInitials={getInitials}
                  getStatusColor={getStatusColor}
                />
              )}

              {filteredAvailable.length === 0 && activeTab === "available" && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 dark:text-slate-400">
                  <Users className="size-12 mb-4 opacity-50" />
                  <p className="font-medium">No available users found</p>
                  <p className="text-sm">
                    {searchQuery
                      ? "Try adjusting your search"
                      : "All users are already assigned to this role"}
                  </p>
                </div>
              )}

              {filteredAssigned.length === 0 && activeTab === "assigned" && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 dark:text-slate-400">
                  <UserMinus className="size-12 mb-4 opacity-50" />
                  <p className="font-medium">No users assigned to this role</p>
                  <p className="text-sm">
                    Assign users from the Available Users tab
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {selectedAvailable.size > 0 && activeTab === "available" && (
                <span className="text-dash-primary font-medium">
                  {selectedAvailable.size} selected for assignment
                </span>
              )}
              {selectedAssigned.size > 0 && activeTab === "assigned" && (
                <span className="text-rose-600 dark:text-rose-400 font-medium">
                  {selectedAssigned.size} selected for removal
                </span>
              )}
              {selectedAvailable.size === 0 && selectedAssigned.size === 0 && (
                <span>Select users to assign or remove</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 text-slate-700 dark:text-slate-300"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface AvailableUsersListProps {
  users: User[];
  selected: Set<string>;
  onToggle: (userId: string) => void;
  onAssignSelected: () => void;
  onAssignAll: () => void;
  hasSelection: boolean;
  isLoading: boolean;
  getInitials: (name: string) => string;
  getStatusColor: (status: User["status"]) => string;
}

function AvailableUsersList({
  users,
  selected,
  onToggle,
  onAssignSelected,
  onAssignAll,
  hasSelection,
  isLoading,
  getInitials,
  getStatusColor,
}: AvailableUsersListProps) {
  return (
    <div className="space-y-2">
      {users.length > 0 && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.size === users.length && users.length > 0}
              ref={(el) => {
                if (el)
                  el.indeterminate =
                    selected.size > 0 && selected.size < users.length;
              }}
              onChange={() => {
                if (selected.size === users.length) {
                  selected.clear();
                } else {
                  users.forEach((u) => selected.add(u.id));
                }
              }}
              className="size-4 rounded border-slate-300 dark:border-slate-600"
              aria-label="Select all users"
            />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {users.length} user{users.length !== 1 ? "s" : ""} available
            </span>
          </div>
          <div className="flex gap-2">
            {hasSelection && (
              <button
                onClick={onAssignSelected}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-dash-primary text-white hover:bg-dash-primary/90 transition-colors disabled:opacity-50"
              >
                <UserPlus className="size-3.5 mr-1.5" />
                Assign Selected
              </button>
            )}
            <button
              onClick={onAssignAll}
              disabled={isLoading || users.length === 0}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 text-slate-700 dark:text-slate-300"
            >
              Assign All
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border transition-all",
              selected.has(user.id)
                ? "bg-dash-primary/5 border-dash-primary/20"
                : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30",
            )}
          >
            <input
              type="checkbox"
              checked={selected.has(user.id)}
              onChange={() => onToggle(user.id)}
              className="size-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50"
              aria-label={`Select ${user.name}`}
            />
            <div
              className={cn(
                "size-10 rounded-xl flex items-center justify-center flex-shrink-0 font-medium",
                user.avatar
                  ? ""
                  : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
              )}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="size-full rounded-xl object-cover"
                />
              ) : (
                <span>{getInitials(user.name)}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{user.name}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    getStatusColor(user.status),
                  )}
                >
                  {user.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="truncate">{user.email}</span>
                <span className="text-slate-400/50 dark:text-slate-500/50">
                  •
                </span>
                <span>{user.role}</span>
              </div>
            </div>
            <button
              onClick={() => onToggle(user.id)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                selected.has(user.id)
                  ? "bg-dash-primary/10 text-dash-primary hover:bg-dash-primary/20"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700",
              )}
              aria-label={
                selected.has(user.id) ? "Deselect" : "Select for assignment"
              }
            >
              <Check className="size-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface AssignedUsersListProps {
  users: User[];
  selected: Set<string>;
  onToggle: (userId: string) => void;
  onRemoveSelected: () => void;
  onRemoveAll: () => void;
  hasSelection: boolean;
  isLoading: boolean;
  getInitials: (name: string) => string;
  getStatusColor: (status: User["status"]) => string;
}

function AssignedUsersList({
  users,
  selected,
  onToggle,
  onRemoveSelected,
  onRemoveAll,
  hasSelection,
  isLoading,
  getInitials,
  getStatusColor,
}: AssignedUsersListProps) {
  return (
    <div className="space-y-2">
      {users.length > 0 && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.size === users.length && users.length > 0}
              ref={(el) => {
                if (el)
                  el.indeterminate =
                    selected.size > 0 && selected.size < users.length;
              }}
              onChange={() => {
                if (selected.size === users.length) {
                  selected.clear();
                } else {
                  users.forEach((u) => selected.add(u.id));
                }
              }}
              className="size-4 rounded border-slate-300 dark:border-slate-600"
              aria-label="Select all assigned users"
            />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {users.length} user{users.length !== 1 ? "s" : ""} assigned
            </span>
          </div>
          <div className="flex gap-2">
            {hasSelection && (
              <button
                onClick={onRemoveSelected}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors disabled:opacity-50"
              >
                <UserMinus className="size-3.5 mr-1.5" />
                Remove Selected
              </button>
            )}
            <button
              onClick={onRemoveAll}
              disabled={isLoading || users.length === 0}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 text-slate-700 dark:text-slate-300"
            >
              Remove All
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border transition-all",
              selected.has(user.id)
                ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800"
                : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30",
            )}
          >
            <input
              type="checkbox"
              checked={selected.has(user.id)}
              onChange={() => onToggle(user.id)}
              className="size-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50"
              aria-label={`Select ${user.name} for removal`}
            />
            <div
              className={cn(
                "size-10 rounded-xl flex items-center justify-center flex-shrink-0 font-medium",
                user.avatar
                  ? ""
                  : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
              )}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="size-full rounded-xl object-cover"
                />
              ) : (
                <span>{getInitials(user.name)}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{user.name}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    getStatusColor(user.status),
                  )}
                >
                  {user.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="truncate">{user.email}</span>
                <span className="text-slate-400/50 dark:text-slate-500/50">
                  •
                </span>
                <span>{user.role}</span>
              </div>
            </div>
            <button
              onClick={() => onToggle(user.id)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                selected.has(user.id)
                  ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/50"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700",
              )}
              aria-label={
                selected.has(user.id) ? "Deselect" : "Select for removal"
              }
            >
              <Check className="size-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
