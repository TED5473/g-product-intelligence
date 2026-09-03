/* Mid-market FX captured 2026-09-01. Local units per 1 USD.
 * CNY Investing.com 6.7208 · MXN Wise 16.96 · ILS Bank of Israel 3.0120 · MAD Wise 9.342
 * Conversion is for comparison only — not a dealer quote. Never invent a missing MSRP.
 */
import {
  MARKETS,
  kindLabel,
  marketOffer,
  offerStatusLabel,
  type MarketId,
  type MarketMeta,
  type MarketOffer,
} from "@/data/markets";

export const FX_CAPTURED = "2026-09-01";

/** Local currency units per 1 USD. */
export const LOCAL_PER_USD: Record<MarketMeta["currency"], number> = {
  CNY: 6.7208,
  MXN: 16.96,
  ILS: 3.012,
  MAD: 9.342,
};

export const FX_SOURCE: Record<MarketMeta["currency"], string> = {
  CNY: "Investing.com USD/CNY 收盘",
  MXN: "Wise 中间价 USD/MXN",
  ILS: "以色列央行代表汇率 USD/ILS",
  MAD: "Wise 中间价 USD/MAD",
};

export type MarketUsdRow = {
  market: MarketId;
  name: string;
  currency: MarketMeta["currency"];
  offer: MarketOffer;
  /** Starting MSRP in local currency units (CNY yuan, not 万). */
  startLocal: number | null;
  startUsd: number | null;
  localLabel: string;
  usdLabel: string;
  statusText: string;
  kindText: string;
};

/** First printed starting price. Ranges use the low end. 万 → ×10000. */
export function parseStartAmount(raw?: string | null): number | null {
  if (!raw) return null;
  const s = raw.replace(/,/g, "").replace(/，/g, "");
  const wanRange = s.match(/([\d.]+)\s*[-–~至]\s*[\d.]+\s*万/);
  if (wanRange) {
    const n = Number(wanRange[1]);
    return Number.isFinite(n) ? Math.round(n * 10000) : null;
  }
  const wan = s.match(/([\d.]+)\s*万/);
  if (wan) {
    const n = Number(wan[1]);
    return Number.isFinite(n) ? Math.round(n * 10000) : null;
  }
  const nums = [...s.matchAll(/(\d+(?:\.\d+)?)/g)]
    .map((m) => Number(m[1]))
    .filter((n) => Number.isFinite(n) && n >= 100);
  return nums[0] ?? null;
}

export function formatUsd(n: number): string {
  return `US$${Math.round(n).toLocaleString("en-US")}`;
}

export function formatLocal(amount: number, currency: MarketMeta["currency"]): string {
  const n = Math.round(amount).toLocaleString("en-US");
  if (currency === "CNY") return `¥${n}`;
  if (currency === "MXN") return `MXN $${n}`;
  if (currency === "ILS") return `₪${n}`;
  return `MAD ${n}`;
}

export function chartTickLabel(row: MarketUsdRow): string {
  if (row.startUsd != null) return row.usdLabel;
  if (row.offer.status === "coming") return "即将";
  if (row.offer.status === "unlisted") return "未见";
  return "未印价";
}

function emptyLabel(offer: MarketOffer): string {
  return offerStatusLabel(offer);
}

export function marketUsdRows(v: { id: string; brand: string }): MarketUsdRow[] {
  return MARKETS.map((m) => {
    const offer = marketOffer(v, m.id);
    const startLocal = parseStartAmount(offer.price || offer.priceTag);
    const per = LOCAL_PER_USD[m.currency];
    const startUsd = startLocal != null ? startLocal / per : null;
    return {
      market: m.id,
      name: m.name,
      currency: m.currency,
      offer,
      startLocal,
      startUsd,
      localLabel:
        offer.priceTag || offer.price || emptyLabel(offer),
      usdLabel: startUsd != null ? formatUsd(startUsd) : "—",
      statusText: offerStatusLabel(offer),
      kindText: kindLabel(offer.kind),
    };
  });
}
