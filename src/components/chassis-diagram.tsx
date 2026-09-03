import { useState } from "react";
import type { Architecture } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Variant = "solid" | "wash" | "rail" | "aux";

type Part = {
  key: string;
  n: number;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  variant: Variant;
  cells?: { cols: number; rows: number };
};

type Wheel = { cx: number; cy: number };

type Layout = {
  deck: { x: number; y: number; w: number; h: number; rx: number };
  wheels: Wheel[];
  parts: Part[];
};

const FONT = "IBM Plex Sans SC, IBM Plex Sans, sans-serif";
const MONO = "IBM Plex Mono, ui-monospace, monospace";

export function defaultChassisKey(id: string): string | null {
  if (["CMA", "DM", "MARS", "DENZA", "EXEED"].includes(id)) return "dht";
  if (id === "SPA") return "ice";
  if (["BMA", "GTA", "DMO", "JETOUR"].includes(id)) return "modules";
  if (id === "UNHOSTED") return null;
  return "battery";
}

function skateIds(id: string) {
  return ["SEA", "GEA", "E3", "SUPER-E", "YSF", "E0X", "ICAR"].includes(id);
}

export function chassisLayout(id: string): Layout {
  if (skateIds(id)) {
    const packLabel =
      id === "SUPER-E" ? "千伏母线" : id === "E3" ? "CTB 车身" : id === "YSF" ? "易四方" : id === "E0X" ? "CTC" : id === "SEA" ? "电池包" : "纵梁 / 边梁";
    const batLabel =
      id === "SUPER-E" ? "闪充电池" : id === "E3" || id === "YSF" ? "刀片电池" : id === "SEA" ? "滑板电池" : id === "GEA" ? "地板电池" : "高压电池";
    const rearLabel = id === "YSF" ? "后双电机" : "后电驱";
    const crashLabel = id === "SEA" ? "侧梁 / HVIL" : id === "GEA" ? "车身 / BIW" : "侧梁";
    return {
      deck: { x: 28, y: 28, w: 844, h: 168, rx: 22 },
      wheels: [
        { cx: 118, cy: 222 },
        { cx: 782, cy: 222 },
      ],
      parts: [
        {
          key: id === "SEA" ? "pack" : id === "GEA" ? "rails" : "pack",
          n: 4,
          label: packLabel,
          x: 186,
          y: 44,
          w: 528,
          h: 22,
          rx: 5,
          variant: "rail",
        },
        {
          key: "battery",
          n: 2,
          label: batLabel,
          x: 186,
          y: 70,
          w: 528,
          h: 92,
          rx: 10,
          variant: "wash",
          cells: { cols: 10, rows: 2 },
        },
        {
          key: "edrive_f",
          n: 1,
          label: id === "YSF" ? "前双电机" : "前电驱",
          x: 48,
          y: 62,
          w: 128,
          h: 100,
          rx: 10,
          variant: "solid",
        },
        {
          key: "edrive_r",
          n: 3,
          label: rearLabel,
          x: 724,
          y: 62,
          w: 128,
          h: 100,
          rx: 10,
          variant: "solid",
        },
        {
          key: "crash",
          n: 5,
          label: crashLabel,
          x: 186,
          y: 166,
          w: 528,
          h: 22,
          rx: 5,
          variant: "rail",
        },
      ],
    };
  }

  if (id === "CMA" || id === "DM" || id === "MARS" || id === "DENZA" || id === "EXEED") {
    const dhtLabel =
      id === "DM" ? "EHS 电混" : id === "MARS" ? "鲲鹏混动" : id === "DENZA" ? "前舱动力" : id === "EXEED" ? "C-DM" : "1.5T + DHT";
    const batLabel = id === "CMA" ? "地板电池" : "插混电池";
    const eeaLabel = id === "DM" ? "第五代 DM" : id === "MARS" ? "火星 EEA" : id === "DENZA" ? "易三方" : id === "EXEED" ? "雄狮智舱" : "GEEA 2.0";
    return {
      deck: { x: 28, y: 28, w: 844, h: 168, rx: 22 },
      wheels: [
        { cx: 132, cy: 222 },
        { cx: 782, cy: 222 },
      ],
      parts: [
        {
          key: "crash",
          n: 6,
          label: "白车身",
          x: 48,
          y: 44,
          w: 168,
          h: 22,
          rx: 5,
          variant: "rail",
        },
        {
          key: "dht",
          n: 1,
          label: dhtLabel,
          x: 48,
          y: 70,
          w: 168,
          h: 92,
          rx: 10,
          variant: "solid",
        },
        {
          key: "battery",
          n: 2,
          label: batLabel,
          x: 228,
          y: 70,
          w: 484,
          h: 92,
          rx: 10,
          variant: "wash",
          cells: { cols: 8, rows: 2 },
        },
        {
          key: "p4",
          n: 3,
          label: "后桥 / P4",
          x: 724,
          y: 70,
          w: 128,
          h: 92,
          rx: 10,
          variant: "solid",
        },
        {
          key: "sill",
          n: 4,
          label: "门槛十宫格",
          x: 228,
          y: 166,
          w: 484,
          h: 22,
          rx: 5,
          variant: "rail",
          cells: { cols: 10, rows: 1 },
        },
        {
          key: "eea",
          n: 5,
          label: eeaLabel,
          x: 406,
          y: 44,
          w: 128,
          h: 22,
          rx: 5,
          variant: "aux",
        },
      ],
    };
  }

  if (id === "SPA") {
    return {
      deck: { x: 28, y: 28, w: 844, h: 168, rx: 22 },
      wheels: [
        { cx: 118, cy: 222 },
        { cx: 782, cy: 222 },
      ],
      parts: [
        {
          key: "ice",
          n: 1,
          label: "2.0T 电混",
          x: 48,
          y: 62,
          w: 132,
          h: 100,
          rx: 10,
          variant: "solid",
        },
        {
          key: "dht",
          n: 2,
          label: "DHT Pro",
          x: 188,
          y: 78,
          w: 100,
          h: 72,
          rx: 8,
          variant: "solid",
        },
        {
          key: "battery",
          n: 3,
          label: "地板电池",
          x: 296,
          y: 70,
          w: 416,
          h: 92,
          rx: 10,
          variant: "wash",
          cells: { cols: 8, rows: 2 },
        },
        {
          key: "edrive_r",
          n: 4,
          label: "P4 后电机",
          x: 724,
          y: 62,
          w: 128,
          h: 100,
          rx: 10,
          variant: "solid",
        },
        {
          key: "crash",
          n: 6,
          label: "轻量化结构",
          x: 296,
          y: 166,
          w: 416,
          h: 22,
          rx: 5,
          variant: "rail",
        },
        {
          key: "thermal",
          n: 5,
          label: "空悬 CCD",
          x: 440,
          y: 44,
          w: 128,
          h: 22,
          rx: 5,
          variant: "aux",
        },
      ],
    };
  }

  if (id === "BMA" || id === "GTA" || id === "DMO" || id === "JETOUR") {
    return {
      deck: { x: 28, y: 28, w: 844, h: 168, rx: 22 },
      wheels: [
        { cx: 140, cy: 222 },
        { cx: 760, cy: 222 },
      ],
      parts: [
        {
          key: "modules",
          n: 1,
          label: "模块",
          x: 56,
          y: 70,
          w: 140,
          h: 92,
          rx: 10,
          variant: "solid",
        },
        {
          key: "battery",
          n: 2,
          label: "动力区",
          x: 208,
          y: 70,
          w: 484,
          h: 92,
          rx: 10,
          variant: "wash",
        },
        {
          key: "edrive_r",
          n: 3,
          label: "传动",
          x: 704,
          y: 70,
          w: 140,
          h: 92,
          rx: 10,
          variant: "solid",
        },
      ],
    };
  }

  return {
    deck: { x: 28, y: 28, w: 844, h: 168, rx: 22 },
    wheels: [
      { cx: 118, cy: 222 },
      { cx: 782, cy: 222 },
    ],
    parts: [],
  };
}

