import { SrcBadge } from "@/components/src-badge";
import { BodyMark } from "@/components/body-mark";
import type { Vehicle } from "@/lib/catalog";
import { archById, isPlaceholder, officialFor, mediaFor } from "@/lib/catalog";
import { officialPriceTag } from "@/data/official-intel";
import { cn } from "@/lib/utils";

export function VehicleCard({
  v,
  onOpen,
}: {
  v: Vehicle;
  onOpen: (id: string) => void;
  compact?: boolean;
}) {
  const arch = archById(v.arch);
  const pending = isPlaceholder(v);
  const official = officialPriceTag(officialFor(v).car?.msrp);
  const media = mediaFor(v);
  const price = official || media?.ah?.msrp || media?.dcd?.msrp;
  return (
    <button
      type="button"
      onClick={() => onOpen(v.id)}
      className={cn(
        "group relative flex min-w-0 flex-col overflow-visible rounded-sm border border-line bg-surface text-left transition-colors duration-150 hover:z-20 hover:border-line-strong",
        pending && "border-dashed opacity-80",
      )}
    >
      <div
        className="relative h-[72px] overflow-hidden rounded-t-[inherit] bg-bg sm:h-[80px]"
        style={{
          background: arch
            ? `linear-gradient(180deg, ${arch.color}22, transparent)`
            : undefined,
        }}
      >
        {v.photo ? (
          <img
            src={`/${v.photo}`}
            alt={v.name}
            className="h-full w-full object-contain object-center transition-transform duration-250 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-end p-1.5 font-mono text-[10px] text-muted">
            {v.body || "—"}
          </div>
        )}
        <span className="absolute top-1 left-1 origin-top-left scale-90">
          <SrcBadge source={v.source} />
        </span>
      </div>
      <span className="absolute top-[58px] right-1 z-20 sm:top-[66px]">
        <BodyMark body={v.body} dims={v.detail?.dims} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 px-2 py-1.5">
        <div className="flex items-baseline justify-between gap-1">
          <div className="truncate text-[12px] font-semibold leading-tight tracking-tight">{v.name}</div>
          {price ? (
            <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted">{price}</span>
          ) : null}
        </div>
        <div className="truncate font-mono text-[10px] text-muted">
          {v.brand}
          <span className="text-line-strong"> · </span>
          {v.powertrain || "—"}
          {v.voltageClass ? (
            <>
              <span className="text-line-strong"> · </span>
              {v.voltageClass}
            </>
          ) : null}
        </div>
        {v.summary ? (
          <p className="line-clamp-1 text-[10px] leading-snug text-muted">{v.summary}</p>
        ) : null}
      </div>
    </button>
  );
}
