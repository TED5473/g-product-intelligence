import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { SrcBadge } from "@/components/src-badge";
import { EeaText } from "@/components/eea-text";
import { BodyMark } from "@/components/body-mark";
import {
  carById,
  platById,
  archById,
  relatedIds,
  liveCars,
  TRIM_LABELS,
  DETAIL_LABELS,
  mediaFor,
  type Vehicle,
  type Trim,
} from "@/lib/catalog";
import { OfficialPanel, OfficialStrip, type OfficialLane } from "@/components/official-panel";
import { ahUrl, dcdSearch, dcdUrl, MEDIA_CAPTURED, type MediaTrim } from "@/data/media-intel";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "总览" },
  { id: "official", label: "官网" },
  { id: "media", label: "媒体" },
  { id: "architecture", label: "架构" },
  { id: "powertrain", label: "动力" },
  { id: "battery", label: "电池" },
  { id: "technology", label: "电子电气" },
  { id: "related", label: "同源" },
  { id: "ncap", label: "NCAP" },
] as const;

function Fact({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-line py-2.5 last:border-0">
      <div className="text-[11px] font-medium tracking-wide text-muted uppercase">{k}</div>
      <div className="text-[14px] leading-snug">{children || <span className="text-muted">待补</span>}</div>
    </div>
  );
}

