import { PM_WALL } from "@/data/pm-wall";
import { BYD_WALL } from "@/data/byd-wall";
import { CHERY_WALL } from "@/data/chery-wall";
import { XPENG_WALL } from "@/data/xpeng-wall";
import { nameSearchBlob } from "@/data/markets";

export const SRC = PM_WALL.SRC as {
  ZK: string;
  PUB: string;
  TBD: string;
  INF: string;
};

export const GROUPS = [
  { id: "geely", label: "吉利", title: "G-Product Intelligence" },
  { id: "byd", label: "比亚迪", title: "BYD Product Intelligence" },
  { id: "chery", label: "奇瑞", title: "Chery Product Intelligence" },
  { id: "xpeng", label: "小鹏", title: "XPeng Product Intelligence" },
] as const;

export type GroupId = (typeof GROUPS)[number]["id"];

export function groupMeta(id?: string) {
  return GROUPS.find((g) => g.id === id) || GROUPS[0];
}

export function isGroupId(v: unknown): v is GroupId {
  return v === "geely" || v === "byd" || v === "chery" || v === "xpeng";
}

export function parseGroup(v: unknown): GroupId {
  return isGroupId(v) ? v : "geely";
}

/** Card-sized webp (≈4KB) — full photos stay in `imgs/cars/` for the sheet. */
export function cardPhoto(photo?: string | null): string | null {
  if (!photo) return null;
  const m = photo.match(/^imgs\/cars\/([^/]+)\.\w+$/);
  return m ? `imgs/cars/thumbs/${m[1]}.webp` : photo;
}

export const footnote: string = PM_WALL.footnote;
export const gaps: string[] = PM_WALL.gaps;

export type Ncap = {
  stars: number | null;
  year: number | string | null;
  adult: number | null;
  child: number | null;
  vru: number | null;
  assist: number | null;
  url: string | null;
  note: string | null;
  source?: string;
};

export type Trim = Record<string, string | undefined>;

export type Vehicle = {
  id: string;
  photo?: string | null;
  ncap?: Ncap;
  name: string;
  brand: string;
  body: string;
  arch: string;
  platform: string;
  powertrain: string;
  voltageClass?: string;
  eea?: string;
  source: string;
  course?: string;
  summary?: string;
  salesRisk?: string;
  koujing?: string;
  trims?: Trim[];
  detail?: Record<string, unknown>;
  syllabus?: string[];
  placeholder?: boolean;
  pending?: boolean;
  publicOnly?: boolean;
  cNcap?: { stars?: number; note?: string; source?: string };
  safetyNarrative?: { label?: string; note?: string; source?: string };
  systemJump?: { arch: string; hs?: string; label?: string };
  group?: GroupId;
};

export type Platform = {
  id: string;
  arch: string;
  name: string;
  desc: string;
  source: string;
  group?: GroupId;
};

export type Hotspot = {
  id: number;
  key: string;
  label: string;
  x: number;
  y: number;
  tip: string;
};

export type ArchDetailBlock = {
  title: string;
  items?: { k: string; v: string; s?: string; cmp?: boolean }[];
  img?: string;
  thumbs?: string[];
};

export type Architecture = {
  id: string;
  name: string;
  nameZh: string;
  color: string;
  accent: string;
  owner: string;
  note: string;
  source: string;
  sourceNote?: string;
  platforms: string[];
  skateboardImg?: string;
  skateBanner?: string;
  hotspots?: Hotspot[];
  group?: GroupId;
  teardown?: {
    title: string;
    publicOnly?: boolean;
    voltageSplit?: {
      v400?: {
        label: string;
        models: { model: string; battery: string; hv: string; source: string }[];
        note?: string;
      };
      v800?: {
        label: string;
        models: { model: string; battery: string; hv: string; source: string }[];
        note?: string;
      };
    };
    details?: Record<string, ArchDetailBlock>;
    empBoard?: {
      title: string;
      note?: string;
      headers: string[];
      rows: string[][];
      footer?: string;
    };
    matrix?: Record<
      string,
      { brand: string; model: string; dim: string; wb: string }[]
    >;
  };
};

