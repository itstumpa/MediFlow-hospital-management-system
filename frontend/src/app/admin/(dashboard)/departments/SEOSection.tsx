"use client";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import type { DepartmentFormValues } from "./form-schema";
import { ImageUpload } from "./ImageUpload";

export function SEOSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<DepartmentFormValues>();

  const metaTitle = watch("metaTitle") || "";
  const metaDescription = watch("metaDescription") || "";
  const ogImage = watch("ogImage") || "";

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500 dark:bg-slate-700 dark:text-slate-400">
            UI Only
          </span>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            SEO
          </h2>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Search engine optimization settings
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Slug */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Slug
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              /
            </span>
            <input
              {...register("slug")}
              placeholder="cardiology"
              className={cn(
                "w-full rounded-xl border py-2.5 pl-7 pr-4 text-sm transition-all",
                "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
                "placeholder:text-slate-400",
                errors.slug
                  ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                  : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
              )}
            />
          </div>
          {errors.slug && (
            <p className="text-xs text-red-500" role="alert">
              {errors.slug.message}
            </p>
          )}
          <p className="text-xs text-slate-400">
            Auto-generated from department name if left empty
          </p>
        </div>

        {/* Meta Title */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Meta Title
          </label>
          <input
            {...register("metaTitle")}
            placeholder="Cardiology Department | MediFlow Hospital"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
              "placeholder:text-slate-400",
              errors.metaTitle
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
          {errors.metaTitle && (
            <p className="text-xs text-red-500" role="alert">
              {errors.metaTitle.message}
            </p>
          )}
          <p className="text-xs text-slate-400">
            {metaTitle.length}/70 characters
          </p>
        </div>
      </div>

      {/* Meta Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Meta Description
        </label>
        <textarea
          {...register("metaDescription")}
          rows={3}
          placeholder="World-class cardiology care at MediFlow Hospital..."
          className={cn(
            "w-full rounded-xl border px-4 py-2.5 text-sm transition-all resize-none",
            "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
            "placeholder:text-slate-400",
            errors.metaDescription
              ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
              : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
          )}
        />
        {errors.metaDescription && (
          <p className="text-xs text-red-500" role="alert">
            {errors.metaDescription.message}
          </p>
        )}
        <p className="text-xs text-slate-400">
          {metaDescription.length}/160 characters
        </p>
      </div>

      {/* Keywords */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Keywords
        </label>
        <input
          {...register("keywords")}
          placeholder="cardiology, heart care, cardiac surgery, cardiologist"
          className={cn(
            "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
            "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
            "placeholder:text-slate-400",
            "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
          )}
        />
        <p className="text-xs text-slate-400">Comma-separated keywords</p>
      </div>

      {/* Open Graph Image */}
      <ImageUpload
        value={ogImage}
        onChange={(val) => setValue("ogImage", val)}
        error={errors.ogImage?.message}
        label="Open Graph Image"
      />
    </div>
  );
}
