"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ImagePlus, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  error,
  label = "Department Image",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string>(value);

  const handleFile = useCallback(
    (file: File) => {
      if (!file) return;

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) return;

      if (file.size > 5 * 1024 * 1024) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
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
        {label}
      </label>

      <motion.div
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all",
          isDragOver
            ? "border-dash-primary bg-dash-primary-light dark:border-teal-500 dark:bg-teal-500/10"
            : preview
              ? "border-transparent"
              : "border-slate-300 bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-slate-500",
          error &&
            "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-500/10",
        )}
        whileHover={preview ? {} : { scale: 1.01 }}
        onClick={() => !preview && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleInputChange}
          className="hidden"
          aria-label="Upload department image"
        />

        {preview ? (
          <div className="relative w-full">
            <motion.img
              src={preview}
              alt="Department preview"
              className="h-48 w-full rounded-lg object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-lg bg-black/0 opacity-0 transition-all hover:bg-black/40 hover:opacity-100">
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload className="h-3.5 w-3.5" />
                Replace
              </motion.button>
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="flex items-center gap-1.5 rounded-lg bg-red-500/90 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-sm transition-all hover:bg-red-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700"
              animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
            >
              <ImagePlus className="h-6 w-6 text-slate-400" />
            </motion.div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Drop an image here or click to browse
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                JPG, PNG, GIF, WebP &bull; Max 5MB
              </p>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-2 text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
}
