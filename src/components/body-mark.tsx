import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { vehicles } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Dims = { l?: number; w?: number; h?: number; wb?: number };

export function parseDims(raw?: unknown): Dims | null {
  if (typeof raw !== "string" || !raw.trim()) return null;
  const s = raw.replace(/,/g, "").replace(/mm/gi, "");
  const out: Dims = {};
  const box = s.match(/~?(\d{4})\s*[×xX]\s*(\d{3,4})\s*[×xX]\s*(\d{3,4})/);
  if (box) {
    out.l = Number(box[1]);
    out.w = Number(box[2]);
    out.h = Number(box[3]);
  } else {
    const L = s.match(/\bL\s*(\d{4})\b/i);
    const W = s.match(/\bW\s*(\d{3,4})\b/i);
    const H = s.match(/\bH\s*(\d{3,4})\b/i);
    if (L) out.l = Number(L[1]);
    if (W) out.w = Number(W[1]);
    if (H) out.h = Number(H[1]);
  }
  const wb = s.match(/(?:WB|轴距)\s*(\d{4})/i);
  if (wb) out.wb = Number(wb[1]);
  return out.l || out.w || out.h || out.wb ? out : null;
}

function span(nums: number[]) {
  if (!nums.length) return null;
  const a = Math.min(...nums);
  const b = Math.max(...nums);
  return a === b ? String(a) : `${a}–${b}`;
}

function classDims(body: string) {
  const parsed = vehicles
    .filter((v) => v.body === body)
    .map((v) => parseDims(v.detail?.dims))
    .filter((d): d is Dims => Boolean(d));
  const pick = (k: keyof Dims) =>
    span(parsed.map((p) => p[k]).filter((n): n is number => typeof n === "number"));
  return { l: pick("l"), w: pick("w"), h: pick("h"), wb: pick("wb") };
}

function Row({ k, v }: { k: string; v?: string | number | null }) {
  if (v == null || v === "") return null;
  return (
    <div className="flex items-baseline justify-between gap-5">
      <span className="text-muted">{k}</span>
      <span className="font-mono tabular-nums whitespace-nowrap">{v} mm</span>
    </div>
  );
}

function TipBody({
  label,
  own,
  cls,
}: {
  label: string;
  own: Dims | null;
  cls: { l: string | null; w: string | null; h: string | null; wb: string | null };
}) {
  const hasOwn = Boolean(own);
  const hasCls = Boolean(cls.l || cls.w || cls.h || cls.wb);
  return (
    <>
      <div className="mb-1 font-mono text-[10px] font-semibold">{label}</div>
      {hasOwn ? (
        <>
          <Row k="长" v={own?.l} />
          <Row k="宽" v={own?.w} />
          <Row k="高" v={own?.h} />
          <Row k="轴距" v={own?.wb} />
        </>
      ) : hasCls ? (
        <>
          <Row k="长" v={cls.l} />
          <Row k="宽" v={cls.w} />
          <Row k="高" v={cls.h} />
          <Row k="轴距" v={cls.wb} />
        </>
      ) : (
        <span className="text-muted">尺寸待补</span>
      )}
    </>
  );
}

const PAD = 10;

function placeTip(trigger: HTMLElement, tip: HTMLElement) {
  const r = trigger.getBoundingClientRect();
  const tw = tip.offsetWidth;
  const th = tip.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top = r.top - th - 6;
  if (top < PAD) top = r.bottom + 6;
  if (top + th > vh - PAD) top = Math.max(PAD, vh - th - PAD);

  let left = r.right - tw;
  if (left < PAD) left = PAD;
  if (left + tw > vw - PAD) left = Math.max(PAD, vw - tw - PAD);

  tip.style.top = `${Math.round(top)}px`;
  tip.style.left = `${Math.round(left)}px`;
}

export function BodyMark({
  body,
  dims,
  className,
  plain,
}: {
  body?: string | null;
  dims?: unknown;
  className?: string;
  plain?: boolean;
}) {
  const label = body || "—";
  const own = parseDims(dims);
  const cls = body ? classDims(body) : { l: null, w: null, h: null, wb: null };
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
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        ref={triggerRef}
        className={
          plain
            ? "cursor-help underline decoration-line-strong decoration-dotted underline-offset-2"
            : "inline-flex cursor-help rounded-xs bg-ink/80 px-1 py-px font-mono text-[9px] tracking-wide text-white"
        }
      >
        {label}
      </span>
      {open
        ? createPortal(
            <div
              ref={tipRef}
              role="tooltip"
              className="pointer-events-none fixed z-[80] w-max min-w-[11rem] rounded-sm border border-line bg-surface px-2.5 py-1.5 text-left text-[11px] leading-snug text-ink shadow-panel"
              style={{ top: 0, left: 0 }}
            >
              <TipBody label={label} own={own} cls={cls} />
            </div>,
            document.body,
          )
        : null}
    </span>
  );
}
