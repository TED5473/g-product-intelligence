import { useEffect, useMemo, useState, Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { SrcBadge } from "@/components/src-badge";
import { EeaText } from "@/components/eea-text";
import { ChassisThumb } from "@/components/chassis-diagram";
import { parseDims } from "@/components/body-mark";
import {
  vehicles,
  carById,
  platById,
  archCompareFor,
  hostedArches,
  valOrTbd,
  isPlaceholder,
  architectures,
} from "@/lib/catalog";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

function span(nums: number[]) {
  if (!nums.length) return "待补";
  const a = Math.min(...nums);
  const b = Math.max(...nums);
  return a === b ? `${a}` : `${a}–${b}`;
}

function statsFor(archId: string) {
  const cars = vehicles.filter((v) => v.arch === archId && !isPlaceholder(v));
  const plats = [...new Set(cars.map((c) => c.platform))];
  const pts = [...new Set(cars.map((c) => c.powertrain).filter((x) => x && x !== "—"))];
  const wbs: number[] = [];
  const ls: number[] = [];
  cars.forEach((c) => {
    const d = parseDims(c.detail?.dims);
    if (d?.wb) wbs.push(d.wb);
    if (d?.l) ls.push(d.l);
  });
  return {
    n: cars.length,
    plats: plats.length,
    pt: pts.join(" / ") || "待补",
    wb: span(wbs),
    L: span(ls),
    names: cars.map((c) => c.name).slice(0, 6),
  };
}

function cmpField(id: string, key: string) {
  const c = carById(id);
  if (!c) return "待补";
  const d = (c.detail || {}) as Record<string, unknown>;
  const t0 = c.trims?.[0] || {};
  if (key === "brand") return c.brand;
  if (key === "body") return c.body;
  if (key === "arch") return c.arch;
  if (key === "platform") return platById(c.platform)?.name || c.platform;
  if (key === "powertrain") return c.powertrain;
  if (key === "voltage") return String(d.voltage || c.voltageClass || "");
  if (key === "eea") return c.eea || "";
  if (key === "dims") return String(d.dims || "");
  if (key === "battery") return String(t0.battery || d.batteryNotes || "");
  if (key === "range") return String(t0.range || d.range || "");
  if (key === "adas") return String(t0.adas || d.adas || "");
  if (key === "ncap") {
    if (c.ncap && c.ncap.stars != null)
      return `${c.ncap.stars}★${c.ncap.year ? " " + c.ncap.year : ""}`;
    return c.ncap?.note || "";
  }
  return String((c as unknown as Record<string, unknown>)[key] || "");
}

function tagVals(vals: string[]) {
  const filled = vals.map((v) => valOrTbd(v));
  const uniq = new Set(filled);
  if (uniq.size === 1) return "同";
  if (uniq.size === filled.length) return "各异";
  return "有差";
}

const CAR_ROWS = [
  { key: "brand", label: "品牌" },
  { key: "arch", label: "架构" },
  { key: "platform", label: "平台" },
  { key: "body", label: "车身" },
  { key: "dims", label: "尺寸 / 轴距" },
  { key: "powertrain", label: "动力" },
  { key: "voltage", label: "电压" },
  { key: "eea", label: "EEA" },
  { key: "battery", label: "电池" },
  { key: "range", label: "续航 / 油耗" },
  { key: "adas", label: "智驾" },
  { key: "ncap", label: "NCAP" },
];

export function CompareView() {
  const compare = useUI((s) => s.compare);
  const toggle = useUI((s) => s.toggleCompare);
  const diffOnly = useUI((s) => s.compareDiffOnly);
  const setDiff = useUI((s) => s.setCompareDiffOnly);
  const group = useUI((s) => s.filters.group);
  const [tab, setTab] = useState<"arch" | "car">("arch");
  const [picked, setPicked] = useState<string[]>([]);
  const archCompare = archCompareFor(group);

  const hosted = hostedArches(group);
  const cols = useMemo(() => {
    if (picked.length === 2) return archCompare.columns.filter((c) => picked.includes(c.id));
    return archCompare.columns;
  }, [picked, archCompare]);

  useEffect(() => {
    setPicked([]);
  }, [group]);

  const toggleArch = (id: string) => {
    setPicked((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= 2) return [cur[1], id];
      return [...cur, id];
    });
  };

  const cars = compare.map(carById).filter(Boolean);
  const picker = vehicles.filter((v) => !isPlaceholder(v) && v.group === group);
  const byArch = hosted
    .map((a) => ({ a, cars: picker.filter((v) => v.arch === a.id) }))
    .filter((g) => g.cars.length);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">对比</h1>
          <p className="mt-1 text-[13px] text-muted">
            架构差什么、车型差什么，分栏对照。公开口径标「公」，待补不编造。
          </p>
        </div>
        <div className="flex h-8 overflow-hidden rounded-sm border border-line">
          <button
            type="button"
            className={cn("px-3 text-[12px] font-medium", tab === "arch" ? "bg-ink text-white" : "bg-surface text-muted")}
            onClick={() => setTab("arch")}
          >
            架构
          </button>
          <button
            type="button"
            className={cn("px-3 text-[12px] font-medium", tab === "car" ? "bg-ink text-white" : "bg-surface text-muted")}
            onClick={() => setTab("car")}
          >
            车型
          </button>
        </div>
      </header>

      {tab === "arch" ? (
        <div className="space-y-5">
          <div className="rounded-md border border-line bg-bg px-3 py-2 text-[12px] text-warn">
            {archCompare.trap}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[12px] text-muted">点选两列对照，或看全部</span>
            {hosted.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => toggleArch(a.id)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-[12px] font-medium",
                  picked.includes(a.id) ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink",
                )}
              >
                <span className="size-1.5 rounded-xs" style={{ background: picked.includes(a.id) ? "currentColor" : a.color }} />
                {a.name}
              </button>
            ))}
            {picked.length ? (
              <button type="button" className="h-8 px-2 text-[12px] text-accent hover:underline" onClick={() => setPicked([])}>
                看全部
              </button>
            ) : null}
          </div>

          {picked.length === 2 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {picked.map((id) => {
                const a = architectures.find((x) => x.id === id);
                if (!a) return null;
                const st = statsFor(id);
                return (
                  <Link
                    key={id}
                    to="/architecture"
                    search={{ id, vs: picked.find((x) => x !== id) }}
                    className="overflow-hidden rounded-lg border border-line bg-surface hover:border-ink"
                  >
                    <div className="flex items-center gap-2 px-3 py-2">
                      <span className="size-2 rounded-xs" style={{ background: a.color }} />
                      <span className="font-semibold">{a.name}</span>
                      <span className="text-[12px] text-muted">{a.nameZh}</span>
                      <SrcBadge source={a.source} compact />
                    </div>
                    <div className="h-[88px] border-t border-line bg-bg">
                      <ChassisThumb arch={a} />
                    </div>
                    <dl className="grid grid-cols-4 gap-px border-t border-line bg-line text-center text-[11px]">
                      <div className="bg-surface px-2 py-2">
                        <dt className="text-muted">平台</dt>
                        <dd className="font-mono">{st.plats}</dd>
                      </div>
                      <div className="bg-surface px-2 py-2">
                        <dt className="text-muted">车型</dt>
                        <dd className="font-mono">{st.n}</dd>
                      </div>
                      <div className="bg-surface px-2 py-2">
                        <dt className="text-muted">轴距</dt>
                        <dd className="font-mono">{st.wb}</dd>
                      </div>
                      <div className="bg-surface px-2 py-2">
                        <dt className="text-muted">车长</dt>
                        <dd className="font-mono">{st.L}</dd>
                      </div>
                    </dl>
                  </Link>
                );
              })}
            </div>
          ) : null}

          <div className="overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[56rem] text-left text-[12px]">
              <thead>
                <tr className="border-b border-line bg-bg">
                  <th className="sticky left-0 z-10 bg-bg px-3 py-2.5 font-medium text-muted">维度</th>
                  {cols.map((c) => {
                    const a = hosted.find((x) => x.id === c.id);
                    return (
                      <th key={c.id} className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="size-1.5 rounded-xs" style={{ background: a?.color }} />
                          {c.name}
                        </span>
                        <div className="mt-0.5 font-normal text-[11px] text-muted">{a?.nameZh}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {picked.length !== 2 ? (
                  <tr className="border-b border-line bg-bg/60">
                    <th className="sticky left-0 z-10 bg-bg px-3 py-2 font-medium text-muted">墙上已录</th>
                    {cols.map((c) => {
                      const st = statsFor(c.id);
                      return (
                        <td key={c.id} className="px-3 py-2 font-mono text-[11px] text-muted">
                          {st.plats} 平台 · {st.n} 车 · 轴距 {st.wb} · 车长 {st.L}
                          <div className="mt-0.5 font-sans">{st.pt}</div>
                        </td>
                      );
                    })}
                  </tr>
                ) : null}
                {archCompare.groups.map((g) => (
                  <Fragment key={g.id}>
                    <tr className="border-b border-line bg-bg">
                      <th colSpan={cols.length + 1} className="px-3 py-1.5 text-[11px] font-semibold tracking-wide text-muted">
                        {g.label}
                      </th>
                    </tr>
                    {archCompare.rows
                      .filter((r) => r.group === g.id)
                      .map((r) => {
                        const vals = cols.map((c) => valOrTbd(r.cells[c.id]?.v));
                        const tag = tagVals(vals);
                        if (picked.length === 2 && tag === "同") return null;
                        return (
                          <tr key={r.key} className="border-b border-line align-top last:border-0">
                            <th className="sticky left-0 z-10 whitespace-nowrap bg-surface px-3 py-2.5 font-medium">
                              {r.label}
                              {picked.length === 2 && tag !== "同" ? (
                                <span className="ml-1 text-[10px] font-medium text-warn">{tag}</span>
                              ) : null}
                            </th>
                            {cols.map((c) => {
                              const cell = r.cells[c.id] || { v: "—", s: "待补" };
                              const hi = picked.length === 2 && tag !== "同";
                              return (
                                <td key={c.id} className={cn("px-3 py-2.5", hi && "bg-bg")}>
                                  <div>{cell.v || "—"}</div>
                                  <SrcBadge source={cell.s} compact />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-muted">
            覆盖级别中 SEA 轴距 1800–3300 mm 来自汽车之家车家号公开综述（2021），不是极氪学。墙上已录轴距/车长来自课件或之家配置表。
          </p>
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-[14px] font-semibold">选 2–4 款车</h2>
            <div className="flex rounded-sm border border-line">
              <button
                type="button"
                className={cn("px-3 py-1.5 text-[12px]", diffOnly ? "bg-ink text-white" : "text-muted")}
                onClick={() => setDiff(true)}
              >
                只看差异
              </button>
              <button
                type="button"
                className={cn("px-3 py-1.5 text-[12px]", !diffOnly ? "bg-ink text-white" : "text-muted")}
                onClick={() => setDiff(false)}
              >
                全部字段
              </button>
            </div>
          </div>
          {byArch.map(({ a, cars: list }) => (
            <div key={a.id}>
              <div className="mb-1.5 flex items-center gap-1.5 text-[12px] text-muted">
                <span className="size-1.5 rounded-xs" style={{ background: a.color }} />
                {a.name}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {list.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => toggle(v.id)}
                    className={cn(
                      "rounded-sm border px-2.5 py-1 text-[12px]",
                      compare.includes(v.id) ? "border-ink bg-ink text-white" : "border-line hover:border-ink",
                    )}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="text-[12px] text-muted">{compare.length ? `${compare.length} / 4` : "点选 2–4 款"}</p>
          {cars.length < 2 ? (
            <p className="text-[13px] text-muted">至少选两款才能出对照表。</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-line bg-surface">
              <table className="w-full min-w-[36rem] text-left text-[12px]">
                <thead>
                  <tr className="border-b border-line bg-bg">
                    <th className="px-3 py-2" />
                    {cars.map((c) => (
                      <th key={c!.id} className="px-3 py-2 font-semibold">
                        {c!.name}
                        <div className="mt-1 font-normal">
                          <SrcBadge source={c!.source} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAR_ROWS.map((r) => {
                    const vals = cars.map((c) => cmpField(c!.id, r.key));
                    const tag = tagVals(vals);
                    if (diffOnly && tag === "同") return null;
                    return (
                      <tr key={r.key} className="border-b border-line last:border-0">
                        <th className="px-3 py-2 font-medium">
                          {r.label}{" "}
                          <span
                            className={cn(
                              "ml-1 text-[10px] font-medium",
                              tag === "同" && "text-ok",
                              tag === "各异" && "text-accent",
                              tag === "有差" && "text-warn",
                            )}
                          >
                            {tag}
                          </span>
                        </th>
                        {vals.map((val, i) => (
                          <td key={cars[i]!.id} className={cn("px-3 py-2", tag !== "同" && "bg-bg")}>
                            {r.key === "eea" ? <EeaText text={val} /> : valOrTbd(val)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
