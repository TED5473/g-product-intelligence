import { useMemo } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SrcBadge } from "@/components/src-badge";
import { VehicleCard } from "@/components/vehicle-card";
import { isGroupId, hostedArches, type GroupId } from "@/lib/catalog";
import { isMarketId, type MarketId } from "@/data/markets";
import {
  WALL_TRAP_LINE,
  academyFactsForVehicle,
  academyTrapsForVehicle,
  flashcardsForVehicle,
  isLearnPriority,
  learnKeySpecs,
  learnPath,
  learnSearchForVehicle,
  priorityVehicles,
} from "@/lib/learn";
import { carById, platById, archById } from "@/lib/catalog";
import { useGroup, type AppSearch } from "@/lib/app-search";
import { cn } from "@/lib/utils";

type LearnSearch = {
  g?: GroupId;
  v?: string;
  a?: string;
  p?: string;
  m?: MarketId;
};

export const Route = createFileRoute("/learn")({
  validateSearch: (s: Record<string, unknown>): LearnSearch => ({
    g: isGroupId(s.g) ? s.g : undefined,
    v: typeof s.v === "string" && s.v ? s.v : undefined,
    a: typeof s.a === "string" && s.a ? s.a : undefined,
    p: typeof s.p === "string" && s.p ? s.p : undefined,
    m: isMarketId(s.m) ? s.m : undefined,
  }),
  component: LearnPage,
});

const STEPS = [
  { id: 1, label: "架构" },
  { id: 2, label: "平台" },
  { id: 3, label: "车型" },
  { id: 4, label: "参数/性能" },
] as const;

