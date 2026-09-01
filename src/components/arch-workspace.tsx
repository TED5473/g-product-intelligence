import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChassisDiagram, defaultChassisKey } from "@/components/chassis-diagram";
import { SrcBadge } from "@/components/src-badge";
import { VehicleCard } from "@/components/vehicle-card";
import {
  archCompareFor,
  hostedArches,
  liveCars,
  platforms,
  type ArchDetailBlock,
  type Architecture,
} from "@/lib/catalog";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

function DetailPanel({ block }: { block: ArchDetailBlock | null }) {
  if (!block) {
    return <p className="text-[13px] text-muted">点选底盘模块查看结构。</p>;
  }
  return (
    <div>
      <h3 className="mb-2 text-[13px] font-semibold tracking-tight">{block.title}</h3>
      {block.items?.length ? (
        <dl className="space-y-2">
          {block.items.map((it) => (
            <div key={it.k} className="border-b border-line pb-2 last:border-0 last:pb-0">
              <dt className="flex items-center gap-2 text-[12px] font-medium">
                {it.k} <SrcBadge source={it.s} />
              </dt>
              <dd className="mt-0.5 text-[12px] text-muted">{it.v}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-[13px] text-muted">待补</p>
      )}
    </div>
  );
}

function ArchPicker({
  label,
  value,
  other,
  onChange,
}: {
  label: string;
  value: string;
  other: string;
  onChange: (id: string) => void;
}) {
  const group = useUI((s) => s.filters.group);
  const arches = hostedArches(group);
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1 text-[11px] font-medium text-muted">{label}</div>
      <div className="flex flex-wrap gap-1">
        {arches.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => onChange(a.id)}
            disabled={a.id === other}
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-sm border px-2 text-[12px] font-medium",
              value === a.id
                ? "border-ink bg-ink text-white"
                : a.id === other
                  ? "cursor-not-allowed border-line text-muted opacity-40"
                  : "border-line bg-surface text-muted hover:text-ink",
            )}
          >
            <span
              className="size-1.5 shrink-0 rounded-xs"
              style={{ background: value === a.id ? "currentColor" : a.color }}
            />
            {a.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function ArchColumn({
  arch,
  hsKey,
  onSelect,
}: {
  arch: Architecture;
  hsKey: string | null;
  onSelect: (key: string) => void;
}) {
  const filters = useUI((s) => s.filters);
  const openVehicle = useUI((s) => s.openVehicle);
  const cars = liveCars(filters, (v) => v.arch === arch.id);
  const split = arch.teardown?.voltageSplit;
  const details = arch.teardown?.details || {};
  const active = hsKey && details[hsKey] ? details[hsKey] : null;

  return (
    <section className="min-w-0 overflow-hidden rounded-lg border border-line bg-surface">
      <div className="flex items-stretch">
        <span className="w-1.5 shrink-0" style={{ background: arch.color }} />
        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between gap-2 px-4 py-3">
            <h2 className="text-lg font-semibold tracking-tight">
              {arch.name}
              <span className="ml-2 text-[13px] font-medium text-muted">{arch.nameZh}</span>
            </h2>
            <SrcBadge source={arch.source} />
          </header>

          <div className="border-t border-line px-4 py-3">
            <ChassisDiagram arch={arch} selected={hsKey} onSelect={onSelect} />
          </div>

          <div className="max-h-48 overflow-auto border-t border-line bg-bg px-4 py-3">
            <DetailPanel block={active} />
          </div>

          {split ? (
            <div className="grid gap-2 border-t border-line px-4 py-3 sm:grid-cols-2">
              {(["v400", "v800"] as const).map((k) => {
                const block = split[k];
                if (!block) return null;
                return (
                  <div key={k}>
                    <div className="text-[11px] font-medium text-muted">{block.label}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {block.models.map((m) => (
                        <span
                          key={m.model}
                          className="rounded-xs bg-surface px-1.5 py-0.5 font-mono text-[11px]"
                        >
                          {m.model} {m.hv}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {arch.teardown?.empBoard ? (
            <div className="border-t border-line px-4 py-3">
              <div className="mb-2 text-[12px] font-semibold">{arch.teardown.empBoard.title}</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="py-1.5 pr-3 font-medium text-muted" />
                      {arch.teardown.empBoard.headers.map((h) => (
                        <th key={h} className="py-1.5 pr-3 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {arch.teardown.empBoard.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-line last:border-0">
                        {row.map((cell, i) =>
                          i === 0 ? (
                            <th key={i} className="whitespace-nowrap py-1.5 pr-3 font-medium text-muted">
                              {cell}
                            </th>
                          ) : (
                            <td key={i} className="py-1.5 pr-3 font-mono tabular-nums">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {arch.teardown.empBoard.footer ? (
                <p className="mt-2 text-[11px] text-muted">{arch.teardown.empBoard.footer}</p>
              ) : null}
            </div>
          ) : null}

          {arch.teardown?.matrix ? (
            <div className="border-t border-line px-4 py-3">
              <div className="mb-2 text-[12px] font-semibold">平台尺寸 / 轴距</div>
              <div className="space-y-3">
                {Object.entries(arch.teardown.matrix).map(([plat, rows]) => (
                  <div key={plat}>
                    <div className="mb-1 text-[11px] font-medium text-muted">{plat}</div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[12px]">
                        <thead>
                          <tr className="border-b border-line text-muted">
                            <th className="py-1 pr-2 font-medium">品牌</th>
                            <th className="py-1 pr-2 font-medium">车型</th>
                            <th className="py-1 pr-2 font-medium">尺寸</th>
                            <th className="py-1 font-medium">轴距</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r) => (
                            <tr key={`${r.brand}-${r.model}`} className="border-b border-line last:border-0">
                              <td className="py-1 pr-2">{r.brand}</td>
                              <td className="py-1 pr-2">{r.model}</td>
                              <td className="py-1 pr-2 font-mono tabular-nums">{r.dim}</td>
                              <td className="py-1 font-mono tabular-nums">{r.wb}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="border-t border-line">
            {(arch.platforms || []).map((pid) => {
              const p = platforms[pid];
              const pcars = cars.filter((c) => c.platform === pid);
              if (!pcars.length) return null;
              return (
                <div key={pid} className="border-b border-line last:border-0">
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <span className="font-medium">{p?.name || pid}</span>
                    <SrcBadge source={p?.source} compact />
                  </div>
                  <div className="px-4 pb-3">
                    {pcars.length ? (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {pcars.map((v) => (
                          <VehicleCard key={v.id} v={v} onOpen={openVehicle} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-[12px] text-muted">待补</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArchWorkspace({
  initialId,
  initialVs,
}: {
  initialId?: string;
  initialVs?: string;
}) {
  const navigate = useNavigate();
  const group = useUI((s) => s.filters.group);
  const hosted = hostedArches(group);
  const ids = hosted.map((a) => a.id);
  const archCompare = archCompareFor(group);
  const fallbackA = ids[0] || "SEA";
  const fallbackB = ids[1] || ids[0] || "GEA";

  const pick = (raw: string | undefined, fallback: string) =>
    raw && ids.includes(raw) ? raw : fallback;

  const [leftId, setLeftId] = useState(() => pick(initialId, fallbackA));
  const [rightId, setRightId] = useState(() => {
    const vs = pick(initialVs, fallbackB);
    return vs === pick(initialId, fallbackA) ? fallbackB : vs;
  });
  const [leftHs, setLeftHs] = useState<string | null>(defaultChassisKey(pick(initialId, fallbackA)));
  const [rightHs, setRightHs] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.includes(leftId) || !ids.includes(rightId) || leftId === rightId) {
      const a = ids[0];
      const b = ids[1] || ids[0];
      if (a) {
        setLeftId(a);
        setRightId(b);
      }
    }
  }, [group]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (initialId && ids.includes(initialId) && initialId !== leftId) {
      setLeftId(initialId);
    }
    if (initialVs && ids.includes(initialVs) && initialVs !== rightId && initialVs !== (initialId || leftId)) {
      setRightId(initialVs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId, initialVs]);

  const left = hosted.find((a) => a.id === leftId) || hosted[0];
  const right = hosted.find((a) => a.id === rightId) || hosted[1] || hosted[0];

  useEffect(() => {
    setLeftHs(defaultChassisKey(left.id));
  }, [left.id]);

  useEffect(() => {
    setRightHs(defaultChassisKey(right.id));
  }, [right.id]);

  const push = (nextLeft: string, nextRight: string) => {
    navigate({
      to: "/architecture",
      search: { id: nextLeft, vs: nextRight },
      replace: true,
    });
  };

  const changeLeft = (id: string) => {
    if (id === rightId) return;
    setLeftId(id);
    push(id, rightId);
  };
  const changeRight = (id: string) => {
    if (id === leftId) return;
    setRightId(id);
    push(leftId, id);
  };

  const cols = useMemo(
    () => archCompare.columns.filter((c) => c.id === left.id || c.id === right.id),
    [left.id, right.id, archCompare],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-md border border-line bg-surface px-3 py-3 md:flex-row md:items-end">
        <ArchPicker label="架构 A" value={leftId} other={rightId} onChange={changeLeft} />
        <div className="hidden pb-2 font-mono text-[11px] text-muted md:block">vs</div>
        <ArchPicker label="架构 B" value={rightId} other={leftId} onChange={changeRight} />
      </div>

      <div className="overflow-x-auto rounded-md border border-line bg-surface">
        <table className="w-full min-w-[28rem] text-left text-[12px]">
          <thead>
            <tr className="border-b border-line">
              <th className="w-20 px-3 py-2 font-medium text-muted">对照</th>
              {cols.map((c) => {
                const a = hosted.find((x) => x.id === c.id);
                return (
                  <th key={c.id} className="px-3 py-2">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <span
                        className="size-2 shrink-0 rounded-xs"
                        style={{ background: a?.color }}
                      />
                      {c.name}
                      <span className="font-normal text-muted">{a?.nameZh}</span>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {archCompare.rows.map((r) => (
              <tr key={r.key} className="border-b border-line last:border-0">
                <th className="px-3 py-1.5 font-medium">{r.label}</th>
                {cols.map((c) => {
                  const cell = r.cells[c.id] || { v: "—", s: "待补" };
                  return (
                    <td key={c.id} className="px-3 py-1.5">
                      <span className="mr-1.5">{cell.v || "—"}</span>
                      <SrcBadge source={cell.s} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ArchColumn arch={left} hsKey={leftHs} onSelect={setLeftHs} />
        <ArchColumn arch={right} hsKey={rightHs} onSelect={setRightHs} />
      </div>
    </div>
  );
}