export type HomologGroup = {
  id: string;
  title: string;
  source: string;
  members: string[];
  note: string;
};

export type Flashcard = {
  id: string;
  q: string;
  a: string;
  source: string;
  tags: string[];
};

export type Brief = {
  type: string;
  id: string;
  prompt: string;
  fields: { key: string; label: string; answer: string }[];
};

export type ArchCompare = {
  trap: string;
  columns: { id: string; name: string }[];
  groups: { id: string; label: string }[];
  rows: {
    key: string;
    label: string;
    group: string;
    cells: Record<string, { v: string; s: string }>;
  }[];
};

function tagGroup<T extends object>(items: T[], group: GroupId): (T & { group: GroupId })[] {
  return items.map((x) => ({ ...x, group }));
}

function tagPlat(
  plats: Record<string, Platform>,
  group: GroupId,
): Record<string, Platform> {
  return Object.fromEntries(
    Object.entries(plats).map(([k, v]) => [k, { ...v, group }]),
  );
}

export const architectures = [
  ...tagGroup(PM_WALL.architectures as unknown as Architecture[], "geely"),
  ...tagGroup(BYD_WALL.architectures as unknown as Architecture[], "byd"),
  ...tagGroup(CHERY_WALL.architectures as unknown as Architecture[], "chery"),
  ...tagGroup(XPENG_WALL.architectures as unknown as Architecture[], "xpeng"),
];

export const platforms = {
  ...tagPlat(PM_WALL.platforms as Record<string, Platform>, "geely"),
  ...tagPlat(BYD_WALL.platforms as Record<string, Platform>, "byd"),
  ...tagPlat(CHERY_WALL.platforms as Record<string, Platform>, "chery"),
  ...tagPlat(XPENG_WALL.platforms as Record<string, Platform>, "xpeng"),
} as Record<string, Platform>;

export const vehicles = [
  ...tagGroup(PM_WALL.vehicles as Vehicle[], "geely"),
  ...tagGroup(BYD_WALL.vehicles as Vehicle[], "byd"),
  ...tagGroup(CHERY_WALL.vehicles as Vehicle[], "chery"),
  ...tagGroup(XPENG_WALL.vehicles as Vehicle[], "xpeng"),
];

export const homologGroups = [
  ...(PM_WALL.homologGroups as HomologGroup[]),
  ...(BYD_WALL.homologGroups as HomologGroup[]),
  ...(CHERY_WALL.homologGroups as HomologGroup[]),
  ...(XPENG_WALL.homologGroups as HomologGroup[]),
];

export const brandMap = PM_WALL.brandMap as {
  note: string;
  source: string;
  rows: { brand: string; primary: string; also: string }[];
};

export function brandMapFor(group?: string) {
  if (group === "byd") return BYD_WALL.brandMap as typeof brandMap;
  if (group === "chery") return CHERY_WALL.brandMap as typeof brandMap;
  if (group === "xpeng") return XPENG_WALL.brandMap as typeof brandMap;
  return brandMap;
}

export const flashcards = PM_WALL.flashcards as Flashcard[];
export const briefBank = PM_WALL.briefBank as Brief[];

export function archCompareFor(group?: string): ArchCompare {
  if (group === "byd") return BYD_WALL.archCompare as ArchCompare;
  if (group === "chery") return CHERY_WALL.archCompare as ArchCompare;
  if (group === "xpeng") return XPENG_WALL.archCompare as ArchCompare;
  return PM_WALL.archCompare as ArchCompare;
}

export const archCompare = PM_WALL.archCompare as ArchCompare;

export const compareFields = PM_WALL.compareFields as {
  key: string;
  label: string;
}[];

export function archById(id: string) {
  return architectures.find((a) => a.id === id);
}

export function carById(id: string) {
  return vehicles.find((x) => x.id === id);
}

export function platById(id: string) {
  return platforms[id];
}

export function isPlaceholder(v: Vehicle) {
  return Boolean(v.placeholder || v.pending);
}

export function uniqueBrands(group?: string) {
  return [
    ...new Set(
      vehicles.filter((v) => !group || v.group === group).map((v) => v.brand),
    ),
  ];
}

