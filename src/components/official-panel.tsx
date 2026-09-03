import { useMemo, useState } from "react";
import {
  MANUAL_KIND,
  OFFICIAL_CAPTURED,
  officialPriceTag,
  serviceGroup,
  splitOfficialHighlights,
  officialFor,
  type OfficialKV,
  type OfficialLink,
} from "@/data/official-intel";
import { brochureFor, BROCHURE_CAPTURED, type BrochureIntel } from "@/data/brochure-intel";
import { vehicles, type Vehicle } from "@/lib/catalog";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

export type OfficialLane = "product" | "manuals" | "service" | "finance";

const LANES: { id: OfficialLane; label: string }[] = [
  { id: "product", label: "产品定位" },
  { id: "manuals", label: "手册保养" },
  { id: "service", label: "售后权益" },
  { id: "finance", label: "金融拥车" },
];

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
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

export function OfficialStrip({
  v,
  onOpen,
}: {
  v: Vehicle;
  onOpen: (lane: OfficialLane) => void;
}) {
  const { brand, car } = officialFor(v);
  if (!brand && !car) return null;
  const tag = officialPriceTag(car?.msrp);
  const pitch = splitOfficialHighlights(car?.highlights).pitch[0] || car?.highlights?.[0];

  return (
    <section className="rounded-md border border-line bg-bg px-3 py-3">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">官网</div>
        <div className="font-mono text-[11px] text-muted">
          {brand?.name} · {brand?.captured || OFFICIAL_CAPTURED}
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[18px] font-semibold tabular-nums tracking-tight">
            {tag || car?.msrp || "价格以官网实时为准"}
          </div>
          {pitch ? <p className="mt-0.5 text-[13px] text-muted">{pitch}</p> : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {LANES.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onOpen(l.id)}
              className="h-8 rounded-sm border border-line bg-surface px-2.5 text-[12px] hover:border-ink"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfficialPanel({
  v,
  lane,
  onLane,
}: {
  v: Vehicle;
  lane: OfficialLane;
  onLane: (lane: OfficialLane) => void;
}) {
  const { brand, car } = officialFor(v);
  const openVehicle = useUI((s) => s.openVehicle);
  const aftersales = [...(brand?.aftersales || []), ...(car?.aftersales || [])];
  const finance = [...(brand?.finance || []), ...(car?.finance || [])];
  const manuals = [...(car?.manuals || []), ...(brand?.manualsHub || [])];
  const { specs, pitch } = splitOfficialHighlights(car?.highlights);
  const groups = useMemo(() => {
    const map = new Map<string, OfficialKV[]>();
    for (const it of aftersales) {
      const g = serviceGroup(it.k);
      const arr = map.get(g) || [];
      arr.push(it);
      map.set(g, arr);
    }
    return [...map.entries()];
  }, [aftersales]);
  const [topic, setTopic] = useState<string | null>(null);
  const activeGroup = groups.find(([g]) => g === topic) || groups[0];
  const siblings = vehicles
    .filter((x) => x.brand === v.brand && x.id !== v.id && x.group === v.group)
    .map((x) => ({ v: x, o: officialFor(x).car }))
    .filter((x) => x.o?.msrp || x.o?.highlights?.length)
    .slice(0, 6);
  const financeLink = manuals.find((m) => /金融|拥车|finance/i.test(m.title));

  if (!brand && !car) {
    return <p className="text-muted">该品牌官网条目待补，不编造。</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {LANES.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => onLane(l.id)}
            className={cn(
              "h-9 rounded-sm px-3 text-[12px] font-medium",
              lane === l.id ? "bg-ink text-white" : "border border-line text-muted hover:text-ink",
            )}
          >
            {l.label}
          </button>
        ))}
        <span className="self-center font-mono text-[11px] text-muted">
          {brand?.name} · {brand?.captured || OFFICIAL_CAPTURED}
        </span>
      </div>

      {lane === "product" ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,14rem)_1fr]">
            <div className="rounded-md border border-line bg-bg px-3 py-3">
              <div className="text-[11px] font-medium tracking-wide text-muted uppercase">官网价格</div>
              <div className="mt-1 font-mono text-[18px] font-semibold tabular-nums">
                {officialPriceTag(car?.msrp) || "待补"}
              </div>
              {car?.msrp ? <p className="mt-1 text-[11px] leading-snug text-muted">{car.msrp}</p> : (
                <p className="mt-1 text-[11px] text-muted">官网未印固定价，不编造。</p>
              )}
            </div>
            <div className="rounded-md border border-line px-3 py-3">
              <div className="text-[11px] font-medium tracking-wide text-muted uppercase">定位</div>
              {pitch.length ? (
                <ul className="mt-1 space-y-1 text-[13px]">
                  {pitch.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-[13px] text-muted">定位句待补。</p>
              )}
            </div>
          </div>
          {specs.length ? (
            <div>
              <div className="mb-1.5 text-[11px] font-medium tracking-wide text-muted uppercase">官网规格</div>
              <div className="flex flex-wrap gap-1.5">
                {specs.map((s) => (
                  <span
                    key={s}
                    className="rounded-sm border border-line bg-bg px-2 py-1 font-mono text-[11px] leading-snug"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-1.5">
            {car?.url ? <ExtLink href={car.url}>打开产品页</ExtLink> : null}
            {brand?.site ? <ExtLink href={brand.site}>{brand.name}官网</ExtLink> : null}
          </div>
          {siblings.length ? (
            <div>
              <div className="mb-1.5 text-[11px] font-medium tracking-wide text-muted uppercase">
                同品牌官网对照
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[22rem] text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-line text-muted">
                      <th className="py-1.5 font-medium">车型</th>
                      <th className="py-1.5 font-medium">官网价</th>
                      <th className="py-1.5 font-medium">定位</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siblings.map((s) => (
                      <tr key={s.v.id} className="border-b border-line last:border-0">
                        <td className="py-1.5">
                          <button
                            type="button"
                            className="text-left hover:underline"
                            onClick={() => openVehicle(s.v.id)}
                          >
                            {s.v.name}
                          </button>
                        </td>
                        <td className="py-1.5 font-mono tabular-nums">
                          {officialPriceTag(s.o?.msrp) || "—"}
                        </td>
                        <td className="py-1.5 text-muted">
                          {splitOfficialHighlights(s.o?.highlights).pitch[0] || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {lane === "manuals" ? (
        <ManualLane manuals={manuals} brandSite={brand?.site} vehicleId={v.id} />
      ) : null}

      {lane === "service" ? (
        <div className="space-y-3">
          {brand?.hotline ? (
            <div className="rounded-md border border-line bg-bg px-3 py-2 font-mono text-[13px]">
              客服 {brand.hotline}
            </div>
          ) : null}
          {groups.length ? (
            <div className="grid gap-3 md:grid-cols-[11rem_1fr]">
              <div className="flex flex-col gap-1">
                {groups.map(([g, items]) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setTopic(g)}
                    className={cn(
                      "h-9 rounded-sm px-2.5 text-left text-[12px] font-medium",
                      (topic || groups[0][0]) === g
                        ? "bg-ink text-white"
                        : "border border-line text-muted hover:text-ink",
                    )}
                  >
                    {g}
                    <span className="ml-1 font-mono text-[10px] opacity-70">{items.length}</span>
                  </button>
                ))}
              </div>
              <div className="rounded-md border border-line px-3 py-3">
                {activeGroup ? (
                  <dl className="space-y-3">
                    {activeGroup[1].map((it) => (
                      <div key={it.k}>
                        <dt className="text-[12px] font-semibold">{it.k}</dt>
                        <dd className="mt-0.5 text-[13px] leading-relaxed text-muted">{it.v}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-muted">待补</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-muted">售后条目待补。</p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {manuals
              .filter((m) => m.kind === "warranty" || m.kind === "service" || /服务|救援/.test(m.title))
              .map((m) => (
                <ExtLink key={m.url} href={m.url}>
                  {m.title}
                </ExtLink>
              ))}
          </div>
        </div>
      ) : null}

      {lane === "finance" ? (
        <div className="space-y-3">
          {finance.length ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {finance.map((it) => (
                <div key={it.k} className="rounded-md border border-line px-3 py-3">
                  <div className="text-[12px] font-semibold">{it.k}</div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{it.v}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">金融条目待补，不编造费率。</p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {financeLink ? <ExtLink href={financeLink.url}>{financeLink.title}</ExtLink> : null}
            {car?.url ? <ExtLink href={car.url}>购车页</ExtLink> : null}
          </div>
        </div>
      ) : null}

      <p className="text-[11px] text-muted">
        摘录自官网 {brand?.captured || OFFICIAL_CAPTURED}，公开口径。活动价与金融方案会变，以页面实时为准。
      </p>
    </div>
  );
}

function brochureBlurb(kind?: OfficialLink["kind"]) {
  if (kind === "owner") return "用户手册 / 车主手册入口。电子版以官网或品牌 App 为准；纸质以随车交付为准。";
  if (kind === "service") return "保养手册 / 保养周期入口。项目与零件建议零售价以授权网点公示为准。";
  if (kind === "warranty") return "质保与道路救援细则页。终身条款有首任车主等限制，点开原文核对。";
  if (kind === "config") return "官网配置表 / 产品手册摘录。SKU 与参数以打开后的实时页面为准，不编造未印数字。";
  if (kind === "brochure") return "产品页入口。卖点与指导价以打开后的实时页面为准。";
  if (kind === "overseas") return "海外产品手册。数字为 WLTP / 当地规格，不与中国 CLTC 混挂。";
  return "官网入口。费率、库存与活动以打开后的实时页面为准。";
}

function BrochureExtract({ b }: { b: BrochureIntel }) {
  return (
    <div className="mt-3 space-y-2 border-t border-line pt-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[11px] font-medium tracking-wide text-muted uppercase">{b.source}摘录</div>
        <span className="font-mono text-[11px] text-muted">
          {BROCHURE_CAPTURED}
          {b.sku ? ` · ${b.sku} SKU` : ""}
        </span>
      </div>
      {b.trims?.length ? (
        <ul className="flex flex-wrap gap-1.5">
          {b.trims.map((t) => (
            <li
              key={`${t.name}-${t.msrp || ""}-${t.power || ""}`}
              className="rounded-sm border border-line px-2 py-1 text-[12px]"
            >
              <span className="font-medium">{t.name}</span>
              {t.msrp ? <span className="ml-1 font-mono tabular-nums text-muted">{t.msrp}</span> : null}
              {t.power ? <span className="ml-1 text-[11px] text-muted">{t.power}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {b.specs.length ? (
        <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
          {b.specs.map((s) => (
            <div key={s.k} className="min-w-0">
              <dt className="text-[11px] text-muted">{s.k}</dt>
              <dd className="font-mono text-[12px] leading-snug tabular-nums">{s.v}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

function ManualLane({
  manuals,
  brandSite,
  vehicleId,
}: {
  manuals: OfficialLink[];
  brandSite?: string;
  vehicleId: string;
}) {
  const [sel, setSel] = useState<string | null>(manuals[0]?.url || null);
  const active = manuals.find((m) => m.url === sel) || manuals[0];
  const brochure = brochureFor(vehicleId).find((b) => b.url === active?.url);
  if (!manuals.length) {
    return (
      <p className="text-muted">
        电子手册目录待补。随车纸质手册仍以交付文件为准。
        {brandSite ? (
          <>
            {" "}
            <a href={brandSite} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              打开官网
            </a>
          </>
        ) : null}
      </p>
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-[13rem_1fr]">
      <div className="flex flex-col gap-1">
        {manuals.map((m) => (
          <button
            key={m.url}
            type="button"
            onClick={() => setSel(m.url)}
            className={cn(
              "min-h-11 rounded-sm px-2.5 py-2 text-left text-[12px] md:min-h-0",
              (sel || manuals[0].url) === m.url
                ? "bg-ink text-white"
                : "border border-line text-muted hover:text-ink",
            )}
          >
            <span className="block font-medium">{m.title}</span>
            <span className="block font-mono text-[10px] opacity-70">
              {MANUAL_KIND[m.kind || "hub"] || m.kind}
            </span>
          </button>
        ))}
      </div>
      {active ? (
        <div className="rounded-md border border-line px-3 py-3">
          <div className="text-[11px] font-medium tracking-wide text-muted uppercase">
            {MANUAL_KIND[active.kind || "hub"]}
          </div>
          <div className="mt-1 text-[14px] font-semibold">{active.title}</div>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">{brochureBlurb(active.kind)}</p>
          {brochure ? <BrochureExtract b={brochure} /> : null}
          <div className="mt-3">
            <ExtLink href={active.url}>打开原文</ExtLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}
