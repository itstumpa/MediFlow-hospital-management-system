"use client";

import type { LucideIcon } from "lucide-react";
import { StepCard } from "./StepCard";
import { TimelineConnector } from "./TimelineConnector";

interface TimelineData {
  stepNumber: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TimelineProps {
  steps: TimelineData[];
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <ol className="flex flex-col items-stretch gap-0 md:flex-row">
      {steps.map((step, index) => (
        <li key={step.stepNumber} className="flex flex-1 flex-col">
          {/* Desktop: horizontal card + connector side by side */}
          <div className="hidden h-full w-full md:flex md:flex-row md:items-start">
            <StepCard
              stepNumber={step.stepNumber}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
            />
            {index < steps.length - 1 && (
              <div className="flex h-full shrink-0 items-center px-1 lg:px-2">
                <TimelineConnector index={index} orientation="horizontal" />
              </div>
            )}
          </div>

          {/* Mobile: vertical card + connector stacked */}
          <div className="flex w-full flex-col items-center md:hidden">
            <StepCard
              stepNumber={step.stepNumber}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
            />
            {index < steps.length - 1 && (
              <TimelineConnector index={index} orientation="vertical" />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