function TrimTable({ v }: { v: Vehicle }) {
  if (!v.trims?.length) {
    return <p className="text-[13px] text-muted">待补</p>;
  }
  const keys = Object.keys(v.trims[0]).filter((k) => k !== "source");
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-left text-[12px]">
        <thead>
          <tr className="border-b border-line text-muted">
            {keys.map((k) => (
              <th key={k} className="px-2 py-1.5 font-medium">
                {TRIM_LABELS[k] || k}
              </th>
            ))}
            <th className="px-2 py-1.5 font-medium">来源</th>
          </tr>
        </thead>
        <tbody>
          {v.trims.map((t: Trim, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {keys.map((k) => (
                <td key={k} className="px-2 py-1.5 font-mono tabular-nums">
                  {t[k] ?? "—"}
                </td>
              ))}
              <td className="px-2 py-1.5">
                <SrcBadge source={t.source || v.source} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MediaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 items-center rounded-sm border border-line px-2.5 text-[12px] hover:border-ink"
    >
      {children}
    </a>
  );
}

function TagRow({ tags }: { tags?: string[] }) {
  const clean = (tags || []).filter((t) => t && !t.includes("None"));
  if (!clean.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {clean.map((t) => (
        <span key={t} className="rounded-sm bg-bg px-1.5 py-0.5 text-[11px] text-muted">
          {t}
        </span>
      ))}
    </div>
  );
}

function KoubeiBars({ items }: { items: { k: string; v: number }[] }) {
  return (
    <div className="mt-3 space-y-1.5">
      {items.map((it) => (
        <div key={it.k} className="flex items-center gap-2 text-[12px]">
          <span className="w-14 shrink-0 text-muted">{it.k}</span>
          <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-bg">
            <div
              className="h-full rounded-full bg-ink/75"
              style={{ width: `${Math.max(0, Math.min(100, (it.v / 5) * 100))}%` }}
            />
          </div>
          <span className="w-8 text-right font-mono tabular-nums">{it.v.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

function DcdTrimTable({ trims }: { trims: MediaTrim[] }) {
  return (
    <table className="w-full text-left text-[12px]">
      <thead>
        <tr className="border-b border-line text-muted">
          <th className="py-1.5 font-medium">配置</th>
          <th className="py-1.5 font-medium">指导价</th>
          <th className="py-1.5 font-medium">车主价</th>
        </tr>
      </thead>
      <tbody>
        {trims.map((t) => (
          <tr key={`${t.year}-${t.name}-${t.msrp}`} className="border-b border-line last:border-0">
            <td className="py-1.5">
              <div>
                {t.year ? `${t.year} ` : ""}
                {t.name}
              </div>
              {t.tags?.length ? (
                <div className="mt-0.5 flex flex-wrap gap-1">
                  {t.tags.filter((x) => x && !x.includes("None")).map((x) => (
                    <span key={x} className="text-[10px] text-muted">
                      {x}
                    </span>
                  ))}
                </div>
              ) : null}
            </td>
            <td className="py-1.5 font-mono tabular-nums">{t.msrp || "—"}</td>
            <td className="py-1.5 font-mono tabular-nums">{t.owner || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MediaStrip({ v, onOpen }: { v: Vehicle; onOpen: () => void }) {
  const media = mediaFor(v);
  if (!media?.ah && !media?.dcd) return null;
  const ah = media.ah;
  const dcd = media.dcd;
  return (
    <section className="rounded-md border border-line bg-bg px-3 py-3">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">媒体</div>
        <div className="font-mono text-[11px] text-muted">之家 / 懂车帝 · {MEDIA_CAPTURED}</div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex min-w-0 flex-wrap gap-x-5 gap-y-2 text-[13px]">
          {ah?.msrp ? (
            <div>
              <div className="text-[11px] text-muted">之家指导价</div>
              <div className="font-mono tabular-nums">{ah.msrp}</div>
            </div>
          ) : null}
          {ah?.score ? (
            <div>
              <div className="text-[11px] text-muted">口碑</div>
              <div className="font-mono tabular-nums">{ah.score}</div>
            </div>
          ) : null}
          {ah?.rangeKm ? (
            <div>
              <div className="text-[11px] text-muted">官方续航</div>
              <div className="font-mono tabular-nums">{ah.rangeKm} km</div>
            </div>
          ) : null}
          {dcd?.msrp ? (
            <div>
              <div className="text-[11px] text-muted">懂车帝</div>
              <div className="font-mono tabular-nums">{dcd.msrp}</div>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="h-8 rounded-sm border border-line bg-surface px-2.5 text-[12px] hover:border-ink"
        >
          对照详情
        </button>
      </div>
    </section>
  );
}

function MediaPanel({ v }: { v: Vehicle }) {
  const media = mediaFor(v);
  const [src, setSrc] = useState<"both" | "ah" | "dcd">("both");
  const [dcdSid, setDcdSid] = useState<string | null>(null);
  const ah = media?.ah;
  const dcd = media?.dcd;
  const showAh = src !== "dcd";
  const showDcd = src !== "ah";

  useEffect(() => {
    setSrc("both");
    setDcdSid(null);
  }, [v.id]);

  const dcdView =
    dcd && dcdSid && dcd.siblings?.find((s) => s.seriesId === dcdSid)
      ? dcd.siblings.find((s) => s.seriesId === dcdSid)
      : dcd
        ? { name: dcd.name, seriesId: dcd.seriesId, msrp: dcd.msrp, trims: dcd.trims }
        : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ["both", "对照"],
            ["ah", "汽车之家"],
            ["dcd", "懂车帝"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSrc(id)}
            className={cn(
              "h-9 rounded-sm px-3 text-[12px] font-medium",
              src === id ? "bg-ink text-white" : "border border-line text-muted hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
        <span className="text-[11px] text-muted">抓取 {MEDIA_CAPTURED} · 公开口径</span>
      </div>

      <div className={cn("grid gap-3", src === "both" ? "md:grid-cols-2" : "grid-cols-1")}>
        {showAh ? (
          <section className="rounded-md border border-line p-4">
            <h3 className="mb-3 text-[13px] font-semibold">汽车之家</h3>
            {ah ? (
              <>
                <div className="grid grid-cols-3 gap-2 text-[13px]">
                  <div>
                    <div className="text-[11px] text-muted">指导价</div>
                    <div className="font-mono tabular-nums">{ah.msrp || "待补"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted">口碑分</div>
                    <div className="font-mono tabular-nums">{ah.score || "待补"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted">官方续航</div>
                    <div className="font-mono tabular-nums">{ah.rangeKm ? `${ah.rangeKm} km` : "—"}</div>
                  </div>
                </div>
                <p className="mt-2 text-[12px] text-muted">
                  {ah.name}
                  {ah.level ? ` · ${ah.level}` : ""}
                  {ah.hotSpec ? ` · 热门 ${ah.hotSpec}` : ""}
                </p>
                <TagRow tags={ah.tags} />
                {ah.koubei?.length ? <KoubeiBars items={ah.koubei} /> : null}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <MediaLink href={ahUrl(ah.seriesId)}>车系首页</MediaLink>
                  <MediaLink href={ahUrl(ah.seriesId, "spec")}>参数配置</MediaLink>
                  <MediaLink href={ahUrl(ah.seriesId, "koubei")}>口碑</MediaLink>
                </div>
              </>
            ) : (
              <p className="text-[13px] text-muted">该车系汽车之家条目待补，不编造。</p>
            )}
          </section>
        ) : null}

        {showDcd ? (
          <section className="rounded-md border border-line p-4">
            <h3 className="mb-3 text-[13px] font-semibold">懂车帝</h3>
            {dcd ? (
              <>
                {dcd.siblings?.length ? (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDcdSid(null)}
                      className={cn(
                        "h-8 rounded-sm px-2.5 text-[12px]",
                        !dcdSid ? "bg-ink text-white" : "border border-line text-muted hover:text-ink",
                      )}
                    >
                      {dcd.name || "在售"}
                      {dcd.msrp ? ` ${dcd.msrp}` : ""}
                    </button>
                    {dcd.siblings.map((s) => (
                      <button
                        key={s.seriesId}
                        type="button"
                        onClick={() => setDcdSid(s.seriesId)}
                        className={cn(
                          "h-8 rounded-sm px-2.5 text-[12px]",
                          dcdSid === s.seriesId
                            ? "bg-ink text-white"
                            : "border border-line text-muted hover:text-ink",
                        )}
                      >
                        {s.name}
                        {s.msrp ? ` ${s.msrp}` : ""}
                      </button>
                    ))}
                  </div>
                ) : dcd.msrp ? (
                  <p className="mb-2 font-mono text-[13px] tabular-nums">{dcd.msrp}</p>
                ) : null}
                {dcdView?.trims?.length ? (
                  <DcdTrimTable trims={dcdView.trims} />
                ) : (
                  <p className="text-[13px] text-muted">该动力分支配置表待补，可打开懂车帝车系页。</p>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <MediaLink href={dcdUrl(dcdView?.seriesId || dcd.seriesId)}>车系页</MediaLink>
                </div>
              </>
            ) : (
              <>
                <p className="text-[13px] text-muted">懂车帝车系 ID 待补。可点搜索打开检索。</p>
                <div className="mt-3">
                  <MediaLink href={dcdSearch(v.name)}>在懂车帝搜索 {v.name}</MediaLink>
                </div>
              </>
            )}
          </section>
        ) : null}
      </div>
      <p className="text-[11px] text-muted">
        之家为厂商指导价区间与口碑；懂车帝为在售配置指导价 / 车主价。同源车系若拆成 DM/EV 可点选切换。与官网限时价可能不同，以各自页面实时为准。
      </p>
    </div>
  );
}

function NcapBlock({ v }: { v: Vehicle }) {
  const n = v.ncap;
  if (!n) return <p className="text-[13px] text-muted">待补</p>;
  return (
    <div className="space-y-3">
      {n.stars == null ? (
        <div className="rounded-md bg-bg px-3 py-2 text-[13px] text-muted">{n.note || "未公布/未测试"}</div>
      ) : (
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-semibold tabular-nums">{n.stars}★</span>
            <span className="text-[12px] text-muted">Euro NCAP {n.year || ""}</span>
            <SrcBadge source={n.source} />
          </div>
          {n.adult != null || n.child != null || n.vru != null || n.assist != null ? (
            <table className="mt-2 w-full text-[13px]">
              <tbody>
                {[
                  ["Adult", n.adult],
                  ["Child", n.child],
                  ["VRU", n.vru],
                  ["Assist", n.assist],
                ].map(([k, val]) => (
                    <tr key={String(k)} className="border-b border-line last:border-0">
                      <th className="w-24 whitespace-nowrap py-1.5 pr-3 text-left font-medium text-muted">
                        {k}
                      </th>
                      <td className="py-1.5">{val != null ? `${val}%` : "—"}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-1 text-[12px] text-muted">分项百分比未收录（仅星级）。</p>
          )}
          {n.note ? <p className="mt-2 text-[12px] text-muted">{n.note}</p> : null}
          {n.url ? (
            <a
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-[12px] text-accent hover:underline"
            >
              euroncap.com
            </a>
          ) : null}
        </div>
      )}
      {v.cNcap ? (
        <div>
          <div className="mb-1 flex items-center gap-2 text-[12px] font-medium">
            C-NCAP <SrcBadge source={v.cNcap.source} />
          </div>
          <p className="text-[13px] text-muted">
            {v.cNcap.stars ? `${v.cNcap.stars}★ · ` : ""}
            {v.cNcap.note || ""}
          </p>
        </div>
      ) : null}
      {v.safetyNarrative ? (
        <div>
          <div className="mb-1 flex items-center gap-2 text-[12px] font-medium">
            {v.safetyNarrative.label || "安全叙事"} <SrcBadge source={v.safetyNarrative.source} />
          </div>
          <p className="text-[13px] text-muted">{v.safetyNarrative.note}</p>
        </div>
      ) : null}
    </div>
  );
}

export function VehicleSheet() {
  const vehicleId = useUI((s) => s.vehicleId);
  const openVehicle = useUI((s) => s.openVehicle);
  const toggleCompare = useUI((s) => s.toggleCompare);
  const compare = useUI((s) => s.compare);
  const filters = useUI((s) => s.filters);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");
  const [officialLane, setOfficialLane] = useState<OfficialLane>("product");
  const v = vehicleId ? carById(vehicleId) : null;

  useEffect(() => {
    setTab("overview");
    setOfficialLane("product");
  }, [vehicleId]);

  const plat = v ? platById(v.platform) : null;
  const arch = v ? archById(v.arch) : null;
  const d = (v?.detail || {}) as Record<string, unknown>;

  const samePlat = useMemo(
    () => (v ? liveCars(filters, (x) => x.platform === v.platform && x.id !== v.id).slice(0, 8) : []),
    [v, filters],
  );

  if (!v) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-ink/40"
        aria-label="Close panel"
        onClick={() => openVehicle(null)}
      />
      <aside
        className="fixed inset-3 z-50 flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-panel sm:inset-y-5 sm:left-1/2 sm:right-auto sm:w-[min(96vw,72rem)] sm:-translate-x-1/2"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-sheet-title"
      >
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="vehicle-sheet-title" className="truncate text-xl font-semibold tracking-tight">
                {v.name}
              </h2>
              <SrcBadge source={v.source} />
            </div>
            <p className="truncate text-[13px] text-muted">
              {v.brand} · {arch ? `${arch.name} ${arch.nameZh}` : v.arch} · {plat?.name || v.platform}
            </p>
          </div>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-sm text-muted hover:bg-bg hover:text-ink"
            onClick={() => openVehicle(null)}
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,1fr)]">
            <div
              className="relative aspect-[16/8] min-h-[200px] bg-bg lg:aspect-auto lg:min-h-[280px]"
              style={{
                background: arch
                  ? `linear-gradient(180deg, ${arch.color}18, transparent)`
                  : undefined,
              }}
            >
              {v.photo ? (
                <img
                  src={`/${v.photo}`}
                  alt={v.name}
                  className="h-full w-full object-contain object-center"
                />
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-x-6 px-5 pt-2 lg:content-start">
              <Fact k="Brand">{v.brand}</Fact>
              <Fact k="Architecture">{arch ? `${arch.name} · ${arch.nameZh}` : v.arch}</Fact>
              <Fact k="Platform">{plat?.name || v.platform}</Fact>
              <Fact k="Segment">
                <BodyMark body={v.body} dims={d.dims} plain />
              </Fact>
              <Fact k="Powertrain">{v.powertrain}</Fact>
              <Fact k="Voltage">{String(d.voltage || v.voltageClass || "待补")}</Fact>
              <Fact k="EEA">
                <EeaText text={v.eea} />
              </Fact>
              <Fact k="Source">
                <SrcBadge source={v.source} />
              </Fact>
            </div>
          </div>
          <div className="mt-1 flex gap-1 overflow-x-auto border-y border-line px-3">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "h-11 shrink-0 px-4 text-[13px] font-medium",
                  tab === t.id
                    ? "border-b-2 border-accent text-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="space-y-4 px-5 py-5 text-[14px]">
            {tab === "overview" ? (
              <>
                <OfficialStrip
                  v={v}
                  onOpen={(lane) => {
                    setOfficialLane(lane);
                    setTab("official");
                  }}
                />
                <MediaStrip v={v} onOpen={() => setTab("media")} />
                {v.summary ? <p>{v.summary}</p> : <p className="text-muted">待补</p>}
                {v.koujing ? (
                  <div className="rounded-md border border-line bg-bg px-3 py-2">
                    <strong>口径差异：</strong>
                    {v.koujing}
                  </div>
                ) : null}
                {v.salesRisk ? (
                  <div className="rounded-md border border-line bg-bg px-3 py-2">
                    <strong>销售风险：</strong>
                    {v.salesRisk}
                  </div>
                ) : null}
                {typeof d.inferredVs7X === "string" ? (
                  <div className="rounded-md border border-line bg-bg px-3 py-2">
                    <SrcBadge source="推断(课件无对比页)" /> {d.inferredVs7X}
                  </div>
                ) : null}
                <div>
                  <h3 className="mb-2 text-[12px] font-semibold tracking-wide text-muted uppercase">
                    配置表
                  </h3>
                  <TrimTable v={v} />
                </div>
                {v.course ? <p className="text-[12px] text-muted">课程：{v.course}</p> : null}
                <NcapBlock v={v} />
              </>
            ) : null}
            {tab === "official" ? (
              <OfficialPanel v={v} lane={officialLane} onLane={setOfficialLane} />
            ) : null}
            {tab === "media" ? <MediaPanel v={v} /> : null}
            {tab === "architecture" ? (
              <>
                <table className="w-full text-[14px]">
                  <tbody>
                    <tr className="border-b border-line">
                      <th className="w-24 whitespace-nowrap py-2.5 pr-4 text-left font-medium text-muted">
                        架构
                      </th>
                      <td>
                        {v.arch} {arch ? `· ${arch.nameZh}` : ""} <SrcBadge source={v.source} />
                      </td>
                    </tr>
                    <tr className="border-b border-line">
                      <th className="w-24 whitespace-nowrap py-2.5 pr-4 text-left font-medium text-muted">
                        平台
                      </th>
                      <td>{plat?.name || v.platform || "待补"}</td>
                    </tr>
                    <tr>
                      <th className="w-24 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        底盘
                      </th>
                      <td>{String(d.chassis || "待补")}</td>
                    </tr>
                  </tbody>
                </table>
                <Link
                  to="/architecture"
                  search={{ id: v.arch }}
                  className="inline-flex h-10 items-center rounded-sm bg-accent px-4 text-[13px] font-medium text-accent-fg no-underline"
                  onClick={() => openVehicle(null)}
                >
                  打开架构图
                </Link>
              </>
            ) : null}
            {tab === "powertrain" ? (
              <table className="w-full text-[14px]">
                <tbody>
                  {[
                    ["动力", v.powertrain || "待补"],
                    ["电压", String(d.voltage || v.voltageClass || "待补")],
                    ["电机", String(d.motors || "待补")],
                  ].map(([k, val]) => (
                    <tr key={String(k)} className="border-b border-line last:border-0">
                      <th className="w-24 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        {k}
                      </th>
                      <td>{String(val || "待补")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
            {tab === "battery" ? (
              <>
                <table className="w-full text-[14px]">
                  <tbody>
                    <tr className="border-b border-line">
                      <th className="w-24 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        电池
                      </th>
                      <td>{String(d.batteryNotes || v.trims?.[0]?.battery || "待补")}</td>
                    </tr>
                    <tr>
                      <th className="w-24 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        续航
                      </th>
                      <td>{String(d.range || v.trims?.[0]?.range || "待补")}</td>
                    </tr>
                  </tbody>
                </table>
                <TrimTable v={v} />
              </>
            ) : null}
            {tab === "technology" ? (
              <>
                <table className="w-full text-[14px]">
                  <tbody>
                    <tr className="border-b border-line">
                      <th className="w-28 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        EEA
                      </th>
                      <td>
                        <EeaText text={v.eea} />
                      </td>
                    </tr>
                    <tr className="border-b border-line">
                      <th className="w-28 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        热管理/HV
                      </th>
                      <td>{String(d.thermal || d.hvLayout || "待补")}</td>
                    </tr>
                    <tr className="border-b border-line">
                      <th className="w-28 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        底盘
                      </th>
                      <td>{String(d.chassis || "待补")}</td>
                    </tr>
                    <tr>
                      <th className="w-28 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        尺寸
                      </th>
                      <td>{String(d.dims || "待补")}</td>
                    </tr>
                  </tbody>
                </table>
                {v.syllabus?.length ? (
                  <div>
                    <h3 className="mb-1 text-[12px] font-semibold text-muted">极氪学课纲摘要</h3>
                    <ul className="list-disc space-y-1 pl-4">
                      {v.syllabus.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {v.course ? <p className="text-[12px] text-muted">课程：{v.course}</p> : null}
              </>
            ) : null}
            {tab === "related" ? (
              <>
                {relatedIds(v).length ? (
                  <div>
                    <h3 className="mb-2 text-[12px] font-semibold text-muted">同源 / 对比</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {relatedIds(v).map((id) => {
                        const c = carById(id);
                        return c ? (
                          <button
                            key={id}
                            type="button"
                            className="rounded-sm border border-line px-2 py-1 text-[12px] hover:border-ink"
                            onClick={() => {
                              setTab("overview");
                              openVehicle(id);
                            }}
                          >
                            {c.name}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                ) : null}
                <div>
                  <h3 className="mb-2 text-[12px] font-semibold text-muted">同平台</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {samePlat.length
                      ? samePlat.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            className="rounded-sm border border-line px-2 py-1 text-[12px] hover:border-ink"
                            onClick={() => {
                              setTab("overview");
                              openVehicle(c.id);
                            }}
                          >
                            {c.name}
                          </button>
                        ))
                      : <span className="text-muted">待补</span>}
                  </div>
                </div>
                {typeof d.homolog === "string" ? (
                  <p className="text-[12px] text-muted">同源：{d.homolog}</p>
                ) : null}
                {typeof d.competitors === "string" ? (
                  <p className="text-[12px] text-muted">竞品：{d.competitors}</p>
                ) : null}
              </>
            ) : null}
            {tab === "ncap" ? <NcapBlock v={v} /> : null}
            {tab !== "overview" && tab !== "ncap" && tab !== "related" && tab !== "official" && tab !== "media" ? (
              <div className="space-y-1">
                {Object.entries(d)
                  .filter(([k, val]) => typeof val === "string" && DETAIL_LABELS[k])
                  .map(([k, val]) => (
                    <p key={k} className="text-[12px] text-muted">
                      {DETAIL_LABELS[k]}：{String(val)}
                    </p>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
        <footer className="flex gap-2 border-t border-line p-4">
          <button
            type="button"
            className={cn(
              "flex h-11 flex-1 items-center justify-center rounded-sm border border-line px-3 text-[14px] font-medium",
              compare.includes(v.id) && "border-accent text-accent",
            )}
            onClick={() => toggleCompare(v.id)}
          >
            {compare.includes(v.id) ? "已加入对比" : "加入对比"}
          </button>
          <Link
            to="/architecture"
            search={{ id: v.arch }}
            className="flex h-11 flex-1 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium text-accent-fg no-underline"
            onClick={() => openVehicle(null)}
          >
            架构拆解
          </Link>
        </footer>
      </aside>
    </>
  );
}
