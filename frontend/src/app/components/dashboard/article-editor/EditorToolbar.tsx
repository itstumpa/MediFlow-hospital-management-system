"use client";

import {
  AlertTriangle,
  AlignLeft,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  List,
  ListOrdered,
  MessageSquare,
  Quote,
  Tablet,
  Video,
} from "lucide-react";
import type { ContentBlock } from "../../../dashboard/admin/articles/form-schema";

interface EditorToolbarProps {
  onAddBlock: (block: ContentBlock) => void;
}

const blockTypes = [
  {
    group: "Text",
    items: [
      {
        icon: Heading1,
        label: "Heading 1",
        type: "heading" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "heading",
          content: "",
          level: 1,
        }),
      },
      {
        icon: Heading2,
        label: "Heading 2",
        type: "heading" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "heading",
          content: "",
          level: 2,
        }),
      },
      {
        icon: Heading3,
        label: "Heading 3",
        type: "heading" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "heading",
          content: "",
          level: 3,
        }),
      },
      {
        icon: AlignLeft,
        label: "Paragraph",
        type: "paragraph" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "paragraph",
          content: "",
        }),
      },
    ],
  },
  {
    group: "Lists",
    items: [
      {
        icon: List,
        label: "Bullet List",
        type: "list" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "list",
          items: [""],
          listType: "unordered",
        }),
      },
      {
        icon: ListOrdered,
        label: "Numbered List",
        type: "list" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "list",
          items: [""],
          listType: "ordered",
        }),
      },
    ],
  },
  {
    group: "Media",
    items: [
      {
        icon: Image,
        label: "Image",
        type: "image" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "image",
          src: "",
          alt: "",
        }),
      },
      {
        icon: Video,
        label: "Video",
        type: "video" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "video",
          src: "",
        }),
      },
    ],
  },
  {
    group: "Special",
    items: [
      {
        icon: Quote,
        label: "Quote",
        type: "quote" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "quote",
          content: "",
        }),
      },
      {
        icon: AlertTriangle,
        label: "Callout",
        type: "callout" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "callout",
          content: "",
          variant: "info",
        }),
      },
      {
        icon: Code,
        label: "Code",
        type: "code" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "code",
          content: "",
          language: "javascript",
        }),
      },
      {
        icon: Tablet,
        label: "Table",
        type: "table" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "table",
          rows: [{ label: "", value: "" }],
        }),
      },
      {
        icon: MessageSquare,
        label: "FAQ",
        type: "faq" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "faq",
          title: "",
          items: [{ question: "", answer: "" }],
        }),
      },
      {
        icon: AlertTriangle,
        label: "Med Warning",
        type: "medical-warning" as const,
        create: (): ContentBlock => ({
          id: crypto.randomUUID(),
          type: "medical-warning",
          content: "",
          severity: "warning",
        }),
      },
    ],
  },
];

export function EditorToolbar({ onAddBlock }: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800">
      {blockTypes.map((group) => (
        <div key={group.group} className="flex items-center gap-1">
          {group.items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onAddBlock(item.create())}
              title={item.label}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              <item.icon className="h-4 w-4" />
            </button>
          ))}
          <div className="mx-1 h-6 w-px bg-slate-200 last:hidden dark:bg-slate-700" />
        </div>
      ))}
    </div>
  );
}

