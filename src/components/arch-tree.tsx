import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronDown, ChevronRight, Columns2, GitBranch, LayoutGrid, Layers, SlidersHorizontal } from "lucide-react";
import { VehicleCard } from "@/components/vehicle-card";
import { SrcBadge } from "@/components/src-badge";
import { ChassisThumb } from "@/components/chassis-thumb";
import {
  archCompareFor,
  buildTree,
  hostedArches,
  uniqueBrands,
  type TreeNode,
} from "@/lib/catalog";
import { useFilters, type AppSearch } from "@/lib/app-search";
import { useUI, type ViewMode } from "@/lib/store";
import { cn } from "@/lib/utils";
import { MarketPills } from "@/components/market-pills";

const MODES: { id: ViewMode; label: string }[] = [
  { id: "hierarchy", label: "层级" },
  { id: "landscape", label: "泳道" },
  { id: "matrix", label: "矩阵" },
];

function BrandArchFilters() {
  const filters = useFilters();
  const setFilter = useUI((s) => s.setFilter);
  const brands = uniqueBrands(filters.group);
  const arches = hostedArches(filters.group);
  return (
    <>
      <button
        type="button"
        onClick={() => setFilter("brand", "")}
        className={cn(
          "h-11 shrink-0 rounded-sm px-2.5 text-[12px] font-medium md:h-8",
          !filters.brand ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink",
        )}
      >
        全部品牌
      </button>
      {brands.map((b) => (
        <button
          key={b}
          type="button"
          onClick={() => setFilter("brand", filters.brand === b ? "" : b)}
          className={cn(
            "h-11 shrink-0 rounded-sm px-2.5 text-[12px] font-medium md:h-8",
            filters.brand === b ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink",
          )}
        >
          {b}
        </button>
      ))}
      <span className="mx-0.5 hidden h-4 w-px shrink-0 bg-line md:block" />
      <button
        type="button"
        onClick={() => setFilter("arch", "")}
        className={cn(
          "h-11 shrink-0 rounded-sm px-2.5 text-[12px] font-medium md:h-8",
          !filters.arch ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink",
        )}
      >
        全部架构
      </button>
      {arches.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={() => setFilter("arch", filters.arch === a.id ? "" : a.id)}
          className={cn(
            "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-sm px-2.5 text-[12px] font-medium md:h-8",
            filters.arch === a.id ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink",
          )}
        >
          <span
            className="size-1.5 rounded-xs"
            style={{ background: filters.arch === a.id ? "currentColor" : a.color }}
          />
          {a.name}
        </button>
      ))}
    </>
  );
}

export const APP_NAV = [
  { to: "/", label: "总览", desk: "Overview", icon: LayoutGrid },
  { to: "/architecture", label: "架构", desk: "Architecture", icon: Layers },
  { to: "/learn", label: "学习", desk: "Learn", icon: BookOpen },
  { to: "/relations", label: "同源", desk: "Relations", icon: GitBranch },
  { to: "/compare", label: "对比", desk: "Compare", icon: Columns2 },
] as const;