function opacityFor(
  variant: Variant,
  selected: boolean,
  hovered: boolean,
  dimmed: boolean,
) {
  const rest = dimmed ? 0.55 : 1;
  let base = 0.2;
  if (variant === "solid") base = 0.92;
  else if (variant === "wash") base = 0.2;
  else if (variant === "rail") base = 0.22;
  else base = 0.2;
  if (selected) {
    if (variant === "solid") base = 1;
    else if (variant === "wash") base = 0.38;
    else if (variant === "rail") base = 0.62;
    else base = 0.92;
  } else if (hovered) {
    if (variant === "solid") base = 0.78;
    else if (variant === "wash") base = 0.3;
    else base = 0.42;
  }
  return base * rest;
}

function CellGrid({
  part,
  color,
  dim,
}: {
  part: Part;
  color: string;
  dim: boolean;
}) {
  const cells = part.cells;
  if (!cells) return null;
  const padX = 14;
  const padY = part.variant === "rail" ? 4 : 10;
  const gap = 3.5;
  const labelReserve = part.variant === "rail" ? 0 : 30;
  const gridW = part.w - padX * 2;
  const gridH = Math.max(8, part.h - padY * 2 - labelReserve);
  const cw = (gridW - gap * (cells.cols - 1)) / cells.cols;
  const ch = (gridH - gap * (cells.rows - 1)) / cells.rows;
  const rects = [];
  for (let r = 0; r < cells.rows; r++) {
    for (let c = 0; c < cells.cols; c++) {
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={part.x + padX + c * (cw + gap)}
          y={part.y + padY + r * (ch + gap)}
          width={cw}
          height={Math.max(ch, 6)}
          rx={1.5}
          fill={color}
          fillOpacity={dim ? 0.1 : 0.32}
          style={{ pointerEvents: "none" }}
        />,
      );
    }
  }
  return <g aria-hidden>{rects}</g>;
}

