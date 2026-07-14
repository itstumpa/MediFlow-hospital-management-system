"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Code,
  GripVertical,
  Image,
  Info,
  List,
  ListOrdered,
  MessageSquare,
  Plus,
  Quote,
  Table,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ContentBlock } from "../../../(dashboard)/admin/articles/form-schema";
import { EditorToolbar } from "./EditorToolbar";

interface RichTextEditorProps {
  value: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

function BlockWrapper({
  block,
  index,
  total,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  block: ContentBlock;
  index: number;
  total: number;
  onChange: (updated: ContentBlock) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl border border-transparent bg-white p-4 transition-colors hover:border-slate-200 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      {/* Block controls */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="absolute -left-10 top-4 flex flex-col items-center gap-0.5"
          >
            <button
              type="button"
              onClick={onMoveUp}
              disabled={index === 0}
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <GripVertical className="h-4 w-4 text-slate-300 dark:text-slate-600" />
            <button
              type="button"
              onClick={onMoveDown}
              disabled={index === total - 1}
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Block content */}
      <RenderBlock block={block} onChange={onChange} />

      {/* Delete button */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={onDelete}
            className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full border border-red-200 bg-white text-red-400 shadow-sm transition-colors hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:bg-slate-800 dark:hover:bg-red-900/30"
          >
            <X className="h-3 w-3" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function RenderBlock({
  block,
  onChange,
}: {
  block: ContentBlock;
  onChange: (updated: ContentBlock) => void;
}) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock block={block} onChange={onChange} />;
    case "paragraph":
      return <ParagraphBlock block={block} onChange={onChange} />;
    case "list":
      return <ListBlock block={block} onChange={onChange} />;
    case "quote":
      return <QuoteBlock block={block} onChange={onChange} />;
    case "callout":
      return <CalloutBlock block={block} onChange={onChange} />;
    case "code":
      return <CodeBlock block={block} onChange={onChange} />;
    case "image":
      return <ImageBlock block={block} onChange={onChange} />;
    case "video":
      return <VideoBlock block={block} onChange={onChange} />;
    case "table":
      return <TableBlock block={block} onChange={onChange} />;
    case "medical-warning":
      return <MedicalWarningBlock block={block} onChange={onChange} />;
    case "faq":
      return <FAQBlock block={block} onChange={onChange} />;
    default:
      return null;
  }
}

function HeadingBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "heading" };
  onChange: (b: ContentBlock) => void;
}) {
  const sizes: Record<number, string> = {
    1: "text-2xl font-bold",
    2: "text-xl font-bold",
    3: "text-lg font-semibold",
    4: "text-base font-semibold",
    5: "text-sm font-medium",
    6: "text-xs font-medium",
  };
  return (
    <div className="flex items-start gap-2">
      <select
        value={block.level}
        onChange={(e) => onChange({ ...block, level: Number(e.target.value) })}
        className="mt-1 rounded-lg border border-slate-200 bg-white px-1.5 py-0.5 text-xs text-slate-500 focus:outline-none focus:ring-2 focus:ring-dash-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
      >
        {[1, 2, 3, 4, 5, 6].map((l) => (
          <option key={l} value={l}>
            H{l}
          </option>
        ))}
      </select>
      <input
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Heading text..."
        className={`w-full border-none bg-transparent ${sizes[block.level]} text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-slate-500`}
      />
    </div>
  );
}

function ParagraphBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "paragraph" };
  onChange: (b: ContentBlock) => void;
}) {
  return (
    <textarea
      value={block.content}
      onChange={(e) => onChange({ ...block, content: e.target.value })}
      placeholder="Type your paragraph here..."
      rows={3}
      className="min-h-[60px] w-full resize-y border-none bg-transparent text-base leading-relaxed text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-300 dark:placeholder-slate-500"
    />
  );
}

function ListBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "list" };
  onChange: (b: ContentBlock) => void;
}) {
  const addItem = () => onChange({ ...block, items: [...block.items, ""] });
  const updateItem = (i: number, v: string) => {
    const items = [...block.items];
    items[i] = v;
    onChange({ ...block, items });
  };
  const removeItem = (i: number) => {
    if (block.items.length <= 1) return;
    onChange({ ...block, items: block.items.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          type="button"
          onClick={() =>
            onChange({
              ...block,
              listType:
                block.listType === "unordered" ? "ordered" : "unordered",
            })
          }
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          {block.listType === "unordered" ? (
            <List className="h-3.5 w-3.5" />
          ) : (
            <ListOrdered className="h-3.5 w-3.5" />
          )}
          {block.listType === "unordered" ? "Bullet" : "Numbered"}
        </button>
      </div>
      <div className="space-y-1.5">
        {block.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="mt-0.5 shrink-0 text-xs font-medium text-slate-400">
              {block.listType === "ordered" ? `${i + 1}.` : "•"}
            </span>
            <input
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder="List item..."
              className="w-full border-b border-transparent bg-transparent py-1 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-300 focus:outline-none dark:text-slate-300 dark:placeholder-slate-500 dark:focus:border-slate-600"
            />
            {block.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="shrink-0 text-slate-300 hover:text-red-500 dark:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1 text-xs font-medium text-dash-primary transition-colors hover:text-dash-primary dark:text-accent dark:hover:text-accent"
      >
        <Plus className="h-3 w-3" /> Add item
      </button>
    </div>
  );
}

function QuoteBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "quote" };
  onChange: (b: ContentBlock) => void;
}) {
  return (
    <div className="relative border-l-4 border-dash-primary bg-dash-primary-light/50 pl-4 dark:border-teal-600 dark:bg-teal-950/20">
      <Quote className="mb-1 h-5 w-5 text-dash-primary dark:text-dash-primary" />
      <textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Quote content..."
        rows={2}
        className="w-full resize-y border-none bg-transparent text-base italic leading-relaxed text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-300 dark:placeholder-slate-500"
      />
      <input
        value={block.caption || ""}
        onChange={(e) => onChange({ ...block, caption: e.target.value })}
        placeholder="— Attribution (optional)"
        className="mt-1 w-full border-none bg-transparent text-xs font-medium text-slate-500 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-400"
      />
    </div>
  );
}

function CalloutBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "callout" };
  onChange: (b: ContentBlock) => void;
}) {
  const variantStyles: Record<string, string> = {
    info: "border-dash-primary-light bg-dash-primary-light dark:border-teal-800 dark:bg-teal-950/30",
    success:
      "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
    warning:
      "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
    danger: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
  };
  const icons: Record<string, typeof Info> = {
    info: Info,
    success: Check,
    warning: AlertTriangle,
    danger: AlertCircle,
  };
  const Icon = icons[block.variant] || Info;

  return (
    <div
      className={`flex gap-3 rounded-xl border p-4 ${variantStyles[block.variant] || variantStyles.info}`}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
      <div className="flex-1 space-y-2">
        <textarea
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder="Callout text..."
          rows={2}
          className="w-full resize-y border-none bg-transparent text-sm leading-relaxed text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-300 dark:placeholder-slate-500"
        />
        <select
          value={block.variant}
          onChange={(e) =>
            onChange({
              ...block,
              variant: e.target.value as
                | "info"
                | "success"
                | "warning"
                | "danger",
            })
          }
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500 focus:outline-none focus:ring-2 focus:ring-dash-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
        >
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="danger">Danger</option>
        </select>
      </div>
    </div>
  );
}

function CodeBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "code" };
  onChange: (b: ContentBlock) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 dark:border-slate-700">
      <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-2">
        <Code className="h-4 w-4 text-slate-400" />
        <input
          value={block.language}
          onChange={(e) => onChange({ ...block, language: e.target.value })}
          className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-dash-primary/30"
          placeholder="language"
        />
      </div>
      <textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="// Code here..."
        rows={6}
        className="w-full resize-y border-none bg-slate-900 p-4 font-mono text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-0"
        spellCheck={false}
      />
    </div>
  );
}

function ImageBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "image" };
  onChange: (b: ContentBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
          <Image className="h-5 w-5 text-slate-400" />
        </div>
        <div className="flex-1 space-y-2">
          <input
            value={block.src}
            onChange={(e) => onChange({ ...block, src: e.target.value })}
            placeholder="Paste image URL or upload..."
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dash-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
          />
          <input
            value={block.alt}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            placeholder="Alt text"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dash-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>
      {block.src && (
        <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <img
            src={block.src}
            alt={block.alt || "Image preview"}
            className="max-h-64 w-full object-contain"
          />
        </div>
      )}
      <input
        value={block.caption || ""}
        onChange={(e) => onChange({ ...block, caption: e.target.value })}
        placeholder="Image caption (optional)"
        className="w-full border-none bg-transparent text-center text-xs text-slate-500 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-400"
      />
    </div>
  );
}

function VideoBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "video" };
  onChange: (b: ContentBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
          <Video className="h-5 w-5 text-slate-400" />
        </div>
        <input
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
          placeholder="Paste video URL (YouTube, Vimeo)..."
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dash-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
        />
      </div>
      <input
        value={block.caption || ""}
        onChange={(e) => onChange({ ...block, caption: e.target.value })}
        placeholder="Video caption (optional)"
        className="w-full border-none bg-transparent text-center text-xs text-slate-500 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-400"
      />
    </div>
  );
}

function TableBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "table" };
  onChange: (b: ContentBlock) => void;
}) {
  const addRow = () =>
    onChange({
      ...block,
      rows: [...block.rows, { label: "", value: "" }],
    });
  const updateRow = (i: number, field: "label" | "value", v: string) => {
    const rows = block.rows.map((r, idx) =>
      idx === i ? { ...r, [field]: v } : r,
    );
    onChange({ ...block, rows });
  };
  const removeRow = (i: number) => {
    if (block.rows.length <= 1) return;
    onChange({ ...block, rows: block.rows.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Table className="h-4 w-4" />
        <span>Data Table</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                Label
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                Value
              </th>
              <th className="w-8 px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-slate-100 dark:border-slate-800"
              >
                <td className="px-3 py-1.5">
                  <input
                    value={row.label}
                    onChange={(e) => updateRow(i, "label", e.target.value)}
                    placeholder="Label"
                    className="w-full border-none bg-transparent py-1 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-300"
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    value={row.value}
                    onChange={(e) => updateRow(i, "value", e.target.value)}
                    placeholder="Value"
                    className="w-full border-none bg-transparent py-1 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-white"
                  />
                </td>
                <td className="px-3 py-1.5">
                  {block.rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      className="text-slate-300 hover:text-red-500 dark:text-slate-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-1 text-xs font-medium text-dash-primary transition-colors hover:text-dash-primary dark:text-accent dark:hover:text-accent"
      >
        <Plus className="h-3 w-3" /> Add row
      </button>
    </div>
  );
}

function MedicalWarningBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "medical-warning" };
  onChange: (b: ContentBlock) => void;
}) {
  const severityStyles: Record<string, string> = {
    info: "border-dash-primary bg-dash-primary-light dark:border-teal-700 dark:bg-teal-950/30",
    warning:
      "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30",
    critical: "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950/30",
  };
  const icons: Record<string, typeof AlertTriangle> = {
    info: Info,
    warning: AlertTriangle,
    critical: AlertCircle,
  };
  const Icon = icons[block.severity] || AlertTriangle;

  return (
    <div
      className={`flex gap-4 rounded-xl border-2 p-5 ${severityStyles[block.severity] || severityStyles.warning}`}
    >
      <div className="mt-0.5">
        <Icon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Medical{" "}
            {block.severity === "critical"
              ? "Critical"
              : block.severity === "warning"
                ? "Warning"
                : "Note"}
          </span>
          <select
            value={block.severity}
            onChange={(e) =>
              onChange({
                ...block,
                severity: e.target.value as "info" | "warning" | "critical",
              })
            }
            className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-500 focus:outline-none focus:ring-2 focus:ring-dash-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <textarea
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder="Medical warning content..."
          rows={3}
          className="w-full resize-y border-none bg-transparent text-sm leading-relaxed text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-300 dark:placeholder-slate-500"
        />
      </div>
    </div>
  );
}

function FAQBlock({
  block,
  onChange,
}: {
  block: ContentBlock & { type: "faq" };
  onChange: (b: ContentBlock) => void;
}) {
  const addItem = () =>
    onChange({
      ...block,
      items: [...block.items, { question: "", answer: "" }],
    });
  const updateItem = (i: number, field: "question" | "answer", v: string) => {
    const items = block.items.map((item, idx) =>
      idx === i ? { ...item, [field]: v } : item,
    );
    onChange({ ...block, items });
  };
  const removeItem = (i: number) => {
    if (block.items.length <= 1) return;
    onChange({ ...block, items: block.items.filter((_, idx) => idx !== i) });
  };
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const toggleItem = (i: number) => {
    const next = new Set(openItems);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setOpenItems(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <MessageSquare className="h-4 w-4" />
        <span>FAQ Section</span>
        <input
          value={block.title || ""}
          onChange={(e) => onChange({ ...block, title: e.target.value })}
          placeholder="FAQ title (optional)"
          className="ml-2 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dash-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        />
      </div>
      <div className="space-y-2">
        {block.items.map((item, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <button
              type="button"
              onClick={() => toggleItem(i)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <input
                value={item.question}
                onChange={(e) => updateItem(i, "question", e.target.value)}
                placeholder="Question"
                className="flex-1 border-none bg-transparent text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-300"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex items-center gap-2">
                {block.items.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(i);
                    }}
                    className="text-slate-300 hover:text-red-500 dark:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    openItems.has(i) ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {openItems.has(i) && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-700">
                    <textarea
                      value={item.answer}
                      onChange={(e) => updateItem(i, "answer", e.target.value)}
                      placeholder="Answer..."
                      rows={3}
                      className="w-full resize-y border-none bg-transparent text-sm leading-relaxed text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1 text-xs font-medium text-dash-primary transition-colors hover:text-dash-primary dark:text-accent dark:hover:text-accent"
      >
        <Plus className="h-3 w-3" /> Add FAQ item
      </button>
    </div>
  );
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const addBlock = (block: ContentBlock) => {
    onChange([...value, block]);
  };

  const updateBlock = (index: number, updated: ContentBlock) => {
    const next = [...value];
    next[index] = updated;
    onChange(next);
  };

  const deleteBlock = (index: number) => {
    if (value.length <= 1) return;
    onChange(value.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <EditorToolbar onAddBlock={addBlock} />

      <AnimatePresence mode="popLayout">
        {value.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 py-16 dark:border-slate-600"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Plus className="h-7 w-7 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              No content blocks yet
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Use the toolbar above to start adding content blocks
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {value.map((block, i) => (
          <BlockWrapper
            key={block.id}
            block={block}
            index={i}
            total={value.length}
            onChange={(updated) => updateBlock(i, updated)}
            onDelete={() => deleteBlock(i)}
            onMoveUp={() => moveBlock(i, -1)}
            onMoveDown={() => moveBlock(i, 1)}
          />
        ))}
      </div>
    </div>
  );
}
