import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FX_CAPTURED, FX_SOURCE, marketUsdRows, type MarketUsdRow } from "@/data/fx";
import { kindLabel, offerStatusLabel } from "@/data/markets";
import { useMarket, useSetMarket } from "@/lib/app-search";
import type { Vehicle } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const BAR_PRICED = "#1a6b5c";
const BAR_PRICED_DIM = "#1a6b5c99";
const BAR_TBA = "#a16207";
const BAR_EMPTY = "#e5e5e2";
const BAR_EMPTY_ON = "#d4d4d0";

type ChartRow = MarketUsdRow & { usd: number; fill: string };

function barFill(row: MarketUsdRow, selected: string): string {
  const on = row.market === selected;
  if (row.startUsd != null) return on ? BAR_PRICED : BAR_PRICED_DIM;
  if (row.offer.status === "listed") return on ? BAR_TBA : BAR_EMPTY_ON;
  return on ? BAR_EMPTY_ON : BAR_EMPTY;
}

function ChartTip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ChartRow }[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-md border border-line bg-surface px-3 py-2.5 shadow-panel">
      <div className="text-[11px] font-medium tracking-wide text-muted uppercase">
        {row.name} · {row.kindText}
      </div>
      <div className="mt-0.5 font-mono text-[15px] font-semibold tabular-nums">{row.localLabel}</div>
      {row.offer.price && row.offer.price !== row.localLabel ? (
        <div className="mt-0.5 max-w-[16rem] text-[11px] leading-snug text-muted">{row.offer.price}</div>
      ) : null}
      <div className="mt-0.5 font-mono text-[12px] tabular-nums text-muted">
        {row.startUsd != null ? `≈ ${row.usdLabel}` : "无当地印价，不折算"}
      </div>
      <div className="mt-1 text-[11px] text-muted">
        {row.offer.localName ? `${row.offer.localName} · ` : null}
        {row.statusText}
      </div>
    </div>
  );
}

function CountryTick({
  x,
  y,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) {
  if (x == null || y == null) return null;
  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="middle" dy={16} className="fill-ink text-[12px] font-medium">
        {payload?.value}
      </text>
    </g>
  );
}

export function PriceCompare({ v }: { v: Vehicle }) {
  const market = useMarket();
  const setMarket = useSetMarket();
  const [detail, setDetail] = useState(false);
  const rows = useMemo(() => marketUsdRows(v), [v]);
  const chartRows: ChartRow[] = rows.map((r) => ({
    ...r,
    usd: r.startUsd ?? 0,
    fill: barFill(r, market),
  }));
  const priced = rows.filter((r) => r.startUsd != null).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">
          四国起售价 · 折美元
        </div>
        <div className="font-mono text-[11px] text-muted">
          {priced}/4 国有印价 · 汇率 {FX_CAPTURED}
        </div>
      </div>
      <p className="hidden text-[11px] leading-snug text-muted sm:block">
        点柱或国家切市场。柱高按起售价折美元；悬停看当地货币 MSRP。未见 / 未印价 / 即将不编造，柱为 0。
      </p>

      <div className="overflow-hidden rounded-md border border-line bg-bg px-2 pt-3 sm:px-3">
        <div className="h-[148px] w-full sm:h-[min(28vh,196px)] sm:min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartRows} margin={{ top: 4, right: 8, left: 4, bottom: 28 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={(props) => <CountryTick {...props} />}
              />
              <YAxis
                dataKey="usd"
                axisLine={false}
                tickLine={false}
                width={52}
                tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "IBM Plex Mono, ui-monospace, monospace" }}
                tickFormatter={(n: number) => (n ? `$${Math.round(n / 1000)}k` : "0")}
              />
              <Tooltip
                cursor={{ fill: "rgba(17,17,17,0.04)" }}
                content={<ChartTip />}
                wrapperStyle={{ outline: "none" }}
              />
              <Bar
                dataKey="usd"
                maxBarSize={64}
                radius={[4, 4, 0, 0]}
                onClick={(d) => {
                  const row = d as ChartRow;
                  if (row?.market) setMarket(row.market);
                }}
              >
                {chartRows.map((r) => (
                  <Cell key={r.market} fill={r.fill} cursor="pointer" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {rows.map((r) => {
          const on = market === r.market;
          return (
            <button
              key={r.market}
              type="button"
              onClick={() => setMarket(r.market)}
              className={cn(
                "min-h-11 rounded-md border px-2.5 py-2 text-left",
                on ? "border-ink bg-bg" : "border-line hover:border-ink",
              )}
            >
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-[12px] font-semibold">{r.name}</span>
                <span className="font-mono text-[10px] text-muted">{offerStatusLabel(r.offer, true)}</span>
              </div>
              {r.offer.localName ? (
                <div className="truncate text-[11px] text-muted">{r.offer.localName}</div>
              ) : null}
              <div className="mt-0.5 font-mono text-[13px] font-semibold tabular-nums leading-tight">
                {r.offer.priceTag || r.offer.price || "—"}
              </div>
              {r.startUsd != null ? (
                <div className="font-mono text-[11px] tabular-nums text-muted">{r.usdLabel}</div>
              ) : null}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-expanded={detail}
        onClick={() => setDetail((on) => !on)}
        className="h-11 text-[12px] font-medium text-muted hover:text-ink md:h-8"
      >
        {detail ? "收起明细" : "明细"}
      </button>

      {detail ? (
        <>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-[12px]">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="py-1.5 font-medium">国家</th>
                <th className="py-1.5 font-medium">当地起售价</th>
                <th className="py-1.5 font-medium">≈ USD</th>
                <th className="py-1.5 font-medium">口径</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.market}
                  className={cn(
                    "border-b border-line last:border-0",
                    market === r.market && "bg-bg",
                  )}
                >
                  <td className="py-1.5">
                    <button type="button" className="hover:underline" onClick={() => setMarket(r.market)}>
                      {r.name}
                      {r.offer.localName ? <span className="ml-1 text-muted">{r.offer.localName}</span> : null}
                    </button>
                  </td>
                  <td className="py-1.5 font-mono tabular-nums">{r.localLabel}</td>
                  <td className="py-1.5 font-mono tabular-nums">{r.usdLabel}</td>
                  <td className="py-1.5 text-muted">
                    {offerStatusLabel(r.offer, true)} · {kindLabel(r.offer.kind)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <p className="font-mono text-[11px] text-muted">
            CNY {FX_SOURCE.CNY} · MXN {FX_SOURCE.MXN} · ILS {FX_SOURCE.ILS} · MAD {FX_SOURCE.MAD}
          </p>
        </>
      ) : null}
    </div>
  );
}
