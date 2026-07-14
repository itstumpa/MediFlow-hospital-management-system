"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import type { TrendMetric } from "./types";
import { mockTrendData } from "./types";

/* ─── Simple SVG line chart ─── */

function MiniLineChart({
  data,
  color,
  minNormal,
  maxNormal,
  unit,
  label,
}: TrendMetric) {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center h-24 text-xs text-slate-400 dark:text-slate-500">
        Not enough data points
      </div>
    );
  }

  const width = 240;
  const height = 80;
  const padding = { top: 8, right: 8, bottom: 16, left: 32 };

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values, minNormal) - 5;
  const maxVal = Math.max(...values, maxNormal) + 5;
  const range = maxVal - minVal || 1;

  const xScale = (i: number) =>
    padding.left +
    (i / (data.length - 1)) * (width - padding.left - padding.right);
  const yScale = (v: number) =>
    height -
    padding.bottom -
    ((v - minVal) / range) * (height - padding.top - padding.bottom);

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.value)}`)
    .join(" ");

  // Normal range band
  const normalBandTop = yScale(maxNormal);
  const normalBandBottom = yScale(minNormal);

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number;
    date: string;
  } | null>(null);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-24"
        role="img"
        aria-label={`${label} trend chart`}
      >
        {/* Normal range band */}
        <rect
          x={padding.left}
          y={normalBandTop}
          width={width - padding.left - padding.right}
          height={normalBandBottom - normalBandTop}
          fill={color}
          opacity={0.08}
          rx={2}
        />
        {/* Normal range label */}
        <text
          x={width - padding.right}
          y={normalBandTop - 2}
          textAnchor="end"
          fontSize="7"
          fill="#94a3b8"
        >
          Normal
        </text>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((frac) => (
          <line
            key={frac}
            x1={padding.left}
            y1={padding.top + (height - padding.top - padding.bottom) * frac}
            x2={width - padding.right}
            y2={padding.top + (height - padding.top - padding.bottom) * frac}
            stroke="#e2e8f0"
            strokeWidth={0.5}
            className="dark:stroke-slate-700"
          />
        ))}

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />

        {/* Dots */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={xScale(i)}
            cy={yScale(d.value)}
            r={3}
            fill={color}
            stroke="white"
            strokeWidth={1.5}
            className="cursor-pointer transition-all hover:r-4"
            style={{ transition: "r 0.15s ease" }}
            onMouseEnter={(e) => {
              const rect = (e.target as SVGElement)
                .closest("svg")
                ?.getBoundingClientRect();
              if (rect) {
                setTooltip({
                  x: xScale(i),
                  y: yScale(d.value),
                  value: d.value,
                  date: d.date,
                });
              }
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}

        {/* Y axis labels */}
        {[
          minVal + range * 0.25,
          minVal + range * 0.5,
          minVal + range * 0.75,
        ].map((v, i) => (
          <text
            key={i}
            x={padding.left - 4}
            y={
              height -
              padding.bottom -
              ((v - minVal) / range) * (height - padding.top - padding.bottom) +
              2
            }
            textAnchor="end"
            fontSize="7"
            fill="#94a3b8"
          >
            {Math.round(v)}
          </text>
        ))}

        {/* X axis labels */}
        {data.length <= 6 &&
          data.map((d, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={height - 2}
              textAnchor="middle"
              fontSize="7"
              fill="#94a3b8"
            >
              {d.date.slice(5)}
            </text>
          ))}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-slate-700"
          style={{
            left: `${(tooltip.x / width) * 100}%`,
            top: `${(tooltip.y / height) * 100 - 32}px`,
          }}
        >
          <p className="font-semibold tabular-nums">
            {tooltip.value} {unit}
          </p>
          <p className="text-[10px] text-slate-300">{tooltip.date}</p>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Props ─── */

interface TrendChartsProps {
  className?: string;
}

/* ─── Component ─── */

export function TrendCharts({ className }: TrendChartsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn("dash-card p-5", className)}
    >
      <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
        Test Trends
      </h3>
      <p className="mb-4 text-xs text-slate-400 dark:text-slate-500">
        Track changes in key health metrics over time
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockTrendData.map((metric, i) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
            className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700/40 dark:bg-slate-700/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${metric.color}18` }}
              >
                <metric.icon
                  className="h-3.5 w-3.5"
                  style={{ color: metric.color }}
                />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  {metric.label}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Last value: {metric.data[metric.data.length - 1]?.value}{" "}
                  {metric.unit}
                </p>
              </div>
            </div>
            <MiniLineChart {...metric} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