function LearnPage() {
  const group = useGroup();
  const { a, p, v } = Route.useSearch();
  const vehicleId = v || "";
  const vehicle = vehicleId ? carById(vehicleId) : undefined;
  // Infer arch/platform from vehicle when deep-linked via ?v=
  const archId = a || vehicle?.arch || "";
  const platId = p || vehicle?.platform || "";

  const priority = useMemo(() => priorityVehicles(group), [group]);
  const arches = useMemo(() => {
    const list = hostedArches(group);
    const hot = new Set(priority.map((v) => v.arch));
    return list.slice().sort((a, b) => {
      const pa = hot.has(a.id) ? 0 : 1;
      const pb = hot.has(b.id) ? 0 : 1;
      return pa - pb;
    });
  }, [group, priority]);
  const path = useMemo(
    () => (archId ? learnPath(archId, group) : null),
    [archId, group],
  );
  const platNode = path?.platforms.find((x) => x.plat.id === platId) || null;
  const selectedArch = archId ? archById(archId) : undefined;
  const selectedPlat = platId ? platById(platId) : undefined;

  const step = vehicle ? 4 : platId && archId ? 3 : archId ? 2 : 1;

  const facts = vehicle ? academyFactsForVehicle(vehicle) : [];
  const traps = vehicle ? academyTrapsForVehicle(vehicle) : [];
  const cards = vehicle ? flashcardsForVehicle(vehicle) : [];
  const specs = vehicle ? learnKeySpecs(vehicle) : [];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <header className="flex flex-col gap-1">
        <h1 className="text-[18px] font-semibold tracking-tight">学习中心</h1>
        <p className="text-[13px] text-muted">
          自上而下：架构 → 平台 → 车型 → 参数。数字仅来自公开口径与极氪学种子，不编造。
        </p>
      </header>

      {step === 1 && priority.length > 0 ? (
        <section className="flex flex-col gap-2 rounded-sm border border-accent/25 bg-accent/5 p-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-[13px] font-semibold text-accent">重点车型速通</h2>
            <span className="text-[11px] text-muted">08 · Z20 · 20 · 900</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {priority.map((car) => (
              <Link
                key={car.id}
                to="/learn"
                search={(prev: AppSearch) => learnSearchForVehicle(car, prev)}
                className="flex flex-col gap-1 rounded-sm border border-line bg-surface px-3 py-2.5 no-underline transition-colors hover:border-accent"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold tracking-tight">{car.name}</span>
                  <span className="ml-auto">
                    <SrcBadge source={car.source} />
                  </span>
                </div>
                <p className="text-[11px] text-muted">
                  {car.arch} → {car.platform} → 参数
                </p>
                {car.summary ? (
                  <p className="line-clamp-2 text-[11px] leading-relaxed text-muted">{car.summary}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <nav
        aria-label="学习步骤"
        className="flex flex-wrap items-center gap-1 rounded-sm border border-line bg-surface p-1.5"
      >
        {STEPS.map((s, i) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <div key={s.id} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight className="size-3.5 text-muted" /> : null}
              <span
                className={cn(
                  "inline-flex h-8 items-center rounded-sm px-2.5 text-[12px] font-medium",
                  active && "bg-ink text-white",
                  done && !active && "bg-accent/10 text-accent",
                  !active && !done && "text-muted",
                )}
              >
                {s.id}. {s.label}
              </span>
            </div>
          );
        })}
      </nav>

      {(selectedArch || selectedPlat || vehicle) && (
        <div className="flex flex-wrap items-center gap-1.5 text-[12px] text-muted">
          <Link
            to="/learn"
            search={(prev: AppSearch) => ({
              ...prev,
              a: undefined,
              p: undefined,
              v: undefined,
            })}
            className="rounded-sm px-1.5 py-0.5 hover:bg-bg hover:text-ink"
          >
            重置
          </Link>
          {selectedArch ? (
            <>
              <ChevronRight className="size-3" />
              <Link
                to="/learn"
                search={(prev: AppSearch) => ({
                  ...prev,
                  a: selectedArch.id,
                  p: undefined,
                  v: undefined,
                })}
                className="rounded-sm px-1.5 py-0.5 font-medium text-ink hover:bg-bg"
              >
                {selectedArch.name}
              </Link>
            </>
          ) : null}
          {selectedPlat ? (
            <>
              <ChevronRight className="size-3" />
              <Link
                to="/learn"
                search={(prev: AppSearch) => ({
                  ...prev,
                  a: selectedArch?.id,
                  p: selectedPlat.id,
                  v: undefined,
                })}
                className="rounded-sm px-1.5 py-0.5 font-medium text-ink hover:bg-bg"
              >
                {selectedPlat.name}
              </Link>
            </>
          ) : null}
          {vehicle ? (
            <>
              <ChevronRight className="size-3" />
              <span className="rounded-sm px-1.5 py-0.5 font-medium text-ink">{vehicle.name}</span>
            </>
          ) : null}
        </div>
      )}

      {step === 1 && (
        <section className="grid gap-2 sm:grid-cols-2">
          {arches.map((arch) => (
            <Link
              key={arch.id}
              to="/learn"
              search={(prev: AppSearch) => ({
                ...prev,
                a: arch.id,
                p: undefined,
                v: undefined,
              })}
              className="flex flex-col gap-2 rounded-sm border border-line bg-surface p-3 no-underline transition-colors hover:border-line-strong"
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-xs"
                  style={{ background: arch.color }}
                />
                <span className="text-[14px] font-semibold tracking-tight">
                  {arch.name}
                  {arch.nameZh ? (
                    <span className="ml-1.5 text-[12px] font-normal text-muted">
                      {arch.nameZh}
                    </span>
                  ) : null}
                </span>
                <span className="ml-auto">
                  <SrcBadge source={arch.source} />
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-muted">{arch.note}</p>
            </Link>
          ))}
        </section>
      )}

      {step === 2 && path && (
        <section className="flex flex-col gap-2">
          <p className="text-[13px] text-muted">
            选择 {path.arch.name} 下的平台
          </p>
          {path.platforms.length === 0 ? (
            <p className="text-[13px] text-muted">该架构暂无平台条目。</p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {path.platforms.map(({ plat, cars }) => (
                <Link
                  key={plat.id}
                  to="/learn"
                  search={(prev: AppSearch) => ({
                    ...prev,
                    a: path.arch.id,
                    p: plat.id,
                    v: undefined,
                  })}
                  className="flex flex-col gap-1.5 rounded-sm border border-line bg-surface p-3 no-underline transition-colors hover:border-line-strong"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold">{plat.name}</span>
                    <span className="ml-auto">
                      <SrcBadge source={plat.source} />
                    </span>
                  </div>
                  <p className="text-[12px] text-muted">{plat.desc || "—"}</p>
                  <p className="font-mono text-[11px] text-muted tabular-nums">
                    {cars.length} 款车型
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {step === 3 && platNode && (
        <section className="flex flex-col gap-3">
          <p className="text-[13px] text-muted">
            {selectedArch?.name} · {platNode.plat.name} — 点击卡片打开车型详情，并进入参数学习
          </p>
          {platNode.cars.length === 0 ? (
            <p className="text-[13px] text-muted">该平台暂无车型。</p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {platNode.cars.map((car) => (
                <div
                  key={car.id}
                  className="flex flex-col gap-2 rounded-sm border border-line bg-surface p-3"
                >
                  <VehicleCard v={car} />
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/learn"
                      search={(prev: AppSearch) => ({
                        ...prev,
                        a: path?.arch.id || car.arch,
                        p: platNode.plat.id,
                        v: car.id,
                      })}
                      className="inline-flex h-9 flex-1 items-center justify-center rounded-sm bg-ink px-2.5 text-[12px] font-medium text-white no-underline"
                    >
                      {isLearnPriority(car.id) ? "重点 · 学习参数" : "学习参数"}
                    </Link>
                    <Link
                      to="/"
                      search={(prev: AppSearch) => ({ ...prev, v: car.id })}
                      className="inline-flex h-9 items-center justify-center rounded-sm border border-line px-2.5 text-[12px] text-muted no-underline hover:text-ink"
                    >
                      车型页
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {step === 4 && vehicle && (
        <section className="flex flex-col gap-4">
          <div className="rounded-sm border border-warn/30 bg-warn/5 px-3 py-2.5">
            <div className="mb-1 text-[11px] font-semibold tracking-wide text-warn uppercase">
              陷阱
            </div>
            <p className="text-[12px] leading-relaxed text-ink">{WALL_TRAP_LINE}</p>
          </div>

          {traps.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[13px] font-semibold">相关陷阱（极氪学）</h2>
              <ul className="flex flex-col gap-2">
                {traps.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-sm border border-line bg-surface px-3 py-2.5 text-[12px]"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-medium text-warn">错：{t.wrong}</span>
                      <SrcBadge source={t.sourceBadge} />
                    </div>
                    <div className="text-ink">对：{t.right}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h2 className="text-[13px] font-semibold">
              关键参数 · {vehicle.name}
              <span className="ml-2 align-middle">
                <SrcBadge source={vehicle.source} />
              </span>
            </h2>
            <div className="overflow-hidden rounded-sm border border-line bg-surface">
              {specs.map((row) => (
                <div
                  key={`${row.k}-${row.v}`}
                  className="flex flex-col gap-0.5 border-b border-line px-3 py-2.5 last:border-0 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <div className="w-24 shrink-0 text-[11px] font-medium tracking-wide text-muted uppercase">
                    {row.k}
                  </div>
                  <div className="min-w-0 text-[13px] leading-snug">{row.v}</div>
                </div>
              ))}
            </div>
          </div>

          {facts.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[13px] font-semibold">极氪学要点</h2>
              <ul className="flex flex-col gap-1.5">
                {facts.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-start gap-2 rounded-sm border border-line bg-surface px-3 py-2 text-[12px]"
                  >
                    <SrcBadge source={f.sourceBadge} />
                    <div className="min-w-0">
                      <div className="font-medium text-muted">{f.topic}</div>
                      <div className="leading-relaxed text-ink">{f.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cards.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[13px] font-semibold">相关闪卡</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {cards.slice(0, 8).map((fc) => (
                  <li
                    key={fc.id}
                    className="rounded-sm border border-line bg-surface px-3 py-2.5 text-[12px]"
                  >
                    <div className="mb-1 flex items-center gap-2 font-medium">
                      {fc.q}
                      <span className="ml-auto">
                        <SrcBadge source={fc.source} />
                      </span>
                    </div>
                    <p className="leading-relaxed text-muted">{fc.a}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-[11px] text-muted">
            完整车型页可通过顶栏搜索或关闭详情抽屉后继续在本页学习。打开详情：
            <Link
              to="/learn"
              search={(prev: AppSearch) => ({ ...prev, v: vehicle.id })}
              className="ml-1 text-accent underline"
            >
              ?v={vehicle.id}
            </Link>
          </p>
        </section>
      )}
    </div>
  );
}
