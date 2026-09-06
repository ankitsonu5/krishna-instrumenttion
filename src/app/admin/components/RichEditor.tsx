"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  FileCode,
  Sparkles,
  Undo,
  Redo,
  Table as TableIcon,
  Palette,
  Check,
  SplitSquareVertical,
} from "lucide-react";

interface RichEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
}

export default function RichEditor({
  value,
  onChange,
  label,
  placeholder = "Write or edit rich content here...",
  minHeight = "220px",
}: RichEditorProps) {
  const [mode, setMode] = useState<"visual" | "html" | "preview">("visual");
  const visualRef = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);

  // Sync incoming value to visual contentEditable when not typing internally
  useEffect(() => {
    if (visualRef.current && !isInternalUpdate.current) {
      if (visualRef.current.innerHTML !== value) {
        visualRef.current.innerHTML = value || "";
      }
    }
    isInternalUpdate.current = false;
  }, [value, mode]);

  const handleVisualInput = () => {
    if (visualRef.current) {
      isInternalUpdate.current = true;
      onChange(visualRef.current.innerHTML);
    }
  };

  const execCmd = (command: string, arg: string | undefined = undefined) => {
    document.execCommand(command, false, arg);
    handleVisualInput();
    if (visualRef.current) visualRef.current.focus();
  };

  const insertCustomHTML = (html: string) => {
    if (mode === "html") {
      onChange((value || "") + "\n" + html);
    } else {
      if (visualRef.current) {
        visualRef.current.focus();
        document.execCommand("insertHTML", false, html);
        handleVisualInput();
      } else {
        onChange((value || "") + html);
      }
    }
  };

  return (
    <div className="space-y-2 w-full font-sans">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 tracking-wide">
            {label}
          </label>
          <div className="text-[10px] text-slate-500 font-mono">
            {value.length} characters
          </div>
        </div>
      )}

      {/* Editor Container */}
      <div className="bg-[#081524] border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg focus-within:border-[#E76F00] transition">
        {/* Top Mode Selector Bar */}
        <div className="bg-[#0D1E32] border-b border-slate-700/80 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
          {/* Mode Switchers */}
          <div className="flex items-center bg-[#071322] p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setMode("visual")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                mode === "visual"
                  ? "bg-[#E76F00] text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visual Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("html")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                mode === "html"
                  ? "bg-[#E76F00] text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>HTML Source Code</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                mode === "preview"
                  ? "bg-[#0B2B4C] text-[#E76F00] border border-[#E76F00]/40 font-semibold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Dual Sync Active</span>
          </div>
        </div>

        {/* Toolbar (Available in Visual and HTML modes) */}
        {mode !== "preview" && (
          <div className="bg-[#0A1A2C] border-b border-slate-800 px-3 py-1.5 flex flex-wrap items-center gap-1 text-slate-300 text-xs">
            {/* Formatting Actions */}
            <button
              type="button"
              onClick={() => execCmd("bold")}
              title="Bold (Ctrl+B)"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("italic")}
              title="Italic (Ctrl+I)"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("underline")}
              title="Underline (Ctrl+U)"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-slate-700 mx-1" />

            {/* Headings */}
            <button
              type="button"
              onClick={() => execCmd("formatBlock", "<h1>")}
              title="Heading 1"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white font-bold text-xs"
            >
              <Heading1 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("formatBlock", "<h2>")}
              title="Heading 2"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white font-bold text-xs"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("formatBlock", "<h3>")}
              title="Heading 3"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white font-bold text-xs"
            >
              <Heading3 className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-slate-700 mx-1" />

            {/* Lists */}
            <button
              type="button"
              onClick={() => execCmd("insertUnorderedList")}
              title="Bullet List"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("insertOrderedList")}
              title="Numbered List"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("formatBlock", "<blockquote>")}
              title="Quote Block"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-slate-700 mx-1" />

            {/* Quick HTML Snippet Inserts */}
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter Link URL:", "https://");
                if (url) execCmd("createLink", url);
              }}
              title="Insert Link"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                const img = prompt("Enter Image URL:", "/about-us/1.jpeg");
                if (img) insertCustomHTML(`<img src="${img}" alt="Illustration" class="rounded-xl my-3 max-w-full border border-slate-700" />`);
              }}
              title="Insert Image"
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() =>
                insertCustomHTML(
                  `<span class="inline-block bg-[#E76F00]/20 text-[#E76F00] font-semibold px-2.5 py-0.5 rounded-full text-xs border border-[#E76F00]/30 font-mono">Verified Specification</span>`
                )
              }
              title="Insert Industrial Badge"
              className="p-1.5 hover:bg-slate-700 rounded text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Badge</span>
            </button>

            <button
              type="button"
              onClick={() =>
                insertCustomHTML(
                  `<div class="p-3 my-2 bg-slate-900 border-l-4 border-[#E76F00] rounded-r-lg text-xs text-slate-300"><strong>Note:</strong> Technical compliance and loop check verified.</div>`
                )
              }
              title="Insert Highlight Box"
              className="p-1.5 hover:bg-slate-700 rounded text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px]"
            >
              <span>+ Highlight Box</span>
            </button>
          </div>
        )}

        {/* 1. VISUAL EDITING CANVAS */}
        {mode === "visual" && (
          <div
            ref={visualRef}
            contentEditable
            onInput={handleVisualInput}
            onBlur={handleVisualInput}
            style={{ minHeight }}
            className="p-4 text-sm text-slate-100 focus:outline-none overflow-y-auto prose prose-invert max-w-none prose-headings:text-white prose-a:text-[#E76F00] prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: value || "" }}
          />
        )}

        {/* 2. HTML SOURCE CODE EDITOR */}
        {mode === "html" && (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ minHeight }}
            placeholder="<p>Enter clean HTML code here...</p>"
            className="w-full p-4 bg-[#050E1A] text-emerald-400 font-mono text-xs focus:outline-none resize-y leading-relaxed"
            spellCheck={false}
          />
        )}

        {/* 3. LIVE SITE PREVIEW */}
        {mode === "preview" && (
          <div
            style={{ minHeight }}
            className="p-5 bg-gradient-to-b from-[#091726] to-[#0D1F33] text-slate-200 text-sm overflow-y-auto leading-relaxed border-t border-slate-800"
          >
            <div className="border border-dashed border-slate-700/60 p-4 rounded-xl bg-slate-900/40">
              <div
                className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: value || "<p class='text-slate-500 italic'>No content to preview.</p>" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
