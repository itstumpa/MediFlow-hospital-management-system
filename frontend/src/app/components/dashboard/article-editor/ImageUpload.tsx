"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CropIcon, ImageIcon, Replace, Trash2, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  description?: string;
  aspectRatio?: string;
  previewHeight?: string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  description,
  aspectRatio = "16/9",
  previewHeight = "h-48",
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [showCrop, setShowCrop] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange("");
    if (value.startsWith("blob:")) URL.revokeObjectURL(value);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {value && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowCrop(!showCrop)}
              className="rounded-lg p-1.5 text-xs text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              title="Crop image"
            >
              <CropIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-lg p-1.5 text-xs text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              title="Remove image"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800`}
          >
            <div className={`relative ${previewHeight}`}>
              <img
                src={value}
                alt="Upload preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={handleClick}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <Replace className="h-3.5 w-3.5" />
                  Replace
                </button>
              </div>
            </div>

            {showCrop && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-200 p-4 text-center dark:border-slate-700"
              >
                <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-6 py-3 text-xs text-slate-400 dark:border-slate-600">
                  <CropIcon className="h-4 w-4" />
                  Crop controls would appear here
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            className={`group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all ${previewHeight} ${
              dragOver
                ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-slate-500 dark:hover:bg-slate-800"
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 transition-colors group-hover:bg-blue-100 group-hover:text-blue-500 dark:bg-slate-700 dark:text-slate-500 dark:group-hover:bg-blue-900/40 dark:group-hover:text-blue-400"
            >
              {dragOver ? (
                <Upload className="h-6 w-6" />
              ) : (
                <ImageIcon className="h-6 w-6" />
              )}
            </motion.div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="text-blue-600 dark:text-blue-400">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                PNG, JPG, WebP up to 10MB
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
