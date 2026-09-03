import { MARKETS } from "@/data/markets";
import { useMarket, useSetMarket } from "@/lib/app-search";
import { cn } from "@/lib/utils";

export function MarketPills({ className, fill }: { className?: string; fill?: boolean }) {
  const market = useMarket();
  const setMarket = useSetMarket();
  return (
    <div
      className={cn("flex flex-wrap items-center gap-1", fill && "w-full", className)}
      role="tablist"
      aria-label="市场"
    >
      {MARKETS.map((m) => {
        const on = market === m.id;
        return (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => setMarket(m.id)}
            className={cn(
              "h-11 min-w-11 rounded-sm px-2.5 text-[12px] font-medium md:h-8",
              fill && "min-w-0 flex-1",
              on ? "bg-ink text-white" : "border border-line text-muted hover:text-ink",
            )}
          >
            {m.name}
          </button>
        );
      })}
    </div>
  );
}
