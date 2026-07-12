"use client";

import {
  ArticlePreview,
  ConfirmDialog,
  ImageUpload,
  PublishingSection,
  RelatedContent,
  RichTextEditor,
  SEOSection,
} from "@/app/components/dashboard/article-editor";
import { Breadcrumb } from "@/app/components/dashboard/Breadcrumb";
import { pageFade } from "@/lib/animations/pageTransition";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Eye,
  FileText,
  Globe,
  Layout,
  Link2,
  Save,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  articleFormSchema,
  defaultFormValues,
  type ArticleFormValues,
} from "./form-schema";

interface ArticleFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<ArticleFormValues>;
}

export function ArticleForm({
  mode,
  defaultValues: editValues,
}: ArticleFormProps) {
  const router = useRouter();
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [showSaveDraftDialog, setShowSaveDraftDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isEdit = mode === "edit";

  const mergedDefaults: ArticleFormValues = {
    ...defaultFormValues,
    ...editValues,
    content: editValues?.content || defaultFormValues.content,
    keywords: editValues?.keywords || defaultFormValues.keywords,
    tags: editValues?.tags || defaultFormValues.tags,
    relatedArticles:
      editValues?.relatedArticles || defaultFormValues.relatedArticles,
    relatedDepartments:
      editValues?.relatedDepartments || defaultFormValues.relatedDepartments,
    relatedDoctors:
      editValues?.relatedDoctors || defaultFormValues.relatedDoctors,
  };

  const methods = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: mergedDefaults,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
    setValue,
    getValues,
  } = methods;

  const formValues = watch();

  // Autosave simulation
  useEffect(() => {
    if (!isDirty) return;

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      setLastSaved(new Date());
      // In a real app, you'd save to API here
    }, 3000);

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [formValues, isDirty]);

  // Unsaved changes warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const onSubmit = useCallback(
    async (data: ArticleFormValues) => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/admin/articles");
      }, 2000);
    },
    [router],
  );

  const handleSaveDraft = useCallback(() => {
    setShowSaveDraftDialog(true);
  }, []);

  const confirmSaveDraft = useCallback(() => {
    setShowSaveDraftDialog(false);
    setLastSaved(new Date());
    // In a real app, save draft to API
  }, []);

  const handleCancel = useCallback(() => {
    if (isDirty) {
      setShowDiscardDialog(true);
    } else {
      router.push("/admin/articles");
    }
  }, [isDirty, router]);

  const confirmDiscard = useCallback(() => {
    setShowDiscardDialog(false);
    router.push("/admin/articles");
  }, [router]);

  // Helper to update a single field
  const updateField = useCallback(
    (field: keyof ArticleFormValues, value: unknown) => {
      setValue(field as any, value as any, { shouldDirty: true });
    },
    [setValue],
  );

  // We need to set errors manually since we're using nested sub-forms
  // The resolver handles validation on submit

  return (
    <FormProvider {...methods}>
      <motion.div
        variants={pageFade}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-6"
      >
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Page Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <motion.div variants={staggerItem}>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isEdit ? "Edit Article" : "Create Article"}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {isEdit
                ? "Update your healthcare article content and settings"
                : "Write a new healthcare article with rich content blocks"}
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center gap-2"
          >
            {/* Save Draft */}
            <motion.button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="h-4 w-4" />
              Save Draft
            </motion.button>

            {/* Preview */}
            <motion.button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="h-4 w-4" />
              Preview
            </motion.button>

            {/* Cancel */}
            <motion.button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X className="h-4 w-4" />
              Cancel
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Auto-save indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-end gap-2"
        >
          {lastSaved && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              Auto-saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
          {isDirty && !lastSaved && (
            <span className="flex items-center gap-1.5 text-xs text-amber-500">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
            {/* Main Form */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Section 1: Basic Information */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                      Basic Information
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Article title, slug, excerpt, and images
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Article Title <span className="text-red-500">*</span>
                    </label>
                    <div className="group relative">
                      <input
                        value={formValues.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="Enter an attention-grabbing title..."
                        className="dash-input w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 group-focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-xs text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Slug */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Slug <span className="text-red-500">*</span>
                    </label>
                    <div className="group relative">
                      <input
                        value={formValues.slug}
                        onChange={(e) => updateField("slug", e.target.value)}
                        placeholder="article-url-slug"
                        className="dash-input w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-44 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                      />
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-500">
                        mediflow.com/articles/
                      </span>
                    </div>
                    {errors.slug && (
                      <p className="text-xs text-red-500">
                        {errors.slug.message}
                      </p>
                    )}
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Excerpt <span className="text-red-500">*</span>
                      </label>
                      <span
                        className={`text-xs ${
                          formValues.excerpt.length > 500
                            ? "text-red-500"
                            : "text-slate-400"
                        }`}
                      >
                        {formValues.excerpt.length}/500
                      </span>
                    </div>
                    <textarea
                      value={formValues.excerpt}
                      onChange={(e) => updateField("excerpt", e.target.value)}
                      placeholder="Write a brief summary of your article..."
                      rows={3}
                      className="dash-input w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                    />
                    {errors.excerpt && (
                      <p className="text-xs text-red-500">
                        {errors.excerpt.message}
                      </p>
                    )}
                  </div>

                  {/* Featured Image */}
                  <ImageUpload
                    value={formValues.featuredImage || ""}
                    onChange={(url) => updateField("featuredImage", url)}
                    label="Featured Image"
                    description="Main image shown in article cards and header"
                  />

                  {/* Cover Banner */}
                  <ImageUpload
                    value={formValues.coverBanner || ""}
                    onChange={(url) => updateField("coverBanner", url)}
                    label="Cover Banner"
                    description="Full-width banner for article detail page"
                    aspectRatio="21/9"
                    previewHeight="h-36"
                  />
                </div>
              </motion.div>

              {/* Section 2: Content Editor */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <Layout className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                      Content Editor
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Build your article with rich content blocks
                    </p>
                  </div>
                </div>

                {errors.content && (
                  <p className="mb-3 text-xs text-red-500">
                    {typeof errors.content.message === "string"
                      ? errors.content.message
                      : "Content validation error"}
                  </p>
                )}

                <RichTextEditor
                  value={formValues.content}
                  onChange={(blocks) => updateField("content", blocks)}
                />
              </motion.div>

              {/* Section 3: SEO */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                      SEO Settings
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Optimize your article for search engines
                    </p>
                  </div>
                </div>

                <SEOSection values={formValues} onChange={updateField} />
              </motion.div>

              {/* Section 4: Publishing */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <Send className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                      Publishing
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Status, categorization, and scheduling
                    </p>
                  </div>
                </div>

                <PublishingSection
                  status={formValues.status}
                  author={formValues.author}
                  category={formValues.category}
                  tags={formValues.tags}
                  readingTime={formValues.readingTime}
                  featured={formValues.featured}
                  allowComments={formValues.allowComments}
                  publishDate={formValues.publishDate || ""}
                  scheduleDate={formValues.scheduleDate || ""}
                  onChange={updateField}
                />
              </motion.div>

              {/* Section 5: Related Content */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                    <Link2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                      Related Content
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Link related articles, departments, and doctors
                    </p>
                  </div>
                </div>

                <RelatedContent
                  relatedArticles={formValues.relatedArticles}
                  relatedDepartments={formValues.relatedDepartments}
                  relatedDoctors={formValues.relatedDoctors}
                  onChange={updateField}
                />
              </motion.div>

              {/* Form Actions */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  {isEdit
                    ? "Update the article to save changes"
                    : "Fill in all required fields to create a new article"}
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all",
                      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
                      "disabled:cursor-not-allowed disabled:opacity-60",
                    )}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-flex"
                        >
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                        </motion.span>
                        {isEdit ? "Publishing..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        {isEdit ? "Update Article" : "Publish Article"}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Sidebar - Article Preview */}
            <div className="hidden lg:block">
              <div className="sticky top-6">
                <ArticlePreview values={formValues} />
              </div>
            </div>
          </div>
        </form>

        {/* Modals */}
        <ConfirmDialog
          open={showDiscardDialog}
          title="Discard changes?"
          message="You have unsaved changes that will be lost if you leave this page. Are you sure you want to discard them?"
          confirmLabel="Discard"
          cancelLabel="Keep editing"
          variant="danger"
          onConfirm={confirmDiscard}
          onCancel={() => setShowDiscardDialog(false)}
        />

        <ConfirmDialog
          open={showSaveDraftDialog}
          title="Save as Draft"
          message="Your article will be saved as a draft so you can come back to it later."
          confirmLabel="Save Draft"
          cancelLabel="Cancel"
          variant="info"
          onConfirm={confirmSaveDraft}
          onCancel={() => setShowSaveDraftDialog(false)}
        />

        {/* Success Toast */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-6 py-4 shadow-2xl dark:border-emerald-800 dark:bg-slate-800"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Article {isEdit ? "updated" : "published"} successfully!
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Redirecting to articles list...
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </FormProvider>
  );
}
