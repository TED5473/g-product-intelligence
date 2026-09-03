import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChassisDiagram, defaultChassisKey } from "@/components/chassis-diagram";
import { SrcBadge } from "@/components/src-badge";
import { EeaText } from "@/components/eea-text";
import {
  archCompareFor,
  hostedArches,
  type Architecture,
} from "@/lib/catalog";
import {
  TECH_LANES,
  alignLane,
  firstKeyForLane,
  keyToLane,
  laneItems,
  type TechLaneId,
} from "@/lib/arch-tech";
import { useFilters, type AppSearch } from "@/lib/app-search";
import { cn } from "@/lib/utils";

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
  const group = useFilters().group;
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
              "flex h-11 items-center gap-1.5 rounded-sm border px-2 text-[12px] font-medium md:h-9",
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

function Cell({ item }: { item?: { k: string; v: string; s?: string } }) {
  if (!item) {
    return (
      <td className="px-3 py-2 align-top text-muted">
        待补 <SrcBadge source="待补" />
      </td>
    );
  }
  return (
    <td className="px-3 py-2 align-top">
      <div className="flex items-start gap-1.5">
        <div className="min-w-0 flex-1">
          <EeaText text={item.v} />
        </div>
        <SrcBadge source={item.s} />
      </div>
    </td>
  );
}

function LaneTable({
  left,
  right,
  laneId,
}: {
  left: Architecture;
  right: Architecture;
  laneId: TechLaneId;
}) {
  const rows = useMemo(
    () => alignLane(laneItems(left, laneId), laneItems(right, laneId)),
    [left, right, laneId],
  );
  return (
    <table className="w-full min-w-[36rem] text-left text-[12px]">
      <thead>
        <tr className="border-b border-line bg-bg">
          <th className="w-[7.5rem] px-3 py-2 font-medium text-muted">项目</th>
          <th className="px-3 py-2">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <span className="size-2 rounded-xs" style={{ background: left.color }} />
              {left.name}
            </span>
          </th>
          <th className="px-3 py-2">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <span className="size-2 rounded-xs" style={{ background: right.color }} />
              {right.name}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={`${r.k}-${i}`} className="border-b border-line last:border-0">
            <th className="whitespace-nowrap px-3 py-2 align-top font-medium">
              <EeaText text={r.a?.k || r.b?.k || r.k} />
            </th>
            <Cell item={r.a} />
            <Cell item={r.b} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SkateCol({
  arch,
  hsKey,
  onSelect,
}: {
  arch: Architecture;
  hsKey: string | null;
  onSelect: (key: string) => void;
}) {
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
            <ChassisDiagram arch={arch} selected={hsKey} onSelect={onSelect} hideChips />
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
  const group = useFilters().group;
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
  const [lane, setLane] = useState<TechLaneId>("battery");
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

  const applyLane = (next: TechLaneId) => {
    setLane(next);
    setLeftHs(firstKeyForLane(left, next));
    setRightHs(firstKeyForLane(right, next));
  };

  useEffect(() => {
    setLeftHs(firstKeyForLane(left, lane));
    setRightHs(firstKeyForLane(right, lane));
  }, [left.id, right.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const push = (nextLeft: string, nextRight: string) => {
    navigate({
      to: "/architecture",
      search: (prev: AppSearch) => ({ ...prev, id: nextLeft, vs: nextRight }),
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

  if (!left || !right) return <p className="text-[13px] text-muted">当前集团无架构。</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-md border border-line bg-surface px-3 py-3 md:flex-row md:items-end">
        <ArchPicker label="架构 A" value={leftId} other={rightId} onChange={changeLeft} />
        <div className="hidden pb-2 font-mono text-[11px] text-muted md:block">vs</div>
        <ArchPicker label="架构 B" value={rightId} other={leftId} onChange={changeRight} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SkateCol
          arch={left}
          hsKey={leftHs}
          onSelect={(key) => applyLane(keyToLane(key))}
        />
        <SkateCol
          arch={right}
          hsKey={rightHs}
          onSelect={(key) => applyLane(keyToLane(key))}
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {TECH_LANES.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => applyLane(l.id)}
            className={cn(
              "flex h-11 items-center gap-1.5 rounded-sm border px-2.5 text-[12px] font-medium md:h-9",
              lane === l.id ? "border-ink bg-ink text-white" : "border-line bg-surface text-muted hover:text-ink",
            )}
          >
            <span className="font-mono text-[11px] tabular-nums">{l.n}</span>
            {l.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="text-[13px] font-semibold">{laneOfLabel(lane)}</span>
          <span className="text-[12px] text-muted">
            {left.name} vs {right.name} · 项目一一对应 · 待补不编造
          </span>
        </div>
        <LaneTable left={left} right={right} laneId={lane} />
      </div>

      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <div className="border-b border-line px-4 py-2.5 text-[13px] font-semibold">架构总览对照</div>
        <table className="w-full min-w-[28rem] text-left text-[12px]">
          <thead>
            <tr className="border-b border-line bg-bg">
              <th className="w-20 px-3 py-2 font-medium text-muted">对照</th>
              {cols.map((c) => {
                const a = hosted.find((x) => x.id === c.id);
                return (
                  <th key={c.id} className="px-3 py-2">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <span className="size-2 shrink-0 rounded-xs" style={{ background: a?.color }} />
                      {c.name}
                      <span className="font-normal text-muted">{a?.nameZh}</span>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {archCompare.rows
              .filter((r) => r.key !== "models")
              .map((r) => (
                <tr key={r.key} className="border-b border-line last:border-0">
                  <th className="px-3 py-1.5 font-medium">{r.label}</th>
                  {cols.map((c) => {
                    const cell = r.cells[c.id] || { v: "—", s: "待补" };
                    return (
                      <td key={c.id} className="px-3 py-1.5">
                        <span className="mr-1.5">
                          <EeaText text={cell.v || "—"} />
                        </span>
                        <SrcBadge source={cell.s} />
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function laneOfLabel(id: TechLaneId) {
  return TECH_LANES.find((l) => l.id === id)?.label || id;
}
