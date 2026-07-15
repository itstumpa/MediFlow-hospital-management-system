"use client";

import { CTAButtons } from "./CTAButtons";
import { DashboardDropdown } from "./DashboardDropdown";
import { NavLinks } from "./NavLinks";

export function DesktopNav() {
  return (
    <div className="flex items-center gap-3">
      <NavLinks />
      <DashboardDropdown />
      <CTAButtons />
    </div>
  );
}
