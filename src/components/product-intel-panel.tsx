import { PRODUCT_CAPTURED, productFor, type CmfSwatch, type ProductIntel } from "@/data/product-intel";
import { officialFor } from "@/data/official-intel";
import { brochureFor, BROCHURE_CAPTURED, type BrochureIntel } from "@/data/brochure-intel";
import { SrcBadge } from "@/components/src-badge";
import type { Vehicle } from "@/lib/catalog";

function Swatch({ c }: { c: CmfSwatch }) {
  return (
    <li className="flex min-w-0 items-center gap-1.5">
      <span
        className="size-4 shrink-0 rounded-full border border-line"
        style={c.hex ? { background: c.hex } : undefined}
        title={c.hex || c.name}
        aria-hidden
      />
      <span className="truncate text-[12px]">{c.name}</span>
      {c.extra ? <span className="shrink-0 text-[10px] text-muted">{c.extra}</span> : null}
    </li>
  );
}

function Pitch({ v, intel }: { v: Vehicle; intel: ProductIntel }) {
  const { car } = officialFor(v);
  const pitch = (car?.highlights || []).filter((h) => h && h.length < 90).slice(0, 10);
  const chips = [
    intel.hv ? `高压 ${intel.hv}` : null,
    intel.batteryTech || null,
    intel.adas || null,
  ].filter((x): x is string => Boolean(x));
  if (!pitch.length && !intel.performance?.length && !intel.tech?.length && !chips.length) return null;
  return (
    <section className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[12px] font-semibold tracking-wide text-muted uppercase">卖点 / 性能 / 技术</h3>
        <SrcBadge source={intel.source} />
      </div>
      {pitch.length ? (
        <ul className="flex flex-wrap gap-1.5">
          {pitch.map((p) => (
            <li key={p} className="rounded-sm bg-bg px-2 py-1 text-[12px] leading-snug">
              {p}
            </li>
          ))}
        </ul>
      ) : null}
      {chips.length ? (
        <ul className="flex flex-wrap gap-1.5">
          {chips.map((p) => (
            <li key={p} className="rounded-sm border border-line px-2 py-1 font-mono text-[12px] tabular-nums">
              {p}
            </li>
          ))}
        </ul>
      ) : null}
      {intel.performance?.length ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[13px] sm:grid-cols-3">
          {intel.performance.map((p) => (
            <li key={p} className="font-mono tabular-nums text-ink">
              {p}
            </li>
          ))}
        </ul>
      ) : null}
      {intel.tech?.length ? (
        <p className="text-[12px] leading-snug text-muted">{intel.tech.join(" · ")}</p>
      ) : null}
    </section>
  );
}

function Cmf({ intel }: { intel: ProductIntel }) {
  const ext = intel.cmf?.exterior || [];
  const inn = intel.cmf?.interior || [];
  if (!ext.length && !inn.length) return null;
  return (
    <section className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[12px] font-semibold tracking-wide text-muted uppercase">CMF 颜色</h3>
        <span className="font-mono text-[11px] text-muted">
          之家参配 · {PRODUCT_CAPTURED}
          {intel.skuCount ? ` · ${intel.skuCount} SKU` : ""}
        </span>
      </div>
      {ext.length ? (
        <div>
          <div className="mb-1 text-[11px] text-muted">外观 {ext.length}</div>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3">
            {ext.map((c) => (
              <Swatch key={`e-${c.name}`} c={c} />
            ))}
          </ul>
        </div>
      ) : null}
      {inn.length ? (
        <div>
          <div className="mb-1 text-[11px] text-muted">内饰 {inn.length}</div>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3">
            {inn.map((c) => (
              <Swatch key={`i-${c.name}`} c={c} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function BrochureBlock({ list }: { list: BrochureIntel[] }) {
  if (!list.length) return null;
  return (
    <section className="space-y-3">
      {list.map((b) => (
        <div key={`${b.source}-${b.url}`} className="space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[12px] font-semibold tracking-wide text-muted uppercase">{b.source}</h3>
            <span className="font-mono text-[11px] text-muted">
              {b.source} · {b.captured || BROCHURE_CAPTURED}
              {b.sku ? ` · ${b.sku} SKU` : ""}
            </span>
          </div>
          {b.source === "海外产品手册" ? (
            <p className="text-[11px] leading-snug text-muted">海外产品手册为 WLTP / 当地规格，不与中国 CLTC 混挂。</p>
          ) : null}
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
                <div key={s.k} className="min-w-0 border-b border-line/70 py-1 last:border-0 sm:border-0 sm:py-0">
                  <dt className="text-[11px] text-muted">{s.k}</dt>
                  <dd className="font-mono text-[12px] leading-snug tabular-nums">{s.v}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center text-[12px] text-accent hover:underline md:h-auto"
          >
            打开 {b.title}
          </a>
        </div>
      ))}
    </section>
  );
}

export function ProductIntelPanel({ v }: { v: Vehicle }) {
  const intel = productFor(v.id);
  const { car } = officialFor(v);
  const brochure = brochureFor(v.id);
  if (!intel && !car?.highlights?.length && !brochure.length) return null;
  const view: ProductIntel = intel || {
    seriesId: "",
    captured: PRODUCT_CAPTURED,
    source: "公开口径",
  };
  return (
    <div className="space-y-4 rounded-md border border-line px-3 py-3">
      <Pitch v={v} intel={view} />
      <BrochureBlock list={brochure} />
      {intel ? <Cmf intel={intel} /> : null}
    </div>
  );
}

export function productFallback(
  v: Vehicle,
  key: "battery" | "motors" | "dims" | "range" | "hv" | "adas",
): string | undefined {
  const intel = productFor(v.id);
  if (intel) {
    if (key === "hv" && intel.hv) return intel.hv;
    if (key === "adas" && (intel.adas || intel.batteryTech)) return intel.adas || intel.batteryTech;
    if (key !== "hv" && key !== "adas" && intel[key]) return intel[key];
  }
  const hit = brochureSpec(v.id, key);
  return hit;
}

function brochureSpec(
  id: string,
  key: "battery" | "motors" | "dims" | "range" | "hv" | "adas",
): string | undefined {
  const keys: Record<typeof key, string[]> = {
    battery: ["动力电池", "电池容量", "电池电量", "动力电池容量", "电池"],
    motors: ["系统最大综合功率", "系统功率 / 扭矩", "系统功率", "电机"],
    dims: ["长×宽×高", "车身尺寸", "尺寸"],
    range: ["CLTC"],
    hv: ["高压平台", "高压", "800V", "400V", "1000V"],
    adas: ["智驾", "天神", "激光雷达", "DiPilot"],
  };
  for (const b of brochureFor(id)) {
    if (b.source === "海外产品手册") continue;
    for (const s of b.specs) {
      if (s.k === "口径" || /WLTP/.test(s.k) || /WLTP/.test(s.v)) continue;
      if (key === "motors" && /型式|类型/.test(s.k)) continue;
      if (keys[key].some((k) => s.k.includes(k))) return s.v;
    }
  }
  return undefined;
}