function NumberBadge({
  x,
  y,
  n,
  active,
  color,
}: {
  x: number;
  y: number;
  n: number;
  active: boolean;
  color: string;
}) {
  return (
    <g style={{ pointerEvents: "none" }}>
      <circle
        cx={x}
        cy={y}
        r="11"
        fill={active ? "var(--color-ink)" : "var(--color-surface)"}
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={active ? "var(--color-accent-fg)" : color}
        fontFamily={MONO}
      >
        {n}
      </text>
    </g>
  );
}

export function ChassisDiagram({
  arch,
  selected,
  onSelect,
  hideChips,
}: {
  arch: Architecture;
  selected: string | null;
  onSelect: (key: string) => void;
  hideChips?: boolean;
}) {
  const c = arch.color;
  const layout = chassisLayout(arch.id);
  const [hover, setHover] = useState<string | null>(null);
  const details = arch.teardown?.details || {};
  const spots = arch.hotspots || [];
  const extras = Object.keys(details).filter((k) =>
    spots.length
      ? !spots.some((s) => s.key === k)
      : !layout.parts.some((p) => p.key === k),
  );
  const chips = spots.length
    ? spots.map((s) => ({ key: s.key, n: s.id, label: s.label }))
    : layout.parts.map((p) => ({ key: p.key, n: p.n, label: p.label }));
  const dimOthers = Boolean(selected);
  const focus = hover || selected;
  const focusSpot = spots.find((s) => s.key === focus);
  const focusPart = layout.parts.find((p) => p.key === focus);
  const caption =
    focusSpot?.tip ||
    focusSpot?.label ||
    focusPart?.label ||
    (focus && details[focus]?.title) ||
    "点选模块查看拆解";
  const usePhoto = Boolean(arch.skateboardImg);

  return (
    <div>
      {usePhoto ? (
        <SkateboardPhoto
          arch={arch}
          selected={selected}
          hover={hover}
          onSelect={onSelect}
          onHover={setHover}
        />
      ) : (
        <svg
          viewBox="0 0 900 252"
          className="chassis-svg block w-full select-none"
          role="img"
          aria-label={`${arch.name} 滑板底盘结构图，点击模块查看拆解`}
        >
          <ellipse
            cx="450"
            cy="236"
            rx="310"
            ry="8"
            fill={c}
            fillOpacity="0.08"
          />

          <rect
            x={layout.deck.x}
            y={layout.deck.y}
            width={layout.deck.w}
            height={layout.deck.h}
            rx={layout.deck.rx}
            fill="var(--color-surface)"
            stroke={c}
            strokeWidth="1.75"
          />

          {layout.wheels.map((w, i) => (
            <g key={i} aria-hidden>
              <line
                x1={w.cx}
                y1={layout.deck.y + layout.deck.h}
                x2={w.cx}
                y2={w.cy - 20}
                stroke={c}
                strokeWidth="2"
                strokeOpacity="0.35"
              />
              <circle
                cx={w.cx}
                cy={w.cy}
                r="20"
                fill="var(--color-surface)"
                stroke={c}
                strokeWidth="2.25"
              />
              <circle
                cx={w.cx}
                cy={w.cy}
                r="8"
                fill="none"
                stroke={c}
                strokeWidth="1.75"
              />
              <circle cx={w.cx} cy={w.cy} r="2.5" fill={c} fillOpacity="0.7" />
            </g>
          ))}

          {arch.id === "UNHOSTED" ? (
            <text
              x="450"
              y="120"
              textAnchor="middle"
              fontSize="14"
              fill="var(--color-muted)"
              fontFamily={FONT}
            >
              未点名架构
            </text>
          ) : null}

          {layout.parts.map((p) => {
            const active = selected === p.key;
            const hovered = hover === p.key;
            const dimmed = dimOthers && !active && !hovered;
            const fillOp = opacityFor(p.variant, active, hovered, dimmed);
            const lightText =
              p.variant === "solid" || (p.variant === "aux" && (active || fillOp > 0.7));
            const showLabel = p.h >= 28;
            return (
              <g
                key={p.key}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={p.label}
                data-part={p.key}
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(p.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(p.key);
                  }
                }}
                onMouseEnter={() => setHover(p.key)}
                onMouseLeave={() => setHover(null)}
              >
                <rect
                  className="hit"
                  x={p.x}
                  y={p.y}
                  width={p.w}
                  height={p.h}
                  rx={p.rx}
                  fill={c}
                  fillOpacity={fillOp}
                  stroke={c}
                  strokeWidth={active ? 2.25 : 1.25}
                  style={{
                    transition: "fill-opacity 160ms ease, stroke-width 160ms ease",
                  }}
                />
                <CellGrid part={p} color={c} dim={dimmed && !active} />
                {showLabel ? (
                  <text
                    x={p.x + p.w / 2}
                    y={
                      p.cells && p.variant === "wash"
                        ? p.y + p.h - 14
                        : p.y + p.h / 2 + 5
                    }
                    textAnchor="middle"
                    fontSize={p.w < 120 ? 12 : p.variant === "solid" ? 15 : 16}
                    fontWeight="600"
                    fill={lightText ? "var(--color-accent-fg)" : c}
                    fontFamily={FONT}
                    style={{ pointerEvents: "none" }}
                  >
                    {p.label}
                  </text>
                ) : null}
                <NumberBadge
                  x={p.variant === "rail" ? p.x + 16 : p.x + p.w / 2}
                  y={p.y}
                  n={p.n}
                  active={active}
                  color={c}
                />
              </g>
            );
          })}
        </svg>
      )}

      <p className="mt-1 min-h-5 text-center text-[12px] text-muted">{caption}</p>

      {chips.length && !hideChips ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => onSelect(p.key)}
              className={cn(
                "flex h-10 items-center gap-1.5 rounded-sm border px-2.5 text-[12px] transition-colors duration-150",
                selected === p.key
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-surface text-muted hover:text-ink",
              )}
            >
              <span className="font-mono text-[11px] tabular-nums">{p.n}</span>
              {p.label}
            </button>
          ))}
          {extras.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => onSelect(k)}
              className={cn(
                "flex h-10 items-center rounded-sm border px-2.5 text-[12px] transition-colors duration-150",
                selected === k
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-surface text-muted hover:text-ink",
              )}
            >
              {details[k]?.title || k}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SkateboardPhoto({
  arch,
  selected,
  hover,
  onSelect,
  onHover,
}: {
  arch: Architecture;
  selected: string | null;
  hover: string | null;
  onSelect: (key: string) => void;
  onHover: (key: string | null) => void;
}) {
  const spots = arch.hotspots || [];
  return (
    <div>
      {arch.skateBanner ? (
        <div className="mb-1.5 text-[11px] text-muted">{arch.skateBanner}</div>
      ) : null}
      <div className="relative overflow-hidden rounded-sm border border-dashed border-line bg-bg">
        <img
          src={`/${arch.skateboardImg}`}
          alt={`${arch.name} 滑板底盘结构图`}
          className="block w-full"
        />
        {spots.map((h) => {
          const active = selected === h.key || hover === h.key;
          return (
            <button
              key={h.id}
              type="button"
              title={h.tip}
              aria-label={h.label}
              aria-pressed={selected === h.key}
              onClick={() => onSelect(h.key)}
              onMouseEnter={() => onHover(h.key)}
              onMouseLeave={() => onHover(null)}
              className={cn(
                "absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums shadow-panel",
                active
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-surface/95 text-ink hover:border-ink",
              )}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              {h.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
