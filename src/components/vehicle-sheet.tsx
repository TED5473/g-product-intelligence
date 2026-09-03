import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { X, ExternalLink } from "lucide-react";
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
  type Vehicle,
  type Trim,
} from "@/lib/catalog";
import { OfficialPanel, OfficialStrip, type OfficialLane } from "@/components/official-panel";
import { MarketPills } from "@/components/market-pills";
import { PriceCompare } from "@/components/price-compare";
import { ahUrl, dcdSearch, dcdUrl, MEDIA_CAPTURED, mediaFor, type MediaTrim } from "@/data/media-intel";
import { CONFIG_TRIMS } from "@/data/config-trims";
import { ProductIntelPanel, productFallback } from "@/components/product-intel-panel";
import { marketMediaHub, marketMeta, marketOffer, nameLine, offerStatusLabel, statusLabel } from "@/data/markets";
import { useFilters, useMarket, useOpenVehicle, useVehicleParam, type AppSearch } from "@/lib/app-search";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "place", label: "定位" },
  { id: "sell", label: "当地售卖" },
  { id: "car", label: "车" },
  { id: "arch", label: "架构与同源" },
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
      className="inline-flex h-11 items-center rounded-sm border border-line px-2.5 text-[12px] hover:border-ink md:h-9"
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
    <div className="overflow-x-auto">
    <table className="w-full min-w-[22rem] text-left text-[12px]">
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
    </div>
  );
}

