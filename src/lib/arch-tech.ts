import type { ArchDetailBlock, Architecture } from "@/lib/catalog";

export type TechLaneId =
  | "edrive"
  | "battery"
  | "eea"
  | "thermal"
  | "chassis"
  | "safety"
  | "body";

export type TechLane = {
  id: TechLaneId;
  n: number;
  label: string;
  keys: string[];
};

export const TECH_LANES: TechLane[] = [
  { id: "edrive", n: 1, label: "电驱技术及参数", keys: ["edrive_f", "edrive_r", "dht", "ice", "p4", "motors"] },
  { id: "battery", n: 2, label: "电池技术及参数", keys: ["battery", "pack"] },
  { id: "eea", n: 3, label: "电子电气架构", keys: ["eea"] },
  { id: "thermal", n: 4, label: "热管理", keys: ["thermal"] },
  { id: "chassis", n: 5, label: "底盘性能参数", keys: ["rails", "sill", "modules", "cevt"] },
  { id: "safety", n: 6, label: "安全性能及参数", keys: ["crash", "adas"] },
  { id: "body", n: 7, label: "车身材料及性能", keys: ["crash"] },
];

const KEY_LANE: Record<string, TechLaneId> = {};
for (const lane of TECH_LANES) {
  for (const k of lane.keys) {
    if (!KEY_LANE[k]) KEY_LANE[k] = lane.id;
  }
}
KEY_LANE.battery = "battery";
KEY_LANE.pack = "battery";
KEY_LANE.crash = "safety";

export function keyToLane(key: string | null | undefined): TechLaneId {
  if (!key) return "battery";
  return KEY_LANE[key] || "battery";
}

export function laneOf(id: string): TechLane {
  return TECH_LANES.find((l) => l.id === id) || TECH_LANES[1];
}

const BODY_RE = /钢|铝|BIW|白车身|笼|梁格|热成型|材料|四横|五纵|TWB|HSS|硼钢|门环|轻量化|复合材料/;
const SAFETY_RE = /HVIL|碰撞|安全|针刺|NCAP|十宫格|防撞|气囊|AEB|星|泄力|烟火|试验/;

export type LaneItem = { k: string; v: string; s?: string; cmp?: boolean };

function detailsOf(arch: Architecture | undefined): Record<string, ArchDetailBlock> {
  return arch?.teardown?.details || {};
}

function take(block: ArchDetailBlock | undefined): LaneItem[] {
  return (block?.items || []).map((it) => ({ k: it.k, v: it.v, s: it.s, cmp: it.cmp }));
}

export function laneItems(arch: Architecture | undefined, laneId: TechLaneId): LaneItem[] {
  if (!arch) return [];
  const details = detailsOf(arch);
  const lane = laneOf(laneId);
  const out: LaneItem[] = [];
  const seen = new Set<string>();
  const push = (it: LaneItem) => {
    const id = `${it.k}::${it.v}`;
    if (seen.has(id)) return;
    seen.add(id);
    out.push(it);
  };

  for (const key of lane.keys) {
    const items = take(details[key]);
    if (laneId === "body") {
      items.filter((it) => BODY_RE.test(`${it.k}${it.v}`)).forEach(push);
      continue;
    }
    if (laneId === "safety" && key === "crash") {
      const hit = items.filter((it) => SAFETY_RE.test(`${it.k}${it.v}`) || !BODY_RE.test(`${it.k}${it.v}`));
      (hit.length ? hit : items).forEach(push);
      continue;
    }
    items.forEach(push);
  }

  if (laneId === "battery" && arch.teardown?.voltageSplit) {
    const vs = arch.teardown.voltageSplit;
    if (vs.v400) push({ k: vs.v400.label, v: vs.v400.note || vs.v400.models.map((m) => `${m.model} ${m.hv}`).join(" · "), s: vs.v400.models[0]?.source });
    if (vs.v800) push({ k: vs.v800.label, v: vs.v800.note || vs.v800.models.map((m) => `${m.model} ${m.hv}`).join(" · "), s: vs.v800.models[0]?.source });
  }

  const flagged = out.filter((it) => it.cmp);
  return flagged.length ? flagged : out;
}

function norm(k: string) {
  return k
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[·.\-/()（）]/g, "");
}

const ALIAS: [RegExp, string][] = [
  [/前电驱|前舱|前电机|前桥/, "前电驱"],
  [/后电驱|后电机|p4|后桥/, "后电驱"],
  [/架构句/, "架构句"],
  [/代表车包|车型级|包容量/, "代表车包"],
  [/金砖|短刀|神盾/, "神盾金砖"],
  [/地板电池|滑板电池|电池包|刀片|化学|形态/, "电池形态"],
  [/充电|快充|慢充/, "充电"],
  [/安全试验|针刺|钢针|贯穿/, "安全试验"],
  [/能源形式|全面电动/, "能源形式"],
  [/发动机|bhe15/, "发动机"],
  [/dht/, "DHT"],
  [/系统功率|综合功率/, "系统功率"],
  [/代表车$/, "代表车"],
  [/冷却|液冷|直冷/, "冷却"],
  [/ptc/, "PTC"],
  [/热泵/, "热泵"],
  [/电压|400v|800v|48v/, "电压"],
  [/gee?a|zeea|eea|代数|芯片|域控/, "EEA"],
  [/热泵|hvch|ptc|accm|热管|热管理/, "热管理"],
  [/纵梁|边梁|门槛|模块/, "纵梁 / 边梁"],
  [/碰撞|hvil|安全|针刺/, "碰撞 / 安全"],
  [/钢|铝|biw|白车身|笼|热成型/, "车身材料"],
  [/功率|扭矩|kw/, "功率 / 扭矩"],
];

function bucket(k: string) {
  const n = norm(k);
  for (const [re, label] of ALIAS) {
    if (re.test(n) || re.test(k)) return label;
  }
  return k;
}

export type AlignedRow = {
  k: string;
  a?: LaneItem;
  b?: LaneItem;
};

export function alignLane(a: LaneItem[], b: LaneItem[]): AlignedRow[] {
  const rows: AlignedRow[] = [];
  const usedB = new Set<number>();

  const findB = (item: LaneItem) => {
    const bk = bucket(item.k);
    const nk = norm(item.k);
    let idx = b.findIndex((x, i) => !usedB.has(i) && (norm(x.k) === nk || bucket(x.k) === bk));
    if (idx < 0) idx = b.findIndex((x, i) => !usedB.has(i) && bucket(x.k) === bk);
    return idx;
  };

  for (const item of a) {
    const idx = findB(item);
    if (idx >= 0) {
      usedB.add(idx);
      rows.push({ k: item.k, a: item, b: b[idx] });
    } else {
      rows.push({ k: item.k, a: item });
    }
  }
  b.forEach((item, i) => {
    if (!usedB.has(i)) rows.push({ k: item.k, b: item });
  });
  if (!rows.length) rows.push({ k: "状态" });
  return rows;
}

export function firstKeyForLane(arch: Architecture | undefined, laneId: TechLaneId): string | null {
  if (!arch) return null;
  const lane = laneOf(laneId);
  const spots = arch.hotspots || [];
  const hit = spots.find((s) => lane.keys.includes(s.key) || keyToLane(s.key) === laneId);
  if (hit) return hit.key;
  const details = detailsOf(arch);
  const k = lane.keys.find((key) => details[key]);
  return k || null;
}
