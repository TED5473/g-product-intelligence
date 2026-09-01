import { useState } from "react";
import { eeaHelp } from "@/lib/eea";
import { SrcBadge } from "@/components/src-badge";

export function EeaText({ text }: { text?: string }) {
  const [open, setOpen] = useState(false);
  if (!text) return <span className="text-muted">待补</span>;
  const help = eeaHelp(text);
  if (!help) return <span>{text}</span>;
  return (
    <span className="relative inline-flex items-center gap-1">
      <span>{text}</span>
      <button
        type="button"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-line text-[11px] font-semibold text-muted hover:border-ink hover:text-ink"
        aria-label="EEA 解释"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        ?
      </button>
      {open ? (
        <span
          className="absolute top-7 left-0 z-40 w-80 rounded-lg border border-line bg-surface p-3 text-left shadow-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="mb-1 flex items-center gap-2 text-[13px] font-semibold">
            {help.title} <SrcBadge source={help.src} />
          </span>
          {help.paras.map((p) => (
            <span key={p} className="mt-1 block text-[12px] leading-snug text-muted">
              {p}
            </span>
          ))}
        </span>
      ) : null}
    </span>
  );
}