export function FilterBar({ pathname = "/" }: { pathname?: string }) {
  const filters = useFilters();
  const setFilter = useUI((s) => s.setFilter);
  const viewMode = useUI((s) => s.viewMode);
  const setViewMode = useUI((s) => s.setViewMode);
  const isOverview = pathname === "/";
  const [more, setMore] = useState(false);
  const extraOn = Boolean(filters.brand || filters.arch);

  useEffect(() => {
    setMore(false);
  }, [pathname]);

  return (
    <div className="border-t border-line bg-surface">
      <div className="hidden flex-wrap items-center gap-1.5 overflow-x-auto px-8 py-2 md:flex">
        <nav className="flex flex-wrap items-center gap-0.5">
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
                  "flex h-8 shrink-0 items-center gap-1.5 rounded-sm px-2.5 text-[12px] font-medium no-underline",
                  active ? "bg-ink text-white" : "text-muted hover:bg-bg hover:text-ink",
                )}
              >
                <Icon className="size-3.5" />
                {item.desk}
              </Link>
            );
          })}
        </nav>
        <span className="mx-0.5 h-4 w-px shrink-0 bg-line" />
        <MarketPills />
        <span className="mx-0.5 h-4 w-px shrink-0 bg-line" />
        <select
          value={filters.pt}
          onChange={(e) => setFilter("pt", e.target.value)}
          className="h-8 shrink-0 rounded-sm border border-line bg-surface px-2 text-[12px]"
        >
          <option value="">动力 · 全部</option>
          <option value="BEV">BEV</option>
          <option value="PHEV">PHEV</option>
          <option value="ICE">ICE/HEV</option>
        </select>
        {isOverview ? (
          <div className="flex h-8 shrink-0 overflow-hidden rounded-sm border border-line">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setViewMode(m.id)}
                className={cn(
                  "px-2.5 text-[12px] font-medium",
                  viewMode === m.id ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        ) : null}
        <span className="mx-0.5 h-4 w-px shrink-0 bg-line" />
        <BrandArchFilters />
      </div>

      <div className="space-y-2 px-3 py-2 md:hidden">
        <MarketPills fill />
        <div className="flex items-center gap-2">
          <select
            value={filters.pt}
            onChange={(e) => setFilter("pt", e.target.value)}
            className="h-11 min-w-0 flex-1 rounded-sm border border-line bg-surface px-2 text-[13px]"
          >
            <option value="">动力 · 全部</option>
            <option value="BEV">BEV</option>
            <option value="PHEV">PHEV</option>
            <option value="ICE">ICE/HEV</option>
          </select>
          <button
            type="button"
            onClick={() => setMore((v) => !v)}
            aria-expanded={more}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-1 rounded-sm border px-3 text-[12px] font-medium",
              more || extraOn ? "border-ink bg-ink text-white" : "border-line text-muted",
            )}
          >
            <SlidersHorizontal className="size-3.5" />
            筛选
            {extraOn ? <span className="font-mono tabular-nums">·</span> : null}
          </button>
        </div>
        {isOverview ? (
          <div className="flex h-11 overflow-hidden rounded-sm border border-line">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setViewMode(m.id)}
                className={cn(
                  "min-w-0 flex-1 text-[13px] font-medium",
                  viewMode === m.id ? "bg-ink text-white" : "bg-surface text-muted",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        ) : null}
        {more || extraOn ? (
          <div className="flex flex-wrap gap-1.5">
            <BrandArchFilters />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ArchBlock({ node }: { node: TreeNode }) {
  const collapsedArch = useUI((s) => s.collapsedArch);
  const collapsedPlat = useUI((s) => s.collapsedPlat);
  const toggleArch = useUI((s) => s.toggleArch);
  const togglePlat = useUI((s) => s.togglePlat);
  const setFilter = useUI((s) => s.setFilter);
  const filters = useFilters();
  const open = !collapsedArch[node.arch.id];
  const a = node.arch;

  return (
    <section className="mb-8 overflow-hidden rounded-lg border border-line bg-surface">
      <header className="flex flex-wrap items-center gap-2 py-2 pr-3">
        <span className="self-stretch w-1.5 shrink-0" style={{ background: a.color }} />
        <button
          type="button"
          onClick={() => toggleArch(a.id)}
          className="flex min-h-11 min-w-0 flex-1 items-center gap-2 px-2 text-left sm:px-3"
        >
          {open ? (
            <ChevronDown className="size-4 shrink-0 text-muted" />
          ) : (
            <ChevronRight className="size-4 shrink-0 text-muted" />
          )}
          <span className="text-lg font-semibold tracking-tight">{a.name}</span>
          <span className="hidden text-[13px] text-muted sm:inline">{a.nameZh}</span>
          <SrcBadge source={a.source} />
        </button>
        <Link
          to="/architecture"
          preload={false}
          title="查看架构"
          className="h-10 w-[6.5rem] shrink-0 overflow-hidden rounded-sm border border-line bg-bg no-underline hover:border-ink sm:h-10 sm:w-[7.5rem]"
          search={(prev: AppSearch) => ({ ...prev, id: a.id })}
        >
          <ChassisThumb arch={a} />
        </Link>
        <button
          type="button"
          className="h-11 shrink-0 rounded-sm px-2.5 text-[12px] text-accent hover:bg-bg hover:underline md:h-8"
          onClick={() => setFilter("arch", filters.arch === a.id ? "" : a.id)}
        >
          {filters.arch === a.id ? "取消筛选" : "只看此架构"}
        </button>
      </header>
      {open
        ? node.platforms.map((p) => {
            const platOpen = !collapsedPlat[p.plat.id];
            return (
              <div key={p.plat.id} className="flex flex-col border-t border-line sm:flex-row">
                <button
                  type="button"
                  onClick={() => togglePlat(p.plat.id)}
                  className="flex min-h-11 w-full shrink-0 flex-col items-start gap-0.5 px-4 py-3 text-left sm:w-44"
                >
                  <span className="flex items-center gap-1 text-[13px] font-semibold">
                    {platOpen ? (
                      <ChevronDown className="size-3.5 text-muted" />
                    ) : (
                      <ChevronRight className="size-3.5 text-muted" />
                    )}
                    {p.plat.name}
                  </span>
                  <span className="line-clamp-2 pl-4 text-[11px] text-muted">{p.plat.desc}</span>
                </button>
                {platOpen ? (
                  <div className="min-w-0 flex-1 p-2.5 pt-0 sm:pt-2.5">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                      {p.cars.map((v) => (
                        <VehicleCard key={v.id} v={v} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-11 min-w-0 flex-1 items-center px-4 pb-3 text-[12px] text-muted sm:px-3 sm:py-3">
                    {p.cars.length} 款
                  </div>
                )}
              </div>
            );
          })
        : null}
    </section>
  );
}

function Landscape() {
  const filters = useFilters();
  const tree = useMemo(() => buildTree(filters), [filters]);

  return (
    <div className="space-y-3">
      {tree.map((node) => {
        const a = node.arch;
        return (
          <section key={a.id} className="overflow-hidden rounded-lg border border-line bg-surface">
            <header className="flex flex-wrap items-center gap-2 border-b border-line px-3 py-2">
              <span className="size-2 shrink-0 rounded-xs" style={{ background: a.color }} />
              <span className="font-semibold">{a.name}</span>
              <span className="text-[12px] text-muted">{a.nameZh}</span>
              <SrcBadge source={a.source} />
              <Link
                to="/architecture"
                preload={false}
                title="查看架构"
                className="h-9 w-[6.5rem] shrink-0 overflow-hidden rounded-sm border border-line bg-bg no-underline hover:border-ink"
                search={(prev: AppSearch) => ({ ...prev, id: a.id })}
              >
                <ChassisThumb arch={a} />
              </Link>
              <span className="ml-auto font-mono text-[11px] text-muted">
                {node.platforms.length} 平台 · {node.carCount} 车
              </span>
            </header>
            <div className="flex flex-col gap-px bg-line sm:flex-row sm:flex-wrap">
              {node.platforms.map((p) => (
                <div key={p.plat.id} className="min-w-0 w-full bg-surface p-2.5 sm:min-w-[16rem] sm:flex-1">
                  <div className="mb-2 text-[12px] font-semibold">
                    {p.plat.name}
                    <span className="ml-1 font-normal text-muted">{p.plat.desc}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {p.cars.map((v) => (
                      <VehicleCard key={v.id} v={v} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Matrix() {
  const group = useFilters().group;
  const archCompare = archCompareFor(group);
  const cols = archCompare.columns;
  const hosted = hostedArches(group);

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <table className="w-full min-w-[36rem] text-left text-[12px]">
        <thead>
          <tr className="border-b border-line bg-bg">
            <th className="px-3 py-2.5 font-medium text-muted">维度</th>
            {cols.map((c) => {
              const a = hosted.find((x) => x.id === c.id);
              return (
                <th key={c.id} className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-xs" style={{ background: a?.color }} />
                    {c.name}
                  </span>
                  <div className="mt-0.5 text-[11px] font-normal text-muted">{a?.nameZh}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {archCompare.rows.map((row) => (
            <tr key={row.key} className="border-b border-line last:border-0">
              <th className="whitespace-nowrap px-3 py-2 font-medium text-muted">{row.label}</th>
              {cols.map((c) => {
                const cell = row.cells[c.id];
                return (
                  <td key={c.id} className="px-3 py-2">
                    <span>{cell?.v || "待补"}</span>
                    {cell?.s ? (
                      <span className="ml-1 align-middle">
                        <SrcBadge source={cell.s} compact />
                      </span>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {archCompare.trap ? (
        <p className="border-t border-line px-3 py-2 text-[12px] text-muted">{archCompare.trap}</p>
      ) : null}
    </div>
  );
}

export function ArchTree() {
  const filters = useFilters();
  const viewMode = useUI((s) => s.viewMode);
  const tree = useMemo(() => buildTree(filters), [filters]);

  if (viewMode === "landscape") return <Landscape />;
  if (viewMode === "matrix") return <Matrix />;

  if (!tree.length) {
    return <p className="text-[13px] text-muted">当前筛选无车型。</p>;
  }

  return (
    <div>
      {tree.map((node) => (
        <ArchBlock key={node.arch.id} node={node} />
      ))}
    </div>
  );
}
