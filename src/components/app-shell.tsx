import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { VehicleSheet } from "@/components/vehicle-sheet";
import { CommandSearch } from "@/components/command-search";
import { FilterBar } from "@/components/arch-tree";
import { GROUPS, groupMeta, stats } from "@/lib/catalog";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const filters = useUI((s) => s.filters);
  const setFilter = useUI((s) => s.setFilter);
  const setGroup = useUI((s) => s.setGroup);
  const inputRef = useRef<HTMLInputElement>(null);
  const s = stats(filters);
  const meta = groupMeta(filters.group);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur-sm">
        <div className="flex h-12 items-center gap-3 px-4 md:gap-5 md:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="block size-4 shrink-0 rounded-xs bg-accent" />
            <div className="truncate text-[13px] font-semibold tracking-tight">{meta.title}</div>
          </div>
          <div className="flex h-8 shrink-0 overflow-hidden rounded-sm border border-line">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGroup(g.id)}
                className={cn(
                  "px-2.5 text-[12px] font-medium",
                  filters.group === g.id ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink",
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div className="min-w-0 flex-1" />
          <div className="flex h-8 items-center gap-2.5 rounded-sm border border-line bg-bg px-2.5 font-mono text-[11px] tabular-nums">
            {[
              ["架构", s.arches],
              ["平台", s.plats],
              ["车型", s.cars],
              ["品牌", s.brands],
            ].map(([k, n]) => (
              <span key={k} className="flex items-baseline gap-1 whitespace-nowrap">
                <span className="text-muted">{k}</span>
                <span className="font-medium text-ink">{n}</span>
              </span>
            ))}
          </div>
          <label className="relative flex h-8 w-[min(100%,16rem)] shrink-0 items-center md:w-64">
            <Search className="pointer-events-none absolute left-2.5 size-3.5 text-muted" />
            <input
              ref={inputRef}
              type="search"
              value={filters.q}
              onChange={(e) => setFilter("q", e.target.value)}
              placeholder="搜索车型 / 架构 / 电池 / EEA…"
              className="h-8 w-full rounded-sm border border-line bg-bg pl-8 pr-12 text-[12px] outline-none focus:border-accent"
            />
            <kbd className="pointer-events-none absolute right-2 hidden rounded-xs border border-line px-1 py-px font-mono text-[10px] text-muted md:inline">
              ⌘K
            </kbd>
          </label>
        </div>
        <FilterBar pathname={pathname} />
      </header>
      <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      <VehicleSheet />
      <CommandSearch />
    </div>
  );
}
