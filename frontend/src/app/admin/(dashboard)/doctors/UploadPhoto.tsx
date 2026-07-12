"use client";

import { motion } from "framer-motion";
import { Camera, Upload, X, User } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface UploadPhotoProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function UploadPhoto({ value, onChange, error }: UploadPhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string>(value);

  const handleFile = useCallback(
    (file: File) => {
      if (!file) return;

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Doctor Photo
      </label>

      <motion.div
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all",
          isDragOver
            ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-500/10"
            : preview
              ? "border-transparent"
              : "border-slate-300 bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-slate-500",
          error && "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={preview ? undefined : handleClick}
        whileHover={preview ? { scale: 1.01 } : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="Upload doctor photo"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleInputChange}
          aria-hidden="true"
        />

        {preview ? (
          <div className="relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-28 w-28 overflow-hidden rounded-full"
            >
              <img
                src={preview}
                alt="Doctor preview"
                className="h-full w-full object-cover"
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                initial={false}
              >
                <Camera className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Remove photo"
            >
              <X className="h-3.5 w-3.5" />
            </motion.button>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Change photo"
            >
              <Upload className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full transition-colors",
              isDragOver
                ? "bg-blue-100 text-blue-500 dark:bg-blue-500/20"
                : "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
            )}>
              {isDragOver ? (
                <Upload className="h-7 w-7" />
              ) : (
                <User className="h-7 w-7" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="text-blue-600 dark:text-blue-400">Click to upload</span>{" "}
                or drag and drop
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                PNG, JPG, GIF, WebP up to 5MB
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