export function hostedArches(group?: string) {
  return architectures.filter(
    (a) => a.id !== "UNHOSTED" && (!group || a.group === group),
  );
}

export function valOrTbd(v: unknown) {
  if (v == null || v === "" || v === "—") return "待补";
  return String(v);
}

export type Filters = {
  q: string;
  brand: string;
  pt: string;
  arch: string;
  showPh: boolean;
  group: GroupId;
};

export function matchesFilters(v: Vehicle, f: Filters) {
  if (f.group && v.group && v.group !== f.group) return false;
  if (f.brand && v.brand !== f.brand) return false;
  if (f.arch && v.arch !== f.arch) return false;
  if (f.pt) {
    const pt = (v.powertrain || "").toUpperCase();
    if (f.pt === "ICE") {
      if (!/(ICE|HEV|MHEV)/.test(pt) || pt.includes("PHEV")) return false;
    } else if (!pt.includes(f.pt)) return false;
  }
  if (f.q) {
    const blob = [
      v.name,
      v.brand,
      v.arch,
      v.platform,
      v.body,
      v.powertrain,
      v.voltageClass,
      v.eea,
      v.summary,
      v.course,
      nameSearchBlob(v.id),
    ]
      .join(" ")
      .toLowerCase();
    if (!blob.includes(f.q.toLowerCase())) return false;
  }
  return true;
}

export function liveCars(f: Filters, pred?: (v: Vehicle) => boolean) {
  return vehicles.filter((v) => matchesFilters(v, f) && (!pred || pred(v)));
}

export function archCarCount(archId: string, f: Filters) {
  return liveCars(f, (v) => v.arch === archId).length;
}

export function relatedIds(v: Vehicle) {
  const ids = new Set<string>();
  const compare = (v.detail?.compare as string[] | undefined) || [];
  compare.forEach((id) => {
    if (id !== v.id) ids.add(id);
  });
  homologGroups.forEach((g) => {
    if (g.members.includes(v.id)) {
      g.members.forEach((id) => {
        if (id !== v.id) ids.add(id);
      });
    }
  });
  return [...ids];
}

export type TreeNode = {
  arch: Architecture;
  platforms: {
    plat: Platform;
    cars: Vehicle[];
  }[];
  carCount: number;
};

export function buildTree(f: Filters): TreeNode[] {
  return architectures
    .filter((a) => (!f.group || a.group === f.group) && (!f.arch || a.id === f.arch))
    .map((arch) => {
      const plats = (arch.platforms || [])
        .map((id) => platforms[id])
        .filter(Boolean)
        .map((plat) => ({
          plat,
          cars: liveCars(f, (v) => v.platform === plat.id && v.arch === arch.id),
        }))
        .filter((p) => p.cars.length > 0);
      return {
        arch,
        platforms: plats,
        carCount: plats.reduce((n, p) => n + p.cars.length, 0),
      };
    })
    .filter((n) => n.carCount > 0);
}

export function stats(f: Filters) {
  const tree = buildTree(f);
  return {
    arches: tree.length,
    plats: tree.reduce((n, t) => n + t.platforms.length, 0),
    cars: tree.reduce((n, t) => n + t.carCount, 0),
    brands: new Set(liveCars(f).map((v) => v.brand)).size,
  };
}

export const TRIM_LABELS: Record<string, string> = {
  name: "配置",
  msrp: "指导价",
  battery: "电池",
  packCode: "包码",
  range: "续航",
  hv: "电压",
  motors: "电机",
  acc: "0–100",
  drive: "驱动",
  energy: "能源",
  adas: "智驾",
  v2l: "V2L",
  dc: "DC",
  ac: "AC",
};

export const DETAIL_LABELS: Record<string, string> = {
  voltage: "电压",
  batteryNotes: "电池",
  motors: "电机",
  range: "续航",
  adas: "智驾",
  chassis: "底盘",
  thermal: "热管理",
  hvLayout: "高压布局",
  dims: "尺寸",
  homolog: "同源",
  competitors: "竞品",
  note: "备注",
};
