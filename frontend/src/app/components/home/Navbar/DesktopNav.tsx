"use client";

import { CTAButtons } from "./CTAButtons";
import { NavLinks } from "./NavLinks";

export function DesktopNav() {
  return (
    <div className="flex items-center gap-3">
      <NavLinks />
      <CTAButtons />
    </div>
  );
}