function MediaStrip({ v, onOpen }: { v: Vehicle; onOpen: () => void }) {
  const market = useMarket();
  const offer = marketOffer(v, market);
  const media = mediaFor(v);
  if (market !== "CN") {
    const meta = marketMeta(market);
    return (
      <section className="rounded-md border border-line bg-bg px-3 py-3">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">
            {meta.name}媒体
          </div>
          <div className="font-mono text-[11px] text-muted">
          {statusLabel(offer.status)} · {offer.captured || MEDIA_CAPTURED}
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex min-w-0 flex-wrap gap-x-5 gap-y-2 text-[13px]">
            <div>
              <div className="text-[11px] text-muted">当地价</div>
              <div className="font-mono tabular-nums">
                {offer.priceTag || offer.price || offerStatusLabel(offer, true)}
              </div>
            </div>
            {offer.mediaName ? (
              <div>
                <div className="text-[11px] text-muted">来源</div>
                <div>{offer.mediaName}</div>
              </div>
            ) : null}
            {media?.ah?.msrp ? (
              <div>
                <div className="text-[11px] text-muted">中国之家对照</div>
                <div className="font-mono tabular-nums">{media.ah.msrp}</div>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="h-11 rounded-sm border border-line bg-surface px-2.5 text-[12px] hover:border-ink md:h-8"
          >
            对照详情
          </button>
        </div>
      </section>
    );
  }
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
  const market = useMarket();
  const offer = marketOffer(v, market);
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

  const ahTrims: MediaTrim[] = (v.trims || []).map((t) => ({
    name: String(t.name || ""),
    msrp: t.msrp,
    year: t.name?.match(/^(20\d{2})/)?.[1],
    tags: [t.drive, t.energy, t.range, t.motors].filter((x): x is string => Boolean(x)),
  }));

  return (
    <div className="space-y-4">
      {market !== "CN" ? (
        <section className="rounded-md border border-line p-4">
          <h3 className="mb-3 text-[13px] font-semibold">{marketMeta(market).name} 当地源</h3>
          <div className="grid grid-cols-3 gap-2 text-[13px]">
            <div>
              <div className="text-[11px] text-muted">当地价</div>
              <div className="font-mono tabular-nums">
                {offer.priceTag || offer.price || offerStatusLabel(offer, true)}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-muted">状态</div>
              <div>{statusLabel(offer.status)}</div>
            </div>
            <div>
              <div className="text-[11px] text-muted">来源</div>
              <div>{offer.mediaName || (offer.kind === "official" ? "当地官网" : "—")}</div>
            </div>
          </div>
          {offer.localName ? (
            <p className="mt-2 text-[12px] text-muted">当地名 {offer.localName}</p>
          ) : null}
          {offer.note ? <p className="mt-1 text-[12px] text-muted">{offer.note}</p> : null}
          {offer.trims?.length ? (
            <table className="mt-3 w-full min-w-[18rem] text-left text-[12px]">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="py-1.5 font-medium">配置</th>
                  <th className="py-1.5 font-medium">价格</th>
                </tr>
              </thead>
              <tbody>
                {offer.trims.map((t) => (
                  <tr key={`${t.name}-${t.price}`} className="border-b border-line last:border-0">
                    <td className="py-1.5">{t.name}</td>
                    <td className="py-1.5 font-mono tabular-nums">{t.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {offer.officialUrl ? <MediaLink href={offer.officialUrl}>当地官网</MediaLink> : null}
            {offer.mediaUrl ? <MediaLink href={offer.mediaUrl}>{offer.mediaName || "当地媒体"}</MediaLink> : null}
            {marketMediaHub(market)
              .filter((l) => l.url !== offer.mediaUrl && l.url !== offer.officialUrl)
              .map((l) => (
                <MediaLink key={l.url} href={l.url}>
                  {l.title}
                </MediaLink>
              ))}
          </div>
        </section>
      ) : null}
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
              "h-11 rounded-sm px-3 text-[12px] font-medium md:h-9",
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
                {ahTrims.length ? (
                  <div className="mt-3">
                    <div className="mb-1 text-[11px] font-medium text-muted">之家参配 · 分配置</div>
                    <DcdTrimTable trims={ahTrims} />
                  </div>
                ) : null}
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
                        "h-11 rounded-sm px-2.5 text-[12px] md:h-8",
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
                          "h-11 rounded-sm px-2.5 text-[12px] md:h-8",
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
                ) : ahTrims.length ? (
                  <div>
                    <p className="mb-2 text-[12px] text-muted">懂车帝车系配置待补。先挂之家参配分配置，不编造懂车帝 ID。</p>
                    <DcdTrimTable trims={ahTrims} />
                  </div>
                ) : (
                  <p className="text-[13px] text-muted">该动力分支配置表待补，可打开懂车帝车系页。</p>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {dcdView?.seriesId || dcd.seriesId ? (
                    <MediaLink href={dcdUrl(dcdView?.seriesId || dcd.seriesId)}>车系页</MediaLink>
                  ) : (
                    <MediaLink href={dcdSearch(v.name)}>在懂车帝搜索 {v.name}</MediaLink>
                  )}
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

function ncapAssessmentHref(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname !== "www.euroncap.com" && u.hostname !== "euroncap.com") return null;
    // Real car page: /assessments/{make}/{model}/{id}/ — never homepage / press / make-only.
    if (!/^\/assessments\/[^/]+\/[^/]+\/[^/]+\/?$/.test(u.pathname)) return null;
    return url;
  } catch {
    return null;
  }
}

function NcapBlock({ v }: { v: Vehicle }) {
  const n = v.ncap;
  if (!n) return <p className="text-[13px] text-muted">待补</p>;
  const href = ncapAssessmentHref(n.url);
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
          {n.note ? <p className="mt-2 text-[12px] text-muted">{n.note}</p> : null}
        </div>
      )}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-line bg-bg px-3 py-2 text-[13px] font-medium text-accent hover:underline"
        >
          euroncap.com
          <ExternalLink className="size-3.5 opacity-70" aria-hidden />
        </a>
      ) : null}
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
  const vehicleId = useVehicleParam();
  const openVehicle = useOpenVehicle();
  const toggleCompare = useUI((s) => s.toggleCompare);
  const compare = useUI((s) => s.compare);
  const filters = useFilters();
  const market = useMarket();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("place");
  const [officialLane, setOfficialLane] = useState<OfficialLane>("product");
  const scrollRef = useRef<HTMLDivElement>(null);
  const raw = vehicleId ? carById(vehicleId) : null;
  const v = raw
    ? raw.trims?.length
      ? raw
      : CONFIG_TRIMS[raw.id]?.length
        ? { ...raw, trims: CONFIG_TRIMS[raw.id] }
        : raw
    : null;

  useEffect(() => {
    setTab("place");
    setOfficialLane("product");
  }, [vehicleId]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [tab]);

  const plat = v ? platById(v.platform) : null;
  const arch = v ? archById(v.arch) : null;
  const d = (v?.detail || {}) as Record<string, unknown>;

  const samePlat = useMemo(
    () => (v ? liveCars(filters, (x) => x.platform === v.platform && x.id !== v.id).slice(0, 8) : []),
    [v, filters],
  );

  if (!v) return null;
  const offer = marketOffer(v, market);
  const aliases = nameLine(v.id);
  const inCompare = compare.includes(v.id);

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-ink/40"
        aria-label="Close panel"
        onClick={() => openVehicle(null)}
      />
      <aside
        className="fixed inset-0 z-50 flex max-h-dvh flex-col overflow-hidden rounded-none border-0 bg-surface shadow-panel sm:inset-y-5 sm:left-1/2 sm:right-auto sm:max-h-[calc(100dvh-1.5rem)] sm:w-[min(96vw,72rem)] sm:-translate-x-1/2 sm:rounded-lg sm:border sm:border-line"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-sheet-title"
      >
        <header className="flex items-start justify-between gap-3 border-b border-line px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pt-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="vehicle-sheet-title" className="truncate text-lg font-semibold tracking-tight sm:text-xl">
                {v.name}
              </h2>
              <SrcBadge source={v.source} />
              {offer.localName && market !== "CN" ? (
                <span className="rounded-sm bg-bg px-1.5 py-0.5 text-[12px] text-muted">
                  当地 {offer.localName}
                </span>
              ) : null}
            </div>
            {aliases ? (
              <p className="mt-0.5 text-[12px] leading-snug text-muted">{aliases}</p>
            ) : (
              <p className="truncate text-[13px] text-muted">
                {v.brand} · {arch ? `${arch.name} ${arch.nameZh}` : v.arch} · {plat?.name || v.platform}
              </p>
            )}
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <MarketPills fill />
              <button
                type="button"
                onClick={() => toggleCompare(v.id)}
                className={cn(
                  "h-11 shrink-0 rounded-sm px-3 text-[13px] font-medium sm:h-10 sm:text-[12px]",
                  inCompare ? "border border-accent text-accent" : "border border-line text-muted hover:text-ink",
                )}
              >
                {inCompare ? "已加入对比" : "加入对比"}
              </button>
            </div>
          </div>
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-sm text-muted hover:bg-bg hover:text-ink"
            onClick={() => openVehicle(null)}
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </header>
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          <div className="border-b border-line px-3 py-3 text-[14px] sm:px-5 sm:py-4">
            <PriceCompare v={v} />
          </div>
          <div
            className="sticky top-0 z-10 flex gap-1 overflow-x-auto border-b border-line bg-surface px-2 sm:px-3"
            aria-label="车型详情"
          >
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
          <div className="space-y-4 px-3 py-4 text-[14px] sm:px-5 sm:py-5">
            {tab === "place" ? (
              <>
                <div
                  className="relative aspect-[16/7] min-h-[120px] overflow-hidden rounded-md bg-bg sm:min-h-[140px]"
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
                <div className="grid grid-cols-2 gap-x-6">
                  <Fact k="Brand">{v.brand}</Fact>
                  <Fact k="Architecture">{arch ? `${arch.name} · ${arch.nameZh}` : v.arch}</Fact>
                  <Fact k="Platform">{plat?.name || v.platform}</Fact>
                  <Fact k="Segment">
                    <BodyMark body={v.body} dims={d.dims} plain />
                  </Fact>
                  <Fact k="Powertrain">{v.powertrain}</Fact>
                  <Fact k="Voltage">{String(d.voltage || v.voltageClass || "待补")}</Fact>
                  <Fact k="尺寸">{String(d.dims || productFallback(v, "dims") || "待补")}</Fact>
                  <Fact k="续航">{String(d.range || productFallback(v, "range") || mediaFor(v)?.ah?.rangeKm || v.trims?.[0]?.range || "待补")}</Fact>
                  <Fact k="电机">{String(d.motors || productFallback(v, "motors") || v.trims?.[0]?.motors || "待补")}</Fact>
                  <Fact k="电池">{String(d.batteryNotes || productFallback(v, "battery") || v.trims?.[0]?.battery || "待补")}</Fact>
                  <Fact k="EEA">
                    <EeaText text={v.eea} />
                  </Fact>
                  <Fact k="Source">
                    <SrcBadge source={v.source} />
                  </Fact>
                </div>
                <ProductIntelPanel v={v} />
                <OfficialStrip
                  v={v}
                  onOpen={(lane) => {
                    setOfficialLane(lane);
                    setTab("sell");
                  }}
                />
                <MediaStrip v={v} onOpen={() => setTab("sell")} />
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
                {v.course ? <p className="text-[12px] text-muted">课程：{v.course}</p> : null}
              </>
            ) : null}
            {tab === "sell" ? (
              <>
                <OfficialPanel v={v} lane={officialLane} onLane={setOfficialLane} />
                <MediaPanel v={v} />
              </>
            ) : null}
            {tab === "car" ? (
              <>
                <table className="w-full text-[14px]">
                  <tbody>
                    {[
                      ["动力", v.powertrain || "待补"],
                      ["电压", String(d.voltage || v.voltageClass || productFallback(v, "hv") || "待补")],
                      ["电机", String(d.motors || productFallback(v, "motors") || "待补")],
                      ["0–100", v.trims?.find((t) => t.acc)?.acc || "待补"],
                      ["驱动", v.trims?.find((t) => t.drive)?.drive || "待补"],
                      ["电池", String(d.batteryNotes || productFallback(v, "battery") || v.trims?.[0]?.battery || "待补")],
                      ["续航", String(d.range || productFallback(v, "range") || v.trims?.[0]?.range || "待补")],
                      [
                        "能源",
                        [...new Set((v.trims || []).map((t) => t.energy).filter(Boolean))].join(" / ") ||
                          v.powertrain ||
                          "待补",
                      ],
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
                      <td>{String(d.thermal || d.hvLayout || productFallback(v, "hv") || "待补")}</td>
                    </tr>
                    <tr className="border-b border-line">
                      <th className="w-28 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        智驾
                      </th>
                      <td>{String(d.adas || productFallback(v, "adas") || "待补")}</td>
                    </tr>
                    <tr>
                      <th className="w-28 whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-muted">
                        尺寸
                      </th>
                      <td>{String(d.dims || productFallback(v, "dims") || "待补")}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <h3 className="mb-2 text-[12px] font-semibold tracking-wide text-muted uppercase">
                    配置表（之家参配 / 懂车帝）
                  </h3>
                  <TrimTable v={v} />
                </div>
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
                <div className="space-y-1">
                  {Object.entries(d)
                    .filter(([k, val]) => typeof val === "string" && DETAIL_LABELS[k])
                    .map(([k, val]) => (
                      <p key={k} className="text-[12px] text-muted">
                        {DETAIL_LABELS[k]}：{String(val)}
                      </p>
                    ))}
                </div>
              </>
            ) : null}
            {tab === "arch" ? (
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
                  search={(prev: AppSearch) => ({ ...prev, id: v.arch, v: undefined })}
                  className="inline-flex h-10 items-center rounded-sm bg-accent px-4 text-[13px] font-medium text-accent-fg no-underline"
                >
                  打开架构图
                </Link>
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
                            className="min-h-11 rounded-sm border border-line px-2.5 text-[12px] hover:border-ink"
                            onClick={() => {
                              setTab("place");
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
                            className="min-h-11 rounded-sm border border-line px-2.5 text-[12px] hover:border-ink"
                            onClick={() => {
                              setTab("place");
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
                <NcapBlock v={v} />
              </>
            ) : null}
          </div>
        </div>
        <footer className="flex gap-2 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4">
          <Link
            to="/architecture"
            search={(prev: AppSearch) => ({ ...prev, id: v.arch, v: undefined })}
            className="flex h-11 flex-1 items-center justify-center rounded-sm bg-accent px-3 text-[14px] font-medium text-accent-fg no-underline"
          >
            架构拆解
          </Link>
        </footer>
      </aside>
    </>
  );
}
