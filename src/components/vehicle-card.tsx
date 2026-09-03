import { Link } from "@tanstack/react-router";
import { SrcBadge } from "@/components/src-badge";
import { BodyMark } from "@/components/body-mark";
import { ClientImg } from "@/components/client-img";
import type { Vehicle } from "@/lib/catalog";
import { archById, cardPhoto, isPlaceholder } from "@/lib/catalog";
import { marketOffer, offerStatusLabel } from "@/data/markets";
import { useMarket, type AppSearch } from "@/lib/app-search";
import { cn } from "@/lib/utils";

export function VehicleCard({
  v,
}: {
  v: Vehicle;
  onOpen?: (id: string) => void;
  compact?: boolean;
}) {
  const arch = archById(v.arch);
  const pending = isPlaceholder(v);
  const market = useMarket();
  const offer = marketOffer(v, market);
  const price = offer.priceTag || offerStatusLabel(offer, true);
  const local = market !== "CN" && offer.localName && offer.localName !== v.name ? offer.localName : null;
  const src = cardPhoto(v.photo);
  return (
    <Link
      to="."
      preload={false}
      search={(prev: AppSearch) => ({ ...prev, v: v.id })}
      className={cn(
        "group relative flex min-w-0 flex-row overflow-hidden rounded-sm border border-line bg-surface text-left no-underline transition-colors duration-150 hover:z-20 hover:border-line-strong sm:flex-col sm:overflow-visible",
        pending && "border-dashed opacity-80",
      )}
    >
      <div
        className="relative h-[88px] w-[118px] shrink-0 overflow-hidden bg-bg sm:h-[80px] sm:w-full sm:rounded-t-[inherit]"
        style={{
          background: arch
            ? `linear-gradient(180deg, ${arch.color}22, transparent)`
            : undefined,
        }}
      >
        {src ? (
          <ClientImg
            src={`/${src}`}
            alt={v.name}
            width={240}
            height={80}
            className="h-full w-full object-contain object-center duration-200 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-end p-1.5 font-mono text-[10px] text-muted">
            {v.body || "—"}
          </div>
        )}
        <span className="absolute top-1 left-1 origin-top-left scale-90">
          <SrcBadge source={v.source} />
        </span>
        <span className="absolute right-1 bottom-1 z-10 sm:hidden">
          <BodyMark body={v.body} dims={v.detail?.dims} />
        </span>
      </div>
      <span className="absolute top-[66px] right-1 z-20 hidden sm:block">
        <BodyMark body={v.body} dims={v.detail?.dims} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-2.5 py-2 sm:px-2 sm:py-1.5">
        <div className="flex items-baseline justify-between gap-1">
          <div className="min-w-0 truncate text-[13px] font-semibold leading-tight tracking-tight sm:text-[12px]">
            {v.name}
          </div>
          <span
            className={cn(
              "shrink-0 font-mono text-[11px] tabular-nums sm:text-[10px]",
              offer.priceTag ? "text-muted" : "text-muted/80",
            )}
          >
            {price}
          </span>
        </div>
        {local ? <div className="truncate text-[11px] text-muted sm:text-[10px]">当地 {local}</div> : null}
        <div className="truncate font-mono text-[11px] text-muted sm:text-[10px]">
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
          <p className="line-clamp-1 text-[11px] leading-snug text-muted sm:text-[10px]">{v.summary}</p>
        ) : null}
      </div>
    </Link>
  );
}
