"use client";

import type { LucideIcon } from "lucide-react";
import { FeatureItem } from "./FeatureItem";
import { IllustrationPanel } from "./IllustrationPanel";

interface FeatureData {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureRowProps {
  features: FeatureData[];
  imageSide: "left" | "right";
  illustrationVariant?: "doctor" | "dashboard";
}

export function FeatureRow({
  features,
  imageSide,
  illustrationVariant = "doctor",
}: FeatureRowProps) {
  const content = (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <FeatureItem
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </div>
  );

  const illustration = <IllustrationPanel variant={illustrationVariant} />;

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      {imageSide === "left" ? (
        <>
          <div>{illustration}</div>
          <div>{content}</div>
        </>
      ) : (
        <>
          <div>{content}</div>
          <div>{illustration}</div>
        </>
      )}
    </div>
  );
}
