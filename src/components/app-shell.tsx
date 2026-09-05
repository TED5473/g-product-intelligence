import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { CommandSearch } from "@/components/command-search";
import { APP_NAV, FilterBar } from "@/components/arch-tree";
import { GroupMark } from "@/components/group-mark";
import { GROUPS, groupMeta, stats } from "@/lib/catalog";
import {
  groupSearch,
  useFilters,
  useGroup,
  useVehicleParam,
  type AppSearch,
} from "@/lib/app-search";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

const VehicleSheet = lazy(() =>
  import("@/components/vehicle-sheet").then((m) => ({ default: m.VehicleSheet })),
);

function SheetHost() {
  const v = useVehicleParam();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  // Learn Center uses ?v= for step 4; keep sheet on other routes.
  if (!v || !ready || pathname === "/learn") return null;
  return (
    <Suspense fallback={null}>
      <VehicleSheet />
    </Suspense>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const filters = useFilters();
  const setFilter = useUI((s) => s.setFilter);
  const setGroup = useUI((s) => s.setGroup);
  const group = useGroup();
  const sheetOpen = Boolean(useVehicleParam());
  const inputRef = useRef<HTMLInputElement>(null);
  const s = stats(filters);
  const meta = groupMeta(group);
  const to = (
    pathname === "/architecture" ||
    pathname === "/learn" ||
    pathname === "/relations" ||
    pathname === "/compare"
      ? pathname
      : "/"
  ) as "/" | "/architecture" | "/learn" | "/relations" | "/compare";

  useEffect(() => {
    if (useUI.getState().filters.group !== group) setGroup(group);
  }, [group, setGroup]);

  const setSearchOpen = useUI((s) => s.setSearchOpen);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <header className="sticky top-0 z-30 shrink-0 border-b border-line bg-surface/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
        <div className="flex flex-col gap-2 px-3 py-2 md:h-12 md:flex-row md:flex-nowrap md:items-center md:gap-5 md:px-8 md:py-0">
          <div className="hidden min-w-0 items-center gap-2.5 md:flex">
            <span className="block size-4 shrink-0 rounded-xs bg-accent" />
            <div className="truncate text-[13px] font-semibold tracking-tight">{meta.title}</div>
          </div>
          <div className="relative z-10 flex h-11 w-full shrink-0 items-center rounded-md border border-line bg-bg p-[3px] md:h-9 md:w-auto">
            {GROUPS.map((g) => {
              const on = group === g.id;
              return (
                <Link
                  key={g.id}
                  to={to}
                  preload={false}
                  activeOptions={{ exact: true, includeSearch: true }}
                  search={(prev: AppSearch) => groupSearch(prev, g.id)}
                  aria-pressed={on}
                  className={cn(
                    "relative z-10 flex h-full min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[5px] px-1.5 text-[12px] font-medium tracking-tight no-underline md:flex-none md:px-2.5",
                    on
                      ? "bg-ink text-white shadow-sm"
                      : "text-muted hover:bg-surface hover:text-ink",
                  )}
                >
                  <GroupMark id={g.id} on={on} className="hidden sm:inline-block" />
                  {g.label}
                </Link>
              );
            })}
          </div>
          <div className="hidden min-w-0 flex-1 md:block" />
          <div className="hidden h-8 items-center gap-2.5 rounded-sm border border-line bg-bg px-2.5 font-mono text-[11px] tabular-nums md:flex">
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
          <label className="relative flex h-11 w-full min-w-0 items-center md:h-8 md:w-64 md:shrink-0">
            <Search className="pointer-events-none absolute left-2.5 size-3.5 text-muted" />
            <input
              ref={inputRef}
              type="search"
              value={filters.q}
              onChange={(e) => setFilter("q", e.target.value)}
              placeholder="搜索车型 / 架构 / 电池 / EEA…"
              className="h-full w-full rounded-sm border border-line bg-bg pl-8 pr-3 text-[13px] outline-none focus:border-accent md:pr-12 md:text-[12px]"
            />
            <kbd className="pointer-events-none absolute right-2 hidden rounded-xs border border-line px-1 py-px font-mono text-[10px] text-muted md:inline">
              ⌘K
            </kbd>
          </label>
        </div>
        <FilterBar pathname={pathname} />
      </header>
      <main className="min-w-0 flex-1 px-3 py-4 pb-[calc(5.25rem+env(safe-area-inset-bottom))] md:px-8 md:py-8 md:pb-8">
        {children}
      </main>
      <nav
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
          sheetOpen && "hidden",
        )}
        aria-label="主导航"
      >
        <div className="grid grid-cols-5">
          {APP_NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                search={(prev: AppSearch) => prev}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 no-underline",
                  active ? "text-ink" : "text-muted",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                <span className="text-[11px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <SheetHost />
      <CommandSearch />
    </div>
  );
}
