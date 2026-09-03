import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { EEA_TERMS, eeaHelp, type EeaHelp } from "@/lib/eea";
import { SrcBadge } from "@/components/src-badge";

const PAD = 10;

function placeTip(trigger: HTMLElement, tip: HTMLElement) {
  const r = trigger.getBoundingClientRect();
  const tw = tip.offsetWidth;
  const th = tip.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let top = r.bottom + 6;
  if (top + th > vh - PAD) top = r.top - th - 6;
  if (top < PAD) top = Math.max(PAD, vh - th - PAD);
  let left = r.left;
  if (left + tw > vw - PAD) left = Math.max(PAD, vw - tw - PAD);
  if (left < PAD) left = PAD;
  tip.style.top = `${Math.round(top)}px`;
  tip.style.left = `${Math.round(left)}px`;
}

function Tip({ help }: { help: EeaHelp }) {
  return (
    <>
      <span className="mb-1 flex items-center gap-2 text-[13px] font-semibold">
        {help.title} <SrcBadge source={help.src} />
      </span>
      {help.paras.map((p) => (
        <span key={p} className="mt-1 block text-[12px] leading-snug text-muted">
          {p}
        </span>
      ))}
    </>
  );
}

function HoverTerm({
  label,
  help,
  children,
}: {
  label: string;
  help: EeaHelp;
  children?: ReactNode;
}) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const tip = tipRef.current;
    if (!trigger || !tip) return;
    placeTip(trigger, tip);
    const on = () => {
      if (triggerRef.current && tipRef.current) placeTip(triggerRef.current, tipRef.current);
    };
    window.addEventListener("scroll", on, true);
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on, true);
      window.removeEventListener("resize", on);
    };
  }, [open]);

  return (
    <span
      className="relative inline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        ref={triggerRef}
        className="cursor-help underline decoration-line-strong decoration-dotted underline-offset-2"
      >
        {children || label}
      </span>
      {open
        ? createPortal(
            <div
              ref={tipRef}
              className="pointer-events-none fixed z-[80] w-80 rounded-lg border border-line bg-surface p-3 text-left shadow-panel"
            >
              <Tip help={help} />
            </div>,
            document.body,
          )
        : null}
    </span>
  );
}

function splitTerms(text: string): ReactNode[] {
  const hits: { start: number; end: number; term: string }[] = [];
  for (const term of EEA_TERMS) {
    let from = 0;
    while (from < text.length) {
      const i = text.indexOf(term, from);
      if (i < 0) break;
      const clash = hits.some((h) => i < h.end && i + term.length > h.start);
      if (!clash) hits.push({ start: i, end: i + term.length, term });
      from = i + term.length;
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - a.end);
  if (!hits.length) return [text];
  const out: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((h, i) => {
    if (h.start < cursor) return;
    if (h.start > cursor) out.push(text.slice(cursor, h.start));
    const help = eeaHelp(h.term);
    out.push(
      help ? (
        <HoverTerm key={`${h.start}-${h.term}`} label={h.term} help={help} />
      ) : (
        h.term
      ),
    );
    cursor = h.end;
    if (i === hits.length - 1 && cursor < text.length) out.push(text.slice(cursor));
  });
  return out;
}

export function EeaText({ text }: { text?: string }) {
  if (!text) return <span className="text-muted">待补</span>;
  const parts = splitTerms(text);
  const only = eeaHelp(text);
  if (parts.length === 1 && typeof parts[0] === "string" && only) {
    return (
      <HoverTerm label={text} help={only}>
        {text}
      </HoverTerm>
    );
  }
  return <span>{parts}</span>;
}
