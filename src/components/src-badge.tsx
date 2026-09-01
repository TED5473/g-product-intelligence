import { cn } from "@/lib/utils";

export function srcClass(s?: string) {
  if (!s) return "tbd";
  if (s.includes("极氪")) return "zk";
  if (s.includes("公开")) return "pub";
  if (s.includes("推断")) return "inf";
  return "tbd";
}

export function SrcBadge({ source, compact }: { source?: string; compact?: boolean }) {
  const kind = srcClass(source);
  if (kind === "zk") {
    return (
      <span
        className="inline-flex h-5 min-w-5 items-center justify-center rounded-xs bg-zk px-1 text-[10px] font-semibold text-white"
        title="极氪学"
      >
        极
      </span>
    );
  }
  if (kind === "pub") {
    return (
      <span
        className="inline-flex h-5 min-w-5 items-center justify-center rounded-xs bg-pub px-1 text-[10px] font-semibold text-white"
        title="公开口径"
      >
        公
      </span>
    );
  }
  const label = source || "待补";
  return (
    <span
      title={label}
      className={cn(
        "inline-flex items-center rounded-xs px-1.5 py-0.5 text-[10px] font-medium",
        kind === "tbd" && "bg-tbd/10 text-tbd",
        kind === "inf" && "bg-inf/10 text-inf",
        compact && "max-w-[4.5rem] truncate",
      )}
    >
      {label}
    </span>
  );
}
